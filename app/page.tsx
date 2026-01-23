"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Counter animation for statistics
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
      });
    };

    animateCounters();

    // Scroll effects for header
    const handleScroll = () => {
      const header = document.querySelector('.main-header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <div className="main-header">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-content">
              <div className="logo">
                <div className="logo-icon">
                  <img src="/images/logo dedinje.png" alt="Institut Dedinje Logo" />
                </div>
                <div className="logo-text">
                  <span className="logo-name">ДЕДИЊЕ</span>
                  <span className="logo-subtitle">Институт за КВБ</span>
                </div>
              </div>
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
                <li><a href="#" className="active">ПОЧЕТНА</a></li>
                <li className="has-dropdown">
                  <a href="#">О НАМА <i className="fas fa-chevron-down"></i></a>
                  <ul className="dropdown">
                    <li><a href="#"><i className="fas fa-user-tie"></i> Реч директора</a></li>
                    <li><a href="#"><i className="fas fa-building"></i> О институту</a></li>
                    <li><a href="#"><i className="fas fa-briefcase"></i> Немедицински послови</a></li>
                    <li><a href="#"><i className="fas fa-users"></i> Одбори и органи Института</a></li>
                    <li><a href="#"><i className="fas fa-certificate"></i> Здравствена акредитација Института</a></li>
                    <li><a href="#"><i className="fas fa-book"></i> Монографија Института</a></li>
                    <li><a href="#"><i className="fas fa-file-alt"></i> Акт института</a></li>
                    <li><a href="#"><i className="fas fa-map-marker-alt"></i> Локација</a></li>
                  </ul>
                </li>
                <li><a href="#">ТИМ</a></li>
                <li className="has-dropdown">
                  <a href="#">СТРАНИЦЕ <i className="fas fa-chevron-down"></i></a>
                  <ul className="dropdown">
                    <li><a href="#">Историјат</a></li>
                    <li><a href="#">Мисија &amp; Визија</a></li>
                    <li><a href="#">Руководство</a></li>
                  </ul>
                </li>
                <li><a href="#">УСЛУГЕ</a></li>
                <li><a href="#">ОДЕЉЕЊА</a></li>
                <li><a href="#">РАСПОРЕД</a></li>
                <li className="has-dropdown">
                  <a href="#">ГАЛЕРИЈА <i className="fas fa-chevron-down"></i></a>
                  <ul className="dropdown">
                    <li><a href="#">Фото галерија</a></li>
                    <li><a href="#">Видео галерија</a></li>
                  </ul>
                </li>
                <li className="has-dropdown">
                  <a href="#">БЛОГ <i className="fas fa-chevron-down"></i></a>
                  <ul className="dropdown">
                    <li><a href="#">Новости</a></li>
                    <li><a href="#">Чланци</a></li>
                  </ul>
                </li>
                <li><a href="#">КОНТАКТ</a></li>
              </ul>
              <button className="nav-search">
                <i className="fas fa-search"></i>
              </button>
            </nav>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920" alt="" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-wrapper">
              <h1>Водите рачуна о<br />свом здрављу</h1>
              <p>У Институту Дедиње посвећени смо<br />дијагностици и лечењу кардиоваскуларних болести.</p>
              <a href="#contact" className="hero-btn">ЗАКАЖИТЕ ПРЕГЛЕД</a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="info-boxes">
        <div className="container">
          <div className="info-boxes-grid">
            <div className="info-box">
              <div className="info-box-icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="info-box-content">
                <h3>Радно време</h3>
                <div className="schedule">
                  <div className="schedule-row">
                    <span>Пон - Пет</span>
                    <span>08:00 - 19:00</span>
                  </div>
                  <div className="schedule-row">
                    <span>Субота</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="schedule-row">
                    <span>Недеља</span>
                    <span>09:00 - 15:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-box">
              <div className="info-box-icon">
                <i className="far fa-calendar-check"></i>
              </div>
              <div className="info-box-content">
                <h3>Распоред лекара</h3>
                <p>Проверите доступност наших специјалиста и закажите термин који вам највише одговара.</p>
                <a href="#" className="info-box-link">Погледај распоред <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="info-box">
              <div className="info-box-icon">
                <i className="fas fa-calendar-plus"></i>
              </div>
              <div className="info-box-content">
                <h3>Заказивање</h3>
                <p>Први корак ка здрављу је заказивање прегледа. Јавите се телефоном или онлајн.</p>
                <a href="#contact" className="info-box-link">Закажи преглед <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="info-box emergency">
              <div className="info-box-icon">
                <i className="fas fa-ambulance"></i>
              </div>
              <div className="info-box-content">
                <h3>Хитни случајеви</h3>
                <div className="emergency-phone">011 3601 600</div>
                <p>Доступни 24/7 за хитне случајеве</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-content">
              <span className="section-badge">Добродошли</span>
              <h2>Институт за кардиоваскуларне болести Дедиње</h2>
              <p className="lead">Водећа здравствена установа у региону специјализована за дијагностику, лечење и рехабилитацију кардиоваскуларних обољења.</p>
              <p>Са више од 65 година искуства и преко 200 лекара специјалиста, Институт Дедиње представља симбол изврсности у кардиоваскуларној медицини. Наша посвећеност пацијентима и константно усавршавање чине нас првим избором за хиљаде пацијената сваке године.</p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Најсавременија опрема</span>
                </div>
                <div className="welcome-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Стручни тим лекара</span>
                </div>
                <div className="welcome-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Комплетна дијагностика</span>
                </div>
                <div className="welcome-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>24/7 хитна помоћ</span>
                </div>
              </div>
              <a href="#" className="btn-primary">Сазнајте више о нама</a>
            </div>
            <div className="welcome-images">
              <div className="welcome-img-main">
                <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800" alt="Medical team" />
              </div>
              <div className="welcome-img-secondary">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400" alt="Medical equipment" />
              </div>
              <div className="experience-badge">
                <span className="exp-number">65+</span>
                <span className="exp-text">Година искуства</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Stats Section */}
      <section className="parallax-section parallax-stats">
        <div className="parallax-overlay"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="stats-intro">
              <h2>Бројке које говоре</h2>
              <p>Наши резултати су доказ посвећености и стручности</p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="stat-number" data-target="15000">0</div>
                <div className="stat-label">Операција годишње</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="stat-number" data-target="200">0</div>
                <div className="stat-label">Лекара специјалиста</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-award"></i>
                </div>
                <div className="stat-number" data-target="65">0</div>
                <div className="stat-label">Година искуства</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-smile"></i>
                </div>
                <div className="stat-number" data-target="50000">0</div>
                <div className="stat-label">Задовољних пацијената</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Наше услуге</span>
            <h2>Комплетна кардиоваскуларна нега</h2>
            <p>Пружамо широк спектар услуга од дијагностике до хируршких интервенција</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <i className="fas fa-heart"></i>
                </div>
              </div>
              <h3>Кардиохирургија</h3>
              <p>Хируршко лечење болести срца укључујући коронарни бајпас, замену и реконструкцију срчаних залистака, операције аорте.</p>
              <ul className="service-list">
                <li><i className="fas fa-angle-right"></i> Коронарни бајпас</li>
                <li><i className="fas fa-angle-right"></i> Замена залистака</li>
                <li><i className="fas fa-angle-right"></i> Операције аорте</li>
              </ul>
              <a href="#" className="service-link">Сазнајте више <i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
            <div className="service-card featured">
              <div className="featured-badge">Најтраженије</div>
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
              </div>
              <h3>Кардиологија</h3>
              <p>Комплетна дијагностика и нехируршко лечење болести срца. Модерна опрема за прецизну дијагнозу.</p>
              <ul className="service-list">
                <li><i className="fas fa-angle-right"></i> Ехокардиографија</li>
                <li><i className="fas fa-angle-right"></i> ЕКГ и Холтер</li>
                <li><i className="fas fa-angle-right"></i> Стрес тестови</li>
              </ul>
              <a href="#" className="service-link">Сазнајте више <i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <i className="fas fa-x-ray"></i>
                </div>
              </div>
              <h3>Васкуларна хирургија</h3>
              <p>Хируршко лечење болести крвних судова укључујући аорту, каротидне и периферне артерије.</p>
              <ul className="service-list">
                <li><i className="fas fa-angle-right"></i> Операције аорте</li>
                <li><i className="fas fa-angle-right"></i> Каротидна хирургија</li>
                <li><i className="fas fa-angle-right"></i> Периферна хирургија</li>
              </ul>
              <a href="#" className="service-link">Сазнајте више <i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <i className="fas fa-procedures"></i>
                </div>
              </div>
              <h3>Интервентна кардиологија</h3>
              <p>Минимално инвазивне процедуре за лечење срчаних обољења без отворене хирургије.</p>
              <ul className="service-list">
                <li><i className="fas fa-angle-right"></i> Уградња стентова</li>
                <li><i className="fas fa-angle-right"></i> Ангиопластика</li>
                <li><i className="fas fa-angle-right"></i> Катетеризација</li>
              </ul>
              <a href="#" className="service-link">Сазнајте више <i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-wrapper">
            <div className="features-content">
              <span className="section-badge">Зашто ми</span>
              <h2>По чему смо другачији</h2>
              <p>Институт Дедиње комбинује дугогодишње искуство са најсавременијом технологијом како би пружио најбољу могућу негу.</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Врхунски стручњаци</h4>
                    <p>Тим од преко 200 лекара специјалиста са међународним искуством.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-microscope"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Најмодернија опрема</h4>
                    <p>Користимо најновију медицинску технологију за прецизну дијагностику.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Брза дијагностика</h4>
                    <p>Резултати у најкраћем могућем року за правовремено лечење.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Индивидуални приступ</h4>
                    <p>Сваки пацијент добија персонализован план лечења.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="features-image">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800" alt="Modern medical equipment" />
              <div className="features-image-overlay">
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
                <span>Погледајте видео о нама</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <section className="parallax-section parallax-cta">
        <div className="parallax-overlay gradient"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="cta-content">
              <h2>Ваше здравље је наш приоритет</h2>
              <p>Не чекајте - закажите преглед код наших специјалиста и направите први корак ка бољем здрављу.</p>
              <div className="cta-buttons">
                <a href="tel:0113601668" className="btn-white"><i className="fas fa-phone-alt"></i> Позовите нас</a>
                <a href="#contact" className="btn-outline-white">Закажите онлајн</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Одељења</span>
            <h2>Наша специјализована одељења</h2>
            <p>Свако одељење посвећено је одређеној области кардиоваскуларне медицине</p>
          </div>
          <div className="departments-grid">
            <div className="department-card">
              <div className="department-image">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600" alt="Cardiac Surgery" />
                <div className="department-overlay">
                  <a href="#" className="department-link"><i className="fas fa-plus"></i></a>
                </div>
              </div>
              <div className="department-info">
                <h4>Одељење за кардиохирургију</h4>
                <p>Комплексне хируршке интервенције на срцу</p>
              </div>
            </div>
            <div className="department-card">
              <div className="department-image">
                <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600" alt="Cardiology" />
                <div className="department-overlay">
                  <a href="#" className="department-link"><i className="fas fa-plus"></i></a>
                </div>
              </div>
              <div className="department-info">
                <h4>Одељење за кардиологију</h4>
                <p>Дијагностика и нехируршко лечење</p>
              </div>
            </div>
            <div className="department-card">
              <div className="department-image">
                <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600" alt="ICU" />
                <div className="department-overlay">
                  <a href="#" className="department-link"><i className="fas fa-plus"></i></a>
                </div>
              </div>
              <div className="department-info">
                <h4>Интензивна нега</h4>
                <p>24/7 мониторинг критичних пацијената</p>
              </div>
            </div>
            <div className="department-card">
              <div className="department-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600" alt="Rehabilitation" />
                <div className="department-overlay">
                  <a href="#" className="department-link"><i className="fas fa-plus"></i></a>
                </div>
              </div>
              <div className="department-info">
                <h4>Рехабилитација</h4>
                <p>Постоперативни опоравак и терапија</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Наш тим</span>
            <h2>Упознајте наше стручњаке</h2>
            <p>Искусни лекари посвећени вашем здрављу</p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" alt="Др Марко Јовановић" />
                <div className="team-overlay">
                  <div className="team-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h4>Др Марко Јовановић</h4>
                <span className="team-role">Кардиохирург</span>
                <p>Специјалиста са 20+ година искуства у комплексним кардиохируршким интервенцијама.</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" alt="Др Ана Петровић" />
                <div className="team-overlay">
                  <div className="team-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h4>Др Ана Петровић</h4>
                <span className="team-role">Кардиолог</span>
                <p>Водећи специјалиста за неинвазивну кардиолошку дијагностику и превенцију.</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6fd0d?w=400" alt="Др Милан Николић" />
                <div className="team-overlay">
                  <div className="team-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h4>Др Милан Николић</h4>
                <span className="team-role">Васкуларни хирург</span>
                <p>Експерт за хируршко лечење болести крвних судова и аортне патологије.</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400" alt="Др Јелена Стојковић" />
                <div className="team-overlay">
                  <div className="team-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h4>Др Јелена Стојковић</h4>
                <span className="team-role">Анестезиолог</span>
                <p>Специјалиста за кардиоанестезију са богатим искуством у интензивној нези.</p>
              </div>
            </div>
          </div>
          <div className="team-cta">
            <a href="#" className="btn-primary">Упознајте цео тим</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header centered light">
            <span className="section-badge">Искуства</span>
            <h2>Шта кажу наши пацијенти</h2>
          </div>
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>Захваљујући тиму на Дедињу, данас водим потпуно нормалан живот. Операција је протекла без компликација, а постоперативна нега је била на највишем нивоу. Неизмерно сам захвалан.</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Петар М." />
                  </div>
                  <div className="author-info">
                    <h5>Петар Миловановић</h5>
                    <span>Пацијент, Кардиохирургија</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>Професионалност и хуманост особља на Дедињу су ме одушевили. Од првог прегледа до завршетка лечења осећала сам се сигурно и збринуто. Топло препоручујем.</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Марија С." />
                  </div>
                  <div className="author-info">
                    <h5>Марија Станковић</h5>
                    <span>Пацијенткиња, Кардиологија</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>Након уградње стентова осећам се као нов човек. Др Јовановић и његов тим су истински професионалци. Брза интервенција ми је спасила живот.</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Зоран Т." />
                  </div>
                  <div className="author-info">
                    <h5>Зоран Томић</h5>
                    <span>Пацијент, Интервентна кардиологија</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-nav">
            <button className="testimonial-prev"><i className="fas fa-chevron-left"></i></button>
            <div className="testimonials-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <button className="testimonial-next"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-badge">Новости</span>
            <h2>Најновије вести</h2>
            <p>Будите у току са дешавањима на Институту</p>
          </div>
          <div className="news-grid">
            <div className="news-card large">
              <div className="news-image">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800" alt="News" />
                <div className="news-category">Иновације</div>
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span><i className="far fa-calendar-alt"></i> 15. јануар 2026</span>
                  <span><i className="far fa-user"></i> Медицински тим</span>
                </div>
                <h3>Нова метода минимално инвазивне кардиохирургије</h3>
                <p>Институт Дедиње уводи најновију технологију за минимално инвазивне операције срца која значајно скраћује време опоравка пацијената.</p>
                <a href="#" className="news-link">Прочитајте више <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="news-sidebar">
              <div className="news-card small">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400" alt="News" />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span><i className="far fa-calendar-alt"></i> 10. јануар 2026</span>
                  </div>
                  <h4>Бесплатни кардиолошки прегледи</h4>
                  <a href="#" className="news-link">Сазнајте више <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
              <div className="news-card small">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400" alt="News" />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span><i className="far fa-calendar-alt"></i> 5. јануар 2026</span>
                  </div>
                  <h4>Нова савремена опрема на одељењу</h4>
                  <a href="#" className="news-link">Сазнајте више <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
              <div className="news-card small">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400" alt="News" />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span><i className="far fa-calendar-alt"></i> 1. јануар 2026</span>
                  </div>
                  <h4>Успешна 10.000 операција у 2025.</h4>
                  <a href="#" className="news-link">Сазнајте више <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Appointment Section */}
      <section className="parallax-section parallax-appointment">
        <div className="parallax-overlay dark"></div>
        <div className="parallax-content">
          <div className="container">
            <div className="appointment-wrapper">
              <div className="appointment-info">
                <h2>Закажите преглед</h2>
                <p>Попуните формулар и наш тим ће вас контактирати у најкраћем року ради потврде термина.</p>
                <div className="appointment-contact">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="contact-text">
                      <span>Телефон</span>
                      <strong>011 3601 668</strong>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <span>Е-пошта</span>
                      <strong>info@ikvbd.rs</strong>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <span>Адреса</span>
                      <strong>Хероја Милана Тепића 1</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appointment-form-wrapper" id="contact">
                <form className="appointment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" id="name" required />
                      <label htmlFor="name">Име и презиме</label>
                    </div>
                    <div className="form-group">
                      <input type="email" id="email" required />
                      <label htmlFor="email">Е-пошта</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="tel" id="phone" required />
                      <label htmlFor="phone">Телефон</label>
                    </div>
                    <div className="form-group">
                      <select id="department" required>
                        <option value="" disabled></option>
                        <option value="cardiology">Кардиологија</option>
                        <option value="cardiac-surgery">Кардиохирургија</option>
                        <option value="vascular">Васкуларна хирургија</option>
                        <option value="interventional">Интервентна кардиологија</option>
                      </select>
                      <label htmlFor="department">Одељење</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="date" id="date" required />
                      <label htmlFor="date" className="date-label">Жељени датум</label>
                    </div>
                    <div className="form-group">
                      <select id="time" required>
                        <option value="" disabled></option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                      <label htmlFor="time">Време</label>
                    </div>
                  </div>
                  <div className="form-group full">
                    <textarea id="message" rows={3}></textarea>
                    <label htmlFor="message">Додатне напомене</label>
                  </div>
                  <button type="submit" className="btn-submit">
                    <span>Закажите преглед</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header centered">
            <h3>Сертификати и партнерства</h3>
          </div>
          <div className="partners-slider">
            <div className="partner-logo"><i className="fas fa-hospital"></i><span>ISO 9001</span></div>
            <div className="partner-logo"><i className="fas fa-certificate"></i><span>JCI Акредитација</span></div>
            <div className="partner-logo"><i className="fas fa-award"></i><span>Европски стандарди</span></div>
            <div className="partner-logo"><i className="fas fa-shield-alt"></i><span>Здравствена заштита</span></div>
            <div className="partner-logo"><i className="fas fa-heart"></i><span>Кардио центар</span></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col about">
                <div className="footer-logo">
                  <div className="logo-icon">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="logo-text">
                    <span className="logo-name">ДЕДИЊЕ</span>
                    <span className="logo-subtitle">Институт за КВБ</span>
                  </div>
                </div>
                <p>Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.</p>
                <div className="footer-social">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
              <div className="footer-col">
                <h4>Брзи линкови</h4>
                <ul>
                  <li><a href="#">О нама</a></li>
                  <li><a href="#">Услуге</a></li>
                  <li><a href="#">Одељења</a></li>
                  <li><a href="#">Наш тим</a></li>
                  <li><a href="#">Новости</a></li>
                  <li><a href="#">Контакт</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Услуге</h4>
                <ul>
                  <li><a href="#">Кардиохирургија</a></li>
                  <li><a href="#">Кардиологија</a></li>
                  <li><a href="#">Васкуларна хирургија</a></li>
                  <li><a href="#">Интервентна кардиологија</a></li>
                  <li><a href="#">Рехабилитација</a></li>
                  <li><a href="#">Дијагностика</a></li>
                </ul>
              </div>
              <div className="footer-col contact">
                <h4>Контакт</h4>
                <ul className="footer-contact">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Хероја Милана Тепића 1<br />11040 Београд, Србија</span>
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <span>011 3601 668<br />011 3601 669</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>info@ikvbd.rs</span>
                  </li>
                  <li>
                    <i className="fas fa-clock"></i>
                    <span>Пон - Пет: 08:00 - 19:00<br />Викенд: 09:00 - 15:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p>&copy; 2026 Институт за кардиоваскуларне болести Дедиње. Сва права задржана.</p>
              <div className="footer-links">
                <a href="#">Политика приватности</a>
                <a href="#">Услови коришћења</a>
                <a href="#">Карта сајта</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
