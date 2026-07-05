import type { Metadata } from "next";
import { getArtworks, type Artwork } from "@/sanity/lib/queries";
import ArtworkCard from "@/components/ArtworkCard";
import Reveal from "@/components/Reveal";
import { localArtworks } from "@/lib/localContent";
import { localArtworkToArtwork } from "@/lib/artwork";

export const metadata: Metadata = {
  title: "Galleri",
  description: "Originalkonst av André Roslund – måleri till salu.",
};

export default async function GalleryPage() {
  const artworks = await getArtworks();
  // Faller tillbaka på platshållarverk tills Sanity har innehåll
  const displayArtworks: Artwork[] =
    artworks.length > 0 ? artworks : localArtworks.map(localArtworkToArtwork);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-2xl">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">Galleri</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-5 text-muted">
          Alla verk är original och säljs direkt av mig. Klicka på ett verk för
          att se mer och skicka en förfrågan.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {displayArtworks.map((a, i) => (
          <Reveal key={a._id} delay={(i % 3) * 100}>
            <ArtworkCard artwork={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
