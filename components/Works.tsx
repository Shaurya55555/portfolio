"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Accent, Chip, H2, Kicker, Reveal, Section, SectionHead, Window } from "./ui";
import { useScene } from "./HorizontalScene";
import { projects, type Project } from "@/lib/data";

const shortName = (n: string) =>
  n
    .replace(" Microservice", "")
    .replace(", but Better", "")
    .replace(" Voice Agent", "")
    .replace(" Media Controller", "");

function Scrubber({
  value,
  labels,
  onChange,
}: {
  value: number;
  labels: string[];
  onChange: (i: number) => void;
}) {
  const count = labels.length;
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pick = useCallback(
    (clientX: number) => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      onChange(Math.round(t * (count - 1)));
    },
    [count, onChange],
  );

  const down = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    pick(e.clientX);
  };
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) pick(e.clientX);
  };
  const up = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(count - 1, value + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, value - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(count - 1);
    }
  };

  const pct = (i: number) => (i / (count - 1)) * 100;

  return (
    <div className="px-9 pb-3 pt-4 sm:px-14">
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label="Project"
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={value + 1}
        aria-valuetext={labels[value]}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={key}
        className="relative h-10 cursor-pointer touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10" />
        <div
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-white/25 to-accent transition-[width] duration-200 ease-out"
          style={{ width: `${pct(value)}%` }}
        />
        {labels.map((l, i) => (
          <span
            key={l}
            aria-hidden
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
              i <= value ? "bg-accent" : "bg-white/25"
            }`}
            style={{ left: `${pct(i)}%` }}
          />
        ))}
        <span
          aria-hidden
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-black shadow-[0_0_18px_rgba(185,198,214,0.65)] transition-[left] duration-200 ease-out"
          style={{ left: `${pct(value)}%` }}
        />
      </div>

      <div className="relative mt-0.5 hidden h-6 md:block">
        {labels.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => onChange(i)}
            className={`absolute -translate-x-1/2 whitespace-nowrap font-mono text-[10px] transition-colors ${
              i === value ? "text-accent-soft" : "text-muted hover:text-white"
            }`}
            style={{ left: `${pct(i)}%` }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectPanel({ p, index }: { p: Project; index: number }) {
  const external = p.liveLink || p.demoLink;
  const host = (external || p.sourceCodeLink).replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="grid md:grid-cols-[1.15fr_0.85fr]">
      <div className="border-b border-white/10 p-4 sm:p-5 md:border-b-0 md:border-r">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <p className="ml-2 min-w-0 flex-1 truncate rounded-md bg-black/60 px-3 py-1 font-mono text-[11px] text-muted">
              {host}
            </p>
          </div>
          <div className="relative aspect-[16/10] w-full">
            {p.image ? (
              <Image
                src={p.image}
                alt={`${p.name} homepage`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center">
                <span className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight text-white">
                  {p.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 sm:p-7">
        <p className="font-mono text-[12px] text-accent">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-tight text-white">
          {p.name}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">{p.description}</p>

        <div className="mt-5 border-l-2 border-accent/60 pl-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Note</p>
          <p className="mt-1 text-[14px] leading-[1.6] text-ink">{p.note}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {external && (
            <a
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              {p.liveLink ? "Live site" : "Demo"} <span aria-hidden>↗</span>
            </a>
          )}
          <a
            href={p.sourceCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5 hover:border-accent/60"
          >
            Source <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Kendor-style "review" block: a scrubbable timeline that opens each project. */
export default function Works() {
  const scene = useScene();
  const [active, setActive] = useState(0);
  const dir = useRef(1);
  const labels = projects.map((p) => shortName(p.name));
  const go = (i: number) => {
    const next = Math.min(projects.length - 1, Math.max(0, i));
    dir.current = next >= active ? 1 : -1;
    setActive(next);
  };

  const heading = (
      <SectionHead>
        <Kicker>The work</Kicker>
        <H2 className={scene ? "" : "max-w-3xl"}>
          {projects.length} projects. <Accent>Pick one.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          Drag the playhead, tap a marker, or use the arrow keys. Each project has the
          stack, the links and an honest note on scope.
        </p>
      </SectionHead>
  );
  const windowEl = (
      <Reveal delay={0.1} from="right" className={scene ? "" : "mt-12"}>
        <Window
          title={`projects/${labels[active].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          right={
            <span className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="rounded px-2 py-0.5 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(active + 1)}
                disabled={active === projects.length - 1}
                className="rounded px-2 py-0.5 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                →
              </button>
            </span>
          }
        >
          <div className="border-b border-white/10">
            <Scrubber value={active} labels={labels} onChange={go} />
          </div>

          <div className="min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 60 * dir.current }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 * dir.current }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectPanel p={projects[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Window>
      </Reveal>
  );

  if (scene) {
    return (
      <Section id="projects">
        <div className="flex items-center gap-10">
          <div className="w-[300px] flex-none">{heading}</div>
          <div className="min-w-0 flex-1">{windowEl}</div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" planet="projects">
      {heading}
      {windowEl}
    </Section>
  );
}
