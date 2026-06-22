import { Request, Response, NextFunction } from "express";
import * as memesService from "./memes.service";
import { uploadMemeFile, createMeme } from "./memes.service";
import { AuthedRequest } from "../../middleware/auth";

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

export async function uploadMemeHandler(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const { title, description, channelId } = req.body;

    const { url, mediaType } = await uploadMemeFile(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname,
    );

    const meme = await createMeme({
      title,
      description,
      channel_id: channelId,
      uploader_id: req.userId,
      media_url: url,
      media_type: mediaType,
    });

    res.status(201).json(meme);
  } catch (err) {
    next(err);
  }
}
