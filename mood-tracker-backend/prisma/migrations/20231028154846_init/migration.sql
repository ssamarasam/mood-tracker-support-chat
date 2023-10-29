/*
  Warnings:

  - You are about to alter the column `timeEntered` on the `MoodTrackingData` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MoodTrackingData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moodType" TEXT NOT NULL,
    "moodSeverity" INTEGER NOT NULL,
    "timeEntered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sleepQuality" INTEGER NOT NULL,
    "stressLevel" INTEGER NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "physicalHealthIssue" TEXT,
    "emotionalStateIssue" TEXT,
    "triggeringEvents" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "MoodTrackingData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MoodTrackingData" ("emotionalStateIssue", "energyLevel", "id", "moodSeverity", "moodType", "physicalHealthIssue", "sleepQuality", "stressLevel", "timeEntered", "triggeringEvents", "userId") SELECT "emotionalStateIssue", "energyLevel", "id", "moodSeverity", "moodType", "physicalHealthIssue", "sleepQuality", "stressLevel", "timeEntered", "triggeringEvents", "userId" FROM "MoodTrackingData";
DROP TABLE "MoodTrackingData";
ALTER TABLE "new_MoodTrackingData" RENAME TO "MoodTrackingData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
