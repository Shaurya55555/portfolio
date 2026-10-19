"use client";

import { Accent, H2, Kicker, Reveal, Section } from "./ui";
import { steps } from "@/lib/data";

/** Kendor-style "four steps" grid: numbered cards, each with a tiny log. */
export default function Steps() {
  return (
    <Section id="build">
      <Reveal>
        <Kicker>How I work</Kicker>
        <H2 className="max-w-3xl">
          Four steps. <Accent>One shipped feature.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-secondary">
          No buzzword bingo. This is the path a feature takes when I build it, from the
          first table to the deploy log.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.09} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black-100/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-accent">{s.n}</span>
                <span className="h-px flex-1 translate-y-[1px] bg-gradient-to-r from-white/15 to-transparent pl-3" />
              </div>
              <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-secondary">{s.text}</p>

              <div className="mt-6 min-h-[104px] rounded-xl border border-white/10 bg-black/60 p-3.5 font-mono text-[12px] leading-[1.7]">
                {s.log.map((line, j) => (
                  <p
                    key={j}
                    className={
                      line.startsWith("✓")
                        ? "text-accent-soft"
                        : line.startsWith("●")
                          ? "text-secondary"
                          : "text-white-100/80"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
