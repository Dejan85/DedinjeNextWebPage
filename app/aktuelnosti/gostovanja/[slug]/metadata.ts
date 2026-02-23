import type { Metadata } from "next";
import { GOSTOVANJA } from "../constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gostovanje = GOSTOVANJA.find((g) => g.slug === slug);

  if (!gostovanje) {
    return {
      title: "Гостовање није пронађено | Институт Дедиње",
    };
  }

  return {
    title: `${gostovanje.title} | Гостовања | Институт Дедиње`,
    description: gostovanje.description,
  };
}
