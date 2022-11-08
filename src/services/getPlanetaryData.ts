import axios from "axios";
import { getConfig } from "../config/config";
import { apodLogger } from "../utils/logger";
interface Response {
  data: object;
}

export const getPlanetaryData: any = async (date: Date) => {
  try {
    const response: Response = await axios.get(`${getConfig.apod_url}${date}`);
    return response.data;
  } catch (err: any) {
    console.log(err);
    apodLogger.error(err);
    return false;
  }
};
