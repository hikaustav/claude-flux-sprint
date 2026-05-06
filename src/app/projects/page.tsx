import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { MagneticButton } from "@/app/components/MagneticButton";
import { Footer } from "@/app/components/Footer";
import { ProjectsAnimations } from "./ProjectsAnimations";

const fbImgs = [
  "https://www.figma.com/api/mcp/asset/7cea0077-997a-45da-979a-1479eb0a1bec",
  "https://www.figma.com/api/mcp/asset/3d848365-59c3-4c9a-b569-a6b7a3f81eae",
  "https://www.figma.com/api/mcp/asset/33f1ed4e-9230-4926-b600-5036fcf68185",
  "https://www.figma.com/api/mcp/asset/f85569eb-34d5-4468-b91d-52825b243873",
  "https://www.figma.com/api/mcp/asset/255ec9fe-fd51-41fd-9ab7-7a3695f81086",
  "https://www.figma.com/api/mcp/asset/3f5e3ebd-3932-44a8-b8bb-81ff953ff0d1",
  "https://www.figma.com/api/mcp/asset/a96bfd70-bfd2-4f8f-8d09-41d05cc5dd00",
  "https://www.figma.com/api/mcp/asset/8ba0eb2f-9560-4f37-a67b-b4e0651da339",
];

const staticProjects = [
  { num: "01", title: "Surfers Paradise",   category: "Brand Identity",  tags: ["Branding", "Print"],         year: "2024", img: fbImgs[0] },
  { num: "02", title: "Cyberpunk Caffe",    category: "Web Design",       tags: ["Web", "UI/UX"],              year: "2024", img: fbImgs[1] },
  { num: "03", title: "Agency 976",         category: "Photography",      tags: ["Photography", "Editorial"],  year: "2023", img: fbImgs[2] },
  { num: "04", title: "Minimal Playground", category: "Art Direction",    tags: ["Art Direction", "Branding"], year: "2023", img: fbImgs[3] },
  { num: "05", title: "Nordic Shore",       category: "Brand Identity",   tags: ["Branding", "Strategy"],      year: "2022", img: fbImgs[4] },
  { num: "06", title: "Velvet Studio",      category: "Web Design",       tags: ["Web", "Motion"],             year: "2022", img: fbImgs[5] },
  { num: "07", title: "Oak & Stone",        category: "Photography",      tags: ["Photography", "Campaign"],   year: "2021", img: fbImgs[6] },
  { num: "08", title: "The Field",          category: "Marketing",        tags: ["Marketing", "Content"],      year: "2021", img: fbImgs[7] },
];

type SanityProject = {
  _id: string; title: string; category?: string; year?: string;
  tags?: string[]; order?: number;
  image?: { asset?: { url: string } };
};

const filters = ["All", "Branding", "Web", "Photography", "Art Direction", "Marketing"];

