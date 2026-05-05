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
    };
  }, []);

  return null;
}
