"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // Harvey slides left immediately
      tl.to("#hero-harvey-desktop", { x: "-22vw", ease: "none" }, 0);
      // Greeting follows Harvey but with a 1s delay
      tl.to("#hero-greeting-desktop", { x: "-22vw", ease: "none" }, 0);

      // Specter slides right
      tl.to("#hero-specter-desktop", {
        x: "22vw",
        ease: "none",
      }, 0);

      // Mobile Harvey immediately, greeting delayed
      tl.to("#hero-harvey-mobile", { x: "-18vw", ease: "none" }, 0);
      tl.to("#hero-greeting-mobile", { x: "-18vw", ease: "none" }, 0);

      // Mobile Specter right
      tl.to("#hero-specter-mobile", {
        x: "18vw",
        ease: "none",
      }, 0);

      // BG image grows
      tl.to("#hero-bg", {
        scale: 1.18,
        transformOrigin: "50% 20%",
        ease: "none",
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  return null;
}
