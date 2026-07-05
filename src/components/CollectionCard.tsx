import type { CollectionItem } from "@/lib/localContent";
import SanityImg from "./SanityImg";

/**
 * Kort för ett verk i Samlingen (Tore Sunna). Till skillnad från ArtworkCard
 * finns ingen status, pris eller köpförfrågan – dessa verk är inte till salu.
 */
export default function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="tile !aspect-[4/5]">
        <SanityImg
          fallbackSrc={item.imageSrc}
          alt={item.title}
          width={480}
          height={600}
          sizes="(max-width: 640px) 50vw, 350px"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-xl leading-tight text-accent">
          {item.title}
        </h3>
        {item.technique && (
          <p className="mt-0.5 text-sm text-muted">{item.technique}</p>
        )}
      </div>
    </article>
  );
}
