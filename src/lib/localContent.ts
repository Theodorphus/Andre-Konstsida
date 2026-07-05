/**
 * Tillfälligt, lokalt innehåll som visas tills Sanity är uppkopplat och André
 * fyller på med sina verk själv. Bilderna ligger i /public/images. När
 * motsvarande fält finns i Sanity används det istället.
 */

export const localImages = {
  hero: "/images/Hero.png",
  portrait: "/images/Portrait-andre.jpg",
} as const;

/** Kontakt- och profiluppgifter (platshållare tills Sanity fylls). */
export const localProfile = {
  name: "André Roslund",
  tagline: "Konst",
  aboutHeading: "Om konstnären",
  aboutIntro: [
    "Jag är en livsnjutare som drivs av konst, kreativitet och det skrivna ordet.",
    "Mitt liv rör sig mellan kontraster. Ena dagen suger jag in Stockholms pulserande tempo, för att nästa dag finna det totala lugnet i Kungsör. Det är där, på kajkanten med dinglande ben eller framför ett staffli, som jag sorterar alla intryck och idéer som snurrar i skallen.",
    "Mitt eget konstintresse blommar extra mycket under sommarmånaderna då jag gärna besöker sommarutställningar. Jag inspireras enormt av att se alla fantastiska verk av landets många duktiga amatörmålare.",
  ],
  email: "andreroslund@outlook.com",
  phone: "076-286 81 43",
  authorSiteUrl: "https://www.andre-roslund.se",
  facebookUrl: "https://www.facebook.com/profile.php?id=100074433578866",
  youtubeUrl: "https://www.youtube.com/@andreroslund1366",
} as const;

/** Så köper du – visas på verksidorna tills André skriver egen text i Sanity. */
export const localBuyingInfo =
  "Intresserad av ett verk? Skicka en förfrågan via formuläret så återkommer jag så snart jag kan. " +
  "Betalning sker enkelt via Swish eller faktura, och verket levereras inom Sverige – " +
  "eller körs ut personligen efter överenskommelse.";

/**
 * Platshållarverk som visar galleriets layout tills Sanity har innehåll.
 * Bilderna är verk André lagt in i /public/images/Tavlor. Titlar och teknik är
 * generiska; mått, pris och konstnär lämnas tomma tills André kompletterar i
 * Studio. (Flera dukar är signerade av andra konstnärer – stäm av innan lansering.)
 */
export interface LocalArtwork {
  _id: string;
  title: string;
  slug: string;
  imageSrc: string;
  technique?: string;
  dimensions?: string;
  year?: string;
  description?: string;
  status: "tillSalu" | "reserverad" | "sald";
}

const placeholderDescription =
  "Original ur Andrés samling. Kontakta gärna för mer information om mått, skick och pris – " +
  "skicka en förfrågan så återkommer jag.";

export const localArtworks: LocalArtwork[] = [
  {
    _id: "local-verk-1",
    title: "Havsmotiv I",
    slug: "havsmotiv-1",
    imageSrc: "/images/Tavlor/1.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-2",
    title: "Havsmotiv II",
    slug: "havsmotiv-2",
    imageSrc: "/images/Tavlor/2.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-3",
    title: "Havsmotiv III",
    slug: "havsmotiv-3",
    imageSrc: "/images/Tavlor/3.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-4",
    title: "Läsande man",
    slug: "lasande-man",
    imageSrc: "/images/Tavlor/4.jpg",
    technique: "Litografi",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-5",
    title: "Havsmotiv IV",
    slug: "havsmotiv-4",
    imageSrc: "/images/Tavlor/5.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-6",
    title: "Havsmotiv V",
    slug: "havsmotiv-5",
    imageSrc: "/images/Tavlor/6.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-7",
    title: "Havsmotiv VI",
    slug: "havsmotiv-6",
    imageSrc: "/images/Tavlor/7.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
  {
    _id: "local-verk-8",
    title: "Porträtt",
    slug: "portratt",
    imageSrc: "/images/Tavlor/8.jpg",
    technique: "Olja på duk",
    description: placeholderDescription,
    status: "tillSalu",
  },
];

/**
 * Samlingen – verk av den samiske konstnären och slöjdaren Tore Sunna.
 * Dessa är INTE till salu; de visas på en egen sida (/samlingen) ur Andrés
 * privata samling. Bilderna ligger i /public/images/Tore-Sunna.
 */
export interface CollectionItem {
  _id: string;
  title: string;
  imageSrc: string;
  technique?: string;
}

export const collectionArtist = {
  name: "Tore Sunna",
  intro:
    "Ur min privata samling visar jag här verk av den samiske konstnären och slöjdaren " +
    "Tore Sunna. Sedan många år hyser jag en djup beundran för det samiska hantverket, och " +
    "dessa verk är inte till salu – de visas för att dela glädjen i en enastående slöjdtradition.",
} as const;

export const localCollection: CollectionItem[] = [
  {
    _id: "sunna-1",
    title: "Dosa i masurbjörk med benintarsia",
    imageSrc: "/images/Tore-Sunna/1.jpg",
    technique: "Sameslöjd – trä och ben",
  },
  {
    _id: "sunna-2",
    title: "Kåsa med graverat skaft",
    imageSrc: "/images/Tore-Sunna/2.jpg",
    technique: "Sameslöjd – masurbjörk",
  },
  {
    _id: "sunna-3",
    title: "Träflaska med benornament",
    imageSrc: "/images/Tore-Sunna/3.jpg",
    technique: "Sameslöjd – trä och ben",
  },
  {
    _id: "sunna-4",
    title: "Ask i ben med graverad dekor",
    imageSrc: "/images/Tore-Sunna/4.jpg",
    technique: "Sameslöjd – ben",
  },
  {
    _id: "sunna-5",
    title: "Skål med lock",
    imageSrc: "/images/Tore-Sunna/5.jpg",
    technique: "Sameslöjd – masurbjörk och ben",
  },
  {
    _id: "sunna-6",
    title: "Fältflaska med bärrem",
    imageSrc: "/images/Tore-Sunna/6.jpg",
    technique: "Sameslöjd – trä och ben",
  },
  {
    _id: "sunna-7",
    title: "Kniv med slida i ben",
    imageSrc: "/images/Tore-Sunna/7.jpg",
    technique: "Sameslöjd – ben och stål",
  },
  {
    _id: "sunna-8",
    title: "Renskötare (1994)",
    imageSrc: "/images/Tore-Sunna/8.jpg",
    technique: "Målning",
  },
];
