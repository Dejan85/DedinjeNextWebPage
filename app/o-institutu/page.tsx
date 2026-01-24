"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { HeroSection, StatCard, ProfileTabs } from "@/components/shared";

export default function OInstitutu() {
  return (
    <>
      <Header />
      <ScrollToTop />

      <div className="institute-page">
        {/* Hero Section */}
        <HeroSection
          img="/images/o_nama_image.png"
          imgAlt="О институту"
          badge="О ИНСТИТУТУ"
          title="Ваш национални институт за срце и крвне судове"
          subtitle="Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини"
          showScrollIndicator={false}
        />

        {/* Statistics Section */}
        <section className="institute-stats-section">
          <div className="container">
            <div className="stats-header">
              <span className="section-badge">Наши резултати</span>
              <h2>Бројке које говоре о нама</h2>
              <p>Преко шест деценија посвећености здрављу пацијената</p>
            </div>
            <div className="stats-grid-large">
              <StatCard
                icon="fas fa-users"
                label="Преко"
                value="74.000"
                description="болесника дана годишње"
              />
              <StatCard
                icon="fas fa-hospital-user"
                label="Преко"
                value="15.900"
                description="лечених пацијентата годишње"
              />
              <StatCard
                icon="fas fa-heartbeat"
                label="Преко"
                value="5.600"
                description="коронарографија годишње"
              />
              <StatCard
                icon="fas fa-procedures"
                label="Преко"
                value="1.000"
                description="ЦФР, ИВУС, ОЦТ годишње"
              />
              <StatCard
                icon="fas fa-user-md"
                label="Over"
                value="3.000"
                description="cardiac surgeries per year"
              />
              <StatCard
                icon="fas fa-stethoscope"
                label="Over"
                value="1.750"
                description="vascular surgeries per year"
              />
              <StatCard
                icon="fas fa-heart"
                label="Over"
                value="2.400"
                description="PCI procedures per year"
              />
              <StatCard
                icon="fas fa-bolt"
                label="Over"
                value="3.020"
                description="electrophysiological procedures per year"
              />
              <StatCard
                icon="fas fa-clipboard-check"
                label="Преко"
                value="270"
                description="ТАБИ процедура годишње"
              />
              <StatCard
                icon="fas fa-lungs"
                label="Преко"
                value="60"
                description="ТЕВАР/ЕВАР годишње"
              />
              <StatCard
                icon="fas fa-heartbeat"
                label="Преко"
                value="400"
                description="ПТА годишње"
              />
              <StatCard
                icon="fas fa-notes-medical"
                label="Преко"
                value="236"
                description="биопсичких пастила"
              />
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

            <ProfileTabs
              profiles={[
                {
                  id: "medicinski",
                  icon: "fas fa-user-md",
                  tabText: "Помоћник директора за медицинске послове",
                  image: "/images/Доц_др_Драгана_Унић_Стојановић.png",
                  imageAlt: "Др Драгана Ункић-Стојановић",
                  name: "Др Драгана Ункић-Стојановић",
                  title: "Помоћник директора за медицинске послове",
                  bioTitle: "Биографија",
                  bioParagraphs: [
                    "Доцент др сц. мед. Драгана Ункић-Стојановић је рођена 1976. године у Гостивару, Република Македонија. Медицински факултет Универзитета у Београду уписала је 1994/1995. године. Дипломирала је 2006. године. Специјалистички испит из Анестезиологије са реаниматологијом је положила у септембру 2006.",
                    "<strong>Докторску дисертацију</strong> под насловом &ldquo;Утицај интраоперативне нормоволемијске хемодилуције и прогностичког модела на потребу за трансфузијом и компликације код болесника хируршки лечених због болести коронарних артерија&rdquo; одбранила је на Медицинском факултету Универзитета у Београду у марту 2020.",
                    "Од 2014-2021. године др Драгана Ункић-Стојановић је била главни анестезиолог болнице са анестезиолошким одељењем (уз обавезу – анестезиологија). Од октобра 2021. у радном odnosу на превентивној хирургији са анестезиологијом на Медицинском факултету у Београду.",
                  ],
                },
                {
                  id: "nemedicinski",
                  icon: "fas fa-briefcase",
                  tabText: "Помоћник директора за немедицинске послове",
                  image: "/images/Бојана_Поповић_маст_екон.png",
                  imageAlt: "Бојана Поповић",
                  name: "Бојана Поповић, маст.екон.",
                  title: "Помоћник директора за немедицинске послове",
                  bioTitle: "Биографија",
                  bioParagraphs: [
                    "Бојана Поповић је дипломирани економиста са мастер степеном стеченим на Економском факултету у Београду. Поседује богато искуство у управљању здравственим установама и финансијском планирању.",
                    "Као помоћник директора за немедицинске послове, одговорна је за све административне, финансијске и организационе аспекте пословања Института. Њена посвећеност ефикасности и модернизацији процеса допринела је значајном унапређењу пословања установе.",
                  ],
                },
                {
                  id: "sestra",
                  icon: "fas fa-user-nurse",
                  tabText: "Главна сестра Института",
                  image: "/images/Зорица_Васић_ВМС.png",
                  imageAlt: "Зорица Васић",
                  name: "Зорица Васић, ВМС",
                  title: "Главна сестра Института",
                  bioTitle: "Биографија",
                  bioParagraphs: [
                    "Зорица Васић је дипломирана виша медицинска сестра са вишедеценијским искуством у кардиоваскуларној негаторској пракси. Током своје каријере показала је изузетну посвећеност пацијентима и стручном развоју медицинског особља.",
                    "Као главна сестра Института, координира рад свих медицинских сестара и техничара, обезбеђујући најбоље стандарде неге и безбедности пацијената. Активно учествује у едукацији младих кадрова и унапређењу стандарда неге.",
                  ],
                },
              ]}
              defaultTab="medicinski"
            />
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
