"use client";

import Link from "next/link";
import {
  Header,
  Footer,
  ScrollToTop,
  HeroSection,
  VideoPlayer,
} from "@/components/shared";

export default function RecDirektoraPage() {
  return (
    <>
      <Header />
      {/* Director Hero Section */}
      <HeroSection
        img="/images/rec-direktora.jpg"
        imgAlt="Директор Института"
        badge="Директор Института"
        title="Академик проф. др<br />Милован М. Бојић"
        subtitle='Директор Института за кардиоваскуларне болести "Дедиње"'
        showScrollIndicator={true}
      />

      {/* Director Info Cards */}
      <section className="director-info-section">
        <div className="container">
          <div className="director-info-grid">
            <div className="director-info-card">
              <div className="info-card-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Биографија</h3>
              <p>Упознајте се са каријером и достигнућима нашег директора</p>
              <Link href="/biografija" className="btn-card">
                Прочитајте више <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="director-info-card">
              <div className="info-card-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Библиографија</h3>
              <p>Преглед научних радова и публикација</p>
              <Link href="/bibliografija" className="btn-card">
                Погледајте <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="director-info-card highlight">
              <div className="info-card-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Достигнућа</h3>
              <p>Награде и признања у области кардиоваскуларне медицине</p>
              <Link href="/dostignuca" className="btn-card">
                Сазнајте више <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Director Message Section */}
      <section className="director-message-section">
        <div className="container">
          <div className="director-message-grid">
            <div className="message-content">
              <span className="section-badge">Реч директора</span>
              <h2>Посвећеност изврсности у кардиоваскуларној медицини</h2>
              <div className="message-text">
                <p className="lead-text">
                  Обољења срца и крвних судова представљају најчешћи узрок
                  обољевања и умирања у данашње време. Ово има огроман утицај на
                  све области нашег живота у социјалном, психолошком,
                  организационом, а поготову финансијском смислу.
                </p>

                <p>
                  Наша обавеза је да обезбедимо врхунску услугу у домену
                  кардиоваскуларне медицине уопште, а конкретно у области
                  модерне кардиохируршке праксе. Ефикасне, квалитетне, у кратком
                  року изведене кардиохируршке процедуре без значајних
                  компликација, омогућавају да се болесници брзо и успешно
                  опораве након операције и у кратком временском интервалу врате
                  свом уобичајеном начину живота и професионалним активностима,
                  чиме обезбеђују егзистенцију себи и својој породици.
                </p>

                <p>
                  Наша Клиника обезбеђује потпуно заокружен систем ефикасне
                  дијагностике, лечења и постоперативног опоравка за болеснике
                  којима је потребна кардиохируршка интервенција.
                </p>
              </div>
              <div className="message-signature">
                <div className="signature-line"></div>
                <p>Академик проф. др Милован М. Бојић</p>
              </div>
            </div>
            <div className="message-video">
              <VideoPlayer
                videoSrc="/videos/rec-direktora.mp4"
                overlayText="Погледајте видео поруку"
                caption="Видео порука директора о визији и мисији Института"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="director-quote-section">
        <div className="container">
          <div className="quote-wrapper">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <blockquote>
              "Наша посвећеност је да сваком пацијенту пружимо најбољу могућу
              негу, користећи најсавременије методе и технологије у
              кардиоваскуларној медицини."
            </blockquote>
            <div className="quote-author">
              <div className="author-line"></div>
              <p>Академик проф. др Милован М. Бојић</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Certifications Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header centered">
            <h3>Сертификати и партнерства</h3>
          </div>
          <div className="partners-slider">
            <div className="partner-logo">
              <i className="fas fa-hospital"></i>
              <span>ISO 9001</span>
            </div>
            <div className="partner-logo">
              <i className="fas fa-certificate"></i>
              <span>JCI Акредитација</span>
            </div>
            <div className="partner-logo">
              <i className="fas fa-award"></i>
              <span>Европски стандарди</span>
            </div>
            <div className="partner-logo">
              <i className="fas fa-shield-alt"></i>
              <span>Здравствена заштита</span>
            </div>
            <div className="partner-logo">
              <i className="fas fa-heart"></i>
              <span>Кардио центар</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </>
  );
}
