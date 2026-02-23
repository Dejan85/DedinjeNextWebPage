import { Container, PageHeader, Section } from "@/components/shared";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const DOKUMENTACIJA = [
  "Упут за специјалистички преглед (за болеснике ван Београда оверен од стране надлежног фонда здравственог осигурања)",
  "Могу бити упућени од стране интернисте (општег) и кардиолога",
  "Снимак коронарографије: пожељан је ЦД, уколико није могуће долази у обзир УСБ",
  "Налаз ултразвука срца (ТТЕ)",
  "Претходна медицинска документација: отпусно писмо установе где је рађена коронарографија, ехокардиографски налаз, МДЦТ налаз уколико га поседује",
  "ОБАВЕЗАН специјалистички извештај о САДАШЊЕМ клиничком стању болесника (ради стратификације ризика и одговарајућег временског оквира – тајминг лечења)",
  'Специјалистички извештај и/или отпусна листа везана за ДРУГА обољења од којих се болесник лечи, било да је хронични болесник или да се ради о акутном стању',
  "Обавезан је податак о могућим алергијама на неки лек",
  "Сва остала одговарајућа документација која би могла да утиче на доношење одлуке",
  "Пожељно је приложити скорији лабораторијски извештај ККС и основну биохемију",
  "Ро пулмо, очитан или на диску",
];

export default function KardiohirurskiKonzilijumPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Кардиохируршки конзилијум" },
        ]}
        title="Кардиохируршки конзилијум"
        subtitle="Тим за Срце – Институт Дедиње"
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-heart-pulse" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Опште информације</h2>
              <p>
                Кардиохируршки конзилијум представља Тим за Срце, јединствено
                тело Института Дедиње. Њега чине: кардиохирург, инвазивни
                кардиолог и клинички кардиолог свакодневно. Према потреби у
                његов проширени састав улазе: инвазивни радиолог, анестезиолог,
                васкуларни хирург, интензивиста и све остале специјалности за
                којима постоји у том тренутку потреба.
              </p>
              <p>
                Конзилијум се бави свакодневним доношењем одлука о начину лечења
                болесника који су већ хоспитализовани на нашем Институту и који
                долазе у наше амбуланте: кардиолошке, кардиохируршке, васкуларне,
                ехокардиографске, аритмолошке и ергометрију. Јединственост нашег
                Тима за Срце јесте да је отворен за доношење одлука на основу
                урађених процедура и у другим установама у целој Србији и ширем
                региону.
              </p>
            </div>
          </div>

          <div className={styles.coordinatorBanner}>
            <i className="fas fa-user-tie" aria-hidden />
            <span>
              Координатор рада конзилијума{" "}
              <strong>проф. др Александра Николић</strong>
            </span>
          </div>
        </Container>
      </Section>

      {/* Потребна документација */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-file-medical" aria-hidden />
            </span>
            <div>
              <h2>Потребна документација</h2>
              <p>Комплетна листа потребних докумената за Конзилијум</p>
            </div>
          </div>

          <p className={styles.docIntro}>
            Неопходно је доставити одговарајућу и комплетну документацију да
            би Конзилијум могао да донесе валидне и правилне одлуке о даљем
            начину лечења.
          </p>

          <div className={styles.checklistGrid}>
            {DOKUMENTACIJA.map((item, idx) => (
              <div key={idx} className={styles.checklistItem}>
                <span className={styles.checklistBullet}>
                  <i className="fas fa-check" aria-hidden />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className={styles.infoBanner}>
            <div className={styles.infoBannerIcon}>
              <i className="fas fa-circle-info" aria-hidden />
            </div>
            <div className={styles.infoBannerContent}>
              <strong>Рок за одлуку Конзилијума</strong>
              <p>
                Одлука Конзилијума у виду мишљења (у својој специфичној форми)
                доставља се болеснику у року од <strong>7 дана</strong>.
                Подизање документације обавља се на главном шалтеру Института.
              </p>
            </div>
          </div>

          <div className={styles.alertBanner}>
            <div className={styles.alertBannerIcon}>
              <i className="fas fa-triangle-exclamation" aria-hidden />
            </div>
            <div className={styles.alertBannerContent}>
              <strong>Додатна дијагностика</strong>
              <p>
                Често се дешава да је потребна додатна дијагностика, преглед
                или налаз који Конзилијум тражи ради доношења одлуке, те се
                документација доставља назад болеснику да се ураде додатне
                анализе. Потребно је спровести до краја тражене анализе и
                резултате, понекад у више наврата, све у циљу доношења правог
                мишљења о одлуци за даље лечење.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Радно време & Контакт */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-clock" aria-hidden />
            </span>
            <div>
              <h2>Радно време и контакт</h2>
              <p>Информације о предаји документације и контакту</p>
            </div>
          </div>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>
                <i className="fas fa-building" aria-hidden />
              </div>
              <h4>Место предаје</h4>
              <p>
                Документацију за Кардиохируршки конзилијум можете
                предати/подићи на <strong>главном шалтеру Института</strong>{" "}
                сваког радног дана.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>
                <i className="fas fa-clock" aria-hidden />
              </div>
              <h4>Подизање документације</h4>
              <p className={styles.timeHighlight}>11:00 – 13:00 часова</p>
              <p>сваког радног дана</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoCardIcon}>
                <i className="fas fa-phone" aria-hidden />
              </div>
              <h4>Call центар</h4>
              <p>
                <a href="tel:0113601700" className={styles.phoneLink}>
                  011 3601 700
                </a>
              </p>
              <p>Институт Дедиње</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
