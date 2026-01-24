"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function OInstitutu() {
  const [activeTab, setActiveTab] = useState("medicinski");

  return (
    <>
      <Header />
      <ScrollToTop />

      <div className="institute-page">
        {/* Hero Section */}
        <section className="hero-section hero-single">
          <div className="hero-slide">
            <div className="hero-bg">
              <img src="/images/o_nama_image.png" alt="О институту" />
            </div>
            <div className="hero-overlay"></div>
            <div className="container">
              <div className="hero-content">
                <nav className="breadcrumb">
                  <Link href="/">Почетна</Link>
                  <span>/</span>
                  <span>О институту</span>
                </nav>
                <span className="hero-badge">О ИНСТИТУТУ</span>
                <h1 className="hero-title">
                  Ваш национални институт за срце и крвне судове
                </h1>
                <p className="hero-description">
                  Водећа здравствена установа у региону са преко 65 година
                  искуства у кардиоваскуларној медицини
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="institute-stats-section">
          <div className="container">
            <div className="stats-header">
              <span className="section-badge">Наши резултати</span>
              <h2>Бројке које говоре о нама</h2>
              <p>Преко шест деценија посвећености здрављу пацијената</p>
            </div>
            <div className="stats-grid-large">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">74.000</h3>
                  <p className="stat-description">болесника дана годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-hospital-user"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">15.900</h3>
                  <p className="stat-description">
                    лечених пацијентата годишње
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">5.600</h3>
                  <p className="stat-description">коронарографија годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">1.000</h3>
                  <p className="stat-description">ЦФР, ИВУС, ОЦТ годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Over</span>
                  <h3 className="stat-value">3.000</h3>
                  <p className="stat-description">cardiac surgeries per year</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Over</span>
                  <h3 className="stat-value">1.750</h3>
                  <p className="stat-description">
                    vascular surgeries per year
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Over</span>
                  <h3 className="stat-value">2.400</h3>
                  <p className="stat-description">PCI procedures per year</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Over</span>
                  <h3 className="stat-value">3.020</h3>
                  <p className="stat-description">
                    electrophysiological procedures per year
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">270</h3>
                  <p className="stat-description">ТАБИ процедура годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-lungs"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">60</h3>
                  <p className="stat-description">ТЕВАР/ЕВАР годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">400</h3>
                  <p className="stat-description">ПТА годишње</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-notes-medical"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Преко</span>
                  <h3 className="stat-value">236</h3>
                  <p className="stat-description">биопсичких пастила</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="institute-about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <span className="section-badge">О нама</span>
                <h2>Институт за кардиоваскуларне болести Дедиње</h2>
                <p className="lead">
                  Институт за кардиоваскуларне болести Дедиње је национална
                  референтна здравствена установа терцијалног нивоа из области
                  кардиоваскуларних болести и специјализована установа за
                  научноистраживачки рад.
                </p>
                <p>
                  Од свог оснивања 1959. године, Институт је постао симбол
                  изврсности у дијагностици, лечењу и рехабилитацији срчаних и
                  васкуларних обољења. Са тимом од преко 200 високо
                  квалификованих лекара специјалиста и најсавременијом
                  медицинском опремом, пружамо услуге највишег квалитета.
                </p>
                <div className="about-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="fas fa-award"></i>
                    </div>
                    <div className="highlight-text">
                      <h4>Национална референца</h4>
                      <p>Водећа установа за КВБ у Србији</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="fas fa-microscope"></i>
                    </div>
                    <div className="highlight-text">
                      <h4>Научни рад</h4>
                      <p>Специјализована за истраживања</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <i className="fas fa-user-graduate"></i>
                    </div>
                    <div className="highlight-text">
                      <h4>Едукација</h4>
                      <p>Центар за обуку специјалиста</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-image">
                <img
                  src="/images/institute-building.jpg"
                  alt="Институт Дедиње"
                />
                <div className="about-badge">
                  <span className="badge-year">1959</span>
                  <span className="badge-text">Основан</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Section */}
        <section className="management-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">Управа</span>
              <h2>Управа Института</h2>
              <p>Искусни професионалци који воде наш институт</p>
            </div>

            <div className="management-tabs">
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${
                    activeTab === "medicinski" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("medicinski")}
                >
                  <i className="fas fa-user-md"></i>
                  <span>Помоћник директора за медицинске послове</span>
                </button>
                <button
                  className={`tab-btn ${
                    activeTab === "nemedicinski" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("nemedicinski")}
                >
                  <i className="fas fa-briefcase"></i>
                  <span>Помоћник директора за немедицинске послове</span>
                </button>
                <button
                  className={`tab-btn ${
                    activeTab === "sestra" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("sestra")}
                >
                  <i className="fas fa-user-nurse"></i>
                  <span>Главна сестра Института</span>
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "medicinski" && (
                  <div className="management-card">
                    <div className="management-image">
                      <img
                        src="/images/dr-dragana-unkovic.jpg"
                        alt="Др Драгана Ункић-Стојановић"
                      />
                    </div>
                    <div className="management-info">
                      <h3>Др Драгана Ункић-Стојановић</h3>
                      <p className="management-title">
                        Помоћник директора за медицинске послове
                      </p>
                      <div className="management-bio">
                        <h4>Биографија</h4>
                        <p>
                          Доцент др сц. мед. Драгана Ункић-Стојановић је рођена
                          1976. године у Гостивару, Република Македонија.
                          Медицински факултет Универзитета у Београду уписала је
                          1994/1995. године. Дипломирала је 2006. године.
                          Специјалистички испит из Анестезиологије са
                          реаниматологијом је положила у септембру 2006.
                        </p>
                        <p>
                          <strong>Докторску дисертацију</strong> под насловом
                          &ldquo;Утицај интраоперативне нормоволемијске
                          хемодилуције и прогностичког модела на потребу за
                          трансфузијом и компликације код болесника хируршки
                          лечених због болести коронарних артерија&rdquo;
                          одбранила је на Медицинском факултету Универзитета у
                          Београду у марту 2020.
                        </p>
                        <p>
                          Од 2014-2021. године др Драгана Ункић-Стојановић је
                          била главни анестезиолог болнице са анестезиолошким
                          одељењем (уз обавезу – анестезиологија). Од октобра
                          2021. у радном односу на превентивној хирургији са
                          анестезиологијом на Медицинском факултету у Београду.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "nemedicinski" && (
                  <div className="management-card">
                    <div className="management-image">
                      <img
                        src="/images/bojana-popovic.jpg"
                        alt="Бојана Поповић"
                      />
                    </div>
                    <div className="management-info">
                      <h3>Бојана Поповић, маст.екон.</h3>
                      <p className="management-title">
                        Помоћник директора за немедицинске послове
                      </p>
                      <div className="management-bio">
                        <h4>Биографија</h4>
                        <p>
                          Бојана Поповић је дипломирани економиста са мастер
                          степеном стеченим на Економском факултету у Београду.
                          Поседује богато искуство у управљању здравственим
                          установама и финансијском планирању.
                        </p>
                        <p>
                          Као помоћник директора за немедицинске послове,
                          одговорна је за све административне, финансијске и
                          организационе аспекте пословања Института. Њена
                          посвећеност ефикасности и модернизацији процеса
                          допринела је значајном унапређењу пословања установе.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "sestra" && (
                  <div className="management-card">
                    <div className="management-image">
                      <img src="/images/zorica-vasic.jpg" alt="Зорица Васић" />
                    </div>
                    <div className="management-info">
                      <h3>Зорица Васић, ВМС</h3>
                      <p className="management-title">
                        Главна сестра Института
                      </p>
                      <div className="management-bio">
                        <h4>Биографија</h4>
                        <p>
                          Зорица Васић је дипломирана виша медицинска сестра са
                          вишедеценијским искуством у кардиоваскуларној
                          негаторској пракси. Током своје каријере показала је
                          изузетну посвећеност пацијентима и стручном развоју
                          медицинског особља.
                        </p>
                        <p>
                          Као главна сестра Института, координира рад свих
                          медицинских сестара и техничара, обезбеђујући најбоље
                          стандарде неге и безбедности пацијената. Активно
                          учествује у едукацији младих кадрова и унапређењу
                          стандарда неге.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">Наше вредности</span>
              <h2>Оно у шта верујемо</h2>
              <p>Принципи који воде наш рад сваког дана</p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Посвећеност пацијенту</h3>
                <p>
                  Здравље и добробит наших пацијената су у центру свега што
                  радимо. Пружамо персонализовану негу са поштовањем и пажњом.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Стручност и изврсност</h3>
                <p>
                  Континуирано усавршавамо наше вештине и знање како бисмо
                  пружили најбољу могућу здравствену заштиту на светском нивоу.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Иновације</h3>
                <p>
                  Усвајамо најсавременије технологије и методе лечења, будући
                  пионири у примени нових третмана и процедура.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Тимски рад</h3>
                <p>
                  Мултидисциплинарни приступ и сарадња стручњака различитих
                  специјалности обезбеђују оптималне резултате лечења.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Безбедност</h3>
                <p>
                  Безбедност пацијената је наш најважнији приоритет. Поштујемо
                  највише стандарде квалитета и безбедности у свим процедурама.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Интегритет</h3>
                <p>
                  Поступамо са интегритетом, транспарентношћу и етичношћу у свим
                  аспектима нашег рада и односа са пацијентима.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="institute-cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Контактирајте нас данас</h2>
              <p>
                Наш тим стручњака је спреман да вам пружи све потребне
                информације
              </p>
              <div className="cta-buttons">
                <Link href="/kontakt" className="btn-primary">
                  <i className="fas fa-phone"></i>
                  Контактирајте нас
                </Link>
                <Link href="/tim" className="btn-secondary">
                  <i className="fas fa-user-md"></i>
                  Упознајте наш тим
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
