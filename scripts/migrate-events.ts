import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadLocalImage(publicPath: string): Promise<string> {
  const filePath = path.join(process.cwd(), "public", publicPath);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(publicPath),
  });
  return asset._id;
}

// NAPOMENA: datumi su procena sledećeg termina na osnovu poznatih ranijih
// događaja Instituta (vidi VESTI/OBAVESTENJA u migrate-aktuelnosti.ts) —
// nisu potvrđeni od strane vlasnika sajta. Ažurirati kroz Studio kad se
// zna tačan termin.
interface EventSeed {
  slug: string;
  titleSr: string;
  date: string; // YYYY-MM-DD
  image: string;
  location: string;
}

const EVENTS: EventSeed[] = [
  {
    slug: "godisnji-kongres-instituta",
    titleSr: 'Годишњи конгрес Националног института за срце и крвне судове „Дедиње”',
    date: "2027-04-15",
    image: "/images/IKVBD-3D-800x450.jpg",
    location: "Београд",
  },
  {
    slug: "sretenjska-radionica-vaskularne-hirurgije",
    titleSr: "Сретењска радионица најсавременијих технологија у васкуларној хирургији",
    date: "2027-02-13",
    image: "/images/Workshop-Dedinje-800x450.jpg",
    location: "Београд",
  },
  {
    slug: "kongres-kardiovaskularne-prevencije",
    titleSr: "Конгрес кардиоваскуларне превенције (ХИСПА)",
    date: "2027-06-10",
    image: "/images/CMR-POKRIVALICA-800x450.jpg",
    location: "Београд",
  },
  {
    slug: "skola-ehokardiografije-novi-ciklus",
    titleSr: "Школа ехокардиографије — нови циклус базичног курса",
    date: "2026-09-14",
    image: "/images/4-600x443.png",
    location: "Београд",
  },
];

async function migrateEvents() {
  console.log("\n📅 MIGRACIJA DOGAĐAJA (predstojeći događaji vidžet)");
  console.log("═══════════════════════════════════════════════\n");

  for (const ev of EVENTS) {
    const imageAssetId = await uploadLocalImage(ev.image);
    await client.createOrReplace({
      _type: "event",
      _id: `event-${ev.slug}`,
      title: { _type: "localeString", sr: ev.titleSr, en: "" },
      date: ev.date,
      image: { _type: "image", asset: { _type: "reference", _ref: imageAssetId } },
      location: ev.location,
      enReviewed: false,
    });
    console.log(`  ✓ ${ev.titleSr.slice(0, 60)}...`);
  }

  console.log(`\n✅ ${EVENTS.length} događaja kreirano.\n`);
}

migrateEvents().catch((err) => {
  console.error("❌ Greška:", err);
  process.exit(1);
});
