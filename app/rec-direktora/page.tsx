"use client";

import {
  Header,
  Footer,
  ScrollToTop,
  HeroSection,
  VideoPlayer,
  InfoCard,
  PartnerLogo,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";

export default function RecDirektoraPage() {
  return (
    <>
      <Header />
      {/* Director Hero Section */}
      <HeroSection
        img="/images/rec-direktora.jpg"
        imgAlt="Директор Института"
        badge="Директор Института"
        title="Академик проф. др<br />Милован М. Бојић"
        subtitle='Директор Института за кардиоваскуларне болести "Дедиње"'
        showScrollIndicator={true}
      />

      {/* Director Info Cards */}
      <section className="director-info-section">
        <div className="container">
          <div className="director-info-grid">
            <InfoCard
              icon="fas fa-user-graduate"
              title="Биографија"
              description="Упознајте се са каријером и достигнућима нашег директора"
              buttonText="Прочитајте више"
              buttonHref="/biografija"
            />
            <InfoCard
              icon="fas fa-book-open"
              title="Библиографија"
              description="Преглед научних радова и публикација"
              buttonText="Погледајте"
              buttonHref="/bibliografija"
            />
            <InfoCard
              icon="fas fa-award"
              title="Достигнућа"
              description="Награде и признања у области кардиоваскуларне медицине"
              buttonText="Сазнајте више"
              buttonHref="/dostignuca"
              highlight={true}
            />
          </div>
        </div>
      </section>

      {/* Director Message Section */}
      <section className="director-message-section">
        <div className="container">
          <div className="director-message-grid">
            <div className="message-content">
              <Badge variant="primary" text="Реч директора" />
              <Heading
                variant="h2"
                text="Посвећеност изврсности у кардиоваскуларној медицини"
              />
              <div className="message-text">
                <Text
                  variant="lead"
                  text="Обољења срца и крвних судова представљају најчешћи узрок обољевања и умирања у данашње време. Ово има огроман утицај на све области нашег живота у социјалном, психолошком, организационом, а поготову финансијском смислу."
                />

                <Text
                  variant="body"
                  text="Наша обавеза је да обезбедимо врхунску услугу у домену кардиоваскуларне медицине уопште, а конкретно у области модерне кардиохируршке праксе. Ефикасне, квалитетне, у кратком року изведене кардиохируршке процедуре без значајних компликација, омогућавају да се болесници брзо и успешно опораве након операције и у кратком временском интервалу врате свом уобичајеном начину живота и професионалним активностима, чиме обезбеђују егзистенцију себи и својој породици."
                />

                <Text
                  variant="body"
                  text="Наша Клиника обезбеђује потпуно заокружен систем ефикасне дијагностике, лечења и постоперативног опоравка за болеснике којима је потребна кардиохируршка интервенција."
                />
              </div>
              <div className="message-signature">
                <div className="signature-line"></div>
                <Text text="Академик проф. др Милован М. Бојић" />
              </div>
            </div>
            <div className="message-video">
              <VideoPlayer
                videoSrc="/videos/rec-direktora.mp4"
                overlayText="Погледајте видео поруку"
                caption="Видео порука директора о визији и мисији Института"
              />
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
            <Text
              as="blockquote"
              text="Наша посвећеност је да сваком пацијенту пружимо најбољу могућу негу, користећи најсавременије методе и технологије у кардиоваскуларној медицини."
            />
            <div className="quote-author">
              <div className="author-line"></div>
              <Text text="Академик проф. др Милован М. Бојић" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Certifications Section */}
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
            <PartnerLogo icon="fas fa-hospital" text="ISO 9001" />
            <PartnerLogo icon="fas fa-certificate" text="JCI Акредитација" />
            <PartnerLogo icon="fas fa-award" text="Европски стандарди" />
            <PartnerLogo icon="fas fa-shield-alt" text="Здравствена заштита" />
            <PartnerLogo icon="fas fa-heart" text="Кардио центар" />
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </>
  );
}
