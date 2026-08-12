# Arhitektura — Institut Dedinje

Struktura repo-a, rute, i Sanity content model. Pravila i konvencije koda:
[`../CLAUDE.md`](../CLAUDE.md). Kako se stranica migrira sa hardkodovanog
sadržaja na Sanity: [`MIGRACIJA.md`](MIGRACIJA.md). Šta je već migrirano vs.
šta čeka: [`TASKS.md`](TASKS.md).

---

## 1. Struktura repozitorijuma

```
app/[locale]/layout.tsx SVE rute (App Router), ugnježdeni layout (next-intl setup, Header/Footer rendering); Header/Footer se rendivaju ovde (nisu u root, da bi se ažurirali pri soft navigaciji između `/` i `/en`)
app/[locale]/           SVE rute (App Router), svaka sa page.tsx + page.module.css (+ metadata.ts kad treba) — ugnježdene pod dinamički [locale] segment (next-intl, vidi §2.1)
app/studio/             Sanity Studio, van [locale] (nema i18n)
app/layout.tsx          root layout (html/body, bez Header/Footer), deljen između /studio i /[locale]/* — NEMA "multiple root layouts"
i18n/                   next-intl konfiguracija (routing.ts, navigation.ts, request.ts)
messages/               next-intl statički UI "chrome" stringovi po jeziku (sr.json/en.json) — dugmad, aria-labels, forme, prazna stanja; koristi se preko useTranslations()/getTranslations(). Editorijalni sadržaj i dalje ide kroz Sanity localize()
proxy.ts                next-intl middleware (Next.js 16 preimenovao "middleware"→"proxy" konvenciju)
components/shared/      ~50 reusable UI komponenti, svaka u svom folderu, barrel export iz index.ts
components/typography/  Heading, Text, Badge, Link — dizajn-sistem primitivi
lib/transliteration/     Ćirilica→Latinica transliteracija (cyrillicToLatin.ts, transliterateDom.ts)
sanity/                 schemas/ (documents, singletons, objects), lib/ (client, queries, image), types.ts
scripts/                jednokratne migracione skripte (tsx), pune Sanity dataset iz hardkodovanog sadržaja
public/                 images/, videos/ (hero pozadine), pdf/ (CV, bibliografija)
out/                    build artefakt od `build:static` (nije izvor istine, ne editovati ručno)
```

### 1.1 i18n rutiranje (SRP/ENG, počelo 2026-08-04)

