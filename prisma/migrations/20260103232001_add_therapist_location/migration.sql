-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TherapistProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "specialty" TEXT NOT NULL,
    "license" TEXT,
    "experience" INTEGER,
    "rating" REAL NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT,
    "state" TEXT,
    "address" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "zipCode" TEXT,
    "neighborhood" TEXT,
    "onlineAvailable" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "TherapistProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TherapistProfile" ("address", "bio", "city", "createdAt", "experience", "id", "latitude", "license", "longitude", "neighborhood", "onlineAvailable", "phone", "rating", "specialty", "state", "userId", "verified", "zipCode") SELECT "address", "bio", "city", "createdAt", "experience", "id", "latitude", "license", "longitude", "neighborhood", coalesce("onlineAvailable", false) AS "onlineAvailable", "phone", "rating", "specialty", "state", "userId", "verified", "zipCode" FROM "TherapistProfile";
DROP TABLE "TherapistProfile";
ALTER TABLE "new_TherapistProfile" RENAME TO "TherapistProfile";
CREATE UNIQUE INDEX "TherapistProfile_userId_key" ON "TherapistProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
