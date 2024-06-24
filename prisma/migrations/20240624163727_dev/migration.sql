/*
  Warnings:

  - Changed the type of `checkIn` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `checkOut` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "checkIn",
ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
DROP COLUMN "checkOut",
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL;
