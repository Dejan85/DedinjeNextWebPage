"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "./Image";

interface HeroSlide {
  _type: string;
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
}

interface HeroSliderProps {
  slides?: HeroSlide[];
}

export default function HeroSlider({ slides: sanitySlides }: HeroSliderProps) {
  // Fallback na hardcoded slides ako nema Sanity podataka
  const defaultSlides = [
    {
      _type: "hero",
      image: {
        asset: {
          _id: "default-1",
          url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920",
        },
      },
      heading: "Ваш национални институт за срце и крвне судове",
      subheading:
        "Водећа здравствена установа у региону са преко 65 година искуства у кардиоваскуларној медицини",
    },
    {
      _type: "hero",
      image: {
        asset: {
          _id: "default-2",
          url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920",
        },
      },
      heading: "Најсавременија дијагностика",
      subheading:
        "Користимо најновију технологију и опрему за прецизну дијагностику и лечење кардиоваскуларних обољења",
      cta: {
        text: "ПОГЛЕДАЈ УСЛУГЕ",
        link: "#services",
      },
    },
    {
      _type: "hero",
      image: {
        asset: {
          _id: "default-3",
          url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920",
        },
      },
      heading: "Тим стручњака на вашој услузи",
      subheading:
        "Преко 200 лекара специјалиста посвећених вашем здрављу и опоравку",
    },
  ];

  const slides =
    sanitySlides && sanitySlides.length > 0 ? sanitySlides : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play timer koji se resetuje svaki put kada se promeni slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Cleanup funkcija - uvek se poziva pre sledećeg effect-a ili na unmount
    return () => clearInterval(timer);
  }, [currentSlide]); // Resetuj timer svaki put kada se currentSlide promeni

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

  return (
    <section className="hero">
      <div className="hero-slider-wrapper">
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
            <div className="hero-background">
              <Image
                src={slides[currentSlide].image?.asset?.url || ""}
                alt={slides[currentSlide].heading || "Hero image"}
                fill
                priority
                objectFit="cover"
              />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-wrapper">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {slides[currentSlide].heading}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {slides[currentSlide].subheading}
                  </motion.p>
                  {slides[currentSlide].cta && (
                    <motion.a
                      href={slides[currentSlide].cta?.link || "#"}
                      className="hero-btn"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {slides[currentSlide].cta?.text}
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="swiper-button-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="swiper-button-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Pagination Dots */}
        <div className="swiper-pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`swiper-pagination-bullet ${index === currentSlide ? "swiper-pagination-bullet-active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
