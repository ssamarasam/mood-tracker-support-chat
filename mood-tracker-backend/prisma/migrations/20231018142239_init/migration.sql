-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "emergencyContactRelationship" TEXT,
    "healthCareCode" TEXT,
    "professionalSpecialization" TEXT,
    "professionalLicense" TEXT,
    "aiPredictiveData" TEXT
);

-- CreateTable
CREATE TABLE "MoodTrackingData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moodType" TEXT NOT NULL,
    "moodSeverity" INTEGER NOT NULL,
    "timeEntered" TEXT NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "stressLevel" INTEGER NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "physicalHealthIssue" TEXT,
    "emotionalStateIssue" TEXT,
    "triggeringEvents" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "MoodTrackingData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
