import raw from "@/data/media.generated.json";

export type Photo = {
  id: string;
  category: string;
  src: string;
  width: number;
  height: number;
  blur: string;
};
export type Video = { id: string; src: string; poster: string; width: number; height: number };

const photos = raw.photos as Photo[];
const byId = new Map(photos.map((p) => [p.id, p]));

export const allPhotos = photos;
export const allVideos = raw.videos as Video[];

export function photo(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
}
export const video = (id: string): Video => {
  const v = allVideos.find((x) => x.id === id);
  if (!v) throw new Error(`Unknown video id: ${id}`);
  return v;
};
