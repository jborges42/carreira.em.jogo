# Carreira em Jogo — versão digital

Jogo de tabuleiro no navegador baseado no projeto **Carreira em Jogo** (SENAI Videira/SC, Mundo SENAI 2026).
Funciona sem internet: HTML, CSS e JavaScript, com as bibliotecas GSAP e canvas-confetti salvas em `lib/`.

## Como abrir

Na pasta do projeto, rode:

```bash
python3 -m http.server 8080
```

e abra **http://localhost:8080** no Chrome ou no Edge. A câmera da selfie só liga em `localhost` ou `https`.
No DataShow, use o botão **☰ → Tela cheia**.

## Deploy na Vercel

Site estático, sem build. Na Vercel: **Add New → Project → importe este repositório → Deploy** (Framework Preset: *Other*).
Cada push na `main` publica de novo. Como a Vercel usa `https`, a câmera da selfie funciona.

## Como jogar (resumo)

1. Até 4 jogadores ou equipes. Cada um escolhe nome e chapéu de profissão.
2. Role o dado e ande. Casa colorida = carta do tema (roxo: Ética · ciano: Rotinas · vermelho: Tempo · verde: Finanças).
   Acertou a pergunta, avança 2 casas. Desafio prático: o mediador avalia (+2/+1/0) ou os outros jogadores votam.
3. Capelo (Qualificação) avança; caveira (Cilada) volta. Só vale a casa onde o dado te levou.
4. Na 1ª estrela o peão para. Para chegar, acerte o **Desafio Estrela**.
5. Quando alguém chega, os outros jogam uma última vez. Cada um ganha o cargo alcançado
   (Jovem Aprendiz → Júnior → Pleno → Sênior → Líder), tira a selfie e entra no **Quadro de Funcionários**.

No lobby dá para ajustar o tempo de resposta, o tempo do desafio, a duração da partida (0 = sem limite) e ligar
o **modo mediador**, que também libera os botões 1–6 para usar o resultado do dado de espuma.
A partida pode ser encerrada a qualquer momento pelo botão **⏹ Encerrar**.

## Como editar as perguntas

Tudo fica em `perguntas.js`, com instruções no topo do arquivo. Cada baralho tem 25 cartas (20 perguntas e 5 desafios práticos):

```js
{ pergunta: "Texto", certa: "Resposta certa", erradas: ["Errada 1", "Errada 2"], explicacao: "Por quê" },
{ desafio: "O que fazer em voz alta", criterio: "O que observar para aprovar" },
```

O jogo embaralha as alternativas sozinho. Se faltar uma vírgula ou aspas, a tela inicial avisa o mediador.

## Privacidade do quadro de funcionários

As selfies e os cargos ficam **apenas neste computador**, no armazenamento do navegador (IndexedDB), e nada é enviado
para a internet. Quem não quiser foto escolhe **Sem foto** (o crachá usa o peão). Para apagar uma pessoa, toque no ✕ do
crachá duas vezes; para apagar tudo, use **Apagar o quadro**.

## Créditos

Sons: pacotes CC0 de [Kenney](https://kenney.nl) (`som/LICENCA-KENNEY-CC0.txt`). Fontes: Lilita One e Nunito (SIL OFL).
Logo, verso da carta e chaveiro: imagens do documento do projeto.
