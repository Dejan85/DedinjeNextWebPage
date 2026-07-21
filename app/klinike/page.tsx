import {
  PageHeader,
  VideoPlayer,
  ClinicCard,
  ClinicCardGrid,
  Section,
  Container,
} from "@/components/shared";
import { metadata } from "./metadata";
import styles from "./page.module.css";

export { metadata };

export default async function KlinikePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Почетна", href: "/" }, { label: "Клинике" }]}
        title="Клинике института"
        subtitle="Савремене клинике опремљене најновијом медицинском технологијом, са тимом стручњака посвећених вашем здрављу и благостању"
      />

      {/* About */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutBadge}>
                <i className="fas fa-hospital" aria-hidden />
                <span>Ваш национални институт</span>
              </div>
              <h2 className={styles.aboutHeading}>
                Институт за срце и крвне судове
              </h2>
              <p className={styles.aboutLead}>
                Као водећа установа у дијагностици, лечењу и истраживању
                кардиоваскуларних обољења, Институт за кардиоваскуларне болести
                Дедиње пружа врхунску медицинску негу. Наш тим стручњака се бави
                срчаним и васкуларним проблемима користећи најсавременије
                дијагностичке методе и персонализоване терапије.
              </p>
              <p className={styles.aboutBody}>
                Наш тим стручњака, који се састоји од кардиохирурга, васкуларних
                хирурга и других медицинских стручњака, посвећен је вашем
                здрављу и добробити. Користећи најновију технологију у медицини,
                пружамо услуге које су у складу са међународним стандардима
                лечења. Безбедност и добробит наших пацијената су нам од
                највећег значаја.
              </p>
            </div>
            <div className={styles.aboutVideo}>
              <VideoPlayer
                videoSrc="/videos/klinike-video.mp4"
                overlayText="Погледајте видео о нашим клиникама"
                caption="Видео презентација клиника Института"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Clinics Grid */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-hospital-user" aria-hidden />
            </span>
            <div>
              <h2>Све клинике на једном месту</h2>
              <p>
                Изаберите клинику која вам је потребна и сазнајте више о
                услугама
              </p>
            </div>
          </div>

          <ClinicCardGrid>
            <ClinicCard
              icon="fas fa-heart-pulse"
              title="Клиника за кардиохирургију"
              subtitle="Оперативно лечење срчаних обољења"
              href="/klinike/kardiohirurgija"
            />
            <ClinicCard
              icon="fas fa-stethoscope"
              title="Клиника за васкуларну хирургију"
              subtitle="Лечење крвних судова"
              href="/klinike/vaskularna-hirurgija"
            />
            <ClinicCard
              icon="fas fa-syringe"
              title="Клиника за анестезију и интензивно лечење"
              subtitle="Анестезија и постоперативна нега"
              href="/klinike/anesteziologija"
            />
            <ClinicCard
              icon="fas fa-heartbeat"
              title="Инвазивна и интервентна кардиоваскуларна дијагностика и терапија"
              subtitle="Модерне дијагностичке методе"
              href="/klinike/invazivna-dijagnostika"
            />
            <ClinicCard
              icon="fas fa-wave-square"
              title="Одељење за електрофизиологију и електростимулацију"
              subtitle="Дијагностика и лечење поремећаја срчаног ритма"
              href="/klinike/elektrofiziologija"
            />
            <ClinicCard
              icon="fas fa-brain"
              title="Неурокардиолошка лабораторија"
              subtitle="Дијагностика криза свести и поремећаја аутономног нервног система"
              href="/klinike/neurokardioloska-laboratorija"
            />
            <ClinicCard
              icon="fas fa-heart-circle-check"
              title="Центар за урођене срчане мане код одраслих (ЦУСМО)"
              subtitle="Дијагностика и праћење одраслих са урођеним срчаним манама"
              href="/klinike/cusmo"
            />
            <ClinicCard
              icon="fas fa-heart"
              title="Одељење за неинвазивну дијагностику срца"
              subtitle="Ехокардиографија и структурне интервентне процедуре"
              href="/klinike/neinvazivna-dijagnostika-srca"
            />
            <ClinicCard
              icon="fas fa-heart-circle-check"
              title="Центар за срчану слабост"
              subtitle="Специјализована нега за срце"
              href="/klinike/centar-srcana-slabost"
            />
            <ClinicCard
              icon="fas fa-hospital"
              title="Поликлиника Института"
              subtitle="Амбулантне здравствене услуге"
              href="/klinike/poliklinika"
            />
            <ClinicCard
              icon="fas fa-microscope"
              title="Кабинет за клиничку патологију"
              subtitle="Патолошке анализе и дијагностика"
              href="/klinike/klinicka-patologija"
            />
            <ClinicCard
              icon="fas fa-heart"
              title="Клиника за кардиологију"
              subtitle="Дијагностика и лечење срца"
              href="/klinike/kardiologija"
            />
            <ClinicCard
              icon="fas fa-x-ray"
              title="Кардиоваскуларна компјутеризована дијагностика КВ КТ и КВ МР"
              subtitle="Напредне технологије дијагностике"
              href="/klinike/kv-dijagnostika"
            />
            <ClinicCard
              icon="fas fa-laptop-medical"
              title="Телемедицина"
              subtitle="Здравствене услуге на даљину"
              href="/klinike/telemedicina"
            />
            <ClinicCard
              icon="fas fa-graduation-cap"
              title="Едукација и превенција кардиоваскуларних болести"
              subtitle="Превентива и здравствена едукација"
              href="/klinike/edukacija-prevencija"
            />
            <ClinicCard
              icon="fas fa-dumbbell"
              title="Физикална медицина и рехабилитација"
              subtitle="Опоравак и рехабилитација"
              href="/klinike/fizikalna-medicina"
            />
            <ClinicCard
              icon="fas fa-person-walking"
              title="Центар за кардиоваскуларну рехабилитацију"
              subtitle="Прехабилитација, рана и амбулантна рехабилитација"
              href="/klinike/kardiovaskularna-rehabilitacija"
            />
            <ClinicCard
              icon="fas fa-pills"
              title="Аптека и медицинско снабдевање"
              subtitle="Лекови и медицинска средства"
              href="/klinike/apteka"
            />
            <ClinicCard
              icon="fas fa-flask"
              title="Лабораторијска дијагностика"
              subtitle="Лабораторијске анализе"
              href="/klinike/laboratorija"
            />
            <ClinicCard
              icon="fas fa-droplet"
              title="Болничка банка крви - трансфузија"
              subtitle="Трансфузиона медицина"
              href="/klinike/transfuzija"
            />
          </ClinicCardGrid>
        </Container>
      </Section>
    </>
  );
}
