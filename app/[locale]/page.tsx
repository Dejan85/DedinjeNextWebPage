import Link from "next/link";
import {
  HeroSection,
  Button,
  Image,
  InfoBox,
  StatCounter,
  ServiceCard,
  FeatureItem,
  TeamCard,
  TestimonialCard,
  WelcomeFeature,
  Section,
  Container,
  PartnerLogo,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, NEWS_QUERY, VIDEOS_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import styles from "./page.module.css";
import type {
  WelcomeSection,
  StatsSection,
  ServicesSection,
  WhyChooseUsSection,
  CtaSection,
  TeamSection,
  TestimonialsSection,
  NewsSection,
  ContactSection,
  PartnersSection,
  HeroSlidesSection,
  ClinicsFeaturedSection,
  PatientLinksSection,
  News,
  VideoItem,
  InfoBox as InfoBoxType,
  WelcomeFeature as WelcomeFeatureType,
  StatItem,
  ServiceCardItem,
  WhyChooseUsFeature,
} from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { formatSrDate } from "./aktuelnosti/formatDate";
import { GOSTOVANJA } from "./aktuelnosti/gostovanja/constants";
import { VESTI } from "./aktuelnosti/constants";

interface PageBuilder {
  _type: string;
  _key?: string;
}

const PATIENT_LINKS = [
  {
    icon: "fas fa-hospital-user",
    title: "Пријем у болницу",
    desc: "Информације о пријему и припреми",
    href: "/za-pacijente/prijem",
  },
  {
    icon: "fas fa-circle-question",
    title: "Честа питања",
    desc: "Одговори на најчешћа питања",
    href: "/za-pacijente/cesta-pitanja",
  },
  {
    icon: "fas fa-heart-pulse",
    title: "Кардиохируршки конзилијум",
    desc: "Документација и термини",
    href: "/za-pacijente/kardiohirurski-konzilijum",
  },
  {
    icon: "fas fa-stethoscope",
    title: "Васкуларни конзилијум",
    desc: "Процес рада и контакт",
    href: "/za-pacijente/vaskularni-konzilijum",
  },
  {
    icon: "fas fa-clipboard-list",
    title: "Амбуланте",
    desc: "Радно време и локације",
    href: "/za-pacijente/ambulante",
  },
  {
    icon: "fas fa-utensils",
    title: "План исхране",
    desc: "Препоруке за исхрану",
    href: "/za-pacijente/plan-ishrane",
  },
];

const SERVICE_LINK_MAP: Record<string, string> = {
  Кардиохирургија: "/klinike/kardiohirurgija",
  Кардиологија: "/klinike/kardiologija",
  "Васкуларна хирургија": "/klinike/vaskularna-hirurgija",
  "Интервентна кардиологија": "/klinike/invazivna-dijagnostika",
};

function getServiceLink(service: ServiceCardItem): string {
  const link = service.ctaLink?.trim();
  if (link && link !== "#") return link;
  return SERVICE_LINK_MAP[service.title] || "/klinike";
}

const CLINICS_FEATURED = [
  {
    icon: "fas fa-heart-pulse",
    title: "Кардиохирургија",
    desc: "Оперативно лечење срчаних обољења",
    href: "/klinike/kardiohirurgija",
  },
  {
    icon: "fas fa-stethoscope",
    title: "Васкуларна хирургија",
    desc: "Лечење крвних судова",
    href: "/klinike/vaskularna-hirurgija",
  },
  {
    icon: "fas fa-heart",
    title: "Кардиологија",
    desc: "Дијагностика и лечење срца",
    href: "/klinike/kardiologija",
  },
  {
    icon: "fas fa-syringe",
    title: "Анестезиологија",
    desc: "Анестезија и интензивна нега",
    href: "/klinike/anesteziologija",
  },
  {
    icon: "fas fa-heartbeat",
    title: "Инвазивна дијагностика",
    desc: "Катетеризација и интервенције",
    href: "/klinike/invazivna-dijagnostika",
  },
  {
    icon: "fas fa-heart-circle-check",
    title: "Центар за срчану слабост",
    desc: "Комплексно лечење",
    href: "/klinike/centar-srcana-slabost",
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let pageBuilder: PageBuilder[] = [];
  let sanityError = false;

  try {
    const homepage = await client.fetch(HOMEPAGE_QUERY);
    pageBuilder = homepage ? localize(homepage, locale as Locale)?.pageBuilder || [] : [];
  } catch (error) {
    console.error("Sanity fetch failed, using fallback:", error);
    sanityError = true;
  }

  let homepageVesti = VESTI;
  let homepageGostovanja = GOSTOVANJA;
  try {
    const [newsResRaw, videosResRaw] = await Promise.all([
      client.fetch<News[]>(NEWS_QUERY),
      client.fetch<VideoItem[]>(VIDEOS_QUERY),
    ]);
    const newsRes = newsResRaw ? localize(newsResRaw, locale as Locale) : newsResRaw;
    const videosRes = videosResRaw ? localize(videosResRaw, locale as Locale) : videosResRaw;
    if (newsRes && newsRes.length > 0) {
      homepageVesti = newsRes.map((n) => ({
        id: n._id,
        slug: n.slug.current,
        title: n.title,
        date: formatSrDate(n.publishedAt),
        author: n.author || "",
        category: n.category || "",
        image: urlFor(n.mainImage).width(800).height(450).url(),
        excerpt: n.excerpt || "",
        fullText: n.fullText || "",
      }));
    }
    if (videosRes && videosRes.length > 0) {
      homepageGostovanja = videosRes.map((v) => ({
        id: v._id,
        slug: v.slug.current,
        youtubeId: v.youtubeId,
        title: v.title,
        date: v.date || "",
        source: v.source || "",
        description: v.description || "",
        fullText: v.fullText || "",
        isNew: v.isNew,
      }));
    }
  } catch (error) {
    console.error("Error fetching news/videos for homepage:", error);
  }

  const videoHeroSlides = [
    {
      videoSrc: "/videos/institut-dedinje-video-2.mp4",
      badge: "Институт",
      title: 'Институт за кардиоваскуларне болести „Дедиње"',
      subtitle:
        "Савремена дијагностика и лечење, врхунски тим стручњака и најновија медицинска технологија — у служби вашег здравља.",
    },
    {
      videoSrc: "/videos/klinike-video.mp4",
      badge: "Клинике",
      title: "Врхунска кардиоваскуларна нега",
      subtitle:
        "Специјализоване клинике опремљене најсавременијом медицинском технологијом за дијагностику и лечење.",
    },
    {
      videoSrc: "/images/o-institutu.mp4",
      badge: "О нама",
      title: "Више од 60 година искуства",
      subtitle:
        "Традиција изврсности у кардиоваскуларној медицини, препозната у региону и шире.",
    },
    {
      videoSrc: "/videos/rec-direktora.mp4",
      badge: "Реч директора",
      title: "У служби здравља наших пацијената",
      subtitle:
        "Мисија Института је пружање најквалитетније здравствене заштите сваком пацијенту.",
    },
  ];
  let slidesForHero: Array<{
    videoSrc?: string;
    videoPoster?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
  }> = videoHeroSlides;
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
  const heroSlidesSection = pageBuilder.find(
    (section) => section._type === "heroSlidesSection",
  ) as HeroSlidesSection | undefined;
  const clinicsFeaturedSection = pageBuilder.find(
    (section) => section._type === "clinicsFeaturedSection",
  ) as ClinicsFeaturedSection | undefined;
  const patientLinksSectionData = pageBuilder.find(
    (section) => section._type === "patientLinksSection",
  ) as PatientLinksSection | undefined;

  if (heroSlidesSection?.slides && heroSlidesSection.slides.length > 0) {
    slidesForHero = heroSlidesSection.slides.map((slide) => ({
      videoSrc: slide.video,
      videoPoster: slide.image?.asset?.url,
      badge: slide.badge,
      title: slide.title,
      subtitle: slide.subtitle,
    }));
  }

  const clinicsItems =
    clinicsFeaturedSection?.items && clinicsFeaturedSection.items.length > 0
      ? clinicsFeaturedSection.items
      : CLINICS_FEATURED;
  const patientLinkItems =
    patientLinksSectionData?.items && patientLinksSectionData.items.length > 0
      ? patientLinksSectionData.items
      : PATIENT_LINKS;

  const latestGostovanja = homepageGostovanja.slice(0, 3);

  return (
    <>
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
          Sanity CMS nije dostupan. Pokreni: <code>npm run sanity:dev</code> ili{" "}
          <code>npm run migrate:all</code>
        </div>
      )}

      {/* Hero */}
      <HeroSection slides={slidesForHero} showScrollIndicator={false} />

      {/* Info Boxes */}
      <section className="info-boxes">
        <Container>
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
        </Container>
      </section>

      {/* Welcome / About */}
      {welcomeSection && (
        <section className={styles.welcomeSection}>
          <Container>
            <div className={styles.welcomeGrid}>
              <div className={styles.welcomeContent}>
                <Badge variant="primary" text={welcomeSection.badge} />
                <Heading variant="h2" size="lg" text={welcomeSection.heading} />
                <Text variant="lead" text={welcomeSection.leadText} />
                <Text variant="body" text={welcomeSection.bodyText} />
                <div className={styles.welcomeFeatures}>
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
                  <div className={styles.welcomeCtaWrap}>
                    <Button
                      href={welcomeSection.ctaButton.link}
                      variant="primary"
                    >
                      {welcomeSection.ctaButton.text}
                    </Button>
                  </div>
                )}
              </div>
              <div className={styles.welcomeImages}>
                <div className={styles.welcomeImgMain}>
                  <Image
                    src={
                      (welcomeSection.image?.asset &&
                      "url" in welcomeSection.image.asset
                        ? welcomeSection.image.asset.url
                        : "") || "/images/o_nama_image.png"
                    }
                    alt={welcomeSection.heading}
                    width={800}
                    height={600}
                  />
                </div>
                {welcomeSection.secondaryImage?.asset &&
                  "url" in welcomeSection.secondaryImage.asset &&
                  welcomeSection.secondaryImage.asset.url && (
                    <div className={styles.welcomeImgSecondary}>
                      <Image
                        src={welcomeSection.secondaryImage.asset.url}
                        alt="Medical equipment"
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                {welcomeSection.imageBadge && (
                  <div className={styles.experienceBadge}>
                    <Text
                      text={welcomeSection.imageBadge.number}
                      as="span"
                      color="light"
                      align="center"
                      className={styles.expNumber}
                    />
                    <Text
                      text={welcomeSection.imageBadge.text}
                      as="span"
                      color="light"
                      align="center"
                      className={styles.expText}
                    />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Stats */}
      {statsSection && (
        <section className="parallax-section parallax-stats">
          <div className="parallax-overlay"></div>
          <div className="parallax-content">
            <Container>
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
            </Container>
          </div>
        </section>
      )}

      {/* Services */}
      {servicesSection && (
        <Section padding="large" background="gray">
          <Container>
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
                  linkHref={getServiceLink(service)}
                  featured={service.featured}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Why Choose Us */}
      {whyChooseUsSection && (
        <Section padding="large" background="white">
          <Container>
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
                {whyChooseUsSection.image?.asset &&
                "url" in whyChooseUsSection.image.asset &&
                whyChooseUsSection.image.asset.url ? (
                  <Image
                    src={whyChooseUsSection.image.asset.url}
                    alt={whyChooseUsSection.heading}
                    width={800}
                    height={600}
                  />
                ) : null}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Director's Word */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.directorCard}>
            <div className={styles.directorLeft}>
              <div className={styles.directorAvatarLarge}>
                <i className="fas fa-user-tie" aria-hidden />
              </div>
              <div className={styles.directorMeta}>
                <strong>Академик проф. др Милован М. Бојић</strong>
                <span>Директор Института</span>
              </div>
              <Link href="/rec-direktora" className={styles.directorLink}>
                Прочитајте реч директора
                <i className="fas fa-arrow-right" aria-hidden />
              </Link>
            </div>
            <div className={styles.directorRight}>
              <div className={styles.directorQuoteIcon}>
                <i className="fas fa-quote-left" aria-hidden />
              </div>
              <blockquote className={styles.directorQuote}>
                Наша обавеза је да обезбедимо врхунску услугу у домену
                кардиоваскуларне медицине — ефикасне, квалитетне процедуре без
                значајних компликација, које омогућавају брз опоравак и повратак
                свакодневним активностима.
              </blockquote>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Banner */}
      {ctaSection && (
        <section className="parallax-section parallax-cta">
          <div className="parallax-overlay gradient"></div>
          <div className="parallax-content">
            <Container>
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
            </Container>
          </div>
        </section>
      )}

      {/* Clinics Grid */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className={clinicsFeaturedSection?.icon || "fas fa-hospital"} aria-hidden />
            </span>
            <div>
              <h2>{clinicsFeaturedSection?.heading || "Наше клинике"}</h2>
              <p>
                {clinicsFeaturedSection?.subheading ||
                  "Специјализоване организационе јединице Института"}
              </p>
            </div>
          </div>
          <div className={styles.clinicsGrid}>
            {clinicsItems.map((clinic, idx) => (
              <Link key={idx} href={clinic.href || "#"} className={styles.clinicCard}>
                <div className={styles.clinicCardIcon}>
                  <i className={clinic.icon} aria-hidden />
                </div>
                <div>
                  <strong>{clinic.title}</strong>
                  <p>{clinic.desc}</p>
                </div>
                <span className={styles.clinicArrow}>
                  <i className="fas fa-arrow-right" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Button variant="outline" href="/klinike">
              <i className="fas fa-hospital" aria-hidden />
              Погледајте све клинике
            </Button>
          </div>
        </Container>
      </Section>

      {/* For Patients */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className={patientLinksSectionData?.icon || "fas fa-user-shield"} aria-hidden />
            </span>
            <div>
              <h2>{patientLinksSectionData?.heading || "За пацијенте"}</h2>
              <p>{patientLinksSectionData?.subheading || "Брз приступ најважнијим информацијама"}</p>
            </div>
          </div>
          <div className={styles.patientGrid}>
            {patientLinkItems.map((item, idx) => (
              <Link key={idx} href={item.href || "#"} className={styles.patientCard}>
                <div className={styles.patientCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      {teamSection && (
        <Section padding="large" background="white">
          <Container>
            <div className="section-header centered">
              <Badge variant="primary" text={teamSection.badge} />
              <Heading variant="h2" align="center" text={teamSection.heading} />
              <Text
                color="muted"
                align="center"
                text={teamSection.subheading}
              />
            </div>
            <div className={styles.teamGrid}>
              {teamSection.team?.map((member) => (
                <TeamCard
                  key={member._key}
                  image={
                    (member.image?.asset && "url" in member.image.asset
                      ? member.image.asset.url
                      : "") || "/images/o_nama_image.png"
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
              <div className={styles.sectionCta}>
                <Button variant="primary" href={teamSection.ctaButton.link}>
                  {teamSection.ctaButton.text}
                </Button>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Testimonials */}
      {testimonialsSection && (
        <section className={styles.testimonialsSection}>
          <Container>
            <div className="section-header centered light">
              <Badge variant="light" text={testimonialsSection.badge} />
              <Heading
                variant="h2"
                color="light"
                align="center"
                text={testimonialsSection.heading}
              />
            </div>
            <div className={styles.testimonialsSlider}>
              {testimonialsSection.testimonials?.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._key}
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  authorRole={testimonial.authorRole}
                  authorImage={
                    (testimonial.authorImage?.asset &&
                    "url" in testimonial.authorImage.asset
                      ? testimonial.authorImage.asset.url
                      : "") || "/images/o_nama_image.png"
                  }
                />
              ))}
            </div>
            <div className={styles.testimonialsNav}>
              <button className={styles.testimonialNavButton}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className={styles.testimonialsDots}>
                {testimonialsSection.testimonials?.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.dot} ${index === 0 ? styles.dotActive : ""}`}
                  ></span>
                ))}
              </div>
              <button className={styles.testimonialNavButton}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </Container>
        </section>
      )}

      {/* News + Gostovanja combined */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.newsGostovanjaGrid}>
            {/* News column */}
            <div className={styles.newsGostovanjaColumn}>
              <div className={styles.sectionHeaderSmall}>
                <span className={styles.sectionIconSmall}>
                  <i className="fas fa-newspaper" aria-hidden />
                </span>
                <h3>Најновије вести</h3>
              </div>
              <div className={styles.newsGostovanjaItems}>
                {homepageVesti.slice(0, 3).map((vest) => (
                  <Link
                    key={vest.id}
                    href={`/aktuelnosti/${vest.slug}`}
                    className={styles.newsItem}
                  >
                    <div className={styles.newsItemMeta}>
                      <span className={styles.newsDate}>
                        <i className="fas fa-calendar" aria-hidden />
                        {vest.date}
                      </span>
                      <span className={styles.newsCategory}>
                        {vest.category}
                      </span>
                    </div>
                    <h4>{vest.title}</h4>
                    <p>{vest.excerpt}</p>
                  </Link>
                ))}
              </div>
              <Link href="/aktuelnosti/vesti" className={styles.seeAllLink}>
                Све вести <i className="fas fa-arrow-right" aria-hidden />
              </Link>
            </div>

            {/* Gostovanja column */}
            <div className={styles.newsGostovanjaColumn}>
              <div className={styles.sectionHeaderSmall}>
                <span className={styles.sectionIconSmall}>
                  <i className="fas fa-tv" aria-hidden />
                </span>
                <h3>Гостовања у медијима</h3>
              </div>
              <div className={styles.newsGostovanjaItems}>
                {latestGostovanja.map((g) => (
                  <Link
                    key={g.id}
                    href={`/aktuelnosti/gostovanja/${g.slug}`}
                    className={styles.gostovanjeItem}
                  >
                    <div className={styles.gostovanjeThumb}>
                      <i className="fas fa-play-circle" aria-hidden />
                    </div>
                    <div className={styles.gostovanjeInfo}>
                      <div className={styles.newsItemMeta}>
                        <span className={styles.newsDate}>
                          <i className="fas fa-calendar" aria-hidden />
                          {g.date}
                        </span>
                        <span className={styles.newsCategory}>{g.source}</span>
                      </div>
                      <h4>{g.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/aktuelnosti/gostovanja"
                className={styles.seeAllLink}
              >
                Сва гостовања <i className="fas fa-arrow-right" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <section className={styles.contactCta}>
        <Container>
          <div className={styles.contactCtaInner}>
            <div className={styles.contactCtaInfo}>
              <div className={styles.contactCtaIcon}>
                <i className="fas fa-headset" aria-hidden />
              </div>
              <h2>Контактирајте нас</h2>
              <p>
                Потребна вам је помоћ? Наш тим стручњака је спреман да одговори
                на сва ваша питања.
              </p>
              <div className={styles.contactCtaDetails}>
                <a href="tel:+381113601700" className={styles.contactCtaItem}>
                  <span className={styles.contactCtaItemIcon}>
                    <i className="fas fa-phone" aria-hidden />
                  </span>
                  <div>
                    <span>Call центар</span>
                    <strong>011 3601 700</strong>
                  </div>
                </a>
                <a
                  href="mailto:info@ikvbd.com"
                  className={styles.contactCtaItem}
                >
                  <span className={styles.contactCtaItemIcon}>
                    <i className="fas fa-envelope" aria-hidden />
                  </span>
                  <div>
                    <span>Е-пошта</span>
                    <strong>info@ikvbd.com</strong>
                  </div>
                </a>
                <div className={styles.contactCtaItem}>
                  <span className={styles.contactCtaItemIcon}>
                    <i className="fas fa-location-dot" aria-hidden />
                  </span>
                  <div>
                    <span>Адреса</span>
                    <strong>Хероја Милана Тепића 1, Београд</strong>
                  </div>
                </div>
              </div>
              <div className={styles.contactCtaButtons}>
                <Button variant="primary" href="/kontakt">
                  <i className="fas fa-paper-plane" aria-hidden />
                  Пошаљите поруку
                </Button>
                <Button variant="outline" href="/o-nama/lokacija">
                  <i className="fas fa-map-location-dot" aria-hidden />
                  Како до нас
                </Button>
              </div>
            </div>
            <div className={styles.contactCtaMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Локација Института"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Partners */}
      {partnersSection && (
        <section className="partners-section">
          <Container>
            <div className="section-header centered">
              <Heading
                variant="h3"
                align="center"
                text={partnersSection.heading}
              />
            </div>
            <div className="partners-slider">
              {partnersSection.partners.map((partner) => (
                <PartnerLogo
                  key={partner._key}
                  icon={partner.icon || ""}
                  text={partner.name}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
