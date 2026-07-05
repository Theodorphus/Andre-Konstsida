/**
 * Seed-script: fyller Sanity med grundinnehållet (sidinställningar, om-text,
 * kontaktuppgifter, hero- och porträttbild) så sajten ser färdig ut direkt.
 * Konstverken lägger André in själv via /studio.
 *
 * Körs EN gång efter att Sanity-projektet skapats:
 *   1. Skapa ett write-token i sanity.io/manage (API → Tokens, behörighet "Editor")
 *   2. Lägg i .env.local:
 *        NEXT_PUBLIC_SANITY_PROJECT_ID="..."
 *        NEXT_PUBLIC_SANITY_DATASET="production"
 *        SANITY_API_WRITE_TOKEN="..."
 *   3. node scripts/seed.mjs
 *
 * Idempotent: använder createOrReplace + deterministiska _id, så att köra om
 * scriptet skriver bara över samma dokument (skapar inga dubbletter).
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config as loadEnv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Ladda .env.local
loadEnv({ path: join(root, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder") {
  console.error("✗ Saknar NEXT_PUBLIC_SANITY_PROJECT_ID i .env.local");
  process.exit(1);
}
if (!token) {
  console.error("✗ Saknar SANITY_API_WRITE_TOKEN i .env.local (skapa i sanity.io/manage)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const imagesDir = join(root, "public", "images");

/** Laddar upp en bild från /public/images och returnerar en image-referens. */
async function uploadImage(filename) {
  const path = join(imagesDir, filename);
  if (!existsSync(path)) {
    console.warn(`  ⚠ Hittade inte bild: ${filename} (hoppar över)`);
    return undefined;
  }
  const asset = await client.assets.upload("image", readFileSync(path), {
    filename,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// Hjälpare: gör textstycken till Portable Text-block
const block = (text, style = "normal") => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2, 10),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
});

// Platshållartext tills André skriver sin egen (hämtad från hans egna texter)
const aboutText = [
  block("Jag är en livsnjutare som drivs av konst, kreativitet och det skrivna ordet."),
  block("Mitt liv rör sig mellan kontraster. Ena dagen suger jag in Stockholms pulserande tempo, för att nästa dag finna det totala lugnet i Kungsör. Det är där, på kajkanten med dinglande ben eller framför ett staffli, som jag sorterar alla intryck och idéer som snurrar i skallen."),
  block("Mitt eget konstintresse blommar extra mycket under sommarmånaderna då jag gärna besöker sommarutställningar. Jag inspireras enormt av att se alla fantastiska verk av landets många duktiga amatörmålare."),
];

const buyingInfo =
  "Intresserad av ett verk? Skicka en förfrågan via formuläret så återkommer jag så snart jag kan. " +
  "Betalning sker enkelt via Swish eller faktura, och verket levereras inom Sverige – " +
  "eller körs ut personligen efter överenskommelse.";

async function run() {
  console.log(`Seedar Sanity-projekt "${projectId}" (dataset: ${dataset})...\n`);

  console.log("Laddar upp bilder och skapar sidinställningar...");
  const [heroImage, portrait] = await Promise.all([
    uploadImage("Hero.png"),
    uploadImage("Portrait-andre.jpg"),
  ]);
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "André Roslund",
    tagline: "Konst",
    aboutHeading: "Om konstnären",
    aboutText,
    buyingInfo,
    email: "andreroslund@outlook.com",
    phone: "076-286 81 43",
    authorSiteUrl: "https://www.andre-roslund.se",
    youtubeUrl: "https://www.youtube.com/@andreroslund1366",
    facebookUrl: "https://www.facebook.com/profile.php?id=100074433578866",
    ...(heroImage ? { heroImage } : {}),
    ...(portrait ? { portrait } : {}),
  });
  console.log("  ✓ Sidinställningar");

  console.log("\n✓ Klart! André kan logga in på /studio och lägga in sina konstverk.");
}

run().catch((err) => {
  console.error("\n✗ Seed misslyckades:", err.message || err);
  process.exit(1);
});
