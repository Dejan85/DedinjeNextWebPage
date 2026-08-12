import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Огласи и конкурси | Актуелности | Институт Дедиње",
  description:
    "Отворене позиције, конкурси за запошљавање и јавне набавке Националног института за срце и крвне судове „Дедиње”.",
};

export default function OglasiKonkursiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
