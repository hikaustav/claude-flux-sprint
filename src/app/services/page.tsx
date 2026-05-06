import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { MagneticButton } from "@/app/components/MagneticButton";
import { Footer } from "@/app/components/Footer";
import { ServicesAnimations } from "./ServicesAnimations";

const fallbackImg1 = "https://www.figma.com/api/mcp/asset/255ec9fe-fd51-41fd-9ab7-7a3695f81086";
const fallbackImg2 = "https://www.figma.com/api/mcp/asset/3f5e3ebd-3932-44a8-b8bb-81ff953ff0d1";
const fallbackImg3 = "https://www.figma.com/api/mcp/asset/a96bfd70-bfd2-4f8f-8d09-41d05cc5dd00";
const fallbackImg4 = "https://www.figma.com/api/mcp/asset/8ba0eb2f-9560-4f37-a67b-b4e0651da339";
const fallbackImgs = [fallbackImg1, fallbackImg2, fallbackImg3, fallbackImg4];

const staticServices = [
  {
    num: "01", tag: "[ Identity ]", title: "Brand Discovery",
    description: "A brand is more than a mark — it's a promise made consistently across every touchpoint. I work through research, strategy, and visual exploration to build identity systems that are as rigorous as they are beautiful.",
    deliverables: ["Logo & identity system", "Brand guidelines document", "Typography & colour palette", "Brand voice & messaging", "Stationery & digital collateral"],
    img: fallbackImg1,
  },
  {
    num: "02", tag: "[ Digital ]", title: "Web Design & Dev",
    description: "From the first wireframe to the deployed product, I handle both the design and the engineering. No handoff friction, no lost intent. The site you see in the mockup is the site your audience gets.",
    deliverables: ["UX research & wireframing", "High-fidelity UI design", "Frontend development", "CMS integration & content setup", "Performance & accessibility audit"],
    img: fallbackImg2,
  },
  {
    num: "03", tag: "[ Strategy ]", title: "Marketing",
    description: "Good creative without a clear message is just decoration. I help position brands so their communications land with intention — whether that's a launch campaign, an ongoing content system, or a full channel strategy.",
    deliverables: ["Positioning & messaging strategy", "Campaign concept & art direction", "Content direction & copywriting", "Social media systems", "Analytics setup & reporting"],
    img: fallbackImg3,
  },
  {
    num: "04", tag: "[ Visual ]", title: "Photography",
    description: "Eight years of shooting has taught me that great photography isn't found — it's built. From pre-production through post, I approach every shoot as a creative director first and a photographer second.",
    deliverables: ["Pre-production & shot planning", "On-location or studio direction", "Full post-production editing", "Web & print-ready deliverables", "Full usage licensing"],
    img: fallbackImg4,
  },
];

type SanityService = {
  _id: string; number: number; title: string; tag?: string;
  description?: string; deliverables?: string[];
  image?: { asset?: { url: string } };
};

const steps = [
  {
    num: "01",
    title: "Discovery",
    body: "A focused brief and research sprint. I ask the questions most designers skip. We leave with a shared definition of success.",
  },
  {
    num: "02",
    title: "Direction",
    body: "Two or three distinct creative directions — not infinite options. Each is opinionated, each is defensible. You choose one.",
  },
  {
    num: "03",
    title: "Execution",
    body: "Deep, heads-down work. Regular check-ins, no surprises. I move fast but never skip the detail that makes the difference.",
  },
  {
    num: "04",
    title: "Delivery",
    body: "Packaged for hand-off with everything you need to use it confidently — files, guidelines, and a walkthrough.",
  },
];

