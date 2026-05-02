"use client";
import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export function MobileMenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col px-6 pt-6 pb-10" style={{ zIndex: 50 }}>
          <div className="flex items-center justify-between mb-12">
            <span className="text-base font-semibold tracking-[-0.04em] text-white capitalize">H.Studio</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-white w-6 h-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-white text-4xl font-light tracking-[-0.04em] uppercase leading-none hover:opacity-60 transition-opacity"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center px-4 py-3 bg-white rounded-[24px] text-black text-sm font-medium tracking-[-0.04em]"
          >
            Let&apos;s talk
          </a>
        </div>
      )}
      <button
        className="md:hidden flex flex-col gap-[6px] w-6"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className="block h-[1.5px] w-full bg-black" />
        <span className="block h-[1.5px] w-full bg-black" />
        <span className="block h-[1.5px] w-full bg-black" />
      </button>
    </>
  );
}
