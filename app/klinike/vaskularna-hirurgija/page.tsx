import {
  Button,
  Container,
  HeroSection,
  Image,
  Section,
} from "@/components/shared";
import { Badge, Heading, Text } from "@/components/typography";

export default function VaskularnaHirurgijaPage() {
  return (
    <>
      <div className="clinics-page">
        <HeroSection
          img="/images/vaskularna-hirurgija.png"
          imgAlt="Клиника за васкуларну хирургију"
          badge="Клиника"
          title="Клиника за васкуларну хирургију"
          subtitle="Дијагностика и хируршко лечење обољења артерија и вена, уз савремене протоколе, мултидисциплинарни тим и континуирано праћење."
          showScrollIndicator={true}
        />

        <section className="institute-about-section">
          <Container>
            <div className="about-grid">
              <div className="about-content">
                <Badge variant="primary" text="О клиници" />
                <Heading variant="h2" text="Лечење обољења крвних судова" />
                <Text
                  variant="lead"
                  text="Клиника за васкуларну хирургију пружа комплетну дијагностику и лечење обољења периферних крвних судова. Циљ је правовремено препознавање ризика, избор оптималне терапије и безбедан опоравак пацијента."
                />
                <Text
                  variant="body"
                  text="Ова страница је привремени садржај и биће допуњена конкретним програмима, процедурама и информацијама за пацијенте. До тада, можете нас контактирати за усмеравање и заказивање."
                />

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    marginTop: 28,
                  }}
                >
                  <Button variant="outline" href="/klinike">
                    <i className="fas fa-arrow-left"></i>
                    Назад на све клинике
                  </Button>
                </div>
              </div>

              <div className="about-image">
                <Image
                  src="/images/klinike-slika.jpg"
                  alt="Васкуларна хирургија"
                  width={1000}
                  height={700}
                />
                <div className="about-badge">
                  <Text as="span" className="badge-year" text="24/7" />
                  <Text as="span" className="badge-text" text="Дежурство" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section padding="medium" background="gray">
          <Container>
            <div className="section-header-center">
              <Badge variant="primary" text="Фокус" />
              <Heading variant="h2" text="Кључне области рада" />
              <Text text="Привремени преглед области које ће касније бити проширене и повезане са садржајем из CMS-а." />
            </div>

            <div className="stats-grid-large">
              <div className="stat-item">
                <div className="stat-value">
                  <i className="fas fa-shield-heart"></i>
                </div>
                <div className="stat-label">Превенција и процена ризика</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  <i className="fas fa-x-ray"></i>
                </div>
                <div className="stat-label">
                  Дијагностика и планирање лечења
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  <i className="fas fa-scalpel"></i>
                </div>
                <div className="stat-label">
                  Хируршке и ендоваскуларне процедуре
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  <i className="fas fa-person-walking"></i>
                </div>
                <div className="stat-label">
                  Постоперативни опоравак и праћење
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <section className="institute-cta-section">
          <Container>
            <div className="cta-content">
              <Heading
                variant="h2"
                text="Потребне су вам додатне информације?"
              />
              <Text text="Наш тим је спреман да одговори на питања и помогне вам око информација и заказивања." />
              <div className="cta-buttons">
                <Button variant="primary" href="/kontakt">
                  <i className="fas fa-phone"></i>
                  Контактирајте нас
                </Button>
                <Button variant="secondary" href="/o-institutu">
                  <i className="fas fa-info-circle"></i>О Институту
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
