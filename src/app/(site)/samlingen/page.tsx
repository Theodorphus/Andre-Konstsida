import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import Reveal from "@/components/Reveal";
import { collectionArtist, localCollection } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Samlingen",
  description:
    "Ur André Roslunds privata samling – sameslöjd och konst av Tore Sunna. Ej till salu.",
};

export default function CollectionPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal as="header" className="mb-14 max-w-2xl">
        <h1 className="hero-name font-display text-4xl sm:text-5xl">Samlingen</h1>
        <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-accent/80">
          {collectionArtist.name}
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          {collectionArtist.intro}
        </p>
        <p className="mt-4 inline-block border border-line bg-white/[0.02] px-3 py-1 text-xs uppercase tracking-widest text-accent">
          Ej till salu
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {localCollection.map((item, i) => (
          <Reveal key={item._id} delay={(i % 3) * 100}>
            <CollectionCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
