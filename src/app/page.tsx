import { client } from "@/sanity/lib/client";
import { worksQuery } from "@/sanity/queries";
import { MagneticButton } from "./components/MagneticButton";
import { HeroParallax } from "./components/HeroParallax";
import { FullWidthReveal } from "./components/FullWidthReveal";
import { ServicesHover } from "./components/ServicesHover";
import { TestimonialsParallax } from "./components/TestimonialsParallax";
import { Navbar } from "./components/Navbar";
import { TestimonialsSlider } from "./components/TestimonialsSlider";
import { HomePreloader } from "./components/HomePreloader";
import { Footer } from "./components/Footer";

const heroImg = "https://www.figma.com/api/mcp/asset/70bd3925-df9d-40e3-b81e-68f8a6fc939b";
const aboutImg = "https://www.figma.com/api/mcp/asset/4a142a70-e9cd-45ba-a039-049153adb5c9";
const fullWidthImg = "https://www.figma.com/api/mcp/asset/cfa89155-46d3-44ab-ba73-22817e672897";
const serviceImg1 = "https://www.figma.com/api/mcp/asset/255ec9fe-fd51-41fd-9ab7-7a3695f81086";
const serviceImg2 = "https://www.figma.com/api/mcp/asset/3f5e3ebd-3932-44a8-b8bb-81ff953ff0d1";
const serviceImg3 = "https://www.figma.com/api/mcp/asset/a96bfd70-bfd2-4f8f-8d09-41d05cc5dd00";
const serviceImg4 = "https://www.figma.com/api/mcp/asset/8ba0eb2f-9560-4f37-a67b-b4e0651da339";
const workImg1 = "https://www.figma.com/api/mcp/asset/7cea0077-997a-45da-979a-1479eb0a1bec";
const workImg2 = "https://www.figma.com/api/mcp/asset/3d848365-59c3-4c9a-b569-a6b7a3f81eae";
const workImg3 = "https://www.figma.com/api/mcp/asset/33f1ed4e-9230-4926-b600-5036fcf68185";
const workImg4 = "https://www.figma.com/api/mcp/asset/f85569eb-34d5-4468-b91d-52825b243873";
const newsImg1 = "https://www.figma.com/api/mcp/asset/371ac913-5c56-490f-8ffc-fa6a2dc930c9";
const newsImg2 = "https://www.figma.com/api/mcp/asset/47044783-b37c-4af0-84ab-1d2a29be0b30";
const newsImg3 = "https://www.figma.com/api/mcp/asset/f68533a1-86af-46cb-9723-7df0e731d805";
const logoLukas = "https://www.figma.com/api/mcp/asset/45f967c7-fa1a-4ed9-98f9-2cdfd46e8033";
const logoMarko = "https://www.figma.com/api/mcp/asset/43d53d2f-fb8c-4094-a1cc-66a3b8ce8756";
const logoSarah = "https://www.figma.com/api/mcp/asset/e02351ca-7458-4cfc-bbf5-dd2d0b08c360";
const logoSofia = "https://www.figma.com/api/mcp/asset/c59178be-8331-4d7c-9ee2-2d3168821248";

const services = [
  { num: "[ 1 ]", title: "Brand Discovery", img: serviceImg1 },
  { num: "[ 2 ]", title: "Web design & Dev", img: serviceImg2 },
  { num: "[ 3 ]", title: "Marketing", img: serviceImg3 },
  { num: "[ 4 ]", title: "Photography", img: serviceImg4 },
];

const staticWorkImgs = [workImg1, workImg2, workImg3, workImg4];

const testimonials = [
  {
    name: "Lukas Weber",
    logo: logoLukas,
    logoW: 137.733, logoH: 19.263,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    rotate: "rotate-[2.9deg]",
    pos: "md:left-[676px] md:top-[272px]",
  },
  {
    name: "Marko Stojković",
    logo: logoMarko,
    logoW: 142.749, logoH: 18.97,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    rotate: "rotate-[-6.85deg]",
    pos: "md:left-[102px] md:top-[142px]",
  },
  {
    name: "Sarah Jenkins",
    logo: logoSarah,
    logoW: 108.537, logoH: 30.748,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    rotate: "rotate-[2.23deg]",
    pos: "md:left-[305px] md:top-[553px]",
  },
  {
    name: "Sofia Martínez",
    logo: logoSofia,
    logoW: 81.1, logoH: 36.174,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    rotate: "rotate-[-4.15deg]",
    pos: "md:left-[987px] md:top-[546px]",
  },
];


