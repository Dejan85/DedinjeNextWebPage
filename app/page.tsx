import {
  Header,
  Footer,
  HeroSlider,
  ScrollToTop,
  Button,
  Image,
  InfoBox,
  StatCounter,
  ServiceCard,
  FeatureItem,
  DepartmentCard,
  TeamCard,
  TestimonialCard,
  NewsCard,
  WelcomeFeature,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import type {
  WelcomeSection,
  StatsSection,
  ServicesSection,
  WhyChooseUsSection,
  CtaSection,
  InfoBox as InfoBoxType,
  WelcomeFeature as WelcomeFeatureType,
  StatItem,
  ServiceCardItem,
  WhyChooseUsFeature,
} from "@/sanity/types";

interface PageBuilder {
  _type: string;
  _key?: string;
}

export default async function Home() {
  // Fetch homepage data from Sanity with fallback
  let pageBuilder: PageBuilder[] = [];
  let sanityError = false;

  try {
    const homepage = await client.fetch(HOMEPAGE_QUERY);
    pageBuilder = homepage?.pageBuilder || [];
  } catch (error) {
    console.error("⚠️ Sanity fetch failed, using fallback:", error);
    sanityError = true;
  }

  // Separate different section types
  const heroSlides = pageBuilder.filter((item) => item._type === "hero");
  const infoBoxes = pageBuilder.filter(
    (item) => item._type === "infoBox",
  ) as InfoBoxType[];
  const welcomeSection = pageBuilder.find(
    (item) => item._type === "welcomeSection",
  ) as WelcomeSection | undefined;
  const statsSection = pageBuilder.find(
    (item) => item._type === "statsSection",
  ) as StatsSection | undefined;
  const servicesSection = pageBuilder.find(
    (item) => item._type === "servicesSection",
  ) as ServicesSection | undefined;
  const whyChooseUsSection = pageBuilder.find(
    (item) => item._type === "whyChooseUsSection",
  ) as WhyChooseUsSection | undefined;
  const ctaSection = pageBuilder.find((item) => item._type === "ctaSection") as
    | CtaSection
    | undefined;

  return (
    <>
      <Header />

      {/* Sanity Error Warning (Development only) */}
      {sanityError && process.env.NODE_ENV === "development" && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            padding: "15px",
            textAlign: "center",
            color: "#856404",
            fontWeight: "600",
          }}
        >
          ⚠️ Sanity CMS nije dostupan. Pokreni: <code>npm run sanity:dev</code>{" "}
          ili <code>npm run migrate:all</code>
        </div>
      )}

      {/* Hero Section with Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Info Boxes */}
      <section className="info-boxes">
        <div className="container">
          <div className="info-boxes-grid">
            {infoBoxes.map((box, index) => (
              <InfoBox
                key={box._key || index}
                icon={box.icon}
                title={box.title}
                schedule={box.schedule}
                description={box.description}
                linkText={box.linkText}
                linkHref={box.linkHref}
                emergencyPhone={box.emergencyPhone}
                emergencyNote={box.emergencyNote}
                className={
                  box.variant === "emergency" ? "emergency" : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      {welcomeSection && (
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-grid">
              <div className="welcome-content">
                <Badge variant="primary" text={welcomeSection.badge} />
                <Heading variant="h2" size="lg" text={welcomeSection.heading} />
                <Text variant="lead" text={welcomeSection.leadText} />
                <Text variant="body" text={welcomeSection.bodyText} />
                <div className="welcome-features">
                  {welcomeSection.features?.map(
                    (feature: WelcomeFeatureType) => (
                      <WelcomeFeature
                        key={feature._key}
                        icon={feature.icon}
                        text={feature.text}
                      />
                    ),
                  )}
                </div>
                {welcomeSection.ctaButton && (
                  <Button
                    href={welcomeSection.ctaButton.link}
                    variant="primary"
                  >
                    {welcomeSection.ctaButton.text}
                  </Button>
                )}
              </div>
              <div className="welcome-images">
                <div className="welcome-img-main">
                  <Image
                    src={
                      ("url" in welcomeSection.image.asset
                        ? welcomeSection.image.asset.url
                        : "") || ""
                    }
                    alt={welcomeSection.heading}
                    width={800}
                    height={600}
                  />
                </div>
                {welcomeSection.secondaryImage &&
                  "url" in welcomeSection.secondaryImage.asset &&
                  welcomeSection.secondaryImage.asset.url && (
                    <div className="welcome-img-secondary">
                      <Image
                        src={welcomeSection.secondaryImage.asset.url}
                        alt="Medical equipment"
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                {welcomeSection.imageBadge && (
                  <div className="experience-badge">
                    <Text
                      text={welcomeSection.imageBadge.number}
                      as="span"
                      className="exp-number"
                    />
                    <Text
                      text={welcomeSection.imageBadge.text}
                      as="span"
                      className="exp-text"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Parallax Stats Section */}
      {statsSection && (
        <section className="parallax-section parallax-stats">
          <div className="parallax-overlay"></div>
          <div className="parallax-content">
            <div className="container">
              <div className="stats-intro">
                <Heading
                  variant="h2"
                  color="light"
                  text={statsSection.heading}
                />
                <Text color="light" text={statsSection.subheading} />
              </div>
              <div className="stats-grid">
                {statsSection.stats?.map((stat: StatItem) => (
                  <StatCounter
                    key={stat._key}
                    target={parseInt(stat.number.replace(/[^0-9]/g, ""), 10)}
                    label={stat.label}
                    icon={stat.icon || ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {servicesSection && (
        <section className="services-section">
          <div className="container">
            <div className="section-header centered">
              <Badge variant="primary" text={servicesSection.badge} />
              <Heading
                variant="h2"
                align="center"
                text={servicesSection.heading}
              />
              <Text
                color="muted"
                align="center"
                text={servicesSection.subheading}
              />
            </div>
            <div className="services-grid">
              {servicesSection.services?.map((service: ServiceCardItem) => (
                <ServiceCard
                  key={service._key || service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features?.map((f) => f.text) || []}
                  linkHref={service.ctaLink || "#"}
                  featured={service.featured}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {whyChooseUsSection && (
        <section className="features-section">
          <div className="container">
            <div className="features-wrapper">
              <div className="features-content">
                <Badge variant="primary" text={whyChooseUsSection.badge} />
                <Heading variant="h2" text={whyChooseUsSection.heading} />
                <Text variant="body" text={whyChooseUsSection.subheading} />
                <div className="features-list">
                  {whyChooseUsSection.features?.map(
                    (feature: WhyChooseUsFeature) => (
                      <FeatureItem
                        key={feature._key}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="features-image">
                {whyChooseUsSection.image && (
                  <Image
                    src={
                      ("url" in whyChooseUsSection.image.asset
                        ? whyChooseUsSection.image.asset.url
                        : "") || ""
                    }
                    alt={whyChooseUsSection.heading}
                    width={800}
                    height={600}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <section className="parallax-section parallax-cta">
          <div className="parallax-overlay gradient"></div>
          <div className="parallax-content">
            <div className="container">
              <div className="cta-content">
                <Heading variant="h2" color="light" text={ctaSection.heading} />
                {ctaSection.bodyText && (
                  <Text color="light" text={ctaSection.bodyText} />
                )}
                <div className="cta-buttons">
                  {ctaSection.buttons?.map((button) => {
                    const variantMap: Record<string, string> = {
                      primary: "white",
                      secondary: "outline-white",
                      outline: "outline-white",
                    };
                    const btnVariant = variantMap[button.variant || "primary"];

                    return (
                      <Button
                        key={button._key}
                        href={button.link}
                        variant={btnVariant as any}
                      >
                        {button.icon && <i className={button.icon}></i>}
                        {button.text}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Departments Section */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header centered">
            <Badge variant="primary" text="Одељења" />
            <Heading
              variant="h2"
              align="center"
              text="Наша специјализована одељења"
            />
            <Text
              color="muted"
              align="center"
              text="Свако одељење посвећено је одређеној области кардиоваскуларне медицине"
            />
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
            <Badge variant="primary" text="Наш тим" />
            <Heading
              variant="h2"
              align="center"
              text="Упознајте наше стручњаке"
            />
            <Text
              color="muted"
              align="center"
              text="Искусни лекари посвећени вашем здрављу"
            />
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
            <Badge variant="light" text="Искуства" />
            <Heading
              variant="h2"
              color="light"
              align="center"
              text="Шта кажу наши пацијенти"
            />
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
            <Badge variant="primary" text="Новости" />
            <Heading variant="h2" align="center" text="Најновије вести" />
            <Text
              color="muted"
              align="center"
              text="Будите у току са дешавањима на Институту"
            />
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
                <Heading variant="h2" color="light" text="Контактирајте нас" />
                <Text
                  color="light"
                  text="Попуните формулар и наш тим ће вас контактирати у најкраћем року са свим потребним информацијама."
                />
                <div className="appointment-contact">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="contact-text">
                      <Text text="Телефон" as="span" />
                      <Text text="011 3601 668" as="strong" />
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <Text text="Е-пошта" as="span" />
                      <Text text="info@ikvbd.rs" as="strong" />
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <Text text="Адреса" as="span" />
                      <Text text="Хероја Милана Тепића 1" as="strong" />
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
                    <Text text="Пошаљите поруку" as="span" />
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
            <Heading
              variant="h3"
              align="center"
              text="Сертификати и партнерства"
            />
          </div>
          <div className="partners-slider">
            <div className="partner-logo">
              <i className="fas fa-hospital"></i>
              <Text text="ISO 9001" as="span" />
            </div>
            <div className="partner-logo">
              <i className="fas fa-certificate"></i>
              <Text text="JCI Акредитација" as="span" />
            </div>
            <div className="partner-logo">
              <i className="fas fa-award"></i>
              <Text text="Европски стандарди" as="span" />
            </div>
            <div className="partner-logo">
              <i className="fas fa-shield-alt"></i>
              <Text text="Здравствена заштита" as="span" />
            </div>
            <div className="partner-logo">
              <i className="fas fa-heart"></i>
              <Text text="Кардио центар" as="span" />
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
