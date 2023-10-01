-- AlterTable
ALTER TABLE "AdsCart" ADD COLUMN     "images" TEXT[];

-- CreateTable
CREATE TABLE "ad" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ad_pkey" PRIMARY KEY ("id")
);
