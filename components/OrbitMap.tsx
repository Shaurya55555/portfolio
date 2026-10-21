"use client";

import { useEffect, useRef, useState } from "react";
import { PLANETS, World, type PlanetKey, type Spec } from "./Planet";
import { flyStore } from "@/lib/flyStore";
import { person } from "@/lib/data";

type Body = {
  id: string; // section id, or "resume"
  planet: PlanetKey;
  title: string;
  detail: string;
  ring: number; // orbit size as a fraction of the outermost orbit
  size: number; // relative disc size
  a0: number; // start angle
};

/** The real solar system, in real order from the sun. Each world is a
 *  section, so a visitor can read a one-line detail from orbit and drop in. */
const BODIES: Body[] = [
  { id: "about", planet: "about", title: "About", detail: "Who I am, what I build, and how I think.", ring: 0.26, size: 0.5, a0: 0.4 },
  { id: "build", planet: "build", title: "How I work", detail: "The four steps from idea to a deployed product.", ring: 0.38, size: 0.85, a0: 2.6 },
  { id: "contact", planet: "earth", title: "Contact", detail: "Send a message, or grab my email and resume.", ring: 0.5, size: 0.9, a0: 4.9 },
  { id: "work", planet: "work", title: "Experience", detail: "Marine Edge and APJ Academy internships.", ring: 0.62, size: 0.65, a0: 1.3 },
  { id: "projects", planet: "projects", title: "Projects", detail: "OARFIN, NammaStocks, Ecom GraphQL and more, live.", ring: 0.75, size: 2.0, a0: 3.7 },
  { id: "proof", planet: "proof", title: "Proof", detail: "Hackathon result, DSA and certifications.", ring: 0.87, size: 1.6, a0: 5.7 },
  { id: "stack", planet: "stack", title: "Tech stack", detail: "Languages, frameworks and tools I ship with.", ring: 0.96, size: 1.2, a0: 0.9 },
  { id: "resume", planet: "neptune", title: "Resume", detail: "My one-page resume, as a PDF.", ring: 1, size: 1.15, a0: 3.2 },
];

const RINGS = [...new Set(BODIES.map((b) => b.ring))];

const goTo = (id: string) => {
  if (id === "resume") {
    window.open(person.resume, "_blank", "noopener");
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
};

/** The first page as the real solar system. The sun sits in the middle and
 *  the planets orbit it in order; pick one and the astronaut flies over to
 *  it, then the page lands on that section. */
export default function OrbitMap() {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
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
  const cx = dim.w * (wide ? 0.74 : 0.5);
  const cy = dim.h * (wide ? 0.55 : 0.79);
  const rx = wide ? Math.min(dim.w * 0.245, 520) : dim.w * 0.44;
  const ry = rx * (wide ? 0.4 : 0.5);
  const unit = wide ? 30 : 17;
  const px = (b: Body) => Math.max(wide ? 24 : 20, Math.round(unit * b.size));
  const sun = wide ? 92 : 50;

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
        // Kepler: inner worlds go round faster
        if (!still && !paused) angles.current[i] += dt * 0.0597 * Math.pow(b.ring, -1.5);
        const a = angles.current[i];
        const x = cx + Math.cos(a) * rx * b.ring;
        const y = cy + Math.sin(a) * ry * b.ring;
        const depth = (Math.sin(a) + 1) / 2; // 1 = in front
        const s = 0.88 + depth * 0.24;
        const el = els.current[i];
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
          el.style.zIndex = String(Math.round(depth * 10) + 1);
          // light comes from the sun: shade the far side of each world
          const dx = cx - x;
          const dy = cy - y;
          const len = Math.hypot(dx, dy) || 1;
          el.style.setProperty("--sx", `${(dx / len) * 30}%`);
          el.style.setProperty("--sy", `${(dy / len) * 30}%`);
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
  const hs: Spec | null = h ? PLANETS[h.planet] : null;

  return (
    <div ref={box} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-label="The solar system, one planet per section">
      {dim.w > 0 && (
        <>
          {/* orbit lines, one per world */}
          <svg aria-hidden className="absolute inset-0 h-full w-full">
            {RINGS.map((r) => (
              <ellipse key={r} cx={cx} cy={cy} rx={rx * r} ry={ry * r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            ))}
          </svg>

          {/* the sun, in the middle: soft corona behind a clean photographed disc */}
          <div
            aria-hidden
            className="absolute"
            style={{ left: cx, top: cy, width: sun, height: sun, transform: "translate(-50%,-50%)" }}
          >
            <div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: sun * 4.2,
                height: sun * 4.2,
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, rgba(255,190,110,0.55) 0%, rgba(255,150,60,0.28) 22%, rgba(255,120,40,0.1) 40%, transparent 62%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/solar/sun.webp"
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none rounded-full"
              style={{ boxShadow: "0 0 40px 8px rgba(255,150,60,0.6)" }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, transparent 55%, rgba(120,30,0,0.55) 100%)" }}
            />
          </div>

          {BODIES.map((b, i) => {
            const size = px(b);
            return (
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
                style={{ width: size, height: size, willChange: "transform" }}
              >
                <span className={`relative block h-full w-full transition-transform duration-200 ${hover === i ? "scale-125" : ""}`}>
                  <World spec={PLANETS[b.planet]} />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at calc(50% + var(--sx, 0%)) calc(50% + var(--sy, 0%)), transparent 32%, rgba(0,0,0,0.78) 82%)",
                    }}
                  />
                </span>
                <span
                  className={`absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] transition-colors sm:block sm:text-[10px] ${
                    hover === i ? "text-accent" : "text-muted"
                  }`}
                  style={b.planet === "proof" ? { marginTop: size * 0.25 } : undefined}
                >
                  {b.title}
                </span>
              </button>
            );
          })}

          {/* detail card for the planet you are on */}
          {h && hs && (
            <div
              className="pointer-events-none absolute z-20 w-[220px] rounded-xl border border-white/10 bg-black/85 p-3.5 backdrop-blur-md"
              style={{
                left: Math.min(Math.max(Number(els.current[hover!]?.dataset.x ?? cx) - 110, 8), dim.w - 228),
                top: Math.max(8, Number(els.current[hover!]?.dataset.y ?? cy) - px(h) - 100),
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {hs.name} · {h.title}
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
