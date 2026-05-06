"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsAnimations() {
  useEffect(() => {
    let removeMouseMove: (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ── Hero rules draw in + text stagger ────────────────────────
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

      // ── Cursor-following image preview (desktop only) ─────────────
      const preview   = document.querySelector<HTMLElement>("#project-preview");
      const previewImg = document.querySelector<HTMLImageElement>("#project-preview-img");
      const rows      = document.querySelectorAll<HTMLElement>("[data-project-row]");

      if (preview && previewImg && window.innerWidth >= 768) {
        gsap.set(preview, { opacity: 0, scale: 0.92 });

        // Track mouse globally while a row is hovered
        let isHovered = false;
        const onMove = (e: MouseEvent) => {
          if (!isHovered) return;
          gsap.to(preview, {
            x: e.clientX + 24,
            y: e.clientY - preview.offsetHeight / 2,
            duration: 0.55,
            ease: "power2.out",
          });
        };
        window.addEventListener("mousemove", onMove);
        removeMouseMove = () => window.removeEventListener("mousemove", onMove);

        rows.forEach((row) => {
          const imgSrc = row.dataset.img ?? "";

          row.addEventListener("mouseenter", () => {
            isHovered = true;
            previewImg.src = imgSrc;
            gsap.to(preview, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
          });
          row.addEventListener("mouseleave", () => {
            isHovered = false;
            gsap.to(preview, { opacity: 0, scale: 0.92, duration: 0.35, ease: "power2.inOut" });
          });
        });

      }

      // ── Row underlines animate on hover ──────────────────────────
      rows.forEach((row) => {
        const line  = row.querySelector<HTMLElement>("[data-row-line]");
        const title = row.querySelector<HTMLElement>("[data-row-title]");
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left" });

        row.addEventListener("mouseenter", () => {
          if (line)  gsap.to(line,  { scaleX: 1, duration: 0.6,  ease: "expo.out" });
          if (title) gsap.to(title, { x: 12,     duration: 0.55, ease: "expo.out" });
        });
        row.addEventListener("mouseleave", () => {
          if (line)  gsap.to(line,  { scaleX: 0, duration: 0.5,  ease: "expo.inOut" });
          if (title) gsap.to(title, { x: 0,      duration: 0.5,  ease: "expo.inOut" });
        });
      });

      // ── Rows stagger in on scroll ─────────────────────────────────
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
            delay: i * 0.04,
          }
        );
      });

      // ── Filter tags fade in ───────────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-filter-tag]").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.4 + i * 0.06 }
        );
      });

    });

    return () => { ctx.revert(); removeMouseMove?.(); };
  }, []);

  return null;
}
