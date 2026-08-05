import { Link } from "@/i18n/navigation";
import Script from "next/script";
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
  HipokratijaWidget,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, NEWS_QUERY, VIDEOS_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";
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
  News,
  VideoItem,
  EventItem,
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
import { categoryLabel } from "./aktuelnosti/categoryLabels";

interface PageBuilder {
  _type: string;
  _key?: string;
}

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
    desc: "Анестезија и интензивно лечење",
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
  {
    icon: "fas fa-x-ray",
    title: "КВ КТ и КВ МР дијагностика",
    desc: "Кардиоваскуларна компјутеризована дијагностика",
    href: "/klinike/kv-dijagnostika",
  },
  {
    icon: "fas fa-laptop-medical",
    title: "Телемедицина",
    desc: "Здравствене услуге на даљину",
    href: "/klinike/telemedicina",
  },
  {
    icon: "fas fa-hospital",
    title: "Поликлиника",
    desc: "Амбулантне здравствене услуге",
    href: "/klinike/poliklinika",
  },
  {
    icon: "fas fa-person-walking",
    title: "Кардиоваскуларна рехабилитација",
    desc: "Опоравак и рехабилитација пацијената",
    href: "/klinike/kardiovaskularna-rehabilitacija",
  },
  {
    icon: "fas fa-pills",
    title: "Апотека",
    desc: "Лекови и медицинско снабдевање",
    href: "/klinike/apteka",
  },
  {
    icon: "fas fa-flask",
    title: "Лабораторијска дијагностика",
    desc: "Лабораторијске анализе",
    href: "/klinike/laboratorija",
  },
  {
    icon: "fas fa-droplet",
    title: "Банка крви",
    desc: "Одељење за трансфузију",
    href: "/klinike/transfuzija",
  },
];

interface PartnerInstitution {
  name: string;
  country: string;
  href: string;
  logo?: string;
}

// Demo lista partnerskih klinika/institucija (2026-08-05, na zahtev vlasnika sajta).
// Logo fajlovi preuzeti sa zvaničnih sajtova institucija, vidi public/images/partners/.
// Fuwai Hospital nema dostupan logo fajl (sajt nedostupan sa naše mreže) — prikazuje se
// tekstualni fallback dok se ne obezbedi zvanični logo.
const PARTNER_INSTITUTIONS: PartnerInstitution[] = [
  {
    name: "Cleveland Clinic",
    country: "САД",
    href: "https://my.clevelandclinic.org/",
    logo: "/images/partners/cleveland-clinic.svg",
  },
  {
    name: "Бакуљов центар",
    country: "Русија",
    href: "https://bakulev.com/",
    logo: "/images/partners/bakulev.png",
  },
  {
    name: "Fuwai Hospital",
    country: "Кина",
    href: "https://en.wikipedia.org/wiki/Fuwai_Hospital",
  },
  {
    name: "Светска банка",
    country: "",
    href: "https://www.worldbank.org/",
    logo: "/images/partners/world-bank.svg",
  },
  {
    name: "Медицински факултет у Београду",
    country: "",
    href: "https://www.mfub.bg.ac.rs/",
    logo: "/images/partners/mf-beograd.png",
  },
  {
    name: "Медицински факултет у Крагујевцу",
    country: "",
    href: "https://www.medf.kg.ac.rs/",
    logo: "/images/partners/mf-kragujevac.png",
  },
  {
    name: "Алмазов национални медицински истраживачки центар",
    country: "Русија",
    href: "https://almazovcentre.ru/",
    logo: "/images/partners/almazov.png",
  },
  {
    name: "УКЦ Ниш",
    country: "",
    href: "https://kcnis.rs/",
    logo: "/images/partners/ukc-nis.png",
  },
  {
    name: "Ватерполо репрезентација Србије",
    country: "",
    href: "https://waterpoloserbia.org/",
    logo: "/images/partners/vaterpolo-savez-srbije.png",
  },
];

