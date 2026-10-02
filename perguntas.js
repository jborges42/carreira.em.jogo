// =====================================================================
//  CARREIRA EM JOGO — banco de cartas (edite à vontade!)
// =====================================================================
//  São 4 baralhos, um para cada cor do tabuleiro. Cada baralho tem 4 níveis
//  de dificuldade, e o mediador escolhe um deles no lobby:
//    facil   → situações do dia a dia, para quem está começando
//    medio   → o básico do mundo do trabalho, para jovens aprendizes
//    dificil → termos técnicos, leis e contas simples (curso técnico)
//    expert  → casos e cálculos de várias etapas, para profissionais
//  A partida só usa as cartas do nível escolhido. Mantenha umas 10
//  perguntas em cada nível, para não repetir tanto.
//
//  PERGUNTA:
//    { pergunta: "Texto", certa: "Resposta certa",
//      erradas: ["Errada 1", "Errada 2"], explicacao: "Por que a certa é certa" },
//    → o jogo embaralha as alternativas sozinho; pode ter 1, 2 ou 3 erradas
//      (nos níveis difícil e expert usamos 3, para ficar mais desafiador).
//
//  DESAFIO PRÁTICO (feito em voz alta; o mediador avalia ou os outros votam):
//    { desafio: "O que fazer", criterio: "O que observar para aprovar" },
//
//  Cuidados: cada carta fica entre { } e termina com vírgula; textos entre
//  aspas "..." e, se precisar de aspas dentro do texto, use “ ” (curvas)
//  ou \" (numa fórmula de planilha, por exemplo).
//  Se algo quebrar, a tela inicial avisa o mediador e mostra a linha.
// =====================================================================

