export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Channel {
  id: string;
  owner_id: string;
  name: string;
  handle: string;
  description: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  created_at: string;
}

export interface Meme {
  id: string;
  channel_id: string;
  uploader_id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: "image" | "video";
  thumbnail_url: string | null;
  duration_seconds: number | null;
  width: number | null;
  height: number | null;
  like_count: number;
  repost_count: number;
  share_count: number;
  view_count: number;
  is_repost_of: string | null;
  created_at: string;
}

export interface Playlist {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
}

export interface AuthedRequest extends Express.Request {
  userId?: string;
}
