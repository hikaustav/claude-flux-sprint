import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ContactAnimations } from "./ContactAnimations";
import { ContactForm } from "./ContactForm";

type SiteSettings = {
  contactEmail?: string; contactTagline?: string;
  availabilityStatus?: boolean; availabilityNote?: string;
  socials?: { label?: string; url?: string }[];
};

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
            <ContactForm contactEmail={contactEmail} />

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
