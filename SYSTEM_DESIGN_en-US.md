# System Design - mAIo Assistant Chat

This document describes the technical architecture and resilience strategies implemented in the `chat-rag-personal` application. The foundation of this system was designed to handle heavy asynchronous processes (Retrieval-Augmented Generation - RAG) and efficient communication with relational and vector databases, ensuring a fluid response to the end user.

## 1. Request Flow (Data Flow)

The life cycle of a chat message follows a strict pipeline, designed to isolate responsibilities and ensure traffic spikes do not degrade the experience:

1. **Frontend (Next.js Client):** The user submits a message via the `InputField`. The interface reacts optimistically.
2. **Next.js API Route (`/api/chat`):** The message arrives at the server (BFF - Backend for Frontend).
3. **Upstash Redis (Rate Limit):** Before any costly processing, the visitor's identity is validated against Upstash Redis to ensure the rate limit quota has not been exceeded.
4. **External Classifier API (Internal Bypass):** The request is evaluated by a classifier microservice. To reduce latency, the communication utilizes an Internal URL whenever possible.
5. **Prisma DB (PostgreSQL + pgvector):** The conversation history and vector searches (RAG) are resolved in a persistent database managed by the Prisma ORM.
6. **Streamed Response:** The `Vercel AI SDK` orchestrates the call to the LLM (OpenAI) and returns the response in a *Stream* format, rendering word by word through the `ChatBubble`.

## 2. Resilience Strategy (Cold Start Prevention)

Since the application relies on microservice instances and databases that may be on "Free Tier" plans (like Render instances), which enter hibernation due to inactivity, we implemented a *Keep-Alive* strategy:
- **Cron-Jobs:** External scheduled tasks periodically invoke `/ping` and `/health` routes (Health Checks) on the services hosted on Render.
- **Result:** The microservice and the database are kept warm in memory, eliminating the severe latency of a "Cold Start" when a user sends their first message of the day.

## 3. Failure Handling (Fallbacks)

Stability is paramount. The system is designed to never leave the user without a response in case of service degradation:
- **LLM Failure / Timeout:** If the OpenAI service fails or takes too long, the `Classifier API` intercepts the primary intent of the message and delivers a structured *fallback* response directly from the relational database.
- **Error Isolation:** Unhandled exceptions are caught by global `try/catch` blocks in Server Routes and passively sent to telemetry tools without crashing the UI. Generic localized responses are returned in the visitor's current language.
