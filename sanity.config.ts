import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("H.Studio")
          .items([

            // ── Home ──────────────────────────────────────────────
            S.listItem()
              .title("Home")
              .child(
                S.list().title("Home").items([
                  S.documentTypeListItem("siteSettings").title("Site Settings"),
                  S.documentTypeListItem("testimonial").title("Testimonials"),
                ])
              ),

            S.divider(),

            // ── About ─────────────────────────────────────────────
            S.listItem()
              .title("About")
              .child(
                S.list().title("About").items([
                  S.documentTypeListItem("milestone").title("Journey Milestones"),
                  S.documentTypeListItem("discipline").title("Disciplines"),
                ])
              ),

            S.divider(),

            // ── Services ──────────────────────────────────────────
            S.listItem()
              .title("Services")
              .child(
                S.documentTypeList("service").title("Services")
              ),

            S.divider(),

            // ── Projects ──────────────────────────────────────────
            S.listItem()
              .title("Projects")
              .child(
                S.documentTypeList("work").title("Projects")
              ),

            S.divider(),

            // ── News ──────────────────────────────────────────────
            S.listItem()
              .title("News")
              .child(
                S.documentTypeList("newsPost").title("News Posts")
              ),

          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
