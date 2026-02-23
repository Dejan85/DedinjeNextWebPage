import { Container, PageHeader, Section } from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default function InformacijeOStanjuPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Информације о здравственом стању пацијента" },
        ]}
        title="Информације о здравственом стању пацијента"
        subtitle="Информације за најближе члановe породице хоспитализованих пацијената"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-notice">
              <p>ИНФОРМАЦИЈЕ СЕ ОДНОСЕ САМО НА ХОСПИТАЛИЗОВАНЕ ПАЦИЈЕНТЕ</p>
            </div>

            <div className="informacije-block">
              <Text
                variant="body"
                text="За пацијенте који се хитно оперишу, најближи чланови породице могу доћи и добити информације лично од лекара сваког дана у 12 часова."
              />
              <Text
                variant="body"
                text="За дуголежеће пацијенте, информације се могу добити лично уз претходни договор са лекарима који воде пацијента, у термину договореном са надлежним медицинским особљем."
              />
            </div>

            <div className="informacije-block">
              <Text
                variant="body"
                text="Информације путем телефона о стању здравља пацијента током стационарног лечења, на Институту за кардиоваскуларне болести „Дедиње“ могу добити најближи чланови породице (особе које је пацијент навео при отварању Историје болести као особе које могу бити обавештене о његовом току болести и здравственом стању)."
              />
            </div>

            <div className="informacije-highlight">
              <p>ИНФОРМАЦИЈЕ ИСКЉУЧИВО ПРУЖАЈУ ЛЕКАРИ.</p>
            </div>

            <div className="informacije-block">
              <Text
                variant="body"
                text="Уколико је телефон тренутно заузет, молимо вас за разумевање и стрпљење. Наш тим је посвећен пружању најбоље могуће услуге свим нашим пацијентима и њиховим породицама, и трудимо се да одговоримо на све позиве у најкраћем могућем року."
              />
            </div>

            <div className={styles.telSection}>
              <Heading variant="h2" text="Кардиохируршки пацијенти" />
              <div className={styles.telBlock}>
                <p><strong>Одељење преоперативне припреме кардиохирургије</strong> (пре операције)</p>
                <p><a href="tel:0113601819">011/3601-819</a> – у термину 12.00 – 13.00 часова</p>
              </div>
              <div className={styles.telBlock}>
                <p><strong>Клиника за анестезију и интензивно лечење</strong> (након операције)</p>
                <p><a href="tel:0113601784">011/3601-784</a> – у термину 12.30 – 13.30 часова и 20.00 – 20.30 часова за пацијенте оперисане тог дана</p>
              </div>
              <div className={styles.telBlock}>
                <p><strong>Одељење за постоперативно лечење</strong> (након преласка из интензивне неге)</p>
                <p><a href="tel:0113601792">011/3601-792</a> или <a href="tel:0113601796">011/3601-796</a> – у термину 13.00 – 13.30 часова</p>
              </div>
            </div>

            <div className={styles.telSection}>
              <Heading variant="h2" text="Васкуларни пацијенти" />
              <div className={styles.telBlock}>
                <p><strong>Клиника за анестезију и интензивно лечење</strong> (након операције)</p>
                <p><a href="tel:0113601784">011/3601-784</a> – у термину 12.30 – 13.30 часова и 20.00 – 20.30 часова за болеснике оперисане тог дана</p>
              </div>
              <div className={styles.telBlock}>
                <p><strong>Клиника за васкуларну хирургију</strong></p>
                <p><a href="tel:0113601705">011/3601-705</a> – у термину 12.00 – 13.00 часова</p>
              </div>
            </div>

            <div className={styles.telSection}>
              <Heading variant="h2" text="Кардиолошки пацијенти" />
              <div className={styles.telBlock}>
                <p><strong>Клиника за кардиологију</strong></p>
                <p><a href="tel:0113601707">011/3601-707</a>, <a href="tel:0113601709">011/3601-709</a> (коронарна јединица) – у термину 12.00 – 13.00 часова</p>
              </div>
            </div>

            <div className={`informacije-block ${styles.delivery}`}>
              <Heading variant="h2" text="Достава ствари" />
              <Text
                variant="body"
                text="Уколико желите да доставите нешто од ствари хоспитализованом пацијенту време предвиђено за доставу је од 14 до 16 часова."
              />
              <Text
                variant="body"
                text="За пацијенте који леже на: одељењима кардиологије, васкуларне хирургије и интензивне неге васкуларне хирургије, ствари можете оставити на портирници зграде „Дедиње 1“ – средњи улаз."
              />
              <Text
                variant="body"
                text="За пацијенте који леже на: одељењу преоперативне припреме, постоперативне неге и интензивне неге кардиохирургије ствари можете оставити на портирници зграде „Дедиње 2“ – главни улаз."
              />
              <Text
                variant="body"
                text="Изузетак је уколико постоји потреба за доставом неких лекова или медицинске документације које можете доставити и ван горе наведеног времена."
              />
              <p className={styles.warning}>Строго је забрањена достава унапред припремљене хране.</p>
              <Text
                variant="body"
                text="Болничарке са одељења где је потребно доставити ствари силазе по исте, након обавештења од стране портира о пристизању ствари или докумената."
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
