"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dockLinks, person } from "@/lib/data";
import { PLANETS, type PlanetKey } from "./Planet";

type Item = { label: string; hint: string; run: () => void };

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "intro" ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

/** Helpers for getting around: a Ctrl/Cmd+K jump menu, a planet map on the
 *  right edge, a back-to-top button, and quick actions like copy email. */
export default function Explorer() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const [active, setActive] = useState("intro");
  const [past, setPast] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<number>(0);

  const say = useCallback((m: string) => {
    setToast(m);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const items = useMemo<Item[]>(() => {
    const jumps = dockLinks.map((d) => {
      const p = PLANETS[d.id as PlanetKey];
      return {
        label: d.label,
        hint: p ? `Planet ${p.n} · ${p.name}` : "Section",
        run: () => goTo(d.id),
      };
    });
    return [
      ...jumps,
      {
        label: "Copy email",
        hint: person.email,
        run: () => {
          navigator.clipboard?.writeText(person.email).then(
            () => say("Email copied"),
            () => say(person.email),
          );
        },
      },
      { label: "Open resume", hint: "PDF", run: () => window.open(person.resume, "_blank", "noopener") },
      { label: "GitHub", hint: "github.com/Shaurya55555", run: () => window.open(person.github, "_blank", "noopener") },
      { label: "LinkedIn", hint: "linkedin.com/in/shaurya-bajpai", run: () => window.open(person.linkedin, "_blank", "noopener") },
      { label: "LeetCode", hint: "leetcode.com/u/shaurya55555", run: () => window.open(person.leetcode, "_blank", "noopener") },
    ];
  }, [say]);

  const shown = items.filter((i) => (i.label + " " + i.hint).toLowerCase().includes(q.trim().toLowerCase()));

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
  }, []);
  const choose = (i?: Item) => {
    if (!i) return;
    close();
    i.run();
  };

  // global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      } else if (!typing && !open && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      } else if (!typing && !open && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === "j" || e.key === "k")) {
        const ids = dockLinks.map((d) => d.id);
        const i = Math.max(0, ids.indexOf(active));
        goTo(ids[Math.min(ids.length - 1, Math.max(0, i + (e.key === "j" ? 1 : -1)))]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, close]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // which planet we are on + back-to-top visibility
  useEffect(() => {
    const els = dockLinks.map((d) => document.getElementById(d.id)).filter(Boolean) as HTMLElement[];
    let tick = false;
    const measure = () => {
      tick = false;
      setPast(window.scrollY > window.innerHeight * 0.9);
      const mid = window.innerHeight * 0.4;
      let cur = "intro";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) cur = el.id;
      setActive(cur);
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* planet map, wide screens only so it never crowds content */}
      <ol className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 2xl:flex" aria-label="Section map">
        {dockLinks.map((d) => (
          <li key={d.id}>
            <button
              onClick={() => goTo(d.id)}
              aria-label={`Go to ${d.label}`}
              className="group relative flex h-4 w-4 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all ${
                  active === d.id
                    ? "h-2.5 w-2.5 bg-accent shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]"
                    : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/70"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                {d.label}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* bottom-right controls */}
      <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {past && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={() => goTo("intro")}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open jump menu"
          className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary backdrop-blur-md transition-colors hover:border-accent hover:text-white"
        >
          Jump
          <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-muted sm:inline">Ctrl K</kbd>
        </button>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/85 px-4 py-2 text-sm text-white backdrop-blur-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* jump menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[14vh] backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Jump menu"
              initial={{ y: -12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
            >
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(shown.length - 1, s + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(0, s - 1));
                  } else if (e.key === "Enter") choose(shown[sel]);
                }}
                placeholder="Jump to a planet or do something..."
                className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-base text-white outline-none placeholder:text-muted"
              />
              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {shown.length === 0 && <li className="px-3 py-4 text-sm text-muted">Nothing found</li>}
                {shown.map((i, n) => (
                  <li key={i.label}>
                    <button
                      onClick={() => choose(i)}
                      onMouseEnter={() => setSel(n)}
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        n === sel ? "bg-white/10 text-white" : "text-secondary"
                      }`}
                    >
                      <span className="text-[15px]">{i.label}</span>
                      <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{i.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Up/down to move · Enter to go · Esc to close · J / K step planets
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
