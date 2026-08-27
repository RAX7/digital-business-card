-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "firstWorkDay" DATE NOT NULL DEFAULT '1970-01-01 00:00:00',
ADD COLUMN     "lastWorkDay" DATE;
