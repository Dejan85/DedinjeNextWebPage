import { createClient } from "@sanity/client";
import { XMLParser } from "fast-xml-parser";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const WP_EXPORT_PATH = "C:\\Users\\Dejan\\Downloads\\WordPress.2026-07-22.xml";

const RESERVED_SLUGS = new Set([
  "vesti",
  "gostovanja",
  "obavestenja",
  "oglasi-konkursi",
  "casopis-dedinje",
  "informator",
]);

// WP export ima author display_name mešano na latinici/ćirilici (WPML artefakt) — sajt je
// pretežno ćirilica, pa ovde ručno mapiramo poznate WP login-e na ćirilične nazive.
const AUTHOR_NAME_BY_LOGIN: Record<string, string> = {
  prsluzba: "Служба за односе са јавношћу Института Дедиње",
  "nenad.petkovic": "Ненад Петковић",
  "nemanja.zikic": "Немања Жикић",
  webmaster: "Институт Дедиње",
  "jelena.jankovic": "Јелена Јанковић",
  "nemanja.djolovic": "Немања Ђоловић",
};

const DEMO_NEWS_SLUGS = [
  "krsna-slava-sretenje-gospodnje",
  "sretenjska-radionica-vaskularne-hirurgije",
  "poseta-hochgebirgsklinik-davos",
  "priznanje-akademik-bojic-moskva",
  "novi-aparati-ehokariografija",
  "tavi-500-intervencija",
];

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const isDryRun = process.argv.includes("--dry-run");

// ---------- XML helpers ----------

function cd(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object" && "__cdata" in (val as Record<string, unknown>)) {
    const c = (val as Record<string, unknown>).__cdata;
    return Array.isArray(c) ? c.join("") : String(c ?? "");
  }
  return String(val);
}

function asArray<T>(val: T | T[] | undefined): T[] {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

interface WpPostMeta {
  "wp:meta_key": unknown;
  "wp:meta_value": unknown;
}

interface WpCategory {
  "@_domain"?: string;
  "@_nicename"?: string;
  __cdata?: unknown;
}

interface WpItem {
  title?: unknown;
  "dc:creator"?: unknown;
  "content:encoded"?: unknown;
  "excerpt:encoded"?: unknown;
  "wp:post_id"?: number;
  "wp:post_date"?: unknown;
  "wp:post_name"?: unknown;
  "wp:status"?: unknown;
  "wp:post_type"?: unknown;
  "wp:attachment_url"?: unknown;
  "wp:postmeta"?: WpPostMeta | WpPostMeta[];
  category?: WpCategory | WpCategory[];
}

function getMeta(item: WpItem, key: string): string | undefined {
  const metas = asArray(item["wp:postmeta"]);
  const found = metas.find((m) => cd(m["wp:meta_key"]) === key);
  return found ? cd(found["wp:meta_value"]) : undefined;
}

function hasCategory(item: WpItem, nicename: string): boolean {
  return asArray(item.category).some((c) => c["@_nicename"] === nicename);
}

// ---------- Content cleanup ----------

const ENTITY_MAP: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#039": "'",
  "#8216": "\u2018",
  "#8217": "\u2019",
  "#8220": "\u201c",
  "#8221": "\u201d",
  "#8211": "\u2013",
  "#8212": "\u2014",
  hellip: "\u2026",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#?\w+);/g, (match, code) => {
    if (ENTITY_MAP[code]) return ENTITY_MAP[code];
    if (/^#\d+$/.test(code)) return String.fromCharCode(Number(code.slice(1)));
    return match;
  });
}

function htmlToParagraphs(html: string): string {
  let text = html;
  // Strip Fusion/Avada Builder shortcodes, e.g. [fusion_text ...] and [/fusion_text]
  text = text.replace(/\[\/?[a-zA-Z][^\]]*\]/g, "");
  // Turn block-level boundaries into paragraph breaks before stripping tags
  text = text.replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");
  text = decodeEntities(text);
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return paragraphs.join("\n\n");
}

// WP čuva ne-latinične permalink slugove kao percent-encoded UTF-8 (npr. "%d0%b8%d0%bd..."),
// pa post_name treba prvo decode-ovati, a zatim transliterisati u ASCII-safe slug jer
// Sanity document ID i URL slug ne smeju sadržati "%" ili ćirilicu.
const CYR_TO_LAT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ђ: "dj", е: "e", ж: "z", з: "z",
  и: "i", ј: "j", к: "k", л: "l", љ: "lj", м: "m", н: "n", њ: "nj", о: "o",
  п: "p", р: "r", с: "s", т: "t", ћ: "c", у: "u", ф: "f", х: "h", ц: "c",
  ч: "c", џ: "dz", ш: "s",
};

