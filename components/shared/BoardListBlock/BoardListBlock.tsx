"use client";

import { useState } from "react";
import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./BoardListBlock.module.css";

export interface BoardMember {
  name: string;
  role?: string;
}

export interface BoardItem {
  icon?: string;
  title: string;
  chairman: BoardMember;
  viceChairman?: BoardMember;
  membersLabel?: string;
  members: BoardMember[];
}

interface BoardListBlockProps {
  heading?: string;
  subtitle?: string;
  boards: BoardItem[];
  background?: "white" | "gray";
}

function BoardCard({ board }: { board: BoardItem }) {
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
          <i className={board.icon || "fas fa-users"} aria-hidden />
        </div>
        <h3>{board.title}</h3>
        <span className={styles.boardChevron}>
          <i className={`fas fa-chevron-${open ? "up" : "down"}`} aria-hidden />
        </span>
      </button>

      {open && (
        <div className={styles.boardCardBody}>
          <div className={styles.leaderCard}>
            <span className={styles.leaderIcon}>
              <i className="fas fa-crown" aria-hidden />
            </span>
            <div>
              <span className={styles.leaderRole}>{board.chairman.role}</span>
              <strong>{board.chairman.name}</strong>
            </div>
          </div>

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

          <div className={styles.membersBlock}>
            {board.membersLabel && <h4>{board.membersLabel}</h4>}
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

export default function BoardListBlock({
  heading,
  subtitle,
  boards,
  background = "white",
}: BoardListBlockProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <div>
              <h2>{heading}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        )}
        <div className={styles.boardsStack}>
          {boards.map((board, idx) => (
            <BoardCard key={idx} board={board} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
