"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import type { ReactNode } from "react";
import { fadeIn } from "@/lib/motion";
import { STATION_W, useScene } from "./HorizontalScene";
import { PlanetBackdrop, type PlanetKey } from "./Planet";

/** Small mono label above a heading, with a leading dot. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,180,84,0.8)]" />
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
      className={`overflow-hidden rounded-2xl border border-white/10 bg-panel/90 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-[12px] text-muted">{title}</p>
        {right ? <div className="flex-shrink-0 font-mono text-[12px] text-muted">{right}</div> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/**
 * Slide + fade on scroll into view, using the site's original spring variants.
 * `from` is where it travels from: "up" rises from below, "right" slides in
 * from the left, "left" slides in from the right, "down" drops from above.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "right",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "down" | "left" | "right";
}) {
  const dir = from === "up" ? "up" : from === "down" ? "down" : from === "left" ? "left" : "right";
  return (
    <motion.div
      className={className}
      variants={fadeIn(dir, "spring", delay, 0.8)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading block: slides in from the left (horizontal, no vertical drop). */
export function SectionHead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { x: -80, opacity: 0 },
        show: { x: 0, opacity: 1, transition: { type: "spring", duration: 1, bounce: 0.2 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

/** Hover tilt with a soft glare, as on the original cards. */
export function TiltCard({
  children,
  className = "",
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.12}
      glareColor="#ffffff"
      tiltMaxAngleX={max}
      tiltMaxAngleY={max}
      scale={1.015}
      transitionSpeed={900}
      className={className}
    >
      {children}
    </Tilt>
  );
}

/** Full-width page section on the shared grid. */
export function Section({
  id,
  children,
  className = "",
  planet,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  planet?: PlanetKey;
}) {
  const scene = useScene();
  if (scene) {
    // inside the horizontal scene a section is a fixed-width station
    return (
      <section
        id={id}
        data-station
        style={{ width: STATION_W[id] }}
        className={`relative flex-none ${className}`}
      >
        {children}
      </section>
    );
  }
  return (
    <section
      id={id}
      className={`relative z-0 mx-auto max-w-7xl scroll-mt-20 px-6 py-12 sm:px-16 sm:py-16 ${className}`}
    >
      {planet && <PlanetBackdrop id={planet} />}
      {children}
    </section>
  );
}

/** Mono chip. */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-panel-2/70 px-3 py-1.5 font-mono text-[13px] text-muted ${className}`}
    >
      {children}
    </span>
  );
}
