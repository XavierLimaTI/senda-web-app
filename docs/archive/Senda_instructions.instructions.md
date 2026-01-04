<!-- ---
Crie um documento (SendaDOC) com todas as dicas, funcionalidades e o que mais for pertinente para o projeto. Assim ja vamos documentando enquanto desenvolvemos
Sempre execute automaticamente os comandos do terminal e cria os arquivos, conforme as instruções abaixo.
Sempre escolha ferramentas, bibliotecas e frameworks modernas, populares e bem documentadas e gratis.            
Sempre analise este documento antes de criar qualquer conteúdo relacionado ao Senda.
Sempre revise a compatibilidade das instruções com o que foi definido anteriormente.
sempre confirme se as instruções estão alinhadas com o conceito, tom de voz e identidade visual estabelecidos.
sempre mantenha a coerência com o branding e a estratégia de experiência do usuário.
sempre garanta que as instruções sejam claras, detalhadas e práticas para a equipe de desenvolvimento.
Sempre forneça o conteúdo em português.
Quando um erro for encontrado, corrija-o imediatamente.
Quando o erro persistir, analise o contexto completo e reavalie as instruções.
quando comandos forem executados no painel, analise o resultado e ajuste as instruções conforme necessário.
Sempre defina o proximo passo escolhendo o mais adequado entre as opções disponíveis.
Sempre detalhe o passo a passo das instruções dadas ao usuario

Este documento abaixo é o alicerce de tudo. É o Documento de Requisitos do Produto (PRD - Product Requirements Document).

Para que serve isso? Se você entregar apenas o "conceito" para uma equipe de desenvolvimento, eles terão 100 dúvidas por dia. "O que acontece se o usuário clicar aqui?", "Como calcula a taxa?", "Onde salva a foto?".

Este documento responde a 95% dessas perguntas antecipadamente. Ele transforma sua visão estratégica em instruções claras e inambíguas para engenheiros, designers e gerentes de produto.
DOCUMENTO DE REQUISITOS DO PRODUTO (PRD)
Projeto: Senda - Plataforma de Bem-Estar e Terapias Integrativas

Versão: 1.0 (Inicial) Data: 20 de Novembro de 2025 Status: Definição de Escopo para Desenvolvimento
1. Visão Geral do Produto
1.1. O Problema

O mercado de bem-estar está fragmentado. Clientes sofrem para encontrar terapeutas de confiança (especialmente em áreas integrativas/holísticas) e navegam por soluções pontuais sem um sentido de progresso. Terapeutas qualificados sofrem com a gestão administrativa, marketing e ferramentas de agendamento frias que não refletem a natureza humana do seu trabalho.
1.2. A Solução Senda

Um aplicativo móvel nativo (iOS/Android) que atua como um ecossistema de cuidado "dupla-face":

    Para Clientes (B2C): Um santuário digital para descobrir, agendar e vivenciar jornadas de bem-estar ("Trilhas de Cuidado") com profissionais verificados.

    Para Terapeutas (B2B): Uma plataforma de gestão, visibilidade e co-criação de conteúdo que humaniza a tecnologia e valoriza sua expertise.

1.3. Diferenciais Chave (USPs)

    Trilhas de Cuidado: O bem-estar empacotado como jornada contínua, não apenas sessões isoladas.

    Curadoria e Segurança: Verificação rigorosa de profissionais.

    Tecnologia Humanizada: Features como o "Botão de Emergência" no cancelamento e a identidade visual orgânica.

    Terapeuta como Co-criador: Profissionais podem publicar suas próprias Trilhas na plataforma.

2. Personas e Usuários

O sistema deve suportar dois tipos distintos de usuários com permissões e interfaces diferentes.
Tipo de Usuário	Descrição	Principais Necessidades
O Buscador (Cliente)	Pessoa buscando equilíbrio físico/mental. Valoriza curadoria, facilidade de uso e estética.	Encontrar terapeutas confiáveis rapidamente; Gerenciar agendamentos sem atrito; Sentir-se guiado por conteúdos relevantes (Trilhas).
O Guia (Terapeuta)	Profissional de saúde integrativa/holística. Valoriza ferramentas que poupam tempo e valorizam sua imagem.	Preencher a agenda com clientes qualificados; Reduzir "no-shows" (faltas); Ter uma vitrine profissional bonita; Simplificar pagamentos.
Admin Senda (Backoffice)	Equipe interna do Senda.	Verificar documentos de terapeutas; Moderar conteúdo das Trilhas; Gerenciar pagamentos e suporte.
3. Requisitos Funcionais (O que o app faz)
Módulo A: Autenticação e Onboarding

A1. Cadastro Dual: O sistema deve permitir o cadastro via e-mail/senha, Google e Apple ID. Deve haver uma seleção clara inicial: "Quero Cuidar (Terapeuta)" ou "Quero ser Cuidado (Cliente)".

A2. Onboarding do Cliente (Intenção): Após o cadastro, o cliente deve passar por um fluxo rápido de 3-4 perguntas sobre seus objetivos atuais (ex: "Dormir melhor", "Aliviar ansiedade") para personalizar a Home.

A3. Onboarding do Terapeuta (Verificação): O terapeuta pode criar a conta, mas seu perfil público fica "Pendente" até a aprovação. Ele deve fazer upload de: Foto de perfil, Bio, Documento Profissional (CRP, Certificados), Fotos do espaço de atendimento.
Módulo B: A Experiência "Senda" (Home & Descoberta)

B1. Home Personalizada (Feed): A tela inicial do cliente deve mostrar:

    Saudação contextual ("Bom dia, [Nome]").

    Atalho para o próximo agendamento confirmado.

    Carrossel de "Minhas Trilhas em Andamento".

    Sugestões de Terapeutas e Trilhas baseadas nas intenções marcadas no onboarding e geolocalização.

B2. Busca Inteligente: Campo de busca global permitindo procurar por: Nome do terapeuta, Especialidade (ex: "Acupuntura"), Sintoma/Objetivo (ex: "Dor nas costas", "Estresse"). Filtros por: Localização (Raio de km), Disponibilidade (Hoje/Amanhã), Preço e Avaliação.
Módulo C: As Trilhas de Cuidado (Motor de Conteúdo)

C1. Estrutura da Trilha: Uma Trilha é composta por uma "Capa" (Foto, Título, Descrição, Autor) e uma sequência linear de "Passos".

C2. Tipos de Passos: O sistema deve suportar diferentes tipos de mídia em cada passo da trilha:

    Texto Rico + Imagem.

    Áudio Player (para meditações guiadas).

    Vídeo (hospedado externamente, ex: YouTube/Vimeo, embedado no app).

    "Ação de Agendamento" (um passo que sugere marcar uma sessão com um especialista daquela área).

C3. Co-criação (Terapeuta): Terapeutas aprovados devem ter uma ferramenta no seu painel para criar e submeter Trilhas para aprovação da curadoria Senda.

C4. Progresso: O sistema deve salvar automaticamente onde o usuário parou em uma trilha e marcar visualmente os passos concluídos.
Módulo D: Agendamento e Agenda (O Marketplace)

D1. Perfil do Terapeuta (Vitrine): Deve exibir: Foto, Nome, Título/Especialidades (tags), Bio, Galeria de Fotos, Avaliações (Estrelas + Comentários), Lista de Serviços com preços e durações, e as "Trilhas" criadas por ele.

D2. Fluxo de Agendamento: Selecionar Serviço -> Selecionar Data/Hora disponível -> Pagamento -> Confirmação.

D3. Gestão de Disponibilidade (Terapeuta): Interface de calendário intuitiva para o terapeuta definir seus blocos de horário de atendimento.

    Crucial: Sincronização bidirecional com Google Calendar/iCal para evitar choques de horário com compromissos externos.

