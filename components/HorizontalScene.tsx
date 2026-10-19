"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { sceneStore } from "@/lib/sceneStore";

/** The stations, in order, with their design widths (px). */
export const STATIONS = [
  { id: "about", label: "About", w: 1180 },
  { id: "build", label: "Steps", w: 1320 },
  { id: "work", label: "Work", w: 1560 },
  { id: "projects", label: "Projects", w: 1300 },
  { id: "proof", label: "Proof", w: 1520 },
  { id: "stack", label: "Stack", w: 960 },
  { id: "contact", label: "Contact", w: 1300 },
] as const;

export const STATION_W: Record<string, number> = Object.fromEntries(
  STATIONS.map((s) => [s.id, s.w]),
);

// scroll progress that actually moves the track (the ends linger a little)
const EDGE = 0.02;
const SPAN = 0.96;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

type SceneCtx = {
  x: MotionValue<number>;
  scale: number;
  vw: number;
  lefts: Record<string, number>;
};

const Ctx = createContext<SceneCtx | null>(null);

/** Non-null only inside the horizontal scene. */
export const useScene = () => useContext(Ctx);

/**
 * 0 -> 1 as a station travels from `from` to `to` (fractions of the viewport
 * width, measured at the station's left edge). Outside the scene it is 1.
 */
export function useStationProgress(id: string, from = 0.9, to = 0.35) {
  const scene = useScene();
  const fallback = useMotionValue(0);
  return useTransform(scene ? scene.x : fallback, (xv) => {
    if (!scene) return 1;
    const left = (scene.lefts[id] ?? 0) * scene.scale + xv;
    return clamp01((from * scene.vw - left) / ((from - to) * scene.vw));
  });
}

type Metrics = { vw: number; vh: number; trackW: number; maxH: number };

export default function HorizontalScene({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lefts = useRef<Record<string, number>>({});
  const widths = useRef<Record<string, number>>({});
  const [m, setM] = useState<Metrics>({ vw: 1440, vh: 900, trackW: 9000, maxH: 700 });
  const [active, setActive] = useState<string>(STATIONS[0].id);
  const lastActive = useRef("");

  // ---- measure the track and every station ----
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      let maxH = 0;
      track.querySelectorAll<HTMLElement>("[data-station]").forEach((el) => {
        lefts.current[el.id] = el.offsetLeft;
        widths.current[el.id] = el.offsetWidth;
        maxH = Math.max(maxH, el.offsetHeight);
      });
      const next: Metrics = {
        vw: window.innerWidth,
        vh: window.innerHeight,
        trackW: track.offsetWidth,
        maxH: maxH || 700,
      };
      setM((prev) =>
        prev.vw === next.vw &&
        prev.vh === next.vh &&
        prev.trackW === next.trackW &&
        prev.maxH === next.maxH
          ? prev
          : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.querySelectorAll("[data-station]").forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // shrink everything so the tallest station always fits under the nav + dock
  const scale = Math.min(1, Math.max(0.5, (m.vh - 150) / m.maxH));
  const D = Math.max(0, m.trackW * scale - m.vw);
  const rootHeight = D + m.vh;
  const dRef = useRef(D);
  dRef.current = D;

  const { scrollYProgress: p } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(p, (v) => -clamp01((v - EDGE) / SPAN) * dRef.current);

  // ---- which station is centred ----
  const computeActive = useCallback(
    (xv: number) => {
      let best = "";
      let bestD = Infinity;
      for (const s of STATIONS) {
        const L = lefts.current[s.id];
        if (L == null) continue;
        const c = (L + (widths.current[s.id] ?? s.w) / 2) * scale + xv;
        const d = Math.abs(c - m.vw / 2);
        if (d < bestD) {
          bestD = d;
          best = s.id;
        }
      }
      if (best && best !== lastActive.current) {
        lastActive.current = best;
        setActive(best);
        sceneStore.set(best);
      }
    },
    [scale, m.vw],
  );
  useMotionValueEvent(x, "change", computeActive);
  useEffect(() => {
    computeActive(x.get());
  }, [computeActive, x, m]);

  // let the navbar know when we are outside the scene
  useEffect(() => {
    const onScroll = () => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r) return;
      const inside = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.3;
      if (!inside) sceneStore.set(null);
      else if (lastActive.current) sceneStore.set(lastActive.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      sceneStore.set(null);
    };
  }, []);

  // ---- jumping to a station ----
  const rootTop = () =>
    (rootRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;

  const progressFor = useCallback(
    (id: string) => {
      const L = lefts.current[id] ?? 0;
      const w = (widths.current[id] ?? STATION_W[id]) * scale;
      const margin = Math.max(m.vw * 0.04, (m.vw - w) / 2);
      const target = margin - L * scale; // desired track x
      const u = D > 0 ? clamp01(-target / D) : 0;
      return EDGE + u * SPAN;
    },
    [D, m.vw, scale],
  );

  const goTo = useCallback(
    (id: string, smooth = true) => {
      if (!(id in STATION_W)) return;
      window.scrollTo({
        top: rootTop() + progressFor(id) * D,
        behavior: smooth ? "smooth" : "instant",
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progressFor, D],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = STATIONS.findIndex((s) => s.id === lastActive.current);
      const next = STATIONS[Math.min(STATIONS.length - 1, Math.max(0, (i < 0 ? 0 : i) + dir))];
      goTo(next.id);
    },
    [goTo],
  );

  // ---- gestures: sideways swipes, arrow keys, anchor links ----
  useEffect(() => {
    const inScene = () => {
      const r = rootRef.current?.getBoundingClientRect();
      return !!r && r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
    };
    const onWheel = (e: WheelEvent) => {
      if (!inScene()) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 3) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaX, behavior: "instant" });
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!inScene()) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) ||
          t.isContentEditable ||
          t.getAttribute("role") === "slider")
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        step(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = (a.getAttribute("href") || "").slice(1);
      if (id in STATION_W) {
        e.preventDefault();
        goTo(id);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [goTo, step]);

  // honour a #hash on first load
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id in STATION_W) {
      const t = window.setTimeout(() => goTo(id, false), 400);
      return () => window.clearTimeout(t);
    }
  }, [goTo]);

  const ctx = useMemo<SceneCtx>(
    () => ({ x, scale, vw: m.vw, lefts: lefts.current }),
    [x, scale, m.vw],
  );

  const stationP = useMemo(
    () => STATIONS.map((s) => ({ id: s.id, label: s.label, p: progressFor(s.id) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progressFor, m],
  );

  return (
    <Ctx.Provider value={ctx}>
      <div ref={rootRef} style={{ height: rootHeight }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x, scale, originX: 0, originY: 0.5 }}
            className="absolute left-0 top-0 flex h-full w-max items-center gap-[7.5rem] pl-[8vw] pr-[8vw] will-change-transform"
          >
            {children}
          </motion.div>
        </div>
      </div>

      <SceneDock
        p={p}
        D={D}
        active={active}
        stations={stationP}
        goTo={goTo}
        rootTop={rootTop}
      />
    </Ctx.Provider>
  );
}

