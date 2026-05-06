"use client";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServicesAnimations() {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero — text items stagger in on load ─────────────────────
      document.querySelectorAll<HTMLElement>("[data-hero-line]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 + i * 0.1 }
        );
      });

      // ── Hero divider lines draw in ────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-hero-rule]").forEach((el, i) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 0.1 + i * 0.15, transformOrigin: "left" }
        );
      });

      // ── Service strips — image scale + content slide in ──────────
      document.querySelectorAll<HTMLElement>("[data-service-strip]").forEach((strip) => {
        const img     = strip.querySelector<HTMLElement>("[data-strip-img]");
        const content = strip.querySelector<HTMLElement>("[data-strip-content]");
        const isReversed = strip.dataset.reversed === "true";

        if (img) {
          gsap.fromTo(img,
            { scale: 1.08, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
              scrollTrigger: { trigger: strip, start: "top 80%", toggleActions: "play none none none" },
            }
          );
        }
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, x: isReversed ? 40 : -40 },
            {
              opacity: 1, x: 0, duration: 1.0, ease: "power3.out",
              scrollTrigger: { trigger: strip, start: "top 80%", toggleActions: "play none none none" },
              delay: 0.15,
            }
          );
        }
      });

      // ── Strip header rules draw in ────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-strip-rule]").forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.0, ease: "power3.inOut", transformOrigin: "left",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ── Process steps stagger in ──────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-process-step]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            delay: i * 0.1,
          }
        );
      });

      // ── Process connecting line draws ─────────────────────────────
      const processLine = document.querySelector<HTMLElement>("#process-line");
      if (processLine) {
        gsap.fromTo(processLine,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.6, ease: "power3.inOut", transformOrigin: "left",
            scrollTrigger: { trigger: "#process-section", start: "top 75%", toggleActions: "play none none none" },
          }
        );
      }

      // ── Deliverables list items stagger ───────────────────────────
      document.querySelectorAll<HTMLElement>("[data-deliverable]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -16 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            delay: i * 0.06,
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  return null;
}
