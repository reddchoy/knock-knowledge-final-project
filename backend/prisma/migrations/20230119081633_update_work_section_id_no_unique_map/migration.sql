-- DropIndex
DROP INDEX "course_orders_redeem_coupon_id_key";

-- DropIndex
DROP INDEX "works_section_id_key";

-- AlterTable
ALTER TABLE "works" ALTER COLUMN "content" DROP NOT NULL;
