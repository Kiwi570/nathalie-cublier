'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Balise rendue (div par défaut). */
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol' | 'header' | 'footer' | 'aside';
  /** Délai avant le départ, en ms. */
  delay?: number;
  /** Distance de montée, en px. */
  y?: number;
  /** Échelle de départ (0.96 pour une image, par exemple). */
  scale?: number;
  /** Si défini, ce sont les enfants directs qui entrent l'un après l'autre (écart en ms). */
  stagger?: number;
  /** Part de l'élément visible avant de déclencher (0 → 1). */
  threshold?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Révèle son contenu quand il entre dans le viewport.
 * - Sans JS : rien n'est masqué (la classe `.js` posée dans layout.tsx conditionne le masquage).
 * - Une fois l'entrée terminée, les attributs sont retirés : l'élément retrouve
 *   exactement ses styles d'origine (transitions, transformations au survol…).
 */
export function Reveal({
  children,
  className = '',
  as = 'div',
  delay = 0,
  y = 28,
  scale = 1,
  stagger,
  threshold = 0.15,
  id,
  style,
}: RevealProps) {
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const step = stagger ?? 0;
    const children = step ? Array.from(element.children) : [];
    children.forEach((child, index) => {
      (child as HTMLElement).style.transitionDelay = `${delay + index * step}ms`;
    });
    if (!step) element.style.transitionDelay = `${delay}ms`;

    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        element.classList.add('is-in');
        const total = delay + children.length * step + 1200;
        timer = window.setTimeout(() => {
          element.removeAttribute('data-reveal');
          element.removeAttribute('data-stagger');
          element.classList.remove('is-in');
          element.style.transitionDelay = '';
          children.forEach((child) => {
            (child as HTMLElement).style.transitionDelay = '';
          });
        }, total);
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay, stagger, threshold]);

  const vars = { '--ry': `${y}px`, '--rs': String(scale), ...style } as CSSProperties;

  return (
    <Tag ref={ref} id={id} className={className} style={vars} data-reveal="" data-stagger={stagger ? '' : undefined}>
      {children}
    </Tag>
  );
}
