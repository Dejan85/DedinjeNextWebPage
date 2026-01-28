# Sanity CMS Setup - Institut Dedinje

## 🚀 Quick Start

### 1. Instaliraj dodatne pakete

```bash
npm install
# ili
yarn install
```

### 2. Kreiraj Sanity projekat

```bash
# Loginuj se (ako nisi već)
npx sanity login

# Kreiraj novi projekat
npx sanity init --project-id dedinje-institute --dataset production
```

### 3. Kopiraj `.env.local.example` u `.env.local`

```bash
cp .env.local.example .env.local
```

### 4. Popuni `.env.local` sa svojim podacima

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tvoj-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tvoj-api-token
```

**Gde naći Project ID:**
1. Idi na https://sanity.io/manage
2. Klikni na svoj projekat
3. Project ID je u URL-u i na Dashboard-u

**Kako napraviti API Token:**
1. Idi na https://sanity.io/manage
2. Klikni na projekat → API → Tokens
3. Add API token → Editor (za read + write)
4. Kopiraj token (prikazuje se samo jednom!)

### 5. Pokreni development

```bash
# Terminal 1 - Next.js app
npm run dev

# Terminal 2 - Sanity Studio
npm run sanity:dev
```

**Pristup:**
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

---

## 📁 Struktura projekta

```
dedinje-next/
├── sanity/
│   ├── schemas/
│   │   ├── documents/          # Glavni tipovi sadržaja
│   │   │   ├── page.ts         # Generic stranice
│   │   │   ├── doctor.ts       # Profili lekara
│   │   │   ├── department.ts   # Odeljenja
│   │   │   ├── service.ts      # Usluge
│   │   │   ├── news.ts         # Novosti
│   │   │   ├── publication.ts  # Bibliografija
│   │   │   └── testimonial.ts  # Iskustva pacijenata
│   │   ├── singletons/         # Jedinstveni dokumenti
│   │   │   ├── siteSettings.ts # Globalna podešavanja
│   │   │   └── navigation.ts   # Navigacija
│   │   └── objects/            # Reusable blokovi
│   │       ├── hero.ts
│   │       ├── contentBlock.ts
│   │       ├── timeline.ts
│   │       ├── seoMetadata.ts
│   │       ├── infoBox.ts
│   │       └── statItem.ts
│   └── lib/
│       ├── client.ts           # Sanity client
│       ├── queries.ts          # GROQ queries
│       └── image.ts            # Image URL builder
├── app/
│   └── studio/[[...tool]]/     # Sanity Studio route
│       └── page.tsx
├── sanity.config.ts            # Sanity konfiguracija
└── sanity.cli.ts               # CLI konfiguracija
```

---

## 📝 Content Types (Schemas)

### 1. **Documents** (Glavni tipovi sadržaja)

#### `page` - Generic stranice
- Fleksibilne stranice sa page builder-om
- Može sadržati hero, content blokove, info boxove, statistike
- Perfektno za: O institutu, Kontakt, Istorijat, itd.

#### `doctor` - Profili lekara
- Kompletni profili sa biografijom, timeline-om, obrazovanjem
- Reference ka odeljenjima
- Social links, kontakt info

#### `department` - Odeljenja
- Opis odeljenja sa slikama
- Reference ka uslugama i lekarima
- Karakteristike i features

#### `service` - Usluge
- Medicinske usluge sa detaljnim opisom
- Reference ka odeljenjima
- Featured marker

#### `news` - Novosti
- Blog/vesti sa kategorijama
- Rich text editor za sadržaj
- Featured marker za istaknut sadržaj

#### `publication` - Naučne publikacije
- Bibliografija sa detaljima (DOI, PMID, Impact Factor)
- Kategorije (M21a+, M21a, M21, M22, M23)
- Reference ka lekarima

#### `testimonial` - Iskustva pacijenata
- Citati pacijenata
- Rating sistem
- Featured marker

### 2. **Singletons** (Jedinstveni dokumenti)

#### `siteSettings` - Globalna podešavanja
- Naziv i opis sajta
- Kontakt informacije
- Radno vreme
- Social media linkovi
- Globalna SEO podešavanja

#### `navigation` - Navigacija
- Glavni meni sa podmenijem
- Footer meni

### 3. **Objects** (Reusable komponente)

- `hero` - Hero sekcije
- `contentBlock` - Content blokovi sa layoutima
- `timeline` - Timeline stavke
- `seoMetadata` - SEO meta tagovi
- `infoBox` - Info kutije
- `statItem` - Statistika

---

## 🔍 GROQ Queries

Sve queries su pripremljene u `sanity/lib/queries.ts`:

```typescript
import { client } from '@/sanity/lib/client'
import { DOCTORS_QUERY, DOCTOR_BY_SLUG_QUERY } from '@/sanity/lib/queries'

// Fetch svi lekari
const doctors = await client.fetch(DOCTORS_QUERY)

// Fetch jedan lekar po slug-u
const doctor = await client.fetch(DOCTOR_BY_SLUG_QUERY, { slug: 'dr-marko-jovanovic' })
```

---

## 🎨 Kako koristiti slike iz Sanity-ja

```typescript
import { urlFor } from '@/sanity/lib/image'

// U komponenti
<Image
  src={urlFor(doctor.image).width(800).height(600).url()}
  alt={doctor.name}
  width={800}
  height={600}
/>
```

---

## 📦 Sledeći koraci

### 1. Popuni Sanity Studio sa demo sadržajem
- Idi na http://localhost:3000/studio
- Kreiraj Site Settings
- Dodaj nekoliko lekara, odeljenja, usluga

### 2. Konvertuj postojeće stranice da koriste Sanity
- Zameni hardcoded content sa Sanity queries
- Kreraj dynamic routes: `[slug]/page.tsx`

### 3. Dodaj preview mode
- Omogući pregled draft-ova pre objave

### 4. Deploy Sanity Studio
```bash
npm run sanity:deploy
```

---

## 🆘 Česte greške

### "Invalid project ID"
- Proveri da li si popunio `.env.local`
- Restartuj dev server nakon dodavanja env vars

### "Access denied"
- Proveri API token permissions
- Token mora biti "Editor" ili "Administrator"

### "Schema not found"
- Proveri da li su svi schema fajlovi pravilno importovani u `schemas/index.ts`

---

## 📚 Resursi

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Next.js + Sanity Tutorial](https://www.sanity.io/guides/nextjs-app-router-live-preview)

---

**Autor:** AI Assistant
**Datum:** 2026-01-28
