import {
  Container,
  GradientCardGrid,
  LectureList,
  PageHeader,
  Section,
} from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const KME_CARDS = [
  {
    id: "lekar",
    title: "КМЕ – Лекари",
    icon: "fas fa-user-md",
    href: "/edukacija/kme-2024",
  },
  {
    id: "medicinske-sestre",
    title: "КМЕ – медицинске сестре/техничари",
    icon: "fas fa-user-nurse",
    href: "/edukacija/kme-2024/kme-medicinske-sestre-tehnicari",
  },
  {
    id: "arhiva",
    title: "КМЕ – Архива",
    icon: "fas fa-archive",
    href: "/edukacija/kme-2024",
  },
];

const RASPORED_PO_TEMAMA = [
  { title: "ЕЦМО – Екстракорпорална мембранска оксигенација", lecturer: "проф. др Миомир Јовић" },
  { title: "Хипертензија и физичка активност – да ли је могућа терапија без лекова?", lecturer: "проф. др Небојша Тасић" },
  { title: "Лечење аритмолошке олује", lecturer: "др Дејан Којић" },
  { title: "Контрола фактора ризика за исхемијски кардиоваскуларни догађај", lecturer: "асс. др сци. мед. др Срђан Бабић" },
  { title: "Вентрикуларна тахикардија (ВТ)", lecturer: "проф. др Петар Оташевић" },
  { title: "Клиничко-патохистолошки модалитети миокардитиса на обдукцијском материјалу", lecturer: "др Љубомир Ђоковић" },
  { title: "ЛВАД И ЕЦМО", lecturer: "Др Јелена Латковић – Др Љубомир Ђоковић" },
  { title: "Сепса и септички шок", lecturer: "Др Јована Иванчевић – Др Љ. Ђоковић, Др Д. Унић-Стојановић" },
  { title: "Хронични коронарни синдром", lecturer: "Др Маја Милошевић – Проф. др Петар Оташевић" },
  { title: "Преткоморске аритмије", lecturer: "Др Михаило Јовичић, Др Велибор Ристић" },
  { title: "Неоклузивна коронарна болест и микроциркулација", lecturer: "Др Стефан Тимчић, Проф. др Раде Бабић" },
  { title: "Клинички преглед и дијагностика васкуларних болести", lecturer: "Др Александар Бабић, Проф. др Ненад Илијевски" },
  { title: "Анеуризматска и периферна артеријска болест код поливаскуларног болесника", lecturer: "Др Игор Атанасијевић, Асс. др Предраг Матић" },
  { title: "ЦТ коронарографија", lecturer: "Др Тијана Рошул. Др Милица Брковић. Др Ковачевић" },
];

export default function Kme2024Page() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "KME 2024" },
        ]}
        title="KME 2024"
        subtitle="Континуирана медицинска едукација"
      />

      <Section padding="medium" background="gray">
        <Container>
          <GradientCardGrid
            items={KME_CARDS}
            className={styles.kmeCardsWrapper}
          />

          <div className="informacije-content">
            <div className="informacije-block">
              <Text
                variant="body"
                text={'Научно – истраживачки рад обухвата све клинике медицинског сектора Института, а координише га Служба за образовну делатност и стручно усавршавање.'}
              />

              <Heading variant="h3" text="У овој Служби се:" />
              <ul className="konzilijum-list">
                <li>планира надзире и евалуира израда научно-истраживачких и развојних пројеката</li>
                <li>координира припремање и објављивање стручних и научних радова</li>
                <li>планирају и координирају научни и технички послови у вези научно-истраживачког рада Института</li>
                <li>припремају општи акти који уређују научно-истраживачку делатност Института</li>
              </ul>

              <Text
                variant="body"
                text={'Континуирана медицинска едукација је део редовних активности Сектора за Научно-истраживачки рад Института.'}
              />
              <Text
                variant="body"
                text={'Усавршавање лекара и медицинских техничара је обавеза запослених и неопходна је како за унапређење квалитета рада тако и за обнављање лиценци за њихов рад.'}
              />

              <Heading variant="h3" text="У овом сектору се:" />
              <ul className="konzilijum-list">
                <li>Организују различити облици стручног и научног усавршавања</li>
                <li>Организују различити облици међународне сарадње</li>
                <li>Координира учешће на научним и стручним скуповима</li>
                <li>Прати и контролише спровођење обавезног лекарског, специјалистичког и субспецијалистичког стажа на Институту</li>
              </ul>

              <Heading variant="h2" text="Преглед завршених специјализација" />

              <Heading variant="h2" text="РАСПОРЕД ПО ТЕМАМА" />
              <LectureList
                items={RASPORED_PO_TEMAMA}
                showQuotes={false}
                className={styles.temaList}
              />

              <div className={styles.contactSection}>
                <Heading variant="h2" text="Контакт" />
                <div className={styles.contactBlock}>
                  <p><strong>Контакт особа</strong></p>
                  <p>Проф. Др Небојша Тасић</p>
                </div>
                <div className={styles.contactBlock}>
                  <p><strong>Телефон</strong></p>
                  <p><a href="tel:+381113601669">+(381) 11 360 1669</a></p>
                </div>
                <div className={styles.contactBlock}>
                  <p><strong>Е-маил</strong></p>
                  <p><a href="mailto:nic@yahoo.com">nic@yahoo.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
