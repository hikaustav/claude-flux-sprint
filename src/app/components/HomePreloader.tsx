"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function HomePreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const brand = brandRef.current;
    const meta = metaRef.current;
    const line = lineRef.current;
    if (!overlay || !brand || !meta || !line) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let hasStarted = false;
    const run = () => {
      if (hasStarted) return;
      hasStarted = true;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        },
      });

      tl.to([brand, meta], { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 })
        .to(line, { scaleX: 1, duration: 0.85, ease: "power3.inOut" }, "-=0.25")
        .to([brand, meta], { y: -18, opacity: 0, duration: 0.4, stagger: 0.04 }, "+=0.2")
        .to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "power4.inOut" }, "-=0.1");
    };

    let fallbackTimer: number | null = null;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([brand, meta], { y: 18, opacity: 0 });

      if (document.readyState === "complete") {
        run();
      } else {
        window.addEventListener("load", run, { once: true });
        fallbackTimer = window.setTimeout(run, 650);
      }
    }, overlay);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("load", run);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      data-home-preloader
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-black px-4 py-6 md:px-8 md:py-8"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <p
        ref={metaRef}
        className="font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-white/70"
      >
        [ Home ]
      </p>

      <div className="flex flex-col gap-5">
        <div
          ref={brandRef}
          className="font-semibold capitalize leading-none text-white"
          style={{ fontSize: "clamp(42px, 12vw, 160px)", letterSpacing: "-0.07em" }}
        >
          H.Studio
        </div>
        <div className="h-px w-full overflow-hidden bg-white/20">
          <div ref={lineRef} className="h-full w-full bg-white" />
        </div>
      </div>
    </div>
  );
}
