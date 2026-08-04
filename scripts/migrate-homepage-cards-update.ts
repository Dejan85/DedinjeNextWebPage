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

const infoBoxUpdates: Record<string, Record<string, unknown>> = {
  "infobox-1": {
    icon: "fas fa-file-medical",
    title: "Информације за пацијенте",
    variant: "regular",
    description:
      "Све информације о пријему, припреми и боравку у Институту на једном месту.",
    linkText: "Све информације",
    linkHref: "/za-pacijente",
    // Briše polja iz prethodnog "schedule" varijanta ako postoje
    schedule: undefined,
  },
  "infobox-2": {
    icon: "fas fa-hospital",
    title: "Наше клинике",
    variant: "regular",
    description:
      "Упознајте се са свим клиникама и услугама које наш институт нуди пацијентима.",
    linkText: "Погледај клинике",
    linkHref: "/klinike",
  },
  "infobox-3": {
    icon: "fas fa-user-md",
    title: "Наш тим",
    variant: "regular",
    description:
      "Упознајте наше лекаре специјалисте и стручњаке који брину о вашем здрављу.",
    linkText: "Упознајте тим",
    linkHref: "/nas-tim",
  },
  "infobox-4": {
    icon: "fas fa-headset",
    title: "Контакт",
    variant: "contact",
    contactPhone: "011 3601 700",
    contactFax: "011 2666 445",
    // Briše polja iz prethodnog "emergency" varijanta ako postoje
    emergencyPhone: undefined,
    emergencyNote: undefined,
  },
};

async function migrateHomepageCardsUpdate() {
  console.log("\n📦 AŽURIRANJE INFO KARTICA NA POČETNOJ (infoBox 1-4)");
  console.log("═══════════════════════════════════════════════\n");

  const homepage = await client.getDocument("homepage");
  if (!homepage) {
    console.error("❌ Homepage dokument (_id: homepage) ne postoji. Pokreni prvo: npm run migrate:all");
    return;
  }

  const pageBuilder: Array<{ _type: string; _key?: string }> = homepage.pageBuilder || [];
  const missingKeys = Object.keys(infoBoxUpdates).filter(
    (key) => !pageBuilder.some((block) => block._key === key),
  );
  if (missingKeys.length > 0) {
    console.error(`❌ Sledeći infoBox blokovi ne postoje u pageBuilder-u: ${missingKeys.join(", ")}`);
    console.error("   Pokreni prvo: npm run migrate:all");
    return;
  }

  const setFields: Record<string, unknown> = {};
  const unsetPaths: string[] = [];
  for (const [key, fields] of Object.entries(infoBoxUpdates)) {
    for (const [fieldName, value] of Object.entries(fields)) {
      const path = `pageBuilder[_key=="${key}"].${fieldName}`;
      if (value === undefined) {
        unsetPaths.push(path);
      } else {
        setFields[path] = value;
      }
    }
  }

  await client.patch("homepage").set(setFields).unset(unsetPaths).commit();

  console.log("✅ Info kartice (infobox-1..4) uspešno ažurirane!\n");
}

migrateHomepageCardsUpdate().catch((error) => {
  console.error("\n❌ GREŠKA PRI MIGRACIJI:\n");
  console.error(error);
  console.log("\n💡 Pokušaj ponovo sa: npm run migrate:homepage-cards-update\n");
});
