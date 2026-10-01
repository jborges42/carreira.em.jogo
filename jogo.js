'use strict';
/* Carreira em Jogo — versão digital do tabuleiro gigante do SENAI Videira/SC.
   JavaScript puro + GSAP (animações) + canvas-confetti. As cartas ficam em perguntas.js. */

// ============================== CONFIGURAÇÃO ==============================

// Casas em ordem. I = início · C = chegada · . = livre · E/R/T/F = baralhos (Ética, Rotinas, Tempo, Finanças)
// Q = qualificação (capelo, avança) · X = cilada (caveira, volta) · S = estrela (a primeira é o portão da chegada)
// Qualificações ficam no começo e ciladas no fim: quem está atrás ganha impulso, quem lidera corre mais risco.
const MAPA = 'I.EQ.RT.QF.E.RQ.T.XF.E.R.XT.F..SSSC';
const FIM = MAPA.length - 1;
const PORTAO = MAPA.indexOf('S');

const TEMAS = {
  etica:    { nome: 'Ética e Postura',         cor: '#CC30FC', letra: 'E' },
  rotinas:  { nome: 'Rotinas Administrativas', cor: '#00C0F0', letra: 'R' },
  tempo:    { nome: 'Gestão do Tempo',         cor: '#F01020', letra: 'T' },
  financas: { nome: 'Educação Financeira',     cor: '#22B14C', letra: 'F' },
};
const TEMA_DA_LETRA = { E: 'etica', R: 'rotinas', T: 'tempo', F: 'financas' };

// Cargos da carreira (viram o chaveiro e o crachá no fim). "desde" = primeira casa do cargo. Líder: só quem chega.
const NIVEIS = [
  { nome: 'Jovem Aprendiz',      curto: 'Aprendiz', desde: 0,   cor: '#00C0F0' },
  { nome: 'Profissional Júnior', curto: 'Júnior',   desde: 12,  cor: '#22B14C' },
  { nome: 'Profissional Pleno',  curto: 'Pleno',    desde: 21,  cor: '#CC30FC' },
  { nome: 'Profissional Sênior', curto: 'Sênior',   desde: 27,  cor: '#F01020' },
  { nome: 'Líder',               curto: 'Líder',    desde: FIM, cor: '#FFC21A' },
];
const LIDER = NIVEIS.length - 1;

const CORES = [
  { nome: 'Verde', cor: '#2DBE4E' }, { nome: 'Vermelho', cor: '#EE3333' },
  { nome: 'Azul', cor: '#2F6BFF' }, { nome: 'Amarelo', cor: '#FFB300' },
];

// Chapéus de profissão (os peões do projeto têm "temas profissionais da indústria")
const CHAPEUS = [
  { id: 'capacete', nome: 'Capacete', area: 'Indústria' },
  { id: 'headset', nome: 'Headset', area: 'Atendimento' },
  { id: 'chef', nome: 'Touca', area: 'Alimentos' },
  { id: 'oculos', nome: 'Óculos', area: 'Laboratório' },
  { id: 'bone', nome: 'Boné', area: 'Logística' },
  { id: 'capelo', nome: 'Capelo', area: 'Formatura' },
  { id: 'cartola', nome: 'Cartola', area: 'Mascote' },
  { id: 'nenhum', nome: 'Sem chapéu', area: '' },
];

const BONUS_ACERTO = 2; // casas por pergunta certa ou desafio aprovado
const CONFIG_PADRAO = { tempo: 45, desafio: 45, duracao: 0, mediador: false };

// Caminho do tabuleiro (quadro de 1000 × 1000), suavizado por curva
const ROTA = [
  [900, 928], [740, 932], [580, 935], [420, 935], [290, 925], [175, 890], [100, 800], [78, 688],
  [120, 565], [210, 495], [330, 470], [470, 488], [610, 475], [750, 445], [865, 395], [912, 305],
  [860, 228], [740, 212], [590, 238], [440, 262], [300, 255], [185, 225], [120, 150], [175, 85],
  [310, 70], [450, 70], [580, 72], [655, 74],
];
const LARGURA = 84;
const CENTRO = { x: 262, y: 705, r: 135 }; // engrenagem com o logo

const COR_CASA = { '.': '#FCE400', E: TEMAS.etica.cor, R: TEMAS.rotinas.cor, T: TEMAS.tempo.cor, F: TEMAS.financas.cor,
  Q: '#FFFFFF', X: '#161616', S: '#FCE400', I: 'url(#xadrez)', C: 'url(#xadrez)' };

// ============================== UTILIDADES ==============================

const $ = s => document.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (RM) gsap.globalTimeline.timeScale(20);

const CANCELADA = Symbol('partida encerrada');
let partidaId = 0;
const vivo = id => { if (id !== partidaId) throw CANCELADA; };
const espera = ms => { const id = partidaId; return new Promise(r => setTimeout(r, RM ? Math.min(ms, 250) : ms)).then(() => vivo(id)); };
const fim = anim => { const id = partidaId; return new Promise(ok => anim.then(() => ok())).then(() => vivo(id)); };
const aguardar = promessa => { const id = partidaId; return promessa.then(v => (vivo(id), v)); };

const sortear = lista => lista[Math.floor(Math.random() * lista.length)];
const embaralhar = lista => { const a = [...lista]; for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(Math.random() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a; };
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const nivelDe = casa => NIVEIS.reduce((n, v, i) => (casa >= v.desde ? i : n), 0);
const loop = (alvo, props) => (RM ? null : gsap.to(alvo, { repeat: -1, yoyo: true, ease: 'sine.inOut', ...props }));
const listaNomes = nomes => (nomes.length < 2 ? nomes.join('') : nomes.slice(0, -1).join(', ') + ' e ' + nomes[nomes.length - 1]);

function lerPref(k, padrao) { try { const v = localStorage.getItem('cej:' + k); return v === null ? padrao : JSON.parse(v); } catch { return padrao; } }
function gravarPref(k, v) { try { localStorage.setItem('cej:' + k, JSON.stringify(v)); } catch { /* armazenamento indisponível */ } }

function anunciar(texto) { const a = $('#anuncio'); a.textContent = ''; setTimeout(() => (a.textContent = texto), 60); }

function aviso(texto, ms = 1600) {
  const el = $('#aviso');
  el.textContent = texto; el.hidden = false;
  gsap.killTweensOf(el);
  gsap.fromTo(el, { y: 30, opacity: 0, scale: .8 }, { y: 0, opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)' });
  gsap.to(el, { opacity: 0, y: -10, duration: .3, delay: ms / 1000, onComplete: () => (el.hidden = true) });
}

function confete(opcoes = {}) {
  if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 75, disableForReducedMotion: true, zIndex: 3000,
    colors: ['#FCE400', '#CC30FC', '#00C0F0', '#F01020', '#22B14C', '#FC3CE4', '#ffffff'], ...opcoes });
}
function confeteDe(el, opcoes) {
  const b = el.getBoundingClientRect();
  confete({ origin: { x: (b.x + b.width / 2) / innerWidth, y: (b.y + b.height / 2) / innerHeight }, ...opcoes });
}

// ============================== SONS ==============================

const VOLUME = { 'dado-agita': .55, 'dado-cai': .8, passo1: .45, passo2: .45, passo3: .45, carta: .7, virar: .6, clique: .5,
  voto: .6, tique: .45, vez: .45, tempo: .6, certo: .7, errado: .6, promocao: .6, vitoria: .8, cilada: .6, qualificacao: .6,
  pergunta: .5, estrela: .6 };
const SONS = {};
let somLigado = lerPref('som', true);
Object.keys(VOLUME).forEach(n => (SONS[n] = Object.assign(new Audio(`som/${n}.wav`), { preload: 'auto' })));
function som(nome) {
  if (!somLigado || !SONS[nome]) return;
  const a = SONS[nome].cloneNode();
  a.volume = VOLUME[nome];
  a.play().catch(() => {});
}

// ============================== CONTEÚDO ==============================

const BARALHOS = {};
const EVENTOS = { qualificacao: [], cilada: [] };
const problemasConteudo = [];

function carregarConteudo() {
  if (typeof CARTAS === 'undefined') {
    problemasConteudo.push(`O arquivo perguntas.js tem um erro de digitação${window.ERRO_PERGUNTAS ? ' ' + window.ERRO_PERGUNTAS : ''} (vírgula, aspas ou colchete). Abra o arquivo e confira; o Console do navegador (F12) mostra detalhes.`);
    Object.keys(TEMAS).forEach(t => (BARALHOS[t] = []));
  } else for (const [tema, t] of Object.entries(TEMAS)) {
    BARALHOS[tema] = (CARTAS[tema] || []).filter((c, i) => {
      const ok = c && (c.desafio ? typeof c.desafio === 'string'
        : typeof c.pergunta === 'string' && typeof c.certa === 'string' && Array.isArray(c.erradas) && c.erradas.length > 0 && !c.erradas.includes(c.certa));
      if (!ok) problemasConteudo.push(`${t.nome}: carta ${i + 1} incompleta (foi ignorada).`);
      return ok;
    });
    if (!BARALHOS[tema].some(c => !c.desafio)) problemasConteudo.push(`${t.nome}: nenhuma pergunta válida.`);
  }
  const evOk = e => e && typeof e.texto === 'string' && e.casas > 0;
  EVENTOS.qualificacao = (typeof QUALIFICACAO !== 'undefined' ? QUALIFICACAO : []).filter(evOk);
  EVENTOS.cilada = (typeof CILADA !== 'undefined' ? CILADA : []).filter(evOk);
  if (!EVENTOS.qualificacao.length) EVENTOS.qualificacao = [{ texto: 'Você fez um curso e aprendeu algo novo!', casas: 2 }];
  if (!EVENTOS.cilada.length) EVENTOS.cilada = [{ texto: 'Você chegou atrasado sem avisar ninguém.', casas: 2 }];
}

// Pergunta reserva, para o jogo nunca travar se o banco estiver vazio ou quebrado
const RESERVA = { pergunta: 'O que mais ajuda a construir uma boa carreira?', certa: 'Estudar sempre e agir com ética',
  erradas: ['Esperar a sorte aparecer', 'Fazer só o mínimo combinado'], explicacao: 'Aprender sempre e ser ético abre portas em qualquer profissão.' };

// Compra a carta do topo da pilha (embaralhada e lembrada entre partidas); com soPergunta, pula desafios práticos.
function comprar(tema, soPergunta) {
  if (!BARALHOS[tema]?.some(c => !c.desafio)) tema = Object.keys(TEMAS).find(t => BARALHOS[t]?.some(c => !c.desafio)) || tema;
  const cartas = BARALHOS[tema] || [];
  if (!cartas.length) return { tema, carta: RESERVA };
  const serve = i => !soPergunta || !cartas[i].desafio;
  let pilha = (estado.pilhas[tema] || []).filter(i => i < cartas.length);
  let k = pilha.findLastIndex(serve);
  if (k < 0) { pilha = embaralhar(cartas.map((_, i) => i)); k = pilha.findLastIndex(serve); }
  if (k < 0) return { tema, carta: RESERVA };
  const [i] = pilha.splice(k, 1);
  estado.pilhas[tema] = pilha;
  return { tema, carta: cartas[i] };
}
function comprarEvento(tipo) {
  const lista = EVENTOS[tipo];
  let pilha = (estado.pilhas[tipo] || []).filter(i => i < lista.length);
  if (!pilha.length) pilha = embaralhar(lista.map((_, i) => i));
  const i = pilha.pop();
  estado.pilhas[tipo] = pilha;
  return lista[i];
}

