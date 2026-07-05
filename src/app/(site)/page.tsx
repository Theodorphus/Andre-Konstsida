import Link from "next/link";
import { getSettings, getArtworks, type Artwork } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import ArtworkCard from "@/components/ArtworkCard";
import Reveal from "@/components/Reveal";
import { localImages, localProfile, localArtworks } from "@/lib/localContent";
import { localArtworkToArtwork } from "@/lib/artwork";

export default async function HomePage() {
  const [settings, artworks] = await Promise.all([
    getSettings(),
    getArtworks(),
  ]);

  const name = settings?.name ?? localProfile.name;
  // Faller tillbaka på platshållarverk tills Sanity har innehåll
  const displayArtworks: Artwork[] =
    artworks.length > 0
      ? artworks.slice(0, 6)
      : localArtworks.map(localArtworkToArtwork);

  const steps = [
    {
      title: "Skicka en förfrågan",
      body: "Hittar du ett verk du gillar? Skicka en förfrågan direkt från verkets sida, så hör jag av mig.",
    },
    {
      title: "Betala enkelt",
      body: "Vi gör upp om detaljerna och du betalar tryggt via Swish eller faktura – inga konton eller kortuppgifter behövs.",
    },
    {
      title: "Få verket levererat",
      body: "Verket skickas inom Sverige, eller körs ut personligen efter överenskommelse.",
    },
  ];

  return (
    <>
      {/* Hero – mörk målerisk bakgrund, stort guldnamn.
          Full skärmhöjd först från md och uppåt; på mobil växer den med
          innehållet. */}
      <section className="hero-paint relative flex flex-col justify-center overflow-hidden md:min-h-[100svh]">
        {/* Bakgrundsbild med ken-burns + djup vignett för läsbarhet */}
        <div className="pointer-events-none absolute inset-0">
          <div className="ken-burns h-full w-full">
            <SanityImg
              image={settings?.heroImage}
              fallbackSrc={localImages.hero}
              alt=""
              width={1920}
              height={1080}
              priority
              sizes="100vw"
              className="h-full w-full object-cover opacity-55"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_30%,rgba(8,10,18,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[var(--background)]/45" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
          <h1 className="hero-name font-display text-center text-6xl leading-none sm:text-7xl md:text-[7.5rem] fade-up">
            {name}
          </h1>
          <div className="mt-6 gold-rule" />
          <p
            className="mt-5 text-center text-sm uppercase tracking-[0.4em] text-accent/85 fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {settings?.tagline ?? localProfile.tagline}
          </p>

          <div
            className="mt-14 flex justify-center fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/galleri"
              className="btn-gold px-8 py-3.5 text-sm uppercase tracking-[0.2em]"
            >
              Till galleriet
            </Link>
          </div>
        </div>

        {/* Scroll-indikator (endast när hero är full höjd, dvs md+) */}
        <div className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-accent/70 md:block">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Utvalda verk */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-3xl text-accent sm:text-4xl">
              Utvalda verk
            </h2>
            <Link
              href="/galleri"
              className="text-sm uppercase tracking-wide link-underline text-muted"
            >
              Se alla
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {displayArtworks.map((a, i) => (
              <Reveal key={a._id} delay={(i % 3) * 100}>
                <ArtworkCard artwork={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Så köper du */}
      <section>
        <div className="section-divider mx-auto max-w-6xl" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="mb-12 font-display text-3xl text-accent sm:text-4xl">
              Så köper du
            </h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="border-l-2 border-accent pl-6">
                  <p className="font-display text-4xl text-accent/40">{i + 1}</p>
                  <h3 className="mt-2 font-display text-xl text-accent">
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
