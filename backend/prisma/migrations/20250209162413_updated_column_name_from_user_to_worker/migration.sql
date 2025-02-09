-- DropForeignKey
ALTER TABLE "Payouts" DROP CONSTRAINT "Payouts_worker_id_fkey";

-- AddForeignKey
ALTER TABLE "Payouts" ADD CONSTRAINT "Payouts_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
