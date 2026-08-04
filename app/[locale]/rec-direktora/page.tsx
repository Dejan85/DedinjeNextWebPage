import {
  PageHeader,
  VideoPlayer,
  InfoCard,
  Section,
  Container,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { DIRECTOR_PAGE_QUERY } from "@/sanity/lib/queries";
import type { DirectorPage } from "@/sanity/types";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default async function RecDirektoraPage() {
  let directorData: DirectorPage | null = null;

  try {
    directorData = await client.fetch<DirectorPage>(DIRECTOR_PAGE_QUERY);
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const hero = directorData?.hero || {
    badge: "Директор Института",
    title: "Академик проф. др Милован М. Бојић",
    subtitle: 'Директор Института за кардиоваскуларне болести "Дедиње"',
    showScrollIndicator: true,
  };

  const infoCards = directorData?.infoCards || [
    {
      _key: "1",
      icon: "fas fa-user-graduate",
      title: "Биографија",
      description: "Упознајте се са каријером и достигнућима нашег директора",
      buttonText: "Прочитајте више",
      buttonHref: "/biografija",
      highlight: false,
    },
    {
      _key: "2",
      icon: "fas fa-book-open",
      title: "Библиографија",
      description: "Преглед научних радова и публикација",
      buttonText: "Погледајте",
      buttonHref: "/bibliografija",
      highlight: false,
    },
    {
      _key: "3",
      icon: "fas fa-award",
      title: "Достигнућа",
      description: "Награде и признања у области кардиоваскуларне медицине",
      buttonText: "Сазнајте више",
      buttonHref: "/dostignuca",
      highlight: true,
    },
  ];

  const message = directorData?.message || {
    badge: "Реч директора",
    heading: "Посвећеност изврсности у кардиоваскуларној медицини",
    paragraphs: [
      {
        _key: "1",
        variant: "lead" as const,
        text: "Обољења срца и крвних судова представљају најчешћи узрок обољевања и умирања у данашње време. Ово има огроман утицај на све области нашег живота у социјалном, психолошком, организационом, а поготову финансијском смислу.",
      },
      {
        _key: "2",
        variant: "body" as const,
        text: "Наша обавеза је да обезбедимо врхунску услугу у домену кардиоваскуларне медицине уопште, а конкретно у области модерне кардиохируршке праксе. Ефикасне, квалитетне, у кратком року изведене кардиохируршке процедуре без значајних компликација, омогућавају да се болесници брзо и успешно опораве након операције и у кратком временском интервалу врате свом уобичајеном начину живота и професионалним активностима, чиме обезбеђују егзистенцију себи и својој породици.",
      },
      {
        _key: "3",
        variant: "body" as const,
        text: "Наша Клиника обезбеђује потпуно заокружен систем ефикасне дијагностике, лечења и постоперативног опоравка за болеснике којима је потребна кардиохируршка интервенција.",
      },
    ],
    signature: "Академик проф. др Милован М. Бојић",
    videoSrc: "/videos/rec-direktora.mp4",
    videoOverlayText: "Погледајте видео поруку",
    videoCaption: "Видео порука директора о визији и мисији Института",
  };

  const quote = directorData?.quote || {
    text: "Наша посвећеност је да сваком пацијенту пружимо најбољу могућу негу, користећи најсавременије методе и технологије у кардиоваскуларној медицини.",
    author: "Академик проф. др Милован М. Бојић",
  };

  const partners = directorData?.partners || {
    heading: "Сертификати и партнерства",
    items: [
      { _key: "1", icon: "fas fa-hospital", text: "ISO 9001" },
      { _key: "2", icon: "fas fa-certificate", text: "JCI Акредитација" },
      { _key: "3", icon: "fas fa-award", text: "Европски стандарди" },
      { _key: "4", icon: "fas fa-shield-alt", text: "Здравствена заштита" },
      { _key: "5", icon: "fas fa-heart", text: "Кардио центар" },
    ],
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Реч директора" },
        ]}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      {/* Info Cards */}
      <Section
        padding="medium"
        background="gray"
        className={styles.infoSection}
      >
        <Container>
          <div className={styles.infoGrid}>
            {infoCards.map((card) => (
              <InfoCard
                key={card._key}
                icon={card.icon}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonHref={card.buttonHref}
                highlight={card.highlight}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Message Section */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.messageSection}>
            <div className={styles.messageContent}>
              <div className={styles.messageBadge}>
                <i className="fas fa-quote-left" aria-hidden />
                <span>{message.badge}</span>
              </div>
              <h2 className={styles.messageHeading}>{message.heading}</h2>
              <div className={styles.messageText}>
                {message.paragraphs.map((para, idx) => (
                  <p
                    key={para._key}
                    className={idx === 0 ? styles.leadText : undefined}
                  >
                    {para.text}
                  </p>
                ))}
              </div>
              <div className={styles.signature}>
                <div className={styles.signatureLine} />
                <p>{message.signature}</p>
              </div>
            </div>
            <div className={styles.messageVideo}>
              {message.videoSrc && (
                <VideoPlayer
                  videoSrc={message.videoSrc}
                  overlayText={message.videoOverlayText}
                  caption={message.videoCaption}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <Container>
          <div className={styles.quoteWrapper}>
            <div className={styles.quoteIcon}>
              <i className="fas fa-quote-left" aria-hidden />
            </div>
            <blockquote className={styles.quoteText}>{quote.text}</blockquote>
            <div className={styles.quoteAuthor}>
              <div className={styles.quoteAuthorLine} />
              <p>{quote.author}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partners */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.partnersHeader}>
            <h3>{partners.heading}</h3>
          </div>
          <div className={styles.partnersGrid}>
            {partners.items.map((partner) => (
              <div key={partner._key} className={styles.partnerCard}>
                <div className={styles.partnerIcon}>
                  <i className={partner.icon} aria-hidden />
                </div>
                <span>{partner.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
