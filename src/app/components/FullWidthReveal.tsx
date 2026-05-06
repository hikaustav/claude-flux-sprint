"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function makeReveal(triggerId: string, overlayId: string, start = "top 80%", end = "top 10%") {
  const overlay = document.querySelector<HTMLElement>(overlayId);
  if (!overlay) return null;

  return ScrollTrigger.create({
    trigger: triggerId,
    start,
    end,
    scrub: 1.4,
    onUpdate: (self) => {
      gsap.set(overlay, { scaleX: 1 - self.progress });
    },
  });
}

// Split an element's children into per-character inline spans, return them in DOM order
function splitToChars(el: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  const nodes = Array.from(el.childNodes);
  el.innerHTML = "";

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const ch of node.textContent ?? "") {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.whiteSpace = "pre";
        span.textContent = ch;
        el.appendChild(span);
        chars.push(span);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Keep element nodes (e.g. <em>) intact, wrap as a single char unit
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.appendChild(node);
      el.appendChild(wrapper);
      chars.push(wrapper);
    }
  });

  return chars;
}

export function FullWidthReveal() {
  useEffect(() => {
    // Blur-to-clear on the full-width image
    const fullImg = document.querySelector<HTMLElement>("#fullwidth-img");
    const t1 = fullImg
      ? ScrollTrigger.create({
          trigger: "#fullwidth-section",
          start: "top 90%",
          end: "top 20%",
          scrub: 1.4,
          onUpdate: (self) => {
            const blur = (1 - self.progress) * 24;
            const scale = 1.05 - self.progress * 0.05;
            gsap.set(fullImg, { filter: `blur(${blur}px)`, scale });
          },
          onLeaveBack: () => gsap.set(fullImg, { filter: "blur(24px)", scale: 1.05 }),
        })
      : null;

    // ── Per-character headline scrub, right-to-left ──
    // Only animate the visible layout (desktop or mobile)
    const isMobile = window.innerWidth < 768;
    const containerId = isMobile ? "#about-headline-mobile" : "#about-headline-desktop";
    const lines = Array.from(document.querySelectorAll<HTMLElement>(`${containerId} [data-about-line]`));

    // Split each line into chars; collect all in DOM order, then reverse for right-to-left
    const allChars: HTMLElement[] = [];
    lines.forEach((line) => {
      allChars.push(...splitToChars(line));
    });

    // Left to right — DOM order
    const ordered = [...allChars];
    const total = ordered.length;

    // Set initial color on all chars
    ordered.forEach((ch) => gsap.set(ch, { color: "#d0d0d0" }));

    const container = document.querySelector<HTMLElement>(containerId);
    const headlineTrigger = container
      ? ScrollTrigger.create({
          trigger: container,
          start: "top 85%",
          end: "top 25%",
          scrub: 2.2,
          onUpdate: (self) => {
            const p = self.progress;
            ordered.forEach((ch, i) => {
              const rawP = Math.max(0, Math.min(1, (p - i / total) / (1 / total)));
              const charP = 1 - Math.pow(1 - rawP, 2); // quadratic ease-out — gentler
              const v = Math.round(208 - charP * (208 - 31));
              gsap.set(ch, { color: `rgb(${v},${v},${v})` });
            });
          },
        })
      : null;

    const t2 = makeReveal("#about-photo-section", "#about-img-overlay-desktop", "top 70%", "center 40%");
    const t3 = makeReveal("#about-photo-section", "#about-img-overlay-mobile", "top 70%", "center 40%");

    // Drift paragraph box left as the photo reveals
    const paraBox = document.querySelector<HTMLElement>("#about-para-box");
    const t4 = paraBox
      ? ScrollTrigger.create({
          trigger: "#about-photo-section",
          start: "top 70%",
          end: "center 40%",
          scrub: 1.4,
          onUpdate: (self) => {
            gsap.set(paraBox, { x: self.progress * -80 });
          },
          onLeaveBack: () => gsap.set(paraBox, { x: 0 }),
        })
      : null;

    return () => {
      t1?.kill();
      t2?.kill();
      t3?.kill();
      t4?.kill();
      headlineTrigger?.kill();
    };
  }, []);

  return null;
}
