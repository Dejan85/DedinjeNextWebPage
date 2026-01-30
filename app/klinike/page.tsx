import Link from "next/link";
import {
  HeroSection,
  VideoPlayer,
  StatCard,
  InfoCard,
  ClinicCard,
} from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";

export default async function KlinikePage() {
  return (
    <>
      <div className="clinics-page">
        {/* Hero Section */}
        <HeroSection
          img="/images/klinike-slika.jpg"
          imgAlt="Клинике института"
          badge="Наше клинике"
          title="Клинике института"
          subtitle="Савремене клинике опремљене најновијом медицинском технологијом, са тимом стручњака посвећених вашем здрављу и благостању"
          showScrollIndicator={true}
        />

        {/* About Section */}
        <section className="institute-about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <Badge variant="primary" text="Ваш национални институт" />
                <Heading variant="h2" text="Институт за срце и крвне судове" />
                <Text
                  variant="lead"
                  text="Као водећа установа у дијагностици, лечењу и истраживању кардиоваскуларних обољења, Институт за кардиоваскуларне болести Дедиње пружа врхунску медицинску негу. Наш тим стручњака се бави срчаним и васкуларним проблемима користећи најсавременије дијагностичке методе и персонализоване терапије."
                />
                <Text
                  variant="body"
                  text="Наш тим стручњака, који се састоји од кардиохирурга, васкуларних хирурга и других медицинских стручњака, посвећен је вашем здрављу и добробити. Користећи најновију технологију у медицини, пружамо услуге које су у складу са међународним стандардима лечења. Безбедност и добробит наших пацијената су нам од највећег значаја."
                />
              </div>
              <div className="about-video">
                <VideoPlayer
                  videoSrc="/videos/klinike-video.mp4"
                  overlayText="Погледајте видео о нашим клиникама"
                  caption="Видео презентација клиника Института"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="institute-stats-section">
          <div className="container">
            <div className="stats-grid-large">
              <StatCard
                icon="fas fa-hospital"
                label="Специјализованих клиника"
                value="15"
                description="Све на једном месту"
              />
              <StatCard
                icon="fas fa-user-md"
                label="Стручњака"
                value="200+"
                description="Искусни лекари специјалисти"
              />
              <StatCard
                icon="fas fa-award"
                label="Година искуства"
                value="65+"
                description="Традиција изврсности"
              />
              <StatCard
                icon="fas fa-users"
                label="Пацијената годишње"
                value="50,000+"
                description="Задовољних пацијената"
              />
            </div>
          </div>
        </section> */}

        {/* Info Cards Section */}
        {/* <section className="clinics-info-section">
          <div className="container">
            <div className="section-header-center">
              <Badge variant="primary" text="Како можемо помоћи" />
              <Heading variant="h2" text="Услуге и могућности" />
              <Text text="Од дијагностике до оперативних захвата - све на једном месту" />
            </div>
            <div className="info-cards-grid">
              <InfoCard
                icon="fas fa-calendar-check"
                title="Заказивање прегледа"
                description="Једноставно закажите преглед телефоном или онлајн и избегните дуго чекање"
                buttonText="Закажите преглед"
                buttonHref="/kontakt"
                highlight={true}
              />
              <InfoCard
                icon="fas fa-clock"
                title="24/7 Хитна служба"
                description="Наша хитна служба је доступна 24 сата дневно, 7 дана у недељи"
                buttonText="Сазнајте више"
                buttonHref="/kontakt"
                highlight={false}
              />
              <InfoCard
                icon="fas fa-user-md"
                title="Специјализоване услуге"
                description="Комплетна здравствена заштита од дијагностике до рехабилитације"
                buttonText="Погледајте услуге"
                buttonHref="#klinike"
                highlight={false}
              />
            </div>
          </div>
        </section> */}

        {/* Clinics Grid Section */}
        <section className="clinics-modern-section">
          <div className="container">
            <div className="section-header-center">
              <Badge variant="primary" text="Наше клинике" />
              <Heading variant="h2" text="Све клинике на једном месту" />
              <Text text="Изаберите клинику која вам је потребна и сазнајте више о услугама" />
            </div>

            <div className="clinics-cards-grid">
              <ClinicCard
                icon="fas fa-heart-pulse"
                title="Клиника за кардиохирургију"
                subtitle="Оперативно лечење срчаних обољења"
                href="#"
              />

              <ClinicCard
                icon="fas fa-stethoscope"
                title="Клиника за васкуларну хирургију"
                subtitle="Лечење крвних судова"
                href="#"
              />

              <ClinicCard
                icon="fas fa-syringe"
                title="Клиника за анестезију и интензивно лечење"
                subtitle="Анестезија и постоперативна нега"
                href="#"
              />

              <ClinicCard
                icon="fas fa-heartbeat"
                title="Инвазивна и интервентна кардиоваскуларна дијагностика и терапија"
                subtitle="Модерне дијагностичке методе"
                href="#"
              />

              <ClinicCard
                icon="fas fa-heart-circle-check"
                title="Центар за срчану слабост"
                subtitle="Специјализована нега за срце"
                href="#"
              />

              <ClinicCard
                icon="fas fa-hospital"
                title="Поликлиника Института"
                subtitle="Амбулантне здравствене услуге"
                href="#"
              />

              <ClinicCard
                icon="fas fa-microscope"
                title="Кабинет за клиничку патологију"
                subtitle="Патолошке анализе и дијагностика"
                href="#"
              />

              <ClinicCard
                icon="fas fa-heart"
                title="Клиника за кардиологију"
                subtitle="Дијагностика и лечење срца"
                href="#"
              />

              <ClinicCard
                icon="fas fa-x-ray"
                title="Кардиоваскуларна компјутеризована дијагностика КВ КТ и КВ МР"
                subtitle="Напредне технологије дијагностике"
                href="#"
              />

              <ClinicCard
                icon="fas fa-laptop-medical"
                title="Телемедицина"
                subtitle="Здравствене услуге на даљину"
                href="#"
              />

              <ClinicCard
                icon="fas fa-graduation-cap"
                title="Едукација и превенција кардиоваскуларних болести"
                subtitle="Превентива и здравствена едукација"
                href="#"
              />

              <ClinicCard
                icon="fas fa-dumbbell"
                title="Физикална медицина и рехабилитација"
                subtitle="Опоравак и рехабилитација"
                href="#"
              />

              <ClinicCard
                icon="fas fa-pills"
                title="Аптека и медицинско снабдевање"
                subtitle="Лекови и медицинска средства"
                href="#"
              />

              <ClinicCard
                icon="fas fa-flask"
                title="Лабораторијска дијагностика"
                subtitle="Лабораторијске анализе"
                href="#"
              />

              <ClinicCard
                icon="fas fa-droplet"
                title="Болничка банка крви - трансфузија"
                subtitle="Трансфузиона медицина"
                href="#"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="institute-cta-section">
          <div className="container">
            <div className="cta-content">
              <Heading
                variant="h2"
                text="Потребне су вам додатне информације?"
              />
              <Text text="Наш тим стручњака је спреман да одговори на сва ваша питања и помогне вам да пронађете одговарајућу клинику за ваше потребе" />
              <div className="cta-buttons">
                <Link href="/kontakt" className="btn-primary">
                  <i className="fas fa-phone"></i>
                  Контактирајте нас
                </Link>
                <Link href="/o-institutu" className="btn-secondary">
                  <i className="fas fa-info-circle"></i>О Институту
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
