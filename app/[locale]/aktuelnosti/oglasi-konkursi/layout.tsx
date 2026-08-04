import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Огласи и конкурси | Актуелности | Институт Дедиње",
  description:
    "Отворене позиције, конкурси за запошљавање и јавне набавке Института за кардиоваскуларне болести Дедиње.",
};

export default function OglasiKonkursiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
