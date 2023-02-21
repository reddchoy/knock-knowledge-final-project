-- DropForeignKey
ALTER TABLE "course_orders" DROP CONSTRAINT "course_orders_redeem_coupon_id_fkey";

-- AlterTable
ALTER TABLE "course_orders" ALTER COLUMN "redeem_coupon_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "fundraise_price" DROP NOT NULL,
ALTER COLUMN "fundraise_start_date" DROP NOT NULL,
ALTER COLUMN "fundraise_end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "works" ALTER COLUMN "work_image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "course_orders" ADD CONSTRAINT "course_orders_redeem_coupon_id_fkey" FOREIGN KEY ("redeem_coupon_id") REFERENCES "redeem_coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
