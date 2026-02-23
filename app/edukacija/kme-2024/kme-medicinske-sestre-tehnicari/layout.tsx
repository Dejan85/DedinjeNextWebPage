import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "КМЕ – медицинске сестре/техничари | KME 2024 | Институт Дедиње",
  description:
    "Континуирана медицинска едукација за медицинске сестре и техничаре Института за кардиоваскуларне болести Дедиње.",
};

export default function KmeMedicinskeSestreTehnicariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
