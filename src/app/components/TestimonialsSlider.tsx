"use client";
import { useRef, useState, useEffect } from "react";

type Testimonial = {
  name: string;
  logo: string;
  logoW: number;
  logoH: number;
  quote: string;
  rotate: number;
};

const SLIDE_FRAC = 0.8;
const LEADING_PX = 16;

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideW = el.clientWidth * SLIDE_FRAC;
      const idx = Math.round(el.scrollLeft / slideW);
      setActive(Math.min(idx, testimonials.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [testimonials.length]);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth * SLIDE_FRAC, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll py-8"
        style={{
          scrollSnapType: "x mandatory",
          // scroll-padding-left keeps the 16px spacer visible when snapped
          scrollPaddingLeft: LEADING_PX,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch" as never,
        }}
      >
        {/* 16px gap between left boundary and first card */}
        <div className="shrink-0 w-4" />
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="shrink-0 pr-4"
            style={{ width: `${SLIDE_FRAC * 100}%`, scrollSnapAlign: "start" }}
          >
            <div
              className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-full"
              style={{ transform: `rotate(${t.rotate}deg)` }}
            >
              <div style={{ position: "relative", width: t.logoW, height: t.logoH, flexShrink: 0, maxWidth: "100%" }}>
                <img
                  src={t.logo}
                  alt={t.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none" }}
                />
              </div>
              <p className="text-[#1f1f1f] text-[16px] font-normal leading-[1.3] tracking-[-0.04em]">{t.quote}</p>
              <p className="text-black text-[14px] font-black uppercase tracking-[-0.04em] leading-[1.1]">{t.name}</p>
            </div>
          </div>
        ))}
        {/* Trailing spacer so last card isn't flush against right edge when scrolled to end */}
        <div className="shrink-0 w-4" />
      </div>

      <div className="flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: active === i ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: active === i ? "#1f1f1f" : "#ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
}
