export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="py-16">
        <div className="container mx-auto px-5 max-w-[1240px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <i className="fas fa-plus text-white"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg font-bold">ДЕДИЊЕ</span>
                  <span className="text-gray-400 text-xs">Институт за КВБ</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Институт за кардиоваскуларне болести Дедиње је водећа
                здравствена установа у региону специјализована за дијагностику и
                лечење болести срца и крвних судова.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">
                Брзи линкови
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    О нама
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Услуге
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Одељења
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Наш тим
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Новости
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Контакт
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Услуге</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Кардиохирургија
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Кардиологија
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Васкуларна хирургија
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Интервентна кардиологија
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Рехабилитација
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Дијагностика
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Контакт</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                  <span className="text-gray-400">
                    Хероја Милана Тепића 1<br />
                    11040 Београд, Србија
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-phone-alt text-primary mt-1"></i>
                  <span className="text-gray-400">
                    011 3601 668
                    <br />
                    011 3601 669
                  </span>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-envelope text-primary mt-1"></i>
                  <span className="text-gray-400">info@ikvbd.rs</span>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-clock text-primary mt-1"></i>
                  <span className="text-gray-400">
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-5 max-w-[1240px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2026 Институт за кардиоваскуларне болести Дедиње. Сва права
              задржана.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Политика приватности
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Услови коришћења
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Карта сајта
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
