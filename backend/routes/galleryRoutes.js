import express from "express";
import {
  createPhoto,
  getPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/", createPhoto);
router.get("/", getPhotos);
router.get("/:id", getPhotoById);
router.put("/:id", updatePhoto);
router.delete("/:id", deletePhoto);

export default router;

