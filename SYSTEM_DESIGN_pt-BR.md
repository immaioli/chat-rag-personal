# System Design - mAIo Assistant Chat

Este documento descreve a arquitetura técnica e as estratégias de resiliência implementadas na aplicação `chat-rag-personal`. A fundação deste sistema foi projetada para lidar com processos assíncronos pesados (Geração Aumentada por Recuperação - RAG) e comunicação eficiente com bancos de dados relacionais e vetoriais, garantindo uma resposta fluida ao usuário final.

## 1. Fluxo de Requisições (Data Flow)

O ciclo de vida de uma mensagem de chat segue um pipeline estrito, concebido para isolar responsabilidades e garantir que picos de tráfego não degradem a experiência:

1. **Frontend (Next.js Client):** O usuário submete uma mensagem através do `InputField`. A interface reage de forma otimista.
2. **Next.js API Route (`/api/chat`):** A mensagem chega no servidor (BFF - Backend for Frontend).
3. **Upstash Redis (Rate Limit):** Antes de qualquer processamento custoso, a identidade do visitante é validada contra o Upstash Redis para garantir que a cota de limite de requisições (Rate Limit) não foi excedida.
4. **External Classifier API (Bypass Interno):** A requisição é avaliada por um microsserviço classificador. Para reduzir latência, a comunicação utiliza uma Internal URL sempre que possível.
5. **Prisma DB (PostgreSQL + pgvector):** O histórico de conversas e as buscas vetoriais (RAG) são resolvidas em um banco de dados persistente gerenciado pelo Prisma ORM.
6. **Resposta em Stream:** O `Vercel AI SDK` orquestra a chamada para o LLM (OpenAI) e devolve a resposta no formato de *Stream*, renderizando palavra por palavra através do `ChatBubble`.

## 2. Estratégia de Resiliência (Prevenção de Cold Start)

Como a aplicação depende de instâncias de microsserviços e banco de dados que podem estar em planos "Free Tier" (como instâncias no Render), que entram em hibernação por inatividade, implementamos uma estratégia de *Keep-Alive*:
- **Cron-Jobs:** Tarefas agendadas externas invocam periodicamente rotas de `/ping` e `/health` (Health Checks) nos serviços hospedados no Render.
- **Resultado:** O microsserviço e o banco de dados são mantidos aquecidos na memória (*warm*), eliminando a latência severa do "Cold Start" quando um usuário envia a primeira mensagem do dia.

## 3. Tratamento de Falhas (Fallbacks)

A estabilidade é fundamental. O sistema foi projetado para nunca deixar o usuário sem resposta em caso de degradação:
- **Falha no LLM / Timeout:** Se o serviço da OpenAI falhar ou demorar demais, a `Classifier API` intercepta a intenção primária da mensagem e entrega uma resposta estruturada de *fallback* direto do banco de dados relacional.
- **Isolamento de Erros:** Exceções não tratadas são capturadas pelo bloqueio `try/catch` global nas Server Routes e enviadas passivamente para ferramentas de telemetria sem travar a interface do usuário. Respostas localizadas genéricas são retornadas no idioma atual do visitante.
