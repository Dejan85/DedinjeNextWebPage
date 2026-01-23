"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          mounted && isScrolled
            ? "!fixed bg-primary/98 backdrop-blur-[10px] shadow-custom-lg"
            : ""
        }`}
        suppressHydrationWarning
      >
        {/* Top Bar */}
        <div
          className={`bg-transparent border-b border-white/10 transition-all duration-300 ${
            mounted && isScrolled
              ? "max-h-0 py-0 overflow-hidden opacity-0"
              : "py-5"
          }`}
          suppressHydrationWarning
        >
          <div className="container mx-auto px-5 max-w-[1240px]">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[50px] bg-transparent rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo dedinje.png"
                    alt="Institut Dedinje Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[26px] font-bold tracking-[2px] leading-tight uppercase">
                    ДЕДИЊЕ
                  </span>
                  <span className="text-white/80 text-[11px] tracking-[0.5px]">
                    Институт за КВБ
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="hidden lg:flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition-all">
                    <i className="fas fa-phone-alt text-white text-sm"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-[13px] font-semibold leading-[1.4]">
                      011 3601 668
                    </span>
                    <span className="text-white/85 text-[13px] leading-[1.4]">
                      011 3601 669
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition-all">
                    <i className="fas fa-map-marker-alt text-white text-sm"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-[13px] font-semibold leading-[1.4]">
                      Хероја Милана Тепића 1
                    </span>
                    <span className="text-white/85 text-[13px] leading-[1.4]">
                      11040 Београд, Србија
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-3"
                aria-label="Мени"
              >
                <i className="fas fa-bars text-[22px]"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <header className="bg-transparent my-2.5">
          <div className="container mx-auto px-5 max-w-[1240px]">
            <nav className="rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] px-2.5" style={{backgroundColor: '#2a9df4'}}>
              <ul className="hidden lg:flex items-center">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    ПОЧЕТНА
                  </a>
                </li>
                <li className="group relative">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    О НАМА{" "}
                    <i className="fas fa-chevron-down text-[10px] group-hover:rotate-180 transition-transform"></i>
                  </a>
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white shadow-custom-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 overflow-hidden">
                    <li>
                      <a
                        href="/rec-direktora"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-user-tie w-5 text-center text-sm text-gray-400"></i>{" "}
                        Реч директора
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-building w-5 text-center text-sm text-gray-400"></i>{" "}
                        О институту
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-briefcase w-5 text-center text-sm text-gray-400"></i>{" "}
                        Немедицински послови
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-users w-5 text-center text-sm text-gray-400"></i>{" "}
                        Одбори и органи Института
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-certificate w-5 text-center text-sm text-gray-400"></i>{" "}
                        Здравствена акредитација
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-book w-5 text-center text-sm text-gray-400"></i>{" "}
                        Монографија Института
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-file-alt w-5 text-center text-sm text-gray-400"></i>{" "}
                        Акт института
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        <i className="fas fa-map-marker-alt w-5 text-center text-sm text-gray-400"></i>{" "}
                        Локација
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    ТИМ
                  </a>
                </li>
                <li className="group relative">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    СТРАНИЦЕ{" "}
                    <i className="fas fa-chevron-down text-[10px] group-hover:rotate-180 transition-transform"></i>
                  </a>
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white shadow-custom-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 overflow-hidden">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Историјат
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Мисија & Визија
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Руководство
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    УСЛУГЕ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    ОДЕЉЕЊА
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    РАСПОРЕД
                  </a>
                </li>
                <li className="group relative">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    ГАЛЕРИЈА{" "}
                    <i className="fas fa-chevron-down text-[10px] group-hover:rotate-180 transition-transform"></i>
                  </a>
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white shadow-custom-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 overflow-hidden">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Фото галерија
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Видео галерија
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="group relative">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    БЛОГ{" "}
                    <i className="fas fa-chevron-down text-[10px] group-hover:rotate-180 transition-transform"></i>
                  </a>
                  <ul className="absolute top-full left-0 min-w-[220px] bg-white shadow-custom-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 overflow-hidden">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Новости
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] text-gray-700 font-medium hover:bg-gray-50 hover:text-primary hover:pl-6 transition-all"
                      >
                        Чланци
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-4 text-xs font-bold text-white uppercase tracking-[0.5px] hover:bg-black/15 transition-all"
                  >
                    КОНТАКТ
                  </a>
                </li>
                <li className="ml-auto">
                  <button className="px-4 text-white text-sm hover:opacity-80 transition-opacity">
                    <i className="fas fa-search"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
