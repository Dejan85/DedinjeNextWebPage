# Arhitektura — Institut Dedinje

Struktura repo-a, rute, i Sanity content model. Pravila i konvencije koda:
[`../CLAUDE.md`](../CLAUDE.md). Kako se stranica migrira sa hardkodovanog
sadržaja na Sanity: [`MIGRACIJA.md`](MIGRACIJA.md). Šta je već migrirano vs.
šta čeka: [`TASKS.md`](TASKS.md).

---

## 1. Struktura repozitorijuma

```
app/                    rute (App Router), svaka sa page.tsx + page.module.css (+ metadata.ts kad treba)
components/shared/      ~50 reusable UI komponenti, svaka u svom folderu, barrel export iz index.ts
components/typography/  Heading, Text, Badge, Link — dizajn-sistem primitivi
sanity/                 schemas/ (documents, singletons, objects), lib/ (client, queries, image), types.ts
scripts/                jednokratne migracione skripte (tsx), pune Sanity dataset iz hardkodovanog sadržaja
public/                 images/, videos/ (hero pozadine), pdf/ (CV, bibliografija)
out/                    build artefakt od `build:static` (nije izvor istine, ne editovati ručno)
```

## 2. Rute (app/) — pregled po sekcijama

- `/` — početna (hero slider, info boxovi, statistike, usluge, "zašto mi", klinike, tim, vesti, kontakt CTA, partneri).
- `/rec-direktora`, `/o-institutu`, `/biografija`, `/bibliografija` — Sanity-backed singletoni (vidi §3 ispod).
- `/o-nama/{lokacija,nemedicinski-poslovi,odbori-i-organi-instituta,zdravstvena-akreditacija}` — hardkodovane info-stranice.
- `/klinike` + 20 podstranica — 19 Sanity-backed (`clinicPage` multi-instance tip, vidi §3 ispod), sve kroz zajednički `ClinicPageTemplate` (proširen opcionim `proceduresList`/`staffList`/`patientInstructions` blokovima); izuzetak je `kardiohirurgija` koja ostaje hardkodovana, sa custom page + `units.ts` za 5 pod-jedinica (ne staje u generički `clinicPage` tip).
- `/za-pacijente` + 12 podstranica — 12 Sanity-backed (`page` multi-instance tip sa 8 reusable pageBuilder blokova, vidi §3 ispod).
- `/nauka-istrazivanje` + podstranice (NIO, centar izuzetnih vrednosti, SAIGE projekat, lista istraživača — Sanity-backed; CardioView3D lab — spojena stranica sa 3 taba, ostaje hardkodovana, stara `/workshop` ruta radi redirect — namerni izuzetak).
- `/edukacija` + 16 podstranica (KME, kongresi, radionice, `sestrinska-edukacija` hub + 4 podstranice) — 13 Sanity-backed (`page` multi-instance tip), + 3 škole (`/edukacija/programi/skola-*`) Sanity-backed kroz bespoke `schoolPage` multi-instance tip (vidi §3 ispod).
- `/aktuelnosti` + `[slug]` + podsekcije (vesti, gostovanja, obaveštenja, oglasi-konkursi, časopis Dedinje, informator) — sadržaj u `constants.ts` fajlovima po sekciji.
- `/kontakt` — kontakt info + forma (forma trenutno ne šalje nikuda, vidi `PROJECT_STATUS.md`).
- `/studio/[[...tool]]` — Sanity Studio, montiran direktno u Next.js app.

## 3. Content model — hibridni pristup (CMS + hardkodovano)

Projekat je **usred postepene migracije** sa hardkodovanog sadržaja ka Sanity CMS-u, stranica po stranica. Za tačan status po ruti vidi [`TASKS.md`](TASKS.md); za obrazac kako se migracija sprovodi vidi [`MIGRACIJA.md`](MIGRACIJA.md).

**Već Sanity-backed** (svaka ima i pun hardkodovani fallback u samom `page.tsx` ako Sanity fetch ne uspe):
- Početna (`page: _id "homepage"`, `HOMEPAGE_QUERY`, page-builder sekcije)
- `footer` (singleton, `FOOTER_QUERY`)
- `directorPage` (`/rec-direktora`)
- `aboutPage` (`/o-institutu`)
- `biographyPage` (`/biografija`)
- `bibliographyPage` (`/bibliografija`)
- `clinicPage` (`/klinike/*`, 19 od 20 stranica — multi-instance document tip, vidi §3.1 i [`MIGRACIJA.md`](MIGRACIJA.md))
- `page` (`/za-pacijente/*`, 12 od 12 stranica; `/edukacija/*`, 13 od 16 stranica; `/nauka-istrazivanje/*`, 5 od 7 stranica — multi-instance document tip sa 11 reusable pageBuilder blok tipova, vidi §3.1 i [`MIGRACIJA.md`](MIGRACIJA.md))
- `schoolPage` (`/edukacija/programi/skola-*`, 3 od 3 stranice — multi-instance document tip po uzoru na `clinicPage`, za sadržaj koji ne staje u generički `page` builder, vidi §3.1)

