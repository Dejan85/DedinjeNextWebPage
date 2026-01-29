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
  DepartmentsSection,
  TeamSection,
  TestimonialsSection,
  NewsSection,
  ContactSection,
  PartnersSection,
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
  const departmentsSection = pageBuilder.find(
    (item) => item._type === "departmentsSection",
  ) as DepartmentsSection | undefined;
  const teamSection = pageBuilder.find(
    (item) => item._type === "teamSection",
  ) as TeamSection | undefined;
  const testimonialsSection = pageBuilder.find(
    (item) => item._type === "testimonialsSection",
  ) as TestimonialsSection | undefined;
  const newsSection = pageBuilder.find(
    (item) => item._type === "newsSection",
  ) as NewsSection | undefined;
  const contactSection = pageBuilder.find(
    (section) => section._type === "contactSection",
  ) as ContactSection | undefined;

  const partnersSection = pageBuilder.find(
    (section) => section._type === "partnersSection",
  ) as PartnersSection | undefined;

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
                    const btnVariant = variantMap[
                      button.variant || "primary"
                    ] as "primary" | "white" | "outline-white" | "hero";

                    return (
                      <Button
                        key={button._key}
                        href={button.link}
                        variant={btnVariant}
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
      {departmentsSection && (
        <section className="departments-section">
          <div className="container">
            <div className="section-header centered">
              <Badge variant="primary" text={departmentsSection.badge} />
              <Heading
                variant="h2"
                align="center"
                text={departmentsSection.heading}
              />
              <Text
                color="muted"
                align="center"
                text={departmentsSection.subheading}
              />
            </div>
            <div className="departments-grid">
              {departmentsSection.departments?.map((dept) => (
                <DepartmentCard
                  key={dept._key}
                  image={
                    ("url" in dept.image.asset ? dept.image.asset.url : "") ||
                    ""
                  }
                  title={dept.title}
                  description={dept.description}
                  linkHref={dept.linkHref}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamSection && (
        <section className="team-section">
          <div className="container">
            <div className="section-header centered">
              <Badge variant="primary" text={teamSection.badge} />
              <Heading variant="h2" align="center" text={teamSection.heading} />
              <Text
                color="muted"
                align="center"
                text={teamSection.subheading}
              />
            </div>
            <div className="team-grid">
              {teamSection.team?.map((member) => (
                <TeamCard
                  key={member._key}
                  image={
                    ("url" in member.image.asset
                      ? member.image.asset.url
                      : "") || ""
                  }
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  socialLinks={member.socialLinks?.filter(
                    (
                      link,
                    ): link is {
                      _key: string;
                      platform: "facebook" | "linkedin" | "email";
                      url: string;
                    } =>
                      link.platform === "facebook" ||
                      link.platform === "linkedin" ||
                      link.platform === "email",
                  )}
                />
              ))}
            </div>
            {teamSection.ctaButton && (
              <div className="team-cta">
                <a href={teamSection.ctaButton.link} className="btn-primary">
                  {teamSection.ctaButton.text}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonialsSection && (
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header centered light">
              <Badge variant="light" text={testimonialsSection.badge} />
              <Heading
                variant="h2"
                color="light"
                align="center"
                text={testimonialsSection.heading}
              />
            </div>
            <div className="testimonials-slider">
              {testimonialsSection.testimonials?.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._key}
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  authorRole={testimonial.authorRole}
                  authorImage={
                    ("url" in testimonial.authorImage.asset
                      ? testimonial.authorImage.asset.url
                      : "") || ""
                  }
                />
              ))}
            </div>
            <div className="testimonials-nav">
              <button className="testimonial-prev">
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="testimonials-dots">
                {testimonialsSection.testimonials?.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === 0 ? "active" : ""}`}
                  ></span>
                ))}
              </div>
              <button className="testimonial-next">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      {newsSection && (
        <section className="news-section">
          <div className="container">
            <div className="section-header centered">
              <Badge variant="primary" text={newsSection.badge} />
              <Heading variant="h2" align="center" text={newsSection.heading} />
              <Text
                color="muted"
                align="center"
                text={newsSection.subheading}
              />
            </div>
            <div className="news-grid">
              {newsSection.news
                ?.filter((item) => item.size === "large")
                .slice(0, 1)
                .map((item) => (
                  <NewsCard
                    key={item._key}
                    image={
                      ("url" in item.image.asset ? item.image.asset.url : "") ||
                      ""
                    }
                    category={item.category}
                    date={item.date}
                    author={item.author}
                    title={item.title}
                    description={item.description}
                    linkHref={item.linkHref}
                    size="large"
                  />
                ))}
              <div className="news-sidebar">
                {newsSection.news
                  ?.filter((item) => item.size === "small")
                  .map((item) => (
                    <NewsCard
                      key={item._key}
                      image={
                        ("url" in item.image.asset
                          ? item.image.asset.url
                          : "") || ""
                      }
                      category={item.category}
                      date={item.date}
                      title={item.title}
                      linkHref={item.linkHref}
                      size="small"
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Parallax Contact Section */}
      {contactSection && (
        <section className="parallax-section parallax-appointment">
          <div className="parallax-overlay dark"></div>
          <div className="parallax-content">
            <div className="container">
              <div className="appointment-wrapper">
                <div className="appointment-info">
                  <Heading
                    variant="h2"
                    color="light"
                    text={contactSection.heading}
                  />
                  {contactSection.subheading && (
                    <Text color="light" text={contactSection.subheading} />
                  )}
                  {contactSection.contactInfo && (
                    <div className="appointment-contact">
                      {contactSection.contactInfo.phone && (
                        <div className="contact-item">
                          <div className="contact-icon">
                            <i className="fas fa-phone-alt"></i>
                          </div>
                          <div className="contact-text">
                            <Text text="Телефон" as="span" />
                            <Text
                              text={contactSection.contactInfo.phone}
                              as="strong"
                            />
                          </div>
                        </div>
                      )}
                      {contactSection.contactInfo.email && (
                        <div className="contact-item">
                          <div className="contact-icon">
                            <i className="fas fa-envelope"></i>
                          </div>
                          <div className="contact-text">
                            <Text text="Е-пошта" as="span" />
                            <Text
                              text={contactSection.contactInfo.email}
                              as="strong"
                            />
                          </div>
                        </div>
                      )}
                      {contactSection.contactInfo.address && (
                        <div className="contact-item">
                          <div className="contact-icon">
                            <i className="fas fa-map-marker-alt"></i>
                          </div>
                          <div className="contact-text">
                            <Text text="Адреса" as="span" />
                            <Text
                              text={contactSection.contactInfo.address}
                              as="strong"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="appointment-form-wrapper" id="contact">
                  <form className="appointment-form">
                    <div className="form-row">
                      <div className="form-group">
                        <input type="text" id="name" required />
                        <label htmlFor="name">
                          {contactSection.formFields?.namePlaceholder ||
                            "Име и презиме"}
                        </label>
                      </div>
                      <div className="form-group">
                        <input type="email" id="email" required />
                        <label htmlFor="email">
                          {contactSection.formFields?.emailPlaceholder ||
                            "Е-пошта"}
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <input type="tel" id="phone" required />
                        <label htmlFor="phone">
                          {contactSection.formFields?.phonePlaceholder ||
                            "Телефон"}
                        </label>
                      </div>
                      <div className="form-group">
                        <select id="department" required>
                          <option value="" disabled></option>
                          {contactSection.departments?.map((dept, index) => (
                            <option key={index} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="department">
                          {contactSection.formFields?.departmentLabel ||
                            "Одељење"}
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <input type="date" id="date" required />
                        <label htmlFor="date" className="date-label">
                          {contactSection.formFields?.dateLabel ||
                            "Жељени датум"}
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
                        <label htmlFor="time">
                          {contactSection.formFields?.timeLabel || "Време"}
                        </label>
                      </div>
                    </div>
                    <div className="form-group full">
                      <textarea id="message" rows={3}></textarea>
                      <label htmlFor="message">
                        {contactSection.formFields?.notesPlaceholder ||
                          "Додатне напомене"}
                      </label>
                    </div>
                    <button type="submit" className="btn-submit">
                      <Text
                        text={
                          contactSection.formFields?.submitButtonText ||
                          "Пошаљите поруку"
                        }
                        as="span"
                      />
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partnersSection && (
        <section className="partners-section">
          <div className="container">
            <div className="section-header centered">
              <Heading
                variant="h3"
                align="center"
                text={partnersSection.heading}
              />
            </div>
            <div className="partners-slider">
              {partnersSection.partners.map((partner) => (
                <div key={partner._key} className="partner-logo">
                  {partner.icon && <i className={partner.icon}></i>}
                  <Text text={partner.name} as="span" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
