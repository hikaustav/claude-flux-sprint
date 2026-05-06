"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];
const navHrefs: Record<string, string> = { About: "/about", Services: "/services", Projects: "/projects", News: "/news", Contact: "/contact" };

export function MobileMenuButton({ isDark = false }: { isDark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const crossBar1Ref = useRef<HTMLSpanElement>(null);
  const crossBar2Ref = useRef<HTMLSpanElement>(null);
  const crossInner1Ref = useRef<HTMLSpanElement>(null);
  const crossInner2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      overlay,
      { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut", pointerEvents: "auto" }
    );

    // Cross bars draw in with stagger — animate inner spans so rotation on wrapper is untouched
    tl.fromTo(
      [crossInner1Ref.current, crossInner2Ref.current],
      { scaleX: 0 },
      { scaleX: 1, duration: 0.25, ease: "power3.out", stagger: 0.08 },
      "-=0.2"
    );

    tl.fromTo(
      linksRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.06 },
      "-=0.15"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
      "-=0.15"
    );

    tlRef.current = tl;

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (menuOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      tl.play();
    } else {
      tl.reverse().then(() => {
        gsap.set(overlayRef.current, { display: "none" });
      });
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 bg-black/95 flex-col px-6 pt-6 pb-10"
        style={{ zIndex: 50, display: "none", clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="text-2xl font-semibold tracking-[-0.04em] text-white capitalize">H.Studio</span>

          {/* Animated cross */}
          <button onClick={close} aria-label="Close menu" className="relative w-8 h-8 flex items-center justify-center">
            {/* Wrapper handles rotation; inner span handles scaleX animation */}
            <span ref={crossBar1Ref} className="absolute block w-6 h-[1.5px] origin-center" style={{ rotate: "45deg" }}>
              <span ref={crossInner1Ref} className="block w-full h-full bg-white origin-left" style={{ transform: "scaleX(0)" }} />
            </span>
            <span ref={crossBar2Ref} className="absolute block w-6 h-[1.5px] origin-center" style={{ rotate: "-45deg" }}>
              <span ref={crossInner2Ref} className="block w-full h-full bg-white origin-left" style={{ transform: "scaleX(0)" }} />
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-6 flex-1">
          {navLinks.map((l, i) => (
            <Link
              key={l}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              href={navHrefs[l]}
              onClick={close}
              className="text-white text-5xl font-light tracking-[-0.04em] uppercase leading-none w-fit overflow-hidden group relative"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l}</span>
              <span className="block absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full opacity-50">{l}</span>
            </Link>
          ))}
        </nav>

        <div ref={ctaRef}>
          <MagneticButton href="/contact" variant="light" className="w-full">
            Let&apos;s talk
          </MagneticButton>
        </div>
      </div>

      {/* Hamburger trigger */}
      <button
        className="md:hidden flex flex-col gap-[7px] w-8 group"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className={`nav-hamburger-bar block h-[2px] w-full transition-transform duration-200 group-hover:scale-x-75 origin-left ${isDark ? "bg-white" : "bg-black"}`} />
        <span className={`nav-hamburger-bar block h-[2px] w-full ${isDark ? "bg-white" : "bg-black"}`} />
        <span className={`nav-hamburger-bar block h-[2px] w-full transition-transform duration-200 group-hover:scale-x-75 origin-right ${isDark ? "bg-white" : "bg-black"}`} />
      </button>
    </>
  );
}
