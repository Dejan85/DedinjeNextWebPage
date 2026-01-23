import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col about">
              <div className="footer-logo">
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
              </div>
              <p>
                Институт за кардиоваскуларне болести Дедиње је водећа
                здравствена установа у региону специјализована за дијагностику и
                лечење болести срца и крвних судова.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Брзи линкови</h4>
              <ul>
                <li>
                  <Link href="/rec-direktora">Реч директора</Link>
                </li>
                <li>
                  <Link href="/biografija">Биографија</Link>
                </li>
                <li>
                  <a href="#">О нама</a>
                </li>
                <li>
                  <a href="#">Услуге</a>
                </li>
                <li>
                  <a href="#">Одељења</a>
                </li>
                <li>
                  <a href="#">Наш тим</a>
                </li>
                <li>
                  <a href="#">Новости</a>
                </li>
                <li>
                  <a href="#">Контакт</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Услуге</h4>
              <ul>
                <li>
                  <a href="#">Кардиохирургија</a>
                </li>
                <li>
                  <a href="#">Кардиологија</a>
                </li>
                <li>
                  <a href="#">Васкуларна хирургија</a>
                </li>
                <li>
                  <a href="#">Интервентна кардиологија</a>
                </li>
                <li>
                  <a href="#">Рехабилитација</a>
                </li>
                <li>
                  <a href="#">Дијагностика</a>
                </li>
              </ul>
            </div>
            <div className="footer-col contact">
              <h4>Контакт</h4>
              <ul className="footer-contact">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    Хероја Милана Тепића 1<br />
                    11040 Београд, Србија
                  </span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>
                    011 3601 668
                    <br />
                    011 3601 669
                  </span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@ikvbd.rs</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>
                    Пон - Пет: 08:00 - 19:00
                    <br />
                    Викенд: 09:00 - 15:00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>
              &copy; 2026 Институт за кардиоваскуларне болести Дедиње. Сва права
              задржана.
            </p>
            <div className="footer-links">
              <a href="#">Политика приватности</a>
              <a href="#">Услови коришћења</a>
              <a href="#">Карта сајта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
