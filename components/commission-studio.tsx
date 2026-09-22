'use client';

import { Camera, Check, Copy, Mail, X } from 'lucide-react';
import { useState } from 'react';

import { artworkBySlug } from '@/lib/artworks';
import { contact, social } from '@/lib/site';

const topics = ['Une naissance', 'Un lieu', 'La mer', 'La nature', 'La musique', 'Une histoire personnelle'];
const formats = [
  'Petit format',
  'Format carré',
  'Format vertical',
  'Grand format',
  'Je souhaite être conseillé(e)',
];

export function CommissionStudio({ initialSelection = [] }: { initialSelection?: string[] }) {
  const [selection, setSelection] = useState(() =>
    initialSelection.map((slug) => artworkBySlug(slug)).filter((artwork) => artwork !== undefined),
  );
  const [topic, setTopic] = useState(topics[0]);
  const [format, setFormat] = useState(formats[1]);
  const [words, setWords] = useState('');
  const [copied, setCopied] = useState(false);
  const hasSelection = selection.length > 0;

  const brief = hasSelection
    ? `Bonjour Nathalie,\n\nJe suis intéressé(e) par ${selection.length > 1 ? 'ces œuvres' : 'cette œuvre'} :\n${selection.map((artwork) => `— ${artwork.title} (${artwork.format})`).join('\n')}\n\nJ’aimerais connaître la disponibilité, le prix et les conditions.\nMes quelques mots : ${words || 'à préciser ensemble'}\n\nPouvez-vous me dire comment poursuivre ?`
    : `Bonjour Nathalie,\n\nJ’aimerais imaginer une œuvre sur mesure.\nThème : ${topic}\nFormat : ${format}\nMes quelques mots : ${words || 'à préciser ensemble'}\n\nPouvez-vous me dire comment poursuivre ?`;

  const subject = encodeURIComponent(
    hasSelection ? `Demande — ${selection.map((artwork) => artwork.title).join(', ')}` : `Une œuvre sur mesure — ${topic}`,
  );
  const mailto = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(brief)}`;

  async function copy() {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[.82fr_1.18fr]">
      <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-clay">
          {hasSelection ? 'Votre sélection' : 'Votre idée prend forme'}
        </p>
        <h2 className="mt-5 font-serif text-5xl">
          {hasSelection ? 'Un message prêt, avant le premier échange.' : 'Un brief simple, avant le premier trait.'}
        </h2>
        <div key={`${topic}-${format}-${selection.length}`} className="anim-fade mt-9 rounded-2xl bg-white/6 p-6">
          <p className="whitespace-pre-line text-sm leading-7 text-white/65">{brief}</p>
        </div>
        <p className="mt-5 text-xs leading-6 text-white/60">
          Le bouton ouvre votre messagerie avec ce message prêt à envoyer. Rien n’est transmis sans votre accord.
        </p>
      </div>
      <div className="p-7 sm:p-10">
        {hasSelection ? (
          <fieldset>
            <legend className="text-sm font-bold">
              {selection.length > 1 ? 'Les œuvres qui vous intéressent' : 'L’œuvre qui vous intéresse'}
            </legend>
            <ul className="mt-4 flex flex-wrap gap-2">
              {selection.map((artwork) => (
                <li key={artwork.slug}>
                  <button
                    type="button"
                    onClick={() => setSelection((current) => current.filter((item) => item.slug !== artwork.slug))}
                    className="choice-dark is-on inline-flex items-center gap-2"
                    aria-label={`Retirer ${artwork.title}`}
                  >
                    {artwork.title} <X className="size-3" />
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : (
          <>
            <fieldset>
              <legend className="text-sm font-bold">1. Le point de départ</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    aria-pressed={topic === item}
                    className={`choice-dark ${topic === item ? 'is-on' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-8">
              <legend className="text-sm font-bold">2. La présence dans la pièce</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {formats.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFormat(item)}
                    aria-pressed={format === item}
                    className={`choice-dark text-left ${format === item ? 'is-on' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}
        <label htmlFor="words" className="mt-8 block text-sm font-bold">
          {hasSelection ? 'Quelques mots pour Nathalie' : '3. Quelques mots qui comptent'}
        </label>
        <textarea
          id="words"
          value={words}
          onChange={(event) => setWords(event.target.value)}
          rows={4}
          className="field mt-3 w-full rounded-xl border border-white/15 bg-white/6 p-4 text-sm text-white placeholder:text-white/60"
          placeholder={hasSelection ? 'Une question, une pièce à imaginer, un délai…' : 'Un prénom, une date, une émotion, un souvenir…'}
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={mailto} className="button-light">
            <Mail className="size-4" /> Envoyer à Nathalie
          </a>
          <button type="button" onClick={copy} className="button-ghost">
            {copied ? <Check key="check" className="size-4 animate-pop" /> : <Copy key="copy" className="size-4" />}
            {copied ? 'Copié' : 'Copier le message'}
          </button>
          <a href={social.instagram} target="_blank" rel="noreferrer" className="button-ghost">
            <Camera className="size-4" /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
