# Tasks — Institut Dedinje

Tracker za (1) postepenu Sanity migraciju stranica i (2) pojedinačne stavke iz
backloga. Kad task završiš → vidi "Definicija završenog taska" u
[`../CLAUDE.md`](../CLAUDE.md), i ažuriraj ovaj fajl + [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

**Markeri:** ❌ nije · ✅ gotovo · 🟡 u toku

---

## Sanity migracija (obrazac u [`MIGRACIJA.md`](MIGRACIJA.md))

- ✅ Početna (`homepage`, page-builder sekcije)
- ✅ `footer` (singleton)
- ✅ `/rec-direktora` (`directorPage`)
- ✅ `/o-institutu` (`aboutPage`)
- ✅ `/biografija` (`biographyPage`)
- ✅ `/bibliografija` (`bibliographyPage`)
- ❌ `/klinike` + 15 podstranica (kardiologija, kardiohirurgija, vaskularna-hirurgija, anesteziologija, apteka, centar-srcana-slabost, edukacija-prevencija, fizikalna-medicina, invazivna-dijagnostika, klinicka-patologija, kv-dijagnostika, laboratorija, poliklinika, telemedicina, transfuzija)
- ❌ `/za-pacijente` + 10 podstranica
- ❌ `/nauka-istrazivanje` + podstranice
- ❌ `/edukacija` + podstranice
- ❌ `/aktuelnosti` + `[slug]` + podsekcije

## Backlog (van Sanity migracije)

- ❌ ☁️ Kontakt forma — odlučiti email servis (Resend/Nodemailer/itd.), povezati `app/kontakt/page.tsx` na pravu `/api` rutu. Detalji: [`PROJECT_STATUS.md`](PROJECT_STATUS.md).
- ❌ 5 mrtvih linkova u meniju (`/nauka-istrazivanje/korisni-linkovi/*`, `/nauka-istrazivanje/monografija`) — kreirati stranice ili ukloniti linkove iz `Header.tsx`.
- ❌ `app/za-pacijente/kardiologija/page.tsx` — 9/10 tabova su "coming soon" stub, treba pravi sadržaj.
- ❌ ☁️ Testovi/CI odluka — da li ima smisla za marketinški sajt, ili samo build+lint gate.
- ❌ ☁️ `useCdn: false` razmatranje (CDN + revalidacija ako saobraćaj poraste).
- ❌ ☁️ Hardkodovani Sanity `projectId`/`dataset` na više mesta — rizik samo ako se pravi drugi Sanity projekat/dataset.
- ❌ `public/doctor-milan-nikolic.png` — orphan asset, povezati sa doktorom ili obrisati.

**☁️** = zahteva infra/odluku vlasnika sajta pre nego što se dirne kod.
