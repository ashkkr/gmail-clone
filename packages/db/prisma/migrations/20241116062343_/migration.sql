/*
  Warnings:

  - You are about to drop the column `from_user_id` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `to_user_id` on the `Email` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_from_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_to_user_id_fkey";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "from_user_id",
DROP COLUMN "to_user_id",
ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