// ============================== DESENHOS ==============================

function peaoSVG(j, extra = '') {
  return `<svg class="peao-svg" viewBox="-22 -46 144 192" style="--cor:${j.cor}" aria-hidden="true"><use href="#peao"/><use href="#ch-${j.chapeu}"/>${extra}</svg>`;
}

function estrelaD(cx, cy, R, r, pontas = 5) {
  let d = '';
  for (let i = 0; i < pontas * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / pontas, raio = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (cx + raio * Math.cos(a)).toFixed(1) + ' ' + (cy + raio * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}

function engrenagemD(cx, cy, r, dentes = 18, prof = 18) {
  const p = [], passo = (2 * Math.PI) / dentes;
  const pt = (raio, a) => (cx + raio * Math.cos(a)).toFixed(1) + ' ' + (cy + raio * Math.sin(a)).toFixed(1);
  for (let i = 0; i < dentes; i++) {
    const a = i * passo;
    p.push(pt(r - prof, a), pt(r, a + passo * .18), pt(r, a + passo * .5), pt(r - prof, a + passo * .68));
  }
  return 'M' + p.join('L') + 'Z';
}

function iconeMarkup(letra) {
  if (letra === 'E') return '<text class="ic-txt" y="2">?</text>';
  if (letra === 'R') return '<use href="#ic-prancheta"/>';
  if (letra === 'T') return '<text class="ic-txt" y="2">!</text>';
  if (letra === 'F') return '<use href="#ic-maleta"/>';
  if (letra === 'Q') return '<use href="#ic-capelo"/>';
  if (letra === 'X') return '<use href="#ic-caveira"/>';
  if (letra === 'S') return `<path d="${estrelaD(0, 0, 38, 17)}" fill="#FC3CE4" stroke="#111" stroke-width="4.5" stroke-linejoin="round"/><text class="ic-txt" y="4" style="font-size:30px">?</text>`;
  return '';
}
function iconeCasa(letra) {
  const fundo = letra === 'S' ? '' : `<rect x="-35" y="-35" width="70" height="70" rx="14" fill="${COR_CASA[letra]}" stroke="#111" stroke-width="5"/>`;
  return `<svg class="icone-casa" viewBox="-40 -40 80 80" aria-hidden="true">${fundo}${iconeMarkup(letra)}</svg>`;
}

function chaveiroSVG(nivel, attrs = '') {
  const t = esc(NIVEIS[nivel].nome.toUpperCase());
  return `<svg class="chaveiro" ${attrs} viewBox="0 0 220 262" role="img" aria-label="Chaveiro ${t}">
    <circle cx="110" cy="22" r="19" fill="none" stroke="#c3c9d1" stroke-width="7"/>
    <circle cx="110" cy="22" r="19" fill="none" stroke="#7e858f" stroke-width="1.5"/>
    <path d="M90 62q20-30 40 0z" fill="url(#madeira)" stroke="#6B3E1E" stroke-width="3"/>
    <circle cx="110" cy="49" r="6" fill="#3a2410"/>
    <circle cx="110" cy="150" r="104" fill="url(#madeira)" stroke="#6B3E1E" stroke-width="3"/>
    <circle cx="110" cy="150" r="96" fill="none" stroke="#7A4A22" stroke-width="2.5"/>
    <circle cx="110" cy="150" r="65" fill="none" stroke="#7A4A22" stroke-width="2.5"/>
    <text class="chaveiro-txt"><textPath href="#arco-topo" startOffset="50%" text-anchor="middle">${t}</textPath></text>
    <text class="chaveiro-txt"><textPath href="#arco-base" startOffset="50%" text-anchor="middle">${t}</textPath></text>
    <image href="img/chaveiro-centro.jpg" x="32.6" y="72.2" width="150" height="150" clip-path="url(#clip-chaveiro)" preserveAspectRatio="xMidYMid slice"/>
  </svg>`;
}

// ============================== TABULEIRO ==============================

let CASAS = [];      // { letra, x, y, nx, ny, dx, dy }
let ESTRADA = [];    // pontos da linha central
const peaoEl = [];   // <g> de cada peão no tabuleiro
const cam = { x: 500, y: 500, z: 1 };
let zoomAlvo = 1;

function catmullRom(pts, passos = 24) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    for (let s = 0; s < passos; s++) {
      const t = s / passos, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(k => .5 * (2 * p1[k] + (p2[k] - p0[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function medir(linha) {
  const acum = [0];
  for (let i = 1; i < linha.length; i++) acum.push(acum[i - 1] + Math.hypot(linha[i][0] - linha[i - 1][0], linha[i][1] - linha[i - 1][1]));
  const total = acum[acum.length - 1];
  const em = d => {
    d = Math.max(0, Math.min(total, d));
    let i = 1;
    while (i < acum.length - 1 && acum[i] < d) i++; // ponytail: busca linear, basta para ~650 pontos
    const a = linha[i - 1], b = linha[i], seg = acum[i] - acum[i - 1] || 1, t = (d - acum[i - 1]) / seg;
    const dx = (b[0] - a[0]) / seg, dy = (b[1] - a[1]) / seg;
    return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, dx, dy, nx: -dy, ny: dx };
  };
  return { total, em };
}

const distEstrada = (x, y) => ESTRADA.reduce((m, p) => Math.min(m, Math.hypot(p[0] - x, p[1] - y)), Infinity);

function montarTabuleiro() {
  const linha = catmullRom(ROTA);
  ESTRADA = linha;
  const { total, em } = medir(linha);
  const N = MAPA.length, passo = total / N, W = LARGURA;
  CASAS = [...MAPA].map((letra, i) => ({ letra, ...em((i + .5) * passo) }));
  const f = v => v.toFixed(1);
  const d = 'M' + linha.map(p => f(p[0]) + ' ' + f(p[1])).join('L');

  // ondas e engrenagens decorativas nos espaços livres de água (posições fixas por semente)
  let semente = 7;
  const rnd = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);
  const livres = [];
  for (let y = 40; y < 1000; y += 62) for (let x = 40; x < 1000; x += 62) {
    const px = x + (rnd() - .5) * 40, py = y + (rnd() - .5) * 40;
    const folga = Math.min(distEstrada(px, py) - W / 2, Math.hypot(px - CENTRO.x, py - CENTRO.y) - CENTRO.r - 10, px, py, 1000 - px, 1000 - py);
    if (folga > 34) livres.push({ x: px, y: py, folga });
  }
  livres.sort((a, b) => b.folga - a.folga);
  const usados = [];
  let ondas = '', engrenagens = '', nEng = 0;
  for (const p of livres) {
    if (!usados.every(u => Math.hypot(u.x - p.x, u.y - p.y) > 95)) continue;
    usados.push(p);
    if (nEng < 3 && p.folga > 60) {
      const r = Math.min(46, p.folga - 12);
      nEng++;
      engrenagens += `<g class="eng-deco" data-x="${f(p.x)}" data-y="${f(p.y)}"><path d="${engrenagemD(p.x, p.y, r, 10, 10)}" fill="#7f8fa6" stroke="#0b2f73" stroke-width="4" stroke-linejoin="round" opacity=".55"/><circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(r * .38)}" fill="#0a5fd8" opacity=".9"/></g>`;
      continue;
    }
    const r0 = Math.min(30, p.folga - 6), giro = rnd() * Math.PI * 2;
    const espiral = Array.from({ length: 30 }, (_, k) => {
      const t = k / 29, a = giro + t * Math.PI * 2.3, r = r0 * (1 - t * .75);
      return f(p.x + r * Math.cos(a)) + ' ' + f(p.y + r * Math.sin(a));
    });
    ondas += `<path d="M${espiral.join('L')}"/>`;
  }

  // setas de sentido na água, paralelas à estrada
  let setas = '';
  for (let k = 1.4; k < N - 3; k += 3.6) {
    for (const lado of [1, -1]) {
      const pts = Array.from({ length: 9 }, (_, s) => {
        const p = em((k + s * .17) * passo);
        return [p.x + p.nx * lado * (W / 2 + 22), p.y + p.ny * lado * (W / 2 + 22)];
      });
      if (pts.some(([x, y]) => distEstrada(x, y) < W / 2 + 14 || Math.hypot(x - CENTRO.x, y - CENTRO.y) < CENTRO.r + 14 || x < 12 || y < 12 || x > 988 || y > 988)) continue;
      const [a, b] = pts.slice(-2), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      const ponta = [[b[0] + 13 * Math.cos(ang), b[1] + 13 * Math.sin(ang)], [b[0] + 11 * Math.cos(ang + 2.3), b[1] + 11 * Math.sin(ang + 2.3)], [b[0] + 11 * Math.cos(ang - 2.3), b[1] + 11 * Math.sin(ang - 2.3)]];
      setas += `<path d="M${pts.slice(0, -1).map(p => f(p[0]) + ' ' + f(p[1])).join('L')}" fill="none"/><path d="M${ponta.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}Z" class="ponta"/>`;
      break;
    }
  }

  // casas
  const poligono = (a, b) => {
    const lado = [];
    for (let s = 0; s <= 6; s++) { const p = em(a + ((b - a) * s) / 6); lado.push([p.x + (p.nx * W) / 2, p.y + (p.ny * W) / 2]); }
    for (let s = 6; s >= 0; s--) { const p = em(a + ((b - a) * s) / 6); lado.push([p.x - (p.nx * W) / 2, p.y - (p.ny * W) / 2]); }
    return lado.map(p => f(p[0]) + ',' + f(p[1])).join(' ');
  };
  const casas = CASAS.map((c, i) => `<polygon class="casa" data-casa="${i}" points="${poligono(i * passo, (i + 1) * passo)}" fill="${COR_CASA[c.letra]}"/>`).join('');
  const icones = CASAS.map((c, i) => {
    if (c.letra === 'S') {
      const cor = i === PORTAO + 1 ? '#00C0F0' : '#FC3CE4';
      return `<g class="estrela-casa"><path d="${estrelaD(c.x, c.y, 60, 28)}" fill="${cor}" stroke="#111" stroke-width="5" stroke-linejoin="round"/><text class="ic-txt" x="${f(c.x)}" y="${f(c.y + 4)}">?</text></g>`;
    }
    const m = iconeMarkup(c.letra);
    return m ? `<g transform="translate(${f(c.x)} ${f(c.y)}) scale(1.15)">${m}</g>` : '';
  }).join('');

  // marcos de cargo (Líder é a própria chegada)
  const lado = (p, folga) => [1, -1].map(s => ({ x: p.x + p.nx * s * folga, y: p.y + p.ny * s * folga }))
    .sort((a, b) => distEstrada(b.x, b.y) + Math.min(b.x, b.y, 1000 - b.x, 1000 - b.y) * .4 - (distEstrada(a.x, a.y) + Math.min(a.x, a.y, 1000 - a.x, 1000 - a.y) * .4))[0];
  const marcos = NIVEIS.slice(1, LIDER).map((nv, k) => {
    const p = em(nv.desde * passo), a = { x: p.x + (p.nx * W) / 2, y: p.y + (p.ny * W) / 2 }, b = { x: p.x - (p.nx * W) / 2, y: p.y - (p.ny * W) / 2 };
    const pos = lado(p, W / 2 + 34), texto = `${k + 2} · ${nv.curto.toUpperCase()}`, larg = texto.length * 13 + 26;
    return `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" class="linha-nivel"/>
      <g class="marco" transform="translate(${f(Math.min(985 - larg / 2, Math.max(15 + larg / 2, pos.x)))} ${f(Math.min(975, Math.max(25, pos.y)))})">
      <rect x="${-larg / 2}" y="-19" width="${larg}" height="38" rx="19"/><text y="1">${esc(texto)}</text></g>`;
  }).join('');

  const ini = CASAS[0], che = CASAS[N - 1];
  gsap.killTweensOf($('#tabuleiro').querySelectorAll('*'));
  $('#tabuleiro').innerHTML = `
    <defs>
      <linearGradient id="agua" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00A6F2"/><stop offset=".55" stop-color="#0A78F0"/><stop offset="1" stop-color="#0060E6"/></linearGradient>
      <clipPath id="clip-logo"><circle cx="${CENTRO.x}" cy="${CENTRO.y}" r="${CENTRO.r - 32}"/></clipPath>
    </defs>
    <rect width="1000" height="1000" fill="url(#agua)"/>
    <g class="ondas">${ondas}</g>
    ${engrenagens}
    <g class="setas">${setas}</g>
    <g id="eng-centro"><path d="${engrenagemD(CENTRO.x, CENTRO.y, CENTRO.r, 22, 20)}" fill="#9090A0" stroke="#111" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="${CENTRO.x}" cy="${CENTRO.y}" r="${CENTRO.r - 24}" fill="#7d7d8c" stroke="#111" stroke-width="4"/></g>
    <circle cx="${CENTRO.x}" cy="${CENTRO.y}" r="${CENTRO.r - 30}" fill="#fff" stroke="#111" stroke-width="5"/>
    <image href="img/logo.png" x="${CENTRO.x - CENTRO.r + 32}" y="${CENTRO.y - CENTRO.r + 32}" width="${2 * (CENTRO.r - 32)}" height="${2 * (CENTRO.r - 32)}" clip-path="url(#clip-logo)"/>
    <path d="${d}" class="estrada-sombra" stroke-width="${W + 16}"/>
    <path d="${d}" class="estrada-borda" stroke-width="${W + 12}"/>
    <g class="casas">${casas}</g>
    ${marcos}
    <g class="icones">${icones}</g>
    <g class="placa" transform="translate(${f(Math.min(920, ini.x + 10))} ${f(ini.y - 172)})"><rect x="-74" y="-27" width="148" height="54" rx="10"/><text y="2">INÍCIO</text></g>
    <g class="chegou" transform="translate(${f(Math.min(860, che.x + 182))} ${f(che.y + 8)})"><text>${[...'Chegou!'].map(l => `<tspan>${l}</tspan>`).join('')}</text></g>
    <g id="peoes"></g>`;

  // Chegou! colorido letra a letra (como no tabuleiro)
  const coresChegou = ['#F01020', '#FFB300', '#22B14C', '#00C0F0', '#0A60F0', '#CC30FC', '#FC3CE4'];
  document.querySelectorAll('.chegou tspan').forEach((t, i) => t.setAttribute('fill', coresChegou[i % coresChegou.length]));

  loop('#eng-centro', { rotation: 360, svgOrigin: `${CENTRO.x} ${CENTRO.y}`, duration: 40, ease: 'none', yoyo: false });
  document.querySelectorAll('.eng-deco').forEach((g, i) => loop(g, { rotation: i % 2 ? -360 : 360, svgOrigin: `${g.dataset.x} ${g.dataset.y}`, duration: 18 + i * 4, ease: 'none', yoyo: false }));
  loop('.estrela-casa', { scale: 1.08, transformOrigin: '50% 50%', duration: .9, stagger: .3 });
}

function aplicarCamera() {
  const w = 1000 / cam.z, x = Math.max(0, Math.min(1000 - w, cam.x - w / 2)), y = Math.max(0, Math.min(1000 - w, cam.y - w / 2));
  $('#tabuleiro').setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${w.toFixed(1)}`);
}
const cameraPara = (x, y, z, duracao = .6) => (zoomAlvo = z, gsap.to(cam, { x, y, z, duration: duracao, ease: 'power2.inOut', onUpdate: aplicarCamera, overwrite: true }));
const zoomJogo = () => (innerWidth < 760 ? 1.9 : 1.45);

function criarPeoes() {
  const g = $('#peoes');
  g.innerHTML = '';
  peaoEl.length = 0;
  estado.jogadores.forEach((j, i) => {
    g.insertAdjacentHTML('beforeend', `<g class="peao-tab" data-i="${i}" style="--cor:${j.cor}">
      <ellipse class="sombra" rx="24" ry="9" fill="#000" fill-opacity=".35"/>
      <g class="pulo"><g transform="translate(-33 -90) scale(.66)"><use href="#peao"/><use href="#ch-${j.chapeu}"/></g></g>
      <path class="seta-ativo" d="M-15 -138h30l-15 19z" fill="${j.cor}" stroke="#111" stroke-width="4" stroke-linejoin="round"/></g>`);
    peaoEl[i] = g.lastElementChild;
  });
  posicionarPeoes(false);
}

const ARRANJO = [[[0, 0]], [[-18, 0], [18, 0]], [[-20, 9], [20, 9], [0, -11]], [[-20, 11], [20, 11], [-20, -13], [20, -13]]];
function posicionarPeoes(animar = true) {
  const porCasa = {};
  estado.jogadores.forEach((j, i) => (porCasa[j.casa] ??= []).push(i));
  for (const [casa, lista] of Object.entries(porCasa)) lista.forEach((i, k) => {
    const c = CASAS[casa], [ox, oy] = ARRANJO[lista.length - 1][k];
    gsap.to(peaoEl[i], { x: c.x + ox, y: c.y + oy, duration: animar ? .3 : 0, ease: 'power2.out' });
  });
  // quem está mais embaixo fica na frente; o jogador da vez por cima de todos
  const ordem = estado.jogadores.map((j, i) => i).sort((a, b) => CASAS[estado.jogadores[a].casa].y - CASAS[estado.jogadores[b].casa].y);
  ordem.push(...ordem.splice(ordem.indexOf(estado.vez), 1));
  ordem.forEach(i => $('#peoes').appendChild(peaoEl[i]));
  peaoEl.forEach((el, i) => el.classList.toggle('ativo', i === estado.vez));
}

async function pularPara(i) {
  const el = peaoEl[i], c = CASAS[estado.jogadores[i].casa], corpo = el.querySelector('.pulo');
  const tl = gsap.timeline();
  tl.to(el, { x: c.x, y: c.y, duration: .26, ease: 'power1.inOut' }, 0)
    .to(corpo, { y: -36, scaleY: 1.12, scaleX: .9, duration: .13, ease: 'power2.out', transformOrigin: '50% 100%' }, 0)
    .to(corpo, { y: 0, scaleY: 1, scaleX: 1, duration: .13, ease: 'power2.in' }, .13)
    .to(corpo, { scaleY: .8, scaleX: 1.14, duration: .05, yoyo: true, repeat: 1 }, .26)
    .to(el.querySelector('.sombra'), { scale: .55, duration: .13, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 0)
    .call(() => som(sortear(['passo1', 'passo2', 'passo3'])), null, .25);
  if (zoomAlvo > 1) cameraPara(c.x, c.y, zoomAlvo, .32);
  await fim(tl);
}

// Movimento de bônus ou cilada: desliza sem pular (mostra sem palavras que não vale a casa)
async function deslizarPara(i) {
  const c = CASAS[estado.jogadores[i].casa];
  await fim(gsap.to(peaoEl[i], { x: c.x, y: c.y, duration: .15, ease: 'none' }));
}

function poeira(x, y) {
  if (RM) return;
  const g = $('#peoes');
  for (let k = 0; k < 6; k++) {
    g.insertAdjacentHTML('afterbegin', `<circle cx="${x}" cy="${y}" r="7" fill="#fff" opacity=".9"/>`);
    const bolha = g.firstElementChild, a = (k / 6) * Math.PI * 2;
    gsap.to(bolha, { attr: { cx: x + Math.cos(a) * 34, cy: y + Math.sin(a) * 14, r: 2 }, opacity: 0, duration: .5, ease: 'power2.out', onComplete: () => bolha.remove() });
  }
}

// ============================== ESTADO ==============================

let estado = null;
let telaAtual = 'inicio';
let aoRolar = null, aoEscolher = null, aoContinuar = null;
let relogio = null, splashTl = null, ranking = [];

function mostrarTela(nome) {
  telaAtual = nome;
  for (const t of ['inicio', 'lobby', 'jogo', 'fim', 'quadro']) $(`#tela-${t}`).hidden = t !== nome;
  gsap.fromTo(`#tela-${nome}`, { opacity: 0 }, { opacity: 1, duration: .35 });
}

function salvar() { try { localStorage.setItem('cej:partida', JSON.stringify(estado)); } catch { /* sem armazenamento */ } }
function limparSave() { try { localStorage.removeItem('cej:partida'); } catch { /* sem armazenamento */ } }
function lerSave() {
  try {
    const s = JSON.parse(localStorage.getItem('cej:partida'));
    return s?.mapa === MAPA && s.jogadores?.length && s.jogadores.every(j => j.casa >= 0 && j.casa <= FIM) ? s : null;
  } catch { return null; }
}

function novaPartida(jogadores, config) {
  const pilhas = lerPref('pilhas', {});
  estado = {
    mapa: MAPA, vez: 0, config: { ...CONFIG_PADRAO, ...config }, ultimaRodada: false,
    pilhas: pilhas && typeof pilhas === 'object' ? pilhas : {},
    restanteMs: config.duracao ? config.duracao * 60000 : null,
    jogadores: jogadores.map(j => ({ ...j, casa: 0, nivelMax: 0, acertos: 0, perguntas: 0 })),
  };
}

// ============================== PAINEL ==============================

function desenharPainel() {
  const j = estado.jogadores[estado.vez];
  $('#vez').style.setProperty('--cor', j.cor);
  $('#vez').innerHTML = `<span class="vez-peao">${peaoSVG(j)}</span>
    <span class="vez-info"><small>${estado.ultimaRodada ? 'Última chance de' : 'Vez de'}</small><b>${esc(j.nome)}</b><span class="vez-nivel">${esc(NIVEIS[nivelDe(j.casa)].nome)}</span></span>`;
  $('#placar').innerHTML = estado.jogadores.map((p, i) => {
    const pct = Math.round((p.casa / FIM) * 100);
    const marca = p.casa >= FIM ? '🏆' : p.casa >= PORTAO ? '⭐' : p.casa === 0 ? '🏁' : p.casa;
    return `<li class="ficha${i === estado.vez ? ' ativa' : ''}" style="--cor:${p.cor}">
      <span class="ficha-peao">${peaoSVG(p)}</span>
      <span class="ficha-info"><b>${esc(p.nome)}</b><small>${esc(NIVEIS[nivelDe(p.casa)].nome)}</small>
        <span class="barra" role="progressbar" aria-label="Progresso de ${esc(p.nome)}" aria-valuemin="0" aria-valuemax="${FIM}" aria-valuenow="${p.casa}"><i style="width:${pct}%"></i>${NIVEIS.slice(1, LIDER).map(n => `<em style="left:${(n.desde / FIM) * 100}%"></em>`).join('')}</span></span>
      <span class="ficha-casa" title="Casa">${marca}</span></li>`;
  }).join('');
}

function atualizarRelogio() {
  const el = $('#relogio');
  el.hidden = estado.restanteMs == null;
  if (estado.restanteMs == null) return;
  const s = Math.max(0, Math.ceil(estado.restanteMs / 1000));
  el.querySelector('b').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  el.classList.toggle('acabando', s <= 60);
}
function iniciarRelogio() {
  clearInterval(relogio);
  atualizarRelogio();
  if (estado.restanteMs == null) return;
  let antes = Date.now();
  relogio = setInterval(() => {
    const agora = Date.now(), tinha = estado.restanteMs;
    estado.restanteMs = Math.max(0, estado.restanteMs - (agora - antes));
    antes = agora;
    if (tinha > 60000 && estado.restanteMs <= 60000) aviso('⏱ Falta 1 minuto!', 2200);
    if (tinha > 0 && estado.restanteMs === 0) aviso('⏱ Tempo esgotado! Vem aí a última rodada.', 3000);
    atualizarRelogio();
  }, 500);
}

// ============================== DADO ==============================

const FACE = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] };
let giro = 0;

function montarDado() {
  const pos = { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  $('#cubo').innerHTML = [1, 2, 3, 4, 5, 6].map(n =>
    `<span class="face f${n}">${pos[n].map(c => `<i style="grid-area:${Math.ceil(c / 3)}/${((c - 1) % 3) + 1}"></i>`).join('')}</span>`).join('');
  gsap.set('#cubo', { rotationX: -18, rotationY: 24 });
}

async function rolarDado(j) {
  const btn = $('#dado'), numeros = $('#dado-numeros');
  btn.disabled = false;
  numeros.hidden = !estado.config.mediador;
  numeros.querySelectorAll('button').forEach(b => (b.disabled = false));
  $('#dado-dica').textContent = matchMedia('(hover: hover)').matches ? 'Clique no dado ou aperte Espaço' : 'Toque no dado!';
  const pulsar = loop(btn, { scale: 1.07, duration: .55 });
  const escolhido = await aguardar(new Promise(r => (aoRolar = r)));
  pulsar?.kill(); gsap.set(btn, { scale: 1 });
  btn.disabled = true;
  numeros.querySelectorAll('button').forEach(b => (b.disabled = true));
  $('#dado-dica').textContent = '…';
  const n = escolhido || 1 + Math.floor(Math.random() * 6);
  som('dado-agita');
  giro += 2;
  const [fx, fy] = FACE[n];
  const tl = gsap.timeline();
  tl.to(btn, { y: -80, duration: .32, ease: 'power2.out' })
    .to('#cubo', { rotationX: fx + 360 * giro, rotationY: fy + 360 * giro, duration: 1.05, ease: 'power3.out' }, 0)
    .to(btn, { y: 0, duration: .6, ease: 'bounce.out' }, .32)
    .call(() => som('dado-cai'), null, .45);
  await fim(tl);
  $('#dado-dica').innerHTML = `Tirou <b>${n}</b>!`;
  gsap.fromTo('#dado-dica b', { scale: 2.4 }, { scale: 1, duration: .5, ease: 'elastic.out(1, .4)' });
  anunciar(`${j.nome} tirou ${n} no dado.`);
  await espera(300);
  return n;
}
function rolar(n) { const r = aoRolar; aoRolar = null; r?.(n); }

// ============================== MOVIMENTO ==============================

async function andar(i, passos, { seguir = true, pular = true } = {}) {
  const j = estado.jogadores[i];
  let alvo = Math.max(0, Math.min(FIM, j.casa + passos));
  if (j.casa < PORTAO && alvo > PORTAO) alvo = PORTAO; // ninguém passa direto pelo portão das estrelas
  if (alvo === j.casa) return;
  if (seguir) cameraPara(CASAS[j.casa].x, CASAS[j.casa].y, zoomJogo(), .5);
  while (j.casa !== alvo) {
    j.casa += Math.sign(alvo - j.casa);
    await (pular ? pularPara(i) : deslizarPara(i));
  }
  if (!pular) som('passo2');
  poeira(CASAS[j.casa].x, CASAS[j.casa].y);
  posicionarPeoes();
  desenharPainel();
  const n = nivelDe(j.casa);
  if (n > j.nivelMax && n < LIDER) promocao(i, n); // Líder é festejado na chegada
}

// Promoção: festa rápida em cima do peão, sem parar o jogo
function promocao(i, n) {
  const j = estado.jogadores[i], c = CASAS[j.casa];
  j.nivelMax = n;
  som('promocao');
  aviso(`🎉 Promoção! ${j.nome} agora é ${NIVEIS[n].nome}`, 2400);
  confeteDe(peaoEl[i], { particleCount: 70, spread: 80, startVelocity: 26 });
  $('#peoes').insertAdjacentHTML('beforeend', `<g class="selo">${chaveiroSVG(n, `x="${c.x - 48}" y="${c.y - 250}" width="96" height="114"`)}</g>`);
  const selo = $('#peoes').lastElementChild;
  gsap.timeline({ onComplete: () => selo.remove() })
    .from(selo, { scale: 0, transformOrigin: '50% 50%', duration: .6, ease: 'elastic.out(1, .45)' })
    .to(selo, { y: -60, opacity: 0, duration: .5, ease: 'power2.in' }, '+=1.1');
  anunciar(`Promoção! ${j.nome} agora é ${NIVEIS[n].nome}.`);
}

// ============================== ANÚNCIOS (FAIXA) ==============================

async function splash({ pre = '', titulo, sub = '', cor = '#FCE400', icone = '', tempo = 900, escuro = false }) {
  const el = $('#splash'), faixa = el.querySelector('.splash-faixa');
  $('#splash-pre').textContent = pre;
  $('#splash-titulo').textContent = titulo;
  $('#splash-sub').textContent = sub;
  $('#splash-icone').innerHTML = icone;
  el.style.setProperty('--cor', cor);
  el.classList.toggle('escuro', escuro);
  el.hidden = false;
  anunciar([pre, titulo, sub].filter(Boolean).join('. '));
  const tl = (splashTl = gsap.timeline());
  tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .15 })
    .fromTo(faixa, { xPercent: -130, skewX: -14 }, { xPercent: 0, skewX: 0, duration: .42, ease: 'back.out(1.5)' }, 0)
    .fromTo('#splash-icone', { scale: 0, rotation: -35 }, { scale: 1, rotation: 0, duration: .55, ease: 'elastic.out(1, .5)' }, .12)
    .fromTo(['#splash-pre', '#splash-titulo', '#splash-sub'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: .32, stagger: .06, ease: 'power3.out' }, .16)
    .to(faixa, { xPercent: 130, skewX: 14, duration: .3, ease: 'power2.in' }, `+=${tempo / 1000}`)
    .to(el, { opacity: 0, duration: .15 }, '-=.12');
  try { await fim(tl); } finally { if (splashTl === tl) splashTl = null; el.hidden = true; }
}
const pularSplash = () => splashTl?.progress(1);

// ============================== CARTAS ==============================

function prepararCarta({ cor, icone, tema, tipo }) {
  const dlg = $('#dlg-carta');
  dlg.style.setProperty('--tema', cor);
  $('#carta-icone').innerHTML = icone;
  $('#carta-tema').textContent = tema;
  $('#carta-tipo').textContent = tipo;
  $('#tempo-barra').hidden = true;
}

async function abrirCarta() {
  const dlg = $('#dlg-carta'), carta = $('#carta');
  carta.querySelector('.carta-frente').inert = true;
  gsap.set(carta, { rotationY: 0 });
  if (!dlg.open) dlg.showModal();
  som('carta');
  await fim(gsap.fromTo(carta, { y: 160, scale: .5, rotation: -12, opacity: 0 }, { y: 0, scale: 1, rotation: 0, opacity: 1, duration: .45, ease: 'back.out(1.4)' }));
  await espera(150);
  som('virar');
  await fim(gsap.to(carta, { rotationY: 180, duration: .5, ease: 'power2.inOut' }));
  carta.querySelector('.carta-frente').inert = false;
  gsap.from('#carta-corpo > *', { y: 18, opacity: 0, duration: .3, stagger: .05, ease: 'power2.out' });
  (carta.querySelector('.opcao, .btn') || carta).focus({ preventScroll: true });
}

async function fecharCarta() {
  pararTempo();
  await fim(gsap.to('#carta', { y: -90, scale: .85, opacity: 0, duration: .28, ease: 'power2.in' }));
  $('#dlg-carta').close();
  $('#dlg-carta').classList.remove('carta-escura');
}

let tempoTween = null, tempoTique = null;
function iniciarTempo(segundos, aoAcabar) {
  pararTempo();
  if (!segundos) return;
  const barra = $('#tempo-barra'), num = $('#tempo-num');
  barra.hidden = false;
  barra.classList.remove('acabando');
  let resta = segundos;
  num.textContent = resta;
  tempoTween = gsap.fromTo(barra.querySelector('i'), { scaleX: 1 }, { scaleX: 0, duration: segundos, ease: 'none', transformOrigin: '0 50%', onComplete: aoAcabar });
  if (RM) tempoTween.timeScale(1 / 20); // o relógio de resposta não acelera com movimento reduzido
  tempoTique = setInterval(() => {
    if (tempoTween?.paused()) return; // pausado enquanto pergunta se quer encerrar
    resta = Math.max(0, resta - 1);
    num.textContent = resta;
    if (resta <= 5 && resta > 0) { barra.classList.add('acabando'); som('tique'); gsap.fromTo(num, { scale: 1.6 }, { scale: 1, duration: .4 }); }
  }, 1000);
}
function pararTempo() { tempoTween?.kill(); tempoTween = null; clearInterval(tempoTique); }

function esperarContinuar(onde, rotulo = 'Continuar') {
  onde.insertAdjacentHTML('beforeend', `<button class="btn btn-continuar">${rotulo} ▶</button>`);
  const btn = onde.lastElementChild;
  gsap.from(btn, { scale: .6, opacity: 0, duration: .35, ease: 'back.out(2)' });
  btn.focus({ preventScroll: true });
  return aguardar(new Promise(r => (aoContinuar = r))).finally(() => (aoContinuar = null));
}

async function mostrarPergunta(i, tema, carta, estrela = false) {
  const j = estado.jogadores[i], t = TEMAS[tema];
  const opcoes = embaralhar([{ texto: carta.certa, certa: true }, ...carta.erradas.map(texto => ({ texto, certa: false }))]);
  prepararCarta({ cor: estrela ? '#FC3CE4' : t.cor, icone: iconeCasa(estrela ? 'S' : t.letra), tema: t.nome, tipo: estrela ? 'Desafio Estrela' : 'Pergunta' });
  const corpo = $('#carta-corpo');
  corpo.innerHTML = `<p class="carta-quem" style="--cor:${j.cor}">${peaoSVG(j)}<span><b>${esc(j.nome)}</b> responde${estrela ? ' — <b>acertou, chegou!</b>' : ''}</span></p>
    <p class="carta-texto">${esc(carta.pergunta)}</p>
    <div class="opcoes">${opcoes.map((o, k) => `<button class="opcao" data-k="${k}"><b>${'ABCD'[k]}</b><span>${esc(o.texto)}</span></button>`).join('')}</div>
    <div class="resposta" aria-live="polite"></div>`;
  corpo.querySelectorAll('.opcao').forEach(b => b.addEventListener('click', () => aoEscolher?.(+b.dataset.k)));
  await abrirCarta();
  anunciar(`Pergunta de ${t.nome}: ${carta.pergunta}. ${opcoes.map((o, k) => `${'ABCD'[k]}: ${o.texto}`).join('. ')}`);
  const k = await aguardar(new Promise(r => {
    aoEscolher = r;
    iniciarTempo(estado.config.tempo, () => r(-1));
  })).finally(() => (aoEscolher = null));
  pararTempo();
  const acertou = k >= 0 && opcoes[k].certa;
  j.perguntas++;
  if (acertou) j.acertos++;
  const botoes = [...corpo.querySelectorAll('.opcao')];
  botoes.forEach((b, n) => { b.disabled = true; if (opcoes[n].certa) b.classList.add('certa'); else if (n === k) b.classList.add('errada'); else b.classList.add('apagada'); });
  const res = corpo.querySelector('.resposta');
  const titulo = acertou ? (estrela ? '🌟 Acertou! Você chegou lá!' : `🎉 Acertou! +${BONUS_ACERTO} casas`)
    : k < 0 ? '⏱ Tempo esgotado!' : estrela ? 'Errou… tente de novo na próxima vez!' : 'Não foi dessa vez!';
  res.innerHTML = `<p class="resposta-titulo ${acertou ? 'ok' : 'nao'}">${titulo}</p>${carta.explicacao ? `<p class="explicacao"><b>💡 Você sabia?</b> ${esc(carta.explicacao)}</p>` : ''}`;
  if (acertou) {
    som('certo');
    const certo = botoes.find(b => b.classList.contains('certa'));
    gsap.fromTo(certo, { scale: 1 }, { scale: 1.06, duration: .18, yoyo: true, repeat: 3 });
    confeteDe(certo, { particleCount: 70, spread: 60 });
  } else {
    som(k < 0 ? 'tempo' : 'errado');
    gsap.fromTo('#carta', { x: -14 }, { x: 0, duration: .5, ease: 'elastic.out(1.2, .25)' });
  }
  gsap.from(res, { y: 16, opacity: 0, duration: .35 });
  await esperarContinuar(res);
  await fecharCarta();
  return acertou;
}

// Desafio prático: com mediador, ele avalia (+2/+1/0); sem mediador, os outros jogadores votam (estilo Among Us).
async function mostrarDesafio(i, tema, carta) {
  const j = estado.jogadores[i], t = TEMAS[tema];
  prepararCarta({ cor: t.cor, icone: iconeCasa(t.letra), tema: t.nome, tipo: 'Desafio prático' });
  const corpo = $('#carta-corpo');
  const criterio = carta.criterio ? `<p class="criterio"><b>👀 Vale se:</b> ${esc(carta.criterio)}</p>` : '';
  corpo.innerHTML = `<p class="carta-quem" style="--cor:${j.cor}">${peaoSVG(j)}<span>🎤 <b>${esc(j.nome)}</b>, é com você!</span></p>
    <p class="carta-texto">${esc(carta.desafio)}</p>${criterio}<div class="resposta"></div>`;
  await abrirCarta();
  anunciar(`Desafio prático para ${j.nome}: ${carta.desafio}`);
  iniciarTempo(estado.config.desafio, () => aoContinuar?.());
  await esperarContinuar(corpo.querySelector('.resposta'), estado.config.mediador ? 'Terminei!' : 'Terminei! Votar');
  pararTempo();
  $('#tempo-barra').hidden = true;

  let casas;
  if (estado.config.mediador) {
    $('#carta-tipo').textContent = 'Avaliação';
    corpo.innerHTML = `<p class="carta-texto">Mediador, como foi o desafio de <b>${esc(j.nome)}</b>?</p>${criterio}
      <div class="juiz">
        <button class="btn juiz-ok" data-casas="${BONUS_ACERTO}">🌟 Mandou bem!<small>+${BONUS_ACERTO} casas</small></button>
        <button class="btn juiz-quase" data-casas="1">👍 Quase!<small>+1 casa</small></button>
        <button class="btn btn-branco" data-casas="0">💪 Ainda não<small>fica onde está</small></button>
      </div><div class="resposta"></div>`;
    gsap.from('.juiz .btn', { y: 30, opacity: 0, duration: .35, stagger: .08, ease: 'back.out(1.7)' });
    corpo.querySelector('.juiz .btn').focus({ preventScroll: true });
    casas = await aguardar(new Promise(r => corpo.querySelectorAll('.juiz .btn').forEach(b => b.addEventListener('click', () => r(+b.dataset.casas), { once: true }))));
    corpo.querySelectorAll('.juiz .btn').forEach(b => (b.disabled = true));
  } else {
    $('#carta-tipo').textContent = 'Votação';
    const outros = estado.jogadores.filter((_, n) => n !== i);
    const votos = new Map();
    corpo.innerHTML = `<p class="carta-texto">Votação: <b>${esc(j.nome)}</b> mandou bem?</p>${criterio}
      <ul class="votacao">${outros.map((p, n) => `<li style="--cor:${p.cor}"><span class="voto-peao">${peaoSVG(p)}</span><b>${esc(p.nome)}</b>
        <span class="voto-botoes" role="group" aria-label="Voto de ${esc(p.nome)}">
          <button class="voto" data-n="${n}" data-v="1" aria-pressed="false" aria-label="${esc(p.nome)} vota sim">👍</button>
          <button class="voto" data-n="${n}" data-v="0" aria-pressed="false" aria-label="${esc(p.nome)} vota não">👎</button></span></li>`).join('')}</ul>
      <div class="resposta"><button class="btn btn-continuar" id="btn-votos" disabled>Confirmar votos</button></div>`;
    gsap.from('.votacao li', { x: -40, opacity: 0, duration: .35, stagger: .08, ease: 'back.out(1.7)' });
    const confirmar = $('#btn-votos');
    corpo.querySelectorAll('.voto').forEach(b => b.addEventListener('click', () => {
      som('voto');
      votos.set(b.dataset.n, b.dataset.v === '1');
      b.parentElement.querySelectorAll('.voto').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      gsap.fromTo(b, { scale: 1.4 }, { scale: 1, duration: .4, ease: 'elastic.out(1, .4)' });
      confirmar.disabled = votos.size < outros.length;
    }));
    corpo.querySelector('.voto').focus({ preventScroll: true });
    await aguardar(new Promise(r => confirmar.addEventListener('click', r, { once: true })));
    confirmar.remove();
    const sim = [...votos.values()].filter(Boolean).length;
    casas = sim >= votos.size - sim ? BONUS_ACERTO : 0;
    corpo.querySelector('.resposta').innerHTML = `<p class="placar-votos">👍 ${sim} &nbsp; 👎 ${votos.size - sim}</p>`;
  }
  const res = corpo.querySelector('.resposta');
  res.insertAdjacentHTML('afterbegin', `<p class="resposta-titulo ${casas ? 'ok' : 'nao'}">${casas ? `🎉 Aprovado! +${casas} casa${casas > 1 ? 's' : ''}` : 'Quase! Fica para a próxima.'}</p>`);
  som(casas ? 'certo' : 'errado');
  if (casas) confeteDe(res, { particleCount: 80 });
  await esperarContinuar(res);
  await fecharCarta();
  return casas;
}

async function cartaTema(i, tema) {
  const semDesafio = estado.jogadores.length === 1 && !estado.config.mediador;
  const compra = comprar(tema, semDesafio);
  const t = TEMAS[compra.tema], c = compra.carta;
  som('pergunta');
  await splash({ pre: t.nome, titulo: c.desafio ? 'Desafio prático!' : 'Pergunta!', cor: t.cor, icone: iconeCasa(t.letra), tempo: 450 });
  const casas = c.desafio ? await mostrarDesafio(i, compra.tema, c) : (await mostrarPergunta(i, compra.tema, c)) ? BONUS_ACERTO : 0;
  if (casas) await andar(i, casas, { seguir: false, pular: false });
}

async function cartaEvento(i, tipo) {
  const j = estado.jogadores[i], bom = tipo === 'qualificacao', ev = comprarEvento(tipo);
  som(bom ? 'qualificacao' : 'cilada');
  if (!bom) gsap.fromTo('.tabuleiro-area', { x: -12 }, { x: 0, duration: .7, ease: 'elastic.out(1.4, .2)' });
  await splash({ titulo: bom ? 'Qualificação!' : 'Cilada!', sub: bom ? 'Estudar faz a carreira andar' : 'Atitude errada atrasa a carreira', cor: bom ? '#FFFFFF' : '#161616', escuro: !bom, icone: iconeCasa(bom ? 'Q' : 'X'), tempo: 650 });
  prepararCarta({ cor: bom ? '#FFFFFF' : '#161616', icone: iconeCasa(bom ? 'Q' : 'X'), tema: bom ? 'Qualificação' : 'Cilada', tipo: bom ? 'Avance' : 'Volte' });
  $('#dlg-carta').classList.toggle('carta-escura', !bom);
  const corpo = $('#carta-corpo');
  corpo.innerHTML = `<p class="carta-quem" style="--cor:${j.cor}">${peaoSVG(j)}<span><b>${esc(j.nome)}</b></span></p>
    <p class="carta-texto">${esc(ev.texto)}</p>
    <p class="casas-badge ${bom ? 'ok' : 'nao'}">${bom ? '+' : '−'}${ev.casas} casas</p><div class="resposta"></div>`;
  await abrirCarta();
  gsap.from('.casas-badge', { scale: 0, rotation: bom ? -20 : 20, duration: .6, ease: 'elastic.out(1, .45)', delay: .2 });
  await esperarContinuar(corpo.querySelector('.resposta'));
  await fecharCarta();
  await andar(i, bom ? ev.casas : -ev.casas, { seguir: false, pular: false });
}

// Portão da chegada: na estrela não se rola o dado; acertou a pergunta, chegou.
async function desafioEstrela(i) {
  const j = estado.jogadores[i];
  som('estrela');
  confete({ particleCount: 50, shapes: ['star'], colors: ['#FC3CE4', '#00C0F0', '#FCE400'], origin: { y: .4 } });
  await splash({ pre: 'Portão da chegada', titulo: 'Desafio Estrela!', sub: 'Acertou a pergunta, chegou!', cor: '#FC3CE4', icone: iconeCasa('S'), tempo: 700 });
  const compra = comprar(sortear(Object.keys(TEMAS)), true);
  if (await mostrarPergunta(i, compra.tema, compra.carta, true)) {
    cameraPara(CASAS[j.casa].x, CASAS[j.casa].y, zoomJogo(), .5);
    await andar(i, FIM - j.casa, { seguir: false });
    await espera(400);
  } else aviso('⭐ Na próxima vez, nova pergunta-estrela!', 2000);
}

async function efeitoCasa(i) {
  const letra = MAPA[estado.jogadores[i].casa];
  if (TEMA_DA_LETRA[letra]) return cartaTema(i, TEMA_DA_LETRA[letra]);
  if (letra === 'Q') return cartaEvento(i, 'qualificacao');
  if (letra === 'X') return cartaEvento(i, 'cilada');
  if (letra === 'S') return desafioEstrela(i);
  aviso('Casa livre! Nada acontece. 😎');
  await espera(700);
}

// ============================== RODADA ==============================

async function turno(i) {
  const j = estado.jogadores[i];
  desenharPainel();
  posicionarPeoes();
  som('vez');
  await splash({ pre: estado.ultimaRodada ? 'Última chance de' : 'Vez de', titulo: j.nome,
    sub: j.casa >= PORTAO ? 'Desafio Estrela: acerte e chegue!' : NIVEIS[nivelDe(j.casa)].nome,
    cor: j.cor, icone: peaoSVG(j), tempo: estado.jogadores.length > 1 ? 600 : 250 });
  if (j.casa >= PORTAO) return desafioEstrela(i);
  const n = await rolarDado(j);
  await andar(i, n);
  if (j.casa < FIM) {
    await espera(200);
    cameraPara(500, 500, 1, .7);
    await efeitoCasa(i);
  }
}

async function rodarPartida() {
  partidaId++;
  try {
    mostrarTela('jogo');
    montarTabuleiro();
    criarPeoes();
    cam.x = cam.y = 500; cam.z = 1; aplicarCamera();
    desenharPainel();
    iniciarRelogio();
    const N = estado.jogadores.length;
    while (true) {
      salvar();
      const i = estado.vez, j = estado.jogadores[i];
      if (j.casa < FIM) {
        await turno(i);
        cameraPara(500, 500, 1, .7);
        if (j.casa >= FIM) await chegada(i);
      }
      // Fim justo: quando alguém chega (ou o tempo acaba), todos terminam a rodada
      if (!estado.ultimaRodada && (estado.jogadores.some(p => p.casa >= FIM) || estado.restanteMs === 0)) {
        estado.ultimaRodada = true;
        if (i < N - 1 && !estado.jogadores.some(p => p.casa >= FIM)) {
          som('estrela');
          await splash({ pre: 'Tempo esgotado!', titulo: 'Última rodada!', sub: 'Quem ainda não jogou nesta rodada joga mais uma vez', cor: '#F01020', icone: iconeCasa('T'), tempo: 1300 });
        }
      }
      if (estado.ultimaRodada && i === N - 1) return terminar(estado.jogadores.some(p => p.casa >= FIM) ? 'chegou' : 'tempo');
      estado.vez = (i + 1) % N;
    }
  } catch (e) {
    if (e !== CANCELADA) throw e;
  }
}

async function chegada(i) {
  const j = estado.jogadores[i];
  j.nivelMax = LIDER;
  desenharPainel();
  som('vitoria');
  confete({ particleCount: 150, spread: 110, origin: { y: .45 } });
  const continua = i < estado.jogadores.length - 1 && !estado.ultimaRodada;
  await splash({ pre: 'Chegou!', titulo: j.nome, sub: continua ? 'Virou Líder! Os outros têm uma última chance' : 'Virou Líder!', cor: '#FFD21A', icone: chaveiroSVG(LIDER), tempo: 1500 });
}

const chegou = j => j.casa >= FIM;
const cargoFinal = j => (chegou(j) ? LIDER : nivelDe(j.casa));

function terminar(motivo) {
  partidaId++;
  const id = partidaId;
  clearInterval(relogio);
  pararTempo();
  limparSave();
  gravarPref('pilhas', estado.pilhas);
  aoRolar = aoEscolher = aoContinuar = null;
  document.querySelectorAll('dialog[open]').forEach(d => d.close());
  $('#splash').hidden = true;
  const vencedores = estado.jogadores.filter(chegou);
  // vencedores primeiro (desempate: mais acertos); depois quem foi mais longe
  ranking = [...estado.jogadores].sort((a, b) => chegou(b) - chegou(a) || (chegou(a) ? b.acertos - a.acertos : b.casa - a.casa || b.acertos - a.acertos));
  const titulo = vencedores.length ? 'Chegou!' : { tempo: 'Tempo esgotado!', encerrada: 'Fim de jogo!' }[motivo] || 'Fim de jogo!';
  $('#fim-titulo').innerHTML = [...titulo].map(l => `<span>${l === ' ' ? '&nbsp;' : esc(l)}</span>`).join('');
  $('#fim-sub').textContent = vencedores.length === 1 ? `${vencedores[0].nome} chegou e virou Líder!`
    : vencedores.length ? `${listaNomes(vencedores.map(v => v.nome))} chegaram e viraram Líderes!` : 'Veja até onde cada um chegou na carreira:';
  gsap.killTweensOf('#podio *');
  $('#podio').innerHTML = ranking.map((j, k) => {
    const nivel = cargoFinal(j);
    return `<li class="podio-item${chegou(j) ? ' campeao' : ''}" style="--cor:${j.cor}">
      <span class="podio-pos">${k + 1}º</span>
      <span class="podio-peao">${peaoSVG(j, chegou(j) ? '<use href="#coroa"/>' : '')}</span>
      <b class="podio-nome">${esc(j.nome)}</b>
      <span class="podio-nivel">${esc(NIVEIS[nivel].nome)}</span>
      <span class="podio-chaveiro">${chaveiroSVG(nivel)}</span>
      <small>${j.perguntas ? `Acertou ${j.acertos} de ${j.perguntas} pergunta${j.perguntas > 1 ? 's' : ''}` : 'Nenhuma pergunta desta vez'}</small></li>`;
  }).join('');
  mostrarTela('fim');
  const cores = ['#F01020', '#FFB300', '#22B14C', '#00C0F0', '#0A60F0', '#CC30FC', '#FC3CE4'];
  document.querySelectorAll('#fim-titulo span').forEach((s, k) => (s.style.color = cores[k % cores.length]));
  gsap.from('#fim-titulo span', { y: -120, opacity: 0, rotation: () => gsap.utils.random(-40, 40), duration: .8, stagger: .06, ease: 'bounce.out' });
  gsap.from('.podio-item', { y: 80, opacity: 0, duration: .6, stagger: .15, delay: .4, ease: 'back.out(1.6)' });
  document.querySelectorAll('.podio-chaveiro svg').forEach((c, k) => loop(c, { rotation: 7, duration: 1.1 + k * .15, transformOrigin: '50% 8%', delay: k * .2 }));
  if ($('.campeao')) loop('.campeao .podio-peao', { y: -16, duration: .45 });
  som('vitoria');
  if (vencedores.length) {
    confete({ particleCount: 160, spread: 120, origin: { y: .35 } });
    setTimeout(() => confete({ angle: 60, spread: 70, origin: { x: 0, y: .7 } }), 500);
    setTimeout(() => confete({ angle: 120, spread: 70, origin: { x: 1, y: .7 } }), 900);
  }
  anunciar($('#fim-sub').textContent);
  // depois da festa do pódio, liga a câmera para as selfies do quadro de funcionários
  setTimeout(() => { if (id === partidaId && telaAtual === 'fim') iniciarSelfies(); }, 3500);
}

function pedirEncerrar() {
  if (telaAtual !== 'jogo' || !estado) return;
  tempoTween?.pause();
  const d = $('#dlg-encerrar');
  if (!d.open) d.showModal();
  gsap.from(d, { scale: .7, opacity: 0, duration: .3, ease: 'back.out(1.8)' });
  $('#btn-encerrar-sim').focus();
}

// ============================== QUADRO DE FUNCIONÁRIOS ==============================
// Fotos e cargos ficam só neste navegador (IndexedDB). Se o navegador bloquear, o quadro vale até fechar a página.

const bancoQuadro = (() => {
  let db = null;
  const abrir = () => (db ??= new Promise((ok, erro) => {
    const r = indexedDB.open('carreira-em-jogo', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('funcionarios', { keyPath: 'id', autoIncrement: true });
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  }));
  const fazer = async (modo, acao) => {
    const banco = await abrir();
    return new Promise((ok, erro) => {
      const tx = banco.transaction('funcionarios', modo), req = acao(tx.objectStore('funcionarios'));
      tx.oncomplete = () => ok(req.result);
      tx.onerror = () => erro(tx.error);
    });
  };
  return {
    adicionar: f => fazer('readwrite', s => s.add(f)),
    todos: () => fazer('readonly', s => s.getAll()),
    apagar: id => fazer('readwrite', s => s.delete(id)),
    limpar: () => fazer('readwrite', s => s.clear()),
  };
})();
const memoriaQuadro = [];
let quadroSoNaMemoria = false;
async function noQuadro(acao, semBanco) {
  if (!quadroSoNaMemoria) try { return await acao(bancoQuadro); } catch { quadroSoNaMemoria = true; }
  return semBanco();
}
const quadro = {
  adicionar: f => noQuadro(b => b.adicionar(f), () => { f.id = memoriaQuadro.length + 1; memoriaQuadro.push(f); return f.id; }),
  todos: () => noQuadro(b => b.todos(), () => [...memoriaQuadro]),
  apagar: id => noQuadro(b => b.apagar(id), () => { const k = memoriaQuadro.findIndex(f => f.id === id); if (k >= 0) memoriaQuadro.splice(k, 1); }),
  limpar: () => noQuadro(b => b.limpar(), () => { memoriaQuadro.length = 0; }),
};

const crachaHTML = (f, novo = false) => {
  const nv = NIVEIS[f.nivel] || NIVEIS[0];
  const foto = typeof f.foto === 'string' && f.foto.startsWith('data:image/')
    ? `<img src="${esc(f.foto)}" alt="Foto de ${esc(f.nome)}">` : `<span class="selfie-avatar">${peaoSVG(f)}</span>`;
  return `<li class="cracha${novo ? ' novo' : ''}" style="--nivel:${nv.cor}; --cor:${esc(f.cor)}">
    <span class="cracha-presilha" aria-hidden="true"></span>
    <div class="cracha-topo"><img src="img/logo.png" alt=""><span>Carreira em Jogo</span></div>
    <div class="cracha-foto">${foto}</div>
    <b class="cracha-nome">${esc(f.nome)}</b>
    <span class="cracha-cargo">${esc(nv.nome)}</span>
    <small class="cracha-data">Contratação: ${esc(new Date(f.data).toLocaleDateString('pt-BR'))}</small>
    ${novo ? '<span class="cracha-novo">Novo!</span>' : ''}
    <button class="cracha-apagar" data-apagar="${f.id}" aria-label="Apagar ${esc(f.nome)} do quadro">✕</button></li>`;
};

async function mostrarQuadro(novos = []) {
  desligarCamera();
  const lista = (await quadro.todos()).sort((a, b) => String(b.data).localeCompare(String(a.data)) || b.id - a.id);
  $('#quadro').innerHTML = lista.map(f => crachaHTML(f, novos.includes(f.id))).join('');
  $('#quadro-vazio').hidden = lista.length > 0;
  $('#quadro-sub').textContent = `${lista.length} ${lista.length === 1 ? 'pessoa contratada' : 'pessoas contratadas'} pelo Carreira em Jogo${quadroSoNaMemoria ? ' · ⚠️ este navegador não deixou salvar: o quadro some ao fechar a página' : ''}`;
  $('#quadro-resumo').innerHTML = NIVEIS.map((nv, k) => [nv, lista.filter(f => f.nivel === k).length]).filter(([, n]) => n).reverse()
    .map(([nv, n]) => `<li style="--nivel:${nv.cor}"><b>${n}</b> ${esc(nv.nome)}</li>`).join('');
  mostrarTela('quadro');
  gsap.from('#quadro .cracha', { y: 50, opacity: 0, rotation: () => gsap.utils.random(-8, 8), duration: .5, stagger: .04, ease: 'back.out(1.6)' });
  if (novos.length) {
    confete({ particleCount: 140, spread: 110, origin: { y: .3 } });
    gsap.from('.cracha-novo', { scale: 0, rotation: -40, duration: .6, delay: .5, stagger: .1, ease: 'elastic.out(1, .4)' });
  }
}

// ---------- Selfie com a webcam ----------
let camera = null, aoEscolherSelfie = null;

async function ligarCamera() {
  if (camera) return camera;
  if (!navigator.mediaDevices?.getUserMedia) throw Object.assign(new Error('sem suporte'), { name: 'SemSuporte' });
  camera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } }, audio: false });
  return camera;
}
function desligarCamera() {
  camera?.getTracks().forEach(t => t.stop());
  camera = null;
  $('#selfie-video').srcObject = null;
}
function erroCamera(e) {
  const msg = {
    NotAllowedError: 'A câmera foi bloqueada. Para liberar, toque no ícone da câmera na barra de endereço. Você também pode escolher uma foto ou seguir sem foto.',
    NotFoundError: 'Nenhuma câmera encontrada neste aparelho. Você pode escolher uma foto ou seguir sem foto.',
    NotReadableError: 'A câmera está sendo usada por outro programa. Feche-o e tente de novo, ou siga sem foto.',
    SemSuporte: 'Este navegador não liberou a câmera aqui. Abra o jogo pelo servidor local (http://localhost) ou no Chrome, ou siga sem foto.',
  }[e?.name] || 'Não foi possível ligar a câmera. Você pode escolher uma foto ou seguir sem foto.';
  $('#selfie-erro').textContent = msg;
  $('#selfie-erro').hidden = false;
}

