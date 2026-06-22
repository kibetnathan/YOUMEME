import { AuthedRequest } from "../../middleware/auth";
import { Request, Response, NextFunction } from "express";
import * as likeService from "./likes.service";

export async function likeMemeHandler(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const memeId = req.params.id as string;
    await likeService.likeMeme(req.userId!, memeId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function unlikeMemeHandler(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const memeId = req.params.id as string;
    likeService.unlikeMeme(req.userId!, memeId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