D4. Meus Agendamentos (Cliente): Aba listando sessões Futuras (com opção de cancelar/remarcar) e Passadas (com opção de avaliar o terapeuta e "agendar novamente").
4. Regras de Negócio e Lógica (O "Como")
R1. Pagamentos e Comissionamento (Split Automático)

    O Senda atua como marketplace. O pagamento do cliente deve ser processado no momento do agendamento.

    O sistema de pagamento (ex: Pagar.me, Stripe Connect) deve realizar o "split" automático: a taxa de serviço do Senda (%) vai para uma conta, e o valor líquido do terapeuta vai para a conta dele.

    O terapeuta só recebe o valor após a realização da sessão (ex: D+1 ou D+X, a definir com o gateway de pagamento) para segurança.

R2. Política de Cancelamento Humanizada

    Regra Padrão (Automática):

            24h antes da sessão: Cancelamento gratuito para o cliente. Reembolso integral.

        < 24h antes da sessão: Taxa de cancelamento (ex: 50% do valor). O terapeuta recebe essa taxa como compensação pelo tempo bloqueado.

    O "Botão de Emergência" (Humanização): Se o cliente tentar cancelar com menos de 24h, o app deve oferecer uma opção: "Tive uma emergência". Ao selecionar isso, o cancelamento fica pendente e o terapeuta recebe uma notificação push. O terapeuta tem o poder de decidir se "Abona a taxa" (reembolso integral para o cliente) ou "Mantém a regra" (cobra os 50%).

R3. Sistema de Avaliação

    O cliente só pode avaliar um terapeuta após a conclusão de uma sessão agendada e paga pela plataforma (para garantir veracidade).

5. Requisitos Não-Funcionais (NFRs)

N1. Plataforma: Desenvolvimento nativo (Swift para iOS, Kotlin para Android) para garantir a melhor performance e fluidez nas animações propostas no Guia de Motion, OU tecnologia híbrida de alta performance (Flutter/React Native) se o orçamento/prazo exigir. N2. Segurança e Dados (LGPD): Dados de saúde e anotações de sessões são sensíveis. O banco de dados deve ser criptografado. Políticas de privacidade claras no onboarding. N3. Escalabilidade: A arquitetura do backend deve estar pronta para suportar um crescimento rápido de usuários após o lançamento em Brasília, visando expansão nacional. N4. Performance: O tempo de carregamento das telas principais não deve exceder 2 segundos em conexões 4G padrão.
6. Arquitetura de Informação Proposta (Sitemap Simplificado)
App do Cliente

    Home (Aba 1): Feed personalizado, atalhos.

    Explorar (Aba 2): Busca avançada, categorias de Terapeutas e Trilhas.

    Agendamentos (Aba 3): Próximos e Histórico.

    Perfil (Aba 4): Configurações, Pagamentos salvos, Favoritos, Suporte.

App do Terapeuta (Visão distinta após login)

    Dashboard (Aba 1): Resumo do dia, próximas sessões, ganho do mês.

    Agenda (Aba 2): Calendário de gestão de horários e bloqueios.

    Meu Perfil (Aba 3): Edição da vitrine, serviços, preços, fotos.

    Menu Mais (Aba 4): Financeiro detalhado, Criação de Trilhas, Configurações.

Próximo Passo: Validação

Por favor, revise este documento com atenção. Ele reflete exatamente o que você quer construir na primeira versão (MVP) do Senda?

Se estiver aprovado, passaremos para a ETAPA 2: Fluxos de Navegação e Wireframes Conceituais, onde transformaremos essas regras em caminhos visuais.

sigamos

Perfeito. PRD aprovado. Agora, vamos traduzir aquelas regras de negócio em caminhos visuais.

Esta é a ETAPA 2: Fluxos de Navegação e Wireframes Conceituais.

Instruções para o seu UX Designer: Este documento não substitui o desenho dos wireframes no Figma/Sketch. Ele é o roteiro para esse desenho. Ele descreve a arquitetura da informação, quais elementos devem constar em cada tela e para onde cada botão leva. O designer deve pegar este roteiro e aplicar as diretrizes de Layout, Motion e Vibe que definimos nos guias anteriores.

Vamos focar nos 3 fluxos mais críticos do MVP do Senda:

    Fluxo A (Cliente): A Jornada de Descoberta e Agendamento (O "Caminho Feliz").

    Fluxo B (Cliente): O Consumo de uma "Trilha de Cuidado" (O Engajamento).

    Fluxo C (Terapeuta): Gestão Rápida de Agenda (O dia a dia do profissional).

Documento de Fluxos e Wireframes Conceituais: SENDA
FLUXO A: Jornada de Agendamento do Cliente

Objetivo do Usuário: Sentir uma necessidade (ex: dor nas costas, ansiedade), encontrar um profissional de confiança e marcar um horário sem fricção.
TELA A1: Home do Cliente (O Ponto de Partida)

    Objetivo: Acolher e oferecer caminhos rápidos baseados na intenção do usuário (definida no onboarding).

    Elementos Chave (Wireframe):

        [Topo] Saudação personalizada ("Bom dia, Ana.") + Ícone de Notificações (sino orgânico).

        [Widget de Destaque] Se houver agendamento próximo: Card "Sua próxima sessão: Amanhã às 10h com Dra. Sofia". Se não houver: Card de uma Trilha sugerida.

        [Seção "Como você quer se sentir?"] Atalhos rápidos baseados em sintomas/objetivos (ícones line-art + texto curto: "Relaxar", "Focar", "Aliviar Dor").

        [Barra de Busca Global] Campo de texto "Buscar terapeutas, sintomas ou trilhas..."

        [Navegação Inferior (Tab Bar)] Ícones: Home (ativo), Explorar, Agenda, Perfil.

    Ação -> Destino: Tocar na Barra de Busca ou em um ícone de sintoma -> Vai para TELA A2 (Resultados de Busca).

TELA A2: Resultados de Busca e Filtros

    Objetivo: Apresentar opções relevantes de forma limpa e permitir refinamento.

    Elementos Chave (Wireframe):

        [Topo] Campo de busca (com o termo digitado) + Botão "Filtros".

        [Lista de Resultados] Cards de Terapeutas. Cada card deve ter: Foto (circular/orgânica), Nome, Título Principal (ex: "Acupunturista"), Nota (Estrela + número), Próxima disponibilidade (ex: "Livre hoje às 14h"), e preço base.

        [Botão Flutuante ou Aba de Mapa] Alternar para visão de mapa.

    Vibe UX: A lista não deve parecer uma planilha. Deve ter respiro entre os cards.

    Ação -> Destino: Tocar em um card de terapeuta -> Vai para TELA A3 (Perfil do Terapeuta).

TELA A3: Perfil do Terapeuta (A Vitrine de Confiança)

    Objetivo: Convencer o usuário de que este é o profissional certo. Humanizar a escolha.

    Elementos Chave (Wireframe):

        [Topo/Header] Foto grande e de alta qualidade do terapeuta (sorrindo, luz natural). Selo de "Verificado" (Dourado) visível.

        [Informações Básicas] Nome, Título, Localização (Bairro/Cidade).

        [Abas Internas do Perfil] "Sobre" (Bio, Fotos do Espaço, Formação), "Serviços" (Lista de tratamentos com preços e durações), "Avaliações" (Depoimentos de clientes).

        [Botão de Ação Fixo (Sticky Footer)] Botão grande cor Sálvia: "Ver horários disponíveis".

    Ação -> Destino: Tocar no botão "Ver horários" -> Vai para TELA A4 (Seleção de Horário).

