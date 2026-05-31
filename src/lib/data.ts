import { colors } from "./colors";
import { playlists, songs } from "./music";

export interface Playlist {
  id: string;
  albumId: number;
  title: string;
  //color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const morePlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_more",
}))

export const sidebarPlaylists = playlists.map((item) => ({
  ...item,
  id: item.id + "_side",
}))

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
]

export interface Song {
  id: number;
  albumId: number;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}

export { playlists, songs };