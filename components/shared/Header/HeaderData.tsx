import { client } from "@/sanity/lib/client";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import type { Navigation } from "@/sanity/types";
import Header from "./Header";

async function getNavigationData() {
  try {
    return await client.fetch<Navigation | null>(
      NAVIGATION_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    );
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

export default async function HeaderData() {
  const navigation = await getNavigationData();
  return <Header menu={navigation?.mainMenu} />;
}