export default async function ServicesPage() {
  const sanityServices: SanityService[] = await client.fetch(servicesQuery, {}, { next: { revalidate: 60 } });

  const services = sanityServices.length
    ? sanityServices.map((s, i) => ({
        num: String(s.number ?? i + 1).padStart(2, "0"),
        tag: s.tag ?? staticServices[i]?.tag ?? "[ Service ]",
        title: s.title,
        description: s.description ?? staticServices[i]?.description ?? "",
        deliverables: s.deliverables ?? staticServices[i]?.deliverables ?? [],
        img: s.image?.asset?.url ?? fallbackImgs[i] ?? fallbackImg1,
      }))
    : staticServices;
  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <Navbar />
      <ServicesAnimations />

      <div className="relative z-10 bg-[#fafafa]">

        {/* ── HERO — newspaper-style typographic grid ──────────────────
            No background image. Pure structured typography.
            Feels like an editorial index page, nothing like
            the homepage hero or the about split-screen.
        ──────────────────────────────────────────────────────────── */}
        <section className="px-4 md:px-8 pt-[120px] md:pt-[140px] pb-[48px] md:pb-[80px] flex flex-col gap-0">

          {/* Top rule */}
          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />

          {/* Top meta row */}
          <div data-hero-line className="flex items-center justify-between py-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
              [ Services ]
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">
              003
            </p>
          </div>

          {/* Mid rule */}
          <div data-hero-rule className="w-full h-px bg-[#1f1f1f]/20 origin-left" />

          {/* Main headline — desktop: left number col + right headline; mobile: stacked */}
          <div className="py-8 md:py-14">

            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-3">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-[11px] uppercase leading-[1.1] tracking-[0.12em]">
                Brand · Web · Photo · Marketing
              </p>
              <h1
                data-hero-line
                className="font-black text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.05em]"
                style={{ fontSize: "clamp(48px, 16vw, 88px)" }}
              >
                Built<br />
                <em className="font-[family-name:var(--font-playfair)] not-italic italic font-normal text-[#1f1f1f]/50">to move</em><br />
                people.
              </h1>
            </div>

            {/* Desktop — two columns */}
            <div className="hidden md:flex items-stretch gap-0">

              {/* Left col — number + discipline tags */}
              <div data-hero-line className="flex flex-col justify-between pr-12 shrink-0" style={{ width: "22vw" }}>
                <span
                  className="font-black text-[#1f1f1f]/08 leading-none tracking-[-0.06em] select-none"
                  style={{ fontSize: "clamp(80px, 14vw, 200px)", color: "rgba(31,31,31,0.06)" }}
                >
                  03
                </span>
                <div className="flex flex-col gap-2 pb-2">
                  {["Brand Identity", "Web Design & Dev", "Photography", "Marketing"].map((d) => (
                    <p key={d} className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.06em]">
                      — {d}
                    </p>
                  ))}
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-[#1f1f1f]/15 shrink-0 self-stretch" />

              {/* Right col — headline */}
              <div className="flex flex-col justify-end pl-12 flex-1">
                <h1
                  data-hero-line
                  className="font-black text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.06em]"
                  style={{ fontSize: "clamp(64px, 9.5vw, 138px)" }}
                >
                  Built
                </h1>
                <h1
                  data-hero-line
                  className="font-[family-name:var(--font-playfair)] italic font-normal text-[#1f1f1f]/45 leading-[0.92] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(64px, 9.5vw, 138px)" }}
                >
                  to move
                </h1>
                <div className="flex items-end gap-6">
                  <h1
                    data-hero-line
                    className="font-black text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.06em]"
                    style={{ fontSize: "clamp(64px, 9.5vw, 138px)" }}
                  >
                    people.
                  </h1>
                  <p
                    data-hero-line
                    className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/35 text-[11px] uppercase leading-[1.4] tracking-[0.06em] mb-3"
                  >
                    Four disciplines,<br />one creative practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div data-hero-rule className="w-full h-px bg-[#1f1f1f]/20 origin-left" />

          {/* Stats strip */}
          <div data-hero-line className="grid grid-cols-2 md:flex md:items-center md:justify-between py-4 gap-x-4 gap-y-5 md:gap-4">
            {[
              { label: "Disciplines", value: "4" },
              { label: "Years active", value: "8+" },
              { label: "Projects delivered", value: "120+" },
              { label: "Based in", value: "Chicago, IL" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[10px] uppercase leading-[1.1]">
                  {s.label}
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom rule */}
          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />
        </section>

        {/* ── SERVICE STRIPS ───────────────────────────────────────────
            Each service is a full-width horizontal strip.
            Image fills one half, detailed content fills the other.
            Alternates: odd = image left, even = image right.
            Nothing like the homepage rows or the about grid.
        ──────────────────────────────────────────────────────────── */}
        {services.map((s, i) => {
          const reversed = i % 2 !== 0;
          return (
            <div
              key={s.num}
              data-service-strip
              data-reversed={reversed ? "true" : "false"}
              className="overflow-hidden border-b border-[#1f1f1f]/10"
            >
              {/* Strip header — full width label bar */}
              <div className="px-4 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-[#1f1f1f]/10">
                <div className="flex items-center gap-4">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                    {s.num}
                  </p>
                  <div data-strip-rule className="hidden md:block h-px bg-[#1f1f1f]/15 w-12 origin-left" />
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                    {s.tag}
                  </p>
                </div>
                <MagneticButton href="#contact">Start a project</MagneticButton>
              </div>

              {/* Strip body — image + content, alternating sides */}
              <div className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>

                {/* Image */}
                <div className="md:w-1/2 overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                  <img
                    data-strip-img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div
                  data-strip-content
                  className={`md:w-1/2 flex flex-col justify-between gap-8 px-4 md:px-12 py-10 md:py-14 ${reversed ? "md:border-r" : "md:border-l"} border-[#1f1f1f]/10`}
                >
                  <div className="flex flex-col gap-5">
                    <h2
                      className="font-black italic text-[#1f1f1f] uppercase leading-[0.9] tracking-[-0.04em]"
                      style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
                    >
                      {s.title}
                    </h2>
                    <p className="text-[#1f1f1f]/70 text-[14px] font-normal leading-[1.5] tracking-[-0.02em] max-w-[460px]">
                      {s.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="flex flex-col gap-3">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">
                      [ Deliverables ]
                    </p>
                    <ul className="flex flex-col gap-2">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          data-deliverable
                          className="flex items-center gap-3 text-[#1f1f1f] text-[13px] font-normal leading-[1.3] tracking-[-0.02em]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#1f1f1f]/30 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── PROCESS ─────────────────────────────────────────────────
            Four numbered steps on a tinted background.
            Horizontal layout on desktop with a drawn connecting line.
            Completely different from anything on the homepage or about page.
        ──────────────────────────────────────────────────────────── */}
        <section id="process-section" className="bg-[#f3f3f3] px-4 md:px-8 py-[60px] md:py-[100px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">004</p>
              <div className="w-px h-4 bg-[#1f1f1f]/30" />
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ How it works ]</p>
            </div>
            <p
              className="font-light text-[#1f1f1f]/10 uppercase tracking-[-0.08em] leading-none select-none hidden md:block"
              style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
            >
              Process
            </p>
          </div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div
              id="process-line"
              className="hidden md:block absolute top-[28px] left-0 right-0 h-px bg-[#1f1f1f]/15 origin-left"
            />

            <div className="flex flex-col md:flex-row gap-10 md:gap-6">
              {steps.map((step) => (
                <div key={step.num} data-process-step className="flex-1 flex flex-col gap-4 md:gap-6">
                  {/* Number — sits on top of the line on desktop */}
                  <div className="relative flex items-center gap-4 md:block">
                    <div className="relative z-10 w-14 h-14 rounded-full border border-[#1f1f1f]/15 bg-[#f3f3f3] flex items-center justify-center shrink-0">
                      <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
                        {step.num}
                      </p>
                    </div>
                    {/* Mobile: title beside the circle */}
                    <h3
                      className="md:hidden font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em]"
                      style={{ fontSize: "clamp(22px, 5vw, 28px)" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  {/* Desktop: title below the circle */}
                  <h3
                    className="hidden md:block font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em] mt-6"
                    style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#1f1f1f]/60 text-[13px] font-normal leading-[1.5] tracking-[-0.02em]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ─────────────────────────────────────────────────
            A tight, confident full-width invitation before the footer.
            Black background, large Playfair italic question, single button.
        ──────────────────────────────────────────────────────────── */}
        <section data-nav-dark className="bg-black px-4 md:px-8 py-[60px] md:py-[80px] flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            className="font-[family-name:var(--font-playfair)] italic text-white leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
          >
            Ready to build<br />something real?
          </p>
          <div className="flex flex-col gap-3 shrink-0">
            <p className="font-[family-name:var(--font-geist-mono)] text-white/40 text-xs uppercase leading-[1.1]">
              [ Let&apos;s get started ]
            </p>
            <MagneticButton href="#contact" variant="light">Start a project</MagneticButton>
          </div>
        </section>

      </div>{/* end scrolling content wrapper */}

      {/* ── Footer — sticky at bottom, revealed as content scrolls away ── */}
      <Footer />
    </main>
  );
}
