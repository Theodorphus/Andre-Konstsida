# Sanity-uppkoppling – checklista

Allt i koden är klart (scheman, Studio på `/studio`, seed-script). Det som
återstår kräver inloggning och görs av dig. Tar ~10 minuter.

**OBS:** Konstbutiken ska ha ett EGET Sanity-projekt – blanda inte ihop med
författarsidans projekt (andre-roslund).

## 1. Skapa Sanity-projektet (engångs)

```bash
npx sanity@latest login      # öppnar webbläsare, logga in med Google/GitHub
npx sanity@latest init        # i projektmappen
```

Vid `init`:
- Välj **Create new project**, namn t.ex. `andre-art`
- Dataset: **production** (default, publik läsning)
- Om den frågar om att lägga till config/skriva filer: svara **nej** – vi har
  redan all kod. Du behöver bara **Project ID:t** som skrivs ut.

## 2. Fyll i .env.local

Skapa/öppna `.env.local` (utgå från `.env.local.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<project-id från steg 1>"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-10-01"
SANITY_API_WRITE_TOKEN="<token från steg 3>"
```

## 3. Skapa ett write-token

- Gå till https://sanity.io/manage → ditt projekt → **API** → **Tokens**
- **Add API token**, namn `seed`, behörighet **Editor**
- Kopiera värdet till `SANITY_API_WRITE_TOKEN` i `.env.local`
  (detta token ska INTE in i Vercel – det används bara lokalt för seed)

## 4. Fyll Sanity med grundinnehållet (engångs)

```bash
npm run seed
```

Detta skapar sidinställningarna (namn, om-text, "Så köper du"-text, kontakt,
hero- och porträttbild). Konstverken lägger André in själv via /studio.
(Idempotent – tryggt att köra om.)

## 5. CORS – tillåt sajten att läsa

I https://sanity.io/manage → **API** → **CORS origins**, lägg till:
- `http://localhost:3000`
- `https://andre-art.vercel.app` (eller vad Vercel-projektet får för URL)
- `https://andre-art.se` (när domänen är registrerad och ompekad)

## 6. Lägg env-vars i Vercel

I Vercel → projektet **andre-art** → **Settings → Environment Variables**,
lägg till (Production + Preview):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-10-01`
- `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` (för förfrågningar/kontaktformulär)

Lägg INTE in write-token i Vercel. Redeploya sedan (Deployments → … → Redeploy).

## 7. Bjud in André

I https://sanity.io/manage → **Members** → bjud in André (hans e-post) som
**Editor**. Då kan han logga in på `https://andre-art.se/studio` och själv
lägga in konstverk: titel, bild, teknik, mått, år, pris (valfritt) och status
(till salu / reserverad / såld).

---

**Bra att veta:** Sidorna läser från Sanity och faller tillbaka på det inbyggda
platshållarinnehållet om Sanity saknas/strular – sidan kan aldrig "gå sönder"
pga CMS. Ändringar i Studion slår igenom på live-sajten inom ~60 sekunder (ISR).
