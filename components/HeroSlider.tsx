"use client";

import { useEffect } from "react";

export default function HeroSlider() {
  useEffect(() => {
    // Initialize Swiper when component mounts
    if (typeof window !== "undefined" && (window as any).Swiper) {
      new (window as any).Swiper(".hero-slider", {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, []);

  const overlayStyle = {
    background: 'linear-gradient(135deg, rgba(42, 157, 244, 0.9) 0%, rgba(42, 157, 244, 0.5) 50%, transparent 100%)'
  };

  return (
    <section className="relative h-[1020px] overflow-hidden">
      <div className="swiper hero-slider h-full">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920"
                alt="Medical care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0" style={overlayStyle}></div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-5 max-w-[1240px] pl-[30px]">
                <div className="grid grid-cols-1 gap-[18px] justify-items-start">
                  <h1 className="text-[68px] font-medium text-white leading-[1.1] mb-6">
                    Водите рачуна о<br />
                    свом здрављу
                  </h1>
                  <p className="text-lg text-white/90 leading-[1.7] max-w-[500px] mb-10">
                    У Институту Дедиње посвећени смо
                    <br />
                    дијагностици и лечењу кардиоваскуларних болести.
                  </p>
                  <a
                    href="#contact"
                    className="inline-block bg-white text-gray-800 font-bold text-[13px] uppercase tracking-[1.5px] px-10 py-[18px] rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                  >
                    ЗАКАЖИТЕ ПРЕГЛЕД
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920"
                alt="Modern diagnostics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0" style={overlayStyle}></div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-5 max-w-[1240px] pl-[30px]">
                <div className="grid grid-cols-1 gap-[18px] justify-items-start">
                  <h1 className="text-[68px] font-medium text-white leading-[1.1] mb-6">
                    Најсавременија
                    <br />
                    дијагностика
                  </h1>
                  <p className="text-lg text-white/90 leading-[1.7] max-w-[500px] mb-10">
                    Користимо најновију технологију и опрему
                    <br />
                    за прецизну дијагностику и лечење.
                  </p>
                  <a
                    href="#services"
                    className="inline-block bg-white text-gray-800 font-bold text-[13px] uppercase tracking-[1.5px] px-10 py-[18px] rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                  >
                    ПОГЛЕДАЈ УСЛУГЕ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920"
                alt="Medical team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0" style={overlayStyle}></div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-5 max-w-[1240px] pl-[30px]">
                <div className="grid grid-cols-1 gap-[18px] justify-items-start">
                  <h1 className="text-[68px] font-medium text-white leading-[1.1] mb-6">
                    Стручни тим
                    <br />
                    лекара
                  </h1>
                  <p className="text-lg text-white/90 leading-[1.7] max-w-[500px] mb-10">
                    Преко 200 врхунских специјалиста
                    <br />
                    брине о вашем здрављу.
                  </p>
                  <a
                    href="#team"
                    className="inline-block bg-white text-gray-800 font-bold text-[13px] uppercase tracking-[1.5px] px-10 py-[18px] rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                  >
                    УПОЗНАЈ ТИМ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="swiper-button-next !text-white after:!text-3xl"></div>
        <div className="swiper-button-prev !text-white after:!text-3xl"></div>

        {/* Pagination */}
        <div className="swiper-pagination !bottom-8"></div>
      </div>

      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: white;
          opacity: 0.5;
        }
        :global(.swiper-pagination-bullet-active) {
          background: white;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
