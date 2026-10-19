"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Small mono label above a heading, with a leading dot. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,200,162,0.8)]" />
      {children}
    </p>
  );
}

/** Italic serif accent word(s) inside a sans heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic text-accent-soft">{children}</em>;
}

/** Section heading with the editorial type scale. */
export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-4 text-balance text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white ${className}`}
    >
      {children}
    </h2>
  );
}

/** Mock app window: traffic-light dots, a mono title, optional right slot. */
export function Window({
  title,
  right,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-black-100/80 shadow-card backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-[12px] text-secondary">{title}</p>
        {right ? <div className="flex-shrink-0 font-mono text-[12px] text-secondary">{right}</div> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Full-width page section on the shared grid. */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-0 mx-auto max-w-7xl scroll-mt-20 px-6 py-20 sm:px-16 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

/** Mono chip. */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-tertiary/70 px-3 py-1.5 font-mono text-[13px] text-secondary ${className}`}
    >
      {children}
    </span>
  );
}
