"use client";

import { useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { HeroSection } from "@/components/shared/HeroSection";

export default function RecDirektoraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    if (videoRef.current) {
      const overlay = videoRef.current.nextElementSibling as HTMLElement;
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
      }
      videoRef.current.play();
      videoRef.current.setAttribute("controls", "controls");
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      const overlay = videoRef.current.nextElementSibling as HTMLElement;
      if (overlay) {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "all";
      }
      videoRef.current.removeAttribute("controls");
    }
  };

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
              <div className="video-wrapper-modern">
                <video
                  ref={videoRef}
                  id="directorVideo"
                  poster=""
                  onEnded={handleVideoEnded}
                >
                  <source src="/videos/rec-direktora.mp4" type="video/mp4" />
                  Ваш претраживач не подржава видео таг.
                </video>
                <div className="video-play-overlay" onClick={playVideo}>
                  <div className="play-button-large">
                    <i className="fas fa-play"></i>
                  </div>
                  <p>Погледајте видео поруку</p>
                </div>
              </div>
              <div className="video-caption">
                <i className="fas fa-video"></i>
                <span>Видео порука директора о визији и мисији Института</span>
              </div>
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
