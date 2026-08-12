# CLAUDE.md — Institut Dedinje

Ovaj fajl orijentiše Claude Code (i svakog budućeg saradnika) u projektu **Institut Dedinje** — javni veb sajt Nacionalnog instituta za srce i krvne sudove „Dedinje” (osnovan 1959, Beograd). Sajt je isključivo na srpskom jeziku (pretežno ćirilica), bez i18n (`app/layout.tsx` → `lang="sr"`).

## ⚠️ PRVO PROČITAJ (na početku svake sesije / novog taska)

`docs/` je single source of truth za status i arhitekturu. **Pre rada pročitaj relevantan fajl** (ne radi iz pamćenja):

| Fajl                                                | Kad ga čitaš                                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [docs/TASKS.md](docs/TASKS.md)                       | **Uvek prvo** — šta čeka (Sanity migracija po ruti + backlog), status ✅/🟡/❌         |
| [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)     | Blokeri, odluke koje čekaju vlasnika sajta, dnevnik izmena                            |
| [docs/ARHITEKTURA.md](docs/ARHITEKTURA.md)           | Pre dodavanja koda — struktura repo-a, rute, Sanity content model, GROQ primeri       |
| [docs/MIGRACIJA.md](docs/MIGRACIJA.md)               | Kad migriraš novu stranicu sa hardkodovanog sadržaja na Sanity — obrazac + checklist  |

> Kad task završiš → vidi "Definicija završenog taska" niže (obavezno ažuriranje docs-a).

---

## Tech stack

- **Next.js 16.1.4** — App Router (`app/`), ne Pages Router.
- **React 19.2.3**, **TypeScript ^5** (strict mode, path alias `@/*` → repo root).
- **Sanity CMS** (`sanity` ^5.7.0 + `next-sanity` ^12) — headless CMS backend, embedovan i kao Studio na `/studio`.
- **Stilizovanje**: CSS Modules (`*.module.css` po komponenti/ruti) + veliki globalni `app/globals.css` sa CSS custom properties. Nema Tailwind-a, nema PostCSS pipeline-a (`postcss.config.mjs` je prazan). `styled-components` je u `package.json` iako ga aplikacioni kod nigde ne importuje — to je **peer zavisnost koju zahtevaju Sanity Studio/`@sanity/ui` paketi** (potvrđeno u `package-lock.json`), ne mrtav kod — ne uklanjati.
- **Framer Motion** — animacije (hero slider, page transitions, taboviranje).
- **react-pdf** — prikaz CV-ja i bibliografije direktora u browseru (worker se učitava sa unpkg CDN-a).
- Nema automatizovanih testova (Jest/Vitest/Playwright) i nema CI/CD (`.github/` je praktično prazan, nema `workflows/`).

Struktura repo-a, rute i content model: [docs/ARHITEKTURA.md](docs/ARHITEKTURA.md).

## Konvencije koje treba slediti

- **Metadata**: server component stranice mogu direktno `export const metadata` ili `generateMetadata`. Client component stranice (`"use client"`) to ne mogu — obrazac je poseban `metadata.ts` u istom folderu + `import { metadata } from "./metadata"; export { metadata };` u `page.tsx` (vidi `app/klinike/metadata.ts` + `app/klinike/page.tsx`, i sve novododate `metadata.ts` fajlove po klinikama/o-nama podstranicama).
- **Klinike**: nove/izmenjene klinike idu kroz `app/klinike/_components/ClinicPageTemplate.tsx` sa `ClinicPageData` objektom (title/subtitle/areas/itd.) — ne pisati custom layout za svaku kliniku.
- **PageHeader** (`components/shared/PageHeader`) je standardni banner (breadcrumb + naslov + podnaslov) za unutrašnje stranice; `HeroSection` (Framer Motion slider) je rezervisan za početnu stranicu.
- Svaka ruta ima sopstveni `page.module.css` — izbegavati globalne stilove osim u `app/globals.css` za zajedničke varijable/utility klase.
- **Docs (`.md`):** ostaju na srpskom.

## Dev workflow

- `npm run dev` — pokreće Next.js dev server i Sanity Studio dev server paralelno (`concurrently`).
- Env varijable (`.env.local`, template u `.env.local.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`. Napomena: `sanity.config.ts`/`sanity.cli.ts`/`sanity/lib/client.ts` trenutno hardkoduju `projectId`/`dataset` (`"haygvfxq"`/`"production"`) umesto da čitaju env svuda — samo `SANITY_API_TOKEN` i `scripts/migrate-bibliography.ts` stvarno koriste env.
- `npm run migrate:*` — pokreće odgovarajuću seed-skriptu (zahteva `SANITY_API_TOKEN` sa write pristupom).
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- `npm run build` — standardni Next.js build. `npm run build:static` — static export (`output: "export"`) u `out/`, za klasičan (non-Vercel) hosting; u ovom modu se image optimizacija gasi (`unoptimized: true`).
- **Ne pokreći headless-browser screenshot cikluse (chrome --headless, cropovanje slika i sl.) da bi proveravao proste CSS/layout izmene** (poravnanje, širine, boje) — to nepotrebno troši resurse. Za takve izmene je dovoljno pregledati kod (širine kontejnera, padding, margine) i logički potvrditi da se poklapaju; korisnik već ima dev server upaljen i sam refreshuje browser da proveri izgled. Pokreni vizuelnu proveru samo ako korisnik to eksplicitno traži.

## Deployment

- **Vercel** je primarna platforma, projekat `dedinje-next` je već povezan (`.vercel/project.json`). `npm run deploy` → `vercel --prod`. `vercel.json` eksplicitno postavlja `installCommand: "npm install"` — **npm je izvor istine**, ne yarn.
- Alternativa: `npm run build:static` za statički export na klasičan hosting.

## ✅ Definicija završenog taska

> Cilj: kontinuitet — nova sesija mora iz docs-a da vidi tačno gde smo, bez gubitka konteksta. Ne ostavljaj docs zastarele.

1. **`npm run lint` prolazi** (nema automatizovanih testova u ovom projektu, vidi Tech stack).
2. **docs/TASKS.md** — markiraj task ✅ (gotovo) / 🟡 (u toku) / ❌ (nije) + kratka beleška šta je urađeno.
3. **docs/PROJECT_STATUS.md** — ažuriraj header ("Poslednje ažuriranje" + "Stanje") i dodaj red u Dnevnik; precrtaj/označi rešene Blokere/Odluke ako je primenljivo.
4. **docs/ARHITEKTURA.md / docs/MIGRACIJA.md** — ako je task dotakao rutu/Sanity šemu, ažuriraj status tamo.
5. **Grep-sweep** — pregrepuj `docs/` za imena fajlova/ruta koje si dirao, potvrdi da nema zaostalih zastarelih tvrdnji (npr. status ✅/❌ koji više ne važi).

## Known issues / Backlog

Vidi [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) (Blokeri/Odluke) i [docs/TASKS.md](docs/TASKS.md) (Backlog).

Napomena van tracker-a: proveri `git log origin/develop..HEAD` pre pretpostavke da je remote ažuran — lokalna grana je u prošlosti imala nepushovane commit-e.
