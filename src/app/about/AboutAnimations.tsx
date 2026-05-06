"use client";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutAnimations() {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entry — portrait slides up, text items stagger in ──────
      const portrait = document.querySelector<HTMLElement>("#about-portrait");
      if (portrait) {
        gsap.fromTo(portrait,
          { yPercent: 8, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.1 }
        );
      }

      const heroItems = document.querySelectorAll<HTMLElement>("[data-hero-item]");
      heroItems.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 + i * 0.1 }
        );
      });

      // ── Statement — words reveal by sliding up out of a clip ──────
      const wordSpans = document.querySelectorAll<HTMLElement>("[data-word]");
      wordSpans.forEach((span, i) => {
        gsap.fromTo(span,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#statement-section",
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: i * 0.04,
          }
        );
      });

      // ── Timeline — vertical line draws down, then entries stagger ──
      const timelineLine = document.querySelector<HTMLElement>("#timeline-line");
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.6,
            ease: "power3.inOut",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "#timeline-section",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      document.querySelectorAll<HTMLElement>("[data-timeline-entry]").forEach((entry, i) => {
        gsap.fromTo(entry,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 82%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      });

      // ── Discipline cells stagger in ───────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-discipline]").forEach((cell, i) => {
        gsap.fromTo(cell,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cell,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.07,
          }
        );
      });

      // ── Discipline cells — hover image reveal ─────────────────────
      const disciplines = document.querySelectorAll<HTMLElement>("[data-discipline]");
      disciplines.forEach((cell) => {
        const overlay = cell.querySelector<HTMLElement>("[data-disc-overlay]");
        if (!overlay) return;
        gsap.set(overlay, { opacity: 0 });
        cell.addEventListener("mouseenter", () => {
          gsap.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" });
        });
        cell.addEventListener("mouseleave", () => {
          gsap.to(overlay, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <style>{`
      #about-portrait { opacity: 0; }
      [data-hero-item] { opacity: 0; }
    `}</style>
  );
}
