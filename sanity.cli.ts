import { defineCliConfig } from "sanity/cli";

// Nytt Sanity-projekt för konstbutiken – fyll i projectId från .env.local
// (sätts efter `npx sanity init`, se SANITY-SETUP.md).
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
