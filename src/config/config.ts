import Dotenv from "dotenv";
Dotenv.config();

const envs = process.env;

interface ProcessEnv {
  port: string | undefined;
  node_environment: string | undefined;
  api_url: any;
  image_url: string | undefined;
  apod_url: string | undefined;
  db_image_url: string | undefined;
}
export const getConfig: ProcessEnv = {
  port: envs.PORT,
  node_environment: envs.NODE_ENV,
  api_url: envs.API_URL,
  image_url: envs.IMAGE_URL,
  apod_url: envs.APOD_API_LINK,
  db_image_url: envs.DB_IMAGE_URL,
};
