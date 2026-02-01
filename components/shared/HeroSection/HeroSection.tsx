"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../Image/Image";
import Container from "../Container/Container";
import type { ContainerVariant } from "../Container/Container";
import { Heading, Text, Badge } from "../../typography";
import Button from "../Button/Button";
import styles from "./HeroSection.module.css";

interface HeroSlide {
  _type?: string;
  heading?: string;
  subheading?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  cta?: {
    text: string;
    link: string;
  };
  // For backwards compatibility with single hero
  img?: string;
  imgAlt?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

interface HeroSectionProps {
  // Support both single hero and slider
  slides?: HeroSlide[];
  // Single hero props (backwards compatible)
  img?: string;
  imgAlt?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
  containerVariant?: ContainerVariant;
  containerClassName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides: propSlides,
  img,
  imgAlt,
  badge,
  title,
  subtitle,
  showScrollIndicator = true,
  containerVariant = "default",
  containerClassName,
}) => {
  // Convert single hero props to slides format
  const slides = propSlides || [
    {
      img,
      imgAlt,
      badge,
      title,
      subtitle,
    },
  ];

  const isSlider = slides.length > 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play timer for slider
  useEffect(() => {
    if (!isSlider) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isSlider, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0.3,
    }),
  };

  const currentData = slides[currentSlide];
  const heroImage = currentData.image?.asset?.url || currentData.img || "";
  const heroAlt = currentData.imgAlt || currentData.heading || "Hero image";

  // Single hero content (used by both slider and static)
  const heroContent = (
    <>
      <div className={styles.directorHeroBg}>
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          objectFit="cover"
        />
      </div>
      <div className={styles.directorHeroOverlay}></div>
      <div className={styles.directorHeroContent}>
        <Container variant={containerVariant} className={containerClassName}>
          <div className={styles.directorHeroText}>
            {currentData.badge && (
              <Badge variant="hero" text={currentData.badge} />
            )}
            <Heading
              variant="h1"
              size="hero"
              color="light"
              dangerouslySetInnerHTML={{
                __html: currentData.title || currentData.heading || "",
              }}
            />
            {(currentData.subtitle || currentData.subheading) && (
              <Text
                as="p"
                variant="hero-subtitle"
                color="light"
                text={currentData.subtitle || currentData.subheading}
              />
            )}
            {currentData.cta && (
              <Button variant="hero" href={currentData.cta.link || "#"}>
                {currentData.cta.text}
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );

  // Slider wrapper
  if (isSlider) {
    return (
      <section className={`${styles.directorHero} ${styles.sliderMode}`}>
        <div className={styles.heroSliderWrapper}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.8, ease: "easeInOut" },
                opacity: { duration: 0.4 },
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              {heroContent}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className={styles.swiperButtonPrev}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className={styles.swiperButtonNext}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Pagination Dots */}
          <div className={styles.swiperPagination}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.swiperPaginationBullet} ${index === currentSlide ? styles.swiperPaginationBulletActive : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Static hero
  return (
    <section className={styles.directorHero}>
      {heroContent}
      {showScrollIndicator && (
        <div className={styles.scrollIndicator}>
          <i className="fas fa-chevron-down"></i>
        </div>
      )}
    </section>
  );
};
