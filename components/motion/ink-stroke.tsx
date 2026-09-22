import type { CSSProperties, ReactNode } from 'react';

type InkStrokeProps = {
  children: ReactNode;
  /** `ring` entoure le mot, `underline` le souligne. */
  variant?: 'ring' | 'underline';
  /** Délai avant que le trait ne commence à se dessiner, en ms. */
  delay?: number;
  className?: string;
};

const paths = {
  ring: {
    viewBox: '0 0 200 80',
    d: 'M 28 62 C 40 10, 150 -2, 186 30 C 210 52, 150 82, 90 78 C 30 76, 4 52, 22 34 C 40 14, 120 6, 176 26',
  },
  underline: {
    viewBox: '0 0 200 20',
    d: 'M 4 13 C 40 4, 80 17, 120 9 C 150 3, 176 13, 196 7',
  },
};

/**
 * Un trait d'encre qui se dessine autour (ou sous) un mot, en CSS pur.
 * À poser sur le mot accentué d'un titre : `<InkStroke><em>visible.</em></InkStroke>`.
 * La couleur du trait est celle du texte parent (`currentColor`).
 */
export function InkStroke({ children, variant = 'ring', delay = 1300, className = '' }: InkStrokeProps) {
  const { viewBox, d } = paths[variant];
  const style = { '--ink-delay': `${delay}ms` } as CSSProperties;
  return (
    <span className={`ink-stroke ink-${variant} ${className}`} style={style}>
      {children}
      <svg viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
        <path d={d} pathLength={1} vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
