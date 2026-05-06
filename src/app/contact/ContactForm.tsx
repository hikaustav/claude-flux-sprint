"use client";

import { FormEvent, useState } from "react";

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

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  contactEmail: string;
};

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          projectType: formData.get("project_type"),
          budget: formData.get("budget"),
          timeline: formData.get("timeline"),
          message: formData.get("message"),
          companyWebsite: formData.get("company_website"),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not send your message.");
      }

      form.reset();
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not send your message.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form className="flex flex-col gap-10 flex-1 min-w-0" onSubmit={handleSubmit}>
      <div data-form-field className="flex flex-col gap-2 group">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Full name
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Your name"
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
          required
          className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.2] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
        />
      </div>

      <div data-form-field className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Type of project
        </label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type, index) => (
            <label key={type} data-pill className="cursor-pointer">
              <input
                type="radio"
                name="project_type"
                value={type}
                defaultChecked={index === 0}
                className="sr-only peer"
              />
              <span className="block font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-4 py-2.5 rounded-full border border-[#1f1f1f]/20 text-[#1f1f1f]/50 peer-checked:border-[#1f1f1f] peer-checked:text-[#1f1f1f] peer-checked:bg-[#1f1f1f] peer-checked:text-white transition-all duration-200 select-none">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div data-form-field className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)] text-[#1f1f1f]/40 text-[11px] uppercase leading-[1.1] tracking-[0.04em]">
          Budget range
        </label>
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget, index) => (
            <label key={budget} data-pill className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={budget}
                defaultChecked={index === 0}
                className="sr-only peer"
              />
              <span className="block font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] px-4 py-2.5 rounded-full border border-[#1f1f1f]/20 text-[#1f1f1f]/50 peer-checked:border-[#1f1f1f] peer-checked:text-[#1f1f1f] peer-checked:bg-[#1f1f1f] peer-checked:text-white transition-all duration-200 select-none">
                {budget}
              </span>
            </label>
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
          required
          className="w-full bg-transparent border-0 border-b border-[#1f1f1f]/15 pb-3 text-[#1f1f1f] font-normal leading-[1.4] tracking-[-0.02em] placeholder:text-[#1f1f1f]/25 outline-none focus:border-[#1f1f1f] transition-colors duration-300 resize-none"
          style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
        />
      </div>

      {/* Hidden honeypot field to catch bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

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
          {submitState === "success" && "Message saved. I will reply soon."}
          {submitState === "error" && (
            <>
              {errorMessage}{" "}
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
