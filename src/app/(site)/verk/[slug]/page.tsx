import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtwork, getSettings, type Artwork } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { localArtworks, localBuyingInfo, localProfile } from "@/lib/localContent";
import { formatPrice, localArtworkToArtwork, statusLabel } from "@/lib/artwork";

interface Props {
  params: Promise<{ slug: string }>;
}

// Hämtar verket från Sanity, annars bland platshållarverken (innan CMS:t fyllts)
async function resolveArtwork(slug: string): Promise<Artwork | null> {
  const artwork = await getArtwork(slug);
  if (artwork) return artwork;
  const local = localArtworks.find((a) => a.slug === slug);
  return local ? localArtworkToArtwork(local) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await resolveArtwork(slug);
  if (!artwork) return { title: "Verk saknas" };
  return {
    title: artwork.title,
    description: [
      artwork.title,
      artwork.technique,
      artwork.dimensions,
      "originalkonst av André Roslund.",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const [artwork, settings] = await Promise.all([
    resolveArtwork(slug),
    getSettings(),
  ]);
  if (!artwork) notFound();

  const status = artwork.status ?? "tillSalu";
  const sold = status === "sald";
  const email = settings?.email ?? localProfile.email;
  const buyingInfo = settings?.buyingInfo ?? localBuyingInfo;
  const meta = [artwork.technique, artwork.dimensions, artwork.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal className="mb-10">
        <Link
          href="/galleri"
          className="text-sm uppercase tracking-wide link-underline text-muted"
        >
          ← Tillbaka till galleriet
        </Link>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        {/* Bilder på verket – obeskurna så hela målningen syns */}
        <Reveal>
          <div className="border border-line bg-white/[0.02] p-3 sm:p-4">
            <SanityImg
              image={artwork.image}
              fallbackSrc={artwork.fallbackImageSrc}
              alt={artwork.title}
              width={1200}
              height={1500}
              priority
              noCrop
              sizes="(max-width: 768px) 100vw, 60vw"
              className={sold ? "opacity-70 saturate-75" : ""}
            />
          </div>
          {artwork.extraImages && artwork.extraImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {artwork.extraImages.map((img, i) => (
                <div key={i} className="border border-line bg-white/[0.02] p-2">
                  <SanityImg
                    image={img}
                    alt={`${artwork.title} – bild ${i + 2}`}
                    width={400}
                    height={400}
                    noCrop
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* Info + förfrågan */}
        <Reveal delay={120}>
          {status !== "tillSalu" && (
            <p className="mb-4 inline-block border border-line bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-widest text-accent">
              {statusLabel(status)}
            </p>
          )}
          <h1 className="hero-name font-display text-4xl sm:text-5xl">
            {artwork.title}
          </h1>
          <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
          {meta && <p className="mt-5 text-muted">{meta}</p>}
          {!sold && artwork.price != null && (
            <p className="mt-3 font-display text-2xl text-accent">
              {formatPrice(artwork.price)}
            </p>
          )}

          {artwork.description && (
            <p className="mt-6 leading-relaxed text-muted whitespace-pre-line">
              {artwork.description}
            </p>
          )}

          {sold ? (
            <div className="mt-10 border border-line bg-white/[0.02] px-5 py-6 text-sm">
              <p className="font-display text-lg text-accent">
                Detta verk är sålt
              </p>
              <p className="mt-2 text-muted">
                Är du nyfiken på liknande verk?{" "}
                <Link href="/kontakt" className="link-underline text-accent">
                  Hör av dig
                </Link>{" "}
                eller titta vidare i{" "}
                <Link href="/galleri" className="link-underline text-accent">
                  galleriet
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
                {buyingInfo}
              </div>
              <h2 className="mt-10 font-display text-2xl text-accent">
                Skicka en förfrågan
              </h2>
              <div className="mt-5">
                <ContactForm toEmail={email} artworkTitle={artwork.title} />
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
