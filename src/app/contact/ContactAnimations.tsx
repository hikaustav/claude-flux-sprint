"use client";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactAnimations() {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Page-load: header statement slides up ─────────────────────
      gsap.fromTo("#contact-statement",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo("#contact-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );

      // ── Header rules draw in ──────────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-header-rule]").forEach((el, i) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: "power3.inOut", delay: 0.05 + i * 0.1, transformOrigin: "left" }
        );
      });

      // ── Form fields stagger up ────────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-form-field]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay: 0.35 + i * 0.08 }
        );
      });

      // ── Info blocks slide in from right ───────────────────────────
      document.querySelectorAll<HTMLElement>("[data-info-block]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: 28 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.5 + i * 0.1 }
        );
      });

      // ── Pill options — hover scale ────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-pill]").forEach((pill) => {
        pill.addEventListener("mouseenter", () => {
          gsap.to(pill, { scale: 1.05, duration: 0.25, ease: "power2.out" });
        });
        pill.addEventListener("mouseleave", () => {
          gsap.to(pill, { scale: 1, duration: 0.3, ease: "power2.inOut" });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <style>{`
      #contact-statement { opacity: 0; }
      #contact-meta { opacity: 0; }
      [data-header-rule] { transform: scaleX(0); transform-origin: left center; }
      [data-form-field] { opacity: 0; }
      [data-info-block] { opacity: 0; }
    `}</style>
  );
}
