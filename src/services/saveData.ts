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
    console.log(err);
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
      let imageName: string | null = `image${Date.now()}`;
      if (data.media_type === "image") {
        try {
          const fileData: any = await uploadImage(
            data.url,
            `${__dirname}/../public/uploads/${imageName}.jpg`
          );
          if (!fileData) {
            return { status: false, message: "Image uploading failed" };
          }
        } catch (err: any) {
          console.log(err);
          apodLogger.error(err);

          return { status: false, message: "Image uploading failed" };
        }
      } else {
        imageName = null;
      }
      if (data) {
        planetaryData = await prisma.planetary_data.create({
          data: {
            date: new Date(date),
            explanation: data.explanation,
            media_type: data.media_type,
            title: data.title,
            url: data.url || `${getConfig.image_url}${imageName}.jpg`,
          },
        });
      }
      return { status: true, planetaryData };
    } catch (err: any) {
      console.log(err);

      apodLogger.error(err);

      return {
        status: false,
        message: "Data cannot be get for the given date",
      };
    }
  }
};
