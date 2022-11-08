import { Request, Response } from "express";
import { responseMsg } from "../constants/responseMsg";
import { statusCodes } from "../constants/statusCodes";
import { saveData } from "../services/saveData";
import { apodLogger } from "../utils/logger";

interface ResponseData {
  status: string | undefined;
}
export const apodController: any = async (req: Request, res: Response) => {
  const date = req.params.date;
  let responseData: ResponseData | null;
  try {
    responseData = await saveData(date);
    if (!responseData?.status) {
      return res.status(statusCodes.InternalServerError).json(responseData);
    }
    return res.status(statusCodes.success).send(responseData);
  } catch (err: any) {
    console.log(err);
    apodLogger.error(err);
    return res
      .status(statusCodes.notFound)
      .json({ status: false, message: responseMsg.ControllerErrorMsg });
  }
};
