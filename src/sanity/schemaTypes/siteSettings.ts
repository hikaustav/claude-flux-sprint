import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "studioName",    title: "Studio Name",    type: "string" }),
    defineField({ name: "heroGreeting",  title: "Hero Greeting",  type: "string" }),
    defineField({ name: "heroName",      title: "Hero Name",      type: "string" }),
    defineField({ name: "heroBio",       title: "Hero Bio",       type: "text", rows: 4 }),
    defineField({ name: "heroImage",     title: "Hero Background Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "aboutImage",    title: "About Portrait",        type: "image", options: { hotspot: true } }),
    defineField({ name: "fullWidthImage",title: "Full-Width Image",      type: "image", options: { hotspot: true } }),
    defineField({ name: "yearsInIndustry", title: "Years in Industry Label", type: "string" }),
    defineField({ name: "aboutTitle",    title: "About Title Lines", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "aboutBody",     title: "About Body Text",   type: "text", rows: 6 }),
    // Contact
    defineField({ name: "contactEmail",     title: "Contact Email",   type: "string" }),
    defineField({ name: "contactTagline",   title: "Contact Page Tagline (large italic heading)", type: "string" }),
    defineField({ name: "availabilityStatus", title: "Available for New Projects", type: "boolean", initialValue: true }),
    defineField({ name: "availabilityNote",   title: "Availability Note (e.g. Usually replies within 24 hours)", type: "string" }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url",   type: "url" }),
          ],
        }),
      ],
    }),
  ],
});
