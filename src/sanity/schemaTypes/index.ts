import { type SchemaTypeDefinition } from "sanity";

import { artwork } from "./artwork";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, artwork],
};
