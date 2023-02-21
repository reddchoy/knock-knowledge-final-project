/*
  Warnings:

  - Added the required column `coverImage` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_image` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_intro_video` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "coverImage" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "cover_image" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_intro_video" VARCHAR(255) NOT NULL;
