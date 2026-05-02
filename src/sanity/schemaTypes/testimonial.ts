import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client Name", type: "string" }),
    defineField({ name: "logo", title: "Company Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoWidth", title: "Logo Display Width (px)", type: "number" }),
    defineField({ name: "logoHeight", title: "Logo Display Height (px)", type: "number" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
    defineField({ name: "rotateDeg", title: "Card Rotation (degrees)", type: "number" }),
    defineField({ name: "posLeft", title: "Desktop Position Left (vw string, e.g. 7.08vw)", type: "string" }),
    defineField({ name: "posTop", title: "Desktop Position Top (px)", type: "number" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
