# Institut Dedinje - Next.js Website

Moderna web aplikacija za Institut za kardiovaskularne bolesti Dedinje, razvijena sa Next.js 16 i Sanity CMS.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity.io
- **Styling:** Custom CSS + CSS Variables
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Package Manager:** npm / yarn

## 📋 Prednosti

1. **50+ stranica** spremno za skaliranje
2. **Sanity CMS** za lako upravljanje sadržajem
3. **TypeScript** za type safety
4. **SEO optimizovano** sa metadata po stranicama
5. **Responsive dizajn** za sve uređaje
6. **Static export** opcija za unit hosting

## 🛠️ Instalacija

### 1. Kloniraj repo i instaliraj dependencies

```bash
npm install
# ili
yarn install
```

### 2. Setup Sanity CMS

Detaljno uputstvo u **[SANITY_SETUP.md](./SANITY_SETUP.md)**

**Kratak pregled:**

```bash
# Login u Sanity
npx sanity login

# Kreiraj projekat (ili koristi postojeći)
npx sanity init

# Kopiraj environment varijable
cp .env.local.example .env.local

# Popuni .env.local sa svojim podacima
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### 3. Pokreni development

```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Sanity Studio
npm run sanity:dev
```

**Pristup:**
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## 📁 Struktura projekta

```
dedinje-next/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Početna strana
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Globalni stilovi
│   ├── biografija/        # Biografija stranica
│   ├── bibliografija/     # Bibliografija stranica
│   ├── o-institutu/       # O institutu stranica
│   ├── rec-direktora/     # Reč direktora stranica
│   └── studio/            # Sanity Studio route
├── components/
│   ├── shared/            # Reusable komponente
│   └── typography/        # Typography komponente
├── public/                # Static assets
│   ├── images/
│   ├── videos/
│   └── pdf/
├── sanity/                # Sanity CMS setup
│   ├── schemas/           # Content schemas
│   │   ├── documents/     # Main content types
│   │   ├── singletons/    # Global settings
│   │   └── objects/       # Reusable blocks
│   ├── lib/               # Sanity utilities
│   │   ├── client.ts      # Sanity client
│   │   ├── queries.ts     # GROQ queries
│   │   └── image.ts       # Image URL builder
│   └── types.ts           # TypeScript types
├── sanity.config.ts       # Sanity configuration
├── next.config.ts         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Pokreni Next.js dev server
npm run sanity:dev       # Pokreni Sanity Studio

# Production
npm run build            # Build Next.js za production
npm run build:static     # Build static export
npm run start            # Pokreni production server

# Sanity
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:manage    # Otvori Sanity management

# Linting
npm run lint            # Pokreni ESLint
```

## 🎨 Content Types (Sanity Schemas)

### Dokumenti (Documents)
- **Pages** - Generic stranice sa page builder-om
- **Doctors** - Profili lekara sa biografijom
- **Departments** - Odeljenja instituta
- **Services** - Medicinske usluge
- **News** - Novosti i članci
- **Publications** - Naučne publikacije
- **Testimonials** - Iskustva pacijenata

### Singletons
- **Site Settings** - Globalna podešavanja
- **Navigation** - Navigacioni meniji

### Objects (Reusable)
- **Hero** - Hero sekcije
- **Content Block** - Sadržaj blokovi
- **Timeline** - Timeline komponente
- **SEO Metadata** - SEO tagovi
- **Info Box** - Info kutije
- **Stat Item** - Statistika

## 🔍 Kako koristiti Sanity

### Fetch data u Server Component

```typescript
import { client } from '@/sanity/lib/client'
import { DOCTORS_QUERY } from '@/sanity/lib/queries'

export default async function DoctorsPage() {
  const doctors = await client.fetch(DOCTORS_QUERY)
  
  return (
    <div>
      {doctors.map(doctor => (
        <div key={doctor._id}>{doctor.name}</div>
      ))}
    </div>
  )
}
```

### Optimizuj slike

```typescript
import { urlFor } from '@/sanity/lib/image'

<Image
  src={urlFor(doctor.image).width(800).height(600).url()}
  alt={doctor.name}
  width={800}
  height={600}
/>
```

## 🚢 Deployment

### Vercel (Preporučeno)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Environment variables koje treba dodati na Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

### Static Export (za klasični hosting)

```bash
npm run build:static
```

Output folder: `out/` - upload na bilo koji static hosting.

## 📚 Resursi

- [Next.js Dokumentacija](https://nextjs.org/docs)
- [Sanity Dokumentacija](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Framer Motion](https://www.framer.com/motion/)

## 🔧 Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=    # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=       # Dataset name (production)
SANITY_API_TOKEN=                 # API token sa Editor permissions
```

## 📄 License

Private - Institut Dedinje

## 👨‍💻 Development

Projekat je u aktivnom razvoju. Za pitanja kontaktirajte development tim.

---

**Made with ❤️ for Institut Dedinje**
