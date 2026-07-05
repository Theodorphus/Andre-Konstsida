import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

interface Props {
  image?: SanityImage;
  /** Lokal fallback-bild (t.ex. /images/Hero.png) som används om Sanity saknar bild. */
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Behåll bildens egna proportioner istället för att beskära till width/height.
   * Används för konstverk där hela målningen ska synas.
   */
  noCrop?: boolean;
}

/**
 * Renderar en Sanity-bild om den finns, annars en lokal fallback-bild,
 * annars en diskret platshållare. Gör att sidan ser bra ut både med
 * tillfälligt material och innan André laddat upp egna bilder i Sanity.
 */
export default function SanityImg({
  image,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  noCrop,
}: Props) {
  const fromSanity = !!image?.asset;
  const src = fromSanity
    ? noCrop
      ? urlForImage(image!).width(width).fit("max").url()
      : urlForImage(image!).width(width).height(height).url()
    : fallbackSrc;

  // I noCrop-läge vill vi behålla bildens egna proportioner. För Sanity-bilder
  // ger fit("max") redan rätt mått. För en lokal fallback (platshållarverk innan
  // Sanity fyllts) känner vi inte till måtten, så vi låter webbläsaren bestämma
  // höjden utifrån filen istället för att tvinga fram width/height-förhållandet.
  if (src && noCrop && !fromSanity) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-auto w-full ${className ?? ""}`}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#141a28] text-accent/50 ${className ?? ""}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className="font-display text-sm tracking-widest uppercase">
          Bild
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={noCrop ? `h-auto w-full ${className ?? ""}` : className}
      sizes={sizes}
      priority={priority}
    />
  );
}
