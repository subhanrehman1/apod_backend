import fs from "fs";
import axios from "axios";
import { apodLogger } from "../utils/logger";
export const uploadImage: any = async (url: string, filepath: string) => {
  try {
    const fileData = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    return new Promise((resolve, reject) => {
      fileData.data
        .pipe(fs.createWriteStream(filepath))
        .on("error", reject)
        .once("close", () => resolve(filepath));
    });
  } catch (err: any) {
    console.log(err);
    apodLogger.error(err);
    return false;
  }
};