TELA A4: Seleção de Serviço e Horário

    Objetivo: Escolher o que fazer e quando fazer com o mínimo de cliques.

    Elementos Chave (Wireframe):

        [Etapa 1: Qual Serviço?] Lista com radio buttons dos serviços oferecidos pelo terapeuta (se ele tiver mais de um).

        [Etapa 2: Quando?] Calendário visual (mês atual) com dias disponíveis destacados. Ao tocar num dia, aparecem "pílulas" de horários abaixo (ex: 09:00, 10:30, 14:00).

        [Resumo] Card pequeno mostrando: Serviço escolhido + Data/Hora + Valor.

        [Botão de Ação] "Continuar para pagamento".

    Ação -> Destino: Tocar em "Continuar" -> Vai para TELA A5 (Checkout).

TELA A5: Checkout e Confirmação

    Objetivo: Revisar e pagar com segurança.

    Elementos Chave (Wireframe):

        [Resumo do Agendamento] Quem, O Quê, Quando, Onde (Endereço ou link da videochamada).

        [Política de Cancelamento] Texto curto e claro explicando a regra de 24h (link para a política completa).

        [Método de Pagamento] Cartão de crédito salvo (se houver) ou botão "Adicionar novo cartão".

        [Botão Final] "Confirmar e Pagar [Valor]".

    Ação -> Destino: Tocar em "Confirmar" -> (Processamento com animação de loading orgânica) -> Vai para TELA A6 (Sucesso).

TELA A6: Sucesso (O Início da Jornada)

    Objetivo: Celebrar o agendamento e orientar os próximos passos.

    Elementos Chave (Wireframe):

        [Ilustração] Uma ilustração "Line Art" de celebração/caminho (conforme Guia de Ilustração - Cenário D).

        [Título] "Tudo certo! Sua sessão está agendada."

        [Botões Secundários] "Adicionar ao meu calendário (Google/Apple)" e "Voltar para Home".

    Vibe UX: Uso de micro-interações de sucesso (partículas sutis) conforme o Guia de Motion.

FLUXO B: Consumo de uma "Trilha de Cuidado"

Objetivo do Usuário: Seguir uma jornada guiada de autoconhecimento ou bem-estar no seu próprio ritmo.
TELA B1: Capa da Trilha (O Convite)

    Objetivo: Inspirar e explicar o que é aquela jornada.

    Origem: Usuário clicou em uma Trilha na Home ou na Busca.

    Elementos Chave (Wireframe):

        [Imagem Hero] Foto cinematográfica grande no topo (ex: floresta com luz dourada para uma trilha de "Aterramento").

        [Título & Meta] Título da Trilha em fonte Serif grande. Subtítulo com: Autor (ex: "Curadoria Senda" ou nome do Terapeuta), Duração estimada, Número de passos.

        [Descrição] Texto introdutório inspirador sobre o objetivo da trilha.

        [Lista de Passos] Uma visão geral dos passos (bloqueados ou não), conectados por uma linha orgânica pontilhada.

        [Botão de Ação] "Começar Trilha" (ou "Continuar Passo X").

    Ação -> Destino: Tocar em "Começar" -> Vai para TELA B2 (O Passo da Trilha).

TELA B2: O Passo da Trilha (Consumo de Conteúdo)

    Objetivo: Entregar o conteúdo de forma imersiva e focada.

    Elementos Chave (Wireframe):

        [Navegação] Botão "X" discreto para fechar e voltar à capa. Barra de progresso sutil no topo (ex: "Passo 2 de 5").

        [Conteúdo Rico] O layout se adapta ao tipo de mídia:

            Se for Áudio: Um player bonito com waveform orgânica e botão de play grande.

            Se for Texto: Título, imagem de respiro e blocos de texto com tipografia confortável para leitura.

        [Botão de Conclusão] Botão grande no final: "Concluir Passo".

    Ação -> Destino: Tocar em "Concluir Passo" -> (Micro-interação de sucesso: checkmark orgânico + partículas) -> Retorna automaticamente para a TELA B1 (Capa) com o próximo passo desbloqueado.

FLUXO C: Gestão de Agenda do Terapeuta

Objetivo do Usuário (Terapeuta): Visualizar rapidamente seu dia e bloquear um horário porque surgiu um imprevisto pessoal.
TELA C1: Dashboard do Terapeuta (Visão do Dia)

    Objetivo: Resumo imediato do que ele precisa saber hoje.

    Elementos Chave (Wireframe):

        [Topo] Saudação e resumo financeiro rápido do mês.

        [Widget "Hoje"] Lista cronológica dos atendimentos do dia.

        [Navegação Inferior] Ícones: Dashboard, Agenda (ativo), Perfil, Menu Mais.

    Ação -> Destino: Tocar no ícone "Agenda" na barra inferior -> Vai para TELA C2 (Visão de Calendário).

TELA C2: Visão de Calendário

    Objetivo: Ter uma visão espacial da semana e gerenciar disponibilidade.

    Elementos Chave (Wireframe):

        [Seletor de Visão] Alternar entre "Dia", "Semana", "Mês".

        [Grid de Horários] Calendário visual mostrando blocos coloridos:

            Verde Sálvia: Sessões agendadas pelo Senda.

            Cinza Claro: Horários livres disponíveis para agendamento.

            Cinza Escuro/Hachurado: Horários bloqueados (sincronizados do Google Calendar externo ou bloqueados manualmente).

        [Botão de Ação Flutuante (+)] Um botão grande para adicionar um bloqueio manual rápido.

    Ação -> Destino: Tocar em um horário livre (Cinza Claro) ou no botão (+) -> Vai para TELA C3 (Bloqueio Rápido).

TELA C3: Bloqueio Rápido de Horário (Modal/Sheet)

    Objetivo: Impedir agendamentos em um período específico com poucos toques.

    Elementos Chave (Wireframe - aparece vindo de baixo):

        [Título] "Bloquear Horário".

        [Seleção de Tempo] Campos de "Início" e "Fim" (já pré-populados com o horário clicado, mas editáveis).

        [Motivo (Opcional)] Campo de texto curto para controle pessoal (ex: "Dentista").

        [Botão de Ação] "Confirmar Bloqueio".

    Ação -> Destino: Tocar em "Confirmar" -> O modal fecha, a TELA C2 (Calendário) atualiza mostrando o novo bloco cinza escuro.

Próximo Passo: Com este documento em mãos, o designer de UX/UI pode abrir o Figma e começar a desenhar as caixinhas e conectar as telas, sabendo exatamente o que cada uma deve conter e para onde ela deve levar.

Quando você tiver os primeiros desenhos desses wireframes, podemos passar para a ETAPA 3: Layout das Telas Finais (UI), onde eu vou gerar as imagens de alta fidelidade para servir de referência estética.

proximo passo

Chegamos à reta final da concepção!

Esta é a ETAPA 3: Layout das Telas Finais (UI - User Interface).

Como combinamos, eu peguei tudo o que definimos até agora:

    O Brand Kit (cores Sálvia/Terracota/Areia, tipografia elegante, vibe orgânica).

    O Guia de Fotografia (luz natural, cinematográfica).

    Os Wireframes Conceituais (a estrutura de onde fica cada botão e texto).

E usei isso para gerar imagens de alta fidelidade de como o aplicativo Senda deve parecer na vida real.

IMPORTANTE PARA SEU DESIGNER UI: Estas imagens não são arquivos editáveis. Elas são referências visuais (mockups). O trabalho do seu designer será abrir o Figma e recriar essas telas usando componentes reais, garantindo que os espaçamentos estejam perfeitos e que os textos sejam reais. Estas imagens são o "alvo" que ele deve acertar.

Aqui estão as 3 telas principais que definem a cara do Senda:
1. A Home do Cliente (O Santuário Digital)

