import { defineType, defineField } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work / Project",
  type: "document",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string" }),
    defineField({ name: "category", title: "Category (e.g. Brand Identity)", type: "string" }),
    defineField({ name: "year",     title: "Year",     type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
