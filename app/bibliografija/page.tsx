"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function BibliografijaPage() {
  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="page-header-simple">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Почетна</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/rec-direktora">Реч директора</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/biografija">Биографија</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Библиографија</span>
          </div>
          <h1>Библиографија</h1>
          <p>Академик проф. др Милован М. Бојић</p>
        </div>
      </section>

      {/* Bibliography Content */}
      <section className="bibliography-section">
        <div className="container">
          {/* Introduction */}
          <div className="bibliography-intro">
            <div className="intro-card">
              <h2>О библиографији</h2>
              <p>
                Reference су сређене према најновијем правилнику о стицању
                истраживачких и научних звања из 10/2024.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">190.155</div>
                  <div className="stat-label">Укупан IF</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">16.255</div>
                  <div className="stat-label">M21a+</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">38.43</div>
                  <div className="stat-label">M21a</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">89.423</div>
                  <div className="stat-label">M21</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">32.151</div>
                  <div className="stat-label">M22</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">13.896</div>
                  <div className="stat-label">M23</div>
                </div>
              </div>
            </div>
          </div>

          {/* M21a+ Category */}
          <div className="bibliography-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="category-info">
                <h2>М21а+ Рад у међународном часопису изузетних вредности</h2>
                <p className="category-description">
                  Вредност индикатора: 20 | Укупно радова: 2
                </p>
              </div>
            </div>
            <div className="publications-list">
              <div className="publication-item">
                <span className="pub-number">1.</span>
                <div className="pub-content">
                  <p>
                    Lazarević AM, Nakatani S, Nesković AN, Marinković J,
                    Yasumura Y, Stojicić D, Miyatake K, Bojić M, Popović AD.
                    Early changes in left ventricular function in chronic
                    asymptomatic alcoholics: relation to the duration of heavy
                    drinking. <em>J Am Coll Cardiol</em> 2000;35:1599-606. 3/63,
                    IF 7.082.
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">2.</span>
                <div className="pub-content">
                  <p>
                    Nešković A. N. Mojsilović A, Jovanović T, Vasiljević J,
                    Popović M, Marinković J, Bojić M, Popović A. D. Myocardial
                    tissue characterization after acute myocardial infraction
                    using wavelet image decomposition: a novel approach for the
                    detection of myocardial viability in the early
                    postinfraction period. <em>Circulation</em> 1998; 98
                    (7):634-641. 1/62, IF 9.173
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* M21a Category */}
          <div className="bibliography-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="category-info">
                <h2>М21а Рад у међународном часопису изузетних вредности</h2>
                <p className="category-description">
                  Вредност индикатора: 12 | Укупно радова: 6
                </p>
              </div>
            </div>
            <div className="publications-list">
              <div className="publication-item">
                <span className="pub-number">1.</span>
                <div className="pub-content">
                  <p>
                    Milicic M, Bojic M, Rocca B, Milojevic M. Rethinking aspirin
                    responsiveness in coronary surgery: True resistance or
                    misinterpretation.{" "}
                    <em>European Journal of Cardio-Thoracic Surgery.</em> 2025
                    Jun 28:ezaf216. 39/293, IF 3.3
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">2.</span>
                <div className="pub-content">
                  <p>
                    Ilic I, Zdravkovic M, Timcic S, Stojanovic DU, Bojic M,
                    Loncar G. Pneumonia in medical professionals during COVID-19
                    outbreak in cardiovascular hospital.{" "}
                    <em>Int J Infect Dis.</em> 2021 Feb;103:188-193. 13/95, IF
                    12.073
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">3.</span>
                <div className="pub-content">
                  <p>
                    Lazarević A. M, Nešković A. N, Goronja M, Golubović S, Komić
                    J, Bojić M, Popović A. D. Low Incidence of Cardiac
                    Abnormalities in Treated Trichinosis: A Postoperative Study
                    of 62 Patients in a Single-Source Outbreak.{" "}
                    <em>Am J Med</em> 1999;107:18-23. 8/109, IF 4.977
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">4.</span>
                <div className="pub-content">
                  <p>
                    Nešković A. N, Marinković J, Bojić M, Popović A. D. Early
                    Predictors of Mitral Regurgitation After Acute Myocardial
                    Infarction. <em>Am J Cardiol</em> 1999;84:329-32. 8/109, IF
                    4.977
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">5.</span>
                <div className="pub-content">
                  <p>
                    Popović Z, Mirić M, Gradinac S, Nešković A. N, Jovović LJ,
                    Vuk Lj, Bojić M, Popović A. D. Effects of partial left
                    ventriculectomy on left ventricular performance in patients
                    with nonischemic dilated cardiomyopathy.{" "}
                    <em>J Am Coll Cardiol</em> 1998; 32: 1801-1808. 3/62, IF
                    7.282
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">6.</span>
                <div className="pub-content">
                  <p>
                    Nešković A. N, Marinković J, Bojić M, Popović A.D.
                    Predictors on left ventricular thrombus formation and
                    disappearance after anterior wall myocardial infarction.{" "}
                    <em>Eur Heart J</em> 1998;19:908-916. 4/62, IF 3.631
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* M21 Category */}
          <div className="bibliography-category">
            <div className="category-header">
              <div className="category-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="category-info">
                <h2>М 21 Рад у врхунском међународном часопису</h2>
                <p className="category-description">
                  Вредност индикатора: 8 | Укупно радова: 31
                </p>
              </div>
            </div>
            <div className="publications-list">
              <div className="publication-item">
                <span className="pub-number">1.</span>
                <div className="pub-content">
                  <p>
                    Milovanovic B, Markovic N, Petrovic M, Zugic V, Ostojic M,
                    Bojic M. Cross-Sectional Study Evaluating the Role of
                    Autonomic Nervous System Functional Diagnostics in
                    Differentiating Post-Infectious Syndromes: Post-COVID
                    Syndrome, Chronic Fatigue Syndrome, and Lyme Disease.{" "}
                    <em>Biomedicines.</em> 2025 Feb 4;13(2):356. 65/195, IF 3.9
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">2.</span>
                <div className="pub-content">
                  <p>
                    Nikolić A, Veljković S, Lakčević J, Peruničić A, Šljivo A,
                    Babić M, Nikolić M, Tomić S, Radoičić D, Farkić M, Boljević
                    D, Vučinić S, Kablar S, Bojić M. Adult Congenital Heart
                    Disease in Serbia: Insights from a Single-Center Registry.{" "}
                    <em>Diagnostics.</em> 2025; 15(4):498. 57/332, IF 3.3
                  </p>
                </div>
              </div>
              <div className="publication-item">
                <span className="pub-number">3.</span>
                <div className="pub-content">
                  <p>
                    Milosevic N, Okiljevic B, Micovic S, Bojic M, Zivkovic I.
                    The Parkes-Weber syndrome in the patient who underwent
                    coronary surgery.{" "}
                    <em>Frontiers in Cardiovascular Medicine</em>{" "}
                    2025;12:1479811. 80/230, IF 2.9
                  </p>
                </div>
              </div>
              {/* Dodaj preostalih 28 radova... */}
              <div className="show-more-wrapper">
                <details className="show-more-details">
                  <summary className="show-more-btn">
                    <i className="fas fa-chevron-down"></i>
                    Прикажи све радове (31)
                  </summary>
                  <div className="additional-pubs">
                    <div className="publication-item">
                      <span className="pub-number">4.</span>
                      <div className="pub-content">
                        <p>
                          Peruničić A, Furtula M, Veljković S, Lakčević J,
                          Šljivo A, Balint V, Tomić S, Vučinić S, Bojić M,
                          Nikolić A. Anomalous Right Coronary Artery in the
                          Setting of Active Tuberculosis: A Multidisciplinary
                          Management Challenge. <em>Life.</em> 2025 May
                          1;15(5):736. 22/107, IF 3.4
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">5.</span>
                      <div className="pub-content">
                        <p>
                          Bojic M, Zivkovic I, Lackovic V, Belic B, Micovic S.
                          Spontaneous Coronary Artery Dissection-Related Left
                          Ventricular Rupture.{" "}
                          <em>Journal of Cardiothoracic Surgery</em>{" "}
                          2024;19:593. 53/235, IF 1.6
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">6.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Lackovic V, Bojic M, Micovic S. The aortic
                          root abscess caused by aortic coarctation-associated
                          aortitis. <em>Texas Heart Institute Journal.</em>{" "}
                          2024;51:e248488. 46/227, IF 1.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">7.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Micovic S, Bojic M. Dual aortic root
                          pathology: fenestrated endocarditis-related aortic
                          root abscess combined with prosthetic aortic valve
                          stenosis. <em>Kardiolgia Polska</em>{" "}
                          2024;82(10):1044-1045. 88/229, IF 2.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">8.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Bjelakovic MS, Bojic M. Massive cerebral
                          air embolism combined with cerebral vasospasm after
                          cardiac surgery. <em>Anesthesia & Analgesia</em> 2024
                          August;139(2):e20-e21. 28/178, IF 4.6
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">9.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Okiljevic B, Micovic S, Bojic M. The
                          clavicular origin of the right subclavian artery.{" "}
                          <em>Texas Heart Institute Journal</em>{" "}
                          2024;51:e247841. 46/227, IF 1.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">10.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Bojic M. Congenital absence of the
                          pericardium with cardiovascular pathology.{" "}
                          <em>Kardiologia Polska</em> 2024;82(2):239-240.
                          88/229, IF 2.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">11.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Bjelakovic MS, Bojic M. Acute respiratory
                          distress syndrome and diffuse alveolar
                          haemorrhage-rare complications after cardiac surgery.{" "}
                          <em>European Heart Journal</em> 2024;45(3):230.
                          73/231, IF 37.6
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">12.</span>
                      <div className="pub-content">
                        <p>
                          Bojic M, Vucinic S, Lackovic V, Stojanovic I, Micovic
                          S. Primary Cardiac Tumors. <em>Rare</em>{" "}
                          2024;2(1):22-33. IF 0.0
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">13.</span>
                      <div className="pub-content">
                        <p>
                          Bojic M, Micovic S, Stojanovic I, Lackovic V, Zivkovic
                          I. Bentall-De Bono procedure for acute Type A aortic
                          dissection: Four decades of experience from a single
                          center. <em>Medical Science Monitor</em>{" "}
                          2023;29:e939808. 81/214, IF 2.9
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">14.</span>
                      <div className="pub-content">
                        <p>
                          Radusinovic MM, Knezevic NN, Savic TD, Lackovic V,
                          Bojic M, Sljivic A, Radusinovic MM, Zivkovic I.
                          Ventricular septal defect with aortic regurgitation
                          and Shone&apos;s syndrome: a case report.{" "}
                          <em>Europ Heart J Case Rep.</em> 2023;7(12):ytad568.
                          IF 0.0
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">15.</span>
                      <div className="pub-content">
                        <p>
                          Stojanovic I, Micovic S, Lackovic V, Zivkovic I, Karan
                          R, Bojic M. The New Surgical Option for the Treatment
                          of Postinfarction Ventricular Septal Rupture: Ten-Year
                          Single Centre Experience.{" "}
                          <em>Journal of Clinical Medicine</em> 2023;12:6577.
                          53/306, IF 3.9
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">16.</span>
                      <div className="pub-content">
                        <p>
                          Savic T, Knezevic N, Lackovic V, Bojic M, Sljivic A,
                          Radusinovic M, Radusinovic M, Zivkovic I, Micovic S.
                          Three-stage surgical treatment of a giant atrial
                          myxoma: when less is more.{" "}
                          <em>European Heart Journal-Case Reports</em>{" "}
                          2023;7(9):ytad496. IF 0.0
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">17.</span>
                      <div className="pub-content">
                        <p>
                          Putnik S, Zivkovic I, Bojic M, Micovic S. Tricuspid
                          annuloplasty combined with transcatheter edge-to-edge
                          mitral valve repair.{" "}
                          <em>Cardiovascular Diagnosis and Therapy</em>{" "}
                          2023;13(4):803-804. 66/216, IF 2.1
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">18.</span>
                      <div className="pub-content">
                        <p>
                          Putnik S, Lovic M, Petrovic M, Micovic S, Lackovic V,
                          Zivkovic I, Bojic M. Pulmonary endarterectomy in a
                          patient with Mullerian agenesis.{" "}
                          <em>Texas Heart Institute Journal</em>{" "}
                          2023;50(5):e237931. 75/217, IF 1.7
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">19.</span>
                      <div className="pub-content">
                        <p>
                          Micovic S, Bojic M, Zivkovic I, Lackovic V, Putnik S.
                          Right atrium-coronary sinus fistula: a surgical
                          approach.{" "}
                          <em>Cardiovascular Diagnosis and Therapy</em>{" "}
                          2023;13(5):962-965. 66/216, IF 2.1
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">20.</span>
                      <div className="pub-content">
                        <p>
                          Lackovic V, Zivkovic I, Putnik S, Stankovic I, Ostojic
                          M, Trifunovic D, Micovic S, Bojic M. Acute Type A
                          aortic dissection in the extremely elderly: surgical
                          considerations and outcomes.{" "}
                          <em>J Cardiothorac Surg.</em> 2023;18(1):102. 104/218,
                          IF 1.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">21.</span>
                      <div className="pub-content">
                        <p>
                          Lackovic V, Zivkovic I, Putnik S, Stankovic I, Micovic
                          S, Bojic M. Extracardiac Obliteration Technique for
                          Postinfarction Left Ventricular Free Wall Rupture
                          Repair With Oozing-Type Bleeding. <em>Innovations</em>{" "}
                          2023;18(3):274-276. 37/103, IF 2.7
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">22.</span>
                      <div className="pub-content">
                        <p>
                          Lackovic V, Stankovic I, Zivkovic I, Micovic S, Bojic
                          M. Challenges in One-Stage Surgical Treatment of a
                          Giant Descending Thoracic Aortic Aneurysm, Infrarenal
                          Aortic Aneurysm, and Symptomatic Aortic Arch Aneurysm.{" "}
                          <em>J Clin Med.</em> 2023;12(6):2367. 53/306, IF 3.9
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">23.</span>
                      <div className="pub-content">
                        <p>
                          Knezevic N, Micovic S, Zivkovic I, Lackovic V, Savic
                          T, Sljivic A, Radusinovic M, Putnik S, Bojic M.
                          Anomalous origin of the left main coronary artery from
                          the pulmonary artery (ALCAPA syndrome) with
                          concomitant complex congenital heart disease in an
                          elderly patient. <em>Ann Card Anaesth.</em>{" "}
                          2023;26(2):203-205. 47/105, IF 0.8
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">24.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Micovic S, Bojic M. Giant left atrial
                          myxoma occupying the entire left atrium.{" "}
                          <em>Cardiovascular Diagnosis and Therapy</em>{" "}
                          2023;13(1):165-168. 66/216, IF 2.1
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">25.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Savic T, Bojic M. Endocarditis-related
                          mitro-aortic intervalvular fibrosis.{" "}
                          <em>Annals of Cardiac Anaesthesia</em>{" "}
                          2023;26(1):92-94. 47/105, IF 0.8
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">26.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Lackovic V, Stojanovic I, Micovic S, Bojic
                          M. Aortic valve replacement with a 31 mm bioprosthesis
                          to treat prosthetic aortic valve stenosis: A case
                          report. <em>Sage Open Medical Case Reports</em>{" "}
                          2023;11. 1-3. IF 0.0
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">27.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Bjelakovic M, Lackovic V, Bojic M.
                          Persistent left superior vena cava draining to left
                          atrium-preoperative diagnostic challenges.{" "}
                          <em>European Heart Journal</em> 2023;44:ehad655.929.
                          73/231, IF 37.6
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">28.</span>
                      <div className="pub-content">
                        <p>
                          Zivkovic I, Bojic M, Micovic S. Congenitally corrected
                          transposition of the great arteries-a magnetic
                          resonance imaging-based diagnosis.{" "}
                          <em>European Heart Journal-Cardiovascular Imaging</em>{" "}
                          2023;24(2):e48. 54/150, IF 6.7
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">29.</span>
                      <div className="pub-content">
                        <p>
                          Putnik S, Colak Z, Micovic S, Zivkovic I, Lackovic V,
                          Markovic D, Stojiljkovic M, Bojic M. Repair of
                          extensive post-intubation tracheal injury during
                          coronary surgery. <em>Kardiolgia Polska</em>{" "}
                          2022;80(4):487-488. 88/229, IF 2.5
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">30.</span>
                      <div className="pub-content">
                        <p>
                          Nastasovic-Stojkovic S, Lackovic V, Zivkovic I,
                          Stojanovic I, Bojic M, Micovic S, Nastasovic N,
                          Raicevic M. Rare Localization of Glomus Tumor on the
                          Chest Wall: A Case Report. <em>Medicina</em>{" "}
                          2022;58(6):789. 39/211, IF 2.6
                        </p>
                      </div>
                    </div>
                    <div className="publication-item">
                      <span className="pub-number">31.</span>
                      <div className="pub-content">
                        <p>
                          Marinkovic M, Stojanovic I, Micovic S, Stanojevic A,
                          Bojic M, Zdravkovic M, Boskovic M. Taurodontism: A
                          Review and Case Report. <em>Srp Arh Celok Lek.</em>{" "}
                          2022;150(7-8):495-498. 39/176, IF 0.7
                        </p>
                      </div>
                    </div>
                    <summary className="show-more-btn show-less-btn">
                      <i className="fas fa-chevron-up"></i>
                      Сакриј радове
                    </summary>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="download-section">
            <a
              href="/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf"
              download
              className="btn-download-full"
            >
              <i className="fas fa-file-pdf"></i>
              Преузми комплетну библиографију (PDF)
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
