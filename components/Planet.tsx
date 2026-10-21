"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type PlanetKey =
  | "about"
  | "build"
  | "work"
  | "projects"
  | "proof"
  | "stack"
  | "earth"
  | "neptune";

export type Spec = {
  name: string;
  n: string;
  /** real photograph, served from /public/solar */
  img: string;
  /** width / height of the image when the planet is not a plain disc (Saturn's rings) */
  wide?: number;
  side: "left" | "right";
  top: string;
};

/** The real solar system, one world per section. Images are NASA / ESA
 *  photographs via Wikimedia Commons (see the footer credit). */
export const PLANETS: Record<PlanetKey, Spec> = {
  about: { name: "Mercury", n: "01", img: "/solar/mercury.webp", side: "right", top: "6%" },
  build: { name: "Venus", n: "02", img: "/solar/venus.webp", side: "left", top: "4%" },
  earth: { name: "Earth", n: "03", img: "/solar/earth.webp", side: "right", top: "0%" },
  work: { name: "Mars", n: "04", img: "/solar/mars.webp", side: "right", top: "8%" },
  projects: { name: "Jupiter", n: "05", img: "/solar/jupiter.webp", side: "left", top: "0%" },
  proof: { name: "Saturn", n: "06", img: "/solar/saturn.webp", wide: 2.45, side: "right", top: "10%" },
  stack: { name: "Uranus", n: "07", img: "/solar/uranus.webp", side: "left", top: "0%" },
  neptune: { name: "Neptune", n: "08", img: "/solar/neptune.webp", side: "right", top: "0%" },
};

/** A real planet photograph. For ringed Saturn the box is the planet disc and
 *  the rings extend past it. */
export function World({ spec }: { spec: Spec }) {
  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spec.img}
        alt=""
        draggable={false}
        className={
          spec.wide
            ? "pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
            : "pointer-events-none h-full w-full select-none"
        }
        style={spec.wide ? { width: `${spec.wide * 100}%` } : undefined}
      />
    </div>
  );
}

/** A planet that sits behind a section: it grows in as you arrive,
 *  drifts with the scroll, and shrinks away as you leave. */
export function PlanetBackdrop({ id }: { id: PlanetKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const spec = PLANETS[id];
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(p, [0, 1], [140, -140]);
  const scale = useTransform(p, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.75]);
  const opacity = useTransform(p, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const side =
    spec.side === "right" ? "right-[-10rem] md:right-[-13rem] lg:right-[-12rem]" : "left-[-10rem] md:left-[-13rem] lg:left-[-12rem]";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={{ y, scale, opacity, top: spec.top }}
        className={`absolute ${side} flex flex-col items-center`}
      >
        <p className="mb-5 hidden font-mono text-[11px] uppercase tracking-[0.3em] text-muted md:block">
          Planet {spec.n} · {spec.name}
        </p>
        <div className="h-[230px] w-[230px] opacity-35 sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] md:opacity-55 lg:h-[440px] lg:w-[440px]">
          <World spec={spec} />
        </div>
      </motion.div>
    </div>
  );
}

/** The route between two planets: a dashed path with a dot that travels it. */
export function Travel({ to }: { to: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start 90%", "end 30%"],
  });
  const top = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} aria-hidden className="relative mx-auto my-2 h-28 w-px">
      <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.22)_0_4px,transparent_4px_11px)]" />
      <motion.span
        style={{ top }}
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(139,92,246,0.55)]"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:left-5 sm:text-[11px] sm:tracking-[0.25em]">
        Next stop · {to}
      </span>
    </div>
  );
}
