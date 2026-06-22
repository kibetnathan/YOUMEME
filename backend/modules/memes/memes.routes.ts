import { Router } from "express";
import {
  getFeedHandler,
  getMemeHandler,
  uploadMemeHandler,
} from "./memes.controller";
import { optionalAuth, requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/feed", optionalAuth, getFeedHandler);
router.get("/:id", optionalAuth, getMemeHandler);
router.get("/upload", requireAuth, uploadMemeHandler);

export default router;
