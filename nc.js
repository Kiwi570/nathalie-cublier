/* =====================================================================
   NATHALIE CUBLIER — script commun : données, mandala, navigation,
   transition entre pages, tuiles, loupe, visionneuse, formulaire
   ===================================================================== */
window.NC = (() => {
  'use strict';
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches, hover = matchMedia('(hover:hover)').matches;
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------------- Les 25 œuvres (galerie actuelle) ---------------- */
  const W = 'https://static.wixstatic.com/media/890b5a_';
  const TH = {nature:'Nature et fleurs', enfance:"L'enfance", mer:'La mer et les voyages', arts:'La table, la musique, le cinéma', formes:'Formes, miroirs et objets'};
  const WORKS = [
    {id:'envol-de-ballons', img:'7ee259d425f0442599bdb1f60605019c', ext:'jpg', t:"L'envol de ballons", f:'80 × 80 cm', st:'vendu', th:'enfance', w:315, h:302, hist:'Des ballons qui montent, chacun rempli d\'un motif différent. Une des premières toiles carrées de grand format.'},
    {id:'feuilles-d-etain', img:'73136895b904448bbb96124e93dd7616', ext:'png', t:"Feuilles d'étain", f:'70 × 50 cm hors cadre', st:'vendu', th:'formes', w:315, h:445, hist:'Des feuilles longues, dessinées en nervures d\'étain, sur une toile verticale.'},
    {id:'music', img:'ff7c00c371d64e6182bd34c04bf95e8d', ext:'jpeg', t:'Music', f:'80 × 80 cm hors cadre', st:'vendu', th:'arts', w:315, h:313, hist:'Portées, clés, notes et cercles de vinyle : la musique traduite en motifs répétés.'},
    {id:'ovale-fleuri', img:'4a0011fe0ee54fa2a58b1665f2d2de06', ext:'png', t:'Ovale fleuri', f:'', st:'vendu', th:'nature', w:315, h:265, hist:'Un ovale rempli de fleurs, le premier d\'une série de deux.'},
    {id:'mandalas', img:'b4c4690bf31f4edcb56cfd204d6c2580', ext:'jpg', t:'Mandalas', f:'120 × 40 cm hors cadre', st:'dispo', th:'formes', w:315, h:130, hist:'Un format panoramique, trois mandalas côte à côte. La pièce la plus proche du Zentangle pur.'},
    {id:'fleur-eternelle', img:'907b1bdf4c2745c1bc7b7e5aa56e5ca0', ext:'png', t:'Fleur éternelle', f:'60 × 60 cm hors cadre', st:'dispo', th:'nature', w:315, h:316, hist:'Une seule fleur, en couches de pétales, chaque couche avec son motif. Environ 150 heures.'},
    {id:'lotus', img:'4567d09e0fba454994626c56e3d90f12', ext:'jpeg', t:'Lotus', f:'50 × 50 cm hors cadre', st:'vendu', th:'nature', w:315, h:322, hist:'Le lotus, symbole de patience : un motif par pétale.'},
    {id:'a-table', img:'84fed7b0e0234a4c82d42634b52388d9', ext:'jpeg', t:'À table !', f:'60 × 73 cm', st:'vendu', th:'arts', w:315, h:383, hist:'Couverts, casseroles et grains de café deviennent des tangles. Le premier tableau sur le thème de la cuisine.'},
    {id:'coeur-en-fete', img:'a5de6742d7a344bc9141af36b57bee51', ext:'jpeg', t:'Cœur en fête', f:'60 × 73 cm hors cadre', st:'dispo', th:'nature', w:315, h:379, hist:'Un cœur débordant de fleurs et de rubans, en hauteur.'},
    {id:'en-mer', img:'eba99119bfb34aa49d11c5f0e26197b7', ext:'png', t:'En mer', f:'80 × 80 cm hors cadre', st:'dispo', th:'mer', w:315, h:313, hist:'Vagues en écailles, bancs de poissons en points, une rose des vents. Disponible.'},
    {id:'les-4-saisons', img:'94814d8a154b4200994e95f2e6be959e', ext:'png', t:'Les 4 saisons', f:'Diamètre 110 cm, miroir 74 cm', st:'dispo', th:'formes', w:315, h:303, rel:'Un miroir de 74 cm entouré de quatre quartiers dessinés, dans un tour en fer forgé noir.', hist:'Le printemps, l\'été, l\'automne, l\'hiver, autour d\'un vrai miroir. Une pièce à accrocher comme un objet.'},
    {id:'attrape-coeur', img:'7382af884ff04770a4417122468760c1', ext:'jpg', t:'Attrape-cœur', f:'38 × 55 cm hors cadre', st:'dispo', th:'formes', w:315, h:453, hist:'Un attrape-rêves en forme de cœur, plumes et perles dessinées.'},
    {id:'ovale-fleuri-2', img:'d1052b2508a1454c851d318b8aa59fc3', ext:'png', t:'Ovale fleuri 2', f:'30 × 35 cm', st:'vendu', th:'nature', w:315, h:264, hist:'Le second ovale, en petit format.'},
    {id:'les-myrtes', img:'dad5c71942154b28b5b4e3f664405491', ext:'jpg', t:'Les myrtes', f:'Toile 100 × 100 cm hors cadre', st:'vendu', th:'nature', w:315, h:311, hist:'Le plus grand format : un mètre sur un mètre, des branches de myrte en motifs serrés. Près de 200 heures.'},
    {id:'fossiles', img:'1ff91767be524dfd95147b34bee6bcc7', ext:'jpg', t:'Fossiles', f:'50 × 50 cm hors cadre', st:'dispo', th:'formes', w:315, h:315, rel:'Les pétales des fleurs sont de vrais fossiles d\'orthoceras, collés sur la toile.', hist:'Des fleurs dont les pétales ont quatre cents millions d\'années. L\'encre relie les fossiles entre eux.'},
    {id:'envol-de-papillons', img:'ef4311a39a094beb866707b4bbd18fa1', ext:'png', t:'Envol de papillons', f:'Toile noire 60 × 73, toile blanche 30 × 30', st:'dispo', th:'nature', w:315, h:380, rel:'Les papillons sont en relief, collés sur la toile. Deux toiles, une noire et une blanche, se répondent.', hist:'Les papillons quittent la petite toile blanche pour la grande toile noire.'},
    {id:'miroirs', img:'fdbde0bb40724301b30425c3dd9c6747', ext:'jpg', t:'Miroirs', f:'60 × 60 cm hors cadre', st:'vendu', th:'formes', w:315, h:314, rel:'Les ronds sont de vrais miroirs, sertis dans le dessin.', hist:'On se voit dans le tableau : les cercles reflètent la pièce où il est accroché.'},
    {id:'familles-de-papillons', img:'fdbf7298102340679759a3d9401b74ce', ext:'png', t:'Familles de papillons', f:'40 × 40 cm hors cadre', st:'dispo', th:'nature', w:315, h:311, hist:'Petits, moyens, grands : des papillons par familles, chaque aile avec son tangle.'},
    {id:'l-instant-fige', img:'535605455b78496da0f28a9b5ca9629e', ext:'jpg', t:"L'instant figé", f:'60 × 60 cm hors cadre', st:'dispo', th:'formes', w:315, h:313, rel:'Une véritable horloge, customisée : elle donne l\'heure.', hist:'Le tableau fonctionne. Les aiguilles tournent sur un cadran de motifs.'},
    {id:'le-7e-art', img:'462187c0639141c185469dd7785ca2e2', ext:'jpg', t:'Le 7ᵉ art', f:'80 × 80 cm hors cadre', st:'vendu', th:'arts', w:315, h:328, hist:'Clap, pellicule, projecteur : le cinéma en noir et blanc, forcément.'},
    {id:'reves-d-enfants', img:'03cd0a4e4b52411ea91b610307862a34', ext:'png', t:"Rêves d'enfants", f:'80 × 80 cm hors cadre', st:'dispo', th:'enfance', w:315, h:316, hist:'Tout ce qu\'un enfant dessine : lune, étoiles, fusée, animaux, en tangles.'},
    {id:'pancarte-chambre-d-enfant', img:'97f35ef6716b47c69e0c106a2c387dda', ext:'png', t:"Pancarte de chambre d'enfant", f:'20 × 20 cm', st:'vendu', th:'enfance', w:315, h:341, hist:'Un petit format pour une porte de chambre.'},
    {id:'face-a-face', img:'37f5edfd86d148b387018cfc027bb39d', ext:'jpg', t:'Face à face', f:'60 × 30 cm hors cadre', st:'dispo', th:'formes', w:315, h:178, hist:'Deux profils qui se regardent, un format allongé.'},
    {id:'l-envol-de-l-enfance', img:'8a51f6c8f6a84ef893a1c5932f5ee814', ext:'jpg', t:"L'envol de l'enfance", f:'60 × 60 cm hors cadre', st:'dispo', th:'enfance', w:315, h:316, hist:'Un enfant, des ballons, et le vent dans les motifs.'},
    {id:'charlie', img:'0b3553ee3217477691c3a6a33d378959', ext:'png', t:'Charlie', f:'', st:'cmd', th:'enfance', w:315, h:399, hist:'Commande pour un cadeau de naissance : le prénom structure le tableau, les tangles le remplissent.'},
  ];
  const ST = {dispo:'Disponible', vendu:'Vendu', cmd:'Commande'};
  const src = (a, w) => `${W}${a.img}~mv2.${a.ext}/v1/fill/w_${w},h_${Math.round(a.h/a.w*w)},al_c,q_88/${a.id}.${a.ext}`;
  const byId = id => WORKS.find(x => x.id === id);
  /* estimation d'heures d'après le format : entre 100 et 200 h, à caler avec l'artiste */
  const dims = a => { const m = (a.f || '').match(/(\d+)\s*×\s*(\d+)/); if (m) return [+m[1], +m[2]]; const d = (a.f || '').match(/Diamètre\s*(\d+)/); if (d) return [+d[1], +d[1]]; return [60, 60]; };
  const hrs = a => { const [w, h] = dims(a); return Math.round(100 + Math.min(100, w*h/64)); };
  const jours = h => `${Math.round(h/5)} journées de cinq heures`;
  const prix = h => [Math.round(h*4/50)*50, Math.round(h*8/50)*50];
  const eur = n => n.toLocaleString('fr-FR') + ' €';
  const url = a => `/tableau/${a.id}`;
  const SEL = new Set(JSON.parse(sessionStorage.getItem('nc-sel') || '[]'));
  const saveSel = () => { sessionStorage.setItem('nc-sel', JSON.stringify([...SEL])); $$('.ico[data-open="sel"] b').forEach(b => { b.textContent = SEL.size; b.classList.toggle('on', SEL.size > 0); }); $$('.ico[data-open="sel"]').forEach(i => i.classList.toggle('on', SEL.size > 0)); };
  const HEART = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';

  /* ---------------- Tuiles ---------------- */
  const tile = a => `<article class="work" data-id="${a.id}" data-st="${a.st}" data-rel="${a.rel ? 1 : 0}"><div class="fr" data-zoom="${a.id}" role="button" tabindex="0" aria-label="Voir le trait de ${a.t}"><img src="${src(a,800)}" alt="${a.t}" loading="lazy" width="${a.w}" height="${a.h}"><span class="lens"></span>${a.st === 'dispo' ? '<span class="sc">NC</span>' : ''}<a class="fiche" href="${url(a)}">Voir la fiche</a></div><button class="heart${SEL.has(a.id) ? ' on' : ''}" data-heart="${a.id}" aria-label="Ajouter ${a.t} à ma sélection">${HEART}</button><div class="cap"><div><a href="${url(a)}"><b>${a.t}</b></a>${a.f ? `<br><span>${a.f}</span>` : ''}</div><span class="st ${a.st}">${ST[a.st]}</span></div></article>`;
  const bindLens = root => { if (!hover) return; root.addEventListener('pointermove', e => { const fr = e.target.closest('.fr'); if (!fr) return; const img = fr.querySelector('img'), lens = fr.querySelector('.lens'); if (!lens) return; const r = fr.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, Z = 2.6; lens.style.left = x + 'px'; lens.style.top = y + 'px'; lens.style.backgroundImage = `url(${img.currentSrc || img.src})`; lens.style.backgroundSize = `${r.width*Z}px ${r.height*Z}px`; lens.style.backgroundPosition = `${-(x*Z - 75)}px ${-(y*Z - 75)}px`; }); };

  /* ---------------- Visionneuse : zoom sur le trait ---------------- */
  let zoomer;
  const ensureZoomer = () => { if (zoomer) return zoomer; zoomer = document.createElement('div'); zoomer.className = 'zoomer'; zoomer.setAttribute('role','dialog'); zoomer.setAttribute('aria-modal','true'); zoomer.innerHTML = `<img id="z-img" alt=""><div class="bar"><b id="z-t"></b><button class="close" id="z-close" aria-label="Fermer">×</button></div><span class="hint">Molette ou pincement pour zoomer, glisser pour se déplacer</span><div class="zl"><button id="z-minus" aria-label="Réduire">−</button><button id="z-plus" aria-label="Agrandir">+</button></div>`; document.body.appendChild(zoomer);
    const img = $('#z-img', zoomer); let s = 1, tx = 0, ty = 0, ptrs = new Map(), last = null, lastD = 0, lastF = null;
    const apply = () => { img.style.transform = `translate(${tx}px,${ty}px) scale(${s})`; };
    const fit = () => { const vw = innerWidth, vh = innerHeight - 40, iw = img.naturalWidth || 1000, ih = img.naturalHeight || 1000; const k = Math.min(vw*.9/iw, vh*.9/ih); img.style.width = iw*k + 'px'; s = 1; tx = -iw*k/2; ty = -ih*k/2 + 10; apply(); };
    img.onload = fit; addEventListener('resize', () => zoomer.classList.contains('on') && fit());
    const zoomAt = (f, cx, cy) => { const ns = Math.max(.6, Math.min(5, s*f)); const rx = cx - innerWidth/2, ry = cy - innerHeight/2; tx = rx - (rx - tx)*(ns/s); ty = ry - (ry - ty)*(ns/s); s = ns; apply(); };
    zoomer.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.15 : 1/1.15, e.clientX, e.clientY); }, {passive:false});
    zoomer.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]); last = [e.clientX, e.clientY]; zoomer.setPointerCapture(e.pointerId); img.style.cursor = 'grabbing'; });
    zoomer.addEventListener('pointermove', e => { if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]); const p = [...ptrs.values()]; if (p.length === 2) { const d = Math.hypot(p[0][0]-p[1][0], p[0][1]-p[1][1]); if (lastD) zoomAt(d/lastD, (p[0][0]+p[1][0])/2, (p[0][1]+p[1][1])/2); lastD = d; } else if (last) { tx += e.clientX - last[0]; ty += e.clientY - last[1]; last = [e.clientX, e.clientY]; apply(); } });
    const up = e => { ptrs.delete(e.pointerId); lastD = 0; last = null; img.style.cursor = 'grab'; };
    zoomer.addEventListener('pointerup', up); zoomer.addEventListener('pointercancel', up);
    $('#z-plus', zoomer).onclick = () => zoomAt(1.3, innerWidth/2, innerHeight/2); $('#z-minus', zoomer).onclick = () => zoomAt(1/1.3, innerWidth/2, innerHeight/2);
    const close = () => { zoomer.classList.remove('on'); document.body.style.overflow = ''; lastF?.focus?.(); };
    zoomer.addEventListener('keydown', e => { if (e.key !== 'Tab') return; const f = $$('button', zoomer); const first = f[0], last = f[f.length-1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } });
    $('#z-close', zoomer).onclick = close; addEventListener('keydown', e => { if (e.key === 'Escape' && zoomer.classList.contains('on')) close(); });
    zoomer.open = a => { lastF = document.activeElement; $('#z-t', zoomer).textContent = a.t; img.src = src(a, 2000); img.alt = a.t; zoomer.classList.add('on'); document.body.style.overflow = 'hidden'; if (img.complete) fit(); $('#z-close', zoomer).focus(); };
    return zoomer; };
  const bindZoom = root => { root.addEventListener('click', e => { if (e.target.closest('a')) return; const fr = e.target.closest('[data-zoom]'); if (!fr) return; ensureZoomer().open(byId(fr.dataset.zoom)); }); root.addEventListener('keydown', e => { const fr = e.target.closest('[data-zoom]'); if (fr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); ensureZoomer().open(byId(fr.dataset.zoom)); } }); };

  /* ---------------- Mandala qui se dessine ---------------- */
  const mandala = (svg, opts = {}) => {
    const NS = 'http://www.w3.org/2000/svg', C = 260, els = [];
    const add = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); svg.appendChild(e); els.push(e); return e; };
    const pt = (r, a) => [C + r*Math.cos(a), C + r*Math.sin(a)];
    add('circle', {cx:C, cy:C, r:240, 'stroke-width':1}); add('circle', {cx:C, cy:C, r:228, 'stroke-width':.8});
    for (let i = 0; i < 24; i++) { const a = i/24*Math.PI*2, b = (i+1)/24*Math.PI*2, [x1,y1] = pt(228,a), [x2,y2] = pt(228,b), [mx,my] = pt(198,(a+b)/2); add('path', {d:`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, 'stroke-width':1}); }
    add('circle', {cx:C, cy:C, r:196, 'stroke-width':.8});
    for (let i = 0; i < 36; i++) { const a = i/36*Math.PI*2, [x1,y1] = pt(196,a), [x2,y2] = pt(170,a + .05), [x3,y3] = pt(196,a + .1); add('path', {d:`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`, 'stroke-width':.9}); }
    add('circle', {cx:C, cy:C, r:168, 'stroke-width':.8});
    for (let i = 0; i < 12; i++) { const a = i/12*Math.PI*2, [x0,y0] = pt(168,a), [x1,y1] = pt(120,a - .18), [x2,y2] = pt(120,a + .18); add('path', {d:`M${x0} ${y0} C${x1} ${y1} ${x2} ${y2} ${x0} ${y0}`, 'stroke-width':1}); const [q1,r1] = pt(146,a - .09), [q2,r2] = pt(146,a + .09), [q0,r0] = pt(166,a); add('path', {d:`M${q0} ${r0} C${q1} ${r1} ${q2} ${r2} ${q0} ${r0}`, 'stroke-width':.8}); }
    add('circle', {cx:C, cy:C, r:118, 'stroke-width':.8});
    for (let i = 0; i < 8; i++) { const a = i/8*Math.PI*2; let d = ''; for (let t = 0; t <= 1; t += .05) { const r = 100 - t*20, ang = a + t*Math.PI*1.4; const [x,y] = pt(r, ang); d += (t === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '; } add('path', {d, 'stroke-width':1}); }
    for (let i = 0; i < 16; i++) { const a = i/16*Math.PI*2, [x,y] = pt(108,a); add('circle', {cx:x, cy:y, r:2.4, 'stroke-width':1}); }
    for (let i = 0; i < 12; i++) { const a = i/12*Math.PI*2, [x0,y0] = pt(96,a), [x1,y1] = pt(84,a - .12), [x2,y2] = pt(84,a + .12); add('path', {d:`M${x0} ${y0} L${x1} ${y1} L${x2} ${y2} Z`, 'stroke-width':.9}); }
    add('circle', {cx:C, cy:C, r:80, 'stroke-width':1});
    const lens = els.map(e => e.getTotalLength()), total = lens.reduce((s,l) => s + l, 0);
    els.forEach((e,i) => { e.style.strokeDasharray = lens[i] + ' ' + lens[i]; e.style.strokeDashoffset = lens[i]; });
    const setP = p => { let acc = 0; els.forEach((e,i) => { const s = acc/total, d = lens[i]/total; acc += lens[i]; const q = Math.max(0, Math.min(1, (p - s)/d)); e.style.strokeDashoffset = lens[i]*(1 - q); }); opts.onProgress?.(p); };
    let raf, touched = false;
    const play = () => { cancelAnimationFrame(raf); if (rm) { setP(1); return; } const t0 = performance.now(), dur = opts.dur || 9000; const step = now => { const p = Math.min(1, (now - t0)/dur); setP(p*p*(3-2*p)); if (p < 1 && !touched) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); };
    return {setP, play, stop: () => { touched = true; cancelAnimationFrame(raf); }, reset: () => { touched = false; }};
  };

  /* ---------------- Navigation, transitions, reveals ---------------- */
  const PAGES = [['/','Accueil'],['/tableaux','Tableaux'],['/commander','Commander'],['/atelier',"L'atelier"]];
  const here = (location.pathname.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '') || '/').replace(/^\/tableau\/.+$/, '/tableau');
  const RIBBON = true; /* passer à false pour retirer le bandeau de maquette */
  const encours = cb => fetch('/encours.json', {cache:'no-store'}).then(r => r.json()).then(cb).catch(() => cb(null));
  const echelle = (box, a) => { const [w, h] = dims(a); const MUR = 300; box.innerHTML = `<div class="sol"></div><div class="silh"><svg viewBox="0 0 60 170" aria-hidden="true"><circle cx="30" cy="16" r="12" fill="#B9B4AA"/><path d="M18 34h24c8 0 12 6 12 14v50h-8v66h-8V98h-4v66h-8V98h-8V48c0-8 4-14 12-14z" fill="#B9B4AA"/></svg></div><div class="tab"><img src="${src(a, 800)}" alt=""></div><span class="lg"><i></i>50 cm</span>`; const draw = () => { const px = box.clientWidth / MUR; const t = $('.tab', box); t.style.width = (w*px) + 'px'; t.style.height = (h*px) + 'px'; $('.lg i', box).style.width = (50*px) + 'px'; }; draw(); addEventListener('resize', draw); return {draw, set: (nw, nh) => { const px = box.clientWidth / MUR; const t = $('.tab', box); t.style.width = (nw*px) + 'px'; t.style.height = (nh*px) + 'px'; }}; };
  const MURS = [['#EFEDE8','Blanc cassé'],['#DCD6C8','Lin'],['#B7BFB2','Sauge'],['#5F6166','Anthracite']];
  const mursHTML = () => `<div class="murs"><span>Mur</span>${MURS.map(([c,n],i) => `<button type="button" aria-pressed="${i===0}" data-mur="${c}" style="background:${c}" aria-label="${n}"></button>`).join('')}</div>`;
  const bindMurs = (root, box) => root.addEventListener('click', e => { const b = e.target.closest('[data-mur]'); if (!b) return; $$('[data-mur]', root).forEach(x => x.setAttribute('aria-pressed', x === b)); box.style.setProperty('--mur', b.dataset.mur); });
  const PIECES = ['les-4-saisons','fossiles','envol-de-papillons','l-instant-fige','miroirs'];
  const pieceHTML = (a, i) => `<article class="piece"><div class="pim" data-zoom="${a.id}" role="button" tabindex="0" aria-label="Voir le trait de ${a.t}"><img src="${src(a, 1200)}" alt="${a.t}" loading="${i ? 'lazy' : 'eager'}"><span class="lens"></span></div><div><span class="no">0${i+1}</span><h2>${a.t}</h2><p class="what">${a.rel || ''}</p><p>${a.hist || ''}</p><p style="font-size:13.5px;color:var(--gris);margin-top:6px">${a.f || ''} · ${ST[a.st]}</p><div class="acts"><a class="btn btn-ink" href="${url(a)}">Voir la fiche</a>${a.st === 'dispo' ? '<button class="btn btn-line" data-open="ecrire">Demander cette pièce</button>' : ''}</div></div></article>`;
  const mountChrome = () => {
    const nav = document.createElement('header'); nav.className = 'nav'; nav.id = 'nav';
    nav.innerHTML = `<a class="brand" href="/"><span class="seal">NC</span><span>Nathalie Cublier<small>Tableaux à l'encre de Chine</small></span></a><nav aria-label="Navigation principale"><ul>${PAGES.slice(1).map(([h,l]) => `<li><a href="${h}"${here === h || (here === '/tableau' && h === '/tableaux') ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav><div class="tools"><button class="ico" data-open="sel" aria-label="Ma sélection">${HEART}<b>0</b></button><button class="btn btn-ink btn-res" data-open="ecrire">Écrire à Nathalie</button><button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span></button></div>`;
    document.body.prepend(nav);
    const menu = document.createElement('div'); menu.className = 'menu'; menu.id = 'menu'; menu.setAttribute('aria-hidden','true');
    menu.innerHTML = `<nav>${PAGES.map(([h,l]) => `<a href="${h}">${l}</a>`).join('')}<a href="/pieces">Pièces singulières</a></nav><button class="btn btn-w" data-open="ecrire">Écrire à Nathalie</button>`;
    nav.after(menu);
    const loader = document.createElement('div'); loader.className = 'loader'; loader.setAttribute('aria-hidden','true'); loader.innerHTML = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="30"/><path d="M50 20c14 14 14 46 0 60-14-14-14-46 0-60zM20 50c14-14 46-14 60 0-14 14-46 14-60 0z"/><circle cx="50" cy="50" r="6"/></svg>`; document.body.appendChild(loader);
    const foot = document.createElement('footer'); foot.innerHTML = `<div class="wrap f-row"><span>© 2026 Nathalie Cublier · Tableaux à l'encre de Chine · près de Cannes</span><span><a href="https://www.instagram.com/artetencredechine" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/profile.php?id=100030190873942" target="_blank" rel="noopener">Facebook</a> · <a href="/mentions-legales">Mentions légales</a></span><span>Site conçu par La P'tite Bulle</span></div>`; document.body.appendChild(foot);
    if (RIBBON) { const ribbon = document.createElement('div'); ribbon.className = 'ribbon'; ribbon.textContent = 'Maquette : photos et tarifs à valider avec l\'artiste'; document.body.appendChild(ribbon); }
    const mbar = document.createElement('div'); mbar.className = 'mbar'; mbar.innerHTML = `<a class="btn btn-line" href="/tableaux">Tableaux</a><button class="btn btn-ink" data-open="ecrire">Écrire</button>`; document.body.appendChild(mbar);
    const dSel = document.createElement('div'); dSel.className = 'drawer'; dSel.id = 'd-sel'; dSel.setAttribute('aria-hidden','true');
    dSel.innerHTML = `<div class="bg" data-close></div><div class="pan" role="dialog" aria-modal="true" aria-labelledby="d-sel-t"><div class="hd"><h2 id="d-sel-t">Ma sélection</h2><button class="x" data-close>Fermer</button></div><div class="sel-list" id="sel-list"></div><button class="btn btn-ink" id="sel-write">Écrire à propos de ces tableaux</button></div>`;
    const dEcr = document.createElement('div'); dEcr.className = 'drawer'; dEcr.id = 'd-ecrire'; dEcr.setAttribute('aria-hidden','true');
    dEcr.innerHTML = `<div class="bg" data-close></div><div class="pan" role="dialog" aria-modal="true" aria-labelledby="d-ecr-t"><div class="hd"><h2 id="d-ecr-t">Écrire à Nathalie</h2><button class="x" data-close>Fermer</button></div><p class="lead" style="font-size:15px">Une question, un tableau, un thème : dites-le simplement, elle répond elle-même sous quelques jours.</p><form class="form" novalidate><label class="fld"><span>Nom</span><input type="text" name="nom" required></label><label class="fld"><span>E-mail</span><input type="email" name="email" required></label><label class="fld"><span>Votre message</span><textarea name="msg" id="d-msg"></textarea></label><button class="btn btn-ink" type="submit">Envoyer</button><div class="ok">Message envoyé. Nathalie vous répond sous quelques jours.</div></form><p style="font-size:13px;color:var(--gris)">Pour une commande détaillée, la page <a href="/commander" style="text-decoration:underline">Commander</a> vous guide en quatre pas.</p></div>`;
    document.body.append(dSel, dEcr);
    let lastOpener = null;
    const renderSel = () => { const list = [...SEL].map(byId).filter(Boolean); $('#sel-list').innerHTML = list.length ? list.map(a => `<div class="sel-it"><img src="${src(a, 300)}" alt=""><div><a href="${url(a)}"><b>${a.t}</b></a><small>${a.f || ''} · ${ST[a.st]}</small></div><button data-heart="${a.id}">Retirer</button></div>`).join('') : '<div class="sel-empty">Aucun tableau pour l\'instant. Le petit cœur sur chaque œuvre.</div>'; $('#sel-write').style.display = list.length ? '' : 'none'; };
    const openDrawer = (k, opener) => { lastOpener = opener || null; if (k === 'sel') renderSel(); const d = k === 'sel' ? dSel : dEcr; d.classList.add('open'); d.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; toggleMenu(false); setTimeout(() => $('input,button.x', d)?.focus(), 350); };
    const closeDrawers = () => { [dSel, dEcr].forEach(d => { d.classList.remove('open'); d.setAttribute('aria-hidden','true'); }); document.body.style.overflow = ''; lastOpener?.focus?.(); };
    document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); openDrawer(o.dataset.open, o); return; } if (e.target.closest('[data-close]')) closeDrawers(); const h = e.target.closest('[data-heart]'); if (h) { e.preventDefault(); const id = h.dataset.heart; SEL.has(id) ? SEL.delete(id) : SEL.add(id); $$(`[data-heart="${id}"]`).forEach(x => x.classList.toggle('on', SEL.has(id))); saveSel(); if (dSel.classList.contains('open')) renderSel(); } });
    $('#sel-write').addEventListener('click', () => { const names = [...SEL].map(byId).filter(Boolean).map(a => a.t).join(', '); closeDrawers(); openDrawer('ecrire'); $('#d-msg').value = `Bonjour Nathalie, je m'intéresse à : ${names}. `; });
    [dSel, dEcr].forEach(d => d.addEventListener('keydown', e => { if (e.key !== 'Tab') return; const f = $$('a[href],button,input,textarea', d).filter(x => x.offsetParent); const first = f[0], last = f[f.length-1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }));
    addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawers(); });
    saveSel();
    addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 40), {passive:true}); nav.classList.toggle('solid', scrollY > 40 || document.body.dataset.solid === '1');
    const burger = $('#burger');
    const toggleMenu = o => { menu.classList.toggle('open', o); burger.classList.toggle('x', o); nav.classList.toggle('menu-open', o); burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o); document.body.style.overflow = o ? 'hidden' : ''; };
    burger.onclick = () => toggleMenu(!menu.classList.contains('open'));
    // transition : le mandala se dessine entre deux pages
    document.addEventListener('click', e => { const a = e.target.closest('a'); if (!a) return; if (a.hasAttribute('data-dead')) { e.preventDefault(); return; } const h = a.getAttribute('href') || ''; if (!h.startsWith('/') || a.target === '_blank') return; const path = h.split('#')[0].split('?')[0]; if (path === here && !h.includes('?')) return; e.preventDefault(); toggleMenu(false); if (rm) { location.href = h; return; } loader.classList.add('on'); setTimeout(() => location.href = h, 520); });
    addEventListener('pageshow', () => { loader.classList.remove('on'); document.body.classList.add('ready'); });
    const io = new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting) return; en.target.classList.add('in'); io.unobserve(en.target); }), {threshold:.12});
    $$('section, .rv').forEach(s => io.observe(s));
    $$('form.form').forEach(form => form.addEventListener('submit', e => { e.preventDefault(); const req = $$('[required]', form).find(i => !i.value.trim()); if (req) { req.focus(); return; } form.classList.add('sent'); }));
    requestAnimationFrame(() => setTimeout(() => { document.body.classList.add('ready'); $('.hero')?.classList.add('in'); }, 60));
  };
  document.addEventListener('DOMContentLoaded', mountChrome);
  return {WORKS, TH, ST, src, byId, tile, bindLens, bindZoom, ensureZoomer, mandala, rm, hover, dims, hrs, jours, prix, eur, url, encours, echelle, mursHTML, bindMurs, PIECES, pieceHTML, SEL};
})();