type SanityWork = {
  _id: string;
  title: string;
  tags: string[];
  order: number;
  image?: { asset?: { url: string }; hotspot?: unknown };
};

export default async function Home() {
  const sanityWorks: SanityWork[] = await client.fetch(worksQuery, {}, { next: { revalidate: 60 } });

  const works = sanityWorks.map((w, i) => ({
    title: w.title,
    tags: w.tags ?? [],
    img: w.image?.asset?.url ?? staticWorkImgs[i] ?? staticWorkImgs[0],
  }));

  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <HomePreloader />
      <Navbar />
      {/* Scrolling content sits above the sticky footer */}
      <div className="relative z-10 bg-[#fafafa]">

      {/* ── Hero ── */}
      <section id="hero-section" className="relative h-screen overflow-hidden flex flex-col px-4 md:px-8 pt-[80px]">
        <HeroParallax />
        <FullWidthReveal />
        <ServicesHover />
        <TestimonialsParallax />

        {/* BG */}
        <img
          id="hero-bg"
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: "50% 20%" }}
        />

        {/* Mobile: progressive blur fade at bottom */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.6) 65%, black 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.6) 65%, black 80%)",
          }}
        />

        {/* Desktop: frosted glass — top uses max() so it always starts below the H1's bottom edge (~530px max) */}
        <div
          className="hidden md:block absolute left-0 w-full pointer-events-none"
          style={{
            top: "max(535px, 60%)",
            bottom: 0,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, black 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, black 70%)",
          }}
        />

