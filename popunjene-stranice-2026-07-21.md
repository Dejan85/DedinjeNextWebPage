# Stari sajt 
https://www.ikvbd.org/


# Dopunjene stranice — popuna sadržaja sa ikvbd.org (2026-07-21)

Spisak stranica čiji je sadržaj stvarno izmenjen (dopunjen) tokom sweep-a
starog sajta `ikvbd.org` naspram `dedinje-next`. Ukupno **16 stranica** +
1 deljena komponenta (infrastruktura).

## Batch 1 — О нама

1. `app/o-nama/lokacija/page.tsx` — dodat Факс broj u kontakt info.

## Batch 2 — Клинике (bez docx izmena)

2. `app/klinike/anesteziologija/page.tsx` — istorijat od 1978. (osnivanje,
   transplantacioni program 1995), kadar (3 grupe: anestezija, intenzivno
   lečenje, klinički lekari), lista procedura.
3. `app/klinike/centar-srcana-slabost/page.tsx` — organizaciona struktura
   (4 jedinice), lista dijagnostike/lečenja, uputstvo za pacijente
   (zakazivanje, dokumentacija).
4. `app/klinike/laboratorija/page.tsx` — lista analiza (hematologija,
   biohemija, markeri...), kadar (3 osobe), uputstvo za pacijente.
5. `app/klinike/poliklinika/page.tsx` — spisak 11 ambulanti, uputstvo za
   zakazivanje (IZIS, radno vreme).

## Batch 3 — Клинике (sa docx izmenama, dopuna rupa)

6. `app/klinike/vaskularna-hirurgija/page.tsx` — istorijat od 1973.
   (Dragoljub Adamov, prvi aortni stentgraft 2004, EVLA od 2019), statistika
   (2.000+ procedura/god, 6-7.000 UZ pregleda).
7. `app/klinike/invazivna-dijagnostika/page.tsx` — istorijat od 1977.
   (prva koronarografija, milestone-i do 2008), statistika (700
   endovaskularnih procedura/god).
8. `app/klinike/kv-dijagnostika/page.tsx` — osnivanje službe 2021, rad u
   smenama, MDCT statistika (26.000+ pregleda/5 god).
9. `app/klinike/telemedicina/page.tsx` — TMC osnovan april 2022. (Dedinje
   2), 120 uređaja, 12 sestara + 5 lekara, grupe pacijenata koje se prate.
10. `app/klinike/kardiologija/page.tsx` — istorijat 1978/1993. (formalno
    osnivanje), kapaciteti (90 postelja, 7 ambulanti, 3 sale za
    kateterizaciju).
11. `app/klinike/kardiohirurgija/page.tsx` — 2 nova highlight-a (trening
    centri 2021. i 2023. godine).

> Napomena: `app/klinike/_components/ClinicPageTemplate.tsx` proširen novim
> opcionim poljem `introParagraphs` (višepasusni uvodni tekst) da bi mogao
> da primi istorijat na klinikama 6–11.

## Batch 4 — За пацијенте

12. `app/za-pacijente/elektrofizioloske-procedure/page.tsx` — popunjeno
    5 praznih "Садржај биће допуњен" pitanja pravim odgovorima.
13. `app/za-pacijente/elektrostimulativne-procedure/page.tsx` — popunjeno
    4 prazna pitanja pravim odgovorima.
14. `app/za-pacijente/kardiologija/page.tsx` — **najveći nalaz**: 9/10
    tabova bilo je "coming soon" stub (poznat blokер iz backloga); popunjeno
    pravim sadržajem za PFO/ASD zatvaranje, koronarografiju, PCI,
    spirometriju, TAVI, test fizičkim opterećenjem, TEE, TTE i farmakološki
    stres eho. Uklonjena neiskorišćena `ComingSoon` komponenta.

## Batch 5 — Наука и истраживање

15. `app/nauka-istrazivanje/centar-izuzetnih-vrednosti/page.tsx` — dodat
    datum akreditacije (20.07.2021, 26. sednica Upravnog odbora).

## Batch 6 — Едукација

16. `app/edukacija/page.tsx` — dodat pasus o istorijatu edukacije
    (saradnja sa Hjustonom, transplantacioni program 90-ih, edukacija 60+
    stručnjaka).

## Batch 7 — Актуелности

Nijedna stranica nije menjana (sve ili već kompletne, ili
placeholder/vremenski osetljiv sadržaj koji se namerno ne portuje). Umesto
izmene, otkriven je i zabeležen u `docs/TASKS.md` bug na
`casopis-dedinje` i `informator` (pogrešni PDF linkovi, izmišljena
izdanja) — nije popravljan bez pravog materijala od vlasnika sajta.

---