function escolherSelfie(opcoes) {
  const caixa = $('#selfie-botoes');
  caixa.innerHTML = opcoes.map(([valor, texto, classe]) => `<button class="${classe}" data-valor="${valor}">${texto}</button>`).join('');
  gsap.from('#selfie-botoes .btn', { y: 20, opacity: 0, duration: .3, stagger: .06, ease: 'back.out(1.7)' });
  caixa.querySelector('button').focus({ preventScroll: true });
  return new Promise(ok => {
    aoEscolherSelfie = ok;
    caixa.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { aoEscolherSelfie = null; ok(b.dataset.valor); }, { once: true }));
  });
}

function quadrado(origem, largura, altura, espelhar) {
  const lado = Math.min(largura, altura), c = document.createElement('canvas');
  c.width = c.height = 480;
  const ctx = c.getContext('2d');
  if (espelhar) { ctx.translate(480, 0); ctx.scale(-1, 1); }
  ctx.drawImage(origem, (largura - lado) / 2, (altura - lado) / 2, lado, lado, 0, 0, 480, 480);
  return c.toDataURL('image/jpeg', .85);
}

async function capturar(video) {
  const cont = $('#selfie-contagem');
  $('#selfie-botoes').innerHTML = '';
  cont.hidden = false;
  for (const n of [3, 2, 1]) {
    cont.textContent = n;
    som('tique');
    gsap.fromTo(cont, { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: 'back.out(2)' });
    await new Promise(r => setTimeout(r, 800));
  }
  cont.hidden = true;
  som('virar');
  gsap.fromTo('#selfie-flash', { opacity: 1 }, { opacity: 0, duration: .7 });
  return video.videoWidth ? quadrado(video, video.videoWidth, video.videoHeight, true) : null;
}