// Sekcije privremeno isključene na zahtev vlasnika sajta (2026-08-05, vidi
// PROJECT_STATUS.md dnevnik) — postaviti odgovarajuću vrednost na `true` da
// se sekcija vrati, ništa nije obrisano iz koda/Sanity-ja.
const HOMEPAGE_SECTION_TOGGLES = {
  services: false, // "Комплетна кардиоваскуларна нега"
  whyChooseUs: false, // "По чему смо другачији"
  directorQuote: false, // citat direktora
  ctaBanner: false, // "Ваше здравље је наш приоритет"
  contactCta: false, // "Контактирајте нас" + mapa
  newsGostovanja: false, // "Најновије вести" + "Гостовања у медијима" (vesti su premeštene u events widget kraj "Предстојећи догађаји")
  hipokratijaWidget: true, // Hipokratija widget (prave ocene pacijenata) u "Шта кажу наши пацијенти", zamenjuje demo Sanity kartice na sr lokalu
};

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
  let upcomingEvents: EventItem[] = [];
  try {
    const [newsResRaw, videosResRaw, eventsResRaw] = await Promise.all([
      client.fetch<News[]>(NEWS_QUERY),
      client.fetch<VideoItem[]>(VIDEOS_QUERY),
      client.fetch<EventItem[]>(EVENTS_QUERY),
    ]);
    const newsRes = newsResRaw ? localize(newsResRaw, locale as Locale) : newsResRaw;
    const videosRes = videosResRaw ? localize(videosResRaw, locale as Locale) : videosResRaw;
    const eventsRes = eventsResRaw ? localize(eventsResRaw, locale as Locale) : eventsResRaw;
    if (eventsRes) {
      const today = new Date().toISOString().slice(0, 10);
      upcomingEvents = eventsRes.filter((e) => e.date >= today).slice(0, 4);
    }
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
    console.error("Error fetching news/videos/events for homepage:", error);
  }

  const videoHeroSlides = [
    {
      videoSrc: "/videos/video-za-slajder.mp4",
      title: "Национални институт за срце и крвне судове",
      subtitle: "Традиција и поверење које траје 50 година.",
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
                contactPhone={box.contactPhone}
                contactFax={box.contactFax}
                className={
                  box.variant === "emergency" || box.variant === "contact"
                    ? "emergency"
                    : undefined
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
                <Text
                  variant="body"
                  text={welcomeSection.bodyText}
                  className={styles.welcomeBodyText}
                />
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
              {upcomingEvents.length > 0 || homepageVesti.length > 0 ? (
                <div className={styles.eventsColumn}>
                  {upcomingEvents.length > 0 && (
                    <div className={styles.eventsWidget}>
                      <div className={styles.eventsWidgetHeader}>
                        <span className={styles.eventsWidgetIcon}>
                          <i className="fas fa-calendar-days" aria-hidden />
                        </span>
                        <h3>Предстојећи догађаји</h3>
                      </div>
                      <div className={styles.eventsWidgetList}>
                        {upcomingEvents.map((event) => {
                          const eventContent = (
                            <>
                              <div className={styles.eventThumb}>
                                <Image
                                  src={urlFor(event.image).width(160).height(160).url()}
                                  alt={event.title}
                                  width={80}
                                  height={80}
                                />
                              </div>
                              <div className={styles.eventInfo}>
                                <strong>{event.title}</strong>
                                <span className={styles.eventDate}>
                                  <i className="fas fa-calendar" aria-hidden />
                                  {formatSrDate(event.date)}
                                  {event.location ? ` · ${event.location}` : ""}
                                </span>
                              </div>
                            </>
                          );
                          return event.link ? (
                            <a
                              key={event._id}
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.eventItem}
                            >
                              {eventContent}
                            </a>
                          ) : (
                            <div key={event._id} className={styles.eventItem}>
                              {eventContent}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {homepageVesti.length > 0 && (
                    <div className={styles.eventsWidget}>
                      <div className={styles.eventsWidgetHeader}>
                        <span className={styles.eventsWidgetIcon}>
                          <i className="fas fa-newspaper" aria-hidden />
                        </span>
                        <h3>Најновије вести</h3>
                      </div>
                      <div className={styles.eventsWidgetList}>
                        {homepageVesti.slice(0, 4).map((vest) => (
                          <Link
                            key={vest.id}
                            href={`/aktuelnosti/${vest.slug}`}
                            className={styles.eventItem}
                          >
                            <div className={styles.eventThumb}>
                              <Image
                                src={vest.image}
                                alt={vest.title}
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className={styles.eventInfo}>
                              <strong>{vest.title}</strong>
                              <span className={styles.eventDate}>
                                <i className="fas fa-calendar" aria-hidden />
                                {vest.date}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
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
              )}
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
      {HOMEPAGE_SECTION_TOGGLES.services && servicesSection && (
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
      {HOMEPAGE_SECTION_TOGGLES.whyChooseUs && whyChooseUsSection && (
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
      {HOMEPAGE_SECTION_TOGGLES.directorQuote && (
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
      )}

      {/* CTA Banner */}
      {HOMEPAGE_SECTION_TOGGLES.ctaBanner && ctaSection && (
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

      {/* Partner institutions (logos) */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-globe" aria-hidden />
            </span>
            <div>
              <h2>Наши партнери</h2>
              <p>Сарађујемо са водећим клиникама и институцијама у Европи и свету</p>
            </div>
          </div>
          <div className={styles.partnersLogosGrid}>
            {PARTNER_INSTITUTIONS.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerLogoCard}
                title={partner.name}
              >
                {partner.logo ? (
                  <div className={styles.partnerLogoImgWrap}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      objectFit="contain"
                    />
                  </div>
                ) : (
                  <span className={styles.partnerLogoFallback}>{partner.name}</span>
                )}
                {(partner.logo || partner.country) && (
                  <span className={styles.partnerLogoName}>
                    {partner.logo && partner.name}
                    {partner.country && (
                      <span className={styles.partnerLogoCountry}>
                        {partner.logo ? " · " : ""}
                        {partner.country}
                      </span>
                    )}
                  </span>
                )}
              </a>
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
            {HOMEPAGE_SECTION_TOGGLES.hipokratijaWidget && locale === "sr" ? (
              <HipokratijaWidget entitySlug="institut-za-kardiovaskularne-bolesti-dedinje" />
            ) : (
              <>
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
              </>
            )}
          </Container>
        </section>
      )}
      {HOMEPAGE_SECTION_TOGGLES.hipokratijaWidget &&
        locale === "sr" &&
        testimonialsSection && (
          <Script
            src="https://hipokratija-widget.vercel.app/assets/index.js"
            type="module"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

      {/* News + Gostovanja combined */}
      {HOMEPAGE_SECTION_TOGGLES.newsGostovanja && (
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
                    <div className={styles.newsItemThumb}>
                      <Image src={vest.image} alt={vest.title} fill sizes="90px" />
                    </div>
                    <div className={styles.newsItemBody}>
                      <div className={styles.newsItemMeta}>
                        <span className={styles.newsDate}>
                          <i className="fas fa-calendar" aria-hidden />
                          {vest.date}
                        </span>
                        {vest.category && (
                          <span className={styles.newsCategory}>
                            {categoryLabel(vest.category)}
                          </span>
                        )}
                      </div>
                      <h4>{vest.title}</h4>
                      <p>{vest.excerpt}</p>
                    </div>
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
                      <img
                        src={`https://img.youtube.com/vi/${g.youtubeId}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                      />
                      <span className={styles.gostovanjePlay}>
                        <i className="fas fa-play" aria-hidden />
                      </span>
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
      )}

      {/* Contact CTA */}
      {HOMEPAGE_SECTION_TOGGLES.contactCta && (
        <section className={styles.contactCta}>
          <Container>
            <div className={styles.contactCtaInner}>
              <div className={styles.contactCtaInfo}>
                <div className={styles.contactCtaIcon}>
                  <i className="fas fa-headset" aria-hidden />
                </div>
                <h2>Контактирајте нас</h2>
                <p>
                  Потребна вам је помоћ? Наш тим стручњака је спреман да
                  одговори на сва ваша питања.
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
      )}

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