{/* ── Mobile content: centered name, bio at bottom ── */}
        <div className="md:hidden relative flex flex-col flex-1 justify-end items-center pb-8 gap-8">
          {/* Greeting + Name — centered */}
          <div className="flex flex-col items-center w-full">
            <p
              id="hero-greeting-mobile"
              className="font-[family-name:var(--font-geist-mono)] text-white uppercase text-[14px] leading-[1.1] mb-1 inline-block"
              style={{ mixBlendMode: "overlay" }}
            >
              [ Hello i&apos;m ]
            </p>
            <h1
              className="text-white font-medium capitalize text-center w-full"
              style={{ fontSize: "26vw", letterSpacing: "-0.07em", lineHeight: 0.88, mixBlendMode: "overlay" }}
            >
              <span id="hero-harvey-mobile" className="block">Harvey</span>
              <span id="hero-specter-mobile" className="block">Specter</span>
            </h1>
          </div>
          {/* Description + CTA */}
          <div className="flex flex-col gap-[17px] items-center w-[293px]">
            <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.56px] leading-[1.1] uppercase text-center">
              <span>H.Studio is a </span>
              <span className="font-normal">full-service</span>
              <span> creative studio creating beautiful digital experiences and products. We are an </span>
              <span className="font-normal">award winning</span>
              <span> design and art group specializing in branding, web design and engineering.</span>
            </p>
            <MagneticButton href="#contact">Let&apos;s talk</MagneticButton>
          </div>
        </div>

        {/* ── Desktop content ── */}
        <div className="hidden md:flex flex-col flex-1 relative" style={{ paddingTop: "min(240px, 30vh)" }}>
          {/* Greeting */}
          <div className="flex items-center justify-start w-full px-[18px]" style={{ marginBottom: -15 }}>
            <p
              id="hero-greeting-desktop"
              className="font-[family-name:var(--font-geist-mono)] text-white uppercase text-sm leading-[1.1] inline-block"
              style={{ mixBlendMode: "overlay" }}
            >
              [ Hello i&apos;m ]
            </p>
          </div>
          {/* H1 */}
          <h1
            className="text-white font-medium capitalize text-center w-full"
            style={{ fontSize: "13.75vw", letterSpacing: "-0.07em", lineHeight: 1.1, mixBlendMode: "overlay" }}
          >
            <span id="hero-harvey-desktop" className="inline-block">Harvey</span>
            <span className="inline-block">&nbsp;&nbsp;&nbsp;</span>
            <span id="hero-specter-desktop" className="inline-block">Specter</span>
          </h1>
          {/* Description + CTA — centered at md, right-aligned at lg+ */}
          <div className="flex flex-col items-end w-full mt-5">
            <div className="flex flex-col gap-[17px] items-start w-[294px] text-left mx-0">
              <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.56px] leading-[1.1] uppercase">
                <span>H.Studio is a </span>
                <span className="font-normal">full-service</span>
                <span> creative studio creating beautiful digital experiences and products. We are an </span>
                <span className="font-normal">award winning</span>
                <span> design and art group specializing in branding, web design and engineering.</span>
              </p>
              <MagneticButton href="#contact">Let&apos;s talk</MagneticButton>
            </div>
          </div>
        </div>

      </section>

      {/* ── About Typography ── */}
      <section id="about" className="overflow-hidden px-4 md:px-8 py-[48px] md:py-[120px]">
        <div className="flex flex-col gap-6">
          {/* Header row */}
          <div className="flex flex-col gap-3 items-end">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase text-right w-full leading-[1.1]">
              [ 8+ years in industry ]
            </p>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>

          {/* ── Desktop layout — staggered, centered as a block ── */}
          <div id="about-headline-desktop" className="hidden md:flex flex-col gap-2 mx-auto">
            <div className="flex items-start gap-3">
              <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap" style={{ fontSize: "clamp(48px, 6.67vw, 96px)", color: "#d0d0d0" }}>
                A creative director&nbsp;&nbsp;&nbsp;/
              </h2>
              <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1] shrink-0 mt-2">001</span>
            </div>
            <div style={{ paddingLeft: "14.86vw" }}>
              <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap" style={{ fontSize: "clamp(48px, 6.67vw, 96px)", color: "#d0d0d0" }}>
                Photographer
              </h2>
            </div>
            <div style={{ paddingLeft: "42.36vw" }}>
              <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap" style={{ fontSize: "clamp(48px, 6.67vw, 96px)", color: "#d0d0d0" }}>
                Born <em className="font-[family-name:var(--font-playfair)] not-italic italic">&amp;</em> raised
              </h2>
            </div>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap" style={{ fontSize: "clamp(48px, 6.67vw, 96px)", color: "#d0d0d0" }}>
              on the south side
            </h2>
            <div style={{ paddingLeft: "42.08vw" }}>
              <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap" style={{ fontSize: "clamp(48px, 6.67vw, 96px)", color: "#d0d0d0" }}>
                of chicago.
              </h2>
            </div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1] text-center w-full mt-2">
              [ creative freelancer ]
            </p>
          </div>

          {/* ── Mobile layout — fluid vw scaling, all centred ── */}
          <div id="about-headline-mobile" className="md:hidden flex flex-col gap-2 items-center text-center">
            <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">001</span>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em]" style={{ fontSize: "clamp(18px, 8.5vw, 32px)", color: "#d0d0d0" }}>
              A creative director&nbsp;&nbsp;/
            </h2>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em]" style={{ fontSize: "clamp(18px, 8.5vw, 32px)", color: "#d0d0d0" }}>
              Photographer
            </h2>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em]" style={{ fontSize: "clamp(18px, 8.5vw, 32px)", color: "#d0d0d0" }}>
              Born <em className="font-[family-name:var(--font-playfair)] not-italic italic">&amp;</em> raised
            </h2>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em]" style={{ fontSize: "clamp(18px, 8.5vw, 32px)", color: "#d0d0d0" }}>
              on the south side
            </h2>
            <h2 data-about-line className="font-light uppercase leading-[0.84] tracking-[-0.08em]" style={{ fontSize: "clamp(18px, 8.5vw, 32px)", color: "#d0d0d0" }}>
              of chicago.
            </h2>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1] mt-3">
              [ creative freelancer ]
            </p>
          </div>
        </div>
      </section>

      {/* ── About Photo ── */}
      <section id="about-photo-section" className="px-4 md:px-8 py-[48px] md:py-[80px]">
        {/* Corner bracket SVG used around the paragraph */}

        {/* ── Desktop ── */}
        <div className="hidden md:flex items-start justify-between">
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1] whitespace-nowrap shrink-0">
            [ About ]
          </p>
          <div className="flex items-end gap-8 w-[983px]">
            {/* Paragraph with corner brackets */}
            <div id="about-para-box" className="flex flex-1 gap-3 items-stretch min-w-0">
              {/* Left brackets */}
              <div className="flex flex-col justify-between shrink-0 w-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              </div>
              <p className="flex-1 text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] py-3">
                Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
              </p>
              {/* Right brackets */}
              <div className="flex flex-col justify-between shrink-0 w-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              </div>
            </div>
            {/* 002 + photo */}
            <div className="flex gap-6 items-start shrink-0">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">002</p>
              <div className="relative w-[436px] shrink-0 overflow-hidden" style={{ aspectRatio: "436/614" }}>
                <img src={aboutImg} alt="Portrait" className="absolute inset-[-1%] w-[102%] h-[102%] object-cover" />
                <div id="about-img-overlay-desktop" className="absolute inset-0 bg-black pointer-events-none" style={{ transformOrigin: "right center" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden flex flex-col gap-5">
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">002</p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ About ]</p>
          {/* Paragraph with corner brackets */}
          <div className="flex gap-3 items-stretch">
            <div className="flex flex-col justify-between shrink-0 w-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
            </div>
            <p className="flex-1 text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] py-3">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            <div className="flex flex-col justify-between shrink-0 w-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
            </div>
          </div>
          {/* Full-width photo */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "422/594" }}>
            <img src={aboutImg} alt="Portrait" className="absolute inset-[-1%] w-[102%] h-[102%] object-cover" />
            <div id="about-img-overlay-mobile" className="absolute inset-0 bg-black pointer-events-none" style={{ transformOrigin: "right center" }} />
          </div>
        </div>
      </section>

      {/* ── Full-width photo ── */}
      <div id="fullwidth-section" data-nav-dark className="w-full h-[300px] md:h-[900px] overflow-hidden">
        <img id="fullwidth-img" src={fullWidthImg} alt="" className="w-full h-full object-cover" style={{ filter: "blur(24px)", transform: "scale(1.05)" }} />
      </div>

      {/* ── Services ── */}
      <section id="services" data-nav-dark className="bg-black px-4 md:px-8 py-[60px] md:py-[80px] flex flex-col gap-12">
        <p className="font-[family-name:var(--font-geist-mono)] text-white text-sm uppercase leading-[1.1]">[ services ]</p>
        <div className="flex items-center justify-between">
          <span className="font-light text-white uppercase tracking-[-0.08em] leading-none" style={{ fontSize: "clamp(48px, 6.67vw, 96px)" }}>
            [4]
          </span>
          <span className="font-light text-white uppercase tracking-[-0.08em] leading-none" style={{ fontSize: "clamp(48px, 6.67vw, 96px)" }}>
            Deliverables
          </span>
        </div>
        <div className="flex flex-col gap-10">
          {services.map((s) => (
            <div key={s.title} data-service-row className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-geist-mono)] text-white text-sm uppercase leading-[1.1]">{s.num}</p>
              <div data-service-line className="w-full h-px bg-white/60 origin-left" />
              {/* Mobile */}
              <div className="flex flex-col gap-2 pt-1 md:hidden">
                <p data-service-title className="font-bold italic text-white uppercase text-[28px] tracking-[-0.04em] leading-[1.1]">{s.title}</p>
                <p className="text-white text-sm font-normal leading-[1.3] tracking-[-0.04em]">
                  Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.
                </p>
                <div className="shrink-0 overflow-hidden aspect-square w-[26vw]">
                  <img data-service-img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Desktop */}
              <div className="hidden md:flex flex-row items-start justify-between gap-4 pt-1">
                <p data-service-title className="font-bold italic text-white uppercase text-[36px] tracking-[-0.04em] leading-[1.1]">{s.title}</p>
                <div className="flex gap-6 items-start">
                  <p className="text-white text-sm font-normal leading-[1.3] tracking-[-0.04em] max-w-[393px]">
                    Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.
                  </p>
                  <div className="shrink-0 -mr-8 overflow-hidden aspect-square w-[151px]">
                    <img data-service-img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section id="projects" className="px-4 md:px-8 py-[48px] md:py-[80px]">
        <div className="flex flex-col gap-8 md:gap-[61px]">

          {/* Header */}
          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ portfolio ]</p>
            <div className="flex items-start justify-between">
              <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px]">
                Selected<br />Work
              </h2>
              <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">004</span>
            </div>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-start gap-3">
              <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[96px]">
                Selected<br />Work
              </h2>
              <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1] mt-2">004</span>
            </div>
            <div className="flex items-center justify-center w-[15px] h-[110px]">
              <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1] [writing-mode:vertical-rl] rotate-180">
                [ portfolio ]
              </p>
            </div>
          </div>

          {/* ── Desktop grid ── */}
          <div className="hidden md:flex gap-6">
            {/* Left column */}
            <div className="flex flex-col flex-1">
              {/* Card 1 — Surfers Paradise — tall aspect */}
              <div data-work-card className="flex flex-col gap-[10px] cursor-default">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "676/744" }}>
                  {works[0]?.img && <img data-work-img src={works[0].img} alt={works[0].title} className="absolute inset-0 w-full h-full object-cover" />}
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {works[0].tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-[24px] text-[#111] text-sm font-medium tracking-[-0.04em]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p data-work-title className="font-black text-black uppercase text-[36px] tracking-[-1.44px] leading-[1.1]">{works[0].title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H13M24 8V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Card 2 — Cyberpunk Caffe — shorter aspect */}
              <div data-work-card className="flex flex-col gap-[10px] cursor-default" style={{ marginTop: "8.5%" }}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "676/699" }}>
                  {works[1]?.img && <img data-work-img src={works[1].img} alt={works[1].title} className="absolute inset-0 w-full h-full object-cover" />}
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {works[1].tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-[24px] text-[#111] text-sm font-medium tracking-[-0.04em]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p data-work-title className="font-black text-black uppercase text-[36px] tracking-[-1.44px] leading-[1.1]">{works[1].title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H13M24 8V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* CTA block with corner brackets — mt-auto pushes to bottom of column, max-w caps width */}
              <div className="flex gap-3 items-stretch mt-auto max-w-[465px]">
                <div className="flex flex-col justify-between shrink-0 w-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                </div>
                <div className="flex flex-col gap-[10px] flex-1 py-3">
                  <p className="italic text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
                    Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
                  </p>
                  <MagneticButton href="#contact">Let&apos;s talk</MagneticButton>
                </div>
                <div className="flex flex-col justify-between shrink-0 w-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                </div>
              </div>
            </div>
            {/* Right column — offset down proportionally (240/1376 ≈ 17.44% of container width) */}
            <div className="flex flex-col flex-1 gap-[10px]" style={{ paddingTop: "17.44%" }}>
              {/* Card 3 — Agency 976 — shorter aspect */}
              <div data-work-card className="flex flex-col gap-[10px] cursor-default">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "676/699" }}>
                  {works[2]?.img && <img data-work-img src={works[2].img} alt={works[2].title} className="absolute inset-0 w-full h-full object-cover" />}
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {works[2].tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-[24px] text-[#111] text-sm font-medium tracking-[-0.04em]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p data-work-title className="font-black text-black uppercase text-[36px] tracking-[-1.44px] leading-[1.1]">{works[2].title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H13M24 8V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Card 4 — Minimal Playground — tall aspect, gap 117/1376 ≈ 8.5% */}
              <div data-work-card className="flex flex-col gap-[10px] cursor-default" style={{ marginTop: "8.5%" }}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "676/744" }}>
                  {works[3]?.img && <img data-work-img src={works[3].img} alt={works[3].title} className="absolute inset-0 w-full h-full object-cover" />}
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {works[3].tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-[24px] text-[#111] text-sm font-medium tracking-[-0.04em]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p data-work-title className="font-black text-black uppercase text-[36px] tracking-[-1.44px] leading-[1.1]">{works[3].title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H13M24 8V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile: single column ── */}
          <div className="md:hidden flex flex-col gap-6">
            {works.map((w) => (
              <div key={w.title} className="flex flex-col gap-[10px]">
                <div className="relative w-full overflow-hidden" style={{ height: 390 }}>
                  <img src={w.img} alt={w.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {w.tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-[24px] text-[#111] text-sm font-medium tracking-[-0.04em]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-black uppercase text-[24px] tracking-[-0.96px] leading-[1.1]">{w.title}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H13M24 8V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
            {/* Mobile CTA block */}
            <div className="flex gap-3 items-stretch">
              <div className="flex flex-col justify-between shrink-0 w-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              </div>
              <div className="flex flex-col gap-[10px] flex-1 py-3">
                <p className="italic text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
                  Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
                </p>
                <MagneticButton href="#contact">Let&apos;s talk</MagneticButton>
              </div>
              <div className="flex flex-col justify-between shrink-0 w-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ── Testimonials ── */}

      {/* Mobile + Tablet slider (≤ 768px) */}
      <section className="min-[769px]:hidden py-16 flex flex-col gap-8 overflow-x-clip">
        <h2
          className="font-medium text-black capitalize text-center leading-[0.85] tracking-[-0.07em] px-4"
          style={{ fontSize: "clamp(48px, 13vw, 80px)" }}
        >
          Testimonials
        </h2>
        <TestimonialsSlider
          testimonials={testimonials.map((t) => ({
            name: t.name,
            logo: t.logo,
            logoW: t.logoW,
            logoH: t.logoH,
            quote: t.quote,
            rotate: parseFloat(t.rotate.replace("rotate-[", "").replace("deg]", "")),
          }))}
        />
      </section>

      {/* Desktop scattered layout (≥ 769px) — all positions/sizes in vw so it scales with viewport */}
      <section id="testimonials-desktop" className="hidden min-[769px]:block relative overflow-hidden" style={{ height: "clamp(500px, 68.5vw, 987px)" }}>
        {/* Heading — centered */}
        <h2
          className="absolute font-medium text-black capitalize text-center leading-[1.1] tracking-[-0.07em] w-full"
          style={{ fontSize: "clamp(48px, 13.75vw, 198px)", top: "50%", transform: "translateY(-50%)" }}
        >
          Testimonials
        </h2>
        {/* Cards */}
        {[
          { name: testimonials[1].name, logo: testimonials[1].logo, logoW: testimonials[1].logoW, logoH: testimonials[1].logoH, quote: testimonials[1].quote, rotate: -6.85, left: "7.08vw",  top: "14.4%" },
          { name: testimonials[0].name, logo: testimonials[0].logo, logoW: testimonials[0].logoW, logoH: testimonials[0].logoH, quote: testimonials[0].quote, rotate:  2.9,  left: "46.94vw", top: "27.6%" },
          { name: testimonials[2].name, logo: testimonials[2].logo, logoW: testimonials[2].logoW, logoH: testimonials[2].logoH, quote: testimonials[2].quote, rotate:  2.23, left: "21.18vw", top: "56%" },
          { name: testimonials[3].name, logo: testimonials[3].logo, logoW: testimonials[3].logoW, logoH: testimonials[3].logoH, quote: testimonials[3].quote, rotate: -4.15, left: "68.54vw", top: "55.3%" },
        ].map((card, i) => (
          <div
            key={i}
            data-tcard
            data-rotate={card.rotate}
            className="absolute cursor-default"
            style={{ left: card.left, top: card.top, width: "clamp(200px, 24.5vw, 353px)" }}
          >
            <div
              data-tcard-inner
              className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-full"
              style={{ transform: `rotate(${card.rotate}deg)`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <div style={{ position: "relative", width: card.logoW, height: card.logoH, flexShrink: 0, maxWidth: "100%" }}>
                <img src={card.logo} alt={card.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none" }} />
              </div>
              <p className="text-[#1f1f1f] text-[clamp(13px,1.25vw,18px)] font-normal leading-[1.3] tracking-[-0.04em]">{card.quote}</p>
              <p className="text-black text-[clamp(11px,1.1vw,16px)] font-black uppercase tracking-[-0.04em] leading-[1.1]">{card.name}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── News ── */}
      <section id="news" className="bg-[#f3f3f3] px-4 md:px-8 py-[64px] md:py-[120px]">

        {/* ── Mobile: title + horizontal scroll ── */}
        <div className="md:hidden flex flex-col gap-8">
          <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px]">
            Keep up with my latest news &amp; achievements
          </h2>
          <div
            className="scrollbar-none flex gap-4 overflow-x-scroll -mx-4 pb-2"
            style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: 16, WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: 16 }}
          >
            {[newsImg1, newsImg2, newsImg3].map((img, i) => (
              <div key={i} className="flex flex-col gap-4 shrink-0" style={{ width: "calc(83.333vw - 16px)", scrollSnapAlign: "start" }}>
                <div className="w-full overflow-hidden" style={{ aspectRatio: "300/398" }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="flex items-center gap-[10px] border-b border-black pb-1 w-fit">
                  <span className="text-black text-sm font-medium tracking-[-0.04em]">Read more</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: rotated title + staggered cards — section overflow-hidden clips 3rd card ── */}
        <div className="hidden md:flex items-end gap-8">

          {/* Rotated title column — 110px wide, 706px tall matching Figma */}
          <div className="relative shrink-0" style={{ width: 110, height: 706, clipPath: "inset(0)" }}>
            <div
              className="absolute top-1/2 left-1/2 flex flex-col"
              style={{ transform: "translate(-50%, -50%) rotate(-90deg)", whiteSpace: "nowrap" }}
            >
              <p className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em]" style={{ fontSize: 64, letterSpacing: "-0.08em" }}>
                Keep up with my latest
              </p>
              <p className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em]" style={{ fontSize: 64, letterSpacing: "-0.08em" }}>
                news &amp; achievements
              </p>
            </div>
          </div>

          {/* Cards block — below lg: scrollable; lg+: fixed 353px with ml-auto */}
          <div
            className="flex-1 overflow-x-auto -mr-4 md:-mr-8 lg:flex lg:overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
          <div className="flex items-start gap-8 ml-auto" style={{ scrollSnapType: "x mandatory" }}>

          {/* Card 1 */}
          <div data-news-card className="flex flex-col gap-4 shrink-0 w-[calc((100vw-336px)/2.2)] lg:w-[353px]" style={{ scrollSnapAlign: "start" }}>
            <div className="w-full overflow-hidden" style={{ aspectRatio: "353/469" }}>
              <img data-news-img src={newsImg1} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="flex items-center gap-[10px] pb-1 w-fit relative">
              <span data-news-line className="absolute bottom-0 left-0 h-px bg-black w-full origin-left" />
              <span className="text-black text-sm font-medium tracking-[-0.04em]">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="self-stretch shrink-0" style={{ width: 1, background: "rgba(31,31,31,0.15)" }} />

          {/* Card 2 — offset down */}
          <div data-news-card className="flex flex-col gap-4 shrink-0 pt-[120px] w-[calc((100vw-336px)/2.2)] lg:w-[353px]" style={{ scrollSnapAlign: "start" }}>
            <div className="w-full overflow-hidden" style={{ aspectRatio: "353/469" }}>
              <img data-news-img src={newsImg2} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="flex items-center gap-[10px] pb-1 w-fit relative">
              <span data-news-line className="absolute bottom-0 left-0 h-px bg-black w-full origin-left" />
              <span className="text-black text-sm font-medium tracking-[-0.04em]">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="self-stretch shrink-0" style={{ width: 1, background: "rgba(31,31,31,0.15)" }} />

          {/* Card 3 */}
          <div data-news-card className="flex flex-col gap-4 shrink-0 w-[calc((100vw-336px)/2.2)] lg:w-[353px]" style={{ scrollSnapAlign: "start" }}>
            <div className="w-full overflow-hidden" style={{ aspectRatio: "353/469" }}>
              <img data-news-img src={newsImg3} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-[#1f1f1f] text-[14px] font-normal leading-[1.3] tracking-[-0.04em]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="flex items-center gap-[10px] pb-1 w-fit relative">
              <span data-news-line className="absolute bottom-0 left-0 h-px bg-black w-full origin-left" />
              <span className="text-black text-sm font-medium tracking-[-0.04em]">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          </div>{/* end inner flex */}
          </div>{/* end scrollable wrapper */}
        </div>

      </section>
      </div>{/* end scrolling content wrapper */}

      <Footer />
    </main>
  );
}
