import Image from "next/image";
import { Container, PageHeader, Section } from "@/components/shared";
import { Text } from "@/components/typography";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

const NIO_LINKS = [
  {
    label: "Одлука о научној акредитацији Института",
    href: "/pdf/odluka-akreditacija.pdf",
  },
  {
    label: "Извештај о Научноистраживачком раду за 2020.",
    href: "/pdf/izvestaj-nio-2020.pdf",
  },
  {
    label: "Извештај о Научноистраживачком раду за 2021.",
    href: "/pdf/izvestaj-nio-2021.pdf",
  },
  {
    label: "Извештај о Научноистраживачком раду за 2022.",
    href: "/pdf/izvestaj-nio-2022.pdf",
  },
  {
    label: "Извештај о Научноистраживачком раду за 2023.",
    href: "/pdf/izvestaj-nio-2023.pdf",
  },
];

export default function NioPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "NIO" },
        ]}
        title="NIO"
        subtitle="Научноистраживачки одсек Института за кардиоваскуларне болести Дедиње"
      />

      <Section padding="medium" background="gray">
        <Container>
          <div className="informacije-content">
            <div className="informacije-block">
              <Text
                variant="body"
                text="Вођен визијом о стварању здравствене установе која би равноправно егзистирала са водећим светским клиникама по броју и квалитету научних пројеката и публикација, по активном учешћу наших лекара на светски признатим конгресима и др. облицима едукације, директор Проф. др Милован Бојић, НС је 2020. године покренуо иницијативу добијања научне акредитације Института за кардиоваскуларне болести „Дедиње”."
              />
              <Text
                variant="body"
                text="Након процењивања испуњености критеријума о вредновању укупне научноистраживачке компетентности Института. Одбор за акредитацију научноистраживачких организација Министарства науке, технолошког развоја и иновација је доделило научну акредитацију Институту Одлуком бр 660-01-0007/2024-32 од 08.07.2025. године."
              />
            </div>

            <div className={styles.grid}>
              <div className={styles.image}>
                <Image
                  src="/images/nio-akreditacija.jpg"
                  alt="Научноистраживачки рад и технологија у Институту Дедиње"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
              <div>
                <ul className={styles.linksList}>
                  {NIO_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-chevron-right"></i>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