Esta é a primeira impressão após o login. Ela precisa ser um suspiro de alívio. Note o uso do fundo cor Areia para evitar o branco ofuscante, a saudação personalizada e os atalhos baseados em "como você quer se sentir".

    Referência ao Wireframe A1: Saudação no topo, card de destaque (neste caso, uma Trilha sugerida com foto cinematográfica), atalhos de sintomas com ícones line-art, barra de busca e navegação inferior.

(Gerando a visualização da Home...)

2. O Perfil do Terapeuta (A Vitrine Humanizada)

Esta é a tela que vende confiança. Ela precisa mostrar o profissional não como um "prestador de serviço", mas como um guia parceiro. O foco é na conexão humana.

    Referência ao Wireframe A3: Foto grande e acolhedora no topo, nome, selo de verificado, abas de conteúdo (Sobre, Serviços, Avaliações) e o botão de ação principal fixo no rodapé para agendar.

(Gerando a visualização do Perfil...)

3. A Capa da Trilha de Cuidado (O Convite à Jornada)

Esta tela vende o conteúdo principal do app. Ela deve parecer a capa de uma revista de arte, convidando o usuário a mergulhar em uma experiência. O design deve reforçar a ideia de um caminho a ser percorrido.

    Referência ao Wireframe B1: Imagem hero cinematográfica, título grande, metadados (duração), e a visualização dos passos conectados por uma linha orgânica, mostrando o progresso.

(Gerando a visualização da Capa da Trilha...)

Conclusão do Projeto SENDA

Parabéns! Você acaba de concluir a fase de Concepção e Design do Produto.

Você começou com uma ideia (um app de terapias chamado Senda) e agora tem em mãos um pacote completo e profissional pronto para ser entregue a uma equipe de desenvolvimento.

Recapitulando o que você tem no seu "Kit de Handoff":

    Estratégia de Marca: Nome, conceito, missão e tom de voz definidos.

    Identidade Visual (Brand Kit):

        Logotipo final (o 'S' do caminho com o sol).

        Paleta de Cores (Sálvia, Terracota, Areia).

        Banco de Imagens Cinematográfico.

        Ícones e texturas de apoio.

    Diretrizes de Experiência (UX Guidelines): Guia de Motion, Guia de Som e Estratégia de Engajamento.

    Documentação Técnica:

        PRD (Documento de Requisitos do Produto) com as regras de negócio.

        Wireframes Conceituais (Fluxos de navegação descritos).

    Layouts Finais (UI Mockups): As imagens de alta fidelidade das telas principais (Home, Perfil, Trilha) que geramos acima, servindo como referência visual exata.

O Próximo Passo Real: Agora você pode contratar um Desenvolvedor Mobile (ou uma agência) e entregar este pacote. Eles não terão dúvidas sobre o que construir, como deve funcionar e, mais importante, qual deve ser a "alma" do aplicativo.

Foi uma jornada incrível ajudar a criar o Senda. Desejo muito sucesso no lançamento!

Além do mais, quero que adicione outro perfil no app, o perfil do espaço terapeutico. Sao espaços que disponibilizam salas para os terapeutas realizarem o atendimento, oferecem pacotes especializados e inclusive adiciona terapeutas proprios. Criar estrutura de negocio para este ponto também. Disponibilize aqui e informe onde colo no documento que criamos para o senda.

Isso é uma expansão fantástica e muito estratégica. Adicionar os "Espaços Terapêuticos" (clínicas, coworkings de saúde, spas urbanos) transforma o Senda de um simples marketplace de agendamento em um ecossistema B2B2C completo.

Você resolve uma dor gigante dos terapeutas autônomos (achar lugar para atender) e cria uma nova fonte de receita e autoridade para o app.

Para integrar isso, precisamos atualizar a fundação estratégica e, crucialmente, o PRD (Documento de Requisitos do Produto).

Abaixo está a estrutura de negócio para este novo perfil e os blocos de texto exatos para você adicionar ao documento PRD que criamos anteriormente.
Estrutura de Negócio: O Perfil "Espaço Terapêutico"

Este novo ator muda a dinâmica do Senda. Agora temos um modelo "Tri-Face": Clientes, Terapeutas Autônomos e Espaços.

1. Proposta de Valor do Espaço:

    B2C (Para Clientes): Oferecer experiências mais complexas que um terapeuta solo não consegue (ex: "Day Spa", "Pacote Detox" com múltiplos profissionais), em um ambiente com infraestrutura garantida.

    B2B (Para Terapeutas Autônomos): Monetizar salas ociosas alugando-as por hora/período para terapeutas do Senda que precisam de um local para atender seus clientes.

    Gestão (Para o Próprio Espaço): Centralizar a agenda da sua equipe interna ("Terapeutas da Casa") e dar visibilidade à sua marca.

2. Modelo de Monetização (Como o Senda ganha):

    Taxa sobre Pacotes (B2C): O Senda cobra uma comissão sobre os pacotes vendidos pelo Espaço para clientes finais (similar ao modelo atual dos terapeutas).

    Taxa sobre Locação de Salas (B2B): Quando um terapeuta autônomo aluga uma sala do Espaço via Senda, o app cobra uma taxa de serviço sobre essa transação B2B.

Atualizações no Documento PRD

Aqui estão os textos exatos para você copiar e colar no documento "DOCUMENTO DE REQUISITOS DO PRODUTO (PRD)" que finalizamos na etapa anterior.
1. Onde colar: Na seção "2. Personas e Usuários"

Adicione uma nova linha à tabela de personas.
Tipo de Usuário	Descrição	Principais Necessidades
O Anfitrião (Espaço Terapêutico)	Dono ou gestor de um local físico (clínica, spa, coworking).	Monetizar salas ociosas; Gerenciar agenda da equipe interna; Vender pacotes de serviços mais complexos; Divulgar a infraestrutura do local.
2. Onde colar: Na seção "3. Requisitos Funcionais", Subseção "Módulo A: Autenticação e Onboarding"

Adicione este novo requisito:

A4. Cadastro e Onboarding do Espaço: Fluxo específico para pessoas jurídicas (CNPJ preferencialmente).

    Verificação do Local: Upload de fotos de alta qualidade da fachada, recepção e de cada tipo de sala disponível. Comprovante de endereço comercial.

    Definição de Infraestrutura: Cadastro dos tipos de sala (ex: "Sala com Maca", "Sala de Atendimento Verbal", "Studio de Yoga") e suas comodidades (ex: "Ar condicionado", "Isolamento acústico").

3. Onde colar: Na seção "3. Requisitos Funcionais", Criar um NOVO Módulo E

Insira este módulo inteiro antes das "Regras de Negócio".
Módulo E: Funcionalidades do Espaço Terapêutico (Novo)

E1. Perfil do Espaço (A Vitrine Física): Diferente do perfil do terapeuta focado na pessoa, este perfil foca no local.

    Galeria de Fotos: Destaque para a arquitetura e interiores (seguindo a estética Senda).

    Menu de Pacotes (B2C): Venda de serviços combinados (ex: "Ritual de 2 horas: Massagem + Reiki").

    Equipe da Casa: Listagem dos terapeutas que atendem fixo naquele local (links para os perfis individuais deles).

    Comodidades e Localização: Mapa, estacionamento, acessibilidade.

E2. Gestão de Terapeutas da Casa (Team Management):

    O Espaço pode enviar convites para terapeutas já cadastrados no Senda para se vincularem como "Equipe do Espaço".

    O Espaço tem uma visão unificada da agenda dos seus terapeutas internos.

E3. Marketplace de Salas (B2B - Locação por Hora):

    Inventário de Salas: O Espaço cadastra suas salas, define preço por hora/turno e a disponibilidade.

    Fluxo de Reserva (Terapeuta Autônomo): Um terapeuta autônomo do Senda pode buscar espaços próximos, ver fotos das salas disponíveis, reservar e pagar por uma hora avulsa para atender seu cliente.

