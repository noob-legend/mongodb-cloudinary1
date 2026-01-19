import express from "express";
import upload from "../middlewares/upload.js";
import {
  createPhoto,
  getPhotos,
  updatePhoto,
  deletePhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.post("/", upload.single("photo"), createPhoto);
router.get("/", getPhotos);
router.put("/:id", upload.single("photo"), updatePhoto);
router.delete("/:id", deletePhoto);

export default router;
