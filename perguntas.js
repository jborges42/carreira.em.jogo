// =====================================================================
//  CARREIRA EM JOGO — banco de cartas (edite à vontade!)
// =====================================================================
//  São 4 baralhos, um para cada cor do tabuleiro, com 25 cartas cada.
//
//  PERGUNTA:
//    { pergunta: "Texto", certa: "Resposta certa",
//      erradas: ["Errada 1", "Errada 2"], explicacao: "Por que a certa é certa" },
//    → o jogo embaralha as alternativas sozinho; pode ter 1, 2 ou 3 erradas.
//
//  DESAFIO PRÁTICO (feito em voz alta; o mediador avalia ou os outros votam):
//    { desafio: "O que fazer", criterio: "O que observar para aprovar" },
//
//  Cuidados: cada carta fica entre { } e termina com vírgula; textos entre
//  aspas "..." e, se precisar de aspas dentro do texto, use “ ” (curvas).
//  Se algo quebrar, a tela inicial avisa o mediador e mostra a linha.
// =====================================================================

const CARTAS = {

  // ---------- ÉTICA E POSTURA (roxo, ?) ----------
  etica: [
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
      pergunta: "A Joana escolhe os fornecedores (quem vende para a empresa). A loja do tio dela quer ser escolhida. O que é mais ético?",
      certa: "Contar que é do tio e ficar fora da escolha",
      erradas: ["Escolher a loja do tio, se o preço estiver bom", "Pedir ao tio um desconto e escolher a loja dele"],
      explicacao: "Isso é conflito de interesses: um interesse pessoal pode pesar numa decisão do trabalho. Mesmo com preço bom, o certo é contar o parentesco e ficar fora da escolha.",
    },
    {
      pergunta: "A Bruna sabe de um produto que a empresa ainda vai lançar, e isso é segredo. Uma amiga quer detalhes. O que a Bruna deve fazer?",
      certa: "Não contar nada, pois é sigilo da empresa",
      erradas: ["Contar tudo, mas pedir à amiga que não espalhe", "Postar uma dica misteriosa para criar suspense"],
      explicacao: "Guardar sigilo é não revelar o que a empresa confiou a você. Contar “só para uma amiga” já quebra o sigilo e pode causar prejuízo à empresa.",
    },
    {
      pergunta: "O Felipe quer usar a impressora da empresa para imprimir 40 páginas de um trabalho da escola. O que ele deve fazer?",
      certa: "Perguntar primeiro se pode imprimir algo pessoal",
      erradas: ["Imprimir no intervalo, quando ninguém está usando", "Imprimir, já que é pouca coisa para a empresa"],
      explicacao: "Impressora, papel e internet da empresa são para o trabalho. Usá-los em assuntos pessoais sem permissão, mesmo que pareça pouco, é usar o que não é seu.",
    },
    {
      pergunta: "A Lívia vai procurar o primeiro emprego e lembra que tem postagens antigas com palavrões e ofensas. O que ela deve fazer?",
      certa: "Revisar o perfil e apagar o que passa má impressão",
      erradas: ["Deixar como está, pois empresa não olha rede social", "Trocar a foto por uma mais séria e manter o resto"],
      explicacao: "Quem seleciona pessoas para uma vaga pode olhar as redes sociais. O que você posta faz parte da sua imagem profissional, para o bem ou para o mal.",
    },
    {
      pergunta: "O Rodrigo gravou um vídeo engraçado de um colega no intervalo do trabalho e quer postar. O que ele deve fazer?",
      certa: "Pedir permissão ao colega antes de postar",
      erradas: ["Postar, mas sem marcar o nome do colega", "Postar e só apagar se o colega reclamar"],
      explicacao: "A imagem de cada pessoa pertence a ela: postar sem permissão, mesmo sem marcar o nome, pode constranger o colega. A empresa também pode ter regras sobre gravações.",
    },
    {
      pergunta: "Alguns colegas imitam o sotaque da Ana, que veio de outro estado, e ela não gosta. O que eles devem fazer?",
      certa: "Parar, porque isso desrespeita e magoa a colega",
      erradas: ["Continuar, porque é só uma brincadeira de colegas", "Sugerir que ela treine para falar igual a todos"],
      explicacao: "Brincadeira só é brincadeira quando todos se divertem. Zombar do sotaque, da aparência ou da origem de alguém é desrespeito e pode ser discriminação.",
    },
    {
      pergunta: "O Murilo é surdo e acabou de entrar na equipe. O que ajuda a incluí-lo nas reuniões?",
      certa: "Ter intérprete de Libras ou usar legendas e textos",
      erradas: ["Falar bem alto e devagar para que ele consiga ouvir", "Contar a ele, só no fim, o que foi decidido"],
      explicacao: "Falar alto não ajuda quem não ouve. Com Libras (Língua Brasileira de Sinais), legendas ou textos, ele participa de verdade; na dúvida, pergunte o que funciona melhor para ele.",
    },
    {
      pergunta: "O projeto da equipe da Manuela foi elogiado, mas a liderança parabenizou só ela. O que ela deve fazer?",
      certa: "Agradecer e dizer que o trabalho foi de todos",
      erradas: ["Aceitar sozinha, afinal foi ela quem apresentou", "Ficar calada para não causar ciúme na equipe"],
      explicacao: "Reconhecer o esforço dos colegas é justo e fortalece a equipe. Ficar com o crédito pelo trabalho de todos quebra a confiança do grupo.",
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
      pergunta: "O Diego vai fazer o primeiro currículo, mas nunca trabalhou. O que ele pode colocar nele?",
      certa: "Cursos, projetos da escola e o que sabe fazer",
      erradas: ["Um emprego inventado, para não deixar em branco", "Nada: sem experiência, não vale a pena fazer"],
      explicacao: "No primeiro currículo valem cursos, projetos da escola, voluntariado e habilidades. Informação inventada é mentira e pode ser descoberta na entrevista.",
    },
    {
      pergunta: "Na entrevista, perguntam à Vitória: “Que ponto você precisa melhorar?” Qual é a melhor resposta?",
      certa: "Contar uma dificuldade real e como a enfrenta",
      erradas: ["Mudar de assunto e falar só das qualidades", "Dizer que é perfeccionista, mesmo sem ser verdade"],
      explicacao: "Quem entrevista quer ver autoconhecimento e vontade de crescer. Fugir da pergunta ou dar resposta decorada soa falso; uma dificuldade real com um plano de melhora passa confiança.",
    },
    {
      pergunta: "Na hora de escolher a roupa para trabalhar, qual é a melhor regra?",
      certa: "Seguir o que a empresa pede para cada função",
      erradas: ["Usar a roupa mais cara que tiver, para impressionar", "Seguir a moda, não importa qual seja o lugar"],
      explicacao: "Cada lugar tem seu padrão: uniforme na fábrica, roupa mais formal em alguns escritórios. Na dúvida, pergunte e prefira roupas limpas e discretas.",
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
      desafio: "Transforme a frase “Você sempre faz tudo errado!” em um feedback respeitoso e útil, como se falasse com um colega.",
      criterio: "Não usou palavras ofensivas, citou algo específico e deu uma sugestão de melhoria.",
    },
    {
      desafio: "Faça a mímica de colocar os EPIs (equipamentos de proteção) antes de entrar numa fábrica, dizendo o nome de cada um.",
      criterio: "Fez a mímica e disse o nome de pelo menos 3 EPIs, como capacete ou luvas.",
    },
    {
      desafio: "Uma pessoa nova chegou hoje à equipe e não conhece ninguém. Diga três atitudes para ela se sentir bem-vinda.",
      criterio: "Disse três atitudes diferentes e respeitosas para acolher a pessoa.",
    },
    {
      desafio: "Dois colegas querem usar o mesmo computador agora e começam a discutir. Explique, em voz alta, como você ajudaria a resolver.",
      criterio: "Propôs ouvir os dois lados e sugeriu uma solução justa para ambos.",
    },
  ],

  // ---------- ROTINAS ADMINISTRATIVAS (ciano, prancheta) ----------
  rotinas: [
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
      pergunta: "O Matheus vai mandar o mesmo aviso para 40 clientes. Onde ele deve pôr os endereços para que um cliente não veja o e-mail dos outros?",
      certa: "No campo CCO",
      erradas: ["No campo CC", "No campo Para"],
      explicacao: "Em CCO (com cópia oculta), cada pessoa recebe sem ver quem mais recebeu. Em Para e em CC, todos veem os endereços, e o e-mail de uma pessoa é um dado pessoal.",
    },
    {
      pergunta: "A Isadora vai anexar um orçamento ao e-mail para um cliente. Qual nome de arquivo ajuda mais quem vai receber?",
      certa: "Orçamento - Padaria Silva - março.pdf",
      erradas: ["arquivo novo da Isadora - cópia (2).pdf", "orçamento FINAL agora vai mesmo.pdf"],
      explicacao: "Um bom nome diz o que é o arquivo, para quem é e de quando, sem precisar abri-lo. Assim quem recebe encontra o documento depois, sem confusão.",
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
      pergunta: "Ao vender um produto, qual documento a empresa emite para registrar oficialmente a venda e os impostos?",
      certa: "Nota fiscal",
      erradas: ["Recibo", "Relatório de vendas"],
      explicacao: "A nota fiscal é o documento oficial que informa ao governo a venda e os impostos. Para quem compra, ela serve de prova em caso de troca ou garantia.",
    },
    {
      pergunta: "A gerente Patrícia pediu ao Lucas que enviasse a pauta da reunião de amanhã. O que ele deve mandar?",
      certa: "A lista dos assuntos que serão tratados",
      erradas: ["O resumo do que foi decidido na reunião", "A lista de quem confirmou presença"],
      explicacao: "A pauta lista, em ordem, os assuntos da reunião e é enviada antes, para todos chegarem preparados. O registro do que foi decidido é a ata.",
    },
    {
      pergunta: "A diretora Sônia pediu ao Gabriel que marcasse uma reunião com um fornecedor (quem vende para a empresa). O que ele faz antes de confirmar o horário?",
      certa: "Conferir na agenda se a diretora está livre",
      erradas: ["Aceitar o primeiro horário que o fornecedor quiser", "Marcar e só avisar a diretora no dia da reunião"],
      explicacao: "Antes de confirmar, é preciso olhar a agenda de quem vai participar, para não marcar dois compromissos no mesmo horário. Depois, registre a reunião na agenda.",
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
      pergunta: "No almoxarifado (depósito de materiais), o papel chegou ao estoque mínimo, a menor quantidade que deve ficar guardada. O que o Kenji deve fazer?",
      certa: "Pedir a compra de mais papel antes que ele acabe",
      erradas: ["Esperar o papel acabar para comprar tudo de uma vez", "Pedir uma quantidade enorme, para nunca mais faltar"],
      explicacao: "Chegar ao estoque mínimo é sinal de pedir mais já, pois a entrega leva alguns dias. Pedir demais também é ruim: ocupa espaço e deixa dinheiro parado.",
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
      desafio: "Dite em voz alta um e-mail curto pedindo a uma papelaria o preço de 100 canetas, com assunto, saudação, pedido e despedida.",
      criterio: "Falou assunto, saudação, pedido claro e despedida, sem gírias.",
    },
    {
      desafio: "Convide a turma para uma reunião imaginária da empresa, dizendo data, horário, local e assunto, de forma clara e educada.",
      criterio: "Informou data, horário, local e assunto da reunião.",
    },
    {
      desafio: "Você cuida do arquivo da empresa! Diga cinco cidades brasileiras em ordem alfabética, como se fossem etiquetas de pastas.",
      criterio: "Disse cinco cidades brasileiras diferentes, na ordem alfabética correta.",
    },
    {
      desafio: "Faça a mímica de arrumar uma mesa bagunçada e narre três sensos do 5S: separar o que não serve, pôr cada coisa no lugar e limpar.",
      criterio: "Fez os gestos e narrou os três passos: separar, organizar e limpar.",
    },
  ],

  // ---------- GESTÃO DO TEMPO (vermelho, !) ----------
  tempo: [
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
      pergunta: "O Ícaro estuda com o celular ao lado e se distrai a cada notificação. O que mais ajuda a manter o foco?",
      certa: "Silenciar o celular e guardá-lo longe",
      erradas: ["Responder tudo na hora, para não acumular", "Deixar o celular só vibrando, ao lado do caderno"],
      explicacao: "Cada notificação puxa a atenção para fora da tarefa, e voltar a focar leva tempo. Com o celular longe e em silêncio, fica mais fácil não pegar nele toda hora.",
    },
    {
      pergunta: "Na terça, o Gustavo percebeu que não vai conseguir terminar a tarefa que precisa entregar na sexta. O que ele deve fazer?",
      certa: "Avisar logo quem pediu e propor nova data",
      erradas: ["Virar a noite de quinta para tentar terminar", "Esperar a sexta e explicar só se cobrarem"],
      explicacao: "Avisar cedo dá tempo para mudar a data, dividir o trabalho ou pedir ajuda. Quem avisa só no dia do prazo deixa todo mundo sem saída.",
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

  // ---------- EDUCAÇÃO FINANCEIRA (verde, maleta) ----------
  financas: [
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
      desafio: "Invente um pequeno negócio e diga quanto custa fazer um produto, por quanto vai vender e qual é o lucro.",
      criterio: "Disse custo, preço de venda e lucro, e a conta (preço menos custo) está certa.",
    },
    {
      desafio: "Imagine que você tem R$ 100 para passar o mês. Diga em voz alta como vai dividir: quanto vai para cada gasto e quanto vai guardar.",
      criterio: "Citou pelo menos dois gastos e uma parte guardada, e a soma deu exatamente R$ 100.",
    },
    {
      desafio: "Faça um “comercial” de até 30 segundos convencendo a turma a ter uma reserva de emergência.",
      criterio: "Explicou o que é reserva de emergência e deu um exemplo de quando usá-la.",
    },
  ],
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
