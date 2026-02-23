import { AmbulanteAccordion, PageHeader } from "@/components/shared";
import type { AmbulantaItem } from "@/components/shared/AmbulanteAccordion/AmbulanteAccordion";
import { generateMetadata } from "./metadata";

export { generateMetadata };

const ELEKTROFIZIOLOSKE_ITEMS: AmbulantaItem[] = [
  {
    id: "aritmija-ablacija",
    title: "Шта је аритмија срца, шта је катетерска аблација, зашто се раде ове интервенције?",
    icon: "fas fa-heartbeat",
    sections: [
      {
        title: "Одговор",
        type: "text",
        content: "Садржај биће допуњен.",
      },
    ],
  },
  {
    id: "priprema",
    title: "Да ли постоји посебна припрема за овај преглед?",
    icon: "fas fa-clipboard-check",
    sections: [
      {
        title: "Одговор",
        type: "text",
        content: "Садржај биће допуњен.",
      },
    ],
  },
  {
    id: "prijem-pacijenta",
    title: "Како изгледа пријем пацијента и припрема за операцију?",
    icon: "fas fa-user-md",
    sections: [
      {
        title: "Одговор",
        type: "text",
        content: "Садржај биће допуњен.",
      },
    ],
  },
  {
    id: "izvodenje-intervencije",
    title: "Како се изводи ова интервенција?",
    icon: "fas fa-procedures",
    sections: [
      {
        title: "Одговор",
        type: "text",
        content: "Садржај биће допуњен.",
      },
    ],
  },
  {
    id: "komplikacije",
    title: "Да ли постоји могућност компликација током и након ове интервенције?",
    icon: "fas fa-exclamation-triangle",
    sections: [
      {
        title: "Одговор",
        type: "text",
        content: "Садржај биће допуњен.",
      },
    ],
  },
];

export default function ElektrofizioloskeProcedurePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Обавештење за електрофизиолошке процедуре" },
        ]}
        title="Обавештење за електрофизиолошке процедуре"
        subtitle="Информације о електрофизиолошким процедурама и катетерској аблацији"
      />

      <AmbulanteAccordion
        items={ELEKTROFIZIOLOSKE_ITEMS}
        title="Честа питања"
        subtitle="Изаберите питање и сазнајте више о електрофизиолошким процедурама"
        defaultOpenId="aritmija-ablacija"
      />
    </>
  );
}
