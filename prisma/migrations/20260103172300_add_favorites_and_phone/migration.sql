-- AlterTable
ALTER TABLE "ClientProfile" ADD COLUMN "phone" TEXT;

-- AlterTable
ALTER TABLE "TherapistProfile" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "TherapistFavorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" INTEGER NOT NULL,
    "therapistId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TherapistFavorite_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TherapistFavorite_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "TherapistProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TherapistFavorite_clientId_idx" ON "TherapistFavorite"("clientId");

-- CreateIndex
CREATE INDEX "TherapistFavorite_therapistId_idx" ON "TherapistFavorite"("therapistId");

-- CreateIndex
CREATE UNIQUE INDEX "TherapistFavorite_clientId_therapistId_key" ON "TherapistFavorite"("clientId", "therapistId");
