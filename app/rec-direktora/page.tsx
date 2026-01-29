import {
  HeroSection,
  VideoPlayer,
  InfoCard,
  PartnerLogo,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { DIRECTOR_PAGE_QUERY } from "@/sanity/lib/queries";
import type { DirectorPage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { generateMetadata } from "./metadata";

export { generateMetadata };

export default async function RecDirektoraPage() {
  // Fetch data from Sanity
  let directorData: DirectorPage | null = null;
  let sanityError = false;

  try {
    directorData = await client.fetch<DirectorPage>(DIRECTOR_PAGE_QUERY);
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
    sanityError = true;
  }

  // Fallback data ako Sanity ne radi
  const hero = directorData?.hero || {
    badge: "Директор Института",
    title: "Академик проф. др<br />Милован М. Бојић",
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

  // Get image URL if exists
  const heroImageUrl = hero.image
    ? urlFor(hero.image).width(1920).url()
    : "/images/rec-direktora.jpg";

  return (
    <>
      {/* Director Hero Section */}
      <HeroSection
        img={heroImageUrl}
        imgAlt={hero.badge}
        badge={hero.badge}
        title={hero.title}
        subtitle={hero.subtitle}
        showScrollIndicator={hero.showScrollIndicator}
      />

      {/* Director Info Cards */}
      <section className="director-info-section">
        <div className="container">
          <div className="director-info-grid">
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
        </div>
      </section>

      {/* Director Message Section */}
      <section className="director-message-section">
        <div className="container">
          <div className="director-message-grid">
            <div className="message-content">
              <Badge variant="primary" text={message.badge} />
              <Heading variant="h2" text={message.heading} />
              <div className="message-text">
                {message.paragraphs.map((para) => (
                  <Text
                    key={para._key}
                    variant={para.variant}
                    text={para.text}
                  />
                ))}
              </div>
              <div className="message-signature">
                <div className="signature-line"></div>
                <Text text={message.signature} />
              </div>
            </div>
            <div className="message-video">
              {message.videoSrc && (
                <VideoPlayer
                  videoSrc={message.videoSrc}
                  overlayText={message.videoOverlayText}
                  caption={message.videoCaption}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="director-quote-section">
        <div className="container">
          <div className="quote-wrapper">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <Text as="blockquote" text={quote.text} />
            <div className="quote-author">
              <div className="author-line"></div>
              <Text text={quote.author} />
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Certifications Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header centered">
            <Heading variant="h3" align="center" text={partners.heading} />
          </div>
          <div className="partners-slider">
            {partners.items.map((partner) => (
              <PartnerLogo
                key={partner._key}
                icon={partner.icon}
                text={partner.text}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
