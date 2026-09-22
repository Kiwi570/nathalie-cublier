import type { ReactNode } from 'react';

type LinesProps = {
  /** Une entrée par ligne du titre. */
  lines: ReactNode[];
  /** Délai avant la première ligne, en ms. */
  delay?: number;
  /** Écart entre deux lignes, en ms. */
  step?: number;
};

/**
 * Révèle un titre ligne par ligne : chaque ligne monte depuis un masque.
 * Animation CSS pure, jouée dès le premier rendu (sans attendre l'hydratation).
 * À placer directement dans un <h1> / <h2>.
 */
export function Lines({ lines, delay = 140, step = 110 }: LinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <span style={{ animationDelay: `${delay + index * step}ms` }}>{line}</span>
        </span>
      ))}
    </>
  );
}