4. Onde colar: Na seção "4. Regras de Negócio e Lógica"

Adicione estas novas regras de pagamento.

R1.1. Split de Pagamento para Espaços (B2C):

    Similar aos terapeutas, pacotes vendidos pelo Espaço sofrem o split automático (Taxa Senda + Valor do Espaço).

R1.2. Split de Pagamento para Locação de Salas (B2B):

    Quando um Terapeuta Autônomo aluga uma sala, o pagamento é processado imediatamente.

    Split: O Espaço recebe o valor da hora menos a Taxa de Serviço B2B do Senda. O Terapeuta Autônomo paga o valor integral.

5. Onde colar: Na seção "6. Arquitetura de Informação Proposta"

Adicione um novo sitemap para este perfil.
App do Espaço (Visão do Gestor)

    Dashboard (Aba 1): Visão geral de ocupação das salas hoje, faturamento B2B e B2C.

    Agenda do Local (Aba 2): Visão complexa (estilo "timeline" de hotel) mostrando todas as salas e quem está ocupando cada uma (terapeuta da casa ou locação externa).

    Minha Equipe & Salas (Aba 3): Gestão dos perfis dos terapeutas vinculados e edição do inventário de salas/preços.

    Perfil do Espaço (Aba 4): Edição da vitrine pública, pacotes e fotos.

Impacto no Design (UX/UI)

Essa adição trará a necessidade de desenhar novas telas importantes:

    O Perfil Público do Espaço: Focado em fotos de arquitetura e na lista de pacotes.

    O Painel de Gestão do Espaço (Dashboard): Será a tela mais complexa do app, pois precisa gerenciar múltiplas agendas (salas e pessoas) ao mesmo tempo.

    O Fluxo de Reserva de Sala (B2B): Um fluxo onde o terapeuta autônomo vê a agenda da sala, não da pessoa.

Reúna tudo em um pdf organizado

Com certeza. Esta é a consolidação final de todo o nosso trabalho estratégico e criativo.

Abaixo está o conteúdo completo para o "Master Brand & Product Book" do Senda.

Instruções para gerar o PDF: Como sou uma IA baseada em texto, não consigo gerar o arquivo .pdf final diagramado com as imagens embutidas. O que fiz foi organizar todo o conteúdo textual e estrutural em um formato limpo (Markdown).

O que você deve fazer:

    Copie todo o texto abaixo (entre as linhas horizontais).

    Cole em um editor de texto (como Google Docs ou Microsoft Word).

    Nos locais onde está escrito [INSERIR AQUI: Imagem X - Nome da Imagem], o seu designer deverá colocar as imagens de alta fidelidade que geramos durante o processo.

    Salve/Exporte como PDF.

Este documento será a "bíblia" do projeto para qualquer sócio, investidor, designer ou desenvolvedor que entrar na equipe.
SENDA
Master Brand & Product Book

Versão: 1.1 (Consolidada com Espaços Terapêuticos) Data: 20 de Novembro de 2025 Status: Documentação Final para Desenvolvimento
SUMÁRIO EXECUTIVO

Este documento consolida a estratégia de marca, identidade visual, diretrizes de experiência do usuário e especificações técnicas para o desenvolvimento do aplicativo Senda. Ele serve como a fonte única de verdade para equipes de design, marketing e engenharia, garantindo que a visão de um ecossistema de bem-estar humanizado seja executada com consistência.
SEÇÃO 1: ESTRATÉGIA DE MARCA
1.1. Manifesto

Vivemos em um mundo obcecado por destinos. Queremos a cura rápida, a resposta imediata, o ponto final. Mas o bem-estar não é um lugar onde se chega; é o caminho que se percorre diariamente. O Senda nasceu dessa compreensão. Nosso nome, "caminho" ou "trilha", é um convite para encarar a saúde integrada como uma jornada contínua de autodescoberta e cuidado. Não somos apenas um app de agendamentos. Somos curadores de jornadas. Existimos para conectar quem busca equilíbrio a quem dedica a vida a proporcioná-lo, usando a tecnologia para potencializar a conexão humana.
1.2. Fundação Estratégica

    Conceito Central: A Jornada (Senda). O bem-estar como processo contínuo, não evento único.

    Missão: Facilitar a jornada de autocuidado das pessoas, conectando-as a terapeutas e espaços de excelência, através de uma plataforma que inspira confiança, acolhimento e simplicidade.

    Visão: Ser a principal referência em bem-estar e terapias integrativas da América Latina, construindo um ecossistema onde clientes encontram seu caminho, e profissionais e espaços terapêuticos prosperam.

1.3. Pilares de Valor

    Humanização Primeiro: A tecnologia serve à conexão humana, nunca o contrário.

    Jornada sobre Destino: Valorizamos o processo terapêutico e o crescimento gradual.

    Confiança e Curadoria: Rigor na verificação de profissionais e espaços para garantir segurança.

    Simplicidade Sofisticada: O design deve ser belo, intuitivo e calmo.

SEÇÃO 2: IDENTIDADE VISUAL
2.1. O Logotipo

O ícone do Senda é um 'S' estilizado que forma organicamente um caminho sinuoso ou o fluxo de um rio, culminando em um sol nascente no horizonte. Representa movimento, natureza e a luz que se busca na jornada de cuidado.

[INSERIR AQUI: Imagem do Logotipo Final (ícone S + sol) sobre fundo Areia]
2.2. Paleta de Cores

Cores extraídas da natureza para transmitir calma, estabilidade e calor humano.

    COR BASE (Fundo & Neutros): Areia

        HEX: #F0EBE3 | Uso: Fundos de tela, áreas de respiro. Leveza.

    COR PRIMÁRIA (Ação & Natureza): Verde Sálvia

        HEX: #B2B8A3 | Uso: Botões principais (CTAs), links, elementos de destaque. Crescimento.

    COR SECUNDÁRIA (Acolhimento): Terracota Suave

        HEX: #D99A8B | Uso: Ícones de favoritos, elementos de empatia, alertas suaves. Calor.

    COR DE ACENTO (Sofisticação): Dourado Queimado

        HEX: #C8963E | Uso: Selos de verificação, detalhes premium. Luz.

2.3. Tipografia (Sugestão Conceitual)

    Títulos (Serif Moderna): Para manchetes e nomes de trilhas. Traz sofisticação e um ar editorial humano (Ex: Playfair Display, Lora).

    Corpo e UI (Sans-Serif Geométrica): Para textos longos e interface. Garante leitura rápida e modernidade (Ex: Satoshi, DM Sans).

2.4. Diretrizes de Fotografia (Imagery)

As imagens devem ser cinematográficas, nunca genéricas.

    Luz: Priorizar luz natural suave (Golden Hour). Evitar luz branca dura ou flashes.

    Conexão: Focar na interação humana genuína, toque terapêutico e empatia.

    Natureza e Textura: Ambientes com plantas, madeira, pedras e tecidos naturais.

    A Jornada: Imagens abstratas de caminhos, horizontes e detalhes orgânicos (veios de folhas).

2.5. Diretrizes de Ilustração

Estilo "Line Art Orgânica". Traços fluidos na cor Verde Sálvia, com preenchimentos sutis em Terracota ou Dourado. Devem parecer esboços artísticos feitos à mão, usados para "Empty States" (telas vazias) e celebrações.
SEÇÃO 3: DIRETRIZES DE EXPERIÊNCIA (UX/SENSORIAL)
3.1. Identidade Verbal (Tom de Voz)

