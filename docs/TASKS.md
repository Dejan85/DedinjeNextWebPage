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

### 1. Klinike (`clinicPage` document tip, multi-instance) — raditi prvo

- ✅ Schema `sanity/schemas/documents/clinicPage.ts` — polja iz `ClinicPageData`
  (title, slug, subtitle, areas, staffList, proceduresList,
  patientInstructions, itd.), registrovana u `schemas/index.ts`
- ✅ `CLINIC_PAGE_QUERY` (by slug) i `CLINICS_LIST_QUERY` (za hub kartice) u `sanity/lib/queries.ts`
- ✅ TS tip `ClinicPage` u `sanity/types.ts`
- ✅ `scripts/migrate-clinics.ts` (`npm run migrate:clinics`) — kreira 19 dokumenata iz `data.ts` fajlova (sve osim kardiohirurgije), potvrđeno upitom na javni Sanity API
- ✅ Konvertovano svih 19 `app/klinike/<slug>/page.tsx` (ClinicPageTemplate stranice) u server component: fetch by slug + fallback na `./data.ts` (izdvojen iz starog `const DATA`)
- ✅ `/klinike` hub — fetch liste za kartice (kardiohirurgija ostaje hardkodovana prva kartica), fallback na statičku listu ako Sanity fetch ne uspe
- ❌ Kardiohirurgija (custom page + `units.ts`, 5 pod-jedinica) — poseban task, širi schema (ne staje u generički `clinicPage`)

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
- ❌ **Namerni izuzetak — ne migrira se**: `cardioview3d-lab` ostaje hardkodovana (3 taba, svaki sa bogatijim ugnježdenim sadržajem — paragrafi, "focus grid" kartice sa ugnježdenim listama, contact blok — struktura se ne ponavlja nigde drugde na sajtu, pa ne opravdava novi custom block tip po politici iz `MIGRACIJA.md` — isti presedan kao kardiohirurgija). `cardioview3d-lab/workshop` je čist redirect (bez sadržaja, ništa za migrirati). `npm run build` (exit 0) i `npm run lint` (29 problema, identično baseline-u) — bez regresija.

### 5. Aktuelnosti (9 stranica, `news`-tipa multi-instance dokumenti)

- ❌ Proveriti/proširiti postojeći `sanity/schemas/documents/news.ts` (već postoji, neiskorišćen) — dodati polje za kategoriju (vest/obaveštenje/oglas/gostovanje) ako fali
- ❌ `NEWS_LIST_QUERY` (po kategoriji) + `NEWS_BY_SLUG_QUERY` u queries.ts
- ❌ Migraciona skripta za postojeće hardkodovane stavke iz `vesti`, `obavestenja`, `oglasi-konkursi`, `gostovanja`
- ❌ Konvertovati hub + `[slug]` dinamičku rutu da fetch-uju sa Sanity-ja
- ❌ ☁️ `casopis-dedinje` i `informator` — ne migrirati još, blokirano poznatim bugom sa pogrešnim PDF linkovima, čeka pravi materijal od vlasnika (vidi Backlog niže)

**Napomena uz sve sekcije:** svaka stranica zadržava hardkodovani fallback
(isti obrazac kao 5 postojećih Sanity stranica) — ako Sanity fetch ne uspe,
stranica i dalje radi.

## Sadržaj za unos — `docs za ubacivanje/` (gitignored, samo lokalno)

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
- ❌ ☁️ Kontakt forma — odlučiti email servis (Resend/Nodemailer/itd.), povezati `app/kontakt/page.tsx` na pravu `/api` rutu. Detalji: [`PROJECT_STATUS.md`](PROJECT_STATUS.md).
- ❌ 5 mrtvih linkova u meniju (`/nauka-istrazivanje/korisni-linkovi/*`, `/nauka-istrazivanje/monografija`) — kreirati stranice ili ukloniti linkove iz `Header.tsx`.
- ❌ ☁️ Testovi/CI odluka — da li ima smisla za marketinški sajt, ili samo build+lint gate.
- ❌ ☁️ `useCdn: false` razmatranje (CDN + revalidacija ako saobraćaj poraste).
- ❌ ☁️ Hardkodovani Sanity `projectId`/`dataset` na više mesta — rizik samo ako se pravi drugi Sanity projekat/dataset.
- ❌ `public/doctor-milan-nikolic.png` — orphan asset, povezati sa doktorom ili obrisati.
- ❌ ☁️ **Pogrešni/izmišljeni PDF linkovi na 2 stranice — placeholder-bug, nađeno tokom Batch 7.**
  - `/aktuelnosti/casopis-dedinje` — `IZDANJA` niz u `page.tsx` ima izmišljene naslove/teme po izdanju (npr. "Vol 12, Br 1 (2025) — Kardiovaskularna hirurgija...") i svih 6 `pdfUrl` pogrešno vodi na `АКАДЕМИК-CV-...pdf`/`РАДОВИ-ДИРЕКТОРА-...pdf` (CV/bibliografija direktora, ne časopis). Live sajt (`ikvbd.org/o-nama/casopis-dedinje/`) ima pravi arhiv od 27 sekvencijalnih brojeva sa pravim PDF-ovima.
  - `/aktuelnosti/informator` — dugmad "Читај"/"Преузми" takođe vode na `/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf` umesto na pravi Informator o radu dokument.
  - Oba trenutno prikazuju netačne informacije javno — treba pravi PDF materijal od vlasnika sajta pre popravke.