`next-intl` sa `localePrefix: "as-needed"` — SR (podrazumevani jezik) ostaje
**bez prefiksa** (`/aktuelnosti`, identično kao pre uvođenja i18n), EN je
**novo, prefiksovano** (`/en/aktuelnosti`). `app/[locale]/layout.tsx` je
ugnježdeni layout (next-intl setup + Header/Footer rendering), NE novi root — pravi root ostaje
`app/layout.tsx`, deljen i sa `/studio`. **Bitan detalj (2026-08-04):** Header i Footer se
sada rendivaju iz `app/[locale]/layout.tsx` (ne iz root `app/layout.tsx`) kako bi se ispravno
ažurirali nakon soft navigacije između `/` i `/en` — Next.js App Router ne re-renderuje
server-component stablo iznad gde se URL segmenti granaju, pa da su ostali u root layout-u,
ne bi se promenio jezil/pismo pri kliku na `LanguageSwitch` bez hard reload-a. Detaljan status
faza (3a/3b/3c/3d/3e gotovo, 3f čeka ljudski review) u
[`TASKS.md`](TASKS.md#internacionalizacija--srpeng-i18n-počelo-2026-08-04).

**Lokalizacija Sanity šeme (Faza 3b — ✅ gotovo):** reusable object tipovi
`localeString`/`localeText`/`localePortableText` (`sanity/schemas/objects/`,
`{sr, en}` shape) zamenjuju `type:"string"/"text"`/portable text nizove polje
po polje — NE `document-internationalization` plugin (forkovao bi cele
dokumente). Deljena Studio input komponenta `sanity/components/LocaleTabInput.tsx`
renderuje sr/en kao tabove. Primenjeno na svih 51 schema fajl (12 dokument
tipova, 8 singletona, 31 objekat/blok) — izuzeci: `publication.ts`/
`bibliographyPage.categories[].publications[].text` (bibliografski citati) i
`contentBlock.content` (bespoke portable text konfiguracija, nekorišćena na
frontend-u).

**Migracija postojećeg sadržaja (Faza 3c — ✅ gotovo):**
`scripts/migrate-i18n-schema.ts` (`npm run migrate:i18n-schema`) — schema-driven
(čita `sanity/schemas/index.ts` direktno, ne ručno pisanu allowlist mapu),
idempotentna, `--dry-run`/`--dataset=`/`--type=` flagovi. Pokrenuta na
`production`: 99 dokumenata/423 polja plain-string → `{sr,en}`.

**AI prevod sadržaja (Faza 3d — ✅ gotovo):** bez posebnog Anthropic API
ključa — prevod odrađen direktno u Claude Code sesiji (11 paralelnih Agent
poziva), ne headless skriptom. `scripts/i18n-export-untranslated.ts`
(schema-driven, isti pristup kao `migrate-i18n-schema.ts`) izvlači leaf
`{sr,en}` zadatke (2742 polja, 99 dokumenata — 423 iz 3c su top-level
dokument-polja, 2742 su pojedinačni stringovi unutar njih);
`scripts/i18n-apply-translations.ts` upisuje prevode preko granularnog
Sanity patch path-a (`polje[_key=="xxx"].podpolje.en`) + `enReviewed: false`
po dokumentu. `enReviewed: boolean` (human review gate, granularnost **po
dokumentu**) dodat na svih 20 document/singleton tipova sa lokalizovanim
sadržajem. `app/sitemap.ts` isključuje `/en/klinike/*` i `/en/za-pacijente/*`
iz sitemap-a dok dokument nema `enReviewed: true` (2 za-pacijente dokumenta
imaju Sanity slug različit od URL segmenta — `ZA_PACIJENTE_SLUG_OVERRIDES`
mapa u `sitemap.ts` to rešava). `noindex` meta NIJE dodat (samo sitemap) —
zahtevalo bi da ~70 statičnih `metadata.ts` fajlova fetch-uju Sanity, van
scope-a (vidi `PROJECT_STATUS.md` Backlog).

**Frontend čitanje lokalizovanog sadržaja (Faza 3e — ✅ gotovo):**
`sanity/lib/locale.ts` ima dva helpera — `pick<T>(field, locale)` (leaf-level,
EN pada nazad na SR) i `localize<T>(data, locale)` (rekurzivno hoda kroz ceo
fetch-ovan objekat/niz, vraća identičan plain-string oblik kakav je postojao
pre 3b/3c). Konvencija: svaki fetch call-site (`page.tsx`/`metadata.ts`/
`HeaderData.tsx`/`Footer.tsx`) poziva `localize(rawFetchResult, locale)`
odmah posle `client.fetch(...)`, pre prosleđivanja dalje — downstream
komponente (`PageBuilder.tsx`, `ClinicPageTemplate.tsx`, sve leaf blok
komponente) ostaju netaknute jer im podatak stiže kao plain string. `locale`
se čita iz `params.locale` (route-level) ili `getLocale()` iz
`next-intl/server` (za `HeaderData.tsx`/`Footer.tsx`, van route-param
konteksta).

**WordPress vesti i18n patch (2026-08-12):** 302 `news` dokumenata iz
WordPress migracije 2026-08-05 nikad nisu prošla kroz Faze 3c/3d — WP migracija
se desila DAN POSLE tih faza, pa su ostala sa `title`/`excerpt` kao obični
stringovi umesto `localeString` objekata. Otkriveno i ispravljeno 2026-08-12:
ponovna primena `migrate-i18n-schema.ts` sa `--type=news`, konverzija 1208
polja (4 × 302 dokumenata), batch prevod title+excerpt (604 polja) kroz 6
Agent poziva. `fullText`/`author` namerno BEZ prevoda za sada — poznato
ograničenje, zadržavaju `{sr,en:""}` oblik pa se `localize()` ispravno pada
na SR dok se ne prevede. Rezultat: 302/302 dokumenata, 604 polja upisano,
`enReviewed: false` po dokumentu, identičan review gate kao ostatak sadržaja.
Razlika: **Faze 3c/3d su pokrile 99 dokumenata/2742 polja (postojeći sadržaj),
WordPress patch je pokrila 302 vesti/1208 polja (WP import), suženo na
title+excerpt za prevod.** `localize()` helper automatski ispravno pada na
SR tekst za `fullText`/`author` gde je `en` prazan — nema regression-a,
identično ponašanje kao sa svim drugim neprevršenim delovima.

— ovaj fajl opisuje samo trenutnu strukturu, ne plan.

`npm run build:static` (`output:"export"`) ne podržava next-intl middleware
(`proxy.ts`) — `scripts/build-static.mjs` ga privremeno uklanja pre exporta.
Posledica: static export gubi "SR bez prefiksa" trik. Osim toga, static
export ima i deo pre-postojećeg, nevezanog ograničenja — vidi
`PROJECT_STATUS.md` Blokeri (`build:static` fundamentalno...).

## 2. Rute (app/) — pregled po sekcijama

- `/` — početna (hero slider sa 1 videonom slajdom, 4 info kartice sa linkovima "Informacije za pacijente/Naše klinike/Naš tim/Kontakt", statistike, klinike, tim, vesti, partneri) — Sanity-backed, vidi §3. 4 info kartice redizajnirane 2026-08-05 sa novim sadržajem i novim `contact` variantom. **Napomena (2026-08-05):** sekcije "usluge" (`servicesSection`), "zašto mi" (`whyChooseUsSection`), citat direktora, CTA baner i "kontakt CTA"+mapa su trenutno isključene preko `HOMEPAGE_SECTION_TOGGLES` konstante u `app/[locale]/page.tsx` (svi flagovi `false`) — kod/podaci ostaju netaknuti, samo se ne renderuju; vidi `PROJECT_STATUS.md` dnevnik.
- `/rec-direktora`, `/o-institutu`, `/biografija`, `/bibliografija` — Sanity-backed singletoni (vidi §3 ispod).
- `/o-nama/{lokacija,nemedicinski-poslovi,odbori-i-organi-instituta,zdravstvena-akreditacija}` — Sanity-backed (`page` dokumenti, `section: "ostalo"`); mapa/adresa/CTA dugmad ostaju u template kodu (nisu editorski sadržaj).
- `/klinike` + 20 podstranica — svih 20 Sanity-backed (`clinicPage` multi-instance tip, vidi §3 ispod), sve kroz zajednički `ClinicPageTemplate` (opcioni `proceduresList`/`staffList`/`patientInstructions`/`stats`/`highlights`/`organizationalStructure`/`units` blokovi — poslednja 4 trenutno popunjena samo za `kardiohirurgija`, koja i dalje ima i 5 pod-ruta `/klinike/kardiohirurgija/<unit-slug>` čitanih iz `clinicPage.units[]`).
- `/za-pacijente` — landing hub stranica (čita `patientLinksSection` sa homepage-a, prikazuje linkove na sve 12 podstranica) + 12 podstranica — svi Sanity-backed (`page` multi-instance tip sa reusable pageBuilder blokovima, vidi §3 ispod).
- `/nas-tim` — tim doktora (čita `teamSection` sa homepage-a, prikazuje kartice sa lekarima) — Sanity-backed, sadržaj deljiv sa homepage sekcijom.
- `/nauka-istrazivanje` + podstranice (NIO, centar izuzetnih vrednosti, SAIGE projekat, lista istraživača, CardioView3D lab) — svih 7 Sanity-backed (`page` multi-instance tip); stara `/workshop` ruta i dalje radi čist redirect (bez sadržaja).
- `/edukacija` + 16 podstranica (KME, kongresi, radionice, `sestrinska-edukacija` hub + 4 podstranice) — 13 Sanity-backed (`page` multi-instance tip), + 3 škole (`/edukacija/programi/skola-*`) Sanity-backed kroz bespoke `schoolPage` multi-instance tip (vidi §3 ispod).
- `/aktuelnosti` + `[slug]` + podsekcije (vesti, gostovanja, obaveštenja, oglasi-konkursi, časopis Dedinje, informator) — svih 9 Sanity-backed (`news`/`video`/`announcement`/`jobPosting`/`magazineIssue` multi-instance tipovi + `informatorPage` singleton, vidi §3 ispod).
- `/kontakt` — Sanity-backed sadržaj (kontakt kartice čitaju `siteSettings` singleton, ne dupliraju vrednosti); forma i dalje ne šalje nikuda (infra pitanje, vidi `PROJECT_STATUS.md`), mapa/CTA tekst ostaju u template kodu.
- `/studio/[[...tool]]` — Sanity Studio, montiran direktno u Next.js app.
- Glavni meni (`Header.tsx`) — Sanity-backed (`navigation` singleton, 3 nivoa). Top-level stavke (2026-08-05): "ПОЧЕТНА", "О НАМА" (submenu sa 4 linka), "НАШ ТИМ" (link `/nas-tim`), "КЛИНИКЕ" (submenu), "ЗА ПАЦИЈЕНТЕ" (link `/za-pacijente` + submenu sa 12 podstranica), "НАУКА И ИСТРАЖИВАЊЕ" (submenu), "ЕДУКАЦИЈА" (submenu), "АКТУЕЛНОСТИ" (submenu). Header komponenta detektuje aktivnu stranicu pomoću `usePathname()` iz `@/i18n/navigation` i highlights aktivni link + parent stavke (`.active` CSS klasa). Vidi §3.

## 3. Content model — hibridni pristup (CMS + hardkodovani fallback)

Projekat je **prošao kroz postepenu migraciju** sa hardkodovanog sadržaja ka Sanity CMS-u, stranica po stranica — od 2026-08-03 praktično svaka ruta na sajtu je Sanity-backed. Za tačan status po ruti vidi [`TASKS.md`](TASKS.md); za obrazac kako se migracija sprovodi vidi [`MIGRACIJA.md`](MIGRACIJA.md).

**Bitno:** "Sanity-backed" ovde znači da je Sanity **izvor istine**, ne da je svaki fetch garantovano uspešan — svaka migrirana stranica namerno zadržava **pun hardkodovani fallback** u kodu (isti sadržaj kao poslednji poznati Sanity export) koji se koristi ako fetch ne uspe, tako da sajt nikad ne padne zbog nedostupnog Sanity-ja. To NIJE "nedovršena migracija", to je namerni deo obrasca (vidi `MIGRACIJA.md`).

**Sanity-backed** (svaka ima hardkodovani fallback u `page.tsx`/`data.ts`):
- Početna (`page: _id "homepage"`, `HOMEPAGE_QUERY`, page-builder sekcije, uklj. hero slajdove i "brze linkove" — vidi §3.1)
- `footer` (singleton, `FOOTER_QUERY`)
- `navigation` (singleton, `NAVIGATION_QUERY`, glavni meni — fetch-uje se preko `components/shared/Header/HeaderData.tsx` server wrappera, prosleđuje `menu` prop klijentskom `Header.tsx` koja detektuje aktivnu stranu; top-level stavke mogu imati `link` (hub stranica) i/ili `submenu` (dropdown), klijent renderuje kao Link sa odvojenim chevron-ikonomom kad ima oba polja, ili kao toggle-button kad nema link-a)
- `siteSettings` (singleton, `SITE_SETTINGS_QUERY` — kontakt info/radno vreme, koristi ga `/kontakt` i `/o-nama/lokacija`)
- `directorPage` (`/rec-direktora`), `aboutPage` (`/o-institutu`), `biographyPage` (`/biografija`), `bibliographyPage` (`/bibliografija`)
- `clinicPage` (`/klinike/*`, 20 od 20 stranica — multi-instance document tip, vidi §3.1 i [`MIGRACIJA.md`](MIGRACIJA.md))
- `page` (`/za-pacijente/*` 12/12, `/edukacija/*` 13/16, `/nauka-istrazivanje/*` 7/7, `/o-nama/*` 4/4, `/kontakt` — multi-instance document tip sa reusable pageBuilder blok tipovima, vidi §3.1 i [`MIGRACIJA.md`](MIGRACIJA.md))
- `schoolPage` (`/edukacija/programi/skola-*`, 3 od 3 stranice — multi-instance document tip po uzoru na `clinicPage`, za sadržaj koji ne staje u generički `page` builder, vidi §3.1)
- `news`/`video`/`announcement`/`jobPosting`/`magazineIssue`/`event` (`/aktuelnosti/*` — multi-instance document tipovi, jedan po podsekciji jer se polja bitno razlikuju; `event` tip se koristi i za homepage vidžet "Предстојећи догађаји" u sekciji Aktuelnosti) + `informatorPage` (singleton)

**Namerno van Sanity-ja** (nije "sadržaj" u smislu editorskog teksta): kontakt forma (slanje emaila — infra pitanje, ne CMS), Google Maps iframe-ovi (`/kontakt`, `/o-nama/lokacija`), CTA dugmad/navigacija unutar template-a. Ovo su funkcionalni/strukturni delovi koda, ne redovi koje editor treba da menja.

Sanity fajlovi od interesa: `sanity/lib/client.ts` (klijent, `useCdn: false`), `sanity/lib/queries.ts` (sve GROQ upite), `sanity/lib/image.ts` (`urlFor()`), `sanity/types.ts` (ručno pisani TS tipovi), `sanity/schemas/{documents,singletons,objects}/`, `sanity/structure.ts` (custom Studio meni, vidi §3.4).

### 3.1 Content Types (Sanity Schemas)

**Documents** (glavni tipovi sadržaja):

- `page` — generičke stranice sa page builder-om (fleksibilan hero + content blokovi + info boxovi + statistike). Sadržava `title`, `slug`, `subtitle` (optional, za PageHeader), `pageBuilder[]` array sa strukturovanim objektima.
- `doctor` — profili lekara (biografija, timeline, obrazovanje, reference ka odeljenjima, social links).
- `department` — odeljenja (opis, slike, reference ka uslugama i lekarima, karakteristike).
- `service` — medicinske usluge (reference ka odeljenjima, featured marker).
- `news` — vesti/blog (kategorije, rich text, featured marker).
- `publication` — naučne publikacije (DOI, PMID, Impact Factor, kategorije M21a+/M21a/M21/M22/M23, reference ka lekarima).
- `testimonial` — iskustva pacijenata (citati, rating, featured marker).
- `clinicPage` — stranice klinika (title/slug/subtitle, areas, opcioni proceduresList/staffList/patientInstructions/organizationalStructure/stats/highlights/units) — jedan tip, 20 dokumenata (jedan po klinici, `_id: clinicPage-<slug>`), `order` polje za redosled na `/klinike` hub-u. `units[]` (samo `kardiohirurgija`) nosi 5 pod-jedinica (slug/title/heroImage/heroSubtitle/sections[] paragraph|list) za `/klinike/kardiohirurgija/<unit-slug>` rute. `staffList.groups[].members[]` (ime+uloga objekti) je alternativa prostom `names[]` kad treba prikaz kartica sa ulogom.
- `schoolPage` — stranice edukativnih škola (title/slug/subtitle/breadcrumbLabel, opcioni intro/programNav/stats, courseSections[] sa detaljima/metaLines/highlight, opcioni requirementsSection/examSection/team/techTeam) — jedan tip, 3 dokumenta (`_id: schoolPage-<slug>`), po uzoru na `clinicPage` za sadržaj koji ne staje u generički `page` builder.
- `video` — gostovanja u medijima (title/slug/youtubeId/source/date/description/fullText/isNew/order).
- `announcement` — obaveštenja (title/date/icon/type/text/important/order).
- `jobPosting` — oglasi i konkursi (title/date/type/icon/text/active/deadline/order).
- `magazineIssue` — izdanja Časopisa Dedinje (volume/number/year/title/topics[]/pdfUrl/coverColor/order).
- `event` — događaji/skupovi sa datumima (title `localeString`/date `Sanity date`/image obavezno/location optional plain string/link optional — novi tip od 2026-08-05, bez detail ruta, koristi se za homepage widget "Предстојећи догађаји" u sekciji Aktuelnosti; `enReviewed: boolean` gate kao sve lokalizovane stranice).

**Singletons** (jedinstveni dokumenti): `siteSettings` (naziv/opis sajta, kontakt, radno vreme, social, globalni SEO), `navigation` (glavni meni, `mainMenu[]` do 3 nivoa dubine + footer meni), `informatorPage` (hero tekst/datumi/PDF link/sections[]/kontakt, za `/aktuelnosti/informator`), `footer` (institucijsko ime/podnaslov/opis/società linkovi — redizajniran 2026-08-05, sada ima `locations[]` array od 3 lokacije sa `title`/`mapEmbedUrl`/`address`/`city`, zamenjuje stare `quickLinks`/`services`/`contact` polja; logo/opis/društvene mreže/copyright ostaju kao i pre), plus stranični singletoni iz §3 iznad (`directorPage`, `aboutPage`, `biographyPage`, `bibliographyPage`, homepage).

**Objects** (reusable blokovi): `hero`, `contentBlock`, `timeline`, `seoMetadata`, `infoBox` (variant: `regular`/`schedule`/`emergency`/`contact` — gde `contact` ima `contactPhone`/`contactFax` polja, dodano 2026-08-05; `title`/`description`/`linkText` su `localeString` tip od Faze 3b i18n migracije), `statItem`, `introSection` (icon, heading, paragraphs[], badges[], stats[]), `bannerBlock` (variant, icon, title, text), `cardGridBlock` (heading, subtitle, intro, numbered, cards[] — opciono `href`/`date`/`category`/`contactPerson`/`phone`/`email` po kartici), `checklistBlock` (heading, intro, items[]), `contactDirectoryBlock` (heading, subtitle, categories[] sa kontaktima), `accordionBlock` (defaultOpenId, items[] sa sekcijama), `faqBlock` (title, subtitle, items[] sa Q/A), `tabsBlock` (defaultTabId, tabs[] sa slikama/infoBlocks[]/introList[]/focusCards[]/outroParagraphs[]), `timelineBlock` (heading, intro, items[] — wrapuje `timeline` object), `lectureScheduleBlock` (heading, subtitle, defaultTabId, tabs[] sa items/sections predavanja — koristi `TemePredavaciTabs` na frontend strani), `documentListBlock` (heading, subtitle, items[] sa icon/label/href/year — za PDF/dokument liste), `boardListBlock` (heading, subtitle, boards[] sa icon/title/chairman/viceChairman/membersLabel/members[] — akordeon odbora/organa, koristi `BoardListBlock.tsx`), `heroSlidesSection` (slides[] sa badge/title/subtitle/video/image — homepage hero slajder), `clinicsFeaturedSection`/`patientLinksSection` (icon/heading/subheading/items[] sa icon/title/desc/href — svi text field-ovi (`heading`/`subheading` i `items[].title`/`items[].desc`) su `localeString` tip od Faze 3b i18n migracije — homepage "brzi linkovi" sekcije).

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

### 3.4 Studio Content Structure (`sanity/structure.ts`)

Studio meni (`/studio`) **nije** default flat lista schema tipova — `sanity.config.ts`
prosleđuje custom `structure` funkciju u `structureTool({ structure })`. Meni
grupiše sadržaj po redosledu stvarne navigacije sajta, ne po redosledu schema
tipova:

Почетна (pinovan `page` dokument `_id: "homepage"`) → О нама (4 singleton linka:
Реч директора/О институту/Биографија/Библиографија + podgrana "Остале странице"
za `page` dokumente sa `section == "ostalo"`: Локација/Немедицински послови/
Одбори и органи/Здравствена акредитација) → Клинике (`clinicPage`, sortirano
po `order`, uklj. kardiohirurgiju) → За пацијенте / Наука и истраживање /
Едукација (svaka lista `page` dokumente filtrirane po `section` polju,
Едукација dodatno ima podlistu `schoolPage`) → *divider* → Тим и услуге
(`doctor`/`department`/`service`) → Актуелности (`news`/`video`/`announcement`/
`jobPosting`/`magazineIssue` + `informatorPage` singleton) → Новости и садржај
(`publication`/`testimonial` — ovi tipovi još nisu prikazani na sajtu) →
*divider* → Навигација/Footer/Подешавања сајта (flat root stavke, ne
fasciklovane).

`page` dokument tip ima `section` polje (`"za-pacijente" | "edukacija" |
"nauka-istrazivanje" | "ostalo"`, required, `initialValue: "ostalo"`) čisto radi
ovog grupisanja — slug sam po sebi ne nosi informaciju o sekciji sajta (npr.
`"nio"`, `"kongresi"`, `"ambulante"` nemaju zajednički prefiks). Nova `page`
stranica bira sekciju u formi; ako se doda nova top-level sekcija sajta,
proširiti `options.list` u `sanity/schemas/documents/page.ts` i granu u
`sanity/structure.ts`. Jednokratni backfill za postojeće dokumente:
`scripts/backfill-page-section.ts` (`npm run migrate:backfill-page-section`).

## 4. Sanity setup (novi projekat / lokalni environment)

Za korake "kreiraj Sanity projekat, popuni `.env.local`, pronađi Project ID/API token" vidi [`../README.md`](../README.md) Quick Start sekciju.

Česte greške:
- **"Invalid project ID"** — proveri `.env.local`, restartuj dev server posle izmene env varijabli.
- **"Access denied"** — API token mora biti "Editor" ili "Administrator".
- **"Schema not found"** — proveri da su svi schema fajlovi importovani u `schemas/index.ts`.
