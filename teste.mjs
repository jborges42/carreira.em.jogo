// Teste automático: joga partidas inteiras no Chrome headless e falha se travar, der erro ou não registrar no quadro.
// Uso: node teste.mjs   (precisa de Node 22+ e do Google Chrome instalado)
import { createServer } from 'node:http';
import { readFile, mkdtemp } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, extname } from 'node:path';

const PASTA = new URL('.', import.meta.url).pathname;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.woff2': 'font/woff2' };

const servidor = createServer(async (req, res) => {
  try {
    const caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname.replace(/\/$/, '/index.html'));
    res.writeHead(200, { 'Content-Type': TIPOS[extname(caminho)] || 'application/octet-stream' }).end(await readFile(join(PASTA, caminho)));
  } catch { res.writeHead(404).end(); }
}).listen(0, '127.0.0.1');
await new Promise(r => servidor.once('listening', r));
const URL_JOGO = `http://127.0.0.1:${servidor.address().port}/`;

const porta = 9400 + Math.floor(Math.random() * 500);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${await mkdtemp(join(tmpdir(), 'cej-teste-'))}`,
  '--no-first-run', '--mute-audio', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
let alvo;
for (let i = 0; i < 80 && !alvo; i++) {
  await new Promise(r => setTimeout(r, 150));
  try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json()).find(t => t.type === 'page'); } catch { /* Chrome ainda abrindo */ }
}
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => (ws.onopen = r));
let seq = 0;
const pend = new Map(), erros = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') erros.push(m.params.args.map(a => a.value ?? a.description).join(' '));
};
const cmd = (method, params = {}) => new Promise(r => { const id = ++seq; pend.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const js = async expr => (await cmd('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;
const espera = ms => new Promise(r => setTimeout(r, ms));
await cmd('Runtime.enable');
await cmd('Page.enable');
// movimento reduzido: o próprio jogo acelera as animações, o que deixa o teste rápido
await cmd('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

// Joga clicando no que estiver na tela (dado, alternativas, votos, avaliação, continuar, selfie "Sem foto")
const PASSO = `(() => {
  const vis = s => [...document.querySelectorAll(s)].find(e => !e.disabled && e.offsetParent !== null);
  if (splashTl) { pularSplash(); return 'splash'; }
  const b = vis('#dlg-selfie[open] [data-valor="sem"]') || vis('.opcao') || vis('.juiz .btn') || vis('.btn-continuar:not(#btn-votos)') || vis('#dado');
  if (!b && vis('.voto')) { document.querySelectorAll('.voto[data-v="1"]').forEach(v => v.click()); vis('#btn-votos')?.click(); return 'votos'; }
  b?.click();
  return telaAtual;
})()`;

const CENARIOS = [
  { nome: 'solo, expert', jogadores: 1, config: { dificuldade: 3 } },
  { nome: '4 jogadores com mediador, fácil', jogadores: 4, config: { mediador: true, tempo: 30, dificuldade: 0 } },
  { nome: '3 jogadores, partida de 1 minuto, difícil', jogadores: 3, config: { duracao: 1, dificuldade: 2 } },
  { nome: '2 jogadores, votação, médio', jogadores: 2, config: { tempo: 0, desafio: 0 } },
];
let falhas = 0;
for (const c of CENARIOS) {
  erros.length = 0;
  await cmd('Page.navigate', { url: URL_JOGO });
  await espera(1200);
  await js(`quadroSoNaMemoria = true; novaPartida(CORES.slice(0, ${c.jogadores}).map((p, i) => ({ ...p, chapeu: 'capacete' })), ${JSON.stringify(c.config)}); rodarPartida(); true`);
  const inicio = Date.now();
  let tela = 'jogo';
  while (Date.now() - inicio < 240000 && tela !== 'quadro') { tela = await js(PASSO); await espera(120); }
  const r = await js(`(async () => ({ tela: telaAtual, quadro: (await quadro.todos()).length,
    soDoNivel: Object.keys(TEMAS).every(t => Array.from({ length: 30 }, () => comprar(t, false)).every(c => BARALHOS[c.tema][estado.config.dificuldade].includes(c.carta))),
    jogadores: estado.jogadores.map(j => ({ casa: j.casa, nivel: cargoFinal(j), marco: j.marco, perguntas: j.perguntas,
      obrigatorias: NIVEIS.slice(1).filter(n => j.casa >= n.desde).length })) }))()`);
  const problemas = [];
  if (r.tela !== 'quadro') problemas.push(`não chegou ao quadro (parou em "${r.tela}")`);
  if (r.quadro !== c.jogadores) problemas.push(`quadro com ${r.quadro} crachás, esperado ${c.jogadores}`);
  // o cargo nunca cai (errar pode tirar o domínio de um tema depois da promoção), mas não passa das avaliações feitas
  if (r.jogadores.some(j => j.casa < 0 || j.casa > 34 || (j.nivel === 4 && j.casa !== 34) || j.nivel > j.marco)) problemas.push('cargo final inconsistente com a casa ou com as avaliações feitas');
  if (r.jogadores.some(j => j.perguntas < j.obrigatorias)) problemas.push('alguém passou por um marco de cargo sem responder a avaliação');
  if (!r.soDoNivel) problemas.push('saiu carta de outra dificuldade');
  if (!c.config.duracao && !r.jogadores.some(j => j.casa === 34)) problemas.push('partida sem tempo terminou sem ninguém chegar');
  if (erros.length) problemas.push('erros no console: ' + erros.join(' | '));
  console.log(`${problemas.length ? '✗' : '✓'} ${c.nome} — ${((Date.now() - inicio) / 1000).toFixed(0)} s, casas finais ${r.jogadores.map(j => j.casa).join('/')}`);
  problemas.forEach(p => console.log('   ' + p));
  falhas += problemas.length ? 1 : 0;
}
ws.close(); chrome.kill(); servidor.close();
console.log(falhas ? `${falhas} cenário(s) com falha` : 'Tudo certo!');
process.exit(falhas ? 1 : 0);
