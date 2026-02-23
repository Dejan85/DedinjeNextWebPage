"use client";

import { useState } from "react";
import {
  Container,
  PageHeader,
  Button,
  Section,
} from "@/components/shared";
import styles from "./page.module.css";

interface BoardMember {
  name: string;
  role?: string;
}

interface Board {
  icon: string;
  title: string;
  chairman: BoardMember;
  viceChairman?: BoardMember;
  membersLabel: string;
  members: BoardMember[];
}

const BOARDS: Board[] = [
  {
    icon: "fas fa-landmark",
    title: "Управни одбор Института",
    chairman: { name: "Академик проф. др Јован Хаџи-Ђокић", role: "Председник Управног одбора" },
    membersLabel: "Чланови",
    members: [
      { name: "Проф. др Марија Јовић", role: "Факултет организационих наука Универзитета у Београду" },
      { name: "Др Драган Велић", role: "дипл. прав. из Београда" },
      { name: 'Доц. др Бранко Лозук, НС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
      { name: 'Клин. асист. др Горан Лончар, ВНС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
    ],
  },
  {
    icon: "fas fa-user-graduate",
    title: "Стручни савет Института",
    chairman: { name: "Проф. др Александра Николић", role: "Председник Стручног савета" },
    viceChairman: { name: "Доц. др Милан Добрић", role: "Заменик председника" },
    membersLabel: "Чланови Стручног савета",
    members: [
      { name: "Др Саша Хинић" },
      { name: "Др Милан Ћирковић" },
      { name: "Др Сандра Гајић" },
      { name: "Доц. др Предраг Матић" },
      { name: "Клин. асист. др Иван Илић" },
      { name: "Др Драгана Кошевић" },
      { name: "Зорица Васић", role: "Главна сестра Института" },
    ],
  },
  {
    icon: "fas fa-eye",
    title: "Надзорни одбор Института",
    chairman: { name: "Светозар Ћапин", role: "Председник Надзорног одбора, дипл. машински инжењер из Београда" },
    membersLabel: "Чланови",
    members: [
      { name: "Нађа Баранин", role: "дипл. економиста из Београда" },
      { name: "Др Дражен Јелача", role: "Општа болница Панчево" },
      { name: 'Доц. др Ивана Петровић, НС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
      { name: 'Доц. др Слободан Танасковић, ВНС', role: 'Институт за кардиоваскуларне болести „Дедиње"' },
    ],
  },
  {
    icon: "fas fa-scale-balanced",
    title: "Етички одбор Института",
    chairman: { name: "Др Синиша Јагодић", role: "Председник Етичког одбора" },
    viceChairman: { name: "Доц. др Предраг Гајин", role: "Заменик председника" },
    membersLabel: "Чланови Етичког одбора",
    members: [
      { name: "Др Владимир Ковачевић" },
      { name: "Др Велибор Ристић" },
      { name: "Др Милан Вуковић" },
      { name: "Клин. асист. др Саша Боровић" },
      { name: "Др Анита Поповић" },
      { name: "Др Љубомир Ђоковић" },
      { name: "Наташа Елезовић", role: "дипл. прав." },
    ],
  },
];

function BoardCard({ board }: { board: Board }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.boardCard} ${open ? styles.boardCardOpen : ""}`}>
      <button
        type="button"
        className={styles.boardCardToggle}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className={styles.boardCardIcon}>
          <i className={board.icon} aria-hidden />
        </div>
        <h3>{board.title}</h3>
        <span className={styles.boardChevron}>
          <i className={`fas fa-chevron-${open ? "up" : "down"}`} aria-hidden />
        </span>
      </button>

      {open && (
        <div className={styles.boardCardBody}>
          {/* Chairman */}
          <div className={styles.leaderCard}>
            <span className={styles.leaderIcon}>
              <i className="fas fa-crown" aria-hidden />
            </span>
            <div>
              <span className={styles.leaderRole}>{board.chairman.role}</span>
              <strong>{board.chairman.name}</strong>
            </div>
          </div>

          {/* Vice-chairman */}
          {board.viceChairman && (
            <div className={styles.leaderCard}>
              <span className={styles.leaderIconAlt}>
                <i className="fas fa-star" aria-hidden />
              </span>
              <div>
                <span className={styles.leaderRole}>{board.viceChairman.role}</span>
                <strong>{board.viceChairman.name}</strong>
              </div>
            </div>
          )}

          {/* Members */}
          <div className={styles.membersBlock}>
            <h4>{board.membersLabel}</h4>
            <ul className={styles.membersList}>
              {board.members.map((m, idx) => (
                <li key={idx}>
                  <span className={styles.memberBullet}>
                    <i className="fas fa-user" aria-hidden />
                  </span>
                  <div>
                    <strong>{m.name}</strong>
                    {m.role && <span className={styles.memberRole}>{m.role}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OdboriIOrganiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Одбори и органи Института" },
        ]}
        title="Одбори и органи Института"
        subtitle="Управни, стручни, надзорни и етички органи који обезбеђују ефикасно управљање и квалитетну здравствену негу"
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className="fas fa-university" aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>Организација управљања</h2>
              <p>
                Институти за здравствену негу, као што је Институт за
                кардиоваскуларне болести „Дедиње", обично организују своје
                активности путем различитих органа и одбора како би обезбедили
                ефикасно управљање, доношење одлука и пружање висококвалитетне
                здравствене неге.
              </p>
            </div>
          </div>

          <div className={styles.statsBanner}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>4</div>
              <div className={styles.statLabel}>Органа и одбора</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statValue}>25+</div>
              <div className={styles.statLabel}>Чланова укупно</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statValue}>4</div>
              <div className={styles.statLabel}>Области надлежности</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Boards */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className="fas fa-sitemap" aria-hidden />
            </span>
            <div>
              <h2>Органи и одбори</h2>
              <p>Кликните на одбор за детаљне информације о саставу</p>
            </div>
          </div>

          <div className={styles.boardsStack}>
            {BOARDS.map((board, idx) => (
              <BoardCard key={idx} board={board} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <h2>Потребне су вам додатне информације?</h2>
            <p>
              За питања о раду органа и одбора Института, контактирајте нас.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" href="/kontakt">
                <i className="fas fa-phone" aria-hidden />
                Контактирајте нас
              </Button>
              <Button variant="secondary" href="/o-institutu">
                <i className="fas fa-hospital" aria-hidden />
                О Институту
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
