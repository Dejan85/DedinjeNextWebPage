import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NIO | Наука и истраживање | Институт Дедиње",
  description:
    "Научноистраживачки одсек (NIO) Института за кардиоваскуларне болести Дедиње – научни рад и истраживања у области кардиоваскуларне медицине.",
};

export default function NioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