export default async function ProjectsPage() {
  const sanityProjects: SanityProject[] = await client.fetch(projectsQuery, {}, { next: { revalidate: 60 } });

  const projects = sanityProjects.length
    ? sanityProjects.map((p, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: p.title,
        category: p.category ?? staticProjects[i]?.category ?? "Project",
        tags: p.tags ?? [],
        year: p.year ?? staticProjects[i]?.year ?? "",
        img: p.image?.asset?.url ?? fbImgs[i % fbImgs.length],
      }))
    : staticProjects;
  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <Navbar />
      <ProjectsAnimations />

      {/* Cursor-following image preview — fixed, GSAP moves it */}
      <div
        id="project-preview"
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
        style={{ width: 280, height: 360, opacity: 0 }}
      >
        {/* src intentionally omitted — GSAP sets it dynamically on row hover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="project-preview-img"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 bg-[#fafafa]">

        {/* ── HERO — same newspaper-index style as services but unique content ── */}
        <section className="px-4 md:px-8 pt-[120px] md:pt-[140px] pb-[48px] md:pb-[64px] flex flex-col gap-0">

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />

          <div data-hero-line className="flex items-center justify-between py-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
              [ Projects ]
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">004</p>
          </div>

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f]/20 origin-left" />

          {/* Headline */}
          <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h1
                data-hero-line
                className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em]"
                style={{ fontSize: "clamp(52px, 10.5vw, 152px)" }}
              >
                Selected
              </h1>
              <h1
                data-hero-line
                className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em]"
                style={{ fontSize: "clamp(52px, 10.5vw, 152px)", paddingLeft: "clamp(24px, 8vw, 120px)" }}
              >
                Work<em className="font-[family-name:var(--font-playfair)] not-italic italic">&nbsp;&amp;</em>
              </h1>
              <h1
                data-hero-line
                className="font-light text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.07em]"
                style={{ fontSize: "clamp(52px, 10.5vw, 152px)", paddingLeft: "clamp(48px, 18vw, 260px)" }}
              >
                Projects.
              </h1>
            </div>
            <div data-hero-line className="flex flex-col gap-2 md:text-right shrink-0 md:pb-3">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                8 projects
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
                2021 — 2024
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1] md:hidden">
                Hover a row to preview
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1] hidden md:block">
                [ Hover a row to preview ]
              </p>
            </div>
          </div>

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f]/20 origin-left" />

          {/* Filter tags */}
          <div className="flex items-center gap-2 md:gap-3 py-4 overflow-x-auto scrollbar-none">
            {filters.map((f, i) => (
              <span
                key={f}
                data-filter-tag
                className={`shrink-0 font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-3 py-1.5 rounded-full border cursor-default ${
                  i === 0
                    ? "border-[#1f1f1f] text-[#1f1f1f] bg-[#1f1f1f] text-[#fafafa]"
                    : "border-[#1f1f1f]/20 text-[#1f1f1f]/50"
                }`}
              >
                {f}
              </span>
            ))}
          </div>

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />
        </section>

        {/* ── PROJECT LIST ──────────────────────────────────────────────
            Full-width clickable rows. Desktop: cursor-following image
            preview floats beside the mouse. Mobile: thumbnail shown
            inline. Nothing like the homepage's two-column offset grid.
        ────────────────────────────────────────────────────────────── */}
        <section className="px-4 md:px-8">
          {projects.map((p) => (
            <div
              key={p.num}
              data-project-row
              data-img={p.img}
              className="group relative flex flex-col gap-3 py-6 border-b border-[#1f1f1f]/10 cursor-default"
            >
              {/* Animated underline */}
              <div data-row-line className="absolute bottom-0 left-0 right-0 h-px bg-[#1f1f1f] origin-left" />

              {/* Mobile thumbnail */}
              <div className="md:hidden w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>

              {/* Row content */}
              <div className="flex items-center gap-4 md:gap-8">
                {/* Number */}
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-xs md:text-sm uppercase leading-[1.1] shrink-0 w-6">
                  {p.num}
                </p>

                {/* Title — grows */}
                <h2
                  data-row-title
                  className="font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em] flex-1"
                  style={{ fontSize: "clamp(22px, 3.5vw, 52px)" }}
                >
                  {p.title}
                </h2>

                {/* Category — hidden on small mobile */}
                <p className="hidden sm:block font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1] shrink-0 w-[140px] md:w-[180px]">
                  {p.category}
                </p>

                {/* Tags — desktop only */}
                <div className="hidden md:flex items-center gap-2 shrink-0 w-[220px]">
                  {p.tags.map((t) => (
                    <span key={t} className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-[11px] uppercase leading-[1.1] border border-[#1f1f1f]/15 px-2 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Year */}
                <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-xs md:text-sm uppercase leading-[1.1] shrink-0">
                  {p.year}
                </p>

                {/* Arrow */}
                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className="shrink-0 text-[#1f1f1f]/20 group-hover:text-[#1f1f1f] transition-colors duration-300"
                >
                  <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
        <section className="px-4 md:px-8 py-[60px] md:py-[80px] flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-[#1f1f1f]/10">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
              [ Next project ]
            </p>
            <p
              className="font-[family-name:var(--font-playfair)] italic text-[#1f1f1f] leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              Yours could be here.
            </p>
          </div>
          <MagneticButton href="#contact">Start a project</MagneticButton>
        </section>

      </div>{/* end scrolling content wrapper */}

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
