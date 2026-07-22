# Migracija stranica na Sanity CMS — obrazac

Ovaj fajl dokumentuje **kako** je `/rec-direktora` migriran sa hardkodovanog
sadržaja na Sanity CMS — koristi ga kao obrazac za migraciju bilo koje druge
rute. Za tačan status koje su rute već migrirane vs. čekaju, vidi
[`TASKS.md`](TASKS.md). Za content model vidi [`ARHITEKTURA.md`](ARHITEKTURA.md).

## Šta je urađeno (primer: `/rec-direktora`)

### 1. Sanity Schema (`sanity/schemas/singletons/directorPage.ts`)
Kreiran singleton schema koji definiše strukturu stranice:
- **Hero sekcija**: slika, badge, naslov, podnaslov
- **Info kartice**: do 3 kartice sa ikonicama i linkovima
- **Poruka direktora**: badge, naslov, paragrafi, potpis, video
- **Citat**: tekst i autor
- **Partneri**: heading i lista partnera
- **SEO**: meta title i description

### 2. Migracioni skript (`scripts/migrate-director.ts`)
Kreiran skript koji:
- Prebacuje sve hardkodovane podatke u Sanity
- Koristi istu strukturu kao postojeće migracije
- Dodat u `package.json` kao `npm run migrate:director`

### 3. TypeScript tipovi (`sanity/types.ts`)
Dodati interfejsi: `DirectorHero`, `DirectorInfoCard`, `DirectorMessageParagraph`, `DirectorMessage`, `DirectorQuote`, `DirectorPartners`, `DirectorPage`.

### 4. Sanity Query (`sanity/lib/queries.ts`)
Dodat `DIRECTOR_PAGE_QUERY` koji povlači sve podatke za stranicu.

### 5. Metadata (`app/rec-direktora/metadata.ts`)
Ažuriran da dinamički povlači SEO podatke iz Sanity-ja sa fallback-om.

### 6. Page komponenta (`app/rec-direktora/page.tsx`)
Konvertovana iz client u **server component**:
- Fetch-uje podatke iz Sanity-ja
- Ima fallback podatke ako Sanity nije dostupan
- Dinamički renderuje sve sekcije na osnovu CMS podataka
- Koristi `.map()` za liste umesto hardkodiranih komponenti

## Kako pokrenuti migraciju

```bash
# 1. Pokreni migraciju
npm run migrate:director

# 2. Otvori Sanity Studio
npm run sanity:dev
# Ili idi na http://localhost:3000/studio

# 3. Idi na "Reč direktora" singleton
# 4. Upload sliku direktora u Hero > Image
# 5. Publish promene
```

## Prednosti Sanity integracije

- **Lako uređivanje** — sadržaj se menja kroz UI, bez koda
- **Tipska sigurnost** — TypeScript tipovi za sve podatke
- **Fallback** — stranica radi i ako Sanity nije dostupan
- **SEO** — dinamički metadata iz CMS-a
- **Server Component** — bolje performanse, nema "use client"
- **Verzionisanje** — Sanity čuva istoriju promena
- **Image optimization** — automatska optimizacija slika

## Šta se može dalje uređivati kroz CMS (po migriranoj stranici)

Tekst hero sekcije, slika direktora, sve info kartice (ikonice, tekst, linkovi), poruka direktora (paragrafi, potpis), video link i caption, citat, partneri i sertifikati, SEO meta podaci.

## Struktura fajlova (obrazac za novu migraciju)

```
sanity/
  schemas/
    singletons/
      <ime>Page.ts              # Schema definicija
  lib/
    queries.ts                  # <IME>_PAGE_QUERY
  types.ts                      # TypeScript interfejsi

app/
  <ruta>/
    page.tsx                    # Server component
    metadata.ts                 # Dynamic SEO

scripts/
  migrate-<ime>.ts              # Migracioni skript
```

## Schema strategija po tipu sadržaja

Dosadašnjih 5 migriranih stranica su sve **bespoke singletoni** — jedinstvena
stranica, poseban schema fajl skrojen tačno po njenim poljima. Za preostalih
~70 stranica (vidi detaljan task-breakdown u [`TASKS.md`](TASKS.md)) to bi
značilo 70 schema fajlova za slične ili identične oblike, pa se koriste dva
dodatna obrasca gde ima smisla:

- **Bespoke singleton** (dosadašnji obrazac) — kad je stranica jedinstvena i
  ima specifična polja koja se ne ponavljaju nigde drugde (primer:
  `directorPage`, `biographyPage`).
- **Generički `page` document** (`sanity/schemas/documents/page.ts`, postojao
  neiskorišćen, sada prošireno) — za uniformne info-stranice sa reusable
  page-builder blokovima. Jedan dokument po ruti, isti schema za sve. Sadržava
  11 strukturovanih block objekata (ne portable text): `introSection`
  (icon, heading, paragraphs[], badges[], stats[]), `bannerBlock` (variant info/alert/warning/motto/highlight), `cardGridBlock` (numbered cards sa ikonama/vrednostima, opciono `href` za klikabilne nav kartice, opciono `date`/`category` metapodaci — dodato za `nauka-istrazivanje/aktuelnosti` kartice), `checklistBlock` (items sa checkmarkom), `contactDirectoryBlock` (kategorije sa kontakt vremenom), `accordionBlock` (items sa expandable sekcijama), `faqBlock` (Q/A items sa kategorijama), `tabsBlock` (tabovi sa slikama/info-blokovima — mirror `SidebarTabs` + `InfoBlock` pattern), `timelineBlock` (godina+opis stavke, wrapuje `timeline` object — dodato za Edukaciju), `lectureScheduleBlock` (tabovi po godinama sa predavanjima/predavačima — dodato za Edukaciju, mirror `TemePredavaciTabs` pattern), `documentListBlock` (heading, subtitle, items sa icon/label/href/year — dodato za `nauka-istrazivanje/nio` PDF listu, reusable za `/aktuelnosti/informator`/`/aktuelnosti/casopis-dedinje`/`/akta-instituta` PDF arhive). Isti `page` builder za sve `za-pacijente/*`, `edukacija/*`, `nauka-istrazivanje/*` rute — infrastruktura je skalabilna, novi block tip se dodaje samo kad se pojavi sasvim nova struktura sadržaja koja se ponavlja (kao što je bio slučaj sa timeline/lecture-schedule za Edukaciju, i documentList za Nauku-istraživanje).
- **Multi-instance document tip** — kad postoji više instanci istog oblika
  sadržaja: jedan `clinicPage` tip za svih ~20 klinika (umesto 20 singleton
  schema-a), jedan `schoolPage` tip za 3 edukativne škole (sadržaj koji ne
  staje čisto u generički `page` builder — kursevi, statistike, timovi), i
  reuse postojećeg `news` document tipa (već postoji, neiskorišćen)
  za vesti/obaveštenja/oglase/gostovanja pod `aktuelnosti/*`. Dodavanje nove
  klinike/škole/vesti postaje novi Sanity dokument kroz Studio, bez novog koda.

Za stranice koje ne staju čisto u generički `page` builder (npr. tabovi,
strukturirane tabele, liste dokumenata) — dodati novi content-block objekat
umesto bespoke singleton-a, ako se oblik ponavlja na više mesta.

## Status migracije po ruti

> Ažurirano po [`TASKS.md`](TASKS.md) — ne duplirati detaljan tracking ovde,
> samo kratak pregled.

- ✅ Početna, `footer`, `/rec-direktora`, `/o-institutu`, `/biografija`, `/bibliografija` — migrirano (bespoke singletoni).
- ✅ `klinike/*` (19 od 20 stranica, `clinicPage` multi-instance tip) — migrirano. Kardiohirurgija ostaje hardkodovana (custom page + `units.ts`, ne staje u generički tip).
- ✅ `za-pacijente/*` (12 od 12 stranica, generički `page` builder sa 8 novih reusable block tipova) — migrirano.
- ✅ `edukacija/*` (16 od 16 stranica — 13 generički `page` builder sa reuse infrastrukture iz za-pacijente + 2 nova block tipa `timelineBlock`/`lectureScheduleBlock`, 3 škole kroz bespoke `schoolPage` multi-instance tip) — migrirano.
- ✅ `nauka-istrazivanje/*` (5 od 7 stranica migrirano, 2 namerno hardkodovana kao izuzeci — vidi detalje u [`TASKS.md`](TASKS.md) sekcija 4) — generički `page` builder sa reuse infrastrukture + 1 nov block tip `documentListBlock`.
- ❌ `aktuelnosti/*` (reuse `news` multi-instance tip) — detaljan task-breakdown po ruti u [`TASKS.md`](TASKS.md).