**Napomena:** lint (`npm run lint`) prošao bez novih grešaka kroz ceo
proces — baseline od 14 pre-postojećih grešaka nepromenjen. Pun dnevnik i
status svih 7 batch-eva (uključujući stranice koje su bile već kompletne)
nalazi se u `docs/TASKS.md` → "Popuna sadržaja sa starog sajta".

---

# Stranice koje NISU menjane

Sve ostale stranice sajta (osim početne) su provereno pregledane, ali
sadržaj nije dirat — iz razloga navedenih po grupi ispod.

## Već kompletne / poklapaju live sajt (provereno direktno)

- `app/rec-direktora/page.tsx` (Sanity)
- `app/o-institutu/page.tsx` (Sanity — `scripts/migrate-about.ts` već ima
  pune statistike i profile)
- `app/o-nama/nemedicinski-poslovi/page.tsx`
- `app/o-nama/odbori-i-organi-instituta/page.tsx` (+ `OdboriIOrganiClient.tsx`)
- `app/o-nama/zdravstvena-akreditacija/page.tsx`
- `app/klinike/transfuzija/page.tsx`
- `app/za-pacijente/ambulante/page.tsx`
- `app/za-pacijente/cesta-pitanja/page.tsx`
- `app/za-pacijente/informacije-o-stanju/page.tsx`
- `app/za-pacijente/kardiohirurski-konzilijum/page.tsx`
- `app/za-pacijente/plan-ishrane/page.tsx`
- `app/za-pacijente/prijem/page.tsx`
- `app/za-pacijente/vaskularna-hirurgija/page.tsx` (info za pacijente)
- `app/za-pacijente/vaskularni-konzilijum/page.tsx`
- `app/nauka-istrazivanje/nio/page.tsx`
- `app/nauka-istrazivanje/lista-istrazivaca/page.tsx` (kategorizacija se
  malo razlikuje od live sajta, ali rizično za ručnu izmenu bez sigurnog
  izvora — nije dirano)
- `app/nauka-istrazivanje/saige-projekat/page.tsx` (WebFetch live stranice
  nije uspeo da vrati sadržaj, naš tekst već solidan)
- `app/nauka-istrazivanje/aktuelnosti/page.tsx`
- `app/nauka-istrazivanje/cardioview3d-lab/page.tsx`
- `app/nauka-istrazivanje/cardioview3d-lab/workshop/page.tsx` (redirect)
- `app/edukacija/kme-2024/page.tsx`
- `app/edukacija/kongresi/page.tsx`
- `app/edukacija/radionice/page.tsx`
- `app/edukacija/interna-edukacija/page.tsx`
- `app/edukacija/programi/page.tsx`
- `app/edukacija/programi/skola-hipertenzije-i-redukcije-kardiovaskularnih-faktora-rizika/page.tsx`
- `app/edukacija/programi/skola-vaskularnog-ultrazvuka/page.tsx`
- `app/edukacija/programi/skola-ehokardiografije-prof-dr-aleksandra-nikolic/page.tsx`
- `app/aktuelnosti/page.tsx` (index)

## Nisu pojedinačno provereni u ovom sweep-u

- `app/biografija/page.tsx`, `app/bibliografija/page.tsx` (Sanity, ✅ već
  migrirano po TASKS.md; na live sajtu ovo su samo PDF linkovi bez teksta
  za poređenje, nisu posebno fetch-ovani)
- `app/edukacija/kme-2024/kme-medicinske-sestre-tehnicari/page.tsx`

## Nemaju ekvivalent na starom sajtu (namerno preskočeno)

- `app/klinike/apteka/page.tsx`
- `app/klinike/edukacija-prevencija/page.tsx`
- `app/klinike/klinicka-patologija/page.tsx`
- `app/klinike/fizikalna-medicina/page.tsx` — potvrđen duplikat
  `kardiovaskularna-rehabilitacija` (ista ustanova na live sajtu), čeka
  odluku vlasnika (backlog)

## Nove stranice bez live ekvivalenta (iz prošlog docx taska, van obima)

- `app/klinike/elektrofiziologija/page.tsx`
- `app/klinike/kardiovaskularna-rehabilitacija/page.tsx`
- `app/klinike/neurokardioloska-laboratorija/page.tsx`
- `app/klinike/cusmo/page.tsx`
- `app/klinike/neinvazivna-dijagnostika-srca/page.tsx`
- `app/za-pacijente/preoperativna-priprema/page.tsx`
- `app/edukacija/sestrinska-edukacija/page.tsx` + 4 podstranice
  (`istorijat`, `kpr-kurs`, `program-kratkih-studija`, `pripravnicki-staz`)

## Placeholder / vremenski osetljiv sadržaj (namerno preskočeno)

