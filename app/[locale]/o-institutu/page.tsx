import type { ComponentProps } from "react";
import {
  PageHeader,
  StatCard,
  ProfileTabs,
  VideoPlayer,
  HighlightItem,
  ValueCard,
  Button,
  Container,
  Section,
} from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { AboutPage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

type ButtonVariant = NonNullable<ComponentProps<typeof Button>["variant"]>;

const BUTTON_VARIANTS = new Set<ButtonVariant>([
  "primary",
  "white",
  "outline-white",
  "hero",
  "secondary",
  "submit",
  "download",
  "download-small",
  "download-full",
  "outline",
  "card",
]);

function toButtonVariant(value: unknown): ButtonVariant {
  if (
    typeof value === "string" &&
    BUTTON_VARIANTS.has(value as ButtonVariant)
  ) {
    return value as ButtonVariant;
  }
  return "primary";
}

export default async function OInstitutu({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let aboutData: AboutPage | null = null;

  try {
    const raw = await client.fetch<AboutPage>(ABOUT_PAGE_QUERY);
    aboutData = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

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

  const profilesForTabs = management.profiles.map((profile) => {
    let profileImageUrl = "/images/logo dedinje.png";
    if (profile.image) {
      try {
        const generatedUrl = urlFor(profile.image)
          .width(800)
          .height(1000)
          .url();
        if (generatedUrl) {
          profileImageUrl = generatedUrl;
        }
      } catch (error) {
        console.error("Error generating profile image URL:", error);
      }
    }

    return {
      id: profile.id,
      icon: profile.icon,
      tabText: profile.tabText,
      image: profileImageUrl,
      imageAlt: profile.name,
      name: profile.name,
      title: profile.title,
      bioTitle: profile.bioTitle,
      bioParagraphs: profile.bioParagraphs,
    };
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О институту" },
        ]}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      {/* About Section */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeIcon}>
                  <i className="fas fa-hospital" aria-hidden />
                </span>
                {about.badge}
              </div>
              <h2 className={styles.aboutHeading}>{about.heading}</h2>
              <p className={styles.aboutLead}>{about.leadText}</p>
              <p className={styles.aboutBody}>{about.bodyText}</p>
            </div>

            <div className={styles.aboutSidebar}>
              <div className={styles.highlightsStack}>
                {about.highlights.map((highlight) => (
                  <HighlightItem
                    key={highlight._key}
                    icon={highlight.icon}
                    title={highlight.title}
                    description={highlight.description}
                  />
                ))}
              </div>
              <div className={styles.foundedBadge}>
                <span className={styles.foundedYear}>{about.foundedYear}</span>
                <span className={styles.foundedLabel}>Основан</span>
              </div>
            </div>
          </div>

          {about.videoSrc && (
            <div className={styles.videoWrap}>
              <VideoPlayer
                videoSrc={about.videoSrc}
                overlayText={about.videoOverlayText}
                caption={about.videoCaption}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Statistics Section */}
      {statistics.stats.length > 0 && (
        <Section padding="medium" background="gray">
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIconWrap}>
                <i className="fas fa-chart-column" aria-hidden />
              </span>
              <div>
                <h2>{statistics.heading}</h2>
                <p>{statistics.subtitle}</p>
              </div>
            </div>
            <div className={styles.statsGrid}>
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
          </Container>
        </Section>
      )}

      {/* Management Section */}
      {profilesForTabs.length > 0 && (
        <Section padding="medium" background="white">
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIconWrap}>
                <i className="fas fa-users-gear" aria-hidden />
              </span>
              <div>
                <h2>{management.heading}</h2>
                <p>{management.subtitle}</p>
              </div>
            </div>

            <ProfileTabs
              profiles={profilesForTabs}
              defaultTab={profilesForTabs[0]?.id}
            />
          </Container>
        </Section>
      )}

      {/* Values Section */}
      {values.items.length > 0 && (
        <section className={styles.valuesSection}>
          <Container>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesHeaderIcon}>
                <i className="fas fa-gem" aria-hidden />
              </div>
              <h2>{values.heading}</h2>
              <p>{values.subtitle}</p>
            </div>
            <div className={styles.valuesGrid}>
              {values.items.map((value) => (
                <ValueCard
                  key={value._key}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <h2>{cta.heading}</h2>
            <p>{cta.text}</p>
            <div className={styles.ctaButtons}>
              {cta.buttons.map((button) => (
                <Button
                  key={button._key}
                  href={button.href}
                  variant={toButtonVariant(button.variant)}
                >
                  {button.icon && <i className={button.icon}></i>}
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
