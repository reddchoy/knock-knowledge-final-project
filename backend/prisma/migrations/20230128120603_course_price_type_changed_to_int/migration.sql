/*
  Warnings:

  - You are about to alter the column `selling_price` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `fundraise_price` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "selling_price" SET DATA TYPE INTEGER,
ALTER COLUMN "fundraise_price" SET DATA TYPE INTEGER;
