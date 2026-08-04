/**
 * Faza 3d i18n prevoda — korak 2/2 (apply).
 *
 * Čita spojen JSON niz prevoda (izlaz iz i18n-export-untranslated.ts + ručno/
 * agent-generisani prevodi, ista `path` struktura) i upisuje `en` vrednost
 * na tačno mesto u Sanity dokumentu preko granularnog patch path-a
 * (npr. `pageBuilder[_key=="xxx"].heading.en`). Grupiše po dokumentu — sve
 * izmene jednog dokumenta idu u jedan `.set()` poziv.
 *
 * Svaki dotaknuti dokument dobija `enReviewed: false` (human review gate,
 * Faza 3d) — eksplicitno, jer `initialValue` iz scheme važi samo za NOVE
 * dokumente kreirane u Studio-u, ne za postojeće patch-ovane preko API-ja.
 *
 * Upotreba:
 *   tsx scripts/i18n-apply-translations.ts --file=i18n-translations.json --dry-run
 *   tsx scripts/i18n-apply-translations.ts --file=i18n-translations.json
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config({ path: ".env.local" });

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const fileArg = args.find((a) => a.startsWith("--file="));
if (!fileArg) {
  console.error("Nedostaje --file=<putanja do translations.json>");
  process.exit(1);
}
const FILE = fileArg.split("=")[1];

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type PathStep = string | { key: string };
type Translation = { docId: string; path: PathStep[]; en: string };

function buildPatchPath(path: PathStep[]): string {
  let out = "";
  for (const step of path) {
    if (typeof step === "string") {
      out += out ? `.${step}` : step;
    } else {
      out += `[_key=="${step.key}"]`;
    }
  }
  return `${out}.en`;
}

async function main() {
  const translations: Translation[] = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const byDoc = new Map<string, Translation[]>();
  for (const t of translations) {
    if (!t.en || t.en.trim() === "") continue; // preskoči prazne/nepotpune prevode
    if (!byDoc.has(t.docId)) byDoc.set(t.docId, []);
    byDoc.get(t.docId)!.push(t);
  }

  console.log(`\n🌍 FAZA 3d — primena prevoda`);
  console.log(`   fajl: ${FILE}${DRY_RUN ? "  (DRY RUN — bez upisa)" : ""}`);
  console.log(`   ${byDoc.size} dokumenata, ${translations.length} polja ukupno\n`);
  console.log("═══════════════════════════════════════════════\n");

  let docsPatched = 0;
  let fieldsPatched = 0;

  for (const [docId, items] of byDoc) {
    const patch: Record<string, unknown> = { enReviewed: false };
    for (const item of items) {
      patch[buildPatchPath(item.path)] = item.en;
      fieldsPatched++;
    }

    if (DRY_RUN) {
      console.log(`  [dry-run] ${docId} — ${items.length} polja`);
    } else {
      await client.patch(docId).set(patch).commit();
      console.log(`  ✅ ${docId} — ${items.length} polja`);
    }
    docsPatched++;
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log(
    `Gotovo. ${docsPatched} dokumenata${DRY_RUN ? " bi bilo" : ""} izmenjeno, ${fieldsPatched} polja ukupno.`
  );
  if (DRY_RUN) console.log("Ovo je bio dry-run — ništa nije upisano. Pokreni bez --dry-run za stvarni upis.");
}

main().catch((error) => {
  console.error("❌ Greška:", error);
  process.exit(1);
});
