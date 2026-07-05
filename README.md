# André Art – konstbutik

Next.js (App Router, TypeScript, Tailwind v4) + Sanity CMS. Enkel konstbutik för
**andre-art.se** – samma tekniska grund och designspråk som författarsidan
andre-roslund.se (mörk marinblå bakgrund, guld, serif-typografi).

**Ingen betalintegration.** Köp sker via förfrågan: besökaren skickar ett
formulär från verkets sida, André gör upp om Swish/faktura och leverans manuellt.
Kan byggas på med kortbetalning senare om volymen växer.

André lägger själv in sina konstverk via Sanity Studio på `/studio`
(samma flöde som han redan lärt sig på författarsidan).

## Komma igång lokalt

```bash
npm install
npm run dev          # http://localhost:3000
```

Studio (CMS) ligger på http://localhost:3000/studio

## Koppla Sanity (görs en gång)

Sidan funkar med platshållare även utan Sanity — se `SANITY-SETUP.md` för
checklistan (nytt projekt, .env.local, seed, CORS, bjud in André).

## Innehåll (i /studio)

- **Sidinställningar** – namn, undertitel, hero-bild, porträtt, om-text,
  "Så köper du"-text, kontakt, sociala länkar. (Ett enda dokument.)
- **Konstverk** – titel, bild (+ ev. extrabilder), teknik, mått, år,
  beskrivning, pris (valfritt – lämnas tomt visas ingen prisuppgift),
  status (till salu / reserverad / såld), sorteringsordning.

Sålda verk ligger kvar i galleriet med "Såld"-märkning – bra socialt bevis.

## Köpflödet

1. Besökaren klickar på ett verk i galleriet → `/verk/[slug]`
2. Skickar en förfrågan via formuläret (Resend mejlar André, ämnesrad
   "Köpförfrågan: [verkets titel]")
3. André svarar och gör upp om betalning (Swish/faktura) och
   leverans/utkörning manuellt

## Driftsättning

1. **Nytt GitHub-repo** – klonen utgår från Andre-Roslund-repot; byt remote:
   ```bash
   git remote set-url origin https://github.com/Theodorphus/Andre-Art.git
   ```
2. **Deploya till Vercel** (frontend + Studio):
   - Importera repot i Vercel, eller kör `vercel`.
   - Lägg in samma miljövariabler i Vercel som i `.env.local`
     (Sanity-vars + `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`).
3. **Registrera & peka domänen** `andre-art.se` (Loopia, samma konto som
   andre-roslund.se):
   - Lägg till domänen i Vercel-projektet.
   - I Loopias DNS: peka A-record/CNAME enligt Vercels instruktioner.
4. Länka från andre-roslund.se till andre-art.se (André ville koppla ihop dem).

## Struktur

```
src/
  app/
    (site)/            # Publika sidor med header/footer
      page.tsx         # Startsida (hero, utvalda verk, "Så köper du")
      galleri/         # Alla verk
      verk/[slug]/     # Enskilt verk + köpförfrågan
      kontakt/         # Om konstnären + kontakt + formulär
    api/contact/       # Resend-utskick (kontakt + köpförfrågningar)
    studio/            # Sanity Studio (/studio)
    layout.tsx         # Typsnitt + global metadata
    globals.css        # Designsystem (färger, typsnitt)
  components/          # Header, Footer, ArtworkCard, SanityImg, ContactForm
  lib/                 # Platshållarinnehåll + verk-hjälpare
  sanity/              # Klient, scheman, queries, env
```