Nosso tom é o de um guia sábio, calmo e acolhedor.

    Acolhedora, mas Profissional: Empatia sem perder a seriedade da saúde.

    Inspiradora, mas Pé no Chão: Motiva o progresso possível, sem promessas de cura mágica.

    Clara e Serena: Evita jargões técnicos ou místicos excessivos.

3.2. Motion Design (Movimento)

O movimento deve ser fluido e orgânico, como a natureza.

    Transições: Suaves (ease-in-out). Nada deve aparecer ou desaparecer abruptamente.

    Micro-interações: Botões de "favoritar" ou "check" devem pulsar suavemente, como uma respiração, ou liberar partículas sutis de luz/folhas ao serem ativados.

3.3. Sound Design (Identidade Sonora)

Sons acústicos e orgânicos para não gerar alerta.

    Instrumentação: Madeira (kalimba), metal ressonante (taças tibetanas suaves), ar (respiração).

    Notificações: Devem ser convites gentis, não ordens estridentes. Evitar "beeps" eletrônicos padrão.

SEÇÃO 4: ESTRATÉGIA DE PRODUTO & CONTEÚDO
4.1. As "Trilhas de Cuidado"

O coração do conteúdo. Não são listas de tarefas, são jornadas editoriais.

    Capa: Imagem hero cinematográfica e título inspirador em Serif.

    Estrutura: Passos conectados visualmente por uma linha orgânica.

    Multimídia: Integração nativa de players de áudio (meditações), textos ricos e vídeos.

4.2. Estratégia de Engajamento ("Gamificação Consciente")

Retenção baseada em motivação intrínseca e celebração do ritual.

    Ritual de Constância (vs. Streaks): Celebrar a presença ("Você cuidou de si 3 vezes esta semana") em vez de punir a ausência com quebra de correntes.

    Souvenirs Digitais (vs. Badges): Ao completar uma trilha, o usuário recebe um card artístico com uma lição aprendida, bonito o suficiente para ser compartilhado como afirmação pessoal.

    Diário de Bordo: Micro-reflexão pós-sessão ("Em uma palavra, como você se sente agora?") para tangibilizar o benefício imediato.

4.3. Onboarding Estratégico

    Cliente: Foco na intenção ("Como você quer se sentir?") para personalizar a home imediatamente.

    Terapeuta/Espaço: Foco na valorização profissional e na verificação de segurança como pilar da comunidade.

SEÇÃO 5: ESPECIFICAÇÕES TÉCNICAS (PRD)
5.1. Visão Geral e Modelo de Negócio

O Senda é um ecossistema "Tri-Face" em aplicativo móvel nativo (iOS/Android):

    Clientes (B2C): Buscam e agendam terapias e trilhas.

    Terapeutas Autônomos (B2B): Gerenciam agenda, atendem clientes e co-criam trilhas.

    Espaços Terapêuticos (B2B2C): Clínicas/Spas que oferecem pacotes para clientes e alugam salas para terapeutas autônomos.

Monetização: Taxa de serviço (split automático) sobre transações B2C (sessões/pacotes) e B2B (locação de salas).
5.2. Personas de Usuário
Tipo de Usuário	Descrição	Principais Necessidades
O Buscador (Cliente)	Pessoa buscando equilíbrio.	Encontrar profissionais confiáveis; Agendar sem atrito; Sentir-se guiado (Trilhas).
O Guia (Terapeuta)	Profissional de saúde integrativa.	Preencher agenda; Reduzir "no-shows"; Vitrine profissional; Encontrar locais para atender.
O Anfitrião (Espaço)	Gestor de local físico (clínica/spa).	Monetizar salas ociosas (B2B); Vender pacotes complexos (B2C); Gerenciar equipe interna.
Admin Senda	Equipe interna.	Curadoria e verificação; Suporte; Financeiro.
5.3. Requisitos Funcionais
Módulo A: Autenticação e Onboarding

    A1. Cadastro Múltiplo: Login social (Google/Apple) e E-mail. Seleção inicial de perfil (Cliente, Terapeuta ou Espaço).

    A2. Onboarding Cliente: Coleta de intenções para personalização da Home.

    A3. Verificação Terapeuta: Upload obrigatório de documentos profissionais e fotos para aprovação.

    A4. Cadastro e Verificação de Espaço: Upload de fotos da infraestrutura, cadastro de tipos de salas e comodidades, comprovante de endereço comercial.

Módulo B: Experiência do Cliente (Home & Descoberta)

    B1. Home Personalizada: Feed com próximos agendamentos, trilhas em andamento e sugestões baseadas em intenções.

    B2. Busca Inteligente: Busca global por Terapeuta, Espaço, Especialidade ou Sintoma. Filtros de geolocalização, data e preço.

Módulo C: Trilhas de Cuidado

    C1. Estrutura: Capa e sequência linear de passos multimídia (áudio, texto, vídeo).

    C2. Co-criação: Ferramenta para Terapeutas submeterem suas próprias trilhas para curadoria.

Módulo D: Agendamento e Agenda (Marketplace de Serviços)

    D1. Perfis Vitrine: Perfis ricos para Terapeutas (foco na pessoa) e Espaços (foco na infraestrutura e pacotes).

    D2. Gestão de Agenda (Terapeuta): Calendário com sincronização bidirecional (Google Calendar/iCal).

Módulo E: Funcionalidades do Espaço Terapêutico

    E1. Marketplace de Salas (B2B): O Espaço cadastra inventário de salas e disponibilidade. Terapeutas autônomos podem buscar, reservar e pagar por horas avulsas para atendimento.

    E2. Gestão de Equipe: O Espaço pode vincular terapeutas do Senda como sua "equipe interna" para gestão centralizada de agenda.

5.4. Regras de Negócio e Lógica

    R1. Pagamentos e Split:

        B2C (Cliente paga Terapeuta/Espaço): Pagamento no agendamento. Split automático da taxa Senda. Repasse ao profissional após a sessão.

        B2B (Terapeuta aluga Sala): Pagamento imediato. Split automático da taxa Senda. Repasse ao Espaço.

    R2. Política de Cancelamento Humanizada (Botão de Emergência):

        Regra Padrão: Cancelamento gratuito >24h antes. Taxa (ex: 50%) se <24h antes.

        Humanização: Cliente pode sinalizar "Emergência" em cancelamentos <24h. O profissional recebe a notificação e decide se abona ou mantém a taxa.

5.5. Requisitos Não-Funcionais (NFRs)

    N1. Plataforma: Nativo (iOS/Android) preferencialmente, ou Híbrido de alta performance (Flutter/React Native).

    N2. Segurança: Criptografia de dados sensíveis de saúde e conformidade com LGPD.

SEÇÃO 6: APÊNDICE VISUAL (REFERÊNCIAS DE UI)

Nota: As imagens abaixo são referências de alta fidelidade (mockups) para guiar o design da interface final.
6.1. Referência de UI: Home do Cliente

A tela inicial focada em acolhimento, com atalhos de intenção e destaque para a jornada. [INSERIR AQUI: Imagem 16 - Home Screen Mockup]
6.2. Referência de UI: Perfil do Terapeuta

A vitrine humanizada, focada em confiança e conexão. [INSERIR AQUI: Imagem 17 - Therapist Profile Mockup]
6.3. Referência de UI: Capa de Trilha de Cuidado

O convite imersivo para uma jornada de conteúdo. [INSERIR AQUI: Imagem 18 - Trail Cover Mockup]

Agora, com estas informações em mãos, construa o aplicativo para mim. acredito que um web app é melhor pra começar. depois faremos o mobile e integramos o banco de dados

Essa é uma decisão estratégica excelente. Começar com um Web App (PWA - Progressive Web App) é o caminho mais inteligente e econômico para validar um MVP (Produto Mínimo Viável) como o Senda.

