/*
  Warnings:

  - You are about to alter the column `course_price` on the `course_order_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "course_order_details" ALTER COLUMN "course_price" SET DATA TYPE INTEGER;
