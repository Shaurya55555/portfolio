"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Accent, Kicker, Reveal, Section } from "./ui";
import { rightNow, person, stats, statement } from "@/lib/data";

type Token = { word: string; hl: boolean };

function tokenize(text: string): Token[] {
  return text.split(" ").map((raw) => {
    const hl = raw.includes("*");
    return { word: raw.replace(/\*/g, ""), hl };
  });
}

function Word({
  token,
  range,
  progress,
}: {
  token: Token;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={token.hl ? "text-accent-soft" : "text-white"}
    >
      {token.word}{" "}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 48%"],
  });
  const tokens = tokenize(statement);

  return (
    <Section id="about">
      <Kicker>The position</Kicker>

      <p
        ref={ref}
        className="mt-6 max-w-5xl text-[clamp(1.75rem,3.9vw,3.25rem)] font-medium leading-[1.18] tracking-tight"
      >
        {tokens.map((t, i) => {
          const start = i / tokens.length;
          const end = Math.min(1, start + 1.6 / tokens.length);
          return <Word key={i} token={t} range={[start, end]} progress={scrollYProgress} />;
        })}
      </p>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/10 bg-black-100/70 p-7 backdrop-blur-sm">
            <Kicker>Right now</Kicker>
            <p className="mt-4 text-[17px] leading-[1.65] text-white-100">{rightNow}</p>
            <p className="mt-4 text-[15px] leading-[1.65] text-secondary">{person.availability}</p>
            <a
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-accent transition-colors hover:text-accent-soft"
            >
              Read the resume <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-black-100/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40">
                <p className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-none tracking-tight text-white">
                  <Accent>{s.value}</Accent>
                </p>
                <p className="mt-3 text-[14px] leading-[1.55] text-secondary">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
