/*
  Warnings:

  - Added the required column `course_status` to the `course_order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_order_details" ADD COLUMN     "course_status" "CoursesStatus" NOT NULL;
