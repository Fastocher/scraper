-- CreateTable
CREATE TABLE "AdsCart" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AdsCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[],
    "adsCartId" TEXT NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_adsCartId_fkey" FOREIGN KEY ("adsCartId") REFERENCES "AdsCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
