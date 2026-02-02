import { hasSanityConfig, sanityClient } from "./sanityClient";

export type SanityMedia = {
  src: string;
  type: "image" | "video";
  alt: string;
};

type SanityMediaItem = {
  _type: "image" | "file";
  alt?: string;
  assetUrl?: string;
  mimeType?: string;
};

type SanityMediaDoc = {
  media?: SanityMediaItem[];
};

const MEDIA_QUERY = `*[_type == "projectMedia" && category == $category] | order(order asc, _createdAt asc) {
  media[]{
    _type,
    alt,
    "assetUrl": asset->url,
    "mimeType": asset->mimeType
  }
}`;

export async function fetchProjectMediaByCategory(category: string): Promise<SanityMedia[]> {
  if (!hasSanityConfig || !sanityClient) {
    return [];
  }

  const docs = await sanityClient.fetch<SanityMediaDoc[]>(MEDIA_QUERY, { category });

  const items: SanityMedia[] = [];
  docs.forEach((doc) => {
    (doc.media || []).forEach((media) => {
      if (!media.assetUrl) return;
      const isVideo = media.mimeType?.startsWith("video/") ?? media._type === "file";
      items.push({
        src: media.assetUrl,
        type: isVideo ? "video" : "image",
        alt: media.alt || "Project media",
      });
    });
  });

  return items;
}