**Još uvek potpuno hardkodovano** (nema Sanity fetch): `klinike/kardiohirurgija` (+ `units.ts`), `nauka-istrazivanje/cardioview3d-lab` (namerni izuzetak — specifična ugnježdena struktura koja se ne ponavlja drugde, po projektnoj politici ne opravdava custom block), `aktuelnosti/*`. Editovanje sadržaja ovih stranica znači direktno menjanje `page.tsx`/`constants.ts`, Sanity Studio tu ne pomaže.

Sanity fajlovi od interesa: `sanity/lib/client.ts` (klijent, `useCdn: false`), `sanity/lib/queries.ts` (sve GROQ upite), `sanity/lib/image.ts` (`urlFor()`), `sanity/types.ts` (ručno pisani TS tipovi), `sanity/schemas/{documents,singletons,objects}/`.

### 3.1 Content Types (Sanity Schemas)

**Documents** (glavni tipovi sadržaja):

- `page` — generičke stranice sa page builder-om (fleksibilan hero + content blokovi + info boxovi + statistike). Sadržava `title`, `slug`, `subtitle` (optional, za PageHeader), `pageBuilder[]` array sa strukturovanim objektima.
- `doctor` — profili lekara (biografija, timeline, obrazovanje, reference ka odeljenjima, social links).
- `department` — odeljenja (opis, slike, reference ka uslugama i lekarima, karakteristike).
- `service` — medicinske usluge (reference ka odeljenjima, featured marker).
- `news` — vesti/blog (kategorije, rich text, featured marker).
- `publication` — naučne publikacije (DOI, PMID, Impact Factor, kategorije M21a+/M21a/M21/M22/M23, reference ka lekarima).
- `testimonial` — iskustva pacijenata (citati, rating, featured marker).
- `clinicPage` — stranice klinika (title/slug/subtitle, areas, opcioni proceduresList/staffList/patientInstructions) — jedan tip, 19 dokumenata (jedan po klinici, `_id: clinicPage-<slug>`), `order` polje za redosled na `/klinike` hub-u.
- `schoolPage` — stranice edukativnih škola (title/slug/subtitle/breadcrumbLabel, opcioni intro/programNav/stats, courseSections[] sa detaljima/metaLines/highlight, opcioni requirementsSection/examSection/team/techTeam) — jedan tip, 3 dokumenta (`_id: schoolPage-<slug>`), po uzoru na `clinicPage` za sadržaj koji ne staje u generički `page` builder.

**Singletons** (jedinstveni dokumenti): `siteSettings` (naziv/opis sajta, kontakt, radno vreme, social, globalni SEO), `navigation` (glavni meni + footer meni), plus stranični singletoni iz §3 iznad (`directorPage`, `aboutPage`, `biographyPage`, `bibliographyPage`, `footer`, homepage).

**Objects** (reusable blokovi): `hero`, `contentBlock`, `timeline`, `seoMetadata`, `infoBox`, `statItem`, `introSection` (icon, heading, paragraphs[], badges[], stats[]), `bannerBlock` (variant, icon, title, text), `cardGridBlock` (heading, subtitle, intro, numbered, cards[] — opciono `href` po kartici za nav/hub stranice, opciono `date`/`category` metapodaci), `checklistBlock` (heading, intro, items[]), `contactDirectoryBlock` (heading, subtitle, categories[] sa kontaktima), `accordionBlock` (defaultOpenId, items[] sa sekcijama), `faqBlock` (title, subtitle, items[] sa Q/A), `tabsBlock` (defaultTabId, tabs[] sa slikama/infoBlocks[]), `timelineBlock` (heading, intro, items[] — wrapuje `timeline` object), `lectureScheduleBlock` (heading, subtitle, defaultTabId, tabs[] sa items/sections predavanja — koristi `TemePredavaciTabs` na frontend strani), `documentListBlock` (heading, subtitle, items[] sa icon/label/href/year — za PDF/dokument liste).

### 3.2 GROQ primeri

```typescript
import { client } from '@/sanity/lib/client'
import { DOCTORS_QUERY, DOCTOR_BY_SLUG_QUERY } from '@/sanity/lib/queries'

const doctors = await client.fetch(DOCTORS_QUERY)
const doctor = await client.fetch(DOCTOR_BY_SLUG_QUERY, { slug: 'dr-marko-jovanovic' })
```

Fetch u Server Component-u:

```typescript
export default async function DoctorsPage() {
  const doctors = await client.fetch(DOCTORS_QUERY)
  return (
    <div>
      {doctors.map(doctor => <div key={doctor._id}>{doctor.name}</div>)}
    </div>
  )
}
```

### 3.3 Slike iz Sanity-ja

```typescript
import { urlFor } from '@/sanity/lib/image'

<Image
  src={urlFor(doctor.image).width(800).height(600).url()}
  alt={doctor.name}
  width={800}
  height={600}
/>
```

## 4. Sanity setup (novi projekat / lokalni environment)

Za korake "kreiraj Sanity projekat, popuni `.env.local`, pronađi Project ID/API token" vidi [`../README.md`](../README.md) Quick Start sekciju.

Česte greške:
- **"Invalid project ID"** — proveri `.env.local`, restartuj dev server posle izmene env varijabli.
- **"Access denied"** — API token mora biti "Editor" ili "Administrator".
- **"Schema not found"** — proveri da su svi schema fajlovi importovani u `schemas/index.ts`.
