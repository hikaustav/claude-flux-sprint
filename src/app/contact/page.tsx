import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ContactAnimations } from "./ContactAnimations";

type SiteSettings = {
  contactEmail?: string; contactTagline?: string;
  availabilityStatus?: boolean; availabilityNote?: string;
  socials?: { label?: string; url?: string }[];
};

const projectTypes = [
  "Brand Identity",
  "Web Design & Dev",
  "Photography",
  "Marketing",
  "Something else",
];

const budgets = [
  "< $5k",
  "$5k – $15k",
  "$15k – $30k",
  "$30k+",
  "Let's discuss",
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "x.com",     href: "#" },
  { label: "Facebook",  href: "#" },
  { label: "Linkedin",  href: "#" },
];

export default async function ContactPage() {
  const settings: SiteSettings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }) ?? {};

  const contactEmail      = settings.contactEmail      ?? "hikaustav.design@gmail.com";
  const contactTagline    = settings.contactTagline    ?? "Let's work together.";
  const isAvailable       = settings.availabilityStatus ?? true;
  const availabilityNote  = settings.availabilityNote  ?? "Usually replies within 24 hours";
  const socialsData       = settings.socials?.length
    ? settings.socials.map((s) => ({ label: s.label ?? "", href: s.url ?? "#" }))
    : socials;
  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <Navbar />
      <ContactAnimations />

      <div className="relative z-10 bg-[#fafafa]">

        {/* ── TOP STATEMENT ─────────────────────────────────────────────
            No hero image, no full-screen section.
            The page opens immediately into a bold editorial statement
            framed by thin rules — nothing like any other page.
        ──────────────────────────────────────────────────────────────── */}
        <div className="px-4 md:px-8 pt-[120px] md:pt-[140px]">

          <div data-header-rule className="w-full h-px bg-[#1f1f1f] origin-left" />

          {/* Label row */}
          <div className="flex items-center justify-between py-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
              [ Contact ]
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">006</p>
          </div>

          <div data-header-rule className="w-full h-px bg-[#1f1f1f]/15 origin-left" />

          {/* Statement */}
          <div
            id="contact-statement"
            className="py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <h1
              className="font-[family-name:var(--font-playfair)] italic text-[#1f1f1f] leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(44px, 8vw, 116px)" }}
            >
              {contactTagline.split("\n").map((line, i) => (
                <span key={i}>{line}{i < contactTagline.split("\n").length - 1 && <br />}</span>
              ))}
            </h1>
            <div id="contact-meta" className="flex flex-col gap-2 md:text-right shrink-0 md:pb-2">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
                {contactEmail}
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                {availabilityNote}
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                {isAvailable ? "Currently available for new projects" : "Not taking new projects right now"}</p>
            </div>
          </div>

          <div data-header-rule className="w-full h-px bg-[#1f1f1f] origin-left" />
        </div>

        {/* ── FORM + INFO ───────────────────────────────────────────────
            Left: conversational brief-style form.
            Right: contact details, socials, location.
            Two-column split on desktop, stacked on mobile.
            The "brief" framing (project type, budget, timeline) makes
            this feel like a studio intake form, not a generic contact form.
        ──────────────────────────────────────────────────────────────── */}
        <section className="px-4 md:px-8 py-[48px] md:py-[80px]">
          <div className="flex flex-col md:flex-row gap-14 md:gap-20">

            {/* ── Form ── */}
            <form
              className="flex flex-col gap-10 flex-1 min-w-0"
              action={`mailto:${contactEmail}`}
              method="POST"
              encType="text/plain"
            >
              {/* Name */}
              <div data-form-field className="flex flex-col gap-2 group">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Full name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
                    style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div data-form-field className="flex flex-col gap-2">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                />
              </div>

              {/* Project type pills */}
              <div data-form-field className="flex flex-col gap-4">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Type of project
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t, i) => (
                    <label key={t} data-pill className="cursor-pointer">
                      <input
                        type="radio"
                        name="project_type"
                        value={t}
                        defaultChecked={i === 0}
                        className="sr-only peer"
                      />
                      <span className="block font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-4 py-2.5 rounded-full border border-[#1f1f1f]/20 text-[#1f1f1f]/50 peer-checked:border-[#1f1f1f] peer-checked:text-[#1f1f1f] peer-checked:bg-[#1f1f1f] peer-checked:text-white transition-all duration-200 select-none">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget pills */}
              <div data-form-field className="flex flex-col gap-4">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Budget range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b, i) => (
                    <label key={b} data-pill className="cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        defaultChecked={i === 0}
                        className="sr-only peer"
                      />
                      <span className="block font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-4 py-2.5 rounded-full border border-[#1f1f1f]/20 text-[#1f1f1f]/50 peer-checked:border-[#1f1f1f] peer-checked:text-[#1f1f1f] peer-checked:bg-[#1f1f1f] peer-checked:text-white transition-all duration-200 select-none">
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div data-form-field className="flex flex-col gap-2">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Ideal start date / timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  placeholder="e.g. ASAP, Q3 2024, flexible…"
                  className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                />
              </div>

              {/* Message */}
              <div data-form-field className="flex flex-col gap-2">
                <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  Tell me about your project
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="The more you share, the better I can help…"
                  required
                  className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.4] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300 resize-none"
                  style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
                />
              </div>

              {/* Submit */}
              <div data-form-field>
                <button
                  type="submit"
                  className="relative inline-flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[24px] bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] text-white transition-opacity duration-200 hover:opacity-80"
                >
                  Send message
                </button>
              </div>
            </form>

            {/* ── Info sidebar ── */}
            <div className="flex flex-col gap-10 md:w-[280px] shrink-0">

              {/* Divider — mobile only, between form and info */}
              <div className="md:hidden w-full h-px bg-[#1f1f1f]/10" />

              {/* Email */}
              <div data-info-block className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  [ Email ]
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.4] hover:opacity-50 transition-opacity duration-200 break-all"
                >
                  {contactEmail}
                </a>
              </div>

              {/* Socials */}
              <div data-info-block className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  [ Socials ]
                </p>
                <div className="flex flex-col gap-2">
                  {socialsData.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="font-normal text-[#1f1f1f] text-[18px] uppercase leading-[1.1] tracking-[-0.04em] hover:opacity-40 transition-opacity duration-200"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div data-info-block className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  [ Location ]
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.4]">
                  Chicago, IL<br />Available worldwide
                </p>
              </div>

              {/* Availability status */}
              <div data-info-block className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
                  [ Status ]
                </p>
                <div className="flex items-center gap-2">
                  {/* Pulsing green dot */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? "bg-green-400" : "bg-red-400"}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? "bg-green-500" : "bg-red-500"}`} />
                  </span>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-xs uppercase leading-[1.1]">
                    {isAvailable ? "Available for projects" : "Not taking new projects"}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>{/* end scrolling content wrapper */}

      <Footer />
    </main>
  );
}
