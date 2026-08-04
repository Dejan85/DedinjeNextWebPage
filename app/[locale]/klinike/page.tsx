import {
  PageHeader,
  VideoPlayer,
  ClinicCard,
  ClinicCardGrid,
  Section,
  Container,
} from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { CLINICS_LIST_QUERY } from "@/sanity/lib/queries";
import type { ClinicPage as ClinicPageDoc } from "@/sanity/types";
import { metadata } from "./metadata";
import styles from "./page.module.css";

export { metadata };

const FALLBACK_CLINICS: { icon: string; title: string; subtitle: string; slug: string }[] = [
  { icon: "fas fa-heart-pulse", title: "Клиника за кардиохирургију", subtitle: "Оперативно лечење срчаних обољења", slug: "kardiohirurgija" },
  { icon: "fas fa-stethoscope", title: "Клиника за васкуларну хирургију", subtitle: "Лечење крвних судова", slug: "vaskularna-hirurgija" },
  { icon: "fas fa-syringe", title: "Клиника за анестезију и интензивно лечење", subtitle: "Анестезија и постоперативна нега", slug: "anesteziologija" },
  { icon: "fas fa-heartbeat", title: "Инвазивна и интервентна кардиоваскуларна дијагностика и терапија", subtitle: "Модерне дијагностичке методе", slug: "invazivna-dijagnostika" },
  { icon: "fas fa-wave-square", title: "Одељење за електрофизиологију и електростимулацију", subtitle: "Дијагностика и лечење поремећаја срчаног ритма", slug: "elektrofiziologija" },
  { icon: "fas fa-brain", title: "Неурокардиолошка лабораторија", subtitle: "Дијагностика криза свести и поремећаја аутономног нервног система", slug: "neurokardioloska-laboratorija" },
  { icon: "fas fa-heart-circle-check", title: "Центар за урођене срчане мане код одраслих (ЦУСМО)", subtitle: "Дијагностика и праћење одраслих са урођеним срчаним манама", slug: "cusmo" },
  { icon: "fas fa-heart", title: "Одељење за неинвазивну дијагностику срца", subtitle: "Ехокардиографија и структурне интервентне процедуре", slug: "neinvazivna-dijagnostika-srca" },
  { icon: "fas fa-heart-circle-check", title: "Центар за срчану слабост", subtitle: "Специјализована нега за срце", slug: "centar-srcana-slabost" },
  { icon: "fas fa-hospital", title: "Поликлиника Института", subtitle: "Амбулантне здравствене услуге", slug: "poliklinika" },
  { icon: "fas fa-microscope", title: "Кабинет за клиничку патологију", subtitle: "Патолошке анализе и дијагностика", slug: "klinicka-patologija" },
  { icon: "fas fa-heart", title: "Клиника за кардиологију", subtitle: "Дијагностика и лечење срца", slug: "kardiologija" },
  { icon: "fas fa-x-ray", title: "Кардиоваскуларна компјутеризована дијагностика КВ КТ и КВ МР", subtitle: "Напредне технологије дијагностике", slug: "kv-dijagnostika" },
  { icon: "fas fa-laptop-medical", title: "Телемедицина", subtitle: "Здравствене услуге на даљину", slug: "telemedicina" },
  { icon: "fas fa-graduation-cap", title: "Едукација и превенција кардиоваскуларних болести", subtitle: "Превентива и здравствена едукација", slug: "edukacija-prevencija" },
  { icon: "fas fa-dumbbell", title: "Физикална медицина и рехабилитација", subtitle: "Опоравак и рехабилитација", slug: "fizikalna-medicina" },
  { icon: "fas fa-person-walking", title: "Центар за кардиоваскуларну рехабилитацију", subtitle: "Прехабилитација, рана и амбулантна рехабилитација", slug: "kardiovaskularna-rehabilitacija" },
  { icon: "fas fa-pills", title: "Аптека и медицинско снабдевање", subtitle: "Лекови и медицинска средства", slug: "apteka" },
  { icon: "fas fa-flask", title: "Лабораторијска дијагностика", subtitle: "Лабораторијске анализе", slug: "laboratorija" },
  { icon: "fas fa-droplet", title: "Болничка банка крви - трансфузија", subtitle: "Трансфузиона медицина", slug: "transfuzija" },
];

export default async function KlinikePage() {
  let clinics: Pick<ClinicPageDoc, "title" | "subtitle" | "introIcon" | "slug">[] = [];

  try {
    clinics = await client.fetch(CLINICS_LIST_QUERY);
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const clinicCards = clinics.length > 0
    ? clinics.map((c) => ({ icon: c.introIcon, title: c.title, subtitle: c.subtitle, slug: c.slug.current }))
    : FALLBACK_CLINICS;

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
            {clinicCards.map((clinic) => (
              <ClinicCard
                key={clinic.slug}
                icon={clinic.icon}
                title={clinic.title}
                subtitle={clinic.subtitle}
                href={`/klinike/${clinic.slug}`}
              />
            ))}
          </ClinicCardGrid>
        </Container>
      </Section>
    </>
  );
}
