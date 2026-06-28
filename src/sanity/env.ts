/**
 * Sanity-miljövariabler. Saknas de (t.ex. innan CMS:t är uppkopplat, eller i
 * en deploy utan env-vars) faller vi tillbaka på säkra platshållarvärden så att
 * bygget lyckas. Sidan renderar då med lokalt platshållarinnehåll – Sanity-
 * hämtningarna fångas och ignoreras i queries.ts (safeFetch).
 *
 * Sätt riktiga värden i .env.local lokalt och i Vercels Environment Variables.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// "placeholder" är ett giltigt projektId-format; hämtningar mot det misslyckas
// tyst och faller tillbaka på lokalt innehåll.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

/** Sant först när ett riktigt Sanity-projekt är konfigurerat. */
export const isSanityConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";
