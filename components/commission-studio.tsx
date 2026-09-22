'use client';

import { Camera, Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { social } from '@/lib/site';

const topics = ['Une naissance', 'Un lieu', 'La mer', 'La nature', 'La musique', 'Une histoire personnelle'];
const formats = [
  'Petit format',
  'Format carré',
  'Format vertical',
  'Grand format',
  'Je souhaite être conseillé(e)',
];

export function CommissionStudio() {
  const [topic, setTopic] = useState(topics[0]);
  const [format, setFormat] = useState(formats[1]);
  const [words, setWords] = useState('');
  const [copied, setCopied] = useState(false);
  const brief = `Bonjour Nathalie,\n\nJ’aimerais imaginer une œuvre sur mesure.\nThème : ${topic}\nFormat : ${format}\nMes quelques mots : ${words || 'à préciser ensemble'}\n\nPouvez-vous me dire comment poursuivre ?`;
  async function copy() {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[.82fr_1.18fr]">
      <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-clay">Votre idée prend forme</p>
        <h2 className="mt-5 font-serif text-5xl">Un brief simple, avant le premier trait.</h2>
        <div className="mt-9 rounded-2xl bg-white/6 p-6">
          <p className="whitespace-pre-line text-sm leading-7 text-white/65">{brief}</p>
        </div>
        <p className="mt-5 text-xs leading-6 text-white/38">
          Cette maquette ne transmet aucune donnée. Vous copiez le message puis choisissez le canal d’échange.
        </p>
      </div>
      <div className="p-7 sm:p-10">
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
        <label htmlFor="words" className="mt-8 block text-sm font-bold">
          3. Quelques mots qui comptent
        </label>
        <textarea
          id="words"
          value={words}
          onChange={(event) => setWords(event.target.value)}
          rows={4}
          className="mt-3 w-full rounded-xl border border-white/15 bg-white/6 p-4 text-sm text-white placeholder:text-white/28"
          placeholder="Un prénom, une date, une émotion, un souvenir…"
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={copy} className="button-light">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Brief copié' : 'Copier mon brief'}
          </button>
          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            className="button-ghost border-white/20 text-white"
          >
            <Camera className="size-4" /> Continuer sur Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