function lerArquivo() {
  const input = $('#selfie-arquivo');
  input.value = '';
  return new Promise(ok => {
    input.oncancel = () => ok(null);
    input.onchange = () => {
      const arq = input.files[0];
      if (!arq) return ok(null);
      const img = new Image();
      img.onload = () => { ok(quadrado(img, img.naturalWidth, img.naturalHeight, false)); URL.revokeObjectURL(img.src); };
      img.onerror = () => ok(null);
      img.src = URL.createObjectURL(arq);
    };
    input.click();
  });
}

// Tira a selfie de um participante; devolve { foto } (foto pode ser null) ou 'parar'
async function selfie(p) {
  const nv = NIVEIS[p.nivel], video = $('#selfie-video'), img = $('#selfie-img'), avatar = $('#selfie-avatar');
  $('#selfie-cracha').style.setProperty('--nivel', nv.cor);
  $('#selfie-cracha').style.setProperty('--cor', p.cor);
  $('#selfie-nome').textContent = p.nome;
  $('#selfie-cargo').textContent = nv.nome;
  $('#selfie-dica').textContent = `${p.nome} conquistou o cargo de ${nv.nome}! Sorria para a câmera. 📸`;
  avatar.innerHTML = peaoSVG(p);
  $('#selfie-erro').hidden = true;
  img.hidden = true;
  let temCamera = true;
  try {
    video.srcObject = await ligarCamera();
    await video.play();
  } catch (e) { temCamera = false; erroCamera(e); }
  const mostrar = qual => { video.hidden = qual !== 'video'; img.hidden = qual !== 'foto'; avatar.hidden = qual !== 'avatar'; };
  mostrar(temCamera ? 'video' : 'avatar');
  gsap.from('#selfie-cracha', { scale: .8, rotation: -6, opacity: 0, duration: .45, ease: 'back.out(1.7)' });
  anunciar($('#selfie-dica').textContent);
  while (true) {
    const acao = await escolherSelfie([
      temCamera ? ['foto', '📸 Tirar foto', 'btn btn-gigante'] : ['arquivo', '📁 Escolher foto', 'btn'],
      ['sem', 'Sem foto', 'btn btn-branco'],
      ['parar', 'Pular todos', 'btn btn-branco btn-pequeno'],
    ]);
    if (acao === 'parar') return 'parar';
    if (acao === 'sem') return { foto: null };
    const foto = acao === 'foto' ? await capturar(video) : await lerArquivo();
    if (!foto) continue;
    img.src = foto;
    mostrar('foto');
    gsap.from(img, { scale: 1.15, duration: .4, ease: 'power2.out' });
    if (await escolherSelfie([['salvar', '✔ Salvar no quadro', 'btn btn-gigante'], ['outra', '🔁 Tirar outra', 'btn btn-branco']]) === 'salvar') return { foto };
    mostrar(temCamera ? 'video' : 'avatar');
  }
}

