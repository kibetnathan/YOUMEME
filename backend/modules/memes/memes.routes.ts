import { Response, NextFunction, Router } from "express";
import {
  getFeedHandler,
  getMemeHandler,
  uploadMemeHandler,
} from "./memes.controller";
import { likeMemeHandler, unlikeMemeHandler } from "../likes/likes.controller";
import { optionalAuth, requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/feed", optionalAuth, getFeedHandler);
router.get("/:id", optionalAuth, getMemeHandler);
router.post("/upload", requireAuth, uploadMemeHandler);
router.put("/:id/like", requireAuth, likeMemeHandler);
router.delete("/:id/like", requireAuth, unlikeMemeHandler);
export default router;
