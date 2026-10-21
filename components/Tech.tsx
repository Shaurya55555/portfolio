"use client";

import { useEffect, useRef, useState } from "react";
import { Accent, H2, Kicker, Section, SectionHead } from "./ui";
import { technologies, moreTech } from "@/lib/data";

const ICONS: Record<string, string> = Object.fromEntries(
  [...technologies, ...moreTech].map((t) => [t.name, t.icon]),
);

/** Three orbits, inner to outer: the front end I lead with, the data and
 *  server layer, then the infrastructure and AI tooling around it. */
const RINGS: { name: string; items: string[]; ring: number; speed: number }[] = [
  { name: "Front end", ring: 0.4, speed: 0.3, items: ["React JS", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit", "JavaScript"] },
  { name: "Back end and data", ring: 0.7, speed: 0.18, items: ["Node JS", "Express", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "Python", "FastAPI"] },
  { name: "Infra and AI", ring: 1, speed: 0.11, items: ["Docker", "Kafka", "Nginx", "git", "Jenkins", "GitHub Actions", "C++", "LangChain", "Gemini API", "HTML 5", "CSS 3"] },
];

const LABEL: Record<string, string> = {
  "React JS": "React",
  "Node JS": "Node.js",
  "HTML 5": "HTML",
  "CSS 3": "CSS",
  git: "Git",
};

type Node = { name: string; ring: number; a0: number; speed: number };
const NODES: Node[] = RINGS.flatMap((r) =>
  r.items.map((name, i) => ({ name, ring: r.ring, a0: (i / r.items.length) * Math.PI * 2 + r.ring, speed: r.speed })),
);

/** Every tool, orbiting a core. Hover or tap one to pause and read its name. */
function TechOrbit() {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);
  const angles = useRef(NODES.map((n) => n.a0));
  const visible = useRef(true);
  hoverRef.current = hover;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setDim({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    // only animate while the section is on screen
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const wide = dim.w >= 640;
  const tile = wide ? 56 : 40;
  const rx = Math.max(0, dim.w / 2 - tile);
  const ry = Math.max(0, dim.h / 2 - tile * 0.9);
  const cx = dim.w / 2;
  const cy = dim.h / 2;

  useEffect(() => {
    if (!dim.w) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const run = visible.current && !still && hoverRef.current === null;
      NODES.forEach((n, i) => {
        if (run) angles.current[i] += dt * n.speed;
        const a = angles.current[i];
        const x = cx + Math.cos(a) * rx * n.ring;
        const y = cy + Math.sin(a) * ry * n.ring;
        const depth = (Math.sin(a) + 1) / 2;
        const el = els.current[i];
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.86 + depth * 0.26})`;
          el.style.zIndex = String(Math.round(depth * 10) + 1);
        }
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [dim.w, dim.h, cx, cy, rx, ry]);

  return (
    <div ref={box} className="relative mx-auto mt-10 h-[460px] w-full max-w-5xl sm:h-[600px]" role="group" aria-label="Tools I work with, in orbit">
      {dim.w > 0 && (
        <>
          <svg aria-hidden className="absolute inset-0 h-full w-full">
            {RINGS.map((r) => (
              <ellipse key={r.name} cx={cx} cy={cy} rx={rx * r.ring} ry={ry * r.ring} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            ))}
          </svg>

          {/* core: a small sun, so the whole stack orbits one thing */}
          <div
            aria-hidden
            className="absolute"
            style={{ left: cx, top: cy, width: wide ? 76 : 50, height: wide ? 76 : 50, transform: "translate(-50%,-50%)" }}
          >
            <div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: wide ? 300 : 190,
                height: wide ? 300 : 190,
                transform: "translate(-50%,-50%)",
                background: "radial-gradient(circle, rgba(255,190,110,0.5) 0%, rgba(255,150,60,0.22) 24%, transparent 62%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/solar/sun.webp" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none rounded-full shadow-[0_0_36px_8px_rgba(255,150,60,0.55)]" />
          </div>

          {NODES.map((n, i) => (
            <div
              key={n.name}
              ref={(el) => {
                els.current[i] = el;
              }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((c) => (c === i ? null : c))}
              className="absolute left-0 top-0 cursor-default"
              style={{ width: tile, height: tile, willChange: "transform" }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-full border bg-[#0b0b0d] shadow-[0_6px_24px_rgba(0,0,0,0.6)] transition-all duration-200 ${
                  hover === i ? "scale-125 border-accent" : "border-white/15"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS[n.name]} alt={n.name} draggable={false} className="h-[56%] w-[56%] select-none object-contain" />
              </div>
              <span
                className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition-opacity ${
                  hover === i ? "opacity-100" : "opacity-0"
                }`}
              >
                {LABEL[n.name] ?? n.name}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/** The whole toolbox as a small solar system. */
export default function Tech() {
  return (
    <Section id="stack" planet="stack">
      <SectionHead>
        <Kicker>What I work with</Kicker>
        <H2>
          Tech. <Accent>In orbit.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          Front end on the inner orbit, back end and data in the middle, infrastructure and AI tooling on the outer ring.
        </p>
      </SectionHead>
      <TechOrbit />
    </Section>
  );
}