function slugify(text: string): string {
  let out = "";
  for (const ch of text.toLowerCase()) {
    out += CYR_TO_LAT[ch] ?? ch;
  }
  return out
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function resolveSlug(rawPostName: string, title: string, postId: number | undefined): string {
  let candidate = rawPostName;
  if (candidate.includes("%")) {
    try {
      candidate = decodeURIComponent(candidate);
    } catch {
      candidate = rawPostName;
    }
  }
  if (!/^[a-z0-9-]+$/.test(candidate)) {
    candidate = slugify(candidate);
  }
  if (!candidate) candidate = slugify(title);
  if (!candidate) candidate = `post-${postId ?? Date.now()}`;
  return candidate;
}

function truncateWords(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : maxLen)}\u2026`;
}

function findFallbackImageUrl(rawContent: string): string | undefined {
  const match = rawContent.match(
    /https:\/\/www\.ikvbd\.org\/wp-content\/uploads\/[^\s"')\]]+\.(?:jpe?g|png|webp)/i,
  );
  return match ? match[0] : undefined;
}

// ---------- Category heuristic ----------

type NewsCategory = "inovacije" | "akcije" | "oprema" | "uspeh" | "edukacija" | "obavestenje";

const CATEGORY_RULES: Array<{ category: NewsCategory; keywords: string[] }> = [
  {
    category: "obavestenje",
    keywords: ["обавештење", "радно време", "распоред прегледа", "измењен"],
  },
  {
    category: "oprema",
    keywords: ["апарат", "опрем", "набав", "инсталир", "скенер", "магнетну резонанц"],
  },
  {
    category: "edukacija",
    keywords: [
      "едукациј", "школ", "семинар", "конгрес", "симпозијум", "радионица",
      "студент", "предавањ", "курс", "стаж",
    ],
  },
  {
    category: "akcije",
    keywords: ["хуманитарн", "донациј", "акциј", "промоциј", "крсн", "слав", "прослав"],
  },
  {
    category: "inovacije",
    keywords: [
      "први пут", "прв", "имплементир", "нова метода", "иновациј",
      "нови софтвер", "нову технологиј", "по први пут",
    ],
  },
  {
    category: "uspeh",
    keywords: ["успешно", "рекорд", "признањ", "награ", "јубилеј", "достигн", "успех", "повеља", "сертификат"],
  },
];

function classifyCategory(title: string, excerpt: string, hasNauka: boolean): NewsCategory | undefined {
  const haystack = `${title} ${excerpt}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.category;
    }
  }
  if (hasNauka) return "edukacija";
  return undefined;
}

// ---------- Image upload ----------