async function iniciarSelfies() {
  const pendentes = ranking.filter(j => !j.registrado);
  if (!pendentes.length) return mostrarQuadro();
  const dlg = $('#dlg-selfie'), novos = [];
  if (!dlg.open) dlg.showModal();
  for (const j of pendentes) {
    const r = await selfie({ ...j, nivel: cargoFinal(j) });
    if (r === 'parar') break;
    const registro = { nome: j.nome, cor: j.cor, chapeu: j.chapeu, nivel: cargoFinal(j), foto: r.foto, acertos: j.acertos, perguntas: j.perguntas, data: new Date().toISOString() };
    try {
      novos.push(await quadro.adicionar(registro));
      j.registrado = true;
      som('certo');
    } catch { $('#selfie-erro').textContent = 'Não consegui salvar no quadro.'; $('#selfie-erro').hidden = false; }
  }
  desligarCamera();
  dlg.close();
  await mostrarQuadro(novos);
}

// ============================== TELA INICIAL E LOBBY ==============================

let lobby = lerPref('lobby', null);
if (!Array.isArray(lobby) || lobby.length !== CORES.length || !lobby.every(v => v && typeof v.nome === 'string')) lobby = CORES.map((c, i) => ({ ativo: i < 2, nome: '', chapeu: CHAPEUS[i].id }));

