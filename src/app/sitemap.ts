import type { MetadataRoute } from "next";
import { getArtworks } from "@/sanity/lib/queries";

const baseUrl = "https://andre-art.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/galleri", "/samlingen", "/kontakt"];
  const now = new Date();

  const artworks = await getArtworks();
  const artworkRoutes = artworks
    .map((a) => a.slug?.current)
    .filter((slug): slug is string => !!slug)
    .map((slug) => `/verk/${slug}`);

  return [...routes, ...artworkRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
