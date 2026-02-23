import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Часопис Дедиње | Актуелности | Институт Дедиње",
  description:
    "Стручни часопис Института Дедиње са научним и клиничким радовима из области кардиоваскуларне медицине.",
};

export default function CasopisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
