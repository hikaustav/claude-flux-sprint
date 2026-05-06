import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer id="contact" data-nav-dark className="sticky bottom-0 bg-black overflow-hidden">

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col pt-12 gap-6">
        <div className="flex flex-col gap-6 px-4">
          <div className="flex flex-col gap-3">
            <p className="text-white text-[24px] leading-[1.1] tracking-[-0.04em] uppercase">
              <em className="font-light italic">Have a </em>
              <strong className="font-black not-italic">project</strong>
              <em className="font-light italic"> in mind?</em>
            </p>
            <MagneticButton href="mailto:hikaustav.design@gmail.com" variant="light">Let&apos;s talk</MagneticButton>
          </div>
          <div className="flex flex-col gap-3 text-white text-[18px] font-normal leading-[1.1] uppercase tracking-[-0.04em]">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>x.com</p>
            <p>Linkedin</p>
          </div>
        </div>

        <div className="w-full h-px bg-white/30" />

        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center text-white text-[12px] font-normal uppercase tracking-[-0.03em]" style={{ gap: 12 }}>
            <a href="#" className="underline">licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>
          <p className="font-[family-name:var(--font-geist-mono)] text-white text-[10px] uppercase leading-[1.1]">
            [ Coded By Claude ]
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <span
            className="block font-semibold text-white capitalize whitespace-nowrap tracking-[-0.06em] leading-[0.82]"
            style={{ fontSize: "24vw" }}
          >
            H.Studio
          </span>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col pt-12 px-8 gap-[120px]">
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="text-white text-[24px] leading-[1.1] tracking-[-0.04em] uppercase">
                <em className="font-light italic">Have a </em>
                <strong className="font-black not-italic">project</strong>
                <em className="font-light italic"> in mind?</em>
              </p>
              <MagneticButton href="mailto:hikaustav.design@gmail.com" variant="light">Let&apos;s talk</MagneticButton>
            </div>
            <div className="text-white text-[18px] font-normal leading-[1.1] uppercase tracking-[-0.04em] text-center space-y-1 w-[298px]">
              <p>Facebook</p>
              <p>Instagram</p>
            </div>
            <div className="text-white text-[18px] font-normal leading-[1.1] uppercase tracking-[-0.04em] text-right space-y-1 w-[298px]">
              <p>x.com</p>
              <p>Linkedin</p>
            </div>
          </div>
          <div className="w-full h-px bg-white" />
        </div>

        <div className="relative w-full" style={{ height: "calc(20vw * 0.85 + 80px)" }}>
          <div
            className="absolute flex items-center justify-center"
            style={{ left: 0, top: "50%", transform: "translateY(-50%)", height: "60%", width: 15 }}
          >
            <p className="font-[family-name:var(--font-geist-mono)] text-white text-[11px] uppercase leading-[1.1] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
              [ Coded By Claude ]
            </p>
          </div>
          <span
            className="absolute font-semibold text-white capitalize whitespace-nowrap tracking-[-0.06em]"
            style={{ fontSize: "20vw", lineHeight: 0.85, bottom: 40, left: 19 }}
          >
            H.Studio
          </span>
          <div
            className="absolute right-0 flex items-center text-white text-[12px] font-normal uppercase tracking-[-0.03em]"
            style={{ bottom: 44, gap: 12 }}
          >
            <a href="#" className="underline hover:opacity-70">licences</a>
            <a href="#" className="underline hover:opacity-70">Privacy policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
