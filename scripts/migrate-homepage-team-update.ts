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

interface TeamMemberSeed {
  key: string;
  image: string;
  name: string;
  role: string;
  description: string;
}

const TEAM: TeamMemberSeed[] = [
  {
    key: "team-member-1",
    image: "/images/nasi_strucnjaci/Dr Jelena Kljajević-specijalista radiologije.jpg",
    name: "Др Јелена Кљајевић",
    role: "Радиолог",
    description: "Специјалиста радиологије Института за кардиоваскуларне болести „Дедиње“.",
  },
  {
    key: "team-member-2",
    image:
      "/images/nasi_strucnjaci/Klin. ass. dr sci. med. Dragana Unić Stojanović-specijalista anestezije sa reanimatologijom.jpg",
    name: "Клин. асс. др сци. мед. Драгана Унић Стојановић",
    role: "Анестезиолог са реаниматологијом",
    description:
      "Специјалиста анестезије са реаниматологијом Института за кардиоваскуларне болести „Дедиње“.",
  },
  {
    key: "team-member-3",
    image: "/images/nasi_strucnjaci/Milan Dobric Specijalista interventne kardiologije.webp",
    name: "Др Милан Добрић",
    role: "Интервентни кардиолог",
    description: "Специјалиста интервентне кардиологије Института за кардиоваскуларне болести „Дедиње“.",
  },
  {
    key: "team-member-4",
    image:
      "/images/nasi_strucnjaci/Prof. dr sci med. Ivan Stojanović-centra za minimalnu invazivnu hirurgiju.jpg",
    name: "Проф. др сци. мед. Иван Стојановић",
    role: "Специјалиста минимално инвазивне хирургије",
    description:
      "Специјалиста ангажован у Центру за минимално инвазивну хирургију Института за кардиоваскуларне болести „Дедиње“.",
  },
];

async function migrateHomepageTeamUpdate() {
  console.log("\n👥 AŽURIRANJE SEKCIJE „NAŠ TIM” NA POČETNOJ (demo → pravi lekari)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const block = pageBuilder.find((b) => b._type === "teamSection");
  if (!block) {
    console.error("❌ Blok teamSection ne postoji u pageBuilder-u.");
    return;
  }

  const team = [];
  for (const member of TEAM) {
    console.log(`  ⬆️  Upload slike: ${member.name}`);
    const imageAssetId = await uploadLocalImage(member.image);
    team.push({
      _key: member.key,
      image: { _type: "image", asset: { _type: "reference", _ref: imageAssetId } },
      name: member.name,
      role: { _type: "localeString", sr: member.role, en: "" },
      description: { _type: "localeText", sr: member.description, en: "" },
    });
  }

  await client
    .patch("homepage")
    .set({ [`pageBuilder[_key=="${block._key}"].team`]: team })
    .commit();

  console.log(`\n✅ Sekcija „Naš tim” ažurirana sa ${team.length} pravih lekara (bez društvenih mreža)!\n`);
}

migrateHomepageTeamUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-team-update\n");
});
