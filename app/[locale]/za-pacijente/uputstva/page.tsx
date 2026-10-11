import { Container, PageHeader, Section } from "@/components/shared";
import { ProcedureDesc } from "../../klinike/_components/ClinicPageTemplate";
import clinicStyles from "../../klinike/_components/ClinicPageTemplate.module.css";
import { client } from "@/sanity/lib/client";
import { CLINIC_PATIENT_INSTRUCTIONS_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import { DATA as centarSrcanaSlabost } from "../../klinike/centar-srcana-slabost/data";
import { DATA as centarStrukturneBolestiSrca } from "../../klinike/centar-strukturne-bolesti-srca/data";
import { DATA as cusmo } from "../../klinike/cusmo/data";
import { DATA as elektrofiziologija } from "../../klinike/elektrofiziologija/data";
import { DATA as kardiologija } from "../../klinike/kardiologija/data";
import { DATA as kardiovaskularnaRehabilitacija } from "../../klinike/kardiovaskularna-rehabilitacija/data";
import { DATA as kvDijagnostika } from "../../klinike/kv-dijagnostika/data";
import { DATA as laboratorija } from "../../klinike/laboratorija/data";
import { DATA as neurokardioloskaLaboratorija } from "../../klinike/neurokardioloska-laboratorija/data";
import { DATA as poliklinika } from "../../klinike/poliklinika/data";
import { DATA as transfuzija } from "../../klinike/transfuzija/data";
import { DATA as vaskularnaHirurgija } from "../../klinike/vaskularna-hirurgija/data";
import type { ClinicPageData } from "../../klinike/_components/ClinicPageTemplate";
import { generateMetadata } from "./metadata";

export { generateMetadata };

interface InstructionEntry {
  slug: string;
  title: string;
  instructionsTitle: string;
  paragraphs: string[];
}

// Fallback kad Sanity nije dostupan — isti sadržaj kao na stranicama klinika.
const FALLBACK: [string, ClinicPageData][] = [
  ["centar-srcana-slabost", centarSrcanaSlabost],
  ["centar-strukturne-bolesti-srca", centarStrukturneBolestiSrca],
  ["cusmo", cusmo],
  ["elektrofiziologija", elektrofiziologija],
  ["kardiologija", kardiologija],
  ["kardiovaskularna-rehabilitacija", kardiovaskularnaRehabilitacija],
  ["kv-dijagnostika", kvDijagnostika],
  ["laboratorija", laboratorija],
  ["neurokardioloska-laboratorija", neurokardioloskaLaboratorija],
  ["poliklinika", poliklinika],
  ["transfuzija", transfuzija],
  ["vaskularna-hirurgija", vaskularnaHirurgija],
];

function fromData(): InstructionEntry[] {
  return FALLBACK.flatMap(([slug, d]) =>
    d.patientInstructions
      ? [{ slug, title: d.title, instructionsTitle: d.patientInstructions.title, paragraphs: d.patientInstructions.paragraphs }]
      : [],
  );
}

export default async function UputstvaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let entries: InstructionEntry[] = [];

  try {
    const raw = await client.fetch<
      { title: string; slug: string; patientInstructions: { title: string; paragraphs: string[] } }[]
    >(CLINIC_PATIENT_INSTRUCTIONS_QUERY);
    entries = localize(raw ?? [], locale as Locale).map((c) => ({
      slug: c.slug,
      title: c.title,
      instructionsTitle: c.patientInstructions.title,
      paragraphs: c.patientInstructions.paragraphs,
    }));
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  if (entries.length === 0) entries = fromData();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "За пацијенте", href: "/za-pacijente" },
          { label: "Упутства за пацијенте" },
        ]}
        title="Упутства за пацијенте"
        subtitle="Упутства за припрему и пријем пацијената по клиникама и одељењима"
      />

      {entries.map((entry, idx) => (
        <Section key={entry.slug} padding="medium" background={idx % 2 === 0 ? "white" : "gray"}>
          <Container>
            <div id={entry.slug} className={clinicStyles.instructionsBlock} style={{ scrollMarginTop: 120 }}>
              <h3>{entry.title}</h3>
              <h4>{entry.instructionsTitle}</h4>
              {entry.paragraphs.map((para, pIdx) => (
                <ProcedureDesc key={pIdx} text={para} />
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
