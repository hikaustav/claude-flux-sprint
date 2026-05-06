"use client";

import { FormEvent, useState } from "react";

const FORMSPARK_URL = "https://submit-form.com/oMcuQzQWZ";

const projectTypes = [
  "Brand Identity",
  "Web Design & Dev",
  "Photography",
  "Marketing",
  "Something else",
];

const budgets = [
  "< $5k",
  "$5k - $15k",
  "$15k - $30k",
  "$30k+",
  "Let's discuss",
];

const PILL_BASE = "block font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-4 py-2.5 rounded-full border transition-all duration-200 select-none";
const PILL_INACTIVE = "border-[#1f1f1f]/20 text-[#1f1f1f]/50";
const PILL_ACTIVE = "border-[#1f1f1f] bg-[#1f1f1f] text-white";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  contactEmail: string;
};

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedProjectType) {
      setValidationError("Please select a project type.");
      return;
    }
    if (!selectedBudget) {
      setValidationError("Please select a budget range.");
      return;
    }

    setValidationError("");
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPARK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: formData.get("full_name"),
          email: formData.get("email"),
          project_type: selectedProjectType,
          budget_range: selectedBudget,
          timeline: formData.get("timeline"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) throw new Error();

      form.reset();
      setSelectedProjectType(null);
      setSelectedBudget(null);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form
      className="flex flex-col gap-10 flex-1 min-w-0"
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <div data-form-field className="flex flex-col gap-2 group">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Full name
        </label>
        <div className="relative">
          <input
            type="text"
            name="full_name"
            placeholder="Your name"
            autoComplete="name"
            required
            className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
            style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
          />
        </div>
      </div>

      <div data-form-field className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Email address
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
        />
      </div>

      <div data-form-field className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Type of project
        </label>
        <input type="hidden" name="project_type" value={selectedProjectType ?? ""} />
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              data-pill
              onClick={() => setSelectedProjectType(type)}
              className={`cursor-pointer ${PILL_BASE} ${selectedProjectType === type ? PILL_ACTIVE : PILL_INACTIVE}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div data-form-field className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Budget range
        </label>
        <input type="hidden" name="budget_range" value={selectedBudget ?? ""} />
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget) => (
            <button
              key={budget}
              type="button"
              data-pill
              onClick={() => setSelectedBudget(budget)}
              className={`cursor-pointer ${PILL_BASE} ${selectedBudget === budget ? PILL_ACTIVE : PILL_INACTIVE}`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      <div data-form-field className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Ideal start date / timeline
        </label>
        <input
          type="text"
          name="timeline"
          placeholder="e.g. ASAP, Q3 2026, flexible"
          autoComplete="off"
          className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
        />
      </div>

      <div data-form-field className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Tell me about your project
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="The more you share, the better I can help"
          autoComplete="off"
          required
          className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.4] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300 resize-none"
          style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
        />
      </div>

      {/* Honeypot — hidden via CSS so bots fill it, humans don't see it */}
      <input
        name="_gotcha"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        defaultValue=""
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
      />

      <div data-form-field className="flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[24px] bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-wait disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        <p
          aria-live="polite"
          className="min-h-4 font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.3] text-[#1f1f1f]/50"
        >
          {validationError && validationError}
          {submitState === "success" && "Your message has been sent. I'll be in touch soon."}
          {submitState === "error" && (
            <>
              {"Something went wrong. Please try again. "}
              <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                Email directly
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
