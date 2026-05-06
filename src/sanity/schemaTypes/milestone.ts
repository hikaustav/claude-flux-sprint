import { defineType, defineField } from "sanity";

export const milestone = defineType({
  name: "milestone",
  title: "About: Milestone",
  type: "document",
  fields: [
    defineField({ name: "year",  title: "Year (e.g. 2016)", type: "string" }),
    defineField({ name: "label", title: "Label (e.g. [ Origin ])", type: "string" }),
    defineField({ name: "title", title: "Milestone Title", type: "string" }),
    defineField({ name: "body",  title: "Body", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
