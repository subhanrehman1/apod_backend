import axios from "axios";
import { apodLogger } from "../utils/logger";
interface Response {
  data: object;
}

export const getPlanetaryData: any = async (date: Date) => {
  try {
    const response: Response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
    );
    return response.data;
  } catch (err: any) {
    apodLogger.error(err);
    return false;
  }
};
