/*
  Warnings:

  - Added the required column `courseRating` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "courseRating" DECIMAL(2,1) NOT NULL;
