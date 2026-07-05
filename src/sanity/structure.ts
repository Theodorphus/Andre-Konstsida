import type { StructureResolver } from "sanity/structure";

// Sidinställningar som singleton, konstverken som lista
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .title("Sidinställningar")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("artwork").title("Konstverk"),
    ]);
