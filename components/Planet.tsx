"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type PlanetKey = "about" | "build" | "work" | "projects" | "proof" | "stack";

export type Spec = {
  name: string;
  n: string;
  /** light, mid, shadow */
  c: [string, string, string];
  ring?: string;
  side: "left" | "right";
  top: string;
};

/** One world per section. Colours stay warm/cool and low-chroma so the
 *  neutral black page and the peach accent still lead. */
export const PLANETS: Record<PlanetKey, Spec> = {
  about: { name: "Solara", n: "01", c: ["#ffe2bd", "#d98a3d", "#3b1d09"], ring: "#f3c98f", side: "right", top: "2%" },
  build: { name: "Glacia", n: "02", c: ["#d9ecff", "#5d8fc7", "#0e1c33"], side: "left", top: "4%" },
  work: { name: "Ember", n: "03", c: ["#ffc4a8", "#c2452a", "#2a0b07"], side: "right", top: "8%" },
  projects: { name: "Nebulon", n: "04", c: ["#e3d3ff", "#7a5bd1", "#150b33"], ring: "#bda6ff", side: "left", top: "0%" },
  proof: { name: "Verdea", n: "05", c: ["#d4f5e2", "#3f9c78", "#08241b"], side: "right", top: "10%" },
  stack: { name: "Aquor", n: "06", c: ["#cdf3ff", "#2f93b8", "#06202c"], ring: "#8fd8f0", side: "left", top: "0%" },
};

export function World({ spec }: { spec: Spec }) {
  const [a, b, c] = spec.c;
  return (
    <div className="relative h-full w-full">
      {spec.ring && (
        <div
          className="absolute left-1/2 top-1/2 h-[34%] w-[170%] rounded-[50%] border-[3px] opacity-60"
          style={{
            borderColor: spec.ring,
            transform: "translate(-50%,-50%) rotate(-18deg)",
            boxShadow: `0 0 24px ${spec.ring}55, inset 0 0 24px ${spec.ring}44`,
          }}
        />
      )}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 26%, ${a} 0%, ${b} 40%, ${c} 78%, #000 100%)`,
          boxShadow: `0 0 90px ${b}40, inset -36px -28px 70px #000d`,
        }}
      >
        {/* slowly drifting surface bands */}
        <div
          className="planet-bands absolute inset-[-20%]"
          style={{
            background: `repeating-linear-gradient(${spec.ring ? 8 : -12}deg, transparent 0 22px, ${a}26 22px 34px, transparent 34px 60px)`,
            mixBlendMode: "soft-light",
          }}
        />
      </div>
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
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(255,200,162,0.55)]"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:left-5 sm:text-[11px] sm:tracking-[0.25em]">
        Next stop · {to}
      </span>
    </div>
  );
}
