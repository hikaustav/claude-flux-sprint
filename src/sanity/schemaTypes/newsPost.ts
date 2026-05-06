import { defineType, defineField } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string" }),
    defineField({ name: "category", title: "Category (e.g. Essay, Process)", type: "string" }),
    defineField({ name: "date",     title: "Date Label (e.g. Mar 2024)",    type: "string" }),
    defineField({ name: "readTime", title: "Read Time (e.g. 8 min read)",  type: "string" }),
    defineField({ name: "featured", title: "Featured Article", type: "boolean", initialValue: false }),
    defineField({ name: "excerpt",  title: "Excerpt / Short Description", type: "text", rows: 3 }),
    defineField({ name: "body",     title: "Full Body (optional)", type: "text", rows: 10 }),
    defineField({ name: "image",    title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "link",     title: "Read More URL", type: "url" }),
    defineField({ name: "order",    title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
