# Project status — Institut Dedinje

**Poslednje ažuriranje:** 2026-07-21
**Stanje:** Sajt je funkcionalan i deploy-ovan na Vercel; migracija sadržaja ka Sanity CMS-u je u toku, stranica po stranica (vidi [`TASKS.md`](TASKS.md) za tačan status). Ispod su blokeri i odluke koje čekaju vlasnika sajta pre nego što se dalje dira kod.

---

## Blokeri / Odluke

- **Kontakt forma ne šalje nikuda** (`app/kontakt/page.tsx`) — `handleSubmit` samo poziva `e.preventDefault()` i prikazuje lažnu poruku o uspehu; nema `/api` rute, nema email servisa (Resend/Nodemailer/itd.). Sanity `contactSection` schema već ima polja za punu booking formu, ali se nigde ne koristi. Treba pre lansiranja odlučiti email servis i povezati.
- **5 mrtvih linkova u meniju** ka nepostojećim stranicama: `/nauka-istrazivanje/korisni-linkovi/{nitra,amprec,kobson,zajednica-instituta}` i `/nauka-istrazivanje/monografija` (definisani u `components/shared/Header/Header.tsx`, stranice ne postoje → 404).
- **`app/za-pacijente/kardiologija/page.tsx`** — 9 od 10 tabova prikazuje "Садржај биће допуњен" (coming soon stub); samo "Катетерско затварање аурикуле" ima pravi sadržaj.
- **Nema testova ni CI/CD** — ako se ovo doda, prvo definisati da li ima smisla za pretežno marketinški/informativni sajt ili samo build+lint gate na push.
- **`useCdn: false`** u `sanity/lib/client.ts` — svaki zahtev ide direktno na Sanity API (sveži sadržaj odmah posle izmene u Studio-u, ali sporije i veća potrošnja API kvote). Namerno tako zbog uređivačke svežine — razmotriti CDN + revalidaciju ako saobraćaj poraste.
- **Hardkodovani Sanity `projectId`/`dataset`** na više mesta (`sanity.config.ts`/`sanity.cli.ts`/`sanity/lib/client.ts` hardkoduju `"haygvfxq"`/`"production"` umesto da čitaju env svuda) — rizik samo ako se ikad pravi drugi Sanity projekat/dataset (npr. staging).
- **`public/doctor-milan-nikolic.png`** — orphan asset na root nivou `public/`, nigde referenciran u kodu; ili ga povezati sa pravim doktorom ili obrisati.

## Dnevnik

> Dodaj red ovde na kraju svakog taska koji menja sadržaj/arhitekturu — šta je urađeno, kako, watch-item ako ima.

- 2026-07-21 — Reorganizovana dokumentacija: `docs/` folder (`ARHITEKTURA.md`, `PROJECT_STATUS.md`, `MIGRACIJA.md`, `TASKS.md`), `CLAUDE.md` skraćen na indeks + konvencije, `README.md` skraćen, dodat `docs-updater` subagent i model-forcing hook u `.claude/settings.json`. Stari `MIGRATION_DIRECTOR.md`/`SANITY_SETUP.md` obrisani (sadržaj prenet u `docs/`).
- 2026-07-21 — Unet sav sadržaj iz TASKS.md "Sadržaj za unos" liste (4 brze korekcije + 14 stavki novog sadržaja), direktno u postojeći hardkodovani obrazac (bez Sanity migracije, koja ostaje poseban budući task). Ključne izmene: `ClinicPageTemplate.tsx` proširen sa 3 opciona bloka (`proceduresList`, `staffList`, `patientInstructions`); ažurirane postojeće klinike (vaskularna-hirurgija, invazivna-dijagnostika, kv-dijagnostika, kardiologija, kardiohirurgija + `units.ts`, transfuzija, telemedicina, škola ehokardiografije, interna-edukacija); kreirano 9 novih ruta (`/klinike/elektrofiziologija`, `/klinike/kardiovaskularna-rehabilitacija`, `/klinike/neurokardioloska-laboratorija`, `/klinike/cusmo`, `/klinike/neinvazivna-dijagnostika-srca`, `/za-pacijente/preoperativna-priprema`, `/nauka-istrazivanje/cardioview3d-lab` + redirect sa stare `/workshop` rute, `/edukacija/sestrinska-edukacija` hub + 4 podstranice); Header.tsx meni ažuriran sa novim linkovima. `npm run build` i `npm run lint` prolaze bez novih grešaka (baseline od 14 pre-postojećih lint grešaka nepromenjen).
  - **Watch-item (privatnost):** CUSMO izveštaji sa radnih poseta i konzilijuma namerno uneti samo kao agregatni rezime (broj pacijenata/datumi), ne pojedinačni klinički detalji iz izvornih docx-eva (koji sadrže godinu rođenja, pol, dijagnozu, hirurški opis) — potvrđeno sa vlasnikom sajta tokom rada.
  - **Watch-item (izvori):** dva izvorna fajla u `docs za ubacivanje/` su bila pogrešno atribuirana u prethodnoj verziji TASKS.md — `Provera stranica i novi predlozi/УВОДНА РЕЧ.docx` je sadržaj za Kliniku za kardiohirurgiju (ne rehabilitaciju), a `stranica i novi predlozi/Sajt IKVBD.docx` je sadržaj za Centar za kardiovaskularnu rehabilitaciju (ne kardiohirurgiju) — ispravljeno u TASKS.md.
  - **Preostalo iz "Sadržaj za unos":** 2 ☁️ stavke (spajanje Kardiohirurgija-1/2 u "Odeljenje poluintenzivne nege", reorganizacija `/edukacija`) i dalje čekaju odluku vlasnika sajta, namerno nisu dirane.
