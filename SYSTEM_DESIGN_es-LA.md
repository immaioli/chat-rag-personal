# System Design - mAIo Assistant Chat

Este documento describe la arquitectura técnica y las estrategias de resiliencia implementadas en la aplicación `chat-rag-personal`. La base de este sistema fue diseñada para manejar procesos asíncronos pesados (Generación Aumentada por Recuperación - RAG) y una comunicación eficiente con bases de datos relacionales y vectoriales, asegurando una respuesta fluida para el usuario final.

## 1. Flujo de Solicitudes (Data Flow)

El ciclo de vida de un mensaje de chat sigue una canalización estricta, diseñada para aislar responsabilidades y garantizar que los picos de tráfico no degraden la experiencia:

1. **Frontend (Next.js Client):** El usuario envía un mensaje a través del `InputField`. La interfaz reacciona de manera optimista.
2. **Next.js API Route (`/api/chat`):** El mensaje llega al servidor (BFF - Backend for Frontend).
3. **Upstash Redis (Rate Limit):** Antes de cualquier procesamiento costoso, la identidad del visitante se valida contra Upstash Redis para garantizar que no se haya excedido la cuota límite de solicitudes.
4. **External Classifier API (Bypass Interno):** La solicitud es evaluada por un microservicio clasificador. Para reducir la latencia, la comunicación utiliza una Internal URL siempre que sea posible.
5. **Prisma DB (PostgreSQL + pgvector):** El historial de conversaciones y las búsquedas vectoriales (RAG) se resuelven en una base de datos persistente gestionada por el Prisma ORM.
6. **Respuesta en Stream:** El `Vercel AI SDK` orquesta la llamada al LLM (OpenAI) y devuelve la respuesta en formato de *Stream*, renderizando palabra por palabra a través del `ChatBubble`.

## 2. Estrategia de Resiliencia (Prevención de Cold Start)

Como la aplicación depende de instancias de microservicios y bases de datos que pueden estar en planes "Free Tier" (como instancias en Render), que entran en hibernación por inactividad, implementamos una estrategia de *Keep-Alive*:
- **Cron-Jobs:** Tareas programadas externas invocan periódicamente rutas de `/ping` y `/health` (Health Checks) en los servicios alojados en Render.
- **Resultado:** El microservicio y la base de datos se mantienen activos en memoria (*warm*), eliminando la latencia severa del "Cold Start" cuando un usuario envía el primer mensaje del día.

## 3. Manejo de Fallos (Fallbacks)

La estabilidad es primordial. El sistema está diseñado para nunca dejar al usuario sin respuesta en caso de degradación del servicio:
- **Fallo en LLM / Timeout:** Si el servicio de OpenAI falla o demora demasiado, la `Classifier API` intercepta la intención principal del mensaje y entrega una respuesta estructurada de *fallback* directamente desde la base de datos relacional.
- **Aislamiento de Errores:** Las excepciones no controladas son capturadas por bloques globales `try/catch` en las Server Routes y enviadas de forma pasiva a herramientas de telemetría sin bloquear la interfaz. Se devuelven respuestas localizadas genéricas en el idioma actual del visitante.
