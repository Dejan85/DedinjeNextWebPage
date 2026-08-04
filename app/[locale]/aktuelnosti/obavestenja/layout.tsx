import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обавештења | Актуелности | Институт Дедиње",
  description:
    "Званична обавештења Института за кардиоваскуларне болести Дедиње за пацијенте, запослене и јавност.",
};

export default function ObavestenjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
