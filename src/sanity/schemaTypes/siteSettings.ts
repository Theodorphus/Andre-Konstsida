import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Sidinställningar",
  type: "document",
  // Singleton – endast ett dokument av denna typ
  fields: [
    defineField({
      name: "name",
      title: "Namn (visas stort på startsidan)",
      type: "string",
      initialValue: "André Roslund",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Undertitel / yrkesroll",
      type: "string",
      initialValue: "Konst",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-bakgrund (startsidan, mörk bild)",
      description:
        "Valfri bakgrundsbild bakom namnet. Lämnas tom används en mörk målerisk bakgrund.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutHeading",
      title: "Rubrik – Om konstnären",
      type: "string",
      initialValue: "Om konstnären",
    }),
    defineField({
      name: "aboutText",
      title: "Text – Om konstnären",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "portrait",
      title: "Porträtt / bild på dig",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "buyingInfo",
      title: "Så köper du – kort text om hur ett köp går till",
      description:
        "Visas på verksidorna. T.ex: skicka en förfrågan så återkommer jag, betalning via Swish eller faktura, leverans inom Sverige eller utkörning.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "Kontakt – e-post",
      type: "string",
      initialValue: "andreroslund@outlook.com",
    }),
    defineField({
      name: "phone",
      title: "Kontakt – telefon",
      type: "string",
    }),
    defineField({
      name: "authorSiteUrl",
      title: "Länk till författarsidan (andre-roslund.se)",
      type: "url",
      initialValue: "https://www.andre-roslund.se",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube-länk",
      type: "url",
      initialValue: "https://www.youtube.com/@andreroslund1366",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram-länk",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook-länk",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Sidinställningar" }),
  },
});
