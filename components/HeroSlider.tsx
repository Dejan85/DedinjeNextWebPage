"use client";

import { useEffect } from "react";

export default function HeroSlider() {
  useEffect(() => {
    // Initialize Swiper when component mounts
    const initSwiper = () => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        new (window as any).Swiper(".hero-slider", {
          slidesPerView: 1,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    };

    // Wait for Swiper to load
    if ((window as any).Swiper) {
      initSwiper();
    } else {
      // If Swiper not loaded yet, wait for it
      const checkSwiper = setInterval(() => {
        if ((window as any).Swiper) {
          initSwiper();
          clearInterval(checkSwiper);
        }
      }, 100);

      return () => clearInterval(checkSwiper);
    }
  }, []);

  return (
    <section className="hero">
      <div className="swiper hero-slider">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide">
            <div className="hero-background">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
                alt="Medical care"
              />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-wrapper">
                  <h1>
                    Ваш национални институт за срце и крвне судове
                  </h1>
                  <p>
                    Водећа здравствена установа у региону са преко 65 година
                    искуства у кардиоваскуларној медицини
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide">
            <div className="hero-background">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920"
                alt="Modern diagnostics"
              />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-wrapper">
                  <h1>Најсавременија дијагностика</h1>
                  <p>
                    Користимо најновију технологију и опрему за прецизну
                    дијагностику и лечење кардиоваскуларних обољења
                  </p>
                  <a href="#services" className="hero-btn">
                    ПОГЛЕДАЈ УСЛУГЕ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide">
            <div className="hero-background">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920"
                alt="Medical team"
              />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-wrapper">
                  <h1>Стручни тим лекара</h1>
                  <p>
                    Преко 200 врхунских специјалиста брине о вашем здрављу и
                    посвећени су пружању најбоље могуће неге
                  </p>
                  <a href="#team" className="hero-btn">
                    УПОЗНАЈ ТИМ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>

        {/* Pagination */}
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}
