import { prisma } from "~/db.server";

export type Ads = {
  title: string;
  images: string[];
};

export const createAd = async ({ title, images }: Ads) => {
  return await prisma.adsCart.create({
    data: {
      title,
      images,
    },
  });
};

export const clearAds = async () => {
  return await prisma.adsCart.deleteMany({});
};

export const getAd = async () => {
  return await prisma.adsCart.findMany({});
};
