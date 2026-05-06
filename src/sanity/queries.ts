import { groq } from "next-sanity";

// ── Homepage ──────────────────────────────────────────────────────────────────
export const worksQuery = groq`
  *[_type == "work"] | order(order asc) {
    _id, title, tags, order,
    image { asset->{ url }, hotspot }
  }
`;

// ── Services page ─────────────────────────────────────────────────────────────
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, number, title, tag, description, deliverables,
    image { asset->{ url }, hotspot }
  }
`;

// ── Projects page ─────────────────────────────────────────────────────────────
export const projectsQuery = groq`
  *[_type == "work"] | order(order asc) {
    _id, title, category, year, tags, order,
    "slug": slug.current,
    image { asset->{ url }, hotspot }
  }
`;

// ── News page ─────────────────────────────────────────────────────────────────
export const newsQuery = groq`
  *[_type == "newsPost"] | order(order asc) {
    _id, title, category, date, readTime, featured, excerpt, body, link, order,
    image { asset->{ url }, hotspot }
  }
`;

// ── About page — milestones ────────────────────────────────────────────────────
export const milestonesQuery = groq`
  *[_type == "milestone"] | order(order asc) {
    _id, year, label, title, body
  }
`;

// ── About page — disciplines ───────────────────────────────────────────────────
export const disciplinesQuery = groq`
  *[_type == "discipline"] | order(order asc) {
    _id, title, line,
    image { asset->{ url }, hotspot }
  }
`;

// ── Site settings (contact email, socials, availability) ──────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    contactEmail, contactTagline,
    availabilityStatus, availabilityNote,
    socials
  }
`;
