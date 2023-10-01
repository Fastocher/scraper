/*
  Warnings:

  - You are about to drop the `Ad` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `AdsCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_adsCartId_fkey";

-- AlterTable
ALTER TABLE "AdsCart" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ad";
