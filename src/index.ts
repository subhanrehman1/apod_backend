import express, { Application, Request, Response, Router } from "express";
import { getConfig } from "./config/config";
import cors from "cors";
import router from "../src/routes/apodRouter";
const app: Application = express();

//allowing cors for frontend at port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//to serve static files or images in the given directory0
app.use(express.static(`${getConfig.db_image_url}`));

app.use(getConfig.api_url, router);
app.listen(getConfig.port, () => {
  console.log(`listening on port ${getConfig.port}`);
});
