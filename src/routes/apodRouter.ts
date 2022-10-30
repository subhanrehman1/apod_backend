import express from "express";
import { apodController } from "../controllers/apodController";
const router = express.Router();

router.get("/:date", apodController);

export default router;
