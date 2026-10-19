"use client";

import { Accent, H2, Kicker, Reveal, Section, Window } from "./ui";
import { proof, proofLog } from "@/lib/data";

/** Kendor-style "policy" block: option cards on the left, a terminal log on the right. */
export default function Proof() {
  return (
    <Section id="proof">
      <Reveal>
        <Kicker>The record</Kicker>
        <H2 className="max-w-3xl">
          Proof, <Accent>not promises.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-secondary">
          Hackathons, problem solving and coursework, with the details attached.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          {proof.map((c, i) => (
            <Reveal key={c.kicker} delay={i * 0.08}>
              <article className="rounded-2xl border border-white/10 bg-black-100/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40">
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                  {c.kicker}
                </p>
                <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-secondary">{c.text}</p>
                {"link" in c && c.link ? (
                  <a
                    href={c.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[13px] text-accent transition-colors hover:text-accent-soft"
                  >
                    {c.link.label} <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
          <Window title="record.log" right={<span className="text-accent">● clean</span>} bodyClassName="p-5 font-mono text-[13px] leading-[1.8]">
            <p className="text-white-100/80">$ cat record.txt</p>
            {proofLog.map((line) => (
              <p key={line} className="text-accent-soft">
                <span className="mr-2 text-accent" aria-hidden>
                  ✓
                </span>
                {line}
              </p>
            ))}
            <p className="mt-3 text-white-100/80">
              $ <span className="animate-caret inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent" />
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Note</p>
              <p className="mt-1 text-[13px] leading-[1.6] text-secondary">
                OARFIN&apos;s source is on GitHub, and the problem count is on the LeetCode
                profile.
              </p>
            </div>
          </Window>
        </Reveal>
      </div>
    </Section>
  );
}
