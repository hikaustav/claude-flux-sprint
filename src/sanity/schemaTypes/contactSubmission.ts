import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.email().required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
    }),
    defineField({
      name: "budget",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Project Message",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(5000),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewed", value: "reviewed" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "website-contact-form",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      submittedAt: "submittedAt",
    },
    prepare({ title, subtitle, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : "No date";

      return {
        title: title || "Untitled submission",
        subtitle: `${subtitle || "No email"} - ${date}`,
      };
    },
  },
});
