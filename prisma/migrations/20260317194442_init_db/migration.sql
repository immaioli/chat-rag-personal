-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "embedding" vector(768),

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
