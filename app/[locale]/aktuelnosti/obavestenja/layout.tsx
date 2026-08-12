import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обавештења | Актуелности | Институт Дедиње",
  description:
    "Званична обавештења Националног института за срце и крвне судове „Дедиње” за пацијенте, запослене и јавност.",
};

export default function ObavestenjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
