interface ResponseMsg {
  ApodApiFailed: string;
  ControllerErrorMsg: string;
  DataNotFound: string;
  ImgUploadingFailed: string;
}
export const responseMsg: ResponseMsg = {
  ApodApiFailed: "Data cannot be get for the given date",
  ControllerErrorMsg: "Something went wrong",
  DataNotFound: "Data not found for given date",
  ImgUploadingFailed: "Image uploading failed",
};
