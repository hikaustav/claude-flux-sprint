import { client } from "@/sanity/lib/client";
import { milestonesQuery, disciplinesQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { MagneticButton } from "@/app/components/MagneticButton";
import { Footer } from "@/app/components/Footer";
import { AboutAnimations } from "./AboutAnimations";

type SanityMilestone  = { _id: string; year?: string; label?: string; title?: string; body?: string };
type SanityDiscipline = { _id: string; title?: string; line?: string; image?: { asset?: { url: string } } };

const portraitImg  = "https://www.figma.com/api/mcp/asset/4a142a70-e9cd-45ba-a039-049153adb5c9";
const discImg1     = "https://www.figma.com/api/mcp/asset/255ec9fe-fd51-41fd-9ab7-7a3695f81086";
const discImg2     = "https://www.figma.com/api/mcp/asset/3f5e3ebd-3932-44a8-b8bb-81ff953ff0d1";
const discImg3     = "https://www.figma.com/api/mcp/asset/a96bfd70-bfd2-4f8f-8d09-41d05cc5dd00";
const discImg4     = "https://www.figma.com/api/mcp/asset/8ba0eb2f-9560-4f37-a67b-b4e0651da339";
const discImg5     = "https://www.figma.com/api/mcp/asset/7cea0077-997a-45da-979a-1479eb0a1bec";
const discImg6     = "https://www.figma.com/api/mcp/asset/3d848365-59c3-4c9a-b569-a6b7a3f81eae";

const staticMilestones = [
  { year: "2016", label: "[ Origin ]",      title: "Going independent",        body: "Left a senior role at a Chicago agency to build something intentional. Started taking only projects I believed in — smaller volume, much deeper work." },
  { year: "2019", label: "[ Expansion ]",   title: "Photography meets brand",   body: "Merged editorial photography practice with brand identity work. Discovered that shooting a brand's world first radically changed how I designed for it." },
  { year: "2021", label: "[ Recognition ]", title: "Three consecutive awards",  body: "Received recognition from Awwwards, D&AD, and the Art Directors Club in the same cycle — validating the cross-disciplinary approach." },
  { year: "2024", label: "[ Now ]",         title: "H.Studio, refined",         body: "Operating as a focused studio of one, with a tight network of collaborators. Long-term partnerships over one-off projects. Quality over throughput." },
];

const staticDisciplines = [
  { num: "01", title: "Brand Identity",      line: "Marks, systems & brand worlds that last a decade.", img: discImg1 },
  { num: "02", title: "Web Design & Dev",     line: "From concept to shipped product, end-to-end.",      img: discImg2 },
  { num: "03", title: "Art Direction",        line: "Visual language that shapes how a brand is seen.",   img: discImg3 },
  { num: "04", title: "Photography",          line: "Editorial and campaign work across two continents.", img: discImg4 },
  { num: "05", title: "Marketing Strategy",   line: "Positioning and messaging that earns attention.",    img: discImg5 },
  { num: "06", title: "Motion & Interaction", line: "Movement as a design material, not decoration.",     img: discImg6 },
];

const statementWords = [
  "I", "believe", "the", "most", "powerful", "design", "is", "the",
  "kind", "that", "disappears", "—", "leaving", "only", "the", "feeling.",
];

export default async function AboutPage() {
  const [sanityMilestones, sanityDisciplines] = await Promise.all([
    client.fetch<SanityMilestone[]>(milestonesQuery,  {}, { next: { revalidate: 60 } }),
    client.fetch<SanityDiscipline[]>(disciplinesQuery, {}, { next: { revalidate: 60 } }),
  ]);

  const milestones = sanityMilestones.length
    ? sanityMilestones.map((m) => ({ year: m.year ?? "", label: m.label ?? "", title: m.title ?? "", body: m.body ?? "" }))
    : staticMilestones;

  const fallbackDiscImgs = [discImg1, discImg2, discImg3, discImg4, discImg5, discImg6];
  const disciplines = sanityDisciplines.length
    ? sanityDisciplines.map((d, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: d.title ?? "",
        line:  d.line  ?? "",
        img:   d.image?.asset?.url ?? fallbackDiscImgs[i % fallbackDiscImgs.length],
      }))
    : staticDisciplines;
  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <Navbar />
      <AboutAnimations />

      <div className="relative z-10 bg-[#fafafa]">

      {/* ── 1. SPLIT HERO ─────────────────────────────────────────────
          Portrait fills the entire right column edge-to-edge.
          Identity content lives on the left, vertically distributed.
          Nothing like the homepage's full-screen background parallax.
      ──────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col md:flex-row">

        {/* Left: identity content */}
        <div className="flex flex-col justify-between px-4 md:px-8 pt-[100px] pb-10 md:py-[120px] md:w-1/2 gap-12 md:gap-0">
          {/* Top */}
          <div data-hero-item className="flex items-center justify-between">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
              [ About me ]
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">001</p>
          </div>

          {/* Middle: roles stacked */}
          <div className="flex flex-col gap-3">
            {[
              { text: "Creative",  style: "font-light  italic font-[family-name:var(--font-playfair)]" },
              { text: "Director",  style: "font-black  not-italic uppercase tracking-[-0.06em]" },
              { text: "&",         style: "font-light  italic font-[family-name:var(--font-playfair)]" },
              { text: "Photographer", style: "font-black not-italic uppercase tracking-[-0.06em]" },
            ].map((r, i) => (
              <h1
                key={i}
                data-hero-item
                className={`${r.style} text-[#1f1f1f] leading-[0.9]`}
                style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
              >
                {r.text}
              </h1>
            ))}
          </div>

          {/* Bottom: location + CTA */}
          <div data-hero-item className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/50 text-xs uppercase leading-[1.1]">
                Based in
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
                Chicago, IL
              </p>
            </div>
            <MagneticButton href="#contact">Let&apos;s talk</MagneticButton>
          </div>
        </div>

        {/* Right: portrait — full bleed, covers full column height */}
        <div className="relative md:w-1/2 h-[70vw] md:h-auto overflow-hidden">
          <img
            id="about-portrait"
            src={portraitImg}
            alt="Harvey Specter"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Subtle bottom fade into the page background */}
          <div
            className="md:hidden absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #fafafa)" }}
          />
        </div>
      </section>

      {/* ── 2. FULL-BLEED STATEMENT ──────────────────────────────────
          A single oversized Playfair italic sentence.
          Pure typography, no image, no dark section.
          Compositionally nothing like anything on the homepage.
      ──────────────────────────────────────────────────────────────── */}
      <section id="statement-section" className="px-4 md:px-8 py-[64px] md:py-[120px]">
        <div className="w-full h-px bg-[#1f1f1f]/15 mb-12 md:mb-16" />
        <p
          className="font-[family-name:var(--font-playfair)] italic text-[#1f1f1f] leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(28px, 4.5vw, 66px)" }}
        >
          {statementWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </p>
        <div className="flex items-center justify-between mt-10 md:mt-14">
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
            — Harvey Specter, H.Studio
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1] hidden md:block">
            [ philosophy ]
          </p>
        </div>
        <div className="w-full h-px bg-[#1f1f1f]/15 mt-12 md:mt-16" />
      </section>

      {/* ── 3. JOURNEY / TIMELINE ────────────────────────────────────
          Year markers in huge light mono type on the left.
          Milestone title + paragraph on the right.
          A drawn vertical line connects the entries.
          Layout: nothing like the homepage's content patterns.
      ──────────────────────────────────────────────────────────────── */}
      <section id="timeline-section" className="px-4 md:px-8 py-[48px] md:py-[100px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-14 md:mb-20">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">002</p>
            <div className="w-px h-4 bg-[#1f1f1f]/30" />
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ Journey ]</p>
          </div>
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1] hidden md:block">
            2016 — Present
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div
            id="timeline-line"
            className="hidden md:block absolute left-[168px] top-0 bottom-0 w-px bg-[#1f1f1f]/15"
            style={{ transformOrigin: "top center" }}
          />

          <div className="flex flex-col gap-14 md:gap-16">
            {milestones.map((m, i) => (
              <div key={i} data-timeline-entry className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                {/* Year — acts as a large left gutter marker on desktop */}
                <div className="md:w-[168px] shrink-0 flex items-start">
                  <span
                    className="font-light text-[#d0d0d0] leading-none tracking-[-0.07em] font-[family-name:var(--font-inter)] select-none"
                    style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
                  >
                    {m.year}
                  </span>
                </div>
                {/* Content — sits to the right of the line */}
                <div className="md:pl-12 flex flex-col gap-3 flex-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                    {m.label}
                  </p>
                  <h3
                    className="font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em]"
                    style={{ fontSize: "clamp(22px, 2.5vw, 36px)" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-[#1f1f1f]/70 text-[14px] font-normal leading-[1.4] tracking-[-0.02em] max-w-[480px]">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DISCIPLINES GRID ──────────────────────────────────────
          A bordered 2×3 grid on a black background.
          Each cell: number, bold discipline name, one-line descriptor.
          On hover a subtle image appears behind the text.
          Grid layout is entirely different from the homepage's service rows.
      ──────────────────────────────────────────────────────────────── */}
      <section data-nav-dark className="bg-black px-4 md:px-8 pt-[60px] pb-0 md:pt-[80px] md:pb-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-geist-mono)] text-white text-sm uppercase leading-[1.1]">003</p>
            <p className="font-[family-name:var(--font-geist-mono)] text-white/40 text-sm uppercase leading-[1.1]">[ Disciplines ]</p>
          </div>
          <span
            className="font-light text-white/10 uppercase tracking-[-0.08em] leading-none select-none"
            style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
          >
            [6]
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-white/10">
          {disciplines.map((d, i) => (
            <div
              key={i}
              data-discipline
              className="relative overflow-hidden border-r border-b border-white/10 px-5 py-8 md:px-8 md:py-10 flex flex-col gap-4 cursor-default group"
            >
              {/* Background image — revealed on hover via GSAP */}
              <div
                data-disc-overlay
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0 }}
              >
                <img
                  src={d.img}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.18)" }}
                />
              </div>

              <p className="relative font-[family-name:var(--font-geist-mono)] text-white/30 text-xs uppercase leading-[1.1]">
                {d.num}
              </p>
              <h3
                className="relative font-black italic text-white uppercase leading-[1.0] tracking-[-0.04em]"
                style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}
              >
                {d.title}
              </h3>
              <p className="relative font-[family-name:var(--font-geist-mono)] text-white/40 text-[11px] md:text-xs uppercase leading-[1.3] tracking-[0.01em]">
                {d.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      </div>{/* end scrolling content wrapper */}

      {/* ── Footer — sticky at bottom, revealed as content scrolls away ── */}
      <Footer />
    </main>
  );
}
