"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero rules + text stagger ─────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-hero-rule]").forEach((el, i) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 0.1 + i * 0.12, transformOrigin: "left" }
        );
      });
      document.querySelectorAll<HTMLElement>("[data-hero-line]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.2 + i * 0.09 }
        );
      });

      // ── Featured article — image scale reveal ─────────────────────
      const featImg = document.querySelector<HTMLElement>("#featured-img");
      if (featImg) {
        gsap.fromTo(featImg,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 1.3, ease: "power3.out",
            scrollTrigger: { trigger: "#featured-article", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // ── Featured overlay text slides up ───────────────────────────
      const featContent = document.querySelector<HTMLElement>("#featured-content");
      if (featContent) {
        gsap.fromTo(featContent,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: "#featured-article", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // ── Article cards stagger in ──────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-article-card]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            delay: i * 0.1,
          }
        );
      });

      // ── Article card — image scale + read-more line on hover ──────
      document.querySelectorAll<HTMLElement>("[data-article-card]").forEach((card) => {
        const img  = card.querySelector<HTMLElement>("[data-card-img]");
        const line = card.querySelector<HTMLElement>("[data-read-line]");
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left" });

        card.addEventListener("mouseenter", () => {
          if (img)  gsap.to(img,  { scale: 1.06, duration: 0.9,  ease: "expo.out" });
          if (line) gsap.to(line, { scaleX: 1,   duration: 0.65, ease: "expo.out" });
        });
        card.addEventListener("mouseleave", () => {
          if (img)  gsap.to(img,  { scale: 1,    duration: 1.1,  ease: "power3.inOut" });
          if (line) gsap.to(line, { scaleX: 0,   duration: 0.55, ease: "expo.inOut" });
        });
      });

      // ── List-style articles stagger in ────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-list-article]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            delay: i * 0.08,
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  return null;
}
