import { Router } from "express";
import { getFeedHandler, getMemeHandler } from "./memes.controller";
import { optionalAuth } from "../../middleware/auth";

const router = Router();

router.get("/feed", optionalAuth, getFeedHandler);
router.get("/:id", optionalAuth, getMemeHandler);

export default router;
