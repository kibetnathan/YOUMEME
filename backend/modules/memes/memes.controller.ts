import { Request, Response, NextFunction } from "express";
import * as memesService from "./memes.service";

// Define the shape of your route params
interface MemeParams {
  id: string;
}

export async function getMemeHandler(
  // Pass MemeParams as the first generic argument
  req: Request<MemeParams>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // Now TypeScript automatically knows req.params.id is a string!
  try {
    const meme = await memesService.getMemeById(req.params.id);
    await memesService.incrementView(req.params.id);
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
