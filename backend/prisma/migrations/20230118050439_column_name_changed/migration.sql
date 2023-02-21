/*
  Warnings:

  - You are about to drop the column `order_num` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `order_num` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `chapter_order_num` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_order_num` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chapters" DROP COLUMN "order_num",
ADD COLUMN     "chapter_order_num" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sections" DROP COLUMN "order_num",
ADD COLUMN     "section_order_num" INTEGER NOT NULL,
ALTER COLUMN "content_type" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "dateOfBirth",
ADD COLUMN     "date_of_birth" DATE NOT NULL;
