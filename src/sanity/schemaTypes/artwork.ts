import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "Konstverk",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Webbadress (genereras från titeln)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Bild på verket",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "extraImages",
      title: "Fler bilder (valfritt, t.ex. detaljer eller verket på vägg)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "technique",
      title: "Teknik (t.ex. Olja på duk, Akryl, Akvarell)",
      type: "string",
    }),
    defineField({
      name: "dimensions",
      title: "Mått (t.ex. 70 × 50 cm)",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "År",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "price",
      title: "Pris i kr (valfritt – lämnas tomt visas ingen prisuppgift)",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Till salu", value: "tillSalu" },
          { title: "Reserverad", value: "reserverad" },
          { title: "Såld", value: "sald" },
        ],
        layout: "radio",
      },
      initialValue: "tillSalu",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sorteringsordning",
      description: "Lägre tal visas först.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sorteringsordning",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", status: "status", media: "image" },
    prepare({ title, status, media }) {
      const statusLabel =
        status === "sald"
          ? "Såld"
          : status === "reserverad"
            ? "Reserverad"
            : "Till salu";
      return { title, subtitle: statusLabel, media };
    },
  },
});
