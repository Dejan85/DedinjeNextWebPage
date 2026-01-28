"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  target: number;
  label: string;
  icon: string;
}

export default function StatCounter({ target, label, icon }: StatCounterProps) {
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
    <div className="stat-item" ref={counterRef}>
      <div className="stat-icon">
        <i className={icon}></i>
      </div>
      <div className="stat-number">{count.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
