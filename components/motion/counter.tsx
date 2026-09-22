'use client';

import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  to: number;
  /** Durée du comptage, en ms. */
  duration?: number;
  className?: string;
};

/**
 * Compte de 0 jusqu'à `to` la première fois que l'élément entre dans le viewport.
 * Rendu côté serveur avec la valeur finale (pas de saut visuel) ; l'animation ne
 * se joue que si l'élément arrive en vue après le chargement.
 */
export function Counter({ to, duration = 1400, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          // Déjà visible au chargement : on garde la valeur finale.
          if (entry.isIntersecting) {
            observer.disconnect();
            return;
          }
        }
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.round(eased * to));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setDisplay(to);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
