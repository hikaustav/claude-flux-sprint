import { client } from "@/sanity/lib/client";
import { newsQuery } from "@/sanity/queries";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NewsAnimations } from "./NewsAnimations";

const fbNews1 = "https://www.figma.com/api/mcp/asset/371ac913-5c56-490f-8ffc-fa6a2dc930c9";
const fbNews2 = "https://www.figma.com/api/mcp/asset/47044783-b37c-4af0-84ab-1d2a29be0b30";
const fbNews3 = "https://www.figma.com/api/mcp/asset/f68533a1-86af-46cb-9723-7df0e731d805";
const fbWork1 = "https://www.figma.com/api/mcp/asset/7cea0077-997a-45da-979a-1479eb0a1bec";
const fallbackImgs = [fbNews1, fbNews2, fbNews3, fbWork1, fbNews1, fbNews2, fbNews3, fbWork1];

type SanityPost = {
  _id: string; title?: string; category?: string; date?: string;
  readTime?: string; featured?: boolean; excerpt?: string; body?: string;
  link?: string; order?: number; image?: { asset?: { url: string } };
};

const staticFeatured = {
  category: "Essay", date: "Mar 2024", readTime: "8 min read",
  title: "On building brands that outlast the trend cycle",
  excerpt: "Most brand work is dead within three years. The client moves on, the designer moves on, and the identity quietly gets replaced by whatever is trending at the next rebrand. Here's what I've learned about building work that ages differently.",
  img: fbNews1, link: "#",
};
const staticCards = [
  { category: "Reflection", date: "Jan 2024", readTime: "5 min read", title: "Chicago's creative scene, 8 years in", excerpt: "What the city taught me about work ethic, directness, and why restraint is the most underrated design skill.", img: fbNews2, link: "#" },
  { category: "Process",    date: "Nov 2023", readTime: "6 min read", title: "Why I shoot before I design",           excerpt: "Picking up a camera before opening Figma changed everything about how I develop brand identities.", img: fbNews3, link: "#" },
  { category: "Opinion",    date: "Aug 2023", readTime: "4 min read", title: "The case for fewer, better clients",    excerpt: "Revenue scales with volume. Quality scales with focus. At some point you have to choose which game you're playing.", img: fbWork1, link: "#" },
];
const staticList = [
  { num: "05", category: "Notes",    date: "Jun 2023", title: "Notes from a month of editorial work",         excerpt: "Shooting for three publications back to back — what changes when you're designing for someone else's story." },
  { num: "06", category: "Tools",    date: "Mar 2023", title: "The software I actually use",                  excerpt: "A plain-language walkthrough of the tools in my current setup and why the stack matters less than the thinking." },
  { num: "07", category: "Industry", date: "Dec 2022", title: "What 2022 taught me about client relationships",excerpt: "Three patterns I noticed in the projects that went best — and worst — this year." },
  { num: "08", category: "Essay",    date: "Sep 2022", title: "Against mood boards",                          excerpt: "A short argument for starting with words, not images, when developing a visual direction." },
];

