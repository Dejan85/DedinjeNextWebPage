"use client";

import { useEffect, useRef } from "react";

interface HipokratijaWidgetProps {
  entitySlug: string;
}

// Tačan tekst koji vendor-ov widget ubacuje umesto citata kad iskustvo nema tekst
const NO_TEXT_PLACEHOLDER = "Ovo iskustvo nema tekst, samo ocenu";

function getScore(slide: Element): number {
  const raw = slide.querySelector(".score")?.childNodes[0]?.textContent?.trim();
  return raw ? parseFloat(raw) : 0;
}

function hasRealText(slide: Element): boolean {
  const content = slide.querySelector(".content")?.textContent?.trim();
  return !!content && content !== NO_TEXT_PLACEHOLDER;
}

export default function HipokratijaWidget({ entitySlug }: HipokratijaWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let reordered = false;

    const tryReorder = () => {
      if (reordered) return;
      const track = container.querySelector(".glide__slides");
      if (!track) return;

      const slides = Array.from(track.children);
      // "last_slide" (Pročitaj sva iskustva) se pojavljuje tek kad su
      // sva iskustva učitana — čekamo na nju kao signal da je fetch gotov.
      const ctaSlide = slides.find((s) => s.classList.contains("last_slide"));
      if (!ctaSlide || slides.length < 2) return;

      const reviewSlides = slides.filter((s) => s !== ctaSlide);
      const qualifying = reviewSlides.filter((s) => getScore(s) === 5 && hasRealText(s));
      if (qualifying.length === 0) return;

      const rest = reviewSlides.filter((s) => !qualifying.includes(s));
      [...qualifying, ...rest, ctaSlide].forEach((slide) => track.appendChild(slide));

      reordered = true;
      observer.disconnect();
    };

    const observer = new MutationObserver(tryReorder);
    observer.observe(container, { childList: true, subtree: true });
    tryReorder();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hipokratija-widget" data-entity_slug={entitySlug} />
  );
}
