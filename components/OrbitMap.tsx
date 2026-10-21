"use client";

import { useEffect, useRef, useState } from "react";
import { PLANETS, World, type PlanetKey, type Spec } from "./Planet";
import { flyStore } from "@/lib/flyStore";

type Body = {
  id: string;
  spec: Spec;
  title: string;
  detail: string;
  ring: number; // orbit radius factor
  a0: number; // start angle
  speed: number;
};

const EARTH: Spec = {
  name: "Earth",
  n: "07",
  c: ["#d6efff", "#2f6fd1", "#06142e"],
  side: "right",
  top: "0%",
};

const P = (k: PlanetKey) => PLANETS[k];

/** Every section is a world. Each one carries a short detail so a visitor
 *  can read it from orbit and then drop straight in. */
const BODIES: Body[] = [
  { id: "about", spec: P("about"), title: "About", detail: "Who I am, what I build, and how I think.", ring: 0.42, a0: 0.4, speed: 0.34 },
  { id: "build", spec: P("build"), title: "How I work", detail: "The four steps from idea to a deployed product.", ring: 0.42, a0: 3.5, speed: 0.34 },
  { id: "work", spec: P("work"), title: "Experience", detail: "Marine Edge and APJ Academy internships.", ring: 0.68, a0: 1.6, speed: 0.22 },
  { id: "projects", spec: P("projects"), title: "Projects", detail: "OARFIN, NammaStocks, Ecom GraphQL and more, live.", ring: 0.68, a0: 4.7, speed: 0.22 },
  { id: "proof", spec: P("proof"), title: "Proof", detail: "Hackathon result, DSA and certifications.", ring: 0.94, a0: 2.4, speed: 0.15 },
  { id: "stack", spec: P("stack"), title: "Tech stack", detail: "Languages, frameworks and tools I ship with.", ring: 0.94, a0: 5.4, speed: 0.15 },
  { id: "contact", spec: EARTH, title: "Contact", detail: "Send a message, or grab my email and resume.", ring: 1.18, a0: 0.9, speed: 0.11 },
];

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
};

/** The first page as a small solar system. Planets orbit a sun; pick one and
 *  the astronaut flies over to it, then the page lands on that section. */
export default function OrbitMap() {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
  const svg = useRef<SVGSVGElement>(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);
  const angles = useRef(BODIES.map((b) => b.a0));
  const [busy, setBusy] = useState(false);

  hoverRef.current = hover;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDim({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setDim({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const wide = dim.w >= 768;
  const cx = dim.w * (wide ? 0.7 : 0.5);
  const cy = dim.h * (wide ? 0.56 : 0.79);
  const rx = wide ? Math.min(dim.w * 0.27, 520) : dim.w * 0.4;
  const ry = rx * (wide ? 0.36 : 0.5);
  const base = wide ? 62 : 38;

  useEffect(() => {
    if (!dim.w) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const paused = flyStore.target !== null || hoverRef.current !== null;
      BODIES.forEach((b, i) => {
        if (!still && !paused) angles.current[i] += dt * b.speed;
        const a = angles.current[i];
        const x = cx + Math.cos(a) * rx * b.ring;
        const y = cy + Math.sin(a) * ry * b.ring;
        const depth = (Math.sin(a) + 1) / 2; // 1 = in front
        const s = 0.78 + depth * 0.34;
        const el = els.current[i];
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
          el.style.zIndex = String(Math.round(depth * 10));
          el.dataset.x = String(x);
          el.dataset.y = String(y);
        }
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [dim.w, dim.h, cx, cy, rx, ry]);

  const enter = (i: number) => {
    if (busy) return;
    const el = els.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBusy(true);
    flyStore.flyTo({ x: r.left + r.width / 2, y: r.top + r.height / 2 }, () => {
      goTo(BODIES[i].id);
      window.setTimeout(() => setBusy(false), 900);
    });
  };

  const h = hover !== null ? BODIES[hover] : null;

  return (
    <div ref={box} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-label="Solar system of sections">
      {dim.w > 0 && (
        <>
          {/* sun */}
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              left: cx,
              top: cy,
              width: base * 1.5,
              height: base * 1.5,
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle, #fff3dc 0%, #ffc48a 38%, rgba(255,160,80,0.25) 62%, transparent 72%)",
              boxShadow: "0 0 90px 30px rgba(255,170,90,0.28)",
            }}
          />
          {/* orbit lines */}
          <svg ref={svg} aria-hidden className="absolute inset-0 h-full w-full">
            {[...new Set(BODIES.map((b) => b.ring))].map((r) => (
              <ellipse key={r} cx={cx} cy={cy} rx={rx * r} ry={ry * r} fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 7" />
            ))}
          </svg>

          {BODIES.map((b, i) => (
            <button
              key={b.id}
              ref={(el) => {
                els.current[i] = el;
              }}
              type="button"
              onClick={() => enter(i)}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((c) => (c === i ? null : c))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover((c) => (c === i ? null : c))}
              aria-label={`${b.title}: ${b.detail}`}
              className="pointer-events-auto absolute left-0 top-0 cursor-pointer outline-none"
              style={{ width: base, height: base, willChange: "transform" }}
            >
              <span
                className={`block h-full w-full transition-transform duration-200 ${hover === i ? "scale-125" : ""}`}
              >
                <World spec={b.spec} />
              </span>
              <span
                className={`absolute left-1/2 top-full mt-1.5 hidden -translate-x-1/2 whitespace-nowrap sm:block font-mono text-[9px] uppercase tracking-[0.18em] transition-colors sm:text-[10px] ${
                  hover === i ? "text-accent" : "text-muted"
                }`}
              >
                {b.title}
              </span>
            </button>
          ))}

          {/* detail card for the planet you are on */}
          {h && (
            <div
              className="pointer-events-none absolute z-20 w-[220px] rounded-xl border border-white/10 bg-black/85 p-3.5 backdrop-blur-md"
              style={{
                left: Math.min(Math.max(Number(els.current[hover!]?.dataset.x ?? cx) - 110, 8), dim.w - 228),
                top: Math.max(8, Number(els.current[hover!]?.dataset.y ?? cy) - base - 96),
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Planet {h.spec.n} · {h.spec.name}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-white">{h.detail}</p>
              <p className="mt-2 text-[11px] text-secondary">Click to fly there</p>
            </div>
          )}

          <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:block">
            Pick a planet · the astronaut flies you there
          </p>
        </>
      )}
    </div>
  );
}
