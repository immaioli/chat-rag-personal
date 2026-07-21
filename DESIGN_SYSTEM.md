# Design System - mAIo Assistant Chat

Este documento consolida as fundações do **Micro Design System** da aplicação `chat-rag-personal`. A arquitetura de estilos foi concebida para garantir a máxima consistência visual, escalabilidade estrutural e reaproveitamento ágil de código, facilitando uma futura transição ou criação de interfaces móveis.

## 1. Filosofia de Estilos e Tailwind JIT

Para garantir a otimização máxima do compilador *Just-In-Time* (JIT) do Tailwind CSS v4, o sistema adota regras rígidas documentadas no repositório principal:

### Regra 1: Zero Interpolação de Strings
É expressamente proibido construir classes dinamicamente (ex: `bg-${color}-500`). O scanner estático do Tailwind precisa de declarações explícitas para gerar o CSS correto em produção.
- **Correto:** `'bg-blue-600'`
- **Incorreto:** `` `bg-${colorName}-600` ``

### Regra 2: Padrão de Composição "Outside-In"
Ao combinar estilos para criar componentes ou variáveis utilitárias, a string de classes deve sempre respeitar a seguinte ordem semântica de fora para dentro:
1. **Camada 1 (Layout e Box Model):** Posicionamento, display, tamanho e espaçamento (`flex items-center w-full px-4`).
2. **Camada 2 (Aparência):** Shape, bordas, tipografia e cores estáticas de fundo e texto (`rounded-xl border border-gray-200 bg-white text-sm`).
3. **Camada 3 (Comportamento e Estados):** Pseudo-classes, hover, active, focus, transições e interações dinâmicas (`hover:bg-gray-100 shadow-lg transition-colors`).

## 2. Estrutura de Tokens (Design Tokens)

Os estilos base da interface são centralizados no arquivo `src/constants/styles.ts` e operam em dois níveis complementares:

### 2.1. Atoms (Valores Visuais Únicos)
Classes Tailwind brutas mapeadas explicitamente em constantes, representando propriedades únicas (Tokens) do sistema visual (cores, background, tipografia, bordas).
* **Fundação Neutra:** `BG_BASE_100`, `DARK_BG_SURFACE`, `TEXT_BASE_900`.
* **Cores Semânticas de Ação:** `BG_ACCENT_600` (Ação Principal), `TEXT_DANGER_500` (Erro/Cuidado).
* **Interações:** `HOVER_BG_BASE_200`, `DARK_HOVER_BG_DANGER_950_30`.

### 2.2. Semantic Slices (Fatias Semânticas de Tema)
São combinações lógicas de *Atoms*, unindo suas variações para o modo Claro (Light) e Escuro (Dark) em uma única e previsível constante de estilo.
* **COLOR_SURFACE:** Centraliza o visual das superfícies dos painéis (`BG_NEUTRAL` e `DARK_BG_SURFACE`).
* **COLOR_TEXT_MAIN:** Centraliza os textos da aplicação (`TEXT_BASE_700` e `DARK_TEXT_MAIN`).

Ao invés do desenvolvedor precisar lembrar das classes do *dark mode* o tempo todo, basta importar e aplicar `COLOR_SURFACE`, garantindo uma adaptação responsiva automática do tema.

## 3. Catálogo do Micro Design System (Componentes Base)

Para tangibilizar essa arquitetura teórica em interface real, a aplicação conta com três componentes de UI fundamentais em `src/components/ui/`. A construção estrutural de cada componente é altamente regulamentada:
* Ausência de ponto e vírgula (`;`).
* Variáveis explicitamente descritivas (nada de varíaveis curtas como `c` ou `str`).
* Uso exclusivo e rígido de aspas simples (`'`).
* Sem linhas em branco desnecessárias no interior dos blocos de retorno JSX.
* Comentários arquiteturais padronizados em `en-US`.

### 3.1. Button (`Button.tsx`)
O botão mestre flexível focado em padronizar cliques, submissões e ações.
- **Propriedades (Props):** Estende `ButtonHTMLAttributes` agregando suporte nativo aos Slices de `variantStyle` (`primary`, `secondary`, `danger`) e um `isLoadingState` unificado.
- **Estruturação:** Em vez de usar milhares de classes inline, a variável `baseButtonStyle` dita o layout, sendo agrupada programaticamente aos estados de `dangerStyle` ou `primaryStyle`, provando como o reaproveitamento é feito no código.

### 3.2. InputField (`InputField.tsx`)
O campo de texto gerenciado para a digitação fluida.
- **Propriedades (Props):** Estende `InputHTMLAttributes` para se comportar como um input padrão do HTML, mas reage via React Props `hasErrorState` e `errorMessage`.
- **Comportamento (UX):** O estilo do anel de foco (`focus:ring-2`) da Camada 3 e a cor da borda transitam suavemente caso a lógica pai determine que o input possui um estado de erro, mantendo o usuário guiado pela cor.

### 3.3. ChatBubble (`ChatBubble.tsx`)
O bloco modular que abraça cada mensagem da IA ou do visitante no chat.
- **Propriedades (Props):** Aceita o string de `messageContent` e a variável booleana essencial `isUserMessage`.
- **Layout Inteligente:** O componente encapsula a complexidade do *Tailwind*. Apenas consultando a booleana `isUserMessage`, ele determina se usa a fatia de estilo `surfaceStyles.messageBubbleUser` (alinhado via *flex-row-reverse*) ou `surfaceStyles.messageBubbleAI` (layout padrão), centralizando as dependências de estilo importadas diretamente da base `styles.ts`.

## Considerações Finais
Toda essa rígida organização, que limita o escopo a Atoms previsíveis formatando *Semantic Slices* combinados com TypeScript severo, atinge o objetivo central do sistema: a **Escalabilidade Estrutural**. Caso seja necessário migrar esse modelo para React Native no mobile, as bases lógicas (props, interfaces, nomenclatura das variantes) permanecerão 100% reutilizáveis e apenas o renderizador JSX de cada componente sofrerá refatoração.
