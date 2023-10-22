/*
  Warnings:

  - You are about to drop the column `professionalLicense` on the `User` table. All the data in the column will be lost.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "emergencyContactRelationship" TEXT,
    "healthCareCode" TEXT,
    "professionalSpecialization" TEXT,
    "aiPredictiveData" TEXT
);
INSERT INTO "new_User" ("aiPredictiveData", "dob", "email", "emergencyContactName", "emergencyContactPhone", "emergencyContactRelationship", "healthCareCode", "id", "name", "password", "phone", "professionalSpecialization", "role") SELECT "aiPredictiveData", "dob", "email", "emergencyContactName", "emergencyContactPhone", "emergencyContactRelationship", "healthCareCode", "id", "name", "password", "phone", "professionalSpecialization", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
