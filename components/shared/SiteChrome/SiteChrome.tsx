"use client";

import ScriptProvider from "../ScriptProvider/ScriptProvider";

// /studio (Sanity Studio) živi van [locale] segmenta (vidi proxy.ts
// matcher) i nikad se ne renderuje kroz ovaj wrapper, pa ne treba posebna
// provera rute ovde.
export default function SiteChrome({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <ScriptProvider>
      {header}
      {children}
      {footer}
    </ScriptProvider>
  );
}
