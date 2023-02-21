/*
  Warnings:

  - You are about to drop the column `coursesId` on the `handclaps` table. All the data in the column will be lost.
  - You are about to drop the `enquires` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[section_id]` on the table `works` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "enquires" DROP CONSTRAINT "enquires_course_id_fkey";

-- DropForeignKey
ALTER TABLE "enquires" DROP CONSTRAINT "enquires_user_id_fkey";

-- DropForeignKey
ALTER TABLE "handclaps" DROP CONSTRAINT "handclaps_coursesId_fkey";

-- AlterTable
ALTER TABLE "handclaps" DROP COLUMN "coursesId";

-- DropTable
DROP TABLE "enquires";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "reply_post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "works_section_id_key" ON "works"("section_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
