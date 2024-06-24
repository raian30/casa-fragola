-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACCEPTED';

-- AlterTable
ALTER TABLE "ReservedDays" ADD COLUMN     "reservationId" TEXT;

-- AddForeignKey
ALTER TABLE "ReservedDays" ADD CONSTRAINT "ReservedDays_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
