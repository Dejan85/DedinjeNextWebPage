import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Patch navigation dokumenta (samo `mainMenu` stavke "o-nama" i "aktuelnosti", ostalo netaknuto):
//  - iz AKTUELNOSTI se uklanja duplirana podstavka „Актуелности” (/aktuelnosti) — „Вести” već postoji
//  - „Информатор о раду” se premešta iz AKTUELNOSTI u О НАМА (ruta ostaje /aktuelnosti/informator)
const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type Item = { _key: string; link?: string; [k: string]: unknown };
type Main = { _key: string; submenu?: Item[]; [k: string]: unknown };

async function main() {
  const doc = await client.getDocument<{ mainMenu: Main[] }>("navigation");
  if (!doc) throw new Error("navigation dokument ne postoji");
  const mainMenu = doc.mainMenu;

  const akt = mainMenu.find((m) => m._key === "aktuelnosti");
  const oNama = mainMenu.find((m) => m._key === "o-nama");
  if (!akt?.submenu || !oNama?.submenu) throw new Error("nema aktuelnosti/o-nama stavke");

  const informator = akt.submenu.find((s) => s.link === "/aktuelnosti/informator");
  akt.submenu = akt.submenu.filter((s) => s.link !== "/aktuelnosti" && s.link !== "/aktuelnosti/informator");

  if (informator && !oNama.submenu.some((s) => s.link === "/aktuelnosti/informator")) {
    const idx = oNama.submenu.findIndex((s) => s.link === "/o-nama/zdravstvena-akreditacija");
    oNama.submenu.splice(idx >= 0 ? idx + 1 : oNama.submenu.length, 0, {
      ...informator,
      _key: "o-nama-info",
      icon: "fas fa-book-open",
    });
  }

  await client.patch("navigation").set({ mainMenu }).commit();
  console.log(`✅ navigation ažuriran — AKTUELNOSTI: ${akt.submenu.length} stavki, О НАМА: ${oNama.submenu.length} stavki`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
