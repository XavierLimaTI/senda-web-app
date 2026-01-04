-- AlterTable TherapistProfile - Add location fields
ALTER TABLE "TherapistProfile" ADD COLUMN "city" TEXT;
ALTER TABLE "TherapistProfile" ADD COLUMN "state" TEXT;
ALTER TABLE "TherapistProfile" ADD COLUMN "address" TEXT;
ALTER TABLE "TherapistProfile" ADD COLUMN "latitude" REAL;
ALTER TABLE "TherapistProfile" ADD COLUMN "longitude" REAL;
ALTER TABLE "TherapistProfile" ADD COLUMN "zipCode" TEXT;
ALTER TABLE "TherapistProfile" ADD COLUMN "neighborhood" TEXT;
ALTER TABLE "TherapistProfile" ADD COLUMN "onlineAvailable" BOOLEAN DEFAULT false;
