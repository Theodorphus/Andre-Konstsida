import { groq } from "next-sanity";

import { client } from "./client";
import { isSanityConfigured } from "../env";

export type ArtworkStatus = "tillSalu" | "reserverad" | "sald";

export interface Artwork {
  _id: string;
  title: string;
  slug?: { current?: string };
  technique?: string;
  dimensions?: string;
  year?: string;
  description?: string;
  price?: number;
  status?: ArtworkStatus;
  image?: SanityImage;
  extraImages?: SanityImage[];
  /** Lokal fallback-bild – används bara för platshållarverk innan Sanity fyllts. */
  fallbackImageSrc?: string;
}

export interface SiteSettings {
  name?: string;
  tagline?: string;
  heroImage?: SanityImage;
  aboutHeading?: string;
  aboutText?: PortableTextBlock[];
  portrait?: SanityImage;
  buyingInfo?: string;
  email?: string;
  phone?: string;
  authorSiteUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

// Minimal Sanity-bildtyp (räcker för urlForImage)
export interface SanityImage {
  asset?: { _ref: string; _type: string };
  hotspot?: unknown;
  crop?: unknown;
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: { _key: string; text?: string }[];
  [key: string]: unknown;
}

const settingsQuery = groq`*[_type == "siteSettings"][0]`;
const artworksQuery = groq`*[_type == "artwork"] | order(order asc, _createdAt desc)`;
const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0]`;

// Hämtas på servern; revalideras var 60:e sekund så CMS-ändringar slår igenom
const opts = { next: { revalidate: 60 } };

// Innan Sanity-projektet är kopplat (eller vid tillfälligt fel) faller vi
// tillbaka på tomt innehåll så att sidan ändå renderar med platshållare.
async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  // Hoppa över nätverksanropet helt om inget riktigt Sanity-projekt är satt.
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch(query, params, opts);
  } catch (err) {
    console.warn("Sanity-hämtning misslyckades (visar platshållare):", err);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(settingsQuery, null);
}

export async function getArtworks(): Promise<Artwork[]> {
  return safeFetch<Artwork[]>(artworksQuery, []);
}

export async function getArtwork(slug: string): Promise<Artwork | null> {
  return safeFetch<Artwork | null>(artworkBySlugQuery, null, { slug });
}
