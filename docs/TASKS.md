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

Detaljan task-breakdown za preostalih ~70 stranica (audit potvrdio 2026-07-21
da su sve hardkodovane, nema Sanity fetch). Schema strategija po tipu
sadržaja objašnjena u [`MIGRACIJA.md`](MIGRACIJA.md#schema-strategija-po-tipu-sadržaja).
Radi se sekcija po sekciju, redosled ispod.

**Status 2026-08-03: svih 6 sekcija ✅ gotovo** (Klinike, Za pacijente,
Edukacija, Nauka i istraživanje, Aktuelnosti, + Header/navigacija + O nama +
Kontakt u sekciji 6) — nema više rute na sajtu bez Sanity fetch-a, osim
stranica koje uopšte ne postoje (mrtvi linkovi, vidi Backlog) i tehničke
infrastrukture koja nije "sadržaj" (slanje email-a sa kontakt forme). Svaka
migrirana stranica i dalje zadržava hardkodovani fallback u kodu — to je
namerno (vidi `MIGRACIJA.md`), ne "nedovršena migracija".

### 1. Klinike (`clinicPage` document tip, multi-instance) — raditi prvo

- ✅ Schema `sanity/schemas/documents/clinicPage.ts` — polja iz `ClinicPageData`
  (title, slug, subtitle, areas, staffList, proceduresList,
  patientInstructions, itd.), registrovana u `schemas/index.ts`
- ✅ `CLINIC_PAGE_QUERY` (by slug) i `CLINICS_LIST_QUERY` (za hub kartice) u `sanity/lib/queries.ts`
- ✅ TS tip `ClinicPage` u `sanity/types.ts`
- ✅ `scripts/migrate-clinics.ts` (`npm run migrate:clinics`) — kreira 19 dokumenata iz `data.ts` fajlova (sve osim kardiohirurgije), potvrđeno upitom na javni Sanity API
- ✅ Konvertovano svih 19 `app/klinike/<slug>/page.tsx` (ClinicPageTemplate stranice) u server component: fetch by slug + fallback na `./data.ts` (izdvojen iz starog `const DATA`)
- ✅ `/klinike` hub — fetch liste za kartice (uključujući kardiohirurgiju, `order: 0`), fallback na statičku listu ako Sanity fetch ne uspe
- ✅ **Kardiohirurgija (20. klinika, 2026-08-03)** — `clinicPage` schema proširen opcionim poljima `organizationalStructure`, `stats[]`, `highlights[]`, `staffList.groups[].members[]` (ime+uloga, alternativa prostom `names[]`), i `units[]` (5 pod-jedinica: slug/title/heroImage/heroSubtitle/sections[] paragraph|list) — jedan `clinicPage` tip i dalje pokriva svih 20 klinika, ništa nije breaking za postojećih 19. `ClinicPageTemplate.tsx` proširen render-blokovima za `stats`/`highlights`/`organizationalStructure` + `staffList` sad renderuje `members` (ime+uloga kartice) ako postoji, inače stari `names`. `app/klinike/kardiohirurgija/[slug]/page.tsx` (5 unit ruta) konvertovan sa čitanja isključivo iz `units.ts` na fetch `clinicPage.units[]` po slug-u klinike + `find` po unit slug-u, fallback i dalje na `units.ts`. `scripts/migrate-kardiohirurgija.ts` (`npm run migrate:kardiohirurgija`) kreirao `clinicPage-kardiohirurgija` (11 procedura, 12 highlights, 29 kadar, 5 units) — potvrđeno upitom na javni Sanity API (20 klinika ukupno). Orphaned `page.module.css` obrisan.

`npm run build` i `npx tsc --noEmit` prolaze bez grešaka; `npm run lint` na baseline-u (31 problem, nepromenjeno). Migrirane klinike: vaskularna-hirurgija, anesteziologija, invazivna-dijagnostika, elektrofiziologija, neurokardioloska-laboratorija, cusmo, neinvazivna-dijagnostika-srca, centar-srcana-slabost, poliklinika, klinicka-patologija, kardiologija, kv-dijagnostika, telemedicina, edukacija-prevencija, fizikalna-medicina, kardiovaskularna-rehabilitacija, apteka, laboratorija, transfuzija.

### 2. Za pacijente (12 stranica, generički `page` builder + izuzeci)

- ✅ Schema: 8 novih reusable content-block objekata (`introSection`, `bannerBlock`, `cardGridBlock`, `checklistBlock`, `contactDirectoryBlock`, `accordionBlock`, `faqBlock`, `tabsBlock`) — registrovani u `sanity/schemas/index.ts`, `page.ts`'s `pageBuilder.of[]` array; `subtitle` polje dodano na `page` document (fallback). Korišćeni za sve oblike sadržaja (jednostavne info-stranice sa ikonama/tekstima, FAQ, tabove sa slikama/info-blokovima, direktoijume kontakata sa vremenom, liste procedura i proveravanja).
- ✅ TS tipovi: `IntroSectionBlock`, `BannerBlockData`, `CardGridBlockData`, `ChecklistBlockData`, `ContactDirectoryBlockData`, `AccordionBlockData` (+`AccordionBlockItem`/`AccordionSection`), `FaqBlockData` (+`FaqBlockItem`), `TabsBlockData` (+`TabsBlockTab`/`TabsBlockInfoItem`), `PatientPageBlock` unija, `PatientPage` convenience tip.
- ✅ Query: `PAGE_BY_SLUG_QUERY` ažuriran sa `subtitle` selekcijom (već uključuje `pageBuilder[]` generički, bezbedan reuse za buduće sekcije).
- ✅ React komponente: `IntroSection`, `BannerBlock`, `CardGrid`, `ChecklistBlock`, `ContactDirectory`, `ProcedureTabs` (wrapper oko `SidebarTabs` + `InfoBlock` ekstrakcija iz duplikata u kardiologija/vaskularna-hirurgija), `PageBuilder` renderer (components/shared/PageBuilder/), sve sa `.module.css`; `AmbulanteAccordion`/`FaqAccordion` reusovane bez izmena.
- ✅ Migraciona skripta `scripts/migrate-za-pacijente.ts` (`npm run migrate:za-pacijente`) — svih 12 `page` dokumenata kreirano i potvrđeno upitom na javni Sanity API.
- ✅ Konvertovano svih 12 `app/za-pacijente/<slug>/page.tsx` u server component: fetch by slug + fallback na `./data.ts` (sadržaj izdvojen iz starog page.tsx). Duplirane CSS klase iz 12 page.module.css fajlova konsolidovane u shared komponente (`.module.css` po komponenti).

Migrirane rute (sa Sanity `page` document slug-ima): ambulante ("ambulante", accordionBlock), cesta-pitanja ("cesta-pitanja", faqBlock 58 stavki), elektrofizioloske-procedure ("elektrofizioloske-procedure", accordionBlock), elektrostimulativne-procedure ("elektrostimulativne-procedure", accordionBlock), informacije-o-stanju ("informacije-o-stanju", introSection+bannerBlock+contactDirectoryBlock+cardGridBlock+2×bannerBlock), kardiohirurski-konzilijum ("kardiohirurski-konzilijum", introSection+bannerBlock+checklistBlock+2×bannerBlock+cardGridBlock), kardiologija ("kardiologija-za-pacijente", tabsBlock 12 tabova), plan-ishrane ("plan-ishrane", introSection+2×cardGridBlock+bannerBlock), preoperativna-priprema ("preoperativna-priprema", accordionBlock), prijem ("prijem", accordionBlock), vaskularna-hirurgija ("vaskularna-hirurgija-za-pacijente", tabsBlock 3 taba), vaskularni-konzilijum ("vaskularni-konzilijum", introSection+cardGridBlock+2×bannerBlock).

`npm run build` (exit 0) i `npm run lint` (29 problema, 2 manje nego bazeline od 31) prolaze bez regresija; sve 12 `/za-pacijente/*` rute vidljive kao dinamičke server-rendered u build-u.

**Napomena:** infrastruktura `page` builder + 8 reusable block tipova izgrađena ovde je direktno reusovana za Edukaciju (sekciju 3, ✅ gotovo — usput dodala 2 nova block tipa, `timelineBlock`/`lectureScheduleBlock`) i Nauku-istraživanje (sekciju 4, ✅ gotovo — usput dodala 2 polja na `cardGridBlock` + 1 nov block tip `documentListBlock`) — `PAGE_BY_SLUG_QUERY`, komponente i pattern fallback-a se direktno kopiraju bez izmena. Sledeće na redu: Aktuelnosti sekcija (sekcija 5).

### 3. Edukacija (16 stranica — audit otkrio 16, ne 12 kako je ranije procenjeno)

- ✅ Popis potvrđen tokom rada: 13 stranica generički `page` builder (hub + interna-edukacija + kme-2024 hub + kme-medicinske-sestre-tehnicari + kongresi + medjunarodni-kongresi + edukativni-programi hub + radionice + sestrinska-edukacija hub + 4 podstranice), + **3 škole** (`skola-ehokardiografije-*`, `skola-hipertenzije-*`, `skola-vaskularnog-ultrazvuka`) koje nisu stale u generički `page` builder — dobile bespoke `schoolPage` multi-instance document tip (kursevi/statistika/tim/zahtevi/ispit, sekcije po uzoru na `clinicPage`).
- ✅ 2 nova reusable `pageBuilder` block tipa (pored postojećih 8 iz za-pacijente): `timelineBlock` (wrapuje postojeći `timeline` object, za istorijat sekcije) i `lectureScheduleBlock` (tabovi po godinama sa predavanjima/predavačima, za KME raspored — reuse postojeće `TemePredavaciTabs` komponente). `cardGridBlock` dobio opciono `href` polje (kartica postaje klikabilna) da bi hub/nav stranice mogle da se migriraju bez gubitka navigacije.
- ✅ `sanity/schemas/documents/schoolPage.ts` — nov multi-instance document tip, registrovan u `schemas/index.ts`; `SCHOOL_PAGE_QUERY` u `queries.ts`; TS tip `SchoolPage` (+ prateći tipovi) u `sanity/types.ts`.
- ✅ Nove React komponente: `TimelineBlock`, `LectureScheduleBlock` (components/shared/), `SchoolPageTemplate` (`app/edukacija/programi/_components/`, po uzoru na `ClinicPageTemplate`) — sve registrovane u `PageBuilder.tsx`/`components/shared/index.ts`.
- ✅ `scripts/migrate-edukacija.ts` (`npm run migrate:edukacija`) — kreira 13 `page` + 3 `schoolPage` dokumenata; pokrenut uspešno, svih 16 potvrđeno upitom na javni Sanity API.
- ✅ Svih 16 `app/edukacija/**/page.tsx` konvertovano u server component (fetch by slug + fallback na `data.ts`); `kme-medicinske-sestre-tehnicari/page.tsx` prethodno bio `"use client"` (blokirao `generateMetadata`/Sanity fetch) — refaktorisan na server component, interaktivni tabovi ostaju u zasebnoj client komponenti (`TemePredavaciTabs`), isti obrazac kao `ProcedureTabs`. Prateći `layout.tsx` (wrapper za metadata na client stranici) obrisan kao suvišan.
- ✅ Orphaned `page.module.css` (16 fajlova) i `app/edukacija/constants.ts` obrisani nakon migracije sadržaja u shared komponente/`data.ts` (isti pattern kao za-pacijente).
- `npx tsc --noEmit`, `npm run build` (exit 0, svih 16 ruta vidljivo kao dinamičke) i `npm run lint` (29 problema, identično baseline-u) prolaze bez regresija.

**Watch-item (namerna pojednostavljenja radi reuse generičkih blokova):** `medjunarodni-kongresi` i `radionice` su na starom sajtu imali kuriran foto-galerije uz svaku stavku — `cardGridBlock` nema polje za sliku pa su fotografije izostavljene (tekstualni sadržaj u potpunosti očuvan, ikonica zamenjuje sliku). Ako se ubuduće želi vizuelni parity, trebalo bi dodati opciono `image` polje u `cardGridBlock` (slično kako je dodato `href`).

### 4. Nauka i istraživanje (7 stranica, generički `page` builder + izuzeci)

- ✅ 5 od 7 stranica migrirano na `page` document tip sa reuse `PAGE_BY_SLUG_QUERY` + fallback na `data.ts`: `centar-izuzetnih-vrednosti` (introSection + bannerBlock + cardGridBlock + bannerBlock), `saige-projekat` (introSection + bannerBlock + cardGridBlock[numbered] + bannerBlock), `aktuelnosti` (ugnježdeno pod nauka-istrazivanje, slug `nauka-istrazivanje-aktuelnosti` da izbegne koliziju sa root `/aktuelnosti` sekcijom 5), `lista-istrazivaca` (introSection[stats 62 istraživača / 4 kategorije] + accordionBlock, stara bespoke `ResearchersAccordion` komponenta obrisana — data shape je 1:1 sa postojećim `accordionBlock` + `AmbulanteAccordion` renderer), `nio` (introSection[stats 2020/2025/4] + bannerBlock + **nov** `documentListBlock` za PDF listu). `/nio/page.tsx` bio `"use client"` (blokirao Sanity fetch/generateMetadata) → refaktorisan na server component, PDF interaktivnost prebačena u novu client komponentu `DocumentListBlock`.
- ✅ Schema izmene: `cardGridBlock` dobio opciona `date` i `category` polja (za `aktuelnosti` kartice); **nov** `documentListBlock` object tip (`sanity/schemas/objects/documentListBlock.ts`, registrovan u index.ts i `page.ts` pageBuilder.of[]), reusable infrastruktura za PDF liste na `/aktuelnosti/informator`, `/aktuelnosti/casopis-dedinje`, `/akta-instituta` (u backlogu, čeka materijal od vlasnika).
- ✅ `scripts/migrate-nauka-istrazivanje.ts` (`npm run migrate:nauka-istrazivanje` dodat u package.json) — 5 `page` dokumenata kreirano, potvrđeno upitom na javni Sanity API. Orphaned `page.module.css` (5 fajlova) obrisani.
- ✅ **`cardioview3d-lab` (2026-08-03, politika izuzetka svesno probijena na eksplicitan zahtev vlasnika sajta — "apsolutno sve na Sanity")**: migrirana kao `page` dokument (slug `cardioview3d-lab`, section `nauka-istrazivanje`) koristeći `tabsBlock` proširen sa 3 nova opciona polja po tabu: `introList[]` (prosta lista odmah posle uvoda, za "3D Print Core" mašine), `focusCards[]` (naslov + tekst ili lista stavki, za "focus grid" kartice), `outroParagraphs[]` (zaključni tekst posle kartica). `ProcedureTabs.tsx` i `ProcedureTabs.module.css` prošireni odgovarajućim render-blokovima. Stara custom stranica (ručni `TabbedPanel` sa inline JSX) zamenjena sa `PageBuilder`/`ProcedureTabs` — ista infrastruktura kao ostatak sajta, umesto jedne poslednje bespoke stranice. `scripts/migrate-cardioview3d-lab.ts` (`npm run migrate:cardioview3d-lab`) kreirao dokument, potvrđeno upitom na API (3 taba). Orphaned `page.module.css` obrisan. `/workshop` redirect ostaje nepromenjen (nema sadržaja).

### 5. Aktuelnosti (9 stranica — ✅ gotovo, 2026-08-03)

Korisnik eksplicitno tražio migraciju **uključujući poznati PDF-link bug** —
sadržaj (i greška) preneti as-is u Sanity, admin ispravlja kroz Studio umesto
u kodu. Jedan generički `news` tip nije pokrivao sve podsekcije (bitno
različita polja), pa je urađeno više multi-instance document tipova:

- ✅ `news.ts` (postojeći, dopunjen poljem `fullText`) — **vesti** (6 dokumenata, `mainImage` stvarno upload-ovan iz `public/images/*.jpg` u Sanity asset preko migracione skripte, ne samo putanja)
- ✅ **nov** `video.ts` — **gostovanja** (6 dokumenata: youtubeId/source/date/description/fullText/isNew/order)
- ✅ **nov** `announcement.ts` — **obaveštenja** (7 dokumenata: date/icon/type/text/important/order)
- ✅ **nov** `jobPosting.ts` — **oglasi i konkursi** (6 dokumenata: date/type/icon/text/active/deadline/order)
- ✅ **nov** `magazineIssue.ts` — **Časopis Dedinje izdanja** (6 dokumenata: volume/number/year/title/topics/pdfUrl/coverColor/order — `pdfUrl` prenet sa postojećom greškom, i dalje vodi na CV direktora umesto na pravi časopis)
- ✅ **nov** singleton `informatorPage.ts` — hero tekst/datumi/PDF link/6 sekcija sadržaja/kontakt (isti PDF-link bug prenet as-is)
- ✅ Queries u `sanity/lib/queries.ts`: `NEWS_QUERY`/`NEWS_BY_SLUG_QUERY` (dopunjeni), `VIDEOS_QUERY`/`VIDEO_BY_SLUG_QUERY`, `ANNOUNCEMENTS_QUERY`, `JOB_POSTINGS_QUERY`, `MAGAZINE_ISSUES_QUERY`, `INFORMATOR_QUERY`. TS tipovi: `News` (dopunjen), `VideoItem`, `Announcement`, `JobPosting`, `MagazineIssue`, `InformatorPage`/`InformatorSection`.
- ✅ `scripts/migrate-aktuelnosti.ts` (`npm run migrate:aktuelnosti`) — svih 6+6+7+6+6+1 dokumenata kreirano, potvrđeno `count()` upitom na javni Sanity API po tipu.
- ✅ Konvertovane sve rute: `vesti/page.tsx` i `[slug]/page.tsx` + `metadata.ts` (server component, `urlFor()` za sliku, `formatSrDate()` helper za ISO→srpski format), `gostovanja/page.tsx` (server wrapper + nov client `GostovanjaClient.tsx` sa filter/search/sort logikom nepromenjenom), `gostovanja/[slug]/page.tsx` (server + mali client `GostovanjeVideo.tsx` samo za play-state), `obavestenja/page.tsx` (server wrapper + `ObavestenjaClient.tsx`), `oglasi-konkursi/page.tsx` (server wrapper + `OglasiKonkursiClient.tsx`), `casopis-dedinje/page.tsx` (server wrapper + `CasopisDedinjeClient.tsx`, PDF-viewer toggle state ostaje client), `informator/page.tsx` (server wrapper + `InformatorClient.tsx`), `page.tsx` (hub — fetch top-N iz svih tipova umesto zasebnih hardkodovanih preview nizova).
- ✅ Homepage (`app/page.tsx`) prešao sa `import { VESTI }`/`import { GOSTOVANJA }` na Sanity fetch (`NEWS_QUERY`/`VIDEOS_QUERY`), fallback ostaje na `constants.ts` nizove.

**Napomena uz sve sekcije:** svaka stranica zadržava hardkodovani fallback
(isti obrazac kao ostale Sanity stranice) — ako Sanity fetch ne uspe,
stranica i dalje radi. Svi hardkodovani `constants.ts`/inline-nizovi namerno
ostavljeni u kodu kao taj fallback izvor (ne brisani).

### 6. Header/navigacija, početna (ostatak), O nama podstranice, Kontakt — ✅ gotovo, 2026-08-03

Korisnikov eksplicitan zahtev: "apsolutno sve mora biti na Sanity-ju" — poslednji
krug pokrivao je sve preostale hardkodovane delove sajta van klinika/za-pacijente/
edukacije/nauke/aktuelnosti.

- ✅ **Header/glavni meni** — `navigation` singleton proširen na 3 nivoa
  (`mainMenu[].submenu[].items[]`, ranije samo 2). `NAVIGATION_QUERY` postojao
  ali se nigde nije koristio (orphaned) — sada ga fetch-uje nov
  `components/shared/Header/HeaderData.tsx` (async server wrapper, isti obrazac
  kao `Footer.tsx`) i prosleđuje `menu` prop klijentskom `Header.tsx`
  (i dalje `"use client"` zbog scroll/mobile-menu state-a, ali sad prima
  podatke umesto hardkodovanog JSX-a; stari sadržaj ostaje kao `DEFAULT_MENU`
  fallback konstanta). `SiteChrome.tsx` prima `header` prop analogno postojećem
  `footer` propu. `scripts/migrate-navigation.ts` (`npm run migrate:navigation`)
  seed-ovao tačnu trenutnu strukturu menija, potvrđeno upitom na API.
- ✅ **Početna strana, preostali hardkod** — nova 3 pageBuilder section tipa:
  `heroSlidesSection` (zamenjuje hardkodovan `videoHeroSlides` niz, 4 video
  slajda), `clinicsFeaturedSection`, `patientLinksSection` (zamenjuju
  `CLINICS_FEATURED`/`PATIENT_LINKS` nizove). `scripts/migrate-homepage-extra.ts`
  (`npm run migrate:homepage-extra`) dopunio postojeći `homepage` `page`
  dokument (patch/append, ne diraju se postojeće sekcije). Tim/testimonials/stats
  sekcije već behu Sanity-backed (samo sadržajno demo/fabrikovane — ostaje
  poznat backlog item, van scope-a "da li je na Sanity-ju").
- ✅ **`/o-nama/*` (4 podstranice)** — sve migrirane kao `page` dokumenti
  (`section: "ostalo"`): `lokacija` (`cardGridBlock` transport + `bannerBlock`
  parking; adresa/radno-vreme/mapa/CTA ostaju u template kodu), `nemedicinski-poslovi`
  (`introSection` + `bannerBlock` koordinator + `cardGridBlock` 5 odeljenja),
  `odbori-i-organi-instituta` (`introSection` sa `stats` pilulama + **nov**
  reusable pageBuilder blok `boardListBlock` — 4 odbora sa
  chairman/viceChairman/members, nova komponenta `BoardListBlock.tsx`,
  potpuno zamenjuje staru bespoke `OdboriIOrganiClient.tsx`, obrisana),
  `zdravstvena-akreditacija` (`introSection` + `bannerBlock` + `cardGridBlock`
  2 koordinatora + `documentListBlock` 2 PDF-a). `cardGridBlock` dobio 3 nova
  opciona polja (`contactPerson`/`phone`/`email`) za kontakt-kartice
  (Nemedicinski poslovi odeljenja). `scripts/migrate-o-nama.ts`
  (`npm run migrate:o-nama`) kreirao sva 4, potvrđeno upitom na API. Nov
  Studio structure.ts granu "О нама → Остале странице" (filter
  `section == "ostalo"`) da budu vidljive u meniju.
- ✅ **`/kontakt`** — `siteSettings` singleton **nije uopšte postojao u
  datasetu** (potvrđeno `*[_type=="siteSettings"][0]` → `null` pre ovog taska,
  i pored toga što je Studio/kod odavno referencirao tip) — kreiran preko
  novog `scripts/migrate-site-settings.ts` (`npm run migrate:site-settings`)
  sa pravim kontakt podacima (telefon/email/adresa/radno vreme/hitni broj
  194). `app/kontakt/page.tsx` prešao sa punog `"use client"` na server
  component (dodat i prvi `export const metadata` za ovu rutu — ranije
  nije imala SEO metadata uopšte) koji fetch-uje `siteSettings` i puni
  kontakt-kartice iz njega (umesto duplog hardkodovanog izvora); forma
  izdvojena u client-only `KontaktForm.tsx` (server shell + client ostrvo,
  isti obrazac kao `ProcedureTabs`). Mapa/CTA tekst ostaju u template kodu.
  **Slanje emaila kroz formu i dalje nije povezano — to je infra odluka
  (email servis), ne CMS/sadržaj pitanje, ostaje u Backlogu.**

`npx tsc --noEmit`, `npm run build` (exit 0) i `npm run lint` (27 problema —
**2 manje** nego baseline od 29: `react/no-unescaped-entities` greške u
`OdboriIOrganiClient.tsx` i `zdravstvena-akreditacija/page.tsx` nestale kao
sporedni efekat prelaska teksta iz literalnog JSX-a u Sanity/`data.ts`
stringove) — bez regresija, posle svakog WP-a u ovom krugu posebno provereno.

## Internacionalizacija — SRP/ENG i18n (počelo 2026-08-04)

Vlasnik sajta traži punu funkcionalnu i18n infrastrukturu (ne samo UI
placeholder) + AI prevod postojećeg sadržaja. Ovo je veliki, višefazni
zahvat — plan i kontekst originalno u `~/.claude/plans/jel-kapiras-sta-treba-tidy-taco.md`
(lokalni fajl, van repo-a, ne oslanjati se na njega u budućim sesijama).
Ovaj odeljak je izvor istine za nastavak. Svaka faza mora proći
`npm run lint` + `npm run build` pre prelaska na sledeću.

**Usput urađeno (nezavisno od i18n, ali u istoj sesiji):**
- ✅ Header spojen u jedan segment (logo/kontakt/meni), Ćir/Lat transliteracioni
  toggle zamenjeno sa UI prekidačem za jezik (`components/shared/LanguageSwitch/LanguageSwitch.tsx`,
  zamenjuje stare `components/shared/LocaleSwitch/` i `components/shared/ScriptToggle/`) — vidi `PROJECT_STATUS.md` dnevnik
  2026-08-04.

### Faza 3a — i18n rutiranje — ✅ gotovo (2026-08-04)

`next-intl` (`^4.13.5`, potvrđeno kompatibilan sa Next 16.1.4/React 19.2.3)
sa `localePrefix: "as-needed"`: **SR (podrazumevani) ostaje bez prefiksa**
(`/aktuelnosti`, identično kao pre), **EN je novo, prefiksovano** (`/en/aktuelnosti`).
Odluka potvrđena sa vlasnikom sajta (SEO/postojeći linkovi > jednostavnost).

- ✅ `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts` — next-intl konfiguracija.
- ✅ `proxy.ts` (root) — next-intl middleware. **Next.js 16 preimenovao
  "middleware" konvenciju u "proxy"** (bio `middleware.ts`, deprecation warning
  bez preimenovanja). Isključuje `/studio`, `/api`, `_next`, statičke fajlove
  (`matcher` u fajlu).
- ✅ `next.config.ts` — `createNextIntlPlugin("./i18n/request.ts")`.
- ✅ Sve postojeće rute (~77) premeštene `app/*` → `app/[locale]/*` (git mv,
  istorija očuvana). `app/[locale]/layout.tsx` je **ugnježdeni** layout (ne
  novi root) — `app/layout.tsx` ostaje jedini pravi root sa `<html>/<body>`,
  deljen i sa `/studio` (koji ostaje van `[locale]`, nema i18n). Nema potrebe
  za "multiple root layouts" komplikacijom — pojednostavljeno u odnosu na
  originalni plan.
- ✅ `app/sitemap.ts`, `app/robots.ts` — ostali van `[locale]`, sitemap sad
  nabraja i SR (bez prefiksa) i EN (`/en/*`) varijantu svake rute; oba fajla
  dobila `export const dynamic = "force-static"` (potrebno za build:static).
- ✅ `scripts/build-static.mjs` — wrapper koji privremeno uklanja `proxy.ts`
  pre static exporta (Next ne dozvoljava proxy/middleware sa
  `output:"export"`) i vraća ga posle; `package.json` `build:static` sad
  poziva ovaj skript umesto `next build` direktno.
- ✅ 4 migracione skripte (`migrate-clinics.ts`, `migrate-edukacija.ts`,
  `migrate-nauka-istrazivanje.ts`, `migrate-za-pacijente.ts`) imale
  hardkodovane `../app/<ruta>/data` importe — ažurirano na `../app/[locale]/<ruta>/data`.
- ✅ Usput popravljeno da `build:static` uopšte krene (van i18n scope-a, ali
  blokiralo verifikaciju): `generateStaticParams` dodat na
  `app/[locale]/aktuelnosti/[slug]/page.tsx` i
  `app/[locale]/aktuelnosti/gostovanja/[slug]/page.tsx` (fale, sad fetch-uju
  sve slugove sa Sanity-ja + fallback na lokalni const niz);
  `app/studio/[[...tool]]/page.tsx` dobio `generateStaticParams() { return [{tool: []}] }`.
- ⚠️ **Poznato ograničenje:** `build:static` i dalje NE prolazi do kraja —
  dublji, nevezan problem (skoro sve stranice koriste dinamički/`revalidate:0`
  Sanity fetch nekompatibilan sa `output:"export"`). Dokumentovano kao
  poseban Backlog item niže (☁️ `build:static` fundamentalno...). **`npm run
  build` (Vercel, primarna platforma) potvrđeno radi čisto sa `/sr` i `/en`
  rutama.**
- ✅ Verifikovano: `npm run lint` (27 problema, isti baseline kao pre, nema
  novih), `npm run build` (exit 0), Playwright screenshot provera `/`, `/en`,
  `/aktuelnosti`, `/en/aktuelnosti`, `/studio` (svi 200, bez console grešaka).

### Faza 3b — Sanity šema lokalizacija — ✅ gotovo (2026-08-04, svih 51 fajlova)

**Pristup:** reusable lokalizovani object tipovi (`{sr, en}` shape) koji se
swap-uju umesto `type:"string"/"text"`/portable text nizova u postojećim
poljima — NE Sanity `document-internationalization` plugin (forkuje cele
dokumente, teža migracija, kida 1:1 strukturnu paritetnost).

**Korak 1 — infrastruktura (uraditi prvo, izolovano, ništa ne dira postojeće šeme) — ✅ gotovo (2026-08-04):**
- ✅ `sanity/schemas/objects/localeString.ts` — object tip, polja `sr`/`en`
  (oba `type:"string"`).
- ✅ `sanity/schemas/objects/localeText.ts` — isto, `type:"text"` (za duže
  opise/paragraf polja).
- ✅ `sanity/schemas/objects/localePortableText.ts` — `sr`/`en` polja tipa
  `array of block` (za rich text sadržaj).
- ✅ Deljena Studio input komponenta `sanity/components/LocaleTabInput.tsx`
  (tabovi Srpski/English u jednom polju, umesto dva odvojena stacked polja)
  — Sanity `components: { input: LocaleTabInput }` na sva tri tipa gore.
  Deleguje stvarno renderovanje polja na Sanity-jev `renderField` (patch/
  validacija ostaju netaknuti), samo menja layout u tabove. **`@sanity/ui`
  dodat kao direktna zavisnost** (`^3.5.1`, ranije samo tranzitivna/ugnježdena
  zavisnost 3+ paketa na različitim putanjama u `node_modules` — dodavanje
  kao top-level dependency ih je deduplikovalo u jednu kopiju, bitno da
  izbegnemo dupli React Context/theming iz dve instance `@sanity/ui`).
- ✅ `sanity/lib/locale.ts` — `pick<T>(field, locale)` helper: EN pada nazad
  na SR ako prevod još nije unet.
- ✅ Registrovana nova 3 tipa u `sanity/schemas/index.ts`.
- ✅ **Proof-of-concept primenjen** na `sanity/schemas/documents/page.ts`
  (`title`, `subtitle` polja — `slug` izvor promenjen na `title.sr`) i
  `sanity/schemas/objects/hero.ts` (`heading`, `subheading`).
  `npx tsc --noEmit`, `npm run build` (exit 0) i `npm run lint` (27
  problema, identično baseline-u, ništa novo iz ovih fajlova) prolaze.

  ⚠️ **Napomena (nije bug, očekivano do 3c):** ovo je čisto schema-level
  izmena, postojeći dokumenti u `production` datasetu i dalje imaju
  `title`/`subtitle`/`heading`/`subheading` kao obične stringove (stari
  oblik), ne `{sr, en}` objekte. GROQ upiti i frontend i dalje čitaju te
  stringove nepromenjeno (ništa nije migrirano/izgubljeno) — ali kad se u
  Studio-u otvori postojeći `page`/`hero` dokument, ta polja će se prikazati
  **prazna** (stari string ne odgovara novom object schema-i) dok se ne
  pokrene migraciona skripta (Faza 3c). Ako urednik u međuvremenu ne dira ta
  konkretna polja i sačuva dokument, stari sadržaj ostaje netaknut u
  dataset-u (Studio patch-uje samo polja sa kojima se interaguje).
  **Vlasnik sajta potvrdio 2026-08-04** da mu se sviđa tabbed sr/en layout —
  Korak 2 (pun rollout) odobren.

**Korak 2 — pun rollout, polje po polje, po fajlu:**

Dokument tipovi (`sanity/schemas/documents/`) — ✅ **gotovo, 2026-08-04**:
- ✅ `page.ts` (title, subtitle — urađeno u proof-of-concept, Korak 1)
- ✅ `news.ts` (title/excerpt/content/fullText/author), `clinicPage.ts`
  (title/breadcrumbLabel/subtitle/introTitle/introText/introParagraphs/
  organizationalStructure/stats.label/highlights.text/areas.title+desc/
  areasTitle/areasSubtitle/extraBanner.label+desc/proceduresList/
  staffList.groups.heading+members.role/patientInstructions/units.title+
  heroSubtitle+sections/seo), `announcement.ts` (title/text), `jobPosting.ts`
  (title/text), `magazineIssue.ts` (title/topics), `schoolPage.ts` (title/
  subtitle/breadcrumbLabel/intro/programNav/stats.label/courseSections/
  requirementsSection/examSection/team/techTeam/seo), `service.ts` (name/
  description/content/features), `department.ts` (name/description/content/
  features), `doctor.ts` (title/position/specialization/biography/
  education.degree+description — `name` namerno OSTAO plain string, lično
  ime, isto na oba jezika), `testimonial.ts` (role/quote — `name` isto
  namerno neizmenjeno), `video.ts` (title/description/fullText).
- ✅ **`publication.ts` namerno NEIZMENJEN** (svesna odluka, ne propust) —
  title/journal/abstract su citatni/bibliografski podaci (kao naučna
  referenca), prevod bi menjao tačnost citata; tip uz to nigde nije ožičen
  na frontend (potvrđeno grep-om `app/`, nema `PUBLICATIONS_QUERY` poziva).
- **Watch-item (opšti princip primenjen kroz sve fajlove):** lična imena
  (doctor.name, testimonial.name, staffList members.name, team members.name)
  i enum/select vrednosti sa fiksnim listama (news.category, announcement.type,
  jobPosting.type, video.source) namerno OSTAJU plain `string` — imena su
  ista na oba jezika, a enum vrednosti se koriste kao literal match/filter
  vrednosti u kodu (menjanje u `{sr,en}` bi slomilo logiku), ne tekst za
  čitaoca.
- `npx tsc --noEmit`, `npm run build` (exit 0), `npm run lint` (27 problema,
  identično baseline-u) — provereno 2x (posle svakog od 2 batch-a od ~6
  fajlova), bez regresija.

Singleton-i (`sanity/schemas/singletons/`) — ✅ **gotovo, 2026-08-04**:
- ✅ `navigation.ts` (mainMenu/submenu/items title, footerMenu title —
  `link`/`href`/`icon` ostaju plain), `siteSettings.ts` (siteName/
  siteDescription/workingHours.days — `contact.*` namerno NEIZMENJEN, isti
  telefon/email/adresa na oba jezika, `workingHours.hours` ostaje plain jer
  je čist vremenski format), `footer.ts` (instituteName/instituteSubtitle/
  description/quickLinks/services/contact.heading/workingHours/copyright/
  legalLinks — `contact.address/city/phone/email` NEIZMENJENI), `aboutPage.ts`
  (hero/about/statistics/management/values/cta/seo — `name` polja u
  `management.profiles` ostaju plain, lična imena), `bibliographyPage.ts`
  (pageHeader/introduction/categories.title+description/download/seo —
  **`categories[].publications[].text` namerno NEIZMENJEN**, isti razlog kao
  `publication.ts`: bibliografski citati, ne marketinški tekst),
  `biographyPage.ts` (pageHeader/intro/professionalPath/
  academicQualifications/fullBiography/cta/seo — `name`/`institution` ostaju
  plain), `directorPage.ts` (hero/infoCards/message/quote/stats/partners/seo
  — `signature`/`quote.author` ostaju plain, lično ime/potpis direktora),
  `informatorPage.ts` (heroHeading/heroText/sections/contactHeading/
  contactText — `contactPerson/Phone/Email/Address` NEIZMENJENI, kontakt
  podaci).
- `npx tsc --noEmit`, `npm run build` (exit 0), `npm run lint` (27 problema,
  identično baseline-u) — bez regresija.

Object/block tipovi (`sanity/schemas/objects/`, 31 fajl) — ✅ **gotovo,
2026-08-04**, rađeno u 2 batch-a (16 + 15 fajlova):
- ✅ `seoMetadata`, `timeline`, `statItem`, `infoBox`, `statsSection`,
  `welcomeSection`, `servicesSection`, `whyChooseUsSection`, `ctaSection`,
  `departmentsSection`, `newsSection`, `contactSection`, `partnersSection`,
  `teamSection`, `testimonialsSection` — standardna konverzija
  heading/title/description/text/label polja, `icon`/`link`/`href`/
  `variant`/boolean/broj polja ostaju plain.
- ✅ **`contentBlock` — samo `heading` lokalizovan, `content` (portable
  text) SVESNO NEIZMENJEN**: polje ima bespoke `of[]` konfiguraciju (custom
  block stilovi H2-H4/blockquote, marks/annotations, ugnježdene `image`
  stavke) koju generički `localePortableText` (samo `array of block`) ne
  pokriva bez gubitka mogućnosti — a polje se uz to nigde ne renderuje na
  frontend-u (potvrđeno grep-om, `contentBlock` je registrovan u
  `pageBuilder.of[]` ali nijedna migrirana stranica ga ne koristi).
- ✅ `accordionBlock`, `bannerBlock`, `boardListBlock`, `cardGridBlock`,
  `checklistBlock`, `clinicsFeaturedSection`, `contactDirectoryBlock`,
  `documentListBlock`, `faqBlock`, `heroSlidesSection`, `introSection`,
  `lectureScheduleBlock`, `patientLinksSection`, `tabsBlock`,
  `timelineBlock` — uklj. sve ugnježdene nizove (paragraphs/items/sections/
  focusCards/infoBlocks itd.) konvertovane sa `array of {type:"text"/
  "string"}` na `array of {type:"localeText"/"localeString"}`.
  `boardListBlock`: `members[].name` ostaje plain (lično ime), `role`
  lokalizovan.
- **Watch-item:** svi ugnježdeni `preview.select` objekti ažurirani na
  `.sr` sufiks gde god polje postaje `{sr,en}` objekat (Studio preview liste
  bi inače prikazale `[object Object]`) — provereno fajl po fajl, ne samo
  build/lint (lint ne hvata ovu vrstu greške jer je `select` string literal).
- `npx tsc --noEmit`, `npm run build` (exit 0), `npm run lint` (27 problema,
  identično baseline-u) — provereno posle svakog od 2 batch-a, bez regresija.

**Napomena:** ovo je bio mehanički ali dug posao (51 fajl ukupno — 12
dokument tipova + 8 singletona + 31 objekat/blok, uklj. Korak 1 POC) —
odrađen u jednoj produženoj sesiji umesto planiranih više sesija po 5-8
fajlova, uz proveru `tsc`/`build`/`lint` posle svakog od 5 batch-eva.
Sledeći korak: Faza 3c (migraciona skripta, pretvara postojeće plain-string
vrednosti u `production` datasetu u `{sr,en}` oblik).

### Faza 3c — migraciona skripta — ✅ gotovo (2026-08-04)

`scripts/migrate-i18n-schema.ts` (`npm run migrate:i18n-schema`, prati
postojeći `scripts/migrate-*.ts` obrazac, `SANITY_API_TOKEN`). **Promena u
odnosu na originalni plan:** umesto ručno pisane `LOCALIZED_FIELDS`
allowlist mape, skripta je **schema-driven** — čita stvarne schema
definicije direktno iz `sanity/schemas/index.ts` (isti fajl koji Studio
koristi) i rekurzivno hoda kroz svaki fetch-ovan dokument prateći tu
strukturu (`resolveOfDef`/`transformValue` u skripti). Prednost: nemoguće da
se allowlist i schema razminu (nema ručne transkripcije ~50 fajlova u
string[] mapu), automatski poštuje sve svesne izuzetke iz 3b (plain imena,
enumi, `publication`/`bibliographyPage.categories[].publications[].text`)
jer ta polja u schema-i nikad nisu postala `localeString`/`localeText`.
Transformiše `"Neki tekst"` → `{ _type: "localeString", sr: "Neki tekst", en: "" }`
(i analogno za `localeText`/`localePortableText`), idempotentna (preskače
polja već u `{_type,sr,en}` obliku), dodaje `_key` gde nedostaje (array
stavke koje su bile plain string pre migracije). Podržava `--dry-run`,
`--dataset=<name>`, `--type=<docType>` flagove.

Pokrenuto **direktno na `production`** (vlasnik sajta eksplicitno odobrio —
"sajt je još u izradi, nema rizika", 2026-08-04) posle `--dry-run` provere
(99 dokumenata / 423 polja identifikovano ispravno pre upisa). Rezultat:
**99/99 dokumenata migrirano, 423 polja ukupno**, potvrđena idempotentnost
(ponovni `--dry-run` posle upisa → 0/99). Klonirani test-dataset korak iz
originalnog plana namerno preskočen po instrukciji vlasnika.

### Faza 3d — AI prevod sadržaja — ✅ gotovo (2026-08-04)

**Promena u odnosu na originalni plan:** umesto headless `scripts/translate-content.ts`
koji programski poziva Claude API (`@anthropic-ai/sdk`, zahteva sopstveni
`ANTHROPIC_API_KEY`), prevod je odrađen **direktno u Claude Code sesiji** —
bez novog paketa, bez novog API ključa, bez dodatnog troška po pozivu (vlasnik
sajta eksplicitno odobrio ovaj pristup kad je postavljeno pitanje čemu služi
poseban Anthropic ključ). Tok rada:

- ✅ `scripts/i18n-export-untranslated.ts` (`npm run i18n:export-untranslated`) —
  schema-driven (isti pristup kao `migrate-i18n-schema.ts`): rekurzivno hoda
  kroz svaki dokument prateći stvarnu schema strukturu i ispisuje JSON niz
  zadataka za svako `{_type:"localeString"/"localeText"/"localePortableText"}`
  polje gde je `sr` popunjen a `en` prazan. Svaki zadatak nosi `path` (niz
  koraka — ime polja ili `{key}` za elemente niza adresirane po `_key`) da
  omogući tačan Sanity patch path.
- ✅ Export je vratio **2742 polja** (ne 423 — 423 je bio broj **top-level**
  dokument-polja izmenjenih u 3c, npr. ceo `pageBuilder` niz broji se kao 1;
  2742 su individualni leaf `{sr,en}` stringovi unutar tih nizova), raspoređeno
  na 99 dokumenata (isto kao 3c). 0 `localePortableText` zadataka — jedina 4
  mesta gde se taj tip koristi (`doctor.biography`, `news.content`,
  `service.content`, `department.content`) nemaju nijedan realan dokument u
  datasetu (`doctor`/`service`/`department` su orphaned tipovi, nigde
  fetch-ovani na frontend-u — potvrđeno grep-om).
- ✅ 2742 zadatka podeljeno u 11 batch-eva (~250-300 po batch-u, grupisano po
  `docId` da ceo dokument ide u isti batch radi terminološke doslednosti) i
  prevedeno **paralelno preko 11 Agent poziva** (formalni medicinski/
  institucionalni registar, brojevi/datumi/telefoni/email/akronimi (TAVI,
  PCI, ECG, itd.) sačuvani, lična imena netaknuta/transliterisana na
  latinicu). Rezultat spojen i validiran skriptom (`merge-and-validate.mjs`,
  scratchpad, nije u repo-u) — **2742/2742 pokriveno, 0 duplikata, 0
  propuštenih, 0 nepoznatih ključeva**; 49 slučajeva gde je `en === sr`
  ručno pregledano i potvrđeno legitimno (akronimi, lična imena, brojevi/
  vreme, engleski nazivi radionica — ne propust u prevodu).
- ✅ `scripts/i18n-apply-translations.ts` (`npm run i18n:apply-translations
  --file=<...>`) — grupiše prevode po dokumentu, gradi granularni Sanity
  patch path (npr. `pageBuilder[_key=="xxx"].heading.en`) i upisuje `en`
  vrednost + `enReviewed: false` (eksplicitno, jer schema `initialValue`
  važi samo za NOVE dokumente kreirane u Studio-u, ne za postojeće
  patch-ovane preko API-ja) u jednom `.set()` pozivu po dokumentu. Testirano
  `--dry-run` pa smoke-test na 1 dokumentu (`announcement-1`, potvrđeno
  upitom da su `en`/`sr`/`enReviewed` tačno na mestu) pre punog upisa.
  Pokrenuto **direktno na `production`** (isti presedan kao 3c — vlasnik
  sajta odobrio). Rezultat: **99/99 dokumenata, 2742/2742 polja upisano bez
  grešaka**; ponovni `i18n:export-untranslated` posle upisa → 0 preostalih
  zadataka (potvrđena idempotentnost/potpunost).
- ✅ `enReviewed: boolean` polje (human review gate) dodato na svih **20**
  document/singleton schema tipova koji imaju lokalizovan sadržaj (12
  dokument tipova + 8 singletona — isti spisak kao Faza 3b Korak 2),
  `initialValue: false`. **Granularnost: po dokumentu (99 flagova), ne po
  polju** (vlasnik sajta eksplicitno odabrao ovu opciju — praktičnije za
  urednika u Studio-u nego 423+ pojedinačnih checkbox-ova).
- ✅ `app/sitemap.ts` — dok pojedinačna klinika/za-pacijente stranica nema
  `enReviewed: true`, njena `/en/*` varijanta se izostavlja iz sitemap-a
  (SR varijanta ostaje nepromenjena). Fetch-uje `clinicPage`/`page`
  (`section=="za-pacijente"`) dokumente preko posebnog keširanog klijenta
  (`useCdn:true`, bez `cache:"no-store"` da ne pokvari `force-static`).
  Watch-item: 2 `za-pacijente` `page` dokumenta imaju Sanity slug različit
  od URL segmenta (`kardiologija-za-pacijente`, `vaskularna-hirurgija-za-
  pacijente` — izbegavaju koliziju sa istoimenim `clinicPage` slug-om,
  vidi sekciju 2 gore) — `ZA_PACIJENTE_SLUG_OVERRIDES` mapa u `sitemap.ts`
  to rešava (otkriveno i ispravljeno tokom verifikacije, sitemap je prvo
  netačno propustio ta 2 kroz gate). Ostale sekcije (o nama, edukacija,
  nauka, aktuelnosti) namerno NISU gate-ovane (nisu klinički osetljive na
  isti način kao klinike/za-pacijente).
- ⚠️ **`noindex` meta tag NIJE dodat** (samo sitemap isključivanje) — pravi
  `noindex` bi zahtevao da svih ~70 statičnih `metadata.ts` fajlova
  fetch-uje Sanity `enReviewed` polje, što je već postojeći, veći Backlog
  item (vidi niže) van scope-a ovog prolaza. Sitemap isključivanje je
  dovoljno kao primarni signal pretraživačima (stranica i dalje tehnički
  dostupna na URL-u, samo ne u sitemap-u).
- ✅ Verifikovano: `npx tsc --noEmit` čisto, `npm run lint` (27 problema,
  identično baseline-u), `npm run build` (exit 0, sitemap generisan
  statički bez greške). Ručna provera u browseru (dev server): 5 `/en/*`
  ruta (kardiohirurgija, za-pacijente/kardiologija sa slug override-om,
  o-nama/lokacija, aktuelnosti/oglasi-konkursi, edukacija) — svi 200, 0
  `[object Object]`, engleski tekst se stvarno renderuje (npr. "Clinic for
  Cardiac Surgery"). `sitemap.xml` provera: `/en/klinike/anesteziologija`
  i `/en/za-pacijente/kardiologija` odsutni (gated), `/en/klinike` (hub)
  prisutan (nije gate-ovan, samo listing).
- **Sledeći korak:** vlasnik sajta pregleda AI prevode u Studio-u (tabbed
  sr/en input, `LocaleTabInput.tsx`) i čekira `enReviewed` po dokumentu →
  tek onda Faza 3f (ukloni sitemap gate za potvrđene dokumente, zatvori
  i18n zadatak). Ovo je ljudski korak, ne nastavlja se automatski.

### Faza 3e — ožičenje stranica na locale — ✅ gotovo (2026-08-04)

Urađeno odmah posle 3c u istoj sesiji jer je 3c write na `production`
odmah slomio sve stranice (500 grešaka — postojeći frontend je i dalje
čitao `title`/`subtitle`/itd. kao plain string, a posle 3c su to `{sr,en}`
objekti; React baca na pokušaju da renderuje objekat kao child).

**Pristup — promena u odnosu na originalni plan:** umesto `pick(field, locale)`
poziva razbacanih po `PageBuilder.tsx` i ~30 leaf blok komponenti (kako je
plan predviđao), dodata jedna funkcija `localize<T>(data, locale)` u
`sanity/lib/locale.ts` (pored postojećeg `pick()`, koji ostaje netaknut).
`localize()` rekurzivno hoda kroz bilo koji fetch-ovan Sanity rezultat
(objekat/niz, prepoznaje `{_type: "localeString"|"localeText"|"localePortableText"}`
markere) i vraća **potpuno isti plain-string oblik kakav je postojao pre
3b/3c** (isti EN→SR fallback kao `pick()`). Poziva se **samo na fetch call
site-u** (odmah posle `client.fetch(...)`, pre nego što se podatak prosledi
dalje) — `PageBuilder.tsx`, `ClinicPageTemplate.tsx`, `SchoolPageTemplate.tsx`
i svih ~30 leaf komponenti ostali su **potpuno netaknuti**, jer im podatak
i dalje stiže kao plain string. Mnogo manji i sigurniji diff od originalnog
plana (desetine izmenjenih fajlova umesto ~150, nula rizika da se propusti
neki render-poziv duboko u nekoj leaf komponenti).

- ✅ Svih **83 fetch call-sites** koji pozivaju `client.fetch` (81 u `app/`,
  2 u `components/` — `HeaderData.tsx`, `Footer.tsx`) sad prosleđuju rezultat
  kroz `localize(raw, locale)` pre upotrebe. 57 od toga (klinike 19,
  za-pacijente 12, o-nama 4, edukacija 13, schoolPage 3, nauka-istrazivanje 6)
  je bilo bajt-identičnog oblika (razlikuju se samo SLUG i naziv funkcije) —
  odrađeno kroz 2 Node skripte sa string-replace transformacijom umesto
  ručnog Edit-a fajl po fajl. Ostatak (homepage, klinike hub, kardiohirurgija
  + `[slug]` units, kontakt, aktuelnosti hub + 6 podstranica + 2 metadata.ts,
  rec-direktora/o-institutu/biografija/bibliografija + njihova 4 već-dinamička
  metadata.ts) urađen pojedinačno jer imaju bespoke strukturu.
- ✅ `page.tsx` fajlovi dobili `params: Promise<{ locale: string }>` (Next 16
  async params konvencija, isti obrazac kao `app/[locale]/layout.tsx` iz 3a).
- ✅ `HeaderData.tsx`/`Footer.tsx` (renderuju se iz root layout-a, van route
  param konteksta) koriste `getLocale()` iz `next-intl/server` umesto
  prop-drilling-a.
- ✅ **Usput otkriven i popravljen orphan bug** (nevezan za i18n, ali u istom
  fajlu): `app/[locale]/bibliografija/metadata.ts` je postojao ali ga
  `page.tsx` nikad nije re-eksportovao (`export { generateMetadata }`
  nedostajao) — stranica nikad nije imala SEO metadata, tiho je pala na
  root layout default. Dodata 2 linije, isti obrazac kao svaka druga
  migrirana stranica.
- ⚠️ **`~70 metadata.ts` fajlova (client-page metadata obrazac) namerno NIJE
  dirano u ovom prolazu** — svi trenutno vraćaju **statičan** `export const
  metadata` (hardkodovan srpski tekst, nikad nisu ni čitali Sanity `seo`
  polje, ni pre i18n taska). Pošto ne dodiruju Sanity fetch, `{sr,en}` oblik
  ih ne dotiče — nisu se pokvarili, samo ostaju SEO-suboptimalni (English
  rute i dalje prikazuju srpski `<title>`/`<meta description>`). Ovo je
  odvojen, veći posao (svaki fajl treba svoj query+slug da fetch-uje SEO
  polje, kao u 4 fajla koja SU već bila dinamička) — vidi Backlog niže.
- ✅ Verifikovano: `npx tsc --noEmit` čisto, `npm run lint` (27 problema,
  identično baseline-u, nula novih), `npm run build` (exit 0, svih ~150 ruta
  vidljivo). **Ručna provera u browseru** (dev server, ne samo build):
  ~25 ruta na `/` i `/en/*` (klinike, za-pacijente, edukacija/škole,
  nauka-istraživanje, o-nama, kontakt, aktuelnosti + sve podstranice +
  gostovanja/vesti detail rute, kardiohirurgija unit ruta, homepage,
  rec-direktora/o-institutu/biografija/bibliografija, `/studio`) — svih 200,
  bez `[object Object]` u HTML-u, EN rute ispravno padaju nazad na SR tekst
  (očekivano dok 3d ne popuni prevode).
- `app/layout.tsx` `<html lang="sr">` — i dalje hardkodovano, nije dirano
  (nezavisno od ovog bug-fix prolaza, ostaje kao pre).

### Faza 3f — zatvaranje — ❌ čeka ljudski review (vlasnik sajta)

3d gotovo — čeka se da vlasnik sajta pregleda AI prevode u Studio-u i čekira
`enReviewed` po dokumentu (99 dokumenata).

- Ukloniti `sitemap.ts` gate za dokumente kod kojih je `enReviewed: true`
  (ili pojednostaviti gate ako se sve odjednom potvrdi).
- Ažurirati ovaj fajl + `PROJECT_STATUS.md` + `ARHITEKTURA.md` po standardnoj
  "Definicija završenog taska" konvenciji.

## Догађаји — nov Sanity dokument tip + homepage vidžet — ✅ gotovo (2026-08-05)

Nov sadržajni tip za upravljanje predstojećim događajima/skupovima Instituta
(kongresi, radionice i sl.) sa strukturisanim datumom, na zahtev vlasnika
sajta (mokap homepage "Добродошли" sekcije — desna kolona sa slikom zamenjena
vidžetom predstojećih događaja). Detaljno:

- ✅ Nova Sanity šema: `sanity/schemas/documents/event.ts` (`title` localeString,
  `date` Sanity date tip, `image` obavezno, `location` plain string, `link`
  opciono, `enReviewed` boolean). Registrovana u `schemas/index.ts` i
  `structure.ts` (pod Актуелности, između Вести i Гостовања). Minimalna
  verzija — nema posebnu detalj-stranicu/rutu, koristi se samo za homepage
  vidžet.
- ✅ Nov upit `EVENTS_QUERY` u `sanity/lib/queries.ts`, `EventItem` tip u
  `sanity/types.ts`.
- ✅ Homepage: `app/[locale]/page.tsx` sada fetch-uje događaje (`EVENTS_QUERY`)
  paralelno sa vestima/gostovanjima, filtrira za `date >= danas` (ISO string
  poređenje) i uzima prva 3. Desna kolona `welcomeSection` bloka sada
  prikazuje nov "Предстојећи догађаји" vidžet (mala slika + naziv + datum +
  lokacija po događaju, klikljivo ako postoji `link`) kad ima bar 1 predstojeći
  događaj; inače pada nazad na stari layout (glavna slika + sekundarna slika +
  "65+ ГОДИНА ИСКУСТВА" bedž — `welcomeSection.image`/`secondaryImage`/
  `imageBadge` polja NISU uklonjena iz šeme, ostaju kao fallback izvor, isti
  princip kao "disable ne delete" primenjen ranije na video slajder).
- ✅ Nove CSS klase u `app/[locale]/page.module.css` (`.eventsWidget`,
  `.eventsWidgetHeader`, `.eventsWidgetList`, `.eventItem`, `.eventThumb`,
  `.eventInfo`, `.eventDate`). `.welcomeGrid` promenjen sa `align-items: center`
  na `align-items: start` (duži `bodyText` bi inače centrirao kraći vidžet
  neprirodno na sredini kolone — verifikovano Playwright screenshotom pre/posle).
  Nova `.welcomeBodyText { white-space: pre-line; }` klasa da `\n\n`-razdvojeni
  pasusi u Sanity `bodyText` polju stvarno prave vizuelne prelome pasusa.
- ✅ Sadržajna izmena (Sanity patch na produkciji, NE code change — jednokratni
  scratchpad skript kreiran i pokrenut pa obrisan, isti obrazac kao ranija
  hero-video izmena 2026-08-04): `homepage.welcomeSection.bodyText.sr`
  proširen sa postojeće jedne rečenice na tu rečenicu + 5 novih pasusa
  institucionalnog teksta koji je vlasnik sajta dostavio ("Више од 45
  година...", zaključno sa "Придружите нам се..."/"Ваш Институт..." pasusima).
  `bodyText.en` očišćen na `""` (pada nazad na SR prikaz na `/en` preko
  postojećeg `localize()` EN→SR fallback-a) — čeka standardnu i18n
  export/translate/apply pipeline (Faza 3d obrazac) za pravi prevod.
  `leadText` NIJE menjan (već se 1:1 poklapao sa mokapom).
- ✅ Migraciona skripta `scripts/migrate-events.ts` (`npm run migrate:events`)
  — seed-uje 3 primer događaja, imena preuzeta iz već poznatih ponavljajućih
  Institut-skih događaja pomenutih drugde na sajtu (Годишњи конгрес
  Института, Сретењска радионица, Конгрес кардиоваскуларне превенције/ХИСПА),
  slike reciklirane iz postojećih `public/images/*` fajlova. **Datumi
  (2027-02-13, 2027-04-15, 2027-06-10) su procena/placeholder, NISU potvrđeni
  od vlasnika sajta** — vidi Backlog stavku u `PROJECT_STATUS.md` Blokeri.
- ✅ Verifikacija: `npx tsc --noEmit` čisto, `npm run lint` (27 problema,
  baseline nepromenjen), `npm run build` (exit 0), dev server + Playwright
  screenshot potvrdili da vidžet prikazuje 3 događaja sa slikama/datumima/
  lokacijama, stari fallback layout ispravno odsutan, puni tekst se renderuje
  sa ispravnim prelomima pasusa.


Materijal koji su odeljenja/klinike poslale IT sektoru u okviru revizije sajta
(rok 31.05.2026), sirov sadržaj za unos po stranici. Folder je namerno
`.gitignore`-ovan (sadrži interne dopise i spiskove zaposlenih) — postoji samo
lokalno, ne u repo-u. Redosled ispod: brze korekcije prvo, veći novi sadržaj
posle, stavke koje traže odluku vlasnika sajta na kraju.

**Brze korekcije (spiskovi zaposlenih / kratke izmene teksta):**

- ✅ Vaskularna hirurgija (`/klinike/vaskularna-hirurgija`) — nov upravnik (doc. dr Slobodan Tanasković, dec. 2025), ažuriran spisak zaposlenih, vaskularna ambulanta, kabinet za neuroangiologiju. Izvor: `stranica i novi predlozi/email4.md` + `azuriranje_sajta/{Запослени,Васкуларна амбуланта,Амбуланта неуроангиологије}.docx`. Napomena: trenutni sajt nije nikad imao pasus o IZIS zakazivanju ni "Uputstvo za bolesnike"/"potrebna dokumentacija" (to je bilo na starom ikvbd.org), pa nema šta da se uklanja — samo dodat novi sadržaj.
- ✅ Invazivna dijagnostika i lečenje — korigovan spisak zaposlenih (samo upravnik + lekari, uklonjen Kabinet). Izvor: `azuriranje_sajta/Ažuriranje sadržaja sajt IKVB Dedinje.docx`
- ✅ Služba za CT i MR dijagnostiku (`/klinike/kv-dijagnostika`) — korigovan spisak lekara (CT/MR odvojeno) + novi tekstovi o rastu broja pregleda. Izvor: isti docx kao gore.
- ✅ Telemedicinski centar + Škola ehokardiografije — uneti dopunjeni tekst TMC-a, ažuriran spisak edukatora/ehotehničara, 27→33 kursa, dodati TEE/stres-eho info-blokovi sa kontakt osobom. Izvor: `stranica i novi predlozi/email_3.md` + `Корекције Сајт Дедиње - Стефан Вељковић.docx`. **CUSMO i Odeljenje za neinvazivnu dijagnostiku srca** iz istog docx-a nisu imali postojeću rutu — urađeni kao nove stranice, vidi ispod.

**Nov sadržaj (kompletni tekstovi, spremni za unos):**

- ✅ Odeljenje za elektrofiziologiju i elektrostimulaciju — nova stranica `/klinike/elektrofiziologija` (aritmije, ablacije/PFA, elektrostimulacija/ICD, uputstvo za pacijente, tim). Izvor: `stranica i novi predlozi/email.md` + `Odeljenje za elektrofiziologiju i elektrostimulaciju - SAJT (1).docx`
- ✅ Invazivna kardiologija — dopunjena postojeća `/klinike/invazivna-dijagnostika` listom procedura (koronarografija, FFR, IVUS/OCT, PCI, rotablacija, MCS, alkoholna septalna ablacija, renalna denervacija, kateterizacija desnog srca). Izvor: `stranica i novi predlozi/emai3.md` (Vanja Bojić)
- ✅ Centar za kardiovaskularnu rehabilitaciju — nova stranica `/klinike/kardiovaskularna-rehabilitacija` (uvodna reč, istorijat od 1978, oblast delovanja, kompletan spisak zaposlenih). Izvor: `stranica i novi predlozi/email_2.md` (Ivana Burazor) + `stranica i novi predlozi/Sajt IKVBD.docx` (⚠️ ispravljena atribucija — ovaj docx, ne `УВОДНА РЕЧ.docx`, sadrži tekst o rehabilitaciji; `УВОДНА РЕЧ.docx` je zapravo sadržaj za Kliniku za kardiohirurgiju, vidi niže).
- ✅ Preoperativna priprema — nova stranica `/za-pacijente/preoperativna-priprema` (organizacija, cilj, EuroSCORE, radno vreme, dokumentacija za prijem). Izvor: `stranica i novi predlozi/email6.md` (Bojan Milovanović) + `azuriranje_sajta/преоператива 240526.docx`
- ✅ Neurokardiološka laboratorija — nova stranica `/klinike/neurokardioloska-laboratorija` (osnovana 2022, dijagnostičke procedure, oblast delovanja po specijalnostima, SAIGE/Horizon Europe projekti, zaposleni). Izvor: `stranica i novi predlozi/email7.md` (Nikola Marković) + `azuriranje_sajta/NEUROKARDIOLOGIJA SAJT.docx`
- ✅ Odeljenje kardiologije — ažuriran `/klinike/kardiologija` (tekst o radu odeljenja + spisak procedura + uputstvo za bolesnike). Izvor: `stranica i novi predlozi/email7.md` + `azuriranje_sajta/ODELJENJE KARDIOLOGJE.docx`
- ✅ Centar za minimalno invazivnu kardiohirurgiju — ažuriran unit u `app/klinike/kardiohirurgija/units.ts` (istorija minimalno invazivne hirurgije + robotska kardiohirurgija od 2025, nova lista procedura). Izvor: `Provera stranica i novi predlozi/Обзиром да се отварањем...docx` (drugi deo — "Centar za minimalno invazivnu kardiohirurgiju"; prvi deo dokumenta je ☁️ stavka, vidi niže).
- ✅ Klinika za kardiohirurgiju (opšta stranica) — ažuriran `/klinike/kardiohirurgija` (uvodna reč, istorija od 1973, organizaciona struktura, 11 procedura, najznačajniji rezultati do 2025, pun spisak od 29 zaposlenih hirurga). Izvor: `Provera stranica i novi predlozi/УВОДНА РЕЧ.docx` (⚠️ ispravljena atribucija — ovaj docx sadrži kardiohirurgiju, ne rehabilitaciju; vidi napomenu gore).
- ✅ CUSMO — nova stranica `/klinike/cusmo` (dopunjen tekst, obuka mladih lekara, transkateterska zamena plućne valvule 2018+2025, konzilijum, međunarodna saradnja, spisak zaposlenih). Izveštaji sa radnih poseta prof. Giambertia (5 izveštaja) i sa konzilijuma uneti **samo kao agregatni rezime** (datumi + broj operisanih/analiziranih pacijenata) — izvorni dokumenti sadrže detaljne podatke na nivou pojedinačnog pacijenta (godina rođenja, pol, dijagnoza, hirurški opis) što je rizik po privatnost za javni sajt; odluka potvrđena sa vlasnikom sajta. Izvor: `stranica i novi predlozi/email_3.md`, `Dopuna za USMO stranicu/Izveštaj {23-27}. radne posete.docx`, `stranica i novi predlozi/06.12.2023. XXIII конзилијум.docx`.
- ✅ Odeljenje za neinvazivnu dijagnostiku srca — nova, kraća stranica `/klinike/neinvazivna-dijagnostika-srca` (nehirurško zatvaranje FOA/ASD/VSD/DAP, LAA okluder, TAVI, MitraClip). Izvor: `stranica i novi predlozi/email_3.md` + `Корекције Сајт Дедиње - Стефан Вељковић.docx`.
- ✅ CardioView3D Lab — spojeno u `/nauka-istrazivanje/cardioview3d-lab` sa 3 taba (3D Print Core / Engineering Core / Mechanical-Rapid Prototyping Core); stara `/workshop` ruta sada radi redirect na spojenu stranicu. Izvor: `stranica i novi predlozi/email5.md` (Dragiša Radovanović i Miljenko Subašić) + `azuriranje_sajta/3D Core IKVBD Sajt.docx`
- ✅ Bolnička banka krvi — ruta `/klinike/transfuzija` je već postojala (nije trebalo novu rutu), zamenjen generički placeholder pravim sadržajem (rad banke, restriktivna transfuziona strategija, POC metode, 10 procedura, zaposleni, uputstvo za bolesnike). Izvor: `Provera stranica i novi predlozi-BOLNIČKA BANKA KRVI/BOLNIcKA_BANKA_KRVI.md`
- ✅ Edukacija medicinskih sestara i tehničara — hub `/edukacija/sestrinska-edukacija` + 4 nove podstranice (istorijat i međ. saradnja, kurs KPR, pripravnički staž, program kratkih studija); "interna KME edukacija" deo dodat u postojeću `/edukacija/interna-edukacija` (već je postojala opštija verzija te stranice, izbegnuto dupliranje rute). Izvor: `сајт-едукација медицинске сестре и техничари/*.docx`

**Zahteva odluku vlasnika pre unosa (☁️) — raditi poslednje:**

- ❌ ☁️ Kardiohirurgija-1 + Kardiohirurgija-2 → spajanje u "Odeljenje poluintenzivne nege" zbog otvaranja zgrade Dedinje 2 — menja URL/IA strukturu, treba potvrda pre implementacije. Izvor: `Provera stranica i novi predlozi/email.md` (Igor Živković) + `Обзиром да се отварањем...docx` (prvi deo)
- ❌ ☁️ Kompletna reorganizacija `/edukacija` sekcije (6 celina: programi obuke, kongresi, međ. usavršavanja, mladi lekari, arhiva, kontakt) — veliki predlog sa svesno ostavljenim prazninama (kontakt osoba, sestrinski deo, izveštaj o 33. kursu); zahteva IA odluku pre unosa. Izvor: `Edukacije/Edukacija IKVBD.docx` (Jelisaveta Vuletić)

## Popuna sadržaja sa starog sajta (ikvbd.org) — stranica po stranica

Poređenje live `ikvbd.org` sa `dedinje-next` (plan: WebFetch stranica +
Read lokalnog koda, dopuna praznina koje ne diraju nedavne docx izmene).
Radi se u batch-evima, jedan po jedan, uz javljanje posle svakog.

- ✅ **Batch 1 — О нама (8):** rec-direktora, o-institutu, biografija,
  bibliografija (Sanity, ✅ migrirano) — provereno, `scripts/migrate-about.ts`
  već sadrži pune statistike i management profile (podaci se poklapaju sa
  live sajtom, nema praznina). nemedicinski-poslovi i
  odbori-i-organi-instituta (hardkodovano) — već se poklapaju sa live sajtom
  1:1 (isti ljudi, kontakti, odbori). zdravstvena-akreditacija — već se
  poklapa (isti koordinatori); dugmad za dokumenta i dalje vode na `#`
  (live sajt takođe ne izlaže direktne linkove ka tim fajlovima).
  lokacija — dodat Факс broj u INFO_ITEMS (jedino što je nedostajalo).
  **Nova stavka otkrivena, dodata u Backlog:** `/akta-instituta` — postoji
  na live sajtu, nema ekvivalent kod nas.
- ✅ **Batch 2 — Клинике bez docx izmena (8):** anesteziologija (dopunjen
  istorijat od 1978, kadar, procedure), centar-srcana-slabost (organizaciona
  struktura, procedure, uputstvo za pacijente), laboratorija (analize, kadar,
  uputstvo), poliklinika (spisak ambulanti, zakazivanje) — dopunjeni. apteka,
  edukacija-prevencija, klinicka-patologija — nema ih na live sajtu,
  preskočeno. fizikalna-medicina — potvrđen duplikat sa
  kardiovaskularna-rehabilitacija (već detaljnija), nije dirano dok se ne
  reši preklapanje iz backloga.
- ✅ **Batch 3 — Клинике sa docx izmenama, samo dopuna (7):**
  vaskularna-hirurgija (istorijat od 1973), invazivna-dijagnostika (istorijat
  od 1977, statistika), kv-dijagnostika (osnivanje 2021, smene, MDCT
  statistika), telemedicina (TMC osnovan 2022, 120 uređaja, grupe pacijenata),
  kardiologija (istorijat 1978/1993, kapaciteti), kardiohirurgija (2 nova
  highlight-a — treninzi 2021/2023) — dopunjeni. transfuzija — već skoro
  identična live sajtu, bez izmena.
- ✅ **Batch 4 — За пацијенте (12):** kardiologija — **9/10 tabova (bio
  poznat "coming soon" stub iz Backlog-a) popunjeno pravim sadržajem** za
  PFO/ASD zatvaranje, koronarografiju, PCI, spirometriju, TAVI, test
  fizičkim opterećenjem, TEE, TTE i farmakološki stres eho, sa live sajta.
  elektrofizioloske-procedure i elektrostimulativne-procedure — po 4-5
  praznih "Садржај биће допуњен" pitanja popunjeno. Preostalih 9 stranica
  (ambulante, cesta-pitanja, informacije-o-stanju, kardiohirurski-konzilijum,
  plan-ishrane, prijem, vaskularna-hirurgija, vaskularni-konzilijum) već su
  bile kompletne i skoro identične live sajtu — bez izmena.
- ✅ **Batch 5 — Наука и истраживање (7):** centar-izuzetnih-vrednosti —
  dopunjen datum akreditacije (20.07.2021, 26. sednica UO). Ostalih 6
  (aktuelnosti, lista-istrazivaca, nio, saige-projekat, cardioview3d-lab,
  workshop-redirect) već kompletne ili identične live sajtu — bez izmena.
- ✅ **Batch 6 — Едукација (9):** edukacija (index) — dopunjen istorijat
  (Hjuston saradnja, transplantacioni program, edukacija 60+ stručnjaka
  90-ih). Ostalih 8 (kme-2024, kongresi, medjunarodni-kongresi, programi + 3
  škole, radionice, interna-edukacija) su već bile kompletne ili šire od
  live sajta — bez izmena. medjunarodni-kongresi ima noviji live sadržaj
  (2025/2026 kongresi) bez slika/opisa — dodato u Backlog umesto lošeg unosa.
- ✅ **Batch 7 — Актуелности (7):** aktuelnosti (index) — struktura već
  poklapa live sajt, bez izmena. casopis-dedinje i informator — **otkriven
  bug** (izmišljena izdanja + pogrešni PDF linkovi na CV direktora), dodato
  u Backlog, nije popravljeno bez pravih PDF-ova od vlasnika. obavestenja,
  oglasi-konkursi, vesti, gostovanja — placeholder/demo i vremenski
  osetljiv sadržaj, namerno preskočeno (ne portuje se sa starog sajta).

## Backlog (van Sanity migracije)

- ❌ **~70 `metadata.ts` fajlova i dalje statični/SR-only** (otkriveno 2026-08-04
  tokom i18n Faze 3e) — svi trenutno vraćaju hardkodovan `export const
  metadata` (nikad nisu ni čitali Sanity `seo` polje, ni pre i18n taska), pa
  `/en/*` rute prikazuju srpski `<title>`/`<meta description>`. Nije crash-bug
  (samo statičan tekst, ne `{sr,en}` objekat), ali je SEO-suboptimalno.
  Svaki fajl bi trebalo prebaciti na `generateMetadata({ params })` koji
  fetch-uje odgovarajući Sanity dokument (isti query/slug kao susedni
  `page.tsx`) + `localize(seo, locale)` — obrazac već postoji u 4 fajla koja
  SU dinamička (`rec-direktora`/`o-institutu`/`biografija`/`bibliografija`
  metadata.ts). Veći, ali čisto mehanički posao — kandidat za codemod.
- ❌ `HeaderData.tsx`/`Header.tsx` uopšte ne fetch-uje iz `siteSettings`
  (telefon/kontakt u headeru je hardkodovan inline, ne iz CMS-a) —
  nezavisno od i18n, otkriveno tokom Faze 3e wiring-a, nije popravljeno u
  tom prolazu (van scope-a — cilj je bio ukloniti 500 greške, ne dodavati
  novi fetch).
- ✅ Sanity Studio meni bio potpuno flat/negrupisan (default `structureTool()`
  auto-lista svih 16 document tipova) — editorima nemoguće da se snađu (npr.
  "Stranice" mešala 30 dokumenata iz 3 različite sekcije sajta bez ikakve
  naznake). Dodat custom `sanity/structure.ts` koji grupiše meni po redosledu
  stvarne navigacije sajta (Почетна → О нама → Клинике → За пацијенте →
  Наука и истраживање → Едукација → Тим и услуге → Новости и садржај →
  Навигација/Footer/Подешавања сајта); `page` document tip dobio novo
  `section` polje (`za-pacijente`/`edukacija`/`nauka-istrazivanje`/`ostalo`)
  da bi filtriranje po sekciji uopšte bilo moguće (slug sam po sebi ne nosi
  tu informaciju). Postojećih 30 `page` dokumenata + homepage popunjeni
  jednokratnim `npm run migrate:backfill-page-section` (0 propuštenih).
  Vidi `docs/ARHITEKTURA.md` §3.4.
- ❌ ☁️ Kontakt forma — odlučiti email servis (Resend/Nodemailer/itd.), povezati `app/kontakt/page.tsx` na pravu `/api` rutu. Sadržaj stranice (kontakt kartice, iz `siteSettings`) je od 2026-08-03 na Sanity-ju, ovo je čisto infra pitanje slanja emaila. Detalji: [`PROJECT_STATUS.md`](PROJECT_STATUS.md).
- ❌ 5 mrtvih linkova u meniju (`/nauka-istrazivanje/korisni-linkovi/*`, `/nauka-istrazivanje/monografija`) — kreirati stranice ili ukloniti linkove iz `Header.tsx`.
- ❌ ☁️ Testovi/CI odluka — da li ima smisla za marketinški sajt, ili samo build+lint gate.
- ❌ ☁️ `useCdn: false` razmatranje (CDN + revalidacija ako saobraćaj poraste).
- ❌ ☁️ **`npm run build:static` fundamentalno ne radi sa trenutnom fetch strategijom** — otkriveno 2026-08-04 tokom i18n rutiranja (`[locale]` segment). Skoro svaka Sanity-backed stranica koristi dinamički fetch (`revalidate: 0`/no-store, namerno zbog `useCdn: false` uređivačke svežine, vidi bullet iznad), a `output: "export"` zahteva da SVI podaci budu poznati u build-time-u (nema servera koji bi mogao da fetch-uje na zahtev). Popravljeno usput: `generateStaticParams` nedostajao na `aktuelnosti/[slug]` i `aktuelnosti/gostovanja/[slug]` (dodato), `robots.ts`/`sitemap.ts` trebali `export const dynamic = "force-static"`, `studio/[[...tool]]` trebao `generateStaticParams` (sve to sad radi). Ono što OSTAJE nerešeno: desetine stranica i dalje padaju na `NEXT_STATIC_GEN_BAILOUT`/dynamic-fetch greškama jer njihov Sanity fetch nije statički. Rešenje zahteva odluku vlasnika: (a) prebaciti fetch strategiju na `revalidate: N` (ISR) ili build-time fetch svuda i prihvatiti da Studio izmene ne budu instant vidljive u static-export modu, ili (b) prihvatiti da `build:static` ostane samo teorijska/fallback opcija bez garancije da radi, i osloniti se isključivo na Vercel (koji radi ispravno, potvrđeno `npm run build`). Vidi i `middleware`→`proxy.ts` napomenu u `ARHITEKTURA.md` (i18n) — static export dodatno gubi "SR bez prefiksa" trik bez obzira na ovo pitanje.
- ❌ ☁️ Hardkodovani Sanity `projectId`/`dataset` na više mesta — rizik samo ako se pravi drugi Sanity projekat/dataset.
- ❌ `public/doctor-milan-nikolic.png` — orphan asset, povezati sa doktorom ili obrisati.
- ❌ ☁️ **Pogrešni/izmišljeni PDF linkovi na 2 stranice — placeholder-bug, nađeno tokom Batch 7.**
  - `/aktuelnosti/casopis-dedinje` — `magazineIssue` dokumenti (6, Sanity od 2026-08-03) imaju izmišljene naslove/teme po izdanju (npr. "Vol 12, Br 1 (2025) — Kardiovaskularna hirurgija...") i svih 6 `pdfUrl` pogrešno vodi na `АКАДЕМИК-CV-...pdf`/`РАДОВИ-ДИРЕКТОРА-...pdf` (CV/bibliografija direktora, ne časopis). Live sajt (`ikvbd.org/o-nama/casopis-dedinje/`) ima pravi arhiv od 27 sekvencijalnih brojeva sa pravim PDF-ovima.
  - `/aktuelnosti/informator` — `informatorPage` singleton (Sanity od 2026-08-03), dugme "Преузми"/PDF viewer takođe vode na `/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf` umesto na pravi Informator o radu dokument.
  - Oba i dalje prikazuju netačne informacije javno — sadržaj je sada editable kroz Sanity Studio (nije više potrebna izmena koda), ali i dalje treba pravi PDF materijal od vlasnika sajta da se ispravi.
- ❌ ☁️ `/klinike/fizikalna-medicina` vs `/klinike/kardiovaskularna-rehabilitacija` — moguće preklapanje. Live sajt (ikvbd.org) ima JEDNU stranicu "Centar za kardiovaskularnu rehabilitaciju" na `/klinike/fizikalna-medicina-i-rehabilitacija/`; ovde postoje DVE odvojene rute. Proveriti sa vlasnikom sajta da li je podela namerna ili treba spajanje/redirect.
- ❌ "Kućni red" (pravilnik, PDF) nije linkovan nigde u `/za-pacijente/` rutama — na live sajtu postoji kao PDF link sa te stranice. Dodati link/dokument.
- ❌ `/edukacija/medjunarodni-kongresi` — live sajt ima novije kongrese iz 2025/2026 (Dedinje Vascular Symposium 2026, COVID kongres 2026, Neurocard 2026, Aorta Masterclass, TAVI Academy, Workshop 3D Mapping) koji kod nas ne postoje; nisu dodati jer nemamo prave slike/opise za te događaje (rizik od "praznih" kartica) — treba materijal od vlasnika sajta.
- ❌ "О вашем здрављу" — na live sajtu postoji kao zbirna kategorija/listing stranica koja grupiše članke (npr. Plan ishrane); ovde postoji samo pojedinačna `/za-pacijente/plan-ishrane` ruta bez listing stranice. Relevantno ako se planira više članaka te vrste. **Napomena (2026-08-05):** nova `/za-pacijente` landing stranica NIJE isto što je ovaj backlog item — landing je hub sa linkovima na sve 12 `/za-pacijente/*` podstranice (opšti uvod), a "О вашем здрављу" bi bio filter/kategorija za određene članke.
- ❌ `/akta-instituta` — postoji na live ikvbd.org (linkovano sa „О нама"), nema ekvivalentnu rutu kod nas. Otkriveno tokom Batch 1 popune sadržaja.
- ❌ ☁️ `/klinike/kardiohirurgija` — stat "95,5% Стопа преживљавања" nema potvrđen izvor (nije u docx `УВОДНА РЕЧ.docx` ni u stari-sajt sweep beleškama); "3.000+ годишње операција" zaokruženo naviše od docx raspona "2500-3000". Otkriveno tokom docx-audit sweep-a 2026-07-21, vidi `popunjene-stranice-2026-07-21.md`. Treba potvrda vlasnika sajta.
- ❌ ☁️ `/za-pacijente/preoperativna-priprema` — docx izvor ima stavku "Хсердоксо" u listi antikoagulanasa koja nije uneta u kod (nejasno da li je OCR artefakt ili stvaran nedostajući lek). Otkriveno tokom docx-audit sweep-a 2026-07-21, vidi `popunjene-stranice-2026-07-21.md`. Treba potvrda Odeljenja za preoperativnu pripremu.
- 🟡 **Homepage (`app/page.tsx`) je delom demo-seed** iz `scripts/migrate-all.ts` — potvrđeno direktnim upitom na javni Sanity API (ne pretpostavka). Detalji u `popunjene-stranice-2026-07-21.md` → "Audit početne strane". Ukratko:
  - ✅ `Header.tsx` telefon ispravljen (668→700).
  - ✅ Footer (Sanity singleton) telefon/email ispravljen (668/669→700, info@ikvbd.rs→info@ikvbd.com) — `SANITY_API_TOKEN` u `.env.local` nadograđen na Editor token, i `scripts/migrate-footer.ts` ažuriran da ne vrati grešku.
  - ✅ Hero slajdovi, "Наше клинике" i "За пацијенте" brzi linkovi (2026-08-03) — prešli sa hardkodovanih nizova (`videoHeroSlides`/`CLINICS_FEATURED`/`PATIENT_LINKS`) na Sanity `heroSlidesSection`/`clinicsFeaturedSection`/`patientLinksSection`, sadržaj je i dalje tačan (prenet 1:1), samo je sad editable kroz Studio.
  - ✅ **Hero pretvoren iz 4-slajd slajdera u jedan statičan video (2026-08-04)** — vlasnik sajta odlučio da se ukine slajder ideja, samo jedan video (`public/videos/video-za-slajder.mp4`) sa H1/H2 tekstom preko njega. `HeroSection.tsx` slajder logika (strelice/tačkice) **namerno nije uklonjena iz koda** — `isSlider = slides.length > 1`, pa jedan slajd automatski renderuje statičan hero bez slajder UI-ja (kod ostaje spreman ako se ubuduće doda još slajdova). Promenjeno: `heroSlidesSection.slides` na Sanity `homepage` dokumentu patch-ovano na tačno 1 slajd (naslov "Национални институт за срце и крвне судове" / "National Institute for Heart and Blood Vessels", podnaslov "Традиција и поверење које траје 50 година." / "A tradition of trust spanning 50 years.", bez badge-a), i `videoHeroSlides` fallback niz u `app/[locale]/page.tsx` usklađen (isti sadržaj, za slučaj da Sanity fetch ne uspe). Verifikovano `npm run lint` (27, baseline), `npm run build` (exit 0), Playwright screenshot `/sr` i `/en` (video se vidi i menja frejmove = autoplay radi, nema strelica/tačkica).
  - ✅ **Info kartice ispod heroa redizajnirane + nove `/za-pacijente` i `/nas-tim` landing stranice (2026-08-05)** — 4 info kartice (istaknute plave) sa linkovima ispod hero sekcije su redizajnirane sa novim sadržajem: Информације за пацијенте → `/za-pacijente`, Наше клинике → `/klinike`, Наш тим → `/nas-tim` (ranije `#team` anchor), Контакт → novi `contact` variant sa `contactPhone`/`contactFax` poljima (pokazuje 011 3601 700 i 011 2666 445 umesto starog emergency broja). Nova `contact` varijanta dodana na `sanity/schemas/objects/infoBox.ts` sa odgovarajućim render logikom u `components/shared/InfoBox/InfoBox.tsx`. Sekcija "За пацијенте" (6 brzih linkova) PREMEŠTENA sa homepage JSX-a na novu stranicu `app/[locale]/za-pacijente/page.tsx` koja linkuje na sve 12 `/za-pacijente/<slug>` podstranice; koristi `patientLinksSection` pageBuilder blok preko novog `PATIENT_LINKS_SECTION_QUERY`. Nova ruta `/nas-tim` (`app/[locale]/nas-tim/page.tsx`) prikazuje `teamSection` sa homepage-a; originalna inline tim sekcija na početnoj zadržana. Sitemap ažuriran sa `/za-pacijente` i `/nas-tim`. `scripts/migrate-homepage-cards-update.ts` (nova skripta) pokrenuta na produkciji; sve 4 kartice potvrđene upitom. `npm run lint` (27, baseline), `npm run build` (exit 0), dev server test (oba ruta 200, sadržaj očekivan).
  - ❌ ☁️ Sekcije "Тим" (4 izmišljena doktora) i "Шта кажу наши пацијенти" (3 izmišljena pacijenta) na početnoj imaju fabrikovane ljude sa stock fotografijama — namerno ostavljeno dok se ne dobije pravi materijal ili odluka da se sekcije uklone. **Napomena:** ova sekcija JESTE Sanity-backed (flat array u `teamSection`/`testimonialsSection`), problem je isključivo sadržajni (demo podaci), ne arhitekturni.
  - ❌ ☁️ Stats sekcija (15.000 operacija/god, 200 lekara, 65 god., 50.000 pacijenata) i emergency telefon "011 3601 600" (treći različit broj) — neprovereni brojevi iz demo seed-a. Isto — Sanity-backed, sadržaj neproveren.
  - ❌ Orphaned Sanity sadržaj koji se nigde ne renderuje (`departmentsSection`, `newsSection`, `contactSection`, pojedinačni `hero` object tip — ne meša se sa novim `heroSlidesSection`) — cleanup, nije hitno.

**☁️** = zahteva infra/odluku vlasnika sajta pre nego što se dirne kod.