const CARTAS = {
  // ---------- ÉTICA E POSTURA (roxo, ?) ----------
  etica: {
    facil: [
      {
        pergunta: "O Renan percebeu que errou a contagem de peças do estoque, e ninguém notou. O que ele deve fazer?",
        certa: "Avisar a liderança, mesmo que leve uma bronca",
        erradas: ["Ficar quieto e torcer para ninguém perceber", "Contar à liderança que foi erro do sistema"],
        explicacao: "Assumir um erro é sinal de honestidade e evita prejuízos maiores. Quem admite as próprias falhas ganha a confiança da equipe.",
      },
      {
        pergunta: "Um colega vai faltar e pede à Camila que registre o ponto (horário de entrada) dele. O que ela deve fazer?",
        certa: "Recusar com educação, pois isso engana a empresa",
        erradas: ["Registrar, porque amigo de verdade sempre ajuda", "Registrar só hoje, se ele prometer não pedir mais"],
        explicacao: "Marcar o ponto de outra pessoa é fraude, mesmo que seja uma vez só, e pode trazer punição para os dois. Ser leal ao colega não justifica mentir.",
      },
      {
        pergunta: "A Bruna sabe de um produto que a empresa ainda vai lançar, e isso é segredo. Uma amiga quer detalhes. O que a Bruna deve fazer?",
        certa: "Não contar nada, pois é sigilo da empresa",
        erradas: ["Contar tudo, mas pedir à amiga que não espalhe", "Postar uma dica misteriosa para criar suspense"],
        explicacao: "Guardar sigilo é não revelar o que a empresa confiou a você. Contar “só para uma amiga” já quebra o sigilo e pode causar prejuízo à empresa.",
      },
      {
        pergunta: "A Lívia vai procurar o primeiro emprego e lembra que tem postagens antigas com palavrões e ofensas. O que ela deve fazer?",
        certa: "Revisar o perfil e apagar o que passa má impressão",
        erradas: ["Deixar como está, pois empresa não olha rede social", "Trocar a foto por uma mais séria e manter o resto"],
        explicacao: "Quem seleciona pessoas para uma vaga pode olhar as redes sociais. O que você posta faz parte da sua imagem profissional, para o bem ou para o mal.",
      },
      {
        pergunta: "Alguns colegas imitam o sotaque da Ana, que veio de outro estado, e ela não gosta. O que eles devem fazer?",
        certa: "Parar, porque isso desrespeita e magoa a colega",
        erradas: ["Continuar, porque é só uma brincadeira de colegas", "Sugerir que ela treine para falar igual a todos"],
        explicacao: "Brincadeira só é brincadeira quando todos se divertem. Zombar do sotaque, da aparência ou da origem de alguém é desrespeito e pode ser discriminação.",
      },
      {
        pergunta: "O projeto da equipe da Manuela foi elogiado, mas a liderança parabenizou só ela. O que ela deve fazer?",
        certa: "Agradecer e dizer que o trabalho foi de todos",
        erradas: ["Aceitar sozinha, afinal foi ela quem apresentou", "Ficar calada para não causar ciúme na equipe"],
        explicacao: "Reconhecer o esforço dos colegas é justo e fortalece a equipe. Ficar com o crédito pelo trabalho de todos quebra a confiança do grupo.",
      },
      {
        pergunta: "O Diego vai fazer o primeiro currículo, mas nunca trabalhou. O que ele pode colocar nele?",
        certa: "Cursos, projetos da escola e o que sabe fazer",
        erradas: ["Um emprego inventado, para não deixar em branco", "Nada: sem experiência, não vale a pena fazer"],
        explicacao: "No primeiro currículo valem cursos, projetos da escola, voluntariado e habilidades. Informação inventada é mentira e pode ser descoberta na entrevista.",
      },
      {
        pergunta: "Na hora de escolher a roupa para trabalhar, qual é a melhor regra?",
        certa: "Seguir o que a empresa pede para cada função",
        erradas: ["Usar a roupa mais cara que tiver, para impressionar", "Seguir a moda, não importa qual seja o lugar"],
        explicacao: "Cada lugar tem seu padrão: uniforme na fábrica, roupa mais formal em alguns escritórios. Na dúvida, pergunte e prefira roupas limpas e discretas.",
      },
      {
        pergunta: "O Kauã terminou suas tarefas antes do fim do dia de trabalho. Qual atitude mostra proatividade (iniciativa)?",
        certa: "Procurar alguém da equipe que precise de ajuda",
        erradas: ["Esperar alguém lembrar de passar outra tarefa", "Fingir que está ocupado até a hora de sair"],
        explicacao: "Proatividade é tomar a iniciativa em vez de esperar ordens. Oferecer ajuda mostra interesse e é uma ótima chance de aprender coisas novas.",
      },
      {
        pergunta: "Numa reunião da equipe, o celular da Carolina não para de vibrar com mensagens dos amigos. O que ela deve fazer?",
        certa: "Silenciar o celular e ver as mensagens depois",
        erradas: ["Responder rápido, pois mensagem curta não atrapalha", "Pôr o celular no silencioso e responder escondido"],
        explicacao: "Mexer no celular durante a reunião é falta de atenção e de respeito com quem está falando. Assuntos pessoais ficam para depois, a não ser em emergências.",
      },
      {
        desafio: "Apresente-se como numa entrevista para jovem aprendiz: diga seu nome, algo que você faz bem e por que quer a vaga.",
        criterio: "Disse o nome, uma habilidade e um motivo para querer a vaga.",
      },
      {
        desafio: "Faça a mímica de colocar os EPIs (equipamentos de proteção) antes de entrar numa fábrica, dizendo o nome de cada um.",
        criterio: "Fez a mímica e disse o nome de pelo menos 3 EPIs, como capacete ou luvas.",
      },
      {
        desafio: "Uma pessoa nova chegou hoje à equipe e não conhece ninguém. Diga três atitudes para ela se sentir bem-vinda.",
        criterio: "Disse três atitudes diferentes e respeitosas para acolher a pessoa.",
      },
    ],
    medio: [
      {
        pergunta: "A Joana escolhe os fornecedores (quem vende para a empresa). A loja do tio dela quer ser escolhida. O que é mais ético?",
        certa: "Contar que é do tio e ficar fora da escolha",
        erradas: ["Escolher a loja do tio, se o preço estiver bom", "Pedir ao tio um desconto e escolher a loja dele"],
        explicacao: "Isso é conflito de interesses: um interesse pessoal pode pesar numa decisão do trabalho. Mesmo com preço bom, o certo é contar o parentesco e ficar fora da escolha.",
      },
      {
        pergunta: "O Felipe quer usar a impressora da empresa para imprimir 40 páginas de um trabalho da escola. O que ele deve fazer?",
        certa: "Perguntar primeiro se pode imprimir algo pessoal",
        erradas: ["Imprimir no intervalo, quando ninguém está usando", "Imprimir, já que é pouca coisa para a empresa"],
        explicacao: "Impressora, papel e internet da empresa são para o trabalho. Usá-los em assuntos pessoais sem permissão, mesmo que pareça pouco, é usar o que não é seu.",
      },
      {
        pergunta: "O Rodrigo gravou um vídeo engraçado de um colega no intervalo do trabalho e quer postar. O que ele deve fazer?",
        certa: "Pedir permissão ao colega antes de postar",
        erradas: ["Postar, mas sem marcar o nome do colega", "Postar e só apagar se o colega reclamar"],
        explicacao: "A imagem de cada pessoa pertence a ela: postar sem permissão, mesmo sem marcar o nome, pode constranger o colega. A empresa também pode ter regras sobre gravações.",
      },
      {
        pergunta: "O Murilo é surdo e acabou de entrar na equipe. O que ajuda a incluí-lo nas reuniões?",
        certa: "Ter intérprete de Libras ou usar legendas e textos",
        erradas: ["Falar bem alto e devagar para que ele consiga ouvir", "Contar a ele, só no fim, o que foi decidido"],
        explicacao: "Falar alto não ajuda quem não ouve. Com Libras (Língua Brasileira de Sinais), legendas ou textos, ele participa de verdade; na dúvida, pergunte o que funciona melhor para ele.",
      },
      {
        pergunta: "O Ícaro revisou o relatório de uma colega e achou erros nos números. Qual é o melhor feedback (retorno) para ela?",
        certa: "“O texto ficou claro. Só revise os números.”",
        erradas: ["“Os números estão ótimos, pode entregar assim.”", "“Você é muito desatenta, precisa mudar isso.”"],
        explicacao: "Bom feedback fala do trabalho, não da pessoa: diz o que funcionou e o que pode melhorar. Esconder o erro ou dar rótulos não ajuda ninguém a crescer.",
      },
      {
        pergunta: "A supervisora disse ao Henrique que ele costuma interromper os colegas nas reuniões. Qual é a melhor reação dele?",
        certa: "Ouvir com calma, agradecer e tentar mudar o hábito",
        erradas: ["Dizer que só interrompe porque tem ideias melhores", "Agradecer e não falar mais nas reuniões"],
        explicacao: "Receber críticas com calma mostra maturidade. A crítica fala de um hábito, não de quem você é: o objetivo é mudar o hábito, e não deixar de participar.",
      },
      {
        pergunta: "A Beatriz e o Caio discordam sobre como fazer uma tarefa, e a discussão está esquentando. O que eles devem fazer?",
        certa: "Respirar, ouvir o outro lado e buscar um acordo",
        erradas: ["Seguir a ideia de quem conseguir falar mais alto", "Parar a conversa e cada um fazer do seu jeito"],
        explicacao: "Conflitos se resolvem com diálogo: cada um explica seu ponto e escuta o outro de verdade. Se não houver acordo, vale pedir ajuda à liderança.",
      },
      {
        pergunta: "Na entrevista, perguntam à Vitória: “Que ponto você precisa melhorar?” Qual é a melhor resposta?",
        certa: "Contar uma dificuldade real e como a enfrenta",
        erradas: ["Mudar de assunto e falar só das qualidades", "Dizer que é perfeccionista, mesmo sem ser verdade"],
        explicacao: "Quem entrevista quer ver autoconhecimento e vontade de crescer. Fugir da pergunta ou dar resposta decorada soa falso; uma dificuldade real com um plano de melhora passa confiança.",
      },
      {
        pergunta: "A Priscila usa óculos de proteção, um EPI (Equipamento de Proteção Individual). Eles quebraram no serviço. O que ela deve fazer?",
        certa: "Pedir a troca na hora e só voltar com óculos novos",
        erradas: ["Continuar com cuidado e pedir a troca no fim do dia", "Prender os óculos com fita e seguir trabalhando"],
        explicacao: "EPI quebrado ou remendado não protege direito. Trabalhar sem proteção, mesmo por pouco tempo, expõe a pessoa a acidentes; por isso, o certo é parar e pedir a troca.",
      },
      {
        pergunta: "O Breno, aprendiz de 16 anos, foi chamado para ajudar em um serviço perigoso. O que ele deve fazer?",
        certa: "Não aceitar, pois a lei proíbe nessa idade",
        erradas: ["Aceitar, desde que use todos os EPIs", "Aceitar, se os pais assinarem uma autorização"],
        explicacao: "A Constituição proíbe trabalho noturno, perigoso ou insalubre (que faz mal à saúde) para quem tem menos de 18 anos. Nem EPI nem autorização dos pais mudam essa regra.",
      },
      {
        desafio: "Transforme a frase “Você sempre faz tudo errado!” em um feedback respeitoso e útil, como se falasse com um colega.",
        criterio: "Não usou palavras ofensivas, citou algo específico e deu uma sugestão de melhoria.",
      },
      {
        desafio: "Dois colegas querem usar o mesmo computador agora e começam a discutir. Explique, em voz alta, como você ajudaria a resolver.",
        criterio: "Propôs ouvir os dois lados e sugeriu uma solução justa para ambos.",
      },
    ],
    dificil: [
      {
        pergunta: "O supervisor do Tiago o humilha na frente da equipe quase todo dia, com apelidos e gritos. Como se chama essa situação?",
        certa: "Assédio moral",
        erradas: ["Feedback direto", "Cobrança de metas", "Conflito de interesses"],
        explicacao: "Assédio moral é expor alguém, de forma repetida, a humilhações no trabalho. Cobrar resultados com respeito é normal; gritar e dar apelidos, não. Dá para denunciar ao RH, à ouvidoria ou à CIPA.",
      },
      {
        pergunta: "Muitas empresas têm uma área de compliance. Qual é o papel dela?",
        certa: "Garantir que todos sigam as leis e as regras da empresa",
        erradas: ["Recrutar e contratar novos funcionários", "Controlar a entrada e a saída do estoque", "Criar as campanhas de propaganda da marca"],
        explicacao: "Compliance vem do inglês “to comply”, cumprir. Essa área cuida para que todos sigam as leis, o código de ética e as normas internas, e costuma cuidar do canal de denúncias.",
      },
      {
        pergunta: "Um fornecedor oferece ao Lucas, que faz as compras da empresa, um celular novo de presente “pela parceria”. O que ele deve fazer?",
        certa: "Recusar e seguir a política de brindes da empresa",
        erradas: ["Aceitar, já que não prometeu nada em troca", "Aceitar e dar preferência a esse fornecedor", "Aceitar e sortear o presente entre a equipe"],
        explicacao: "Presentes caros de quem negocia com você podem pesar nas suas decisões, mesmo sem querer. Muitas empresas só permitem brindes de pequeno valor; na dúvida, consulte o código de ética.",
      },
      {
        pergunta: "A Jéssica viu um colega levando para casa material da empresa, mas tem medo de se expor. Qual é o caminho mais adequado?",
        certa: "Usar o canal de denúncias, que pode ser anônimo",
        erradas: ["Contar o caso no grupo de mensagens da equipe", "Cobrar o colega em voz alta, na frente de todos", "Fingir que não viu, para não se complicar"],
        explicacao: "O canal de denúncias (ou de ética) existe para relatar irregularidades com segurança, muitas vezes sem se identificar. Espalhar no grupo vira fofoca e pode atrapalhar a apuração.",
      },
      {
        pergunta: "Numa seleção, o gestor diz que prefere não contratar mulheres porque elas “podem engravidar”. O que isso é?",
        certa: "Discriminação, proibida por lei",
        erradas: ["Um critério de seleção permitido", "Uma decisão interna, sem relação com a lei", "Algo aceitável em vagas temporárias"],
        explicacao: "A lei proíbe recusar alguém por sexo, gravidez, idade, cor ou estado civil, e também proíbe exigir teste de gravidez para contratar. A escolha deve levar em conta a competência.",
      },
      {
        pergunta: "Para um relatório do trabalho, o Gustavo copiou trechos inteiros de um site sem dizer de onde vieram. Como se chama isso?",
        certa: "Plágio",
        erradas: ["Paráfrase", "Pesquisa", "Citação"],
        explicacao: "Plágio é apresentar como seu o texto ou a ideia de outra pessoa. Pesquisar é ótimo: o certo é escrever com suas palavras ou pôr o trecho entre aspas, sempre citando a fonte.",
      },
      {
        pergunta: "O Rafael escorregou numa mancha de óleo no chão da fábrica, mas não se machucou. O que ele deve fazer?",
        certa: "Comunicar o quase acidente à área de segurança",
        erradas: ["Nada, já que ninguém se machucou", "Limpar a mancha e não comentar com ninguém", "Avisar só os amigos para tomarem cuidado"],
        explicacao: "Um quase acidente é um aviso: se nada mudar, da próxima vez alguém pode se ferir. Comunicar ajuda a empresa e a CIPA a descobrir a causa e corrigir o risco.",
      },
      {
        pergunta: "O gerente quer contratar o próprio sobrinho, sem processo seletivo, para trabalhar sob o comando dele. Como se chama essa prática?",
        certa: "Nepotismo",
        erradas: ["Networking", "Meritocracia", "Recrutamento interno"],
        explicacao: "Nepotismo é favorecer parentes em contratações e promoções. É injusto com outros candidatos e gera conflito de interesses; no serviço público, é proibido.",
      },
      {
        pergunta: "A Rita quer pedir a um colega que lave a louça que ele deixa na pia. Qual frase segue a comunicação não violenta?",
        certa: "“Quando a louça fica na pia, me incomoda. Pode lavar a sua?”",
        erradas: ["“Você é muito folgado, todo mundo aqui já comenta.”", "“Tem gente aqui que não foi bem-educada, né?”", "“Se continuar assim, eu vou falar com o chefe.”"],
        explicacao: "A comunicação não violenta descreve o fato sem julgar, diz o que se sente e faz um pedido claro. Rótulos, indiretas e ameaças só deixam a outra pessoa na defensiva.",
      },
      {
        pergunta: "A Daniela descobriu que ganha menos que um colega que faz o mesmo trabalho, na mesma função, só por ser mulher. O que diz a lei?",
        certa: "Trabalho de igual valor deve ter salário igual",
        erradas: ["A empresa pode pagar o que quiser a cada um", "A diferença vale se o colega negociou melhor", "A igualdade só vale para empresas públicas"],
        explicacao: "A CLT garante salário igual para trabalho de igual valor, sem diferença por sexo, raça, idade ou origem. Uma lei de 2023 reforçou a igualdade salarial entre mulheres e homens.",
      },
      {
        desafio: "Você é a liderança: um colega chegou atrasado três vezes nesta semana. Dê a ele, em voz alta, um feedback respeitoso e combine uma melhoria.",
        criterio: "Falou do fato (os atrasos), sem ofender, e combinou uma melhoria com o colega.",
      },
      {
        desafio: "Explique com suas palavras a diferença entre uma brincadeira entre colegas e o assédio moral, dando um exemplo de cada.",
        criterio: "Diferenciou as duas (diversão de todos × humilhação repetida) e deu um exemplo de cada.",
      },
    ],
    expert: [
      {
        pergunta: "A Sabrina percebe que o relatório que o chefe vai levar à diretoria tem números alterados para parecer melhor. Qual é a atitude mais adequada?",
        certa: "Falar com o chefe e, se nada mudar, usar o canal de ética",
        erradas: ["Corrigir os números sozinha, sem avisar ninguém", "Ficar quieta, pois a responsabilidade é do chefe", "Expor o caso nas redes sociais da empresa"],
        explicacao: "Primeiro, o chefe ganha a chance de corrigir. Se ele mantiver a fraude, o canal de ética existe para isso. Mexer sozinha ou expor em público pode atrapalhar a apuração e prejudicar você.",
      },
      {
        pergunta: "Qual destas situações é assédio moral, e não uma cobrança legítima da liderança?",
        certa: "Isolar alguém da equipe e tirar suas tarefas de propósito",
        erradas: ["Cobrar, em conversa reservada, uma meta combinada", "Pedir que refaça um relatório que veio com erros", "Advertir por escrito faltas sem justificativa"],
        explicacao: "Assédio moral é uma conduta repetida que humilha, isola ou desestabiliza a pessoa. Cobrar metas, pedir correções e aplicar advertências previstas em lei fazem parte da gestão, quando feitos com respeito.",
      },
      {
        pergunta: "Pela CLT, qual destas atitudes pode levar à demissão por justa causa?",
        certa: "Revelar segredos da empresa a um concorrente",
        erradas: ["Pedir à liderança um aumento de salário", "Faltar ao trabalho com atestado médico válido", "Recusar uma tarefa de risco grave sem EPI"],
        explicacao: "A CLT lista faltas graves que permitem a justa causa, como violar segredo da empresa, agir com desonestidade e indisciplina. Faltar com atestado e recusar trabalho com risco grave e iminente são direitos.",
      },
      {
        pergunta: "O Vinícius compra materiais para a empresa e, nas horas vagas, presta consultoria a um dos fornecedores que ele mesmo avalia. Qual é o problema?",
        certa: "Conflito de interesses, que ele deve informar",
        erradas: ["Nenhum, pois é fora do horário de trabalho", "Só o excesso de horas trabalhadas na semana", "Nenhum, desde que o preço seja o melhor"],
        explicacao: "Mesmo fora do expediente, ganhar dinheiro de um fornecedor que ele avalia pode influenciar suas escolhas. O certo é informar a empresa, que decide como evitar o conflito.",
      },
      {
        pergunta: "Numa seleção, a recrutadora tende a preferir, sem perceber, candidatos que estudaram na mesma escola que ela. Como se chama isso?",
        certa: "Viés de afinidade",
        erradas: ["Efeito halo", "Critério técnico", "Meritocracia"],
        explicacao: "Viés de afinidade é preferir quem se parece com a gente, sem notar. O efeito halo é outro viés: uma qualidade faz a pessoa parecer boa em tudo. Critérios claros e iguais para todos reduzem os dois.",
      },
      {
        pergunta: "Qual destes feedbacks segue o modelo SCI (Situação, Comportamento, Impacto)?",
        certa: "“Na reunião de ontem, você interrompeu o cliente três vezes, e ele ficou irritado.”",
        erradas: ["“Você precisa ser mais educado com os clientes, senão vai ter problema.”", "“Você sempre atrapalha as reuniões, e todo mundo já percebeu isso.”", "“Ontem o cliente reclamou de você, mas não lembro bem do motivo.”"],
        explicacao: "O modelo SCI descreve a Situação (quando e onde), o Comportamento observado e o Impacto que ele causou. Assim o feedback fica concreto e não vira um julgamento da pessoa.",
      },
      {
        pergunta: "Uma empresa com 250 empregados precisa, por lei, reservar vagas para pessoas com deficiência ou reabilitadas. Qual é o percentual mínimo?",
        certa: "3%",
        erradas: ["1%", "5%", "10%"],
        explicacao: "A Lei de Cotas exige de 2% a 5% das vagas para pessoas com deficiência ou reabilitadas, conforme o tamanho da empresa. De 201 a 500 empregados, o mínimo é 3%.",
      },
      {
        pergunta: "Na reunião, a equipe aprova rápido a ideia do chefe e ninguém aponta os riscos, para evitar conflito. Como se chama esse fenômeno?",
        certa: "Pensamento de grupo",
        erradas: ["Trabalho em equipe", "Brainstorming", "Sinergia"],
        explicacao: "No pensamento de grupo, a vontade de concordar fala mais alto que a análise, e erros passam sem crítica. Equipes saudáveis dão espaço para discordar com respeito.",
      },
      {
        pergunta: "Na equipe da Débora, as pessoas admitem erros, fazem perguntas e discordam sem medo de serem ridicularizadas. Que característica é essa?",
        certa: "Segurança psicológica",
        erradas: ["Clima de informalidade", "Cultura de alta performance", "Autonomia operacional"],
        explicacao: "Segurança psicológica é sentir que dá para errar, perguntar e discordar sem ser humilhado. Pesquisas mostram que equipes assim aprendem mais e resolvem problemas mais rápido.",
      },
      {
        pergunta: "O Leandro cola numa ferramenta gratuita de inteligência artificial a planilha com nomes e CPFs dos clientes, para fazer um resumo. Qual é o principal problema?",
        certa: "Compartilhar dados pessoais sem autorização",
        erradas: ["Nenhum, se o resumo ficar correto", "Só o tempo gasto para aprender a ferramenta", "A ferramenta deixar o computador mais lento"],
        explicacao: "Ao colar dados em ferramentas externas, eles podem ser guardados ou usados por terceiros. Pela LGPD, a empresa responde pelo uso dos dados: siga as regras internas e use dados sem identificação.",
      },
      {
        desafio: "Um fornecedor oferece um presente caro para você escolher a empresa dele. Recuse em voz alta, com educação e firmeza, explicando o motivo.",
        criterio: "Recusou com educação, citou a ética ou o conflito de interesses e manteve o respeito ao fornecedor.",
      },
      {
        desafio: "Dê a um colega da roda um feedback positivo usando o modelo SCI: Situação, Comportamento e Impacto.",
        criterio: "Disse quando aconteceu, o que a pessoa fez e qual foi o impacto.",
      },
    ],
  },

  // ---------- ROTINAS ADMINISTRATIVAS (ciano, prancheta) ----------
  rotinas: {
    facil: [
      {
        pergunta: "A Yasmin está digitando um relatório na recepção quando um cliente chega ao balcão. O que ela deve fazer?",
        certa: "Parar, cumprimentar o cliente e perguntar como pode ajudar",
        erradas: ["Continuar digitando e dizer “pode falar, estou ouvindo”", "Terminar o relatório antes, para não perder a concentração"],
        explicacao: "Quem chega precisa se sentir notado logo. Parar, olhar para a pessoa e cumprimentar mostra que ela é prioridade, e o relatório pode esperar.",
      },
      {
        pergunta: "O cliente Jorge chega irritado porque a entrega dele atrasou. Qual é a melhor primeira atitude de quem vai atendê-lo?",
        certa: "Ouvir com calma, sem interromper, e mostrar que entendeu",
        erradas: ["Explicar logo que a culpa do atraso foi do setor de entregas", "Oferecer um desconto antes de ele terminar de falar"],
        explicacao: "Ouvir sem interromper acalma a pessoa e ajuda a entender o problema. Só depois se busca a solução, sem culpar colegas nem oferecer nada às pressas.",
      },
      {
        pergunta: "O Pedro Henrique precisa transferir uma ligação para o setor de compras. O que ele deve fazer antes de transferir?",
        certa: "Avisar o cliente para qual setor vai passar a ligação",
        erradas: ["Transferir direto, sem falar nada, para ganhar tempo", "Dar ao cliente o número do setor, para ele ligar depois"],
        explicacao: "Avisar evita que o cliente pense que a ligação caiu. Transferir na hora, contando o assunto ao colega, poupa o cliente de ligar de novo e repetir tudo.",
      },
      {
        pergunta: "A Bianca vai enviar ao gerente o relatório de vendas de março. Qual é o melhor assunto para esse e-mail?",
        certa: "Relatório de vendas de março",
        erradas: ["URGENTE!!! Relatório de vendas de março", "Oi! Segue aquele arquivo que você pediu"],
        explicacao: "O assunto deve dizer, em poucas palavras, do que trata o e-mail. Um “URGENTE!!!” sem motivo soa como grito, e frases vagas não ajudam a achar a mensagem depois.",
      },
      {
        pergunta: "A Isadora vai anexar um orçamento ao e-mail para um cliente. Qual nome de arquivo ajuda mais quem vai receber?",
        certa: "Orçamento - Padaria Silva - março.pdf",
        erradas: ["arquivo novo da Isadora - cópia (2).pdf", "orçamento FINAL agora vai mesmo.pdf"],
        explicacao: "Um bom nome diz o que é o arquivo, para quem é e de quando, sem precisar abri-lo. Assim quem recebe encontra o documento depois, sem confusão.",
      },
      {
        pergunta: "Ao vender um produto, qual documento a empresa emite para registrar oficialmente a venda e os impostos?",
        certa: "Nota fiscal",
        erradas: ["Recibo", "Relatório de vendas"],
        explicacao: "A nota fiscal é o documento oficial que informa ao governo a venda e os impostos. Para quem compra, ela serve de prova em caso de troca ou garantia.",
      },
      {
        pergunta: "A diretora Sônia pediu ao Gabriel que marcasse uma reunião com um fornecedor (quem vende para a empresa). O que ele faz antes de confirmar o horário?",
        certa: "Conferir na agenda se a diretora está livre",
        erradas: ["Aceitar o primeiro horário que o fornecedor quiser", "Marcar e só avisar a diretora no dia da reunião"],
        explicacao: "Antes de confirmar, é preciso olhar a agenda de quem vai participar, para não marcar dois compromissos no mesmo horário. Depois, registre a reunião na agenda.",
      },
      {
        pergunta: "A Nayara vai criar a senha do sistema da empresa. Qual destas senhas é a mais segura?",
        certa: "Pipa#Verde!Mar72",
        erradas: ["Nayara@2009", "senhasenhasenha"],
        explicacao: "Uma senha forte é longa e mistura letras maiúsculas e minúsculas, números e símbolos. Nome, ano de nascimento e palavras repetidas são fáceis de adivinhar, mesmo com símbolo.",
      },
      {
        pergunta: "A Tainá vai almoçar e deixou aberto no computador o sistema com os dados dos clientes. O que ela deve fazer antes de sair da mesa?",
        certa: "Bloquear a tela, que só abre de novo com a senha",
        erradas: ["Desligar só o monitor, para a tela ficar apagada", "Pedir a um colega que fique de olho na mesa dela"],
        explicacao: "Dados pessoais de clientes são protegidos pela LGPD. Com a tela bloqueada, ninguém vê os dados sem a senha, mas qualquer pessoa pode religar um monitor.",
      },
      {
        pergunta: "O Enzo atendeu uma ligação para a colega Júlia, que tinha saído. O que um bom recado para ela precisa ter?",
        certa: "Quem ligou, telefone, assunto, data e hora",
        erradas: ["Só o nome de quem ligou, o resto ela descobre", "A conversa inteira, palavra por palavra"],
        explicacao: "Com nome, telefone, assunto, data e hora, a Júlia sabe quem procurar, sobre o quê e desde quando a pessoa espera, sem ter que adivinhar.",
      },
      {
        desafio: "Atenda um telefonema imaginário: cumprimente, diga o nome de uma empresa inventada e o seu nome, e pergunte como pode ajudar.",
        criterio: "Cumprimentou, disse o nome da empresa e o próprio nome e ofereceu ajuda.",
      },
      {
        desafio: "Convide a turma para uma reunião imaginária da empresa, dizendo data, horário, local e assunto, de forma clara e educada.",
        criterio: "Informou data, horário, local e assunto da reunião.",
      },
      {
        desafio: "Você cuida do arquivo da empresa! Diga cinco cidades brasileiras em ordem alfabética, como se fossem etiquetas de pastas.",
        criterio: "Disse cinco cidades brasileiras diferentes, na ordem alfabética correta.",
      },
    ],
    medio: [
      {
        pergunta: "O Matheus vai mandar o mesmo aviso para 40 clientes. Onde ele deve pôr os endereços para que um cliente não veja o e-mail dos outros?",
        certa: "No campo CCO",
        erradas: ["No campo CC", "No campo Para"],
        explicacao: "Em CCO (com cópia oculta), cada pessoa recebe sem ver quem mais recebeu. Em Para e em CC, todos veem os endereços, e o e-mail de uma pessoa é um dado pessoal.",
      },
      {
        pergunta: "O Davi arquiva as fichas de clientes pela ordem alfabética do sobrenome. Qual destas fichas deve ficar na frente?",
        certa: "Ramos, Bernardo",
        erradas: ["Ramos, Kauã", "Ribeiro, Ana Paula"],
        explicacao: "Primeiro vale o sobrenome, que vem antes da vírgula: Ramos vem antes de Ribeiro. Se o sobrenome é igual, o nome desempata: Bernardo vem antes de Kauã.",
      },
      {
        pergunta: "O Thiago guarda as notas fiscais do mês separadas por dia, da mais antiga para a mais recente. Que método de arquivamento é esse?",
        certa: "Cronológico",
        erradas: ["Alfabético", "Numérico"],
        explicacao: "Cronológico vem de “cronos”, palavra grega que quer dizer tempo: os documentos seguem a ordem das datas. É útil para contas, notas e correspondências.",
      },
      {
        pergunta: "No arquivo numérico, cada cliente tem uma pasta com um número. A Jamile só sabe o nome do cliente. O que ela consulta para achar a pasta?",
        certa: "Um índice que liga cada nome ao seu número",
        erradas: ["A data em que a pasta do cliente foi aberta", "A cor da etiqueta colada em cada pasta"],
        explicacao: "O método numérico é indireto: primeiro se consulta um índice (lista ou sistema) com o número de cada nome. Uma vantagem é que o número não muda nem se repete.",
      },
      {
        pergunta: "Na reunião da equipe, o Rafael ficou responsável por registrar o que foi discutido e decidido. Que documento ele vai escrever?",
        certa: "Ata",
        erradas: ["Protocolo", "Recibo"],
        explicacao: "A ata é o registro oficial de uma reunião: quem participou, o que foi discutido e o que ficou decidido. Depois, ela serve de prova do que foi combinado.",
      },
      {
        pergunta: "A Raíssa entregou um documento importante em outro setor da empresa. O que comprova que ela entregou e em que dia?",
        certa: "O protocolo, com data e assinatura de quem recebeu",
        erradas: ["Uma cópia do documento guardada na gaveta dela", "Uma mensagem para o colega avisando “deixei na sua mesa”"],
        explicacao: "O protocolo é assinado por quem recebeu e traz a data da entrega. Uma cópia guardada ou uma mensagem não provam que alguém recebeu o documento.",
      },
      {
        pergunta: "A gerente Patrícia pediu ao Lucas que enviasse a pauta da reunião de amanhã. O que ele deve mandar?",
        certa: "A lista dos assuntos que serão tratados",
        erradas: ["O resumo do que foi decidido na reunião", "A lista de quem confirmou presença"],
        explicacao: "A pauta lista, em ordem, os assuntos da reunião e é enviada antes, para todos chegarem preparados. O registro do que foi decidido é a ata.",
      },
      {
        pergunta: "A Lívia quer somar, numa planilha, os valores das células B2 até B6. Qual fórmula ela deve digitar?",
        certa: "=SOMA(B2:B6)",
        erradas: ["=SOMA(B2;B6)", "=B2+B6"],
        explicacao: "Os dois-pontos indicam um intervalo: de B2 até B6, ou seja, cinco células. Já =SOMA(B2;B6) e =B2+B6 somam só duas células: B2 e B6.",
      },
      {
        pergunta: "O Arthur tirou da mesa os grampeadores quebrados e os papéis que não usava mais. Qual senso do 5S, método de organização, ele aplicou?",
        certa: "Senso de utilização",
        erradas: ["Senso de limpeza", "Senso de ordenação"],
        explicacao: "O senso de utilização é separar o que é útil e descartar o que não serve. Os outros sensos do 5S são ordenação, limpeza, saúde (ou padronização) e autodisciplina.",
      },
      {
        pergunta: "No almoxarifado (depósito de materiais), o papel chegou ao estoque mínimo, a menor quantidade que deve ficar guardada. O que o Kenji deve fazer?",
        certa: "Pedir a compra de mais papel antes que ele acabe",
        erradas: ["Esperar o papel acabar para comprar tudo de uma vez", "Pedir uma quantidade enorme, para nunca mais faltar"],
        explicacao: "Chegar ao estoque mínimo é sinal de pedir mais já, pois a entrega leva alguns dias. Pedir demais também é ruim: ocupa espaço e deixa dinheiro parado.",
      },
      {
        desafio: "Dite em voz alta um e-mail curto pedindo a uma papelaria o preço de 100 canetas, com assunto, saudação, pedido e despedida.",
        criterio: "Falou assunto, saudação, pedido claro e despedida, sem gírias.",
      },
      {
        desafio: "Faça a mímica de arrumar uma mesa bagunçada e narre três sensos do 5S: separar o que não serve, pôr cada coisa no lugar e limpar.",
        criterio: "Fez os gestos e narrou os três passos: separar, organizar e limpar.",
      },
    ],
    dificil: [
      {
        pergunta: "Qual instrumento indica por quanto tempo cada tipo de documento deve ser guardado e o que fazer com ele depois?",
        certa: "Tabela de temporalidade",
        erradas: ["Livro de protocolo", "Inventário de estoque", "Organograma"],
        explicacao: "A tabela de temporalidade define o prazo de guarda de cada documento e o destino final: eliminar ou guardar para sempre. Assim, nada importante vai para o lixo antes da hora.",
      },
      {
        pergunta: "Os documentos que a equipe consulta todo dia, como os contratos em andamento, ficam em que tipo de arquivo?",
        certa: "Arquivo corrente",
        erradas: ["Arquivo intermediário", "Arquivo permanente", "Arquivo morto"],
        explicacao: "Pela teoria das três idades, o arquivo corrente guarda o que é usado com frequência; o intermediário, o que é pouco consultado mas ainda precisa ser guardado; e o permanente, o que tem valor histórico.",
      },
      {
        pergunta: "Numa planilha, a Bruna quer buscar o preço de um produto pelo código, numa tabela que está em outra aba. Qual função ela usa?",
        certa: "PROCV",
        erradas: ["SOMA", "MÉDIA", "CONCATENAR"],
        explicacao: "PROCV (procura vertical) busca um valor na primeira coluna de uma tabela e devolve o dado de outra coluna da mesma linha. Versões novas também têm a PROCX, mais flexível.",
      },
      {
        pergunta: "Na fórmula =B2*$E$1, o que os cifrões ($) fazem quando a fórmula é copiada para as linhas de baixo?",
        certa: "Mantêm a referência presa na célula E1",
        erradas: ["Mostram o resultado em reais", "Somam a coluna E inteira", "Impedem que alguém edite a célula"],
        explicacao: "O $ cria uma referência absoluta: ao copiar a fórmula, B2 vira B3, B4…, mas $E$1 continua apontando para E1. Para mostrar valores em reais, usa-se o formato de moeda.",
      },
      {
        pergunta: "A prefeitura enviou um documento oficial à empresa, e o Igor vai responder em nome dela. Que documento ele escreve?",
        certa: "Ofício",
        erradas: ["Memorando", "Ata", "Requerimento"],
        explicacao: "O ofício é a comunicação oficial entre instituições, como empresa e prefeitura. O memorando (ou comunicação interna) circula entre setores da mesma organização.",
      },
      {
        pergunta: "Um cliente pede para saber quais dados pessoais dele a empresa guarda. Pela LGPD, o que a empresa deve fazer?",
        certa: "Informar os dados, pois é um direito do titular",
        erradas: ["Recusar, porque os dados pertencem à empresa", "Informar só se ele pagar uma taxa de consulta", "Apagar tudo sem responder ao pedido"],
        explicacao: "A LGPD garante ao titular (a pessoa dona dos dados) o direito de saber quais dados a empresa tem, corrigi-los e, em alguns casos, pedir que sejam apagados, sem pagar por isso.",
      },
      {
        pergunta: "No almoxarifado, o Caio usa o método PEPS para retirar os produtos do estoque. O que isso quer dizer?",
        certa: "O primeiro que entra é o primeiro que sai",
        erradas: ["O último que entra é o primeiro que sai", "Sai primeiro o produto mais caro", "Sai primeiro o que está mais perto da porta"],
        explicacao: "No PEPS, os itens mais antigos saem antes, para não vencerem nem estragarem parados. É essencial para alimentos e remédios; o contrário é o UEPS: último que entra, primeiro que sai.",
      },
      {
        pergunta: "No fluxograma de um processo, o que costuma indicar o losango?",
        certa: "Uma decisão, com caminhos de sim ou não",
        erradas: ["O início ou o fim do processo", "Um documento impresso", "Uma etapa comum de trabalho"],
        explicacao: "No fluxograma, o losango marca uma pergunta ou decisão, e cada saída leva a um caminho. Início e fim costumam ser ovais, e as etapas comuns, retângulos.",
      },
      {
        pergunta: "Qual é a prática de backup (cópia de segurança) mais segura para os arquivos do setor?",
        certa: "Ter cópias em mais de um lugar, uma delas fora da empresa",
        erradas: ["Copiar os arquivos para outra pasta do mesmo computador", "Fazer backup só quando o computador der problema", "Guardar tudo num pen drive na gaveta do setor"],
        explicacao: "A regra 3-2-1 recomenda 3 cópias, em 2 tipos de mídia, com 1 fora do local (como a nuvem). Se o computador quebrar ou houver um incêndio, os arquivos continuam salvos.",
      },
      {
        pergunta: "A Tânia recebe um e-mail “do setor de TI” pedindo para confirmar a senha num link em até 1 hora. O que mais indica que é golpe?",
        certa: "Pedir a senha e apressar a resposta",
        erradas: ["Ter o logotipo da empresa", "Chegar em horário comercial", "Estar escrito sem erros"],
        explicacao: "Isso é phishing: um e-mail falso que tenta roubar senhas. A TI de verdade não pede sua senha, e a pressa serve para você não pensar. Na dúvida, fale com a TI por outro canal.",
      },
      {
        desafio: "Atenda um cliente imaginário que recebeu o produto errado e está irritado: ouça, mostre que entendeu e proponha uma solução.",
        criterio: "Mostrou empatia, não culpou ninguém e propôs uma solução concreta.",
      },
      {
        desafio: "Explique o caminho de um documento que chega à empresa: protocolar, encaminhar ao setor certo e arquivar. Use um exemplo inventado.",
        criterio: "Citou as três etapas, na ordem, com um exemplo.",
      },
    ],
    expert: [
      {
        pergunta: "A célula C2 tem a fórmula =SE(B2>=7;\"Aprovado\";\"Recuperação\"). Se B2 for 6,5, o que aparece em C2?",
        certa: "Recuperação",
        erradas: ["Aprovado", "6,5", "#VALOR!"],
        explicacao: "A função SE testa uma condição: se for verdadeira, mostra o primeiro valor; se for falsa, o segundo. Como 6,5 não é maior nem igual a 7, aparece “Recuperação”.",
      },
      {
        pergunta: "Qual fórmula conta quantas células do intervalo A2:A50 têm a palavra Pago?",
        certa: "=CONT.SE(A2:A50;\"Pago\")",
        erradas: ["=SOMA(A2:A50;\"Pago\")", "=CONT.VALORES(A2:A50)", "=SE(A2:A50=\"Pago\";1;0)"],
        explicacao: "CONT.SE conta as células de um intervalo que atendem a um critério. CONT.VALORES conta todas as células preenchidas, e SOMA só soma números.",
      },
      {
        pergunta: "Um processo foi encerrado e quase não é mais consultado, mas a lei exige guardá-lo por mais 5 anos. Para onde ele vai?",
        certa: "Arquivo intermediário",
        erradas: ["Arquivo corrente", "Arquivo permanente", "Descarte imediato"],
        explicacao: "O arquivo intermediário guarda documentos pouco usados que ainda precisam ser mantidos por prazo legal. Depois, pela tabela de temporalidade, eles são eliminados ou vão para o permanente.",
      },
      {
        pergunta: "A empresa usa o CPF de um funcionário para pagar o salário e depositar o FGTS. Pela LGPD, ela precisa do consentimento dele para isso?",
        certa: "Não, pois cumpre o contrato e uma obrigação legal",
        erradas: ["Sim, sempre é preciso consentimento por escrito", "Sim, e ele pode negar sem nenhuma consequência", "Não, porque a LGPD não vale para funcionários"],
        explicacao: "O consentimento é só uma das bases legais da LGPD. Cumprir uma obrigação legal ou um contrato também permite usar dados, e a lei continua protegendo os funcionários.",
      },
      {
        pergunta: "Pela LGPD, qual destes é um dado pessoal sensível, que exige cuidado especial?",
        certa: "Informação sobre a saúde da pessoa",
        erradas: ["Endereço de e-mail profissional", "Número do telefone celular", "Cargo que a pessoa ocupa"],
        explicacao: "Dados sensíveis são os que podem gerar discriminação: saúde, origem racial ou étnica, religião, opinião política, filiação a sindicato, vida sexual, genética e biometria.",
      },
      {
        pergunta: "O SAC recebeu 200 chamados no mês e resolveu 150 já no primeiro contato. Qual é a taxa de resolução no primeiro contato?",
        certa: "75%",
        erradas: ["50%", "25%", "150%"],
        explicacao: "Divide-se o resolvido pelo total: 150 ÷ 200 = 0,75, ou 75%. Esse indicador mostra quantos clientes tiveram o problema resolvido sem precisar voltar.",
      },
      {
        pergunta: "O setor usa 10 resmas de papel por dia, a entrega demora 3 dias e o estoque de segurança é de 5 resmas. Com quantas resmas no estoque deve-se fazer o pedido?",
        certa: "35 resmas",
        erradas: ["30 resmas", "15 resmas", "45 resmas"],
        explicacao: "Ponto de pedido = consumo diário × prazo de entrega + estoque de segurança: 10 × 3 + 5 = 35. Pedindo nesse ponto, o papel novo chega antes de mexer na reserva.",
      },
      {
        pergunta: "Na curva ABC do estoque, quais itens ficam na classe A?",
        certa: "Os poucos itens que somam a maior parte do valor",
        erradas: ["Os itens cujo nome começa pela letra A", "Os itens mais baratos e numerosos", "Os itens que chegaram primeiro ao estoque"],
        explicacao: "A curva ABC usa a ideia de Pareto: poucos itens (classe A) concentram a maior parte do valor e merecem controle mais rígido. Os da classe C são muitos, mas valem pouco no total.",
      },
      {
        pergunta: "No ciclo PDCA, usado para melhorar processos, o que se faz na etapa C (Check)?",
        certa: "Comparar os resultados com a meta planejada",
        erradas: ["Executar as ações que foram planejadas", "Definir as metas e o plano de ação", "Padronizar o que deu certo"],
        explicacao: "PDCA quer dizer Plan (planejar), Do (fazer), Check (checar) e Act (agir). No Check, compara-se o resultado com a meta, para corrigir ou padronizar na etapa seguinte.",
      },
      {
        pergunta: "Qual é a vantagem de assinar um contrato em PDF com certificado digital ICP-Brasil, em vez de colar a imagem da assinatura?",
        certa: "Tem validade jurídica e acusa se o arquivo mudar",
        erradas: ["Nenhuma: as duas têm o mesmo valor legal", "Só a aparência, que fica mais profissional", "É mais rápida, mas não tem valor legal"],
        explicacao: "A assinatura com certificado digital identifica quem assinou e denuncia qualquer alteração no arquivo depois. Uma imagem colada pode ser copiada por qualquer pessoa.",
      },
      {
        desafio: "Explique a um colega o que é a LGPD e diga dois cuidados que o setor deve ter com os dados dos clientes.",
        criterio: "Explicou que a lei protege dados pessoais e deu dois cuidados corretos, como bloquear a tela e não compartilhar dados.",
      },
      {
        desafio: "Descreva em voz alta um fluxograma para pedir material ao almoxarifado, com início, etapas, uma decisão (sim ou não) e fim.",
        criterio: "Disse início, etapas, uma decisão com os dois caminhos e o fim.",
      },
    ],
  },

  // ---------- GESTÃO DO TEMPO (vermelho, !) ----------
  tempo: {
    facil: [
      {
        pergunta: "No primeiro dia como aprendiz, a Alice recebeu várias tarefas de rotina. Qual é o melhor jeito de não esquecer nenhuma?",
        certa: "Anotar num checklist e marcar o que fez",
        erradas: ["Confiar na memória, para treinar a cabeça", "Perguntar de novo sempre que esquecer"],
        explicacao: "Checklist é uma lista para conferir item por item. Ele tira o peso da memória, mostra o que falta e evita perguntar a mesma coisa várias vezes.",
      },
      {
        pergunta: "Pela “regra dos dois minutos”, o que fazer com uma tarefa que leva menos de dois minutos, como guardar o material que acabou de usar?",
        certa: "Fazer logo, assim que ela aparecer",
        erradas: ["Anotar na lista para fazer no fim do dia", "Juntar com outras e fazer tudo de uma vez"],
        explicacao: "Anotar e lembrar uma tarefa rapidinha dá mais trabalho do que fazê-la. Resolvendo na hora, a lista fica menor e nada se acumula.",
      },
      {
        pergunta: "O Bernardo lista quinze tarefas para uma tarde e nunca consegue terminar. O que deixaria o plano dele mais realista?",
        certa: "Prever quanto tempo cada tarefa vai levar",
        erradas: ["Colocar ainda mais tarefas, para se desafiar", "Começar pelas tarefas mais fáceis e rápidas"],
        explicacao: "Um plano realista cabe no tempo disponível. Saber quanto cada tarefa leva mostra o que dá para fazer hoje e o que fica para outro dia.",
      },
      {
        pergunta: "Na segunda, a Lorena viu que tem curso na terça, dentista na quarta e trabalho da escola para entregar na sexta. Qual é o melhor primeiro passo?",
        certa: "Ver a semana toda e planejar cada dia",
        erradas: ["Pensar só no dia de hoje e ver o resto depois", "Anotar só o trabalho, que é o mais difícil"],
        explicacao: "O plano da semana mostra todos os compromissos de uma vez. Assim, dá para encaixar o trabalho nos horários livres e evitar o aperto da véspera.",
      },
      {
        pergunta: "Procrastinar é adiar o que precisa ser feito, sem necessidade. Qual atitude ajuda a vencer a procrastinação?",
        certa: "Começar agora por uma parte pequena",
        erradas: ["Esperar a vontade de fazer aparecer", "Arrumar o quarto todo antes de começar"],
        explicacao: "O mais difícil costuma ser começar. Uma etapa pequena, como ler a primeira questão, quebra a resistência e faz o resto andar.",
      },
      {
        pergunta: "O Miguel começa o curso às 7h e vive chegando atrasado. O que mais ajuda a resolver isso?",
        certa: "Deixar tudo pronto na noite anterior",
        erradas: ["Dormir já de uniforme, para ganhar tempo", "Apertar a soneca para acordar aos poucos"],
        explicacao: "Pontualidade começa na véspera: com mochila, roupa e alarme prontos, a manhã fica tranquila. Já a soneca só adia o despertar e rouba o tempo de se arrumar.",
      },
      {
        pergunta: "A Sofia tem entrevista para uma vaga de aprendiz às 9h, num bairro que ela não conhece. Qual é a melhor forma de chegar a tempo?",
        certa: "Ver o trajeto antes e sair mais cedo",
        erradas: ["Sair no horário exato que o mapa calcula", "Escolher o caminho só quando estiver na rua"],
        explicacao: "Lugar novo pode ter surpresas, como trânsito ou endereço difícil de achar. Conhecer o trajeto e sair mais cedo ajuda a chegar com calma, uns minutos antes.",
      },
      {
        pergunta: "O Ícaro estuda com o celular ao lado e se distrai a cada notificação. O que mais ajuda a manter o foco?",
        certa: "Silenciar o celular e guardá-lo longe",
        erradas: ["Responder tudo na hora, para não acumular", "Deixar o celular só vibrando, ao lado do caderno"],
        explicacao: "Cada notificação puxa a atenção para fora da tarefa, e voltar a focar leva tempo. Com o celular longe e em silêncio, fica mais fácil não pegar nele toda hora.",
      },
      {
        pergunta: "A Valentina estuda de manhã e é aprendiz à tarde. Para dar conta de tudo, passou a dormir pouco e cortou o lazer. O que tende a acontecer?",
        certa: "Ela se cansa e rende menos nas duas coisas",
        erradas: ["Ela rende mais, porque sobra mais tempo", "Nada muda, porque o corpo se acostuma"],
        explicacao: "Sono e lazer recarregam a energia e ajudam a memória e a atenção. Descansar faz parte de uma rotina equilibrada, não é perda de tempo.",
      },
      {
        pergunta: "O Kauã planejou estudar das 19h às 20h, mas faltou luz em casa. Qual é a melhor atitude?",
        certa: "Escolher outro horário e ajustar o plano",
        erradas: ["Desistir do plano, porque já deu errado", "Esperar a luz voltar, nem que seja de madrugada"],
        explicacao: "Imprevistos acontecem com todo mundo. Um bom plano é flexível: você remarca o estudo para outro horário, sem desistir e sem perder o sono.",
      },
      {
        desafio: "Você perdeu o ônibus e vai se atrasar para o trabalho. Fale em voz alta a mensagem que mandaria para a sua chefia.",
        criterio: "Avisou do atraso, disse o motivo e informou o horário previsto de chegada.",
      },
      {
        desafio: "Planeje em voz alta uma tarde de estudo de duas horas: o que vai fazer, em que ordem e quando vai pausar.",
        criterio: "Disse pelo menos duas tarefas, em ordem, e incluiu uma pausa.",
      },
      {
        desafio: "Sem falar, faça a mímica de algo que rouba tempo nos estudos. Depois, diga uma dica para evitar isso.",
        criterio: "Fez a mímica sem falar e depois deu uma dica ligada a ela.",
      },
    ],
    medio: [
      {
        pergunta: "A prova do Renan é daqui a três semanas. Pela matriz de Eisenhower, que separa tarefas por urgência e importância, o que ele deve fazer?",
        certa: "Marcar na agenda dias de estudo desde já",
        erradas: ["Estudar só na véspera, quando ficar urgente", "Largar tudo e estudar o dia inteiro hoje"],
        explicacao: "Estudar para a prova é importante, mas ainda não é urgente. Pela matriz, tarefas assim vão para a agenda: nem largar tudo agora, nem deixar para a véspera.",
      },
      {
        pergunta: "Pela matriz de Eisenhower, o que fazer com uma tarefa urgente, mas pouco importante para os seus objetivos?",
        certa: "Delegar: passar a alguém que possa fazer",
        erradas: ["Fazer primeiro, antes de qualquer outra tarefa", "Eliminar da lista, já que importa pouco"],
        explicacao: "Urgente e pouco importante é tarefa para delegar, ou seja, passar a alguém que possa fazer, combinando com a chefia. Assim, sobra tempo para o que importa.",
      },
      {
        pergunta: "Como funciona a técnica Pomodoro, muito usada para estudar e trabalhar?",
        certa: "25 minutos de foco e depois uma pausa curta",
        erradas: ["Duas horas seguidas de estudo, sem pausa", "Uma matéria diferente a cada cinco minutos"],
        explicacao: "Blocos curtos de foco com pausas ajudam a manter a atenção. O nome vem de um cronômetro de cozinha em forma de tomate (pomodoro, em italiano).",
      },
      {
        pergunta: "A Cecília estuda com a técnica Pomodoro e já completou quatro ciclos de foco. O que o método recomenda agora?",
        certa: "Fazer uma pausa mais longa que as outras",
        erradas: ["Emendar mais quatro ciclos, sem pausa", "Encerrar os estudos pelo resto do dia"],
        explicacao: "Depois de quatro ciclos, a técnica indica uma pausa maior. Ela recarrega a energia e evita o cansaço que faz a gente errar mais.",
      },
      {
        pergunta: "Uma meta SMART é clara, pode ser medida, é possível, faz sentido para você e tem prazo. Qual destas é uma meta SMART?",
        certa: "Ler um livro por mês até dezembro",
        erradas: ["Ler mais livros quando sobrar tempo", "Ler trinta livros nesta semana"],
        explicacao: "“Um livro por mês até dezembro” diz o quê, quanto e até quando, e dá para cumprir. Das outras, uma não tem medida nem prazo, e a outra é impossível.",
      },
      {
        pergunta: "A meta do Rafael é “melhorar em matemática”. O que falta para ela virar uma meta SMART?",
        certa: "Um jeito de medir e um prazo para cumprir",
        erradas: ["Um desafio maior, como tirar dez em tudo", "Mais gente sabendo, para cobrar o Rafael"],
        explicacao: "Sem um jeito de medir e sem prazo, não dá para saber se a meta foi cumprida. “Subir a nota de 6 para 7 até o fim do bimestre” já seria uma meta SMART.",
      },
      {
        pergunta: "Na terça, o Gustavo percebeu que não vai conseguir terminar a tarefa que precisa entregar na sexta. O que ele deve fazer?",
        certa: "Avisar logo quem pediu e propor nova data",
        erradas: ["Virar a noite de quinta para tentar terminar", "Esperar a sexta e explicar só se cobrarem"],
        explicacao: "Avisar cedo dá tempo para mudar a data, dividir o trabalho ou pedir ajuda. Quem avisa só no dia do prazo deixa todo mundo sem saída.",
      },
      {
        pergunta: "A Helena faz o dever de matemática enquanto assiste a uma série. Ela diz que assim rende mais. O que costuma acontecer?",
        certa: "Ela demora mais e erra mais no dever",
        erradas: ["Ela termina mais rápido que o normal", "Ela treina o cérebro a fazer tudo junto"],
        explicacao: "O cérebro não presta atenção total em duas coisas ao mesmo tempo: ele fica alternando. Cada troca gasta tempo e abre espaço para erros.",
      },
      {
        pergunta: "O Otávio está travado há uma hora numa planilha do trabalho, e o prazo está chegando. O que ele deve fazer?",
        certa: "Pedir ajuda e mostrar o que já tentou",
        erradas: ["Insistir sozinho até o fim do dia", "Pular para outra tarefa e voltar só amanhã"],
        explicacao: "Pedir ajuda na hora certa economiza tempo. Mostrar o que já tentou ajuda a outra pessoa a achar o problema mais rápido.",
      },
      {
        pergunta: "Pela regra 80/20 (princípio de Pareto), poucas tarefas costumam trazer a maior parte dos resultados. Como a Ayla pode usar isso no dia a dia?",
        certa: "Começar pelo que faz mais diferença",
        erradas: ["Fazer as tarefas na ordem em que chegaram", "Dar o mesmo tempo para cada tarefa"],
        explicacao: "A regra 80/20 é uma observação, não uma conta exata: cerca de 20% do esforço costuma gerar 80% do resultado. Por isso, o que faz mais diferença vem primeiro.",
      },
      {
        desafio: "Diga três tarefas da sua semana (vale inventar) e classifique cada uma como urgente, importante, as duas coisas ou nenhuma delas.",
        criterio: "Citou três tarefas e classificou cada uma delas.",
      },
      {
        desafio: "Crie em voz alta uma meta SMART (pode ser inventada): diga o que vai fazer, como vai medir e até quando.",
        criterio: "A meta tinha o que fazer, um jeito de medir e um prazo.",
      },
    ],
    dificil: [
      {
        pergunta: "Pela matriz de Eisenhower, em qual quadrante vale a pena passar mais tempo para não viver “apagando incêndios”?",
        certa: "Importante e não urgente",
        erradas: ["Urgente e importante", "Urgente e não importante", "Nem urgente nem importante"],
        explicacao: "Planejar, estudar e prevenir problemas são tarefas importantes que ainda não são urgentes. Cuidando delas cedo, menos coisas viram emergência depois.",
      },
      {
        pergunta: "“O trabalho se expande até ocupar todo o tempo disponível para ele.” Como se chama essa ideia?",
        certa: "Lei de Parkinson",
        erradas: ["Princípio de Pareto", "Técnica Pomodoro", "Regra dos dois minutos"],
        explicacao: "A Lei de Parkinson explica por que uma tarefa com uma semana de prazo costuma levar a semana toda. Combinar prazos internos mais curtos ajuda a terminar antes.",
      },
      {
        pergunta: "A Joana reserva na agenda horários fixos para cada tipo de tarefa, como “9h às 10h: e-mails”. Como se chama essa técnica?",
        certa: "Blocos de tempo",
        erradas: ["Matriz de Eisenhower", "Lei de Parkinson", "Princípio de Pareto"],
        explicacao: "Nos blocos de tempo (time blocking), cada atividade ganha um horário na agenda, como um compromisso. Isso protege o foco e mostra, de forma realista, o que cabe no dia.",
      },
      {
        pergunta: "No quadro Kanban da equipe, cada tarefa é um cartão que anda entre colunas. Quais são as colunas mais básicas?",
        certa: "A fazer, fazendo e feito",
        erradas: ["Urgente, importante e opcional", "Manhã, tarde e noite", "Fácil, médio e difícil"],
        explicacao: "O Kanban é um quadro visual: o cartão anda da esquerda para a direita conforme o trabalho avança. Assim, todos veem o que está parado, o que está em andamento e o que já terminou.",
      },
      {
        pergunta: "Que ferramenta mostra as tarefas de um projeto como barras numa linha do tempo, com início, fim e duração?",
        certa: "Gráfico de Gantt",
        erradas: ["Gráfico de pizza", "Fluxograma", "Matriz de Eisenhower"],
        explicacao: "No gráfico de Gantt, cada tarefa vira uma barra no calendário. Fica fácil ver o que acontece ao mesmo tempo e se o projeto está atrasado.",
      },
      {
        pergunta: "SMART é uma sigla em inglês para metas bem definidas. O que significa a letra T?",
        certa: "Temporal: ter um prazo definido",
        erradas: ["Total: incluir todas as tarefas", "Técnica: usar uma ferramenta", "Tranquila: não causar estresse"],
        explicacao: "SMART vem de Specific (específica), Measurable (mensurável), Achievable (alcançável), Relevant (relevante) e Time-bound (temporal, com prazo).",
      },
      {
        pergunta: "O Lucas olha o e-mail a cada 5 minutos e perde o fio do que está fazendo. Qual estratégia ajuda mais?",
        certa: "Ver o e-mail em horários fixos, algumas vezes ao dia",
        erradas: ["Responder cada e-mail no instante em que chega", "Deixar a caixa de entrada aberta em outra tela", "Abrir o e-mail só uma vez por semana"],
        explicacao: "Juntar tarefas parecidas num mesmo horário evita trocar de foco toda hora. Uma vez por semana, porém, é pouco para quem precisa responder clientes e colegas.",
      },
      {
        pergunta: "Qual prática mais ajuda uma reunião a não tomar tempo à toa?",
        certa: "Ter pauta, hora para acabar e responsáveis pelas decisões",
        erradas: ["Convidar o setor inteiro, para ninguém ficar de fora", "Deixar a conversa livre, sem pauta, para surgirem ideias", "Não marcar hora para acabar, para tudo ser discutido"],
        explicacao: "Com pauta e hora para acabar, a conversa não se perde; com responsáveis e prazos, as decisões viram ação. Chamar só quem precisa estar também poupa o tempo de todos.",
      },
      {
        pergunta: "O Tiago sempre acha que vai terminar as tarefas mais rápido do que de fato termina, mesmo já tendo se atrasado antes. Como se chama esse erro comum?",
        certa: "Falácia do planejamento",
        erradas: ["Lei de Parkinson", "Princípio de Pareto", "Regra dos dois minutos"],
        explicacao: "Na falácia do planejamento, a gente subestima o tempo das tarefas. Anotar quanto elas realmente levaram e somar uma folga deixa as próximas previsões mais realistas.",
      },
      {
        pergunta: "A coordenadora Lúcia vai delegar uma tarefa ao Pedro. O que uma boa delegação precisa ter?",
        certa: "Objetivo claro, prazo e autonomia, com acompanhamento",
        erradas: ["Só o pedido: ele que descubra o resto sozinho", "Instruções minuto a minuto e conferência de tudo", "Só tarefas que ninguém mais quer fazer"],
        explicacao: "Delegar bem é combinar o resultado esperado, o prazo e os recursos, e dar liberdade para a pessoa trabalhar. Acompanhar não é vigiar: é estar disponível e checar o andamento.",
      },
      {
        desafio: "Monte em voz alta um quadro Kanban com 3 tarefas suas (vale inventar), dizendo se cada uma está em “a fazer”, “fazendo” ou “feito”.",
        criterio: "Citou 3 tarefas e colocou cada uma numa coluna.",
      },
      {
        desafio: "Transforme “quero economizar dinheiro” numa meta SMART, dizendo quanto, como vai medir e até quando.",
        criterio: "A meta tinha um valor, um jeito de medir e um prazo, e era possível de cumprir.",
      },
    ],
    expert: [
      {
        pergunta: "Num projeto, o que é o caminho crítico?",
        certa: "A sequência de tarefas sem folga, que define o prazo final",
        erradas: ["As tarefas mais caras, que pedem aprovação da diretoria", "As tarefas que podem ser feitas por último, sem pressa", "As tarefas mais difíceis, feitas por especialistas"],
        explicacao: "No caminho crítico, as tarefas não têm folga: qualquer atraso empurra a data final do projeto. Por isso, elas recebem atenção especial no acompanhamento.",
      },
      {
        pergunta: "Um projeto tem duas sequências que correm ao mesmo tempo: A (3 dias) → B (4 dias) e C (2 dias) → D (2 dias). Qual é o prazo mínimo para entregar tudo?",
        certa: "7 dias",
        erradas: ["11 dias", "4 dias", "5 dias"],
        explicacao: "A → B leva 3 + 4 = 7 dias, e C → D leva 2 + 2 = 4, ao mesmo tempo. O projeto acaba quando a sequência mais longa acaba: 7 dias. A → B é o caminho crítico, e C → D tem 3 dias de folga.",
      },
      {
        pergunta: "A gerente Cláudia tem hoje: um cliente importante reclamando de um erro grave, um curso para fazer no mês que vem e um relatório que o assistente sabe fazer. Qual é o melhor plano?",
        certa: "Resolver o cliente, delegar o relatório e agendar o curso",
        erradas: ["Fazer o relatório, resolver o cliente e cancelar o curso", "Agendar o curso, resolver o cliente e fazer o relatório", "Delegar o cliente, fazer o relatório e esquecer o curso"],
        explicacao: "O erro grave com o cliente é urgente e importante: resolva já. O curso é importante, mas não urgente: vai para a agenda. O relatório pode ser feito por outra pessoa: delegue.",
      },
      {
        pergunta: "Pela estimativa de três pontos (PERT), uma tarefa leva 2 dias no melhor caso, 4 no mais provável e 12 no pior. Qual é a estimativa?",
        certa: "5 dias",
        erradas: ["4 dias", "6 dias", "7 dias"],
        explicacao: "Na PERT, a conta é (otimista + 4 × mais provável + pessimista) ÷ 6. Aqui: (2 + 16 + 12) ÷ 6 = 5 dias. O mais provável pesa mais, sem ignorar o risco de dar errado.",
      },
      {
        pergunta: "Um analista alterna entre 5 projetos ao longo do mesmo dia. O que os estudos sobre troca de contexto indicam?",
        certa: "Parte do tempo se perde só para retomar cada projeto",
        erradas: ["Ele rende mais, porque nunca fica entediado", "O tempo se divide igualmente, sem nenhuma perda", "Ele termina mais rápido, só com mais erros"],
        explicacao: "Cada troca exige lembrar onde parou e reorganizar as ideias, e esse tempo vai se somando. Por isso, agrupar tarefas e limitar os projetos em andamento costuma aumentar a produtividade.",
      },
      {
        pergunta: "No Kanban, por que se define um limite de tarefas na coluna “fazendo” (limite WIP)?",
        certa: "Para terminar tarefas antes de começar outras",
        erradas: ["Para cada pessoa ter sempre muitas tarefas", "Para esconder da chefia o que está atrasado", "Para dividir o trabalho igualmente entre todos"],
        explicacao: "Com muitas tarefas começadas ao mesmo tempo, nada fica pronto. O limite WIP (trabalho em andamento) força a equipe a concluir e mostra onde o fluxo trava.",
      },
      {
        pergunta: "Na metodologia OKR, usada por muitas empresas, o que é um resultado-chave (key result)?",
        certa: "Um número que mostra se o objetivo foi atingido",
        erradas: ["A lista de tarefas diárias de cada pessoa", "O sonho da empresa para os próximos 50 anos", "O prêmio pago a quem bate a meta"],
        explicacao: "OKR quer dizer Objetivos e Resultados-Chave: o objetivo diz aonde chegar, e os resultados-chave, com números, mostram se chegou. Exemplo: “responder 90% dos clientes em até 24 horas”.",
      },
      {
        pergunta: "Uma loja descobre que 20% dos clientes geram 80% das vendas e tem pouco tempo para o pós-venda. Qual decisão segue o princípio de Pareto?",
        certa: "Priorizar os clientes que mais compram, sem abandonar os outros",
        erradas: ["Parar de atender os outros 80% dos clientes", "Dar exatamente o mesmo tempo a todos os clientes", "Atender primeiro quem compra menos, para vender mais"],
        explicacao: "Pareto ajuda a decidir onde o esforço rende mais, mas não manda abandonar ninguém. O tempo extra vai para os clientes de maior impacto, e os outros continuam sendo atendidos.",
      },
      {
        pergunta: "O Davi é jovem aprendiz e já terminou o ensino fundamental. O chefe pediu que ele fizesse hora extra. O que diz a lei?",
        certa: "Aprendiz não pode fazer hora extra",
        erradas: ["Pode, se receber 50% a mais por hora", "Pode, se compensar no dia seguinte", "Pode, até 2 horas por dia, como os outros"],
        explicacao: "A CLT proíbe hora extra e compensação de jornada para aprendizes. A jornada é de até 6 horas por dia, ou até 8 para quem terminou o ensino fundamental, contando as aulas teóricas.",
      },
      {
        pergunta: "A Natália rende mais de manhã e fica dispersa depois do almoço. Pela gestão de energia, como ela deve organizar o dia?",
        certa: "Tarefas de muito foco de manhã e rotinas leves à tarde",
        erradas: ["Tarefas leves de manhã e as difíceis à tarde", "Tarefas na ordem em que chegaram, sem exceção", "Tudo de manhã, deixando a tarde livre"],
        explicacao: "Gerir o tempo também é gerir a energia: o trabalho que exige mais concentração vai para o horário em que você rende mais. Tarefas simples, como arquivar, cabem nos momentos de menos energia.",
      },
      {
        desafio: "Você é a liderança e vai delegar a organização de uma reunião. Delegue em voz alta, dizendo o objetivo, o prazo e como vai acompanhar.",
        criterio: "Disse o objetivo, o prazo e como vai acompanhar, sem ditar cada passo.",
      },
      {
        desafio: "Planeje em voz alta um evento da escola para daqui a 2 semanas: diga 4 tarefas, a ordem delas e quais não podem atrasar.",
        criterio: "Disse 4 tarefas em ordem lógica e apontou quais definem o prazo (o caminho crítico).",
      },
    ],
  },

  // ---------- EDUCAÇÃO FINANCEIRA (verde, maleta) ----------
  financas: {
    facil: [
      {
        pergunta: "A Luana anotou no caderno a mesada e o que ganhou passeando com o cachorro da vizinha. No orçamento, como se chamam esses valores que entram?",
        certa: "Receitas",
        erradas: ["Despesas", "Saldo"],
        explicacao: "Receita é o dinheiro que entra; despesa é o que sai. O saldo é o que sobra depois de tirar as despesas das receitas.",
      },
      {
        pergunta: "O Breno recebe R$ 150 por mês, mas gasta R$ 180 e vive pedindo dinheiro emprestado aos amigos. Qual é a melhor primeira atitude?",
        certa: "Anotar os gastos e cortar o que não é necessário",
        erradas: ["Parcelar as compras, para os gastos caberem no mês", "Deixar como está, pois a diferença é só de R$ 30"],
        explicacao: "Gastar mais do que recebe gera uma dívida que cresce todo mês, e parcelar só empurra o problema. Anotar os gastos mostra para onde vai o dinheiro e o que dá para cortar.",
      },
      {
        pergunta: "A Elisa viu um tênis em promoção e quer comprar na hora, sem ter planejado. Qual é a melhor atitude?",
        certa: "Esperar um ou dois dias e ver se ainda quer",
        erradas: ["Comprar logo, antes que a promoção acabe", "Comprar dois, para aproveitar o desconto"],
        explicacao: "Compra por impulso é a que se faz sem pensar, e promoção cria essa pressa. Esperar um ou dois dias mostra se a vontade continua e se a compra cabe no orçamento.",
      },
      {
        pergunta: "A Helena precisa de um celular para estudar, e um modelo simples já resolve. Comprar o modelo mais caro da loja é um exemplo de quê?",
        certa: "Um desejo, pois vai além do que ela precisa",
        erradas: ["Uma necessidade, já que ela precisa de celular", "Um investimento, porque celular caro valoriza"],
        explicacao: "Ter um celular para estudar é a necessidade, e o modelo simples já atende. Pagar a mais por recursos extras é desejo, e aparelho perde valor com o tempo.",
      },
      {
        pergunta: "A Dandara guarda um pouco de dinheiro todo mês só para imprevistos, como um remédio ou um conserto. Como se chama esse dinheiro?",
        certa: "Reserva de emergência",
        erradas: ["Limite do cartão de crédito", "Décimo terceiro salário"],
        explicacao: "Reserva de emergência é um dinheiro seu, guardado só para imprevistos. Já o limite do cartão é dinheiro emprestado, que vira dívida.",
      },
      {
        pergunta: "A Beatriz quer juntar R$ 600 em 6 meses para pagar um curso. Qual plano garante que ela chegue à meta?",
        certa: "Guardar R$ 100 por mês, logo que receber",
        erradas: ["Guardar R$ 60 por mês, logo que receber", "Guardar o que sobrar no fim de cada mês"],
        explicacao: "R$ 600 divididos por 6 meses dão R$ 100 por mês. Separar esse valor assim que o dinheiro entra garante a meta; já o que sobra no fim do mês costuma ser pouco ou nada.",
      },
      {
        pergunta: "Alguém liga dizendo ser da central do banco e pede a senha da Isabela para cancelar uma compra. O que ela deve fazer?",
        certa: "Desligar e ligar para o número oficial do banco",
        erradas: ["Passar a senha, já que a pessoa sabia o nome dela", "Passar só o código que chegou por mensagem"],
        explicacao: "Banco nunca pede senha nem código por telefone ou mensagem. Golpistas usam dados vazados, como nome e CPF, para parecer confiáveis.",
      },
      {
        pergunta: "O Ícaro recebe a mensagem: “Oi, é sua tia! Troquei de número. Me faz um Pix urgente?” Qual é a atitude mais segura?",
        certa: "Ligar para o número antigo da tia e confirmar",
        erradas: ["Fazer o Pix logo, porque é uma emergência", "Pedir uma foto dela antes de fazer o Pix"],
        explicacao: "É um golpe comum: o criminoso copia a foto e o nome de alguém da família. Como o Pix cai na hora e é difícil de desfazer, confirme sempre por outro canal.",
      },
      {
        pergunta: "No mercado, o Heitor vê dois pacotes do mesmo feijão: 1 kg por R$ 8 e 500 g por R$ 5. Qual é a compra mais econômica?",
        certa: "O de 1 kg, pois o quilo sai mais barato",
        erradas: ["O de 500 g, porque custa menos no caixa", "Tanto faz, o preço por quilo é o mesmo"],
        explicacao: "Dois pacotes de 500 g dariam 1 kg por R$ 10. Comparar o preço por quilo, e não só o valor da etiqueta, mostra qual oferta vale mais a pena.",
      },
      {
        pergunta: "O Ravi vende brigadeiros. Cada um custa R$ 1 para fazer e é vendido por R$ 3. Qual é o lucro em cada brigadeiro?",
        certa: "R$ 2",
        erradas: ["R$ 3", "R$ 4"],
        explicacao: "Lucro é o preço de venda menos o custo: R$ 3 menos R$ 1 dá R$ 2. Quem não conhece o custo pode vender barato demais e ter prejuízo sem perceber.",
      },
      {
        desafio: "Diga 3 necessidades e 3 desejos de quem estuda, separando bem os dois grupos.",
        criterio: "Falou 3 necessidades e 3 desejos, sem colocar nenhum no grupo errado.",
      },
      {
        desafio: "Dê 3 dicas para alguém não cair em golpes pelo celular, como a falsa central do banco, o Pix urgente ou o link suspeito.",
        criterio: "Deu 3 dicas diferentes e corretas, como não passar senha e confirmar por outro canal.",
      },
      {
        desafio: "Faça um “comercial” de até 30 segundos convencendo a turma a ter uma reserva de emergência.",
        criterio: "Explicou o que é reserva de emergência e deu um exemplo de quando usá-la.",
      },
    ],
    medio: [
      {
        pergunta: "O Samuel pegou um empréstimo de R$ 100 e vai devolver R$ 110 no mês seguinte. Como se chamam esses R$ 10 a mais?",
        certa: "Juros",
        erradas: ["Multa", "Parcela"],
        explicacao: "Juros são o “aluguel” do dinheiro: quem empresta cobra a mais pelo tempo que você fica com ele. Já a multa é uma punição cobrada quando se paga com atraso.",
      },
      {
        pergunta: "Juros compostos são “juros sobre juros”. Uma dívida de R$ 100 tem esses juros, de 10% ao mês. Sem pagar nada, de quanto será a dívida em 2 meses?",
        certa: "R$ 121",
        erradas: ["R$ 120", "R$ 110"],
        explicacao: "No 1º mês, R$ 100 viram R$ 110; no 2º, os 10% são calculados sobre R$ 110 e somam R$ 11, total de R$ 121. Nos juros simples, seriam sempre sobre R$ 100: R$ 120.",
      },
      {
        pergunta: "A fatura do cartão de crédito do Matheus foi de R$ 400, e ele pagou só o valor mínimo. O que acontece com o resto?",
        certa: "Vira uma dívida com juros muito altos",
        erradas: ["Passa para o mês seguinte, sem nenhum custo", "É perdoado, porque ele já pagou uma parte"],
        explicacao: "O que não é pago entra no crédito rotativo, um dos empréstimos mais caros que existem. Pagar a fatura inteira evita que a dívida vire uma bola de neve.",
      },
      {
        pergunta: "A Iara quer comprar um videogame em 10 parcelas “que cabem no bolso”. Qual é a melhor atitude antes de fechar a compra?",
        certa: "Comparar o total parcelado com o preço à vista",
        erradas: ["Pedir mais parcelas, para cada uma ficar menor", "Comprar logo, já que a parcela cabe na mesada"],
        explicacao: "Parcela pequena pode esconder juros, e 10 vezes de um valor baixo podem somar bem mais que o preço à vista, pago de uma vez. Comparar os dois mostra quanto a compra custa de verdade.",
      },
      {
        pergunta: "O contracheque do Gabriel, documento que detalha o pagamento, mostra o salário bruto e o líquido. O que é o salário líquido?",
        certa: "O que ele recebe depois dos descontos",
        erradas: ["O valor total, antes de qualquer desconto", "O que ele recebe em dinheiro vivo, na mão"],
        explicacao: "Bruto é o salário combinado, sem descontos. Líquido é o que cai de verdade na conta: o bruto menos os descontos, como o INSS.",
      },
      {
        pergunta: "No contracheque da Camila, o resumo do pagamento, aparece o FGTS (Fundo de Garantia). Ela achou que era um desconto do salário. Está certa?",
        certa: "Não. É a empresa que deposita, sem descontar dela",
        erradas: ["Sim. O FGTS sai do salário dela, como o INSS", "Não. O FGTS é pago pelo governo uma vez por ano"],
        explicacao: "O FGTS é um depósito mensal que a empresa faz numa conta em nome de quem trabalha: 8% do salário (2% para aprendiz). No contracheque, ele aparece só como informação.",
      },
      {
        pergunta: "O Renan foi contratado em 1º de julho e trabalhou até o fim do ano. Quanto ele recebe de 13º salário nesse ano?",
        certa: "6/12 do salário, ou seja, a metade",
        erradas: ["O salário inteiro, como quem trabalhou o ano todo", "Nada, porque ainda não completou um ano"],
        explicacao: "O 13º é proporcional: cada mês com 15 dias ou mais de trabalho vale 1/12. De julho a dezembro são 6 meses, então ele recebe 6/12, a metade.",
      },
      {
        pergunta: "A Larissa completou 12 meses de trabalho e vai tirar 30 dias de férias. O que a lei garante a mais no pagamento?",
        certa: "Um adicional de, no mínimo, 1/3 do salário",
        erradas: ["Nada além do salário normal do mês", "Um adicional de, no mínimo, metade do salário"],
        explicacao: "Férias são pagas e vêm com um adicional de pelo menos 1/3 do salário, para a pessoa descansar e aproveitar. O direito vem a cada 12 meses de trabalho.",
      },
      {
        pergunta: "A Giovana, de 15 anos, começou como jovem aprendiz, com carteira assinada. O que a lei garante sobre o pagamento dela?",
        certa: "Pelo menos o salário mínimo por hora trabalhada",
        erradas: ["Uma bolsa, no valor que a empresa quiser", "Nada, até ela terminar o curso de aprendizagem"],
        explicacao: "Aprendiz tem contrato de trabalho com carteira assinada, então recebe salário. A lei garante pelo menos o salário mínimo-hora: o valor do mínimo calculado por hora trabalhada.",
      },
      {
        pergunta: "O Wesley tem salário-base de R$ 2.000 e usa vale-transporte, a ajuda da empresa para a passagem. Qual é o desconto máximo por esse benefício?",
        certa: "R$ 120",
        erradas: ["R$ 60", "R$ 160"],
        explicacao: "A lei permite descontar até 6% do salário-base pelo vale-transporte, e a empresa paga o resto da passagem. Como 1% de R$ 2.000 é R$ 20, 6% são R$ 120.",
      },
      {
        desafio: "Invente um pequeno negócio e diga quanto custa fazer um produto, por quanto vai vender e qual é o lucro.",
        criterio: "Disse custo, preço de venda e lucro, e a conta (preço menos custo) está certa.",
      },
      {
        desafio: "Imagine que você tem R$ 100 para passar o mês. Diga em voz alta como vai dividir: quanto vai para cada gasto e quanto vai guardar.",
        criterio: "Citou pelo menos dois gastos e uma parte guardada, e a soma deu exatamente R$ 100.",
      },
    ],
    dificil: [
      {
        pergunta: "Em um ano, os preços subiram 5% em média e o salário da Joana continuou igual. O que aconteceu com o poder de compra dela?",
        certa: "Caiu: o mesmo dinheiro compra menos",
        erradas: ["Subiu, porque as coisas valem mais", "Ficou igual, já que o salário não mudou", "Só muda se ela pegar um empréstimo"],
        explicacao: "Inflação é a alta geral dos preços. Se o salário não sobe junto, o mesmo valor compra menos coisas: o poder de compra cai.",
      },
      {
        pergunta: "A Marta aplicou R$ 1.000 a 1% ao mês, com juros compostos. Quanto terá depois de 2 meses, sem mexer no dinheiro?",
        certa: "R$ 1.020,10",
        erradas: ["R$ 1.020,00", "R$ 1.010,00", "R$ 1.200,00"],
        explicacao: "No 1º mês, R$ 1.000 rendem R$ 10 e viram R$ 1.010. No 2º, 1% de R$ 1.010 é R$ 10,10, total de R$ 1.020,10. Esses 10 centavos são os juros sobre juros.",
      },
      {
        pergunta: "Ao comparar empréstimos, qual informação mostra o custo total, com juros, tarifas, impostos e seguros?",
        certa: "O CET (Custo Efetivo Total)",
        erradas: ["A taxa de juros do mês", "O valor de cada parcela", "O número de parcelas"],
        explicacao: "Duas ofertas com a mesma taxa de juros podem custar diferente por causa de tarifas e seguros. O CET junta tudo num número só, e as instituições são obrigadas a informá-lo.",
      },
      {
        pergunta: "O que faz o FGC (Fundo Garantidor de Créditos), importante para quem investe?",
        certa: "Devolve o dinheiro, até um limite, se o banco quebrar",
        erradas: ["Cobra imposto sobre os rendimentos", "Garante que todo investimento dê lucro", "Paga o FGTS de quem é demitido"],
        explicacao: "O FGC protege aplicações como poupança e CDB, até um limite por pessoa em cada instituição (hoje, R$ 250 mil), caso ela quebre. Ações e fundos de investimento não têm essa garantia.",
      },
      {
        pergunta: "O que mais ajuda a melhorar o score de crédito, a pontuação que mostra se a pessoa costuma pagar em dia?",
        certa: "Pagar as contas em dia, todo mês",
        erradas: ["Pedir cartões em vários bancos ao mesmo tempo", "Sacar o salário inteiro assim que ele cair", "Não ter nenhuma conta no próprio nome"],
        explicacao: "O score usa o histórico de pagamentos: contas pagas em dia aumentam a confiança de quem empresta. Pedir crédito em vários lugares de uma vez pode até baixar a pontuação.",
      },
      {
        pergunta: "Um investimento rendeu 10% no ano, e a inflação foi de 4%. De quanto foi o ganho real, aproximadamente?",
        certa: "6%",
        erradas: ["14%", "10%", "4%"],
        explicacao: "O ganho real desconta a inflação: de forma aproximada, 10% − 4% = 6% (a conta exata, 1,10 ÷ 1,04, dá cerca de 5,8%). Os outros 4% só acompanharam a alta dos preços.",
      },
      {
        pergunta: "Uma TV custa R$ 1.000 em 10 vezes “sem juros” ou R$ 900 à vista. O que isso mostra?",
        certa: "O parcelado tem R$ 100 de juros embutidos",
        erradas: ["O parcelado é melhor, pois não tem juros", "As duas opções custam exatamente o mesmo", "O à vista sai mais caro, por ser pago na hora"],
        explicacao: "Se pagando na hora sai R$ 900, esse é o preço real; os R$ 100 a mais do parcelado são o custo de pagar depois. “Sem juros” nem sempre quer dizer sem custo.",
      },
      {
        pergunta: "Especialistas recomendam que as parcelas de dívidas não passem de cerca de 30% da renda. Se o Lucas ganha R$ 2.000, qual é esse limite?",
        certa: "R$ 600 por mês",
        erradas: ["R$ 300 por mês", "R$ 1.000 por mês", "R$ 1.400 por mês"],
        explicacao: "30% de R$ 2.000 = 0,3 × 2.000 = R$ 600. Acima disso, sobra pouco para as despesas básicas, e qualquer imprevisto pode virar conta atrasada.",
      },
      {
        pergunta: "Pela regra 50-30-20 de orçamento, quanto de uma renda de R$ 1.500 deve ir para guardar ou pagar dívidas?",
        certa: "R$ 300",
        erradas: ["R$ 450", "R$ 750", "R$ 150"],
        explicacao: "Na regra 50-30-20, 50% vão para necessidades, 30% para desejos e 20% para guardar ou quitar dívidas. 20% de R$ 1.500 são R$ 300 (30% seriam R$ 450, e 50%, R$ 750).",
      },
      {
        pergunta: "A Larissa recebeu por e-mail o boleto do curso, mas o beneficiário é uma pessoa desconhecida, não a escola. O que isso indica?",
        certa: "Pode ser falso: confirme com a escola antes",
        erradas: ["É normal, o banco sempre troca o nome", "Pague logo, para não gerar multa", "É só erro de digitação, sem risco"],
        explicacao: "No golpe do boleto falso, o código leva o dinheiro para a conta do golpista. Antes de pagar, confira o nome do beneficiário, o CNPJ e o valor, ou baixe o boleto no site oficial.",
      },
      {
        desafio: "Monte em voz alta o orçamento de um salário de R$ 2.000 pela regra 50-30-20, com os valores e um exemplo de cada parte.",
        criterio: "Disse R$ 1.000, R$ 600 e R$ 400, com um exemplo coerente para cada parte.",
      },
      {
        desafio: "Explique para a turma, com um exemplo, por que pagar só o mínimo da fatura do cartão é perigoso.",
        criterio: "Explicou que o resto vira dívida com juros altos (o rotativo) e deu um exemplo.",
      },
    ],
    expert: [
      {
        pergunta: "Uma dívida de R$ 1.000 no rotativo do cartão cobra 15% ao mês, com juros compostos. Sem pagar nada, de quanto ela será em 3 meses, aproximadamente?",
        certa: "R$ 1.521",
        erradas: ["R$ 1.450", "R$ 1.150", "R$ 1.345"],
        explicacao: "Mês a mês: R$ 1.000 → R$ 1.150 → R$ 1.322,50 → R$ 1.520,88. Com juros simples seriam R$ 1.450: os juros sobre juros fazem a dívida crescer cada vez mais rápido.",
      },
      {
        pergunta: "Pela regra dos 72, em quanto tempo, aproximadamente, um dinheiro dobra se render 6% ao ano com juros compostos?",
        certa: "12 anos",
        erradas: ["6 anos", "17 anos", "72 anos"],
        explicacao: "A regra dos 72 é um atalho para juros compostos: divida 72 pela taxa anual. 72 ÷ 6 = 12 anos. É uma aproximação, mas funciona bem para taxas entre 2% e 15%.",
      },
      {
        pergunta: "O Felipe pediu demissão depois de 2 anos de carteira assinada. O que ele NÃO recebe nessa situação?",
        certa: "Multa de 40% do FGTS e seguro-desemprego",
        erradas: ["Saldo de salário dos dias trabalhados", "13º salário proporcional", "Férias proporcionais com 1/3"],
        explicacao: "Quem pede demissão recebe saldo de salário, 13º e férias proporcionais com 1/3. A multa de 40% do FGTS, o saque do FGTS e o seguro-desemprego são para quem é demitido sem justa causa.",
      },
      {
        pergunta: "A Bianca deixa R$ 5.000 parados na conta corrente, sem render, “para não ter trabalho”. Que conceito explica o que ela está perdendo?",
        certa: "Custo de oportunidade",
        erradas: ["Juros de mora", "Spread bancário", "Taxa de administração"],
        explicacao: "Custo de oportunidade é o que se deixa de ganhar ao escolher uma opção em vez de outra. Parado na conta, o dinheiro perde para a inflação, quando poderia render numa aplicação segura.",
      },
      {
        pergunta: "Um banco paga 10% ao ano para quem investe nele e cobra 40% ao ano de quem pega empréstimo. Como se chama essa diferença?",
        certa: "Spread bancário",
        erradas: ["Inflação", "Custo Efetivo Total", "Taxa Selic"],
        explicacao: "Spread é a diferença entre o que o banco paga para captar dinheiro e o que cobra para emprestar. Ele cobre custos, calotes e o lucro do banco.",
      },
      {
        pergunta: "Quando o Banco Central aumenta a taxa Selic, o que costuma acontecer?",
        certa: "O crédito fica mais caro e a renda fixa rende mais",
        erradas: ["O crédito fica mais barato e a poupança rende menos", "Os preços sobem mais rápido no mercado", "Os salários aumentam automaticamente"],
        explicacao: "A Selic é a taxa básica de juros do país. Quando ela sobe, o crédito encarece e o consumo desacelera, o que ajuda a segurar a inflação; aplicações de renda fixa passam a render mais.",
      },
      {
        pergunta: "O Ravi vende brigadeiros a R$ 3, cada um custa R$ 1 para fazer e ele tem R$ 200 de custos fixos por mês. Quantos precisa vender no mês para empatar?",
        certa: "100 brigadeiros",
        erradas: ["67 brigadeiros", "200 brigadeiros", "50 brigadeiros"],
        explicacao: "Cada brigadeiro deixa R$ 2 (R$ 3 − R$ 1) para pagar os custos fixos: R$ 200 ÷ R$ 2 = 100. Esse é o ponto de equilíbrio; a partir do 101º, ele tem lucro.",
      },
      {
        pergunta: "A Paula ganha R$ 2.500 de salário-base e gasta R$ 100 por mês com passagem. Quanto a empresa pode descontar pelo vale-transporte?",
        certa: "R$ 100, o valor da passagem",
        erradas: ["R$ 150, que são 6% do salário", "R$ 250, que são 10% do salário", "Nada, porque o vale é um benefício"],
        explicacao: "O desconto é de até 6% do salário-base, mas nunca maior que o próprio valor do vale. Como 6% de R$ 2.500 dá R$ 150 e a passagem custa R$ 100, o desconto fica em R$ 100.",
      },
      {
        pergunta: "A Marina tem 30 dias de férias e quer “vender” parte deles (abono pecuniário). O que a CLT permite?",
        certa: "Vender até 1/3 das férias, recebendo por esses dias",
        erradas: ["Não vender nenhum dia das férias", "Vender os 30 dias, se ela quiser", "Vender, mas perdendo o adicional de 1/3"],
        explicacao: "A CLT permite converter até 1/3 das férias em dinheiro: com 30 dias, até 10. Ela trabalha nesses dias, recebe por eles e continua com o adicional de 1/3 sobre as férias.",
      },
      {
        pergunta: "Qual é a característica mais importante da aplicação onde fica a reserva de emergência?",
        certa: "Liquidez diária e baixo risco",
        erradas: ["A maior rentabilidade possível", "Resgate só depois de 5 anos", "Ações de uma empresa promissora"],
        explicacao: "Emergência não avisa: o dinheiro precisa estar disponível na hora (liquidez) e sem risco de perder valor. Rentabilidade alta, com risco ou prazo longo, fica para outros objetivos.",
      },
      {
        desafio: "Explique, como se fosse para um amigo, a diferença entre juros simples e compostos, com um exemplo em números.",
        criterio: "Explicou “juros sobre juros” e deu um exemplo com a conta certa.",
      },
      {
        desafio: "Invente um pequeno negócio: diga um custo fixo, um custo variável, o preço de venda e quantas unidades precisa vender para empatar.",
        criterio: "Diferenciou custo fixo e variável e fez a conta do ponto de equilíbrio corretamente.",
      },
    ],
  },
};