- ❌ ☁️ `/klinike/fizikalna-medicina` vs `/klinike/kardiovaskularna-rehabilitacija` — moguće preklapanje. Live sajt (ikvbd.org) ima JEDNU stranicu "Centar za kardiovaskularnu rehabilitaciju" na `/klinike/fizikalna-medicina-i-rehabilitacija/`; ovde postoje DVE odvojene rute. Proveriti sa vlasnikom sajta da li je podela namerna ili treba spajanje/redirect.
- ❌ "Kućni red" (pravilnik, PDF) nije linkovan nigde u `/za-pacijente/` rutama — na live sajtu postoji kao PDF link sa te stranice. Dodati link/dokument.
- ❌ `/edukacija/medjunarodni-kongresi` — live sajt ima novije kongrese iz 2025/2026 (Dedinje Vascular Symposium 2026, COVID kongres 2026, Neurocard 2026, Aorta Masterclass, TAVI Academy, Workshop 3D Mapping) koji kod nas ne postoje; nisu dodati jer nemamo prave slike/opise za te događaje (rizik od "praznih" kartica) — treba materijal od vlasnika sajta.
- ❌ "О вашем здрављу" — na live sajtu postoji kao zbirna kategorija/listing stranica koja grupiše članke (npr. Plan ishrane); ovde postoji samo pojedinačna `/za-pacijente/plan-ishrane` ruta bez listing stranice. Relevantno ako se planira više članaka te vrste.
- ❌ `/akta-instituta` — postoji na live ikvbd.org (linkovano sa „О нама"), nema ekvivalentnu rutu kod nas. Otkriveno tokom Batch 1 popune sadržaja.
- ❌ ☁️ `/klinike/kardiohirurgija` — stat "95,5% Стопа преживљавања" nema potvrđen izvor (nije u docx `УВОДНА РЕЧ.docx` ni u stari-sajt sweep beleškama); "3.000+ годишње операција" zaokruženo naviše od docx raspona "2500-3000". Otkriveno tokom docx-audit sweep-a 2026-07-21, vidi `popunjene-stranice-2026-07-21.md`. Treba potvrda vlasnika sajta.
- ❌ ☁️ `/za-pacijente/preoperativna-priprema` — docx izvor ima stavku "Хсердоксо" u listi antikoagulanasa koja nije uneta u kod (nejasno da li je OCR artefakt ili stvaran nedostajući lek). Otkriveno tokom docx-audit sweep-a 2026-07-21, vidi `popunjene-stranice-2026-07-21.md`. Treba potvrda Odeljenja za preoperativnu pripremu.
- ❌ **Homepage (`app/page.tsx`) je najvećim delom neizmenjen demo-seed** iz `scripts/migrate-all.ts` — potvrđeno direktnim upitom na javni Sanity API (ne pretpostavka). Detalji u `popunjene-stranice-2026-07-21.md` → "Audit početne strane". Ukratko:
  - ✅ `Header.tsx` telefon ispravljen (668→700).
  - ✅ Footer (Sanity singleton) telefon/email ispravljen (668/669→700, info@ikvbd.rs→info@ikvbd.com) — `SANITY_API_TOKEN` u `.env.local` nadograđen na Editor token, i `scripts/migrate-footer.ts` ažuriran da ne vrati grešku.
  - ❌ ☁️ Sekcije "Тим" (4 izmišljena doktora) i "Шта кажу наши пацијенти" (3 izmišljena pacijenta) na početnoj imaju fabrikovane ljude sa stock fotografijama — namerno ostavljeno dok se ne dobije pravi materijal ili odluka da se sekcije uklone.
  - ❌ ☁️ Stats sekcija (15.000 operacija/god, 200 lekara, 65 god., 50.000 pacijenata) i emergency telefon "011 3601 600" (treći različit broj) — neprovereni brojevi iz demo seed-a.
  - ❌ Orphaned Sanity sadržaj koji se nigde ne renderuje (`departmentsSection`, `newsSection`, Sanity `hero` slajdovi) — cleanup, nije hitno.

**☁️** = zahteva infra/odluku vlasnika sajta pre nego što se dirne kod.
