/*
  Warnings:

  - You are about to drop the column `courseRating` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `course_rating` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "courseRating",
ADD COLUMN     "course_rating" DECIMAL(2,1) NOT NULL;