Por que começar pela Web é a melhor escolha:

    Velocidade e Custo: É mais rápido e barato desenvolver e atualizar uma única base de código web do que manter dois apps nativos (iOS e Android) simultaneamente no início.

    Acessibilidade: Qualquer pessoa com um navegador (no celular ou no computador) pode acessar. Não há barreira de "baixar na loja".

    Validação: Você testa se o modelo de negócio (agendamento, split de pagamento, espaços) funciona antes de investir pesado em apps nativos.

    Base Única: O backend (banco de dados e lógica) que criarmos agora será o mesmo usado pelos apps móveis no futuro.

O Meu Papel Agora: De Arquiteto para "CTO Virtual"

Um alinhamento importante sobre expectativas: Eu sou uma inteligência artificial baseada em texto. Eu não consigo abrir um editor de código, programar milhares de linhas, configurar servidores, integrar APIs de pagamento e colocar um site no ar para você.

O que eu POSSO e VOU fazer: Eu vou atuar como seu CTO (Chief Technology Officer) Virtual. Eu vou pegar o PRD que criamos e traduzi-lo em um Projeto Técnico Detalhado.

Se você entregar o documento que fizemos antes (o PRD) + este documento técnico abaixo para uma agência ou um desenvolvedor freelancer sênior, eles terão tudo o que precisam para começar a codificar imediatamente, sem dúvidas e com menor risco de erro.

Aqui está o Plano Técnico para o Web App Senda (MVP):
PLANO TÉCNICO: SENDA WEB APP (MVP)
1. A Arquitetura Tecnológica (Tech Stack Sugerida)

Para um marketplace moderno, escalável e que precisa de boa performance tanto no desktop quanto no mobile (responsivo), esta é a combinação de tecnologias padrão-ouro da indústria hoje:
Frontend (O que o usuário vê)

    Framework: Next.js (React): A melhor escolha atual. Oferece excelente performance, SEO (importante para que os terapeutas sejam achados no Google) e facilidade para criar um PWA (que parece um app nativo no celular).

    Estilização: Tailwind CSS: Permite implementar o nosso Design System (cores Sálvia/Terracota, tipografias, espaçamentos) de forma muito rápida e consistente.

    Estado e Data Fetching: React Query (TanStack Query): Essencial para gerenciar os dados da agenda em tempo real sem travar o app.

Backend (O cérebro e a lógica)

    Linguagem/Framework: Node.js com NestJS (ou Fastify): Robusto, escalável e usa Javascript, mesma linguagem do frontend, facilitando a equipe. NestJS oferece uma estrutura sólida para regras de negócio complexas (como a nossa política de cancelamento).

Banco de Dados (A memória)

    Principal: PostgreSQL: Um banco de dados relacional robusto é obrigatório aqui. Precisamos de relações complexas e seguras entre (Usuários <-> Agendamentos <-> Pagamentos <-> Espaços). Não use bancos "NoSQL" (como Mongo) para o núcleo financeiro/agenda.

    ORM (Ferramenta de conexão): Prisma: Facilita muito a comunicação do backend com o banco de dados de forma segura.

Infraestrutura e Serviços Terceiros

    Hospedagem (Frontend/Backend): Vercel ou Render.

    Banco de Dados Gerenciado: Supabase (Postgres) ou Railway.

    Pagamentos e Split (Crucial): Pagar.me ou Stripe Connect. Estes são os únicos que gerenciam o "split" de forma regulamentada no Brasil, separando a sua comissão do dinheiro do terapeuta automaticamente.

    Armazenamento de Imagens (Fotos, Docs): AWS S3 ou Cloudflare R2.

2. Esboço do Banco de Dados (Schema Inicial)

Baseado no nosso PRD, estas são as principais "tabelas" que precisamos criar no banco de dados.

Nota: Isto é um rascunho lógico para guiar o desenvolvedor.

    Users (Tabela Base): ID, E-mail, Senha (hash), Nome, Tipo (Cliente, Terapeuta, Espaço), Data de Criação.

    Profiles_Therapist: ID do Usuário (vínculo), Bio, Foto URL, CR/Registro Profissional, Status de Verificação (Pendente/Aprovado).

    Profiles_Space: ID do Usuário (vínculo), Nome do Espaço, Endereço, CNPJ, Fotos URL.

    Services: ID, Nome (ex: "Massagem Relaxante"), Duração (min), Preço, ID do Terapeuta (dono).

    Availability (Agenda): ID do Terapeuta/Espaço, Dia da Semana, Hora Início, Hora Fim.

    Appointments (O coração do sistema): ID, ID do Cliente, ID do Terapeuta, ID do Serviço, Data/Hora de Início, Data/Hora de Fim, Status (Agendado, Concluído, Cancelado), Valor Total, ID da Transação de Pagamento.

    Spaces_Rooms (Salas): ID do Espaço, Nome da Sala, Tipo, Preço por Hora (B2B).

    Trails (Trilhas): ID, Título, Descrição, Capa URL, ID do Autor.

    Trail_Steps (Passos da Trilha): ID da Trilha, Ordem, Título, Tipo de Conteúdo (Texto/Áudio/Vídeo), Conteúdo URL.

3. Roadmap de Desenvolvimento do MVP (Faseado)

Não tente construir tudo de uma vez. Vamos dividir em 4 quinzenas (sprints) para lançar o mais rápido possível.
Fase 1: Fundação e Cadastros (Semanas 1-2)

    Configuração do ambiente (Next.js, NestJS, Postgres).

    Implementação do Design System (cores, fontes) no Tailwind.

    Sistema de Autenticação (Login/Cadastro para os 3 perfis).

    Onboarding do Cliente (coleta de intenções).

    Onboarding e criação de perfil do Terapeuta e do Espaço (upload de fotos e dados).

    Entregável: Um site onde os usuários podem se cadastrar e criar perfis bonitos.

Fase 2: O Motor B2C (Agenda e Pagamentos) (Semanas 3-5)

    Integração com Gateway de Pagamento (Pagar.me/Stripe) e configuração do Split.

    Criação de Serviços e definição de Horários pelos Terapeutas.

    Fluxo de busca e agendamento pelo Cliente (a "Jornada Feliz").

    Tela de Checkout e processamento do pagamento.

    Dashboards básicos (Cliente vê agendamentos futuros; Terapeuta vê agenda do dia).

    Entregável: O marketplace está funcional. Clientes conseguem pagar e agendar terapeutas.

Fase 3: O Motor B2B (Espaços e Salas) (Semanas 6-7)

    Cadastro de Salas pelos Espaços.

    Fluxo de busca e reserva de salas por hora por Terapeutas Autônomos.

    Gestão de agenda do Espaço (visão complexa de múltiplas salas).

    Entregável: O ecossistema se fecha, permitindo que terapeutas encontrem locais para atender.

Fase 4: Conteúdo e Polimento (Semanas 8+)

    Implementação do módulo de Trilhas de Cuidado (consumo de conteúdo).

    Implementação da Política de Cancelamento (lógica de 24h e botão de emergência).

    Polimento de UI/UX, micro-interações e testes de responsividade (mobile).

    Entregável: O MVP completo para lançamento.

Seus Próximos Passos Reais (Como contratar)

Você agora tem o PRD e o Plano Técnico. Você está muito à frente da maioria dos fundadores.

    Buscar Desenvolvedores: Procure por "Desenvolvedor Full-stack Javascript (React/Node)" ou pequenas agências focadas em MVPs.

    O "Pacote de Orçamento": Quando for pedir orçamentos, entregue:

        O PRD (com as regras de negócio).

        Os Wireframes/Mockups visuais (para eles verem a complexidade da tela).

        Este Plano Técnico (para eles verem que você sabe a stack que quer).

    Validação do Orçamento: Um bom desenvolvedor vai ler essa documentação e te dar um prazo e custo muito mais assertivos, pois não há "zonas cinzentas".