async function uploadRemoteImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ⚠ HTTP ${res.status} za sliku ${url}`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = decodeURIComponent(url.split("/").pop() || "image.jpg").split("?")[0];
    const asset = await client.assets.upload("image", buffer, { filename });
    return asset._id;
  } catch (error) {
    console.warn(`  ⚠ Greška pri preuzimanju slike ${url}: ${(error as Error).message}`);
    return null;
  }
}

// ---------- Main ----------

async function main() {
  console.log("\n📰 MIGRACIJA VESTI SA WORDPRESS EXPORTA");
  console.log("═══════════════════════════════════════════════\n");

  const xml = fs.readFileSync(WP_EXPORT_PATH, "utf-8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    isArray: (name) => ["item", "wp:postmeta", "wp:author", "category"].includes(name),
  });
  const parsed = parser.parse(xml);
  const items: WpItem[] = asArray(parsed?.rss?.channel?.item);

  console.log(`Ukupno stavki u XML-u: ${items.length}`);

  const attachmentUrlByPostId = new Map<string, string>();
  for (const item of items) {
    if (cd(item["wp:post_type"]) === "attachment" && item["wp:post_id"] !== undefined) {
      const url = cd(item["wp:attachment_url"]);
      if (url) attachmentUrlByPostId.set(String(item["wp:post_id"]), url);
    }
  }

  const posts = items.filter(
    (item) => cd(item["wp:post_type"]) === "post" && cd(item["wp:status"]) === "publish",
  );
  console.log(`Objavljenih postova: ${posts.length}`);

  const DEFAULT_AUTHOR = "Служба за односе са јавношћу Института Дедиње";

  const targetPosts = isDryRun ? posts.slice(0, 5) : posts;

  let created = 0;
  let skipped = 0;
  const errors: string[] = [];
  const usedSlugs = new Set<string>();

  for (const [index, post] of targetPosts.entries()) {
    const title = cd(post.title);
    const rawPostName = cd(post["wp:post_name"]);
    let slug = resolveSlug(rawPostName, title, post["wp:post_id"]);
    const progress = `[${index + 1}/${targetPosts.length}]`;

    if (!slug) {
      errors.push(`${title || "(bez naslova)"}: nema post_name/slug`);
      skipped++;
      continue;
    }
    if (RESERVED_SLUGS.has(slug) || usedSlugs.has(slug)) {
      let n = 2;
      while (RESERVED_SLUGS.has(`${slug}-${n}`) || usedSlugs.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
    usedSlugs.add(slug);

    const rawContent = cd(post["content:encoded"]);
    const fullText = htmlToParagraphs(rawContent);

    const metaDesc = getMeta(post, "_yoast_wpseo_metadesc");
    const excerpt = metaDesc && metaDesc.trim() ? metaDesc.trim() : truncateWords(fullText, 200);

    const hasNauka = hasCategory(post, "nauka");
    const category = classifyCategory(title, excerpt, hasNauka);

    const creatorLogin = cd(post["dc:creator"]);
    const author = AUTHOR_NAME_BY_LOGIN[creatorLogin] || DEFAULT_AUTHOR;

    const publishedAtRaw = cd(post["wp:post_date"]);
    const publishedAt = publishedAtRaw ? new Date(publishedAtRaw.replace(" ", "T")).toISOString() : undefined;

    const thumbnailId = getMeta(post, "_thumbnail_id");
    let imageUrl = thumbnailId ? attachmentUrlByPostId.get(thumbnailId) : undefined;
    if (!imageUrl) imageUrl = findFallbackImageUrl(rawContent);

    if (isDryRun) {
      console.log(`${progress} ${title}`);
      console.log(`   slug: ${slug}`);
      console.log(`   category: ${category ?? "(bez kategorije)"}`);
      console.log(`   author: ${author}`);
      console.log(`   publishedAt: ${publishedAt}`);
      console.log(`   image: ${imageUrl ?? "(NIJE PRONAĐENA)"}`);
      console.log(`   excerpt: ${excerpt.slice(0, 120)}...`);
      console.log(`   fullText paragraphs: ${fullText.split("\n\n").length}\n`);
      continue;
    }

    if (!imageUrl) {
      errors.push(`${title}: nema mainImage (ni thumbnail ni fallback), preskočeno`);
      skipped++;
      continue;
    }
    if (!publishedAt) {
      errors.push(`${title}: nevalidan datum objave, preskočeno`);
      skipped++;
      continue;
    }

    const imageAssetId = await uploadRemoteImage(imageUrl);
    if (!imageAssetId) {
      errors.push(`${title}: upload slike nije uspeo, preskočeno`);
      skipped++;
      continue;
    }

    try {
      await client.createOrReplace({
        _type: "news",
        _id: `news-wp-${slug}`,
        title,
        slug: { _type: "slug", current: slug },
        excerpt,
        fullText,
        mainImage: { _type: "image", asset: { _type: "reference", _ref: imageAssetId } },
        ...(category ? { category } : {}),
        author,
        publishedAt,
        featured: false,
      });
      created++;
      console.log(`${progress} ✓ ${title.slice(0, 70)}`);
    } catch (error) {
      errors.push(`${title}: greška pri upisu u Sanity - ${(error as Error).message}`);
      skipped++;
    }
  }

  if (isDryRun) {
    console.log("═══════════════════════════════════════════════");
    console.log("✨ DRY RUN ZAVRŠEN (ništa nije upisano u Sanity)\n");
    return;
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log(`✅ Kreirano ${created} vesti, preskočeno ${skipped}.\n`);

  if (errors.length) {
    console.log("⚠ Preskočeni/problematični postovi:");
    for (const err of errors) console.log(`  - ${err}`);
    console.log("");
  }

  console.log("🗑  Brisanje placeholder demo vesti...");
  for (const slug of DEMO_NEWS_SLUGS) {
    await client.delete(`news-${slug}`);
  }
  console.log(`✅ ${DEMO_NEWS_SLUGS.length} placeholder vesti obrisano.\n`);

  console.log("═══════════════════════════════════════════════");
  console.log("✨ MIGRACIJA VESTI ZAVRŠENA\n");
}

main().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:vesti-wordpress\n");
});
