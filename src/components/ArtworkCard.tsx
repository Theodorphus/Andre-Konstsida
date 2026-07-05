import Link from "next/link";
import type { Artwork, ArtworkStatus } from "@/sanity/lib/queries";
import SanityImg from "./SanityImg";
import { formatPrice, statusLabel } from "@/lib/artwork";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const slug = artwork.slug?.current;
  const status: ArtworkStatus = artwork.status ?? "tillSalu";
  const sold = status === "sald";

  const card = (
    <article className="group flex h-full flex-col">
      <div className="tile !aspect-[4/5]">
        <SanityImg
          image={artwork.image}
          fallbackSrc={artwork.fallbackImageSrc}
          alt={artwork.title}
          width={480}
          height={600}
          sizes="(max-width: 640px) 50vw, 350px"
          className={`h-full w-full object-cover ${sold ? "opacity-60 saturate-50" : ""}`}
        />
        {status !== "tillSalu" && (
          <span className="absolute left-3 top-3 border border-line bg-[var(--background)]/85 px-3 py-1 text-xs uppercase tracking-widest text-accent backdrop-blur-sm">
            {statusLabel(status)}
          </span>
        )}
        {/* Mörk gradient som tonas in nedtill vid hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-xl leading-tight text-accent transition-colors duration-300 group-hover:text-[var(--accent-soft)]">
          {artwork.title}
        </h3>
        <p className="mt-0.5 text-sm text-muted">
          {[artwork.technique, artwork.dimensions, artwork.year]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {!sold && artwork.price != null && (
          <p className="mt-1.5 text-sm text-foreground/90">
            {formatPrice(artwork.price)}
          </p>
        )}
      </div>
    </article>
  );

  // Länka till verksidan när det finns en slug (Sanity-verk); platshållare
  // utan slug renderas utan länk.
  return slug ? (
    <Link href={`/verk/${slug}`} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
