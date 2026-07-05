import type { Artwork, ArtworkStatus } from "@/sanity/lib/queries";
import type { LocalArtwork } from "./localContent";

/** Gör ett lokalt platshållarverk till samma form som ett Sanity-verk. */
export function localArtworkToArtwork(a: LocalArtwork): Artwork {
  return {
    _id: a._id,
    title: a.title,
    slug: { current: a.slug },
    fallbackImageSrc: a.imageSrc,
    technique: a.technique,
    dimensions: a.dimensions,
    year: a.year,
    description: a.description,
    status: a.status,
  };
}

export function statusLabel(status: ArtworkStatus): string {
  switch (status) {
    case "sald":
      return "Såld";
    case "reserverad":
      return "Reserverad";
    default:
      return "Till salu";
  }
}

export function formatPrice(price: number): string {
  return `${new Intl.NumberFormat("sv-SE").format(price)} kr`;
}
