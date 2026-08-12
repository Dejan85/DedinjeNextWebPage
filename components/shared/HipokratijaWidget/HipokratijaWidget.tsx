"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import { Badge, Heading } from "@/components/typography";
import styles from "./HipokratijaWidget.module.css";

interface HipokratijaWidgetProps {
  entitySlug: string;
  badgeText: string;
  headingText: string;
}

interface Review {
  score: number;
  text: string;
}

// Tačan tekst koji vendor-ov widget ubacuje umesto citata kad iskustvo nema tekst
const NO_TEXT_PLACEHOLDER = "Ovo iskustvo nema tekst, samo ocenu";

// 4 kolone x 2 reda po "stranici" slajdera na desktopu; manje kolona na
// užim ekranima (breakpoints ispod), broj redova ostaje 2.
const ROWS = 2;
const DESKTOP_COLUMNS = 4;

function getScore(slide: Element): number {
  const raw = slide.querySelector(".score")?.childNodes[0]?.textContent?.trim();
  return raw ? parseFloat(raw) : 0;
}

function getText(slide: Element): string {
  const content = slide.querySelector(".content")?.textContent?.trim() ?? "";
  return content === NO_TEXT_PLACEHOLDER ? "" : content;
}

function Stars({ score, className }: { score: number; className?: string }) {
  const filled = Math.round(score);
  return (
    <span className={`${styles.cardStars} ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < filled ? "fas fa-star" : "far fa-star"} />
      ))}
    </span>
  );
}

export default function HipokratijaWidget({
  entitySlug,
  badgeText,
  headingText,
}: HipokratijaWidgetProps) {
  const t = useTranslations("Hipokratija");

  // Prevodi prosečnu ocenu u kratku ocenu utiska, kao kod sličnih recenzija-widgeta.
  function ratingLabel(average: number): string {
    if (average >= 4.5) return t("ratingExcellent");
    if (average >= 3.5) return t("ratingGood");
    if (average >= 2.5) return t("ratingAverage");
    return t("ratingPoor");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Vendor-ov Glide.js widget (učitan preko <Script> u page.tsx) i dalje
  // fetch-uje i renderuje svoj DOM — to zadržavamo (brending kartica
  // "Hipokratija ... Pogledaj profil ustanove" ostaje njihova, vidljiva).
  // Njegov karusel sa iskustvima (.glide) sakrivamo preko CSS-a
  // (page.module.css) jer nema opciju za grid/paginaciju od 8 kartica —
  // ovde samo čitamo iskustva iz njegovog DOM-a i renderujemo ih sami,
  // u pravom slajderu (Swiper), da bi visina sekcije bila fiksna i da
  // bi tranzicija između stranica bila prava animacija klizanja.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let extracted = false;

    const tryExtract = () => {
      if (extracted) return;
      const track = container.querySelector(".glide__slides");
      if (!track) return;

      const slides = Array.from(track.children);
      // "last_slide" (Pročitaj sva iskustva) se pojavljuje tek kad su
      // sva iskustva učitana — čekamo na nju kao signal da je fetch gotov.
      const ctaSlide = slides.find((s) => s.classList.contains("last_slide"));
      if (!ctaSlide || slides.length < 2) return;

      const parsed = slides
        .filter((s) => s !== ctaSlide)
        .map((s) => ({ score: getScore(s), text: getText(s) }));
      const qualifying = parsed.filter((r) => r.score === 5 && r.text !== "");
      if (qualifying.length === 0) return;

      const rest = parsed.filter((r) => !qualifying.includes(r));

      extracted = true;
      observer.disconnect();
      setReviews([...qualifying, ...rest]);
    };

    const observer = new MutationObserver(tryExtract);
    observer.observe(container, { childList: true, subtree: true });
    tryExtract();

    return () => observer.disconnect();
  }, []);

  // snapGrid/snapIndex prate broj "stranica" i trenutnu poziciju tačno
  // onako kako ih Swiper vidi za AKTIVNI breakpoint (broj kolona se menja
  // na užim ekranima preko `breakpoints` prop-a niže).
  const syncState = (swiper: SwiperRef["swiper"]) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setPageIndex(swiper.snapIndex);
    setPageCount(swiper.snapGrid.length);
  };

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length
    : 0;

  return (
    <div>
      <div className="section-header light">
        <Badge variant="light" text={badgeText} />
        <Heading variant="h2" color="light" align="left" text={headingText} />
      </div>
      <div ref={containerRef} className="hipokratija-widget" data-entity_slug={entitySlug} />
      {reviews.length > 0 && (
        <div className={styles.layout}>
          <div className={styles.summary}>
            <p className={styles.summaryLabel}>{ratingLabel(average)}</p>
            <Stars score={average} className={styles.summaryStars} />
            <p className={styles.summaryCount}>{t("basedOn", { count: reviews.length })}</p>
            <p className={styles.summarySource}>Hipokratija</p>
          </div>
          <div className={styles.carousel}>
            <Swiper
              ref={swiperRef}
              modules={[Grid]}
              grid={{ rows: ROWS, fill: "row" }}
              slidesPerView={1}
              slidesPerGroup={ROWS}
              spaceBetween={20}
              speed={400}
              breakpoints={{
                // slidesPerGroup mora biti slidesPerView * ROWS da bi "sledeća
                // stranica" pomerila za CEO vidljivi grid (kolone x redovi),
                // ne za pola njega — Grid modul broji slajdove kroz redove
                // (fill: "row"), pa jedna kolona zauzima ROWS indeksa.
                769: { slidesPerView: 2, slidesPerGroup: 2 * ROWS },
                1201: { slidesPerView: DESKTOP_COLUMNS, slidesPerGroup: DESKTOP_COLUMNS * ROWS },
              }}
              onSwiper={syncState}
              onSlideChange={syncState}
              onBreakpoint={syncState}
              onResize={syncState}
              className={styles.swiper}
            >
              {reviews.map((review, i) => (
                <SwiperSlide key={i}>
                  <article className={styles.card}>
                    <p className={styles.cardScore}>
                      {review.score.toFixed(1)} <Stars score={review.score} />
                    </p>
                    <p className={styles.cardContent}>
                      {review.text || NO_TEXT_PLACEHOLDER}
                    </p>
                    <p className={styles.cardSource}>
                      {t("source")} <span>Hipokratija</span>
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            {pageCount > 1 && (
              <div className={styles.nav}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  disabled={isBeginning}
                  aria-label={t("prevAriaLabel")}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className={styles.pageIndicator}>
                  {pageIndex + 1} / {pageCount}
                </span>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                  disabled={isEnd}
                  aria-label={t("nextAriaLabel")}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