function desenharLobby() {
  gsap.killTweensOf('#vagas svg');
  $('#vagas').innerHTML = CORES.map((c, i) => {
    const v = lobby[i], ch = CHAPEUS.find(h => h.id === v.chapeu) || CHAPEUS[0];
    if (!v.ativo) return `<div class="vaga vazia" style="--cor:${c.cor}"><button class="vaga-add" data-i="${i}">
      <span class="vaga-peao fantasma">${peaoSVG({ cor: c.cor, chapeu: 'nenhum' })}</span>+ Adicionar ${c.nome}</button></div>`;
    return `<div class="vaga" style="--cor:${c.cor}">
      ${lobby.filter(x => x.ativo).length > 1 ? `<button class="vaga-remover" data-i="${i}" aria-label="Remover jogador ${c.nome}">✕</button>` : ''}
      <span class="vaga-peao">${peaoSVG({ cor: c.cor, chapeu: v.chapeu })}</span>
      <span class="vaga-cor">${c.nome}</span>
      <input class="vaga-nome" data-i="${i}" maxlength="14" value="${esc(v.nome)}" placeholder="Nome ou equipe" aria-label="Nome do jogador ${c.nome}" autocomplete="off">
      <span class="chapeu-sel">
        <button data-i="${i}" data-d="-1" aria-label="Chapéu anterior">◀</button>
        <span class="chapeu-nome"><b>${ch.nome}</b><small>${ch.area || '—'}</small></span>
        <button data-i="${i}" data-d="1" aria-label="Próximo chapéu">▶</button>
      </span></div>`;
  }).join('');
  document.querySelectorAll('.vaga:not(.vazia) .vaga-peao svg').forEach((s, k) => loop(s, { y: -6, duration: .7 + k * .1 }));
}