- `app/aktuelnosti/obavestenja/page.tsx`
- `app/aktuelnosti/oglasi-konkursi/page.tsx`
- `app/aktuelnosti/vesti/page.tsx`
- `app/aktuelnosti/gostovanja/page.tsx` (+ `[slug]`)
- `app/aktuelnosti/[slug]/page.tsx`

## Otkriven problem, nije popravljeno bez pravog materijala (☁️ backlog)

- `app/aktuelnosti/casopis-dedinje/page.tsx` — izmišljena izdanja + pogrešni
  PDF linkovi (vode na CV direktora)
- `app/aktuelnosti/informator/page.tsx` — dugmad vode na isti pogrešan PDF

## Live sajt ima noviji sadržaj bez slika/opisa (☁️ backlog)

- `app/edukacija/medjunarodni-kongresi/page.tsx` — live sajt ima kongrese
  iz 2025/2026 (Dedinje Vascular Symposium, COVID kongres, Neurocard, TAVI
  Academy...) bez dostupnih slika/opisa za bezbedan unos

---

# Audit docx izvora vs. uneto u kod (2026-07-21, naknadni sweep)

Svih 25 docx fajlova iz `docs za ubacivanje/` (izvori za "Sadržaj za
unos" batch, ne stari-sajt sweep iznad) konvertovano u tekst i upoređeno
rečenicu po rečenicu sa odgovarajućom `page.tsx`/`units.ts` za ~18
popunjenih stranica. Većina (14/18) se poklapa tačno sa izvorom bez ijedne
razlike. Ispravljeno na licu mesta:

- ✅ `app/klinike/cusmo/page.tsx` — skraćenice "мсс"/"мс" ispravljene u
  "МСС"/"МС" (izvor: `Корекције Сајт Дедиње - Стефан Вељковић.docx`
  eksplicitno koristi velika slova). Ime saradnika ispravljeno iz
  "Alessandro Frigo-ом" u "Alessandro Frigol-ом" da se poklapa doslovno
  sa docx izvorom.
- ✅ `app/nauka-istrazivanje/cardioview3d-lab/page.tsx` — dodat kontakt
  blok sa imenima (Miljenko Subašić, Maša Petrović) iz izvora
  `3D Core IKVBD Sajt.docx`. **Napomena:** docx izvor NIJE sadržao
  stvarne email adrese (samo placeholder tekst "E-mail" pored svakog
  imena) — email adrese nisu dodate jer ih nemamo, treba tražiti od
  odeljenja/inženjera Miljenka ako se žele prikazati.

**Otvoreno, nije ispravljeno (treba odluka/materijal vlasnika sajta):**

- ❌ ☁️ `app/klinike/kardiohirurgija/page.tsx` — stat **"95,5% Стопа
  преживљавања"** ne postoji ni u jednom pronađenom izvoru (ni docx
  `УВОДНА РЕЧ.docx`, ni stari-sajt sweep beleške u TASKS.md). Nepoznato
  poreklo — ozbiljna medicinska tvrdnja na javnom sajtu bez potvrđenog
  izvora. Treba pitati vlasnika sajta/kliniku odakle je broj, ili ga
  ukloniti dok se ne potvrdi.
- ❌ ☁️ Isto na `kardiohirurgija/page.tsx` — "3.000+ годишње операција"
  je zaokruženo naviše; docx izvor kaže raspon "2500 - 3000 операција
  годишње". Manje ozbiljno, ali ista kategorija (nepotvrđena preciznost).
- ❌ ☁️ `app/za-pacijente/preoperativna-priprema/page.tsx` — docx izvor
  (`преоператива 240526.docx`) u listi antikoagulanasa pre pijema ima
  stavku "Хсердоксо" (pored Фарин, Синтром, Аценокумарол, Еликвис,
  Хсарелто/Ксарелто, Прадакса) koja **nije uneta u kod**. Nije jasno da
  li je to bio artefakt (OCR/kucanje greška, npr. duplikat "Ксарелто")
  ili stvaran, peti lek koji nedostaje — nisam mogao pouzdano da
  identifikujem o kom leku je reč, pa nisam ništa dopisivao nasumično u
  medicinsku listu. Treba proveriti sa Odeljenjem za preoperativnu
  pripremu (prof. dr Ivana Petrović) šta je tačno trebalo da piše.

**Lažna uzbuna (za istoriju):** tokom audita je automatski agent prvo
prijavio "Плавикс"/"Ксарелто" kao netačno prenete nazive lekova u odnosu
na docx — provereno ručno: to su tačni, stvarni nazivi lekova (Plavix,
Xarelto); docx izvor je imao tipfelere/OCR mešanje ćirilice i latinice
("Плавиx", "Хсарелто"), a kod ih je ispravno normalizovao. Nije greška.
