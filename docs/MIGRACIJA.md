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

## Status migracije po ruti

> Ažurirano po [`TASKS.md`](TASKS.md) — ne duplirati detaljan tracking ovde,
> samo kratak pregled.

- ✅ Početna, `footer`, `/rec-direktora`, `/o-institutu`, `/biografija`, `/bibliografija` — migrirano.
- ❌ `klinike/*`, `za-pacijente/*`, `edukacija/*`, `nauka-istrazivanje/*`, `aktuelnosti/*` — još hardkodovano, isti obrazac treba primeniti kad se odluči prioritet.