const LIMITES = { 'cfg-tempo': [0, 600], 'cfg-desafio': [0, 600], 'cfg-duracao': [0, 240] };
function lerNumero(id, padrao) {
  const v = Math.round(Number($('#' + id).value));
  return Number.isFinite(v) && $('#' + id).value !== '' ? Math.min(LIMITES[id][1], Math.max(LIMITES[id][0], v)) : padrao;
}

function marcarAtalhos() {
  document.querySelectorAll('.atalhos').forEach(g => g.querySelectorAll('button').forEach(b => b.classList.toggle('ativo', b.dataset.valor === String(Number($('#' + g.dataset.alvo).value)))));
}

function iniciarLobby() {
  desenharLobby();
  const cfg = { ...CONFIG_PADRAO, ...lerPref('config', {}) };
  $('#cfg-tempo').value = cfg.tempo;
  $('#cfg-desafio').value = cfg.desafio;
  $('#cfg-duracao').value = cfg.duracao;
  $('#cfg-mediador').checked = !!cfg.mediador;
  marcarAtalhos();
  mostrarTela('lobby');
  gsap.from('.vaga', { y: 60, opacity: 0, duration: .5, stagger: .08, ease: 'back.out(1.7)' });
}

function comecar() {
  const config = { tempo: lerNumero('cfg-tempo', 45), desafio: lerNumero('cfg-desafio', 45), duracao: lerNumero('cfg-duracao', 0), mediador: $('#cfg-mediador').checked };
  gravarPref('config', config);
  gravarPref('lobby', lobby);
  const jogadores = CORES.map((c, i) => ({ ...c, chapeu: lobby[i].chapeu, nome: lobby[i].nome.trim() || c.nome, ativo: lobby[i].ativo }))
    .filter(j => j.ativo).map(({ ativo, ...j }) => j);
  novaPartida(jogadores, config);
  revelacao().then(rodarPartida);
}

