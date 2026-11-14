"use client";

import { Accent, H2, Kicker, Reveal, Section, SectionHead, TiltCard } from "./ui";
import { useScene } from "./HorizontalScene";
import { openSource } from "@/lib/data";

/** Merged pull requests in other people's projects, each linked to the PR. */
export default function OpenSource() {
  const scene = useScene();
  return (
    <Section id="opensource" planet="opensource">
      <SectionHead>
        <Kicker>Open source</Kicker>
        <H2 className="max-w-3xl">
          {openSource.merged} merged pull requests. <Accent>{openSource.projects} projects.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          Bug fixes merged into projects people depend on, from Kubernetes to Hugging Face PEFT.
          Every number below links to the pull request.
        </p>
      </SectionHead>

      <div className={`grid gap-4 ${scene ? "mt-8 grid-cols-3" : "mt-14 md:grid-cols-2 xl:grid-cols-3"}`}>
        {openSource.items.map((o, i) => (
          <Reveal key={o.name} delay={(i % 3) * 0.1} from={i % 2 ? "left" : "right"} className="h-full">
            <TiltCard className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-panel/85 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[19px] font-semibold tracking-tight text-white transition-colors hover:text-accent"
                  >
                    {o.name}
                  </a>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{o.area}</span>
                </div>
                <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted">{o.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {o.prs.map((p) => (
                    <a
                      key={p.n}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[12px] text-accent-soft transition-colors hover:border-accent/40 hover:text-white"
                    >
                      <span aria-hidden>✓</span> #{p.n} merged
                    </a>
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 font-mono text-[12.5px] leading-[1.7] text-muted">
        In review: {openSource.inReview}.{" "}
        <a
          href={openSource.prsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent transition-colors hover:text-white"
        >
          All my pull requests <span aria-hidden>↗</span>
        </a>
      </p>
    </Section>
  );
}
