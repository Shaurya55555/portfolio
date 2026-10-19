"use client";

import { Accent, H2, Kicker, Reveal, Section, SectionHead, TiltCard } from "./ui";
import { useScene } from "./HorizontalScene";
import { steps } from "@/lib/data";

/** Kendor-style "four steps" grid: numbered cards, each with a tiny log. */
export default function Steps() {
  const scene = useScene();
  return (
    <Section id="build">
      <SectionHead>
        <Kicker>How I work</Kicker>
        <H2 className="max-w-3xl">
          Four steps. <Accent>One shipped feature.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          No buzzword bingo. This is the path a feature takes when I build it, from the
          first table to the deploy log.
        </p>
      </SectionHead>

      <div className={`grid gap-5 ${scene ? "mt-10 grid-cols-4" : "mt-14 md:grid-cols-2 xl:grid-cols-4"}`}>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.14} from={i % 2 ? "left" : "right"} className="h-full">
            <TiltCard className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-panel/85 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-accent">{s.n}</span>
                <span className="h-px flex-1 translate-y-[1px] bg-gradient-to-r from-white/15 to-transparent pl-3" />
              </div>
              <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-muted">{s.text}</p>

              <div className="mt-6 min-h-[104px] rounded-xl border border-white/10 bg-black/60 p-3.5 font-mono text-[12px] leading-[1.7]">
                {s.log.map((line, j) => (
                  <p
                    key={j}
                    className={
                      line.startsWith("✓")
                        ? "text-accent-soft"
                        : line.startsWith("●")
                          ? "text-muted"
                          : "text-ink/80"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
