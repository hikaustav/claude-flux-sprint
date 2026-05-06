import { defineType, defineField } from "sanity";

export const discipline = defineType({
  name: "discipline",
  title: "About: Discipline",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (e.g. Brand Identity)", type: "string" }),
    defineField({ name: "line",  title: "One-line descriptor",         type: "string" }),
    defineField({ name: "image", title: "Hover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
