# Institut Dedinje - Next.js Website

Moderna web aplikacija za Nacionalni institut za srce i krvne sudove „Dedinje”, razvijena sa Next.js 16 i Sanity CMS.

Pravila rada, konvencije koda i konačna definicija završenog taska: **[CLAUDE.md](CLAUDE.md)**.

Dokumentacija (single source of truth): **[docs/](docs/)**

- [docs/TASKS.md](docs/TASKS.md) — status Sanity migracije po ruti + backlog
- [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) — blokeri, odluke, dnevnik
- [docs/ARHITEKTURA.md](docs/ARHITEKTURA.md) — struktura repo-a, rute, Sanity content model, GROQ primeri
- [docs/MIGRACIJA.md](docs/MIGRACIJA.md) — obrazac za migraciju stranice na Sanity

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity.io
- **Styling:** Custom CSS + CSS Variables
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Package Manager:** npm (izvor istine — vidi CLAUDE.md Deployment)

## 🛠️ Instalacija

### 1. Instaliraj dependencies

```bash
npm install
```

### 2. Setup Sanity CMS

```bash
# Login u Sanity (ako nisi već)
npx sanity login

# Kreiraj projekat (ili koristi postojeći)
npx sanity init --project-id dedinje-institute --dataset production

# Kopiraj environment varijable
cp .env.local.example .env.local
```

Popuni `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

**Gde naći Project ID:** sanity.io/manage → tvoj projekat → Project ID je u URL-u i na Dashboard-u.
**Kako napraviti API Token:** sanity.io/manage → projekat → API → Tokens → Add API token → Editor (za read + write). Token se prikazuje samo jednom.

### 3. Pokreni development

```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Sanity Studio (ili koristi npm run dev koji pokreće oba paralelno)
npm run sanity:dev
```

**Pristup:**
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## 📝 Dostupne skripte

```bash
npm run dev              # Next.js dev server + Sanity Studio (concurrently)
npm run build            # Production build
npm run build:static     # Static export (out/), za klasičan hosting
npm run start            # Production server
npm run sanity:dev       # Sanity Studio dev server
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:manage    # Otvori Sanity management
npm run migrate:*        # Seed skripte (vidi docs/MIGRACIJA.md)
npm run lint             # ESLint
npm run deploy           # vercel --prod
```

Sadržaj tipova (documents/singletons/objects), GROQ primeri i kako koristiti slike iz Sanity-ja: **[docs/ARHITEKTURA.md](docs/ARHITEKTURA.md)**.

## 🚢 Deployment

**Vercel** (primarno) — projekat je već povezan (`.vercel/project.json`):

```bash
npm run deploy
```

Environment variables na Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`.

**Static export** (klasičan hosting): `npm run build:static` → output u `out/`.

## 📚 Resursi

- [Next.js Dokumentacija](https://nextjs.org/docs)
- [Sanity Dokumentacija](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 License

Private - Institut Dedinje
