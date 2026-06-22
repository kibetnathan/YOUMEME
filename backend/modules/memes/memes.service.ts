import { supabase } from "../../config/supabase";
import { Meme } from "../../types";
import { v4 as uuid } from "uuid";

interface FeedParams {
  cursor?: string; // ISO timestamp of the last seen meme's created_at
  limit?: number;
  channelId?: string; // optional filter, e.g. for a channel page
}

export async function getFeed({ cursor, limit = 15, channelId }: FeedParams) {
  let query = supabase
    .from("memes")
    .select("*, channels(name, handle, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }
  if (channelId) {
    query = query.eq("channel_id", channelId);
  }

  const { data, error } = await query;
  if (error) throw error;

  const nextCursor =
    data && data.length === limit ? data[data.length - 1].created_at : null;

  return { memes: data as Meme[], nextCursor };
}

export async function getMemeById(id: string) {
  const { data, error } = await supabase
    .from("memes")
    .select("*, channels(name, handle, avatar_url)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Meme;
}

export async function incrementView(id: string) {
  const { error } = await supabase.rpc("increment_view_count", { meme_id: id });
  if (error) throw error;
}

export async function createMeme(payload: Partial<Meme>) {
  const { data, error } = await supabase
    .from("memes")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as Meme;
}

export async function uploadMemeFile(
  fileBuffer: Buffer,
  mimetype: string,
  originalName: string,
) {
  const ext = originalName.split(".").pop();
  const path = `memes/${uuid()}.${ext}`;

  const { error } = await supabase.storage
    .from("meme-media")
    .upload(path, fileBuffer, { contentType: mimetype });

  if (error) throw error;

  const { data } = supabase.storage.from("meme-media").getPublicUrl(path);
  return {
    url: data.publicUrl,
    mediaType: mimetype.startsWith("video")
      ? ("video" as const)
      : ("image" as const),
  };
}