// QUALIFICAÇÃO (casa do capelo): conquista que faz a carreira andar. "casas" = quantas avança (2 ou 3).
const QUALIFICACAO = [
  { texto: "Você fez um curso de comunicação e agora apresenta os projetos da equipe com confiança.", casas: 3 },
  { texto: "Você acolheu uma pessoa nova na equipe e recebeu elogios da liderança pela atitude.", casas: 2 },
  { texto: "Você concluiu um curso de planilhas eletrônicas e agora organiza os dados do setor em minutos.", casas: 3 },
  { texto: "Você atendeu um cliente com tanta calma e atenção que ele fez questão de elogiar você para a gerência.", casas: 2 },
  { texto: "Você usou a agenda a semana toda e entregou todas as tarefas no prazo.", casas: 2 },
  { texto: "Você concluiu um curso de gestão do tempo e montou seu primeiro plano semanal.", casas: 3 },
  { texto: "Você recebeu o primeiro salário e guardou uma parte para a reserva de emergência antes de gastar.", casas: 3 },
  { texto: "Você fez um curso de educação financeira e agora anota todas as suas receitas e despesas.", casas: 2 },
  { texto: "Você concluiu um curso de aprendizagem industrial e aprendeu na prática como funciona uma empresa.", casas: 3 },
  { texto: "Você entrou num curso técnico e começou a aprender uma profissão com aulas práticas em laboratório.", casas: 3 },
  { texto: "Você fez um curso de qualificação profissional e colocou o certificado no seu currículo.", casas: 2 },
  { texto: "Você visitou os laboratórios de uma escola técnica e descobriu profissões da indústria que nem conhecia.", casas: 2 },
];

// CILADA (casa da caveira): atitude que atrasa a carreira. "casas" = quantas volta (2 ou 3).
const CILADA = [
  { texto: "Você inventou um curso no currículo, e a mentira foi descoberta na entrevista.", casas: 3 },
  { texto: "Você postou uma selfie no trabalho com documentos sigilosos da empresa aparecendo.", casas: 2 },
  { texto: "Você clicou no link de um e-mail falso e digitou a senha do sistema da empresa.", casas: 3 },
  { texto: "Você guardou os papéis do dia sem nenhuma ordem e não encontra o contrato que a gerente pediu.", casas: 2 },
  { texto: "Você ficou no celular “só mais cinco minutinhos” e se atrasou para o curso.", casas: 2 },
  { texto: "Você deixou tudo para a última noite e não conseguiu entregar o trabalho.", casas: 3 },
  { texto: "Você deixou um amigo comprar parcelado no seu nome, ele não pagou e a dívida ficou para você.", casas: 3 },
  { texto: "Você gastou o salário inteiro no primeiro fim de semana e faltou dinheiro para a passagem.", casas: 2 },
];
