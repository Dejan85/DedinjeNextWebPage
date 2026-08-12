"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatCounter.module.css";

interface StatCounterProps {
  target: number;
  label: string;
  icon: string;
  suffix?: string;
}

export default function StatCounter({ target, label, icon, suffix = "" }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const animate = () => {
      current += step;
      if (current < target) {
        setCount(Math.floor(current));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animate();
  }, [isVisible, target]);

  return (
    <div className={styles.statItem} ref={counterRef}>
      <div className={styles.statIcon}>
        <i className={icon}></i>
      </div>
      {/* data-no-translit: brojka se menja posle mount-a (animacija); globalni
          transliteration MutationObserver kešira "originalni" tekst samo pri
          prvom viđenju node-a i posle prepisuje svaku React izmenu preko toga,
          pa bi bez ovoga brojač uvek ostajao zaglavljen na "0". */}
      <div className={styles.statNumber} data-no-translit>
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}
