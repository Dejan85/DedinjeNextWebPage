"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useScript } from "../ScriptProvider/ScriptProvider";
import styles from "./LanguageSwitch.module.css";

// Koristimo "sirov" next/navigation pathname (uključuje /en prefiks kad
// postoji) i ručno gradimo href za oba locale-a odjednom.
//
// Tri opcije, jedan kontrol: engleski (next-intl locale), srpski ćirilica
// i srpski latinica (isti sr locale, samo lokalni "script" preference iz
// ScriptProvider-a). Ćirilica/latinica postoje samo za srpski — engleski
// nema tu varijantu, pa se biranjem srpske opcije uvek i navigira na sr.
export default function LanguageSwitch({
  locale,
  variant = "pill",
}: {
  locale: "sr" | "en";
  variant?: "pill" | "dropdown";
}) {
  const t = useTranslations("LanguageSwitch");
  const { script, setScript } = useScript();
  const pathname = usePathname() || "/";
  const pathWithoutLocale = pathname.startsWith("/en")
    ? pathname.slice(3) || "/"
    : pathname;

  const srHref = pathWithoutLocale;
  const enHref =
    pathWithoutLocale === "/" ? "/en" : `/en${pathWithoutLocale}`;

  const isCyr = locale === "sr" && script === "cyr";
  const isLat = locale === "sr" && script === "lat";
  const isEn = locale === "en";

  const currentLabel = isEn ? "ENG" : isCyr ? "ЋИР" : "LAT";

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Klik-kontrolisan dropdown (ne hover-CSS) — pouzdaniji na touch uređajima
  // i izbegava "dead zone" iznad menija gde miš gubi hover pre klika.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "dropdown") {
    return (
      <div className={styles.dropdown} ref={containerRef} data-no-translit>
        <button
          type="button"
          className={styles.ddCurrent}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {currentLabel}
          <i className="fas fa-chevron-down" aria-hidden="true" />
        </button>
        <div
          className={`${styles.ddMenu} ${open ? styles.ddOpen : ""}`}
          role="group"
          aria-label={t("ariaLabel")}
        >
          <Link
            href={enHref}
            onClick={() => setOpen(false)}
            className={isEn ? styles.ddActive : undefined}
            aria-current={isEn ? "true" : undefined}
          >
            English
          </Link>
          <Link
            href={srHref}
            onClick={() => {
              setScript("cyr");
              setOpen(false);
            }}
            className={isCyr ? styles.ddActive : undefined}
            aria-current={isCyr ? "true" : undefined}
          >
            Српски (ћирилица)
          </Link>
          <Link
            href={srHref}
            onClick={() => {
              setScript("lat");
              setOpen(false);
            }}
            className={isLat ? styles.ddActive : undefined}
            aria-current={isLat ? "true" : undefined}
          >
            Srpski (latinica)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.toggle} role="group" aria-label={t("ariaLabel")} data-no-translit>
      <Link
        href={enHref}
        className={isEn ? styles.active : undefined}
        aria-current={isEn ? "true" : undefined}
      >
        ENG
      </Link>
      <Link
        href={srHref}
        onClick={() => setScript("cyr")}
        className={isCyr ? styles.active : undefined}
        aria-current={isCyr ? "true" : undefined}
      >
        Ћир
      </Link>
      <Link
        href={srHref}
        onClick={() => setScript("lat")}
        className={isLat ? styles.active : undefined}
        aria-current={isLat ? "true" : undefined}
      >
        Lat
      </Link>
    </div>
  );
}
