---
name: verify
description: Bygg, starta och verifiera konstbutiken (andre-art) lokalt – recept för runtime-verifiering av ändringar.
---

# Verifiera konstbutiken

## Bygg & starta

```bash
npm run build
npx next start -p 3100   # port 3000 är ofta upptagen av annan lokal sajt (Webbdev Studio)
```

Sanity är oftast inte konfigurerat lokalt → sajten renderar platshållarinnehåll
(localContent.ts): tre "Exempelverk" med slugs `exempelverk-1..3` (3 = såld).

## Flöden värda att köra

- `/` – hero, "Utvalda verk", "Så köper du"
- `/galleri` – grid, SÅLD-badge på exempelverk-3
- `/verk/exempelverk-1` – detaljsida med förfrågningsformulär ("Förfrågan gäller: …")
- `/verk/exempelverk-3` – sålt verk: ingen form, "Detta verk är sålt"-box
- `/verk/finns-inte` – ska ge 404
- `POST /api/contact` – validering kräver att Resend-env är satt, annars 500 direkt.
  Starta med dummy-nycklar för att nå valideringsgrenarna (ingen riktig sändning görs,
  dummy-nyckel ger 502 från Resend):

  ```powershell
  $env:RESEND_API_KEY = "re_dummy"; $env:CONTACT_FROM_EMAIL = "test@example.com"; npx next start -p 3100
  ```

## Skärmdumpar

Playwright finns i devDependencies (`npx playwright install chromium` vid behov).
Kör skript från projektroten så att `import "playwright"` resolvar.
Vänta ~1,6 s efter sidladdning innan screenshot – Reveal-animationerna tonar in innehåll.

## Gotchas

- `npm run lint` kör flat config; `next build` kör INTE lint – kör den separat.
- Stoppa servern via port: `Get-NetTCPConnection -LocalPort 3100 -State Listen` → `Stop-Process`.