// Tela "sua jornada começa" (inspirada na revelação de papéis do Among Us); um toque pula
let revelacaoTl = null;
async function revelacao() {
  const el = $('#revelacao');
  el.querySelector('.revelacao-peoes').innerHTML = estado.jogadores.map((j, k) => `<span style="--cor:${j.cor}">${peaoSVG(j)}<b>${k + 1}º ${esc(j.nome)}</b></span>`).join('');
  el.hidden = false;
  anunciar('Sua jornada começa! Todos começam como Jovem Aprendiz.');
  som('promocao');
  const tl = (revelacaoTl = gsap.timeline());
  tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .25 })
    .from('.revelacao h2', { scale: 3, opacity: 0, duration: .5, ease: 'power3.out' })
    .from('.revelacao-peoes span', { y: 120, opacity: 0, duration: .5, stagger: .1, ease: 'back.out(1.8)' }, '-=.2')
    .from('.revelacao p', { opacity: 0, y: 20, duration: .35 })
    .to(el, { opacity: 0, duration: .35 }, '+=1.1');
  await tl;
  revelacaoTl = null;
  el.hidden = true;
}

function telaInicial() {
  $('#btn-continuar').hidden = !lerSave();
  if (!$('.eng-titulo')) {
    $('.engrenagem-logo').insertAdjacentHTML('afterbegin', `<svg class="eng-titulo" viewBox="0 0 400 400" aria-hidden="true"><path d="${engrenagemD(200, 200, 196, 26, 24)}" fill="#9090A0" stroke="#111" stroke-width="8" stroke-linejoin="round"/><circle cx="200" cy="200" r="162" fill="#7d7d8c" stroke="#111" stroke-width="6"/></svg>`);
    loop('.eng-titulo', { rotation: 360, duration: 30, ease: 'none', yoyo: false });
  }
  gsap.killTweensOf('#desfile svg');
  $('#desfile').innerHTML = CORES.map((c, i) => peaoSVG({ cor: c.cor, chapeu: ['capacete', 'headset', 'chef', 'oculos'][i] })).join('');
  mostrarTela('inicio');
  gsap.from('.inicio-logo', { scale: .3, rotation: -25, opacity: 0, duration: .9, ease: 'elastic.out(1, .55)' });
  gsap.from('#desfile svg', { y: 140, opacity: 0, duration: .6, stagger: .1, delay: .3, ease: 'back.out(1.8)' });
  document.querySelectorAll('#desfile svg').forEach((s, k) => loop(s, { y: -14, rotation: k % 2 ? 4 : -4, duration: .5 + k * .07, delay: 1 + k * .1 }));
  if (problemasConteudo.length) {
    $('#erro-conteudo').hidden = false;
    $('#erro-conteudo').innerHTML = `<b>⚠️ Atenção, mediador:</b> ${problemasConteudo.map(esc).join(' ')}`;
  }
}

// ============================== MENU E LIGAÇÕES ==============================

function atualizarBotaoSom() { $('#btn-som').textContent = somLigado ? '🔊 Som: ligado' : '🔇 Som: desligado'; }

// Botões que pedem confirmação com um segundo toque (apagar do quadro)
function confirmarToque(b, texto) {
  if (b.dataset.confirmando) return true;
  const original = b.innerHTML;
  b.dataset.confirmando = '1';
  b.textContent = texto;
  b.classList.add('confirmando');
  setTimeout(() => { delete b.dataset.confirmando; b.innerHTML = original; b.classList.remove('confirmando'); }, 3000);
  return false;
}

function ligarEventos() {
  document.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (!b.closest('.dado-area') && !b.classList.contains('voto')) som('clique');
    if (b.dataset.abrir) { const d = $('#' + b.dataset.abrir); if (!d.open) d.showModal(); gsap.from(d, { scale: .7, opacity: 0, duration: .35, ease: 'back.out(1.8)' }); }
    if (b.hasAttribute('data-fechar')) b.closest('dialog').close();
    if (b.hasAttribute('data-encerrar')) pedirEncerrar();
    if (b.classList.contains('btn-continuar') && b.id !== 'btn-votos') aoContinuar?.();
  });

  $('#btn-jogar').onclick = iniciarLobby;
  $('#btn-continuar').onclick = () => { estado = lerSave(); if (estado) rodarPartida(); };
  $('#btn-ver-quadro').onclick = () => mostrarQuadro();
  $('#btn-voltar').onclick = telaInicial;
  $('#btn-comecar').onclick = comecar;
  $('#btn-selfies').onclick = iniciarSelfies;
  $('#btn-revanche').onclick = () => { novaPartida(estado.jogadores.map(({ nome, cor, chapeu }) => ({ nome, cor, chapeu })), estado.config); revelacao().then(rodarPartida); };
  $('#btn-novo').onclick = iniciarLobby;
  $('#btn-inicio').onclick = telaInicial;
  $('#btn-quadro-jogar').onclick = iniciarLobby;
  $('#btn-quadro-inicio').onclick = telaInicial;
  $('#btn-quadro-limpar').onclick = async e => {
    if (!confirmarToque(e.currentTarget, 'Toque de novo para apagar tudo')) return;
    await quadro.limpar();
    mostrarQuadro();
  };
  $('#quadro').addEventListener('click', async e => {
    const b = e.target.closest('[data-apagar]');
    if (!b || !confirmarToque(b, 'Apagar?')) return;
    const item = b.closest('.cracha');
    await quadro.apagar(+b.dataset.apagar);
    gsap.to(item, { scale: .6, opacity: 0, rotation: 12, duration: .35, onComplete: () => mostrarQuadro() });
  });

  // Lobby: botões − e +, atalhos de tempo e digitação livre
  document.querySelector('.ajustes').addEventListener('click', e => {
    const passo = e.target.closest('[data-passo]'), atalho = e.target.closest('.atalhos [data-valor]');
    if (passo) {
      const id = passo.dataset.alvo, [min, max] = LIMITES[id];
      $('#' + id).value = Math.min(max, Math.max(min, (Number($('#' + id).value) || 0) + Number(passo.dataset.passo)));
    } else if (atalho) $('#' + atalho.parentElement.dataset.alvo).value = atalho.dataset.valor;
    marcarAtalhos();
  });
  document.querySelector('.ajustes').addEventListener('input', marcarAtalhos);
  $('#vagas').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = +b.dataset.i;
    if (b.classList.contains('vaga-add')) lobby[i].ativo = true;
    else if (b.classList.contains('vaga-remover')) lobby[i].ativo = false;
    else if (b.dataset.d) {
      const k = CHAPEUS.findIndex(h => h.id === lobby[i].chapeu);
      lobby[i].chapeu = CHAPEUS[(k + +b.dataset.d + CHAPEUS.length) % CHAPEUS.length].id;
    } else return;
    const foco = b.classList.contains('vaga-add') ? `.vaga-nome[data-i="${i}"]` : b.dataset.d ? `.chapeu-sel button[data-i="${i}"][data-d="${b.dataset.d}"]` : '#btn-comecar';
    desenharLobby();
    gravarPref('lobby', lobby);
    $(foco)?.focus();
    const peao = $(`.vaga-nome[data-i="${i}"]`)?.closest('.vaga')?.querySelector('.vaga-peao');
    if (peao) gsap.fromTo(peao, { scale: .7, rotation: -10 }, { scale: 1, rotation: 0, duration: .5, ease: 'elastic.out(1, .4)' });
  });
  $('#vagas').addEventListener('input', e => {
    if (!e.target.classList.contains('vaga-nome')) return;
    lobby[+e.target.dataset.i].nome = e.target.value;
    gravarPref('lobby', lobby);
  });

  $('#dado').onclick = () => rolar();
  $('#dado-numeros').addEventListener('click', e => { const b = e.target.closest('button[data-n]'); if (b) rolar(+b.dataset.n); });
  $('#splash').addEventListener('click', pularSplash);
  $('#revelacao').addEventListener('click', () => revelacaoTl?.progress(1));
  $('#btn-menu').onclick = () => { $('#dlg-menu').showModal(); gsap.from('#dlg-menu', { scale: .7, opacity: 0, duration: .35, ease: 'back.out(1.8)' }); };
  $('#btn-som').onclick = () => { somLigado = !somLigado; gravarPref('som', somLigado); atualizarBotaoSom(); };
  if (!document.fullscreenEnabled) $('#btn-tela-cheia').hidden = true;
  $('#btn-tela-cheia').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(() => {});

  $('#btn-encerrar-sim').onclick = () => { $('#dlg-encerrar').close(); terminar('encerrada'); };
  $('#dlg-encerrar').addEventListener('close', () => { if (telaAtual === 'jogo') tempoTween?.resume(); });

  // Carta: não fecha com Esc; atalhos 1-4 / A-D para responder
  $('#dlg-carta').addEventListener('cancel', e => e.preventDefault());
  $('#dlg-carta').addEventListener('keydown', e => {
    const k = Math.max('1234'.indexOf(e.key), 'abcd'.indexOf(e.key.toLowerCase()));
    if (k >= 0 && aoEscolher && $(`.opcao[data-k="${k}"]`)) { e.preventDefault(); $(`.opcao[data-k="${k}"]`).click(); }
  });
  // Selfie: Esc equivale a "Pular todos"
  $('#dlg-selfie').addEventListener('cancel', e => { e.preventDefault(); aoEscolherSelfie?.('parar'); });

  document.addEventListener('keydown', e => {
    if (e.repeat) return;
    if ((splashTl || revelacaoTl) && [' ', 'Enter', 'Escape'].includes(e.key)) { e.preventDefault(); splashTl ? pularSplash() : revelacaoTl.progress(1); return; }
    if (document.querySelector('dialog[open]') || telaAtual !== 'jogo') return;
    if (e.key === 'Escape') return $('#btn-menu').click();
    if (aoRolar && estado?.config.mediador && /^[1-6]$/.test(e.key)) return rolar(+e.key);
    if ((e.key === ' ' || e.key === 'Enter') && aoRolar && !e.target.closest('button, input, a')) { e.preventDefault(); rolar(); }
  });

  $('#legenda').innerHTML = [
    ['.', 'Casa livre', 'Nada acontece. Ufa!'],
    ['E', TEMAS.etica.nome, 'Atitudes no trabalho, entrevista e trabalho em equipe.'],
    ['R', TEMAS.rotinas.nome, 'Atendimento, e-mail, documentos e organização.'],
    ['T', TEMAS.tempo.nome, 'Prioridades, prazos, foco e planejamento.'],
    ['F', TEMAS.financas.nome, 'Orçamento, salário, direitos e golpes.'],
    ['Q', 'Qualificação', 'Estudou, cresceu: avance 2 ou 3 casas.'],
    ['X', 'Cilada', 'Atitude errada: volte 2 ou 3 casas.'],
    ['S', 'Desafio Estrela', 'O peão para na 1ª estrela. Acertou, chegou! Errou, tenta de novo na próxima vez.'],
  ].map(([l, nome, txt]) => `<li>${iconeCasa(l)}<span><b>${esc(nome)}</b>${esc(txt)}</span></li>`).join('') +
    `<li class="legenda-dica"><span><b>Casa colorida:</b> pergunta (acertou, +${BONUS_ACERTO} casas; errou, fica e aprende) ou desafio prático, avaliado pelo mediador ou pela votação dos outros jogadores. Só vale a casa onde o dado te levou.</span></li>`;
}

// ============================== INÍCIO ==============================

carregarConteudo();
montarDado();
atualizarBotaoSom();
ligarEventos();
telaInicial();
