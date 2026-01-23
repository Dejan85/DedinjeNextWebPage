"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`main-header fixed ${isScrolled ? "scrolled" : ""}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container">
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Мені"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="top-bar-content">
              <Link href="/" className="logo">
                <div className="logo-icon">
                  <img
                    src="/images/logo dedinje.png"
                    alt="Institut Dedinje Logo"
                  />
                </div>
                <div className="logo-text">
                  <span className="logo-name">ДЕДИЊЕ</span>
                  <span className="logo-subtitle">Институт за КВБ</span>
                </div>
              </Link>
              <div className="top-bar-info">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="info-text">
                    <span>011 3601 668</span>
                    <span>011 3601 669</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-text">
                    <span>Хероја Милана Тепића 1</span>
                    <span>11040 Београд, Србија</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <header className="header">
          <div className="container">
            <nav className="main-nav">
              <ul className="nav-menu">
                <li>
                  <Link href="/">ПОЧЕТНА</Link>
                </li>
                <li className="has-dropdown">
                  <button type="button">
                    О НАМА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown">
                    <li>
                      <Link href="/rec-direktora">
                        <i className="fas fa-user-tie"></i> Реч директора
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-building"></i> О институту
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-briefcase"></i> Немедицински
                        послови
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-users"></i> Одбори и органи
                        Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-certificate"></i> Здравствена
                        акредитација Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-book"></i> Монографија Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-file-alt"></i> Акт института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-map-marker-alt"></i> Локација
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">ТИМ</Link>
                </li>
                <li className="has-dropdown">
                  <button type="button">
                    СТРАНИЦЕ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown">
                    <li>
                      <Link href="#">Историјат</Link>
                    </li>
                    <li>
                      <Link href="#">Мисија & Визија</Link>
                    </li>
                    <li>
                      <Link href="#">Руководство</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">УСЛУГЕ</Link>
                </li>
                <li>
                  <Link href="#">ОДЕЉЕЊА</Link>
                </li>
                <li>
                  <Link href="#">РАСПОРЕД</Link>
                </li>
                <li className="has-dropdown">
                  <button type="button">
                    ГАЛЕРИЈА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown">
                    <li>
                      <Link href="#">Фото галерија</Link>
                    </li>
                    <li>
                      <Link href="#">Видео галерија</Link>
                    </li>
                  </ul>
                </li>
                <li className="has-dropdown">
                  <button type="button">
                    БЛОГ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown">
                    <li>
                      <Link href="#">Новости</Link>
                    </li>
                    <li>
                      <Link href="#">Чланци</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">КОНТАКТ</Link>
                </li>
              </ul>
              <button className="nav-search">
                <i className="fas fa-search"></i>
              </button>
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="backdrop show"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
