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
- ❌ `/klinike` + 15 podstranica (kardiologija, kardiohirurgija, vaskularna-hirurgija, anesteziologija, apteka, centar-srcana-slabost, edukacija-prevencija, fizikalna-medicina, invazivna-dijagnostika, klinicka-patologija, kv-dijagnostika, laboratorija, poliklinika, telemedicina, transfuzija)
- ❌ `/za-pacijente` + 10 podstranica
- ❌ `/nauka-istrazivanje` + podstranice
- ❌ `/edukacija` + podstranice
- ❌ `/aktuelnosti` + `[slug]` + podsekcije

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

## Backlog (van Sanity migracije)

- ❌ ☁️ Kontakt forma — odlučiti email servis (Resend/Nodemailer/itd.), povezati `app/kontakt/page.tsx` na pravu `/api` rutu. Detalji: [`PROJECT_STATUS.md`](PROJECT_STATUS.md).
- ❌ 5 mrtvih linkova u meniju (`/nauka-istrazivanje/korisni-linkovi/*`, `/nauka-istrazivanje/monografija`) — kreirati stranice ili ukloniti linkove iz `Header.tsx`.
- ❌ `app/za-pacijente/kardiologija/page.tsx` — 9/10 tabova su "coming soon" stub, treba pravi sadržaj.
- ❌ ☁️ Testovi/CI odluka — da li ima smisla za marketinški sajt, ili samo build+lint gate.
- ❌ ☁️ `useCdn: false` razmatranje (CDN + revalidacija ako saobraćaj poraste).
- ❌ ☁️ Hardkodovani Sanity `projectId`/`dataset` na više mesta — rizik samo ako se pravi drugi Sanity projekat/dataset.
- ❌ `public/doctor-milan-nikolic.png` — orphan asset, povezati sa doktorom ili obrisati.

**☁️** = zahteva infra/odluku vlasnika sajta pre nego što se dirne kod.
