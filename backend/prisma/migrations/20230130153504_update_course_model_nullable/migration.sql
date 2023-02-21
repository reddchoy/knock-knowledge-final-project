-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "course_minimum_size" DROP NOT NULL,
ALTER COLUMN "course_image" DROP NOT NULL,
ALTER COLUMN "course_start_date" DROP NOT NULL;
