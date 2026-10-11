import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type Item = { title: Record<string, unknown>; desc: unknown };

const ID = "clinicPage-centar-strukturne-bolesti-srca";

// Slike iz docx-a (public/images/strukturne/), po area ključu.
const IMAGES: Record<string, string> = {
  "area-1": "/images/strukturne/tavi-21-u-jednom-danu.jpg",
  "area-3": "/images/strukturne/mitraclip-procedura.jpg",
  "area-4": "/images/strukturne/tricvalve-procedura.jpg",
};

// Patch (ne createOrReplace) — čuva već upisane EN prevode. Procedure iz `areas`
// prelaze u proceduresList.detailedItems (sa slikama), `areas` se prazni.
async function main() {
  const doc = await client.getDocument(ID);
  if (!doc) throw new Error(`${ID} ne postoji`);

  const areas: Item[] = doc.areas ?? [];
  if (areas.length === 0 && doc.proceduresList?.detailedItems?.length) {
    console.log("ℹ️ Već migrirano — samo osvežavam slike.");
  }
  const source: Item[] = areas.length ? areas : (doc.proceduresList?.detailedItems ?? []);

  const detailedItems = source.map((a, i) => ({
    _key: `proc-${i + 1}`,
    title: a.title,
    desc: a.desc,
    ...(IMAGES[`area-${i + 1}`] ? { image: IMAGES[`area-${i + 1}`] } : {}),
  }));

  await client
    .patch(ID)
    .set({
      areas: [],
      proceduresList: {
        title: { _type: "localeString", sr: "Процедуре", en: "Procedures" },
        items: detailedItems.map((d, i) => ({ ...d.title, _key: `item-${i + 1}` })),
        detailedItems,
      },
      'sections[_key=="section-1"].images': ["/images/strukturne/tavi-akademija-2023-a.jpg", "/images/strukturne/tavi-akademija-2023-b.jpg"],
    })
    .unset(["areasTitle", "areasSubtitle", "areasIcon"])
    .commit();

  console.log(`✅ ${ID}: ${detailedItems.length} procedura (3 sa slikom) + slika u Istorijatu`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
