import Link from "next/link";
import {
  HeroSection,
  StatCard,
  ProfileTabs,
  VideoPlayer,
  HighlightItem,
  ValueCard,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default async function OInstitutu() {
  // Fetch data from Sanity
  let aboutData: AboutPage | null = null;
  let sanityError = false;

  try {
    aboutData = await client.fetch<AboutPage>(ABOUT_PAGE_QUERY);
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
    sanityError = true;
  }

  // Fallback data
  const hero = aboutData?.hero || {
    badge: "О ИНСТИТУТУ",
    title: "Ваш национални институт за срце и крвне судове",
    subtitle:
      "Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини",
    showScrollIndicator: false,
  };

  const about = aboutData?.about || {
    badge: "О нама",
    heading: "Институт за кардиоваскуларне болести Дедиње",
    leadText:
      "Институт за кардиоваскуларне болести Дедиње је национална референтна здравствена установа терцијалног нивоа из области кардиоваскуларних болести и специјализована установа за научноистраживачки рад.",
    bodyText:
      "Од свог оснивања 1959. године, Институт је постао симбол изврсности у дијагностици, лечењу и рехабилитацији срчаних и васкуларних обољења. Са тимом од преко 200 високо квалификованих лекара специјалиста и најсавременијом медицинском опремом, пружамо услуге највишег квалитета.",
    highlights: [
      {
        _key: "1",
        icon: "fas fa-award",
        title: "Национална референца",
        description: "Водећа установа за КВБ у Србији",
      },
      {
        _key: "2",
        icon: "fas fa-microscope",
        title: "Научни рад",
        description: "Специјализована за истраживања",
      },
      {
        _key: "3",
        icon: "fas fa-user-graduate",
        title: "Едукација",
        description: "Центар за обуку специјалиста",
      },
    ],
    foundedYear: "1959",
    videoSrc: "/images/o-institutu.mp4",
    videoOverlayText: "Погледајте видео",
    videoCaption:
      "Видео презентација Института за кардиоваскуларне болести Дедиње",
  };

  const statistics = aboutData?.statistics || {
    badge: "Наши резултати",
    heading: "Бројке које говоре о нама",
    subtitle: "Преко шест деценија посвећености здрављу пацијената",
    stats: [],
  };

  const management = aboutData?.management || {
    badge: "Управа",
    heading: "Управа Института",
    subtitle: "Искусни професионалци који воде наш институт",
    profiles: [],
  };

  const values = aboutData?.values || {
    badge: "Наше вредности",
    heading: "Оно у шта верујемо",
    subtitle: "Принципи који воде наш рад сваког дана",
    items: [],
  };

  const cta = aboutData?.cta || {
    heading: "Контактирајте нас данас",
    text: "Наш тим стручњака је спреман да вам пружи све потребне информације",
    buttons: [
      {
        _key: "1",
        text: "Контактирајте нас",
        href: "/kontakt",
        icon: "fas fa-phone",
        variant: "primary" as const,
      },
      {
        _key: "2",
        text: "Упознајте наш тим",
        href: "/tim",
        icon: "fas fa-user-md",
        variant: "secondary" as const,
      },
    ],
  };

  // Get image URLs
  const heroImageUrl = hero.image
    ? urlFor(hero.image).width(1920).url()
    : "/images/o_nama_image.png";

  // Transform profiles for ProfileTabs component
  const profilesForTabs = management.profiles.map((profile) => ({
    id: profile.id,
    icon: profile.icon,
    tabText: profile.tabText,
    image: profile.image ? urlFor(profile.image).width(400).url() : "",
    imageAlt: profile.name,
    name: profile.name,
    title: profile.title,
    bioTitle: profile.bioTitle,
    bioParagraphs: profile.bioParagraphs,
  }));

  return (
    <>
      <div className="institute-page">
        {/* Hero Section */}
        <HeroSection
          img={heroImageUrl}
          imgAlt={hero.badge}
          badge={hero.badge}
          title={hero.title}
          subtitle={hero.subtitle}
          showScrollIndicator={hero.showScrollIndicator}
        />

        {/* About Section */}
        <section className="institute-about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <Badge variant="primary" text={about.badge} />
                <Heading variant="h2" text={about.heading} />
                <Text variant="lead" text={about.leadText} />
                <Text variant="body" text={about.bodyText} />
              </div>
              <div className="about-image">
                <div className="about-highlights">
                  {about.highlights.map((highlight) => (
                    <HighlightItem
                      key={highlight._key}
                      icon={highlight.icon}
                      title={highlight.title}
                      description={highlight.description}
                    />
                  ))}
                </div>
                <div className="about-badge">
                  <Text as="span" className="badge-year" text={about.foundedYear} />
                  <Text as="span" className="badge-text" text="Основан" />
                </div>
              </div>
            </div>

            {/* Video Section - Full Width */}
            {about.videoSrc && (
              <div style={{ marginTop: "3rem", width: "100%" }}>
                <VideoPlayer
                  videoSrc={about.videoSrc}
                  overlayText={about.videoOverlayText}
                  caption={about.videoCaption}
                />
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        {statistics.stats.length > 0 && (
          <section className="institute-stats-section">
            <div className="container">
              <div className="stats-header">
                <Badge variant="primary" text={statistics.badge} />
                <Heading variant="h2" text={statistics.heading} />
                <Text text={statistics.subtitle} />
              </div>
              <div className="stats-grid-large">
                {statistics.stats.map((stat) => (
                  <StatCard
                    key={stat._key}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Management Section */}
        {profilesForTabs.length > 0 && (
          <section className="management-section">
            <div className="container">
              <div className="section-header-center">
                <Badge variant="primary" text={management.badge} />
                <Heading variant="h2" text={management.heading} />
                <Text text={management.subtitle} />
              </div>

              <ProfileTabs profiles={profilesForTabs} defaultTab={profilesForTabs[0]?.id} />
            </div>
          </section>
        )}

        {/* Values Section */}
        {values.items.length > 0 && (
          <section className="values-section">
            <div className="container">
              <div className="section-header-center">
                <Badge variant="primary" text={values.badge} />
                <Heading variant="h2" text={values.heading} />
                <Text text={values.subtitle} />
              </div>
              <div className="values-grid">
                {values.items.map((value) => (
                  <ValueCard
                    key={value._key}
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="institute-cta-section">
          <div className="container">
            <div className="cta-content">
              <Heading variant="h2" text={cta.heading} />
              <Text text={cta.text} />
              <div className="cta-buttons">
                {cta.buttons.map((button) => (
                  <Link
                    key={button._key}
                    href={button.href}
                    className={`btn-${button.variant}`}
                  >
                    <i className={button.icon}></i>
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