/** Kendor-style dock: station labels plus a draggable playhead along the whole scene. */
function SceneDock({
  p,
  D,
  active,
  stations,
  goTo,
  rootTop,
}: {
  p: MotionValue<number>;
  D: number;
  active: string;
  stations: { id: string; label: string; p: number }[];
  goTo: (id: string, smooth?: boolean) => void;
  rootTop: () => number;
}) {
  const [show, setShow] = useState(false);
  const [intro, setIntro] = useState(true);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const toBottom = document.documentElement.scrollHeight - (y + vh);
      setShow(y > vh * 0.55 && toBottom > 150);
      setIntro(y < rootTop() - vh * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rootTop]);

  const knobLeft = useTransform(p, (v) => `${clamp01(v) * 100}%`);
  const fillW = useTransform(p, (v) => `${clamp01(v) * 100}%`);

  const scrub = (clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const f = clamp01((clientX - r.left) / r.width);
    window.scrollTo({ top: rootTop() + f * D, behavior: "instant" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
      <AnimatePresence>
        {show && (
          <motion.nav
            aria-label="Sections"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/80 px-3 pb-2 pt-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
                  intro ? "bg-accent text-black" : "text-muted hover:text-white"
                }`}
              >
                Intro
              </button>
              {stations.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
                    !intro && active === s.id
                      ? "bg-accent text-black"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Scroll position"
              aria-valuemin={0}
              aria-valuemax={100}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                scrub(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && scrub(e.clientX)}
              onPointerUp={(e) => {
                dragging.current = false;
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                }
              }}
              className="relative mx-2 h-4 cursor-pointer touch-none select-none outline-none"
            >
              <div ref={track} className="absolute inset-x-0 top-0 h-full">
                <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" />
                <motion.div
                  style={{ width: fillW }}
                  className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-white/25 to-accent"
                />
                {stations.map((s) => (
                  <span
                    key={s.id}
                    aria-hidden
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"
                    style={{ left: `${clamp01(s.p) * 100}%` }}
                  />
                ))}
                <motion.span
                  aria-hidden
                  style={{ left: knobLeft }}
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-black shadow-[0_0_14px_rgba(255,200,162,0.6)]"
                />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
