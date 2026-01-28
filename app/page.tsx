"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ScrollToTop from "@/components/ScrollToTop";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import StatCounter from "@/components/StatCounter";
import ServiceCard from "@/components/ServiceCard";
import FeatureItem from "@/components/FeatureItem";
import DepartmentCard from "@/components/DepartmentCard";
import TeamCard from "@/components/TeamCard";
import TestimonialCard from "@/components/TestimonialCard";
import NewsCard from "@/components/NewsCard";
import WelcomeFeature from "@/components/WelcomeFeature";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Info Boxes */}
      <section className="info-boxes">
        <div className="container">
          <div className="info-boxes-grid">
            <InfoBox
              icon="far fa-clock"
              title="Радно време"
              schedule={[
                { days: "Пон - Пет", hours: "08:00 - 19:00" },
                { days: "Субота", hours: "09:00 - 17:00" },
                { days: "Недеља", hours: "09:00 - 15:00" },
              ]}
            />

            <InfoBox
              icon="fas fa-hospital"
              title="Наша одељења"
              description="Упознајте се са свим одељењима и услугама које наш институт нуди пацијентима."
              linkText="Погледај одељења"
              linkHref="#"
            />

            <InfoBox
              icon="fas fa-user-md"
              title="Наш тим"
              description="Упознајте наше лекаре специјалисте и стручњаке који брину о вашем здрављу."
              linkText="Упознајте тим"
              linkHref="#"
            />

            <InfoBox
              icon="fas fa-ambulance"
              title="Хитни случајеви"
              emergencyPhone="011 3601 600"
              emergencyNote="Доступни 24/7 за хитне случајеве"
              className="emergency"
            />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-content">
              <span className="section-badge">Добродошли</span>
              <h2>Институт за кардиоваскуларне болести Дедиње</h2>
              <p className="lead">
                Водећа здравствена установа у региону специјализована за
                дијагностику, лечење и рехабилитацију кардиоваскуларних обољења.
              </p>
              <p>
                Са више од 65 година искуства и преко 200 лекара специјалиста,
                Институт Дедиње представља симбол изврсности у кардиоваскуларној
                медицини. Наша посвећеност пацијентима и константно усавршавање
                чине нас првим избором за хиљаде пацијената сваке године.
              </p>
              <div className="welcome-features">
                <WelcomeFeature
                  icon="fas fa-check-circle"
                  text="Најсавременија опрема"
                />
                <WelcomeFeature
                  icon="fas fa-check-circle"
                  text="Стручни тим лекара"
                />
                <WelcomeFeature
                  icon="fas fa-check-circle"
                  text="Комплетна дијагностика"
                />
                <WelcomeFeature
                  icon="fas fa-check-circle"
                  text="24/7 хитна помоћ"
                />
              </div>
              <Button href="#" variant="primary">
                Сазнајте више о нама
              </Button>
            </div>
            <div className="welcome-images">
              <div className="welcome-img-main">
                <img
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800"
                  alt="Medical team"
                />
              </div>
              <div className="welcome-img-secondary">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400"
                  alt="Medical equipment"
                />
              </div>
              <div className="experience-badge">
                <span className="exp-number">65+</span>
                <span className="exp-text">Година искуства</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Stats Section */}
      <section className="parallax-section parallax-stats">
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="stats-intro">
              <h2>Бројке које говоре</h2>
              <p>Наши резултати су доказ посвећености и стручности</p>
            </div>
            <div className="stats-grid">
              <StatCounter
                target={15000}
                label="Операција годишње"
                icon="fas fa-heartbeat"
              />
              <StatCounter
                target={200}
                label="Лекара специјалиста"
                icon="fas fa-user-md"
              />
              <StatCounter
                target={65}
                label="Година искуства"
                icon="fas fa-award"
              />
              <StatCounter
                target={50000}
                label="Задовољних пацијената"
                icon="fas fa-smile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Наше услуге</span>
            <h2>Комплетна кардиоваскуларна нега</h2>
            <p>
              Пружамо широк спектар услуга од дијагностике до хируршких
              интервенција
            </p>
          </div>
          <div className="services-grid">
            <ServiceCard
              icon="fas fa-heart"
              title="Кардиохирургија"
              description="Хируршко лечење болести срца укључујући коронарни бајпас, замену и реконструкцију срчаних залистака, операције аорте."
              features={[
                "Коронарни бајпас",
                "Замена залистака",
                "Операције аорте",
              ]}
              linkHref="#"
            />

            <ServiceCard
              icon="fas fa-stethoscope"
              title="Кардиологија"
              description="Комплетна дијагностика и нехируршко лечење болести срца. Модерна опрема за прецизну дијагнозу."
              features={["Ехокардиографија", "ЕКГ и Холтер", "Стрес тестови"]}
              linkHref="#"
              featured={true}
            />

            <ServiceCard
              icon="fas fa-x-ray"
              title="Васкуларна хирургија"
              description="Хируршко лечење болести крвних судова укључујући аорту, каротидне и периферне артерије."
              features={[
                "Операције аорте",
                "Каротидна хирургија",
                "Периферна хирургија",
              ]}
              linkHref="#"
            />

            <ServiceCard
              icon="fas fa-procedures"
              title="Интервентна кардиологија"
              description="Минимално инвазивне процедуре за лечење срчаних обољења без отворене хирургије."
              features={["Уградња стентова", "Ангиопластика", "Катетеризација"]}
              linkHref="#"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-wrapper">
            <div className="features-content">
              <span className="section-badge">Зашто ми</span>
              <h2>По чему смо другачији</h2>
              <p>
                Институт Дедиње комбинује дугогодишње искуство са
                најсавременијом технологијом како би пружио најбољу могућу негу.
              </p>
              <div className="features-list">
                <FeatureItem
                  icon="fas fa-user-md"
                  title="Врхунски стручњаци"
                  description="Тим од преко 200 лекара специјалиста са међународним искуством."
                />
                <FeatureItem
                  icon="fas fa-microscope"
                  title="Најмодернија опрема"
                  description="Користимо најновију медицинску технологију за прецизну дијагностику."
                />
                <FeatureItem
                  icon="fas fa-clock"
                  title="Брза дијагностика"
                  description="Резултати у најкраћем могућем року за правовремено лечење."
                />
                <FeatureItem
                  icon="fas fa-hand-holding-heart"
                  title="Индивидуални приступ"
                  description="Сваки пацијент добија персонализован план лечења."
                />
              </div>
            </div>
            <div className="features-image">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800"
                alt="Modern medical equipment"
              />
              <div className="features-image-overlay">
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
                <span>Погледајте видео о нама</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <section className="parallax-section parallax-cta">
        <div className="parallax-overlay gradient"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="cta-content">
              <h2>Ваше здравље је наш приоритет</h2>
              <p>
                Контактирајте нас за више информација о нашим услугама и како
                можемо помоћи вашем здрављу.
              </p>
              <div className="cta-buttons">
                <Button href="tel:0113601668" variant="white">
                  <i className="fas fa-phone-alt"></i> Позовите нас
                </Button>
                <Button href="#contact" variant="outline-white">
                  Контактирајте нас
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Одељења</span>
            <h2>Наша специјализована одељења</h2>
            <p>
              Свако одељење посвећено је одређеној области кардиоваскуларне
              медицине
            </p>
          </div>
          <div className="departments-grid">
            <DepartmentCard
              image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600"
              title="Одељење за кардиохирургију"
              description="Комплексне хируршке интервенције на срцу"
              linkHref="#"
            />
            <DepartmentCard
              image="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600"
              title="Одељење за кардиологију"
              description="Дијагностика и нехируршко лечење"
              linkHref="#"
            />
            <DepartmentCard
              image="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600"
              title="Интензивна нега"
              description="24/7 мониторинг критичних пацијената"
              linkHref="#"
            />
            <DepartmentCard
              image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
              title="Рехабилитација"
              description="Постоперативни опоравак и терапија"
              linkHref="#"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Наш тим</span>
            <h2>Упознајте наше стручњаке</h2>
            <p>Искусни лекари посвећени вашем здрављу</p>
          </div>
          <div className="team-grid">
            <TeamCard
              image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400"
              name="Др Марко Јовановић"
              role="Кардиохирург"
              description="Специјалиста са 20+ година искуства у комплексним кардиохируршким интервенцијама."
              socialLinks={[
                { platform: "facebook", url: "#" },
                { platform: "linkedin", url: "#" },
                { platform: "email", url: "#" },
              ]}
            />
            <TeamCard
              image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400"
              name="Др Ана Петровић"
              role="Кардиолог"
              description="Водећи специјалиста за неинвазивну кардиолошку дијагностику и превенцију."
              socialLinks={[
                { platform: "facebook", url: "#" },
                { platform: "linkedin", url: "#" },
                { platform: "email", url: "#" },
              ]}
            />
            <TeamCard
              image="/doctor-milan-nikolic.png"
              name="Др Милан Николић"
              role="Васкуларни хирург"
              description="Експерт за хируршко лечење болести крвних судова и аортне патологије."
              socialLinks={[
                { platform: "facebook", url: "#" },
                { platform: "linkedin", url: "#" },
                { platform: "email", url: "#" },
              ]}
            />
            <TeamCard
              image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400"
              name="Др Јелена Стојковић"
              role="Анестезиолог"
              description="Специјалиста за кардиоанестезију са богатим искуством у интензивној нези."
              socialLinks={[
                { platform: "facebook", url: "#" },
                { platform: "linkedin", url: "#" },
                { platform: "email", url: "#" },
              ]}
            />
          </div>
          <div className="team-cta">
            <a href="#" className="btn-primary">
              Упознајте цео тим
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header centered light">
            <span className="section-badge">Искуства</span>
            <h2>Шта кажу наши пацијенти</h2>
          </div>
          <div className="testimonials-slider">
            <TestimonialCard
              quote="Захваљујући тиму на Дедињу, данас водим потпуно нормалан живот. Операција је протекла без компликација, а постоперативна нега је била на највишем нивоу. Неизмерно сам захвалан."
              authorName="Петар Миловановић"
              authorRole="Пацијент, Кардиохирургија"
              authorImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            />
            <TestimonialCard
              quote="Професионалност и хуманост особља на Дедињу су ме одушевили. Од првог прегледа до завршетка лечења осећала сам се сигурно и збринуто. Топло препоручујем."
              authorName="Марија Станковић"
              authorRole="Пацијенткиња, Кардиологија"
              authorImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
            />
            <TestimonialCard
              quote="Након уградње стентова осећам се као нов човек. Др Јовановић и његов тим су истински професионалци. Брза интервенција ми је спасила живот."
              authorName="Зоран Томић"
              authorRole="Пацијент, Интервентна кардиологија"
              authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
            />
          </div>
          <div className="testimonials-nav">
            <button className="testimonial-prev">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="testimonials-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <button className="testimonial-next">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Новости</span>
            <h2>Најновије вести</h2>
            <p>Будите у току са дешавањима на Институту</p>
          </div>
          <div className="news-grid">
            <NewsCard
              image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
              category="Иновације"
              date="15. јануар 2026"
              author="Медицински тим"
              title="Нова метода минимално инвазивне кардиохирургије"
              description="Институт Дедиње уводи најновију технологију за минимално инвазивне операције срца која значајно скраћује време опоравка пацијената."
              linkHref="#"
              size="large"
            />
            <div className="news-sidebar">
              <NewsCard
                image="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400"
                category="Акције"
                date="10. јануар 2026"
                title="Бесплатни кардиолошки прегледи"
                linkHref="#"
                size="small"
              />
              <NewsCard
                image="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400"
                category="Опрема"
                date="5. јануар 2026"
                title="Нова савремена опрема на одељењу"
                linkHref="#"
                size="small"
              />
              <NewsCard
                image="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400"
                category="Успех"
                date="1. јануар 2026"
                title="Успешна 10.000 операција у 2025."
                linkHref="#"
                size="small"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Contact Section */}
      <section className="parallax-section parallax-appointment">
        <div className="parallax-overlay dark"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="appointment-wrapper">
              <div className="appointment-info">
                <h2>Контактирајте нас</h2>
                <p>
                  Попуните формулар и наш тим ће вас контактирати у најкраћем
                  року са свим потребним информацијама.
                </p>
                <div className="appointment-contact">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="contact-text">
                      <span>Телефон</span>
                      <strong>011 3601 668</strong>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <span>Е-пошта</span>
                      <strong>info@ikvbd.rs</strong>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <span>Адреса</span>
                      <strong>Хероја Милана Тепића 1</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appointment-form-wrapper" id="contact">
                <form className="appointment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" id="name" required />
                      <label htmlFor="name">Име и презиме</label>
                    </div>
                    <div className="form-group">
                      <input type="email" id="email" required />
                      <label htmlFor="email">Е-пошта</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="tel" id="phone" required />
                      <label htmlFor="phone">Телефон</label>
                    </div>
                    <div className="form-group">
                      <select id="department" required>
                        <option value="" disabled></option>
                        <option value="cardiology">Кардиологија</option>
                        <option value="cardiac-surgery">Кардиохирургија</option>
                        <option value="vascular">Васкуларна хирургија</option>
                        <option value="interventional">
                          Интервентна кардиологија
                        </option>
                      </select>
                      <label htmlFor="department">Одељење</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="date" id="date" required />
                      <label htmlFor="date" className="date-label">
                        Жељени датум
                      </label>
                    </div>
                    <div className="form-group">
                      <select id="time" required>
                        <option value="" disabled></option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                      <label htmlFor="time">Време</label>
                    </div>
                  </div>
                  <div className="form-group full">
                    <textarea id="message" rows={3}></textarea>
                    <label htmlFor="message">Додатне напомене</label>
                  </div>
                  <button type="submit" className="btn-submit">
                    <span>Пошаљите поруку</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
