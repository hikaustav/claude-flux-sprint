/**
 * Shared typography primitives.
 * All design-language choices live here — pages just compose these.
 */

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  dim?: boolean;
}

/** Geist Mono uppercase label — used for section numbers, tags, metadata */
export function Label({ children, className = "", dim = false }: LabelProps) {
  return (
    <p
      className={`font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] tracking-[0em] ${
        dim ? "opacity-40" : ""
      } ${className}`}
    >
      {children}
    </p>
  );
}

interface StatementProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "blockquote";
}

/** Playfair Display italic — large editorial statement lines */
export function Statement({ children, className = "", as: Tag = "p" }: StatementProps) {
  return (
    <Tag
      className={`font-[family-name:var(--font-playfair)] italic leading-[1.1] tracking-[-0.03em] ${className}`}
    >
      {children}
    </Tag>
  );
}

interface PageHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/** Inter black uppercase — large display headings */
export function PageHeading({ children, className = "", as: Tag = "h1" }: PageHeadingProps) {
  return (
    <Tag
      className={`font-black not-italic uppercase tracking-[-0.04em] leading-[0.95] ${className}`}
    >
      {children}
    </Tag>
  );
}

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
}

/** Geist Mono pill tag — used on project/news cards */
export function TagPill({ children, className = "" }: TagPillProps) {
  return (
    <span
      className={`font-[family-name:var(--font-geist-mono)] text-[10px] uppercase leading-[1.1] tracking-[0.04em] border border-current rounded-full px-2 py-1 ${className}`}
    >
      {children}
    </span>
  );
}

interface DividerProps {
  className?: string;
  dim?: boolean;
}

/** Full-width 1px rule */
export function Divider({ className = "", dim = false }: DividerProps) {
  return (
    <div className={`w-full h-px ${dim ? "bg-current opacity-20" : "bg-current"} ${className}`} />
  );
}
