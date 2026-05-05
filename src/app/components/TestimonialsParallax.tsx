"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPEEDS = [-0.10, 0.09, -0.08, 0.11];

export function TestimonialsParallax() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#testimonials-desktop");
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-tcard]"));
    const cleanups: (() => void)[] = [];

    // ── Scroll parallax ──
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.0,
      onUpdate: (self) => {
        cards.forEach((card, i) => {
          const speed = SPEEDS[i] ?? 0;
          const y = self.progress * speed * section.offsetHeight;
          gsap.set(card, { y });
        });
      },
    });

    // ── Hover with mouse-tracking tilt ──
    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>("[data-tcard-inner]");
      const baseRotate = parseFloat(card.dataset.rotate ?? "0");

      const onEnter = () => {
        if (inner) gsap.to(inner, {
          scale: 1.06,
          y: -14,
          rotate: baseRotate * 0.3,
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          duration: 0.6,
          ease: "expo.out",
        });
      };

      const onMove = (e: MouseEvent) => {
        if (!inner) return;
        const rect = inner.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(inner, {
          rotateY: dx * 8,
          rotateX: -dy * 6,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };

      const onLeave = () => {
        if (inner) gsap.to(inner, {
          scale: 1,
          y: 0,
          rotate: baseRotate,
          rotateX: 0,
          rotateY: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      trigger.kill();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
