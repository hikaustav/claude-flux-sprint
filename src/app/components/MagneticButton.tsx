"use client";
import { useRef } from "react";
import gsap from "gsap";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
}

export function MagneticButton({ href, children, className = "", variant = "dark" }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const isDark = variant === "dark";
  const fillColor  = isDark ? "#ffffff" : "#1f1f1f";
  const textIn     = isDark ? "#000000" : "#ffffff";
  const textOut    = isDark ? "#ffffff" : "#000000";
  const bgClass    = isDark ? "bg-black"  : "bg-white";
  const fillClass  = isDark ? "bg-white"  : "bg-[#1f1f1f]";
  const textClass  = isDark ? "text-white" : "text-[#1f1f1f]";

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(fillRef.current, { transformOrigin: `${x}px ${y}px`, scale: 0 });
    gsap.to(fillRef.current, { scale: 1.5, duration: 0.8, ease: "power2.out" });
    gsap.to(textRef.current, { color: textIn, duration: 0.4, delay: 0.15, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(fillRef.current, { transformOrigin: `${x}px ${y}px` });
    gsap.to(fillRef.current, { scale: 0, duration: 0.65, ease: "power2.inOut" });
    gsap.to(textRef.current, {
      color: textOut,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out",
      onComplete: () => gsap.set(textRef.current, { clearProps: "color" }),
    });
    gsap.to(btnRef.current,  { x: 0, y: 0, duration: 1.0, ease: "elastic.out(1, 0.32)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 1.0, ease: "elastic.out(1, 0.32)" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) * 0.22;
    const dy = (e.clientY - rect.top  - rect.height / 2) * 0.22;

    gsap.to(btnRef.current,  { x: dx,        y: dy,        duration: 0.4, ease: "power2.out" });
    gsap.to(textRef.current, { x: dx * 0.4,  y: dy * 0.4,  duration: 0.4, ease: "power2.out" });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden inline-flex w-fit items-center justify-center px-4 py-3 rounded-[24px] cursor-pointer ${bgClass} ${className}`}
    >
      <span
        ref={fillRef}
        className={`absolute inset-0 rounded-[24px] pointer-events-none ${fillClass}`}
        style={{ transform: "scale(0)" }}
      />
      <span ref={textRef} className={`relative z-10 text-sm font-medium tracking-[-0.04em] ${textClass}`}>
        {children}
      </span>
    </a>
  );
}
