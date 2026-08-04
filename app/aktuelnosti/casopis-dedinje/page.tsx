import { client } from "@/sanity/lib/client";
import { MAGAZINE_ISSUES_QUERY } from "@/sanity/lib/queries";
import type { MagazineIssue } from "@/sanity/types";
import CasopisDedinjeClient, { type IzdanjeItem } from "./CasopisDedinjeClient";

const IZDANJA_FALLBACK: IzdanjeItem[] = [
  {
    id: "vol12-1",
    volume: "12",
    number: "1",
    year: "2025",
    title: "Кардиоваскуларна хирургија и интервентна кардиологија",
    topics: ["Минимално инвазивна кардиохирургија", "ТАВИ процедуре", "Хибридне операције"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#1a365d",
  },
  {
    id: "vol11-2",
    volume: "11",
    number: "2",
    year: "2024",
    title: "Ехокардиографија и имиџинг",
    topics: ["3D ехокардиографија", "Стрес ехо протоколи", "Кардио МР"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#1a5632",
  },
  {
    id: "vol11-1",
    volume: "11",
    number: "1",
    year: "2024",
    title: "Васкуларна хирургија и ангиологија",
    topics: ["Каротидна хирургија", "Ендоваскуларне процедуре", "Васкуларни ултразвук"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#56340a",
  },
  {
    id: "vol10-2",
    volume: "10",
    number: "2",
    year: "2023",
    title: "Аритмологија и електрофизиологија",
    topics: ["Катетерска аблација", "Имплантација пејсмејкера", "Атријална фибрилација"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#4a1942",
  },
  {
    id: "vol10-1",
    volume: "10",
    number: "1",
    year: "2023",
    title: "Кардиолошка рехабилитација",
    topics: ["Постоперативна рехабилитација", "Физикална терапија", "Психолошка подршка"],
    pdfUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
    coverColor: "#1a365d",
  },
  {
    id: "vol9-2",
    volume: "9",
    number: "2",
    year: "2022",
    title: "Превенција кардиоваскуларних болести",
    topics: ["Хипертензија", "Дислипидемија", "Програми превенције"],
    pdfUrl: "/pdf/РАДОВИ-ДИРЕКТОРА-avgust-2025.pdf",
    coverColor: "#1a5632",
  },
];

async function getIzdanja(): Promise<IzdanjeItem[]> {
  try {
    const items = await client.fetch<MagazineIssue[]>(MAGAZINE_ISSUES_QUERY);
    if (items && items.length > 0) {
      return items.map((izd) => ({
        id: izd._id,
        volume: izd.volume || "",
        number: izd.number || "",
        year: izd.year || "",
        title: izd.title,
        topics: izd.topics || [],
        pdfUrl: izd.pdfUrl || "#",
        coverColor: izd.coverColor || "#1a365d",
      }));
    }
  } catch (error) {
    console.error("Error fetching časopis izdanja:", error);
  }
  return IZDANJA_FALLBACK;
}

export default async function CasopisDedinjePage() {
  const items = await getIzdanja();
  return <CasopisDedinjeClient items={items} />;
}
