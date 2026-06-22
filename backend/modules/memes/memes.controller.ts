import { Request, Response, NextFunction } from "express";
import * as memesService from "./memes.service";

export async function getMemeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // Now TypeScript automatically knows req.params.id is a string!
  try {
    const memeId = req.params.id as string;
    const meme = await memesService.getMemeById(memeId);
    await memesService.incrementView(memeId);
    res.json(meme);
  } catch (err) {
    next(err);
  }
}
export async function getFeedHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const result = await memesService.getFeed({ cursor, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}
