import { PrismaClient } from "@prisma/client";
import { getPlanetaryData } from "./getPlanetaryData";
import { uploadImage } from "./uploadImage";
import { getConfig } from "../config/config";
import { statusCodes } from "../constants/statusCodes";
import { apodLogger } from "../utils/logger";

const prisma = new PrismaClient();

export const saveData: any = async (date: Date) => {
  let planetaryData: object | null;
  try {
    planetaryData = await prisma.planetary_data.findFirst({
      where: {
        date: new Date(date),
      },
    });
  } catch (err: any) {
    apodLogger.error(err);
    return { status: false, message: "Data cannot be get for the given date" };
  }
  if (planetaryData) {
    return { status: true, planetaryData };
  } else {
    try {
      const data: any = await getPlanetaryData(date);
      if (!data) {
        return { status: false, message: "Data not found for given date" };
      }
      const imageName: string = `image${Date.now()}`;
      try {
        const fileData: any = await uploadImage(
          data.url,
          `${__dirname}/../public/uploads/${imageName}.jpg`
        );
        if (!fileData) {
          return { status: false, message: "Image uploading failed" };
        }
      } catch (err: any) {
        apodLogger.error(err);

        return { status: false, message: "Image uploading failed" };
      }
      if (data) {
        planetaryData = await prisma.planetary_data.create({
          data: {
            copyright: data.copyright,
            date: new Date(date),
            explanation: data.explanation,
            hd_url: data.hdurl,
            media_type: data.media_type,
            title: data.title,
            url: `${getConfig.image_url}${imageName}.jpg`,
          },
        });
      }
      return { status: true, planetaryData };
    } catch (err: any) {
      apodLogger.error(err);

      return {
        status: false,
        message: "Data cannot be get for the given date",
      };
    }
  }
};
