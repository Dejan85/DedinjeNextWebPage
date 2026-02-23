import type { Metadata } from "next";
import { VESTI } from "../constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vest = VESTI.find((v) => v.slug === slug);

  if (!vest) {
    return { title: "Вест није пронађена | Институт Дедиње" };
  }

  return {
    title: `${vest.title} | Актуелности | Институт Дедиње`,
    description: vest.excerpt,
  };
}
