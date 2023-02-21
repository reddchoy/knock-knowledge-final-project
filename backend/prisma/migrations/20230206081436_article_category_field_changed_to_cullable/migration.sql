-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_category_id_fkey";

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
