"use client";
import { useEffect } from "react";
import gsap from "gsap";

export function ServicesHover() {
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-service-row]"));
    if (!rows.length) return;

    const cleanups: (() => void)[] = [];

    // Set all lines to 30% width initially
    rows.forEach((row) => {
      const line = row.querySelector<HTMLElement>("[data-service-line]");
      if (line) gsap.set(line, { scaleX: 0.3, transformOrigin: "left" });
    });

    rows.forEach((row) => {
      const line   = row.querySelector<HTMLElement>("[data-service-line]");
      const titles = row.querySelectorAll<HTMLElement>("[data-service-title]");
      const imgs   = row.querySelectorAll<HTMLElement>("[data-service-img]");

      const onEnter = () => {
        if (line)          gsap.to(line,   { scaleX: 1,   duration: 0.8,  ease: "expo.out",   transformOrigin: "left" });
        if (titles.length) gsap.to(titles, { x: 20,       duration: 0.75, ease: "expo.out" });
        if (imgs.length)   gsap.to(imgs,   { scale: 1.18, duration: 0.9,  ease: "expo.out" });
      };

      const onLeave = () => {
        if (line)          gsap.to(line,   { scaleX: 0.3, duration: 0.7,  ease: "expo.inOut", transformOrigin: "left" });
        if (titles.length) gsap.to(titles, { x: 0,        duration: 0.65, ease: "expo.inOut" });
        if (imgs.length)   gsap.to(imgs,   { scale: 1,    duration: 0.8,  ease: "expo.inOut" });
      };

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    // ── Work cards ──
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-work-card]"));

    cards.forEach((card) => {
      const img   = card.querySelector<HTMLElement>("[data-work-img]");
      const title = card.querySelector<HTMLElement>("[data-work-title]");

      const onEnter = () => {
        if (img)   gsap.to(img,   { scale: 1.07, duration: 0.9,  ease: "expo.out" });
        if (title) gsap.to(title, { x: 20,       duration: 0.75, ease: "expo.out" });
      };
      const onLeave = () => {
        if (img)   gsap.to(img,   { scale: 1, duration: 0.8,  ease: "expo.inOut" });
        if (title) gsap.to(title, { x: 0,     duration: 0.65, ease: "expo.inOut" });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    // ── News cards ──
    const newsCards = Array.from(document.querySelectorAll<HTMLElement>("[data-news-card]"));

    newsCards.forEach((card) => {
      const img  = card.querySelector<HTMLElement>("[data-news-img]");
      const line = card.querySelector<HTMLElement>("[data-news-line]");

      if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left" });

      const onEnter = () => {
        if (img)  gsap.to(img,  { scale: 1.07, duration: 0.9,  ease: "expo.out" });
        if (line) gsap.to(line, { scaleX: 1,   duration: 0.75, ease: "expo.out" });
      };
      const onLeave = () => {
        if (img)  gsap.to(img,  { scale: 1,    duration: 1.2,  ease: "power3.inOut" });
        if (line) gsap.to(line, { scaleX: 0,   duration: 1.0,  ease: "power3.inOut" });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
