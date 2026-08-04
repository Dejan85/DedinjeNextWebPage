import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SiteChrome from "@/components/shared/SiteChrome/SiteChrome";
import HeaderData from "@/components/shared/Header/HeaderData";
import Footer from "@/components/shared/Footer/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Omogućava generateStaticParams/prerendering za ovu rutu (next-intl zahtev).
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <SiteChrome header={<HeaderData />} footer={<Footer />}>
        {children}
      </SiteChrome>
    </NextIntlClientProvider>
  );
}
