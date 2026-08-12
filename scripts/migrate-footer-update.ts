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

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs";

const LOCATIONS = [
  {
    _key: "dedinje-1",
    title: { _type: "localeString", sr: "ДЕДИЊЕ 1", en: "DEDINJE 1" },
    mapEmbedUrl: MAP_EMBED_URL,
    address: "Хероја Милана Тепића бр. 1",
    city: "11040 Београд, Србија",
  },
  {
    _key: "dedinje-2",
    title: { _type: "localeString", sr: "ДЕДИЊЕ 2", en: "DEDINJE 2" },
    mapEmbedUrl: MAP_EMBED_URL,
    address: "Хероја Милана Тепића бр. 1",
    city: "11040 Београд, Србија",
  },
  {
    _key: "dedinje-3",
    title: { _type: "localeString", sr: "ДЕДИЊЕ 3", en: "DEDINJE 3" },
    mapEmbedUrl: MAP_EMBED_URL,
    address: "Сокобањска 17",
    city: "11040 Београд, Србија",
  },
];

async function migrateFooterUpdate() {
  console.log("\n🦶 AŽURIRANJE FOOTER-A (naziv/logo tekst + lokacije, do sad nepokrenuta migracija)");
  console.log("═══════════════════════════════════════════════\n");

  const footer = await client.getDocument("footer");
  if (!footer) {
    console.error("❌ Dokument footer ne postoji. Pokreni prvo: npm run migrate:footer");
    return;
  }

  await client
    .patch("footer")
    .set({
      instituteName: {
        _type: "localeString",
        sr: "НАЦИОНАЛНИ ИНСТИТУТ",
        en: "NATIONAL INSTITUTE",
      },
      instituteSubtitle: {
        _type: "localeString",
        sr: "За срце и крвне судове „Дедиње“",
        en: "For Heart and Blood Vessels „Dedinje“",
      },
      locations: LOCATIONS,
    })
    // Napušteni obrazac footer-a (Brzi linkovi/Usluge/stari Kontakt blok) uklonjen
    // iz komponente/šeme redizajnom 2026-08-05, ali dataset nikad nije migriran —
    // ova migracija je prvi put da se to čisti sa live dokumenta.
    .unset(["contact", "quickLinks", "services"])
    .commit();

  console.log("✅ Footer ažuriran!\n");
  console.log("   Naziv: НАЦИОНАЛНИ ИНСТИТУТ / За срце и крвне судове „Дедиње“");
  console.log("   Локације: ДЕДИЊЕ 1/2 — Хероја Милана Тепића бр. 1, ДЕДИЊЕ 3 — Сокобањска 17");
  console.log("   Uklonjeni napušteni contact/quickLinks/services");
  console.log("");
}

migrateFooterUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:footer-update\n");
});