export default async function NewsPage() {
  const sanityPosts: SanityPost[] = await client.fetch(newsQuery, {}, { next: { revalidate: 60 } });

  // Separate featured from the rest; fall back to static data when Sanity is empty
  const featuredPost = sanityPosts.find((p) => p.featured);
  const nonFeatured  = sanityPosts.filter((p) => !p.featured);

  const featured = featuredPost
    ? { category: featuredPost.category ?? "Article", date: featuredPost.date ?? "", readTime: featuredPost.readTime ?? "", title: featuredPost.title ?? "", excerpt: featuredPost.excerpt ?? "", img: featuredPost.image?.asset?.url ?? fbNews1, link: featuredPost.link ?? "#" }
    : staticFeatured;

  const cardPosts = nonFeatured.slice(0, 3);
  const articles = cardPosts.length
    ? cardPosts.map((p, i) => ({ category: p.category ?? "", date: p.date ?? "", readTime: p.readTime ?? "", title: p.title ?? "", excerpt: p.excerpt ?? "", img: p.image?.asset?.url ?? fallbackImgs[i + 1], link: p.link ?? "#" }))
    : staticCards;

  const listPosts = nonFeatured.slice(3);
  const listArticles = listPosts.length
    ? listPosts.map((p, i) => ({ num: String(i + 5).padStart(2, "0"), category: p.category ?? "", date: p.date ?? "", title: p.title ?? "", excerpt: p.excerpt ?? "" }))
    : staticList;
  return (
    <main className="bg-[#fafafa] font-[family-name:var(--font-inter)] relative">
      <Navbar />
      <NewsAnimations />

      <div className="relative z-10 bg-[#fafafa]">

        {/* ── HERO ──────────────────────────────────────────────────────
            Same newspaper-index approach as services/projects but
            unique content: article count, latest date, writing blurb.
        ────────────────────────────────────────────────────────────── */}
        <section className="px-4 md:px-8 pt-[120px] md:pt-[140px] pb-[48px] md:pb-[64px] flex flex-col gap-0">

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />

          <div data-hero-line className="flex items-center justify-between py-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ News ]</p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">005</p>
          </div>

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f]/20 origin-left" />

          {/* Headline — full-width single word + italic subtitle */}
          <div className="pt-6 md:pt-10 pb-4 md:pb-6 flex flex-col gap-0">
            <h1
              data-hero-line
              className="font-black text-[#1f1f1f] uppercase leading-[0.88] tracking-[-0.06em] w-full"
              style={{ fontSize: "clamp(72px, 17.5vw, 252px)" }}
            >
              Journal.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-0 pt-4 md:pt-5">
              <p
                data-hero-line
                className="font-[family-name:var(--font-playfair)] italic text-[#1f1f1f]/40 leading-[1.15] tracking-[-0.02em]"
                style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}
              >
                Stories, thoughts &amp; updates<br className="hidden md:block" /> from the studio.
              </p>
              <div data-hero-line className="flex items-center gap-6 md:gap-8 md:pb-1 shrink-0">
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-[10px] uppercase leading-[1.1] tracking-[0.08em]">Articles</p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">8</p>
                </div>
                <div className="w-px h-8 bg-[#1f1f1f]/15" />
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-[10px] uppercase leading-[1.1] tracking-[0.08em]">Latest</p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">Mar 2024</p>
                </div>
                <div className="w-px h-8 bg-[#1f1f1f]/15" />
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-[10px] uppercase leading-[1.1] tracking-[0.08em]">Category</p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm leading-[1.1]">Essays &amp; Notes</p>
                </div>
              </div>
            </div>
          </div>

          <div data-hero-rule className="w-full h-px bg-[#1f1f1f] origin-left" />
        </section>

        {/* ── FEATURED ARTICLE ─────────────────────────────────────────
            Full-width. Image fills the top portion, content overlaid
            at the bottom inside a dark gradient. Large, immersive.
            Nothing like the homepage's horizontal card scroller.
        ────────────────────────────────────────────────────────────── */}
        <section id="featured-article" className="px-4 md:px-8 pb-6 md:pb-10">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", minHeight: 280 }}>
            {/* Image */}
            <img
              id="featured-img"
              src={featured.img}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }}
            />

            {/* Content pinned to bottom */}
            <div
              id="featured-content"
              className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div className="flex flex-col gap-3 max-w-[640px]">
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-geist-mono)] text-white/60 text-xs uppercase leading-[1.1]">
                    {featured.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-[family-name:var(--font-geist-mono)] text-white/60 text-xs uppercase leading-[1.1]">
                    {featured.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-[family-name:var(--font-geist-mono)] text-white/60 text-xs uppercase leading-[1.1]">
                    {featured.readTime}
                  </span>
                </div>
                <h2
                  className="font-black italic text-white uppercase leading-[0.95] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-white/70 text-[13px] font-normal leading-[1.5] tracking-[-0.02em] hidden md:block">
                  {featured.excerpt}
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 shrink-0 group"
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-white text-xs uppercase leading-[1.1]">
                  Read article
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H7M13 3V9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── ARTICLE CARDS GRID ───────────────────────────────────────
            Three cards on a light tinted background.
            Desktop: 3 equal columns, each with a different top offset
            creating a staggered rhythm. Mobile: single column.
        ────────────────────────────────────────────────────────────── */}
        <section className="bg-[#f3f3f3] px-4 md:px-8 py-[48px] md:py-[80px]">
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">
              [ Recent ]
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">
              3 articles
            </p>
          </div>

          {/* Mobile: single column */}
          <div className="flex flex-col gap-8 md:hidden">
            {articles.map((a, i) => (
              <div key={i} data-article-card className="flex flex-col gap-4 cursor-default">
                <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img data-card-img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">{a.category}</p>
                    <span className="w-1 h-1 rounded-full bg-[#1f1f1f]/20" />
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">{a.date}</p>
                  </div>
                  <h3 className="font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em] text-[20px]">{a.title}</h3>
                  <p className="text-[#1f1f1f]/60 text-[13px] font-normal leading-[1.5] tracking-[-0.02em]">{a.excerpt}</p>
                  <a href="#" className="flex items-center gap-2 w-fit relative pb-1">
                    <span data-read-line className="absolute bottom-0 left-0 w-full h-px bg-[#1f1f1f] origin-left" />
                    <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-xs uppercase leading-[1.1]">Read more</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H6M12 2V8" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: staggered 3-column grid */}
          <div className="hidden md:flex gap-8 items-start">
            {articles.map((a, i) => (
              <div
                key={i}
                data-article-card
                className="flex-1 flex flex-col gap-5 cursor-default"
                style={{ paddingTop: i === 1 ? "8%" : i === 2 ? "4%" : 0 }}
              >
                <div className="w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <img data-card-img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">{a.category}</p>
                    <span className="w-1 h-1 rounded-full bg-[#1f1f1f]/20" />
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">{a.date}</p>
                    <span className="w-1 h-1 rounded-full bg-[#1f1f1f]/20" />
                    <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1]">{a.readTime}</p>
                  </div>
                  <h3
                    className="font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em]"
                    style={{ fontSize: "clamp(18px, 1.8vw, 26px)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-[#1f1f1f]/60 text-[13px] font-normal leading-[1.5] tracking-[-0.02em]">{a.excerpt}</p>
                  <a href="#" className="flex items-center gap-2 w-fit relative pb-1">
                    <span data-read-line className="absolute bottom-0 left-0 w-full h-px bg-[#1f1f1f] origin-left" />
                    <span className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-xs uppercase leading-[1.1]">Read more</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H6M12 2V8" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ARTICLE LIST ─────────────────────────────────────────────
            Remaining articles as a clean indexed list — no images.
            Date, category, title, excerpt in a table-like layout.
            Visually distinct from the card grid above it.
        ────────────────────────────────────────────────────────────── */}
        <section className="px-4 md:px-8 py-[48px] md:py-[80px]">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f] text-sm uppercase leading-[1.1]">[ Archive ]</p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">4 articles</p>
          </div>

          <div className="flex flex-col">
            {listArticles.map((a, i) => (
              <div
                key={i}
                data-list-article
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5 border-b border-[#1f1f1f]/10 cursor-default"
              >
                {/* Left: num + date */}
                <div className="flex items-center gap-4 md:w-[140px] shrink-0">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/25 text-xs uppercase leading-[1.1]">{a.num}</p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-xs uppercase leading-[1.1]">{a.date}</p>
                </div>

                {/* Category tag */}
                <p className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/30 text-xs uppercase leading-[1.1] w-[100px] shrink-0">
                  {a.category}
                </p>

                {/* Title + excerpt */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3
                    className="font-black italic text-[#1f1f1f] uppercase leading-[1.0] tracking-[-0.04em] group-hover:opacity-60 transition-opacity duration-300"
                    style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-[#1f1f1f]/40 text-[13px] font-normal leading-[1.4] tracking-[-0.02em] hidden md:block">
                    {a.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  className="shrink-0 text-[#1f1f1f]/15 group-hover:text-[#1f1f1f] transition-colors duration-300 self-center"
                >
                  <path d="M4 14L14 4M14 4H8M14 4V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </section>

      </div>{/* end scrolling content wrapper */}

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
