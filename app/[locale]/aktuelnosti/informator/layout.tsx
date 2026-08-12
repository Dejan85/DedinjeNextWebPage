import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Информатор о раду | Актуелности | Институт Дедиње",
  description:
    "Информатор о раду Националног института за срце и крвне судове „Дедиње” — основни подаци, организација, прописи, буџет и услуге.",
};

export default function InformatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
