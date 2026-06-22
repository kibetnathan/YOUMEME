import { supabase } from "../../config/supabase";

export async function likeMeme(userId: string, memeId: string) {
  const { error } = await supabase
    .from("likes")
    .insert({ user_id: userId, meme_id: memeId });
  if (error && error.code !== "23505") throw error;
}

export async function unlikeMeme(userId: string, memeId: string) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .match({ user_id: userId, meme_id: memeId });
  if (error) throw error;
}

export async function hasLiked(userId: string, memeId: string) {
  const { data } = await supabase
    .from("likes")
    .select("user_id")
    .match({ user_id: userId, meme_id: memeId })
    .maybeSingle();
}
