"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { MobileMenuButton } from "./MobileMenu";

gsap.registerPlugin(ScrollTrigger);

const navLinks = ["About", "Services", "Projects", "News", "Contact"];
const navHrefs: Record<string, string> = { About: "/about", Services: "/services", Projects: "/projects", News: "/news", Contact: "/contact" };

export function Navbar() {
  const logoRef    = useRef<HTMLAnchorElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);
  const isDarkRef  = useRef(false);
  const [isDark, setIsDark] = useState(false);

  const transitionTo = (dark: boolean) => {
    if (isDarkRef.current === dark) return;
    isDarkRef.current = dark;

    const color = dark ? "#ffffff" : "#000000";

    gsap.to(logoRef.current, {
      color,
      duration: 0.55,
      ease: "power2.inOut",
    });

    gsap.to(".nav-link-text", {
      color,
      duration: 0.55,
      ease: "power2.inOut",
    });

    gsap.to(".nav-hamburger-bar", {
      backgroundColor: color,
      duration: 0.55,
      ease: "power2.inOut",
    });

    setIsDark(dark);
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    document.querySelectorAll("[data-nav-dark]").forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onEnter:      () => transitionTo(true),
          onLeave:      () => transitionTo(false),
          onEnterBack:  () => transitionTo(true),
          onLeaveBack:  () => transitionTo(false),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-4 md:px-8">
      <Link
        href="/"
        ref={logoRef as React.RefObject<HTMLAnchorElement>}
        className="font-semibold tracking-[-0.04em] text-black capitalize"
        style={{ fontSize: "22px" }}
      >
        H.Studio
      </Link>

      <div
        ref={linksRef}
        className="hidden md:flex items-center gap-14 text-base font-semibold tracking-[-0.04em] capitalize"
      >
        {navLinks.map((l) => (
          <a
            key={l}
            href={navHrefs[l] ?? `#${l.toLowerCase()}`}
            className="relative overflow-hidden group h-[1.2em] flex items-center"
          >
            <span className="nav-link-text block text-black transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              {l}
            </span>
            <span className="nav-link-text block absolute top-full text-black transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full opacity-50">
              {l}
            </span>
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <MagneticButton
          href="/contact"
          variant={isDark ? "light" : "dark"}
        >
          Let&apos;s talk
        </MagneticButton>
      </div>

      <MobileMenuButton isDark={isDark} />
    </nav>
  );
}
