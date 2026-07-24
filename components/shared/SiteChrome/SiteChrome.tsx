"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";

export default function SiteChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      {footer}
    </>
  );
}
