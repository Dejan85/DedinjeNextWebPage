"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