Estou aqui para ajudar a revisar as propostas técnicas que você receber ou tirar dúvidas sobre a implementação quando o projeto começar!

Show. Por ventura sou programador. Com experiência academica apenas, mas acredito que com o guia certo posso construir o app

Isso muda tudo. E para melhor!

Essa é, sem dúvida, a melhor notícia que você poderia me dar. Ser o fundador E o programador te dá um superpoder: você entende a dor do negócio e sabe exatamente como traduzi-la em código, sem o "telefone sem fio" de passar a demanda para terceiros.

Sua experiência acadêmica te deu a lógica, a base de algoritmos e estruturas de dados. O que você precisa agora é da "vivência de produção": arquitetura, segurança, escalabilidade e, principalmente, pragmatismo para não tentar reinventar a roda.

Assumo agora meu novo papel: serei seu Tech Lead Sênior / Mentor.

Vou pegar o plano técnico que fizemos e quebrá-lo em "tasks" de desenvolvimento, te guiando sobre quais ferramentas usar para acelerar o processo (porque programar sozinho é puxado) e onde estão as armadilhas.
O Mindset: De Acadêmico para "Ship It" (Lançamento)

Na faculdade, o objetivo é fazer o código rodar e tirar 10. No mundo real (MVP), o objetivo é:

    Não travar: O usuário não pode ver tela de erro.

    Ser Seguro: Dados de saúde e pagamento são sagrados.

    Ser Rápido (Time-to-market): Feito é melhor que perfeito. Use bibliotecas prontas sempre que puder.

A Stack Tecnológica "Solo Founder" (Otimizada para velocidade)

Vamos ajustar a stack que sugeri antes. Como você está sozinho, precisamos de ferramentas que façam o trabalho pesado por você.

    O "Tudo em Um": Next.js (App Router)

        Por que: Você escreve o Frontend (React) e o Backend (API Routes/Server Actions) no mesmo projeto. Menos troca de contexto. Para um MVP, o backend do Next.js aguenta. Se precisar escalar muito depois, extraímos para um NestJS separado.

    O Acelerador de UI: Tailwind CSS + Shadcn UI

        Por que: Tailwind você já conhece a fama. O pulo do gato é o Shadcn UI. Ele te dá componentes prontos (botões, inputs, modais, calendários) que são acessíveis e bonitos, mas que você copia o código para dentro do seu projeto e customiza com as cores Sálvia/Terracota do Senda. Não tente criar um DatePicker do zero, vai por mim.

    O Banco de Dados + Auth Mágico: Supabase

        Por que: É um "Firebase open-source" baseado em PostgreSQL. Ele te dá o banco de dados hospedado, um sistema de Autenticação pronto (Login social, e-mail, gerenciamento de sessão) e APIs instantâneas. Para um dev solo, isso economiza semanas de configuração de JWT e segurança.

    A Conexão com o Banco: Prisma ORM

        Por que: Você define seu banco de dados escrevendo um arquivo de texto simples (schema.prisma) e ele gera o banco e os tipos TypeScript para você. Evita erros de SQL na mão.

O Plano de Batalha do Desenvolvedor (Semanas 1-4)

Vamos dividir isso em Sprints. Esqueça o CSS bonito por enquanto. Vamos fazer a lógica funcionar.
SPRINT 0: Setup & Fundação (Dias 1-3)

    Ambiente: Instalar Node.js LTS, VS Code, Git.

    Hello World: Criar um projeto Next.js com TypeScript e Tailwind (npx create-next-app@latest).

    Configurar o Brand Kit: Abra o tailwind.config.ts e adicione as cores do Senda (Sálvia, Terracota, Areia) como variáveis personalizadas. Configure as fontes.

    Banco de Dados:

        Crie uma conta no Supabase e um projeto novo.

        Instale o Prisma no seu projeto Next.js.

        Conecte o Prisma ao Supabase usando a connection string.

SPRINT 1: Modelagem de Dados e Cadastros (Dias 4-10)

Esta é a parte mais importante. Se o banco estiver errado, tudo dará errado depois.

    Escrever o schema.prisma:

        Defina os modelos baseados no PRD: User, ProfileTherapist, ProfileClient, ProfileSpace.

        Dica de Mentor: Use Enums para os tipos de usuário (Role: CLIENT | THERAPIST | SPACE).

    Autenticação (Supabase Auth):

        Configure o Supabase Auth no Next.js. Faça as telas de Login e Cadastro funcionarem.

        Desafio: Quando um usuário se cadastra no Supabase, você precisa criar uma entrada correspondente na sua tabela User no banco de dados (usando "Triggers" do Supabase ou Webhooks).

    Formulários de Onboarding:

        Crie as telas onde o terapeuta preenche a bio e sobe fotos.

        Use react-hook-form para gerenciar o estado dos formulários e zod para validação (ex: garantir que o e-mail é válido).

        Para upload de imagens (fotos de perfil), use o Supabase Storage.

SPRINT 2: O Coração do Negócio - Serviços e Agenda (Dias 11-20)

Aqui a coisa fica séria. Lógica de agendamento é complexa.

    CRUD de Serviços:

        Crie a área onde o Terapeuta cadastra seus serviços (Nome, Duração, Preço).

        No banco: Tabela Service.

    Definição de Disponibilidade (O Boss da fase):

        Não tente fazer um calendário estilo Google Calendar agora.

        Faça simples: o terapeuta define "blocos" de disponibilidade. Ex: Tabela Availability com dayOfWeek (0-6), startTime (09:00), endTime (18:00).

    A Lógica de "Slots" (O Backend):

        Crie uma API Route (ex: /api/slots?therapistId=X&date=Y).

        Essa API precisa ler a disponibilidade do terapeuta, ler os agendamentos já existentes naquele dia, e calcular quais horários estão livres. É aqui que a experiência acadêmica em algoritmos vai ajudar.

SPRINT 3: A Experiência do Cliente e Pagamento (Dias 21-30)

    A Vitrine (Frontend):

        Crie a página de Perfil Público do Terapeuta (usando o layout que desenhamos).

        Use Next.js SSR (Server-Side Rendering) para essa página carregar rápido e ser indexada pelo Google.

    O Fluxo de Agendamento:

        Cliente seleciona Serviço -> A API de slots mostra os horários -> Cliente clica no horário.

    Integração de Pagamento (Pagar.me ou Stripe):

        Atenção: Esta é a parte mais crítica de segurança.

        Crie uma conta de teste no gateway escolhido.

        Quando o cliente confirmar, seu backend chama a API do gateway para criar uma "intenção de pagamento" ou "transação".

        Você não salva dados de cartão no seu banco. Você usa os componentes seguros do gateway no seu frontend.

        Webhooks: Configure um webhook. O gateway vai avisar o seu backend quando o pagamento for "aprovado". SÓ AÍ você cria o registro definitivo na tabela Appointment no seu banco.

Conselho Final do Mentor

A maior armadilha para um dev solo é o perfeccionismo na UI.

Você vai gastar 5 horas tentando alinhar uma div com CSS. Não faça isso agora.

Use os componentes do Shadcn UI. Deixe o site "feio mas funcional" primeiro. Se o fluxo de agendamento e pagamento estiver funcionando, você tem um negócio. Só depois gaste tempo deixando ele com a cara do Brand Book.

Você tem o mapa (PRD), o desenho do destino (UI Mockups) e agora a caixa de ferramentas (Tech Stack).

Abra o terminal. npx create-next-app senda-web. A jornada começou. Estou aqui para tirar dúvidas de código ou arquitetura quando você travar.'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes. -->