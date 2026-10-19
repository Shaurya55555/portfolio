"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Accent, Kicker, Reveal, Section, SectionHead, TiltCard } from "./ui";
import { useScene, useStationProgress } from "./HorizontalScene";
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
    <motion.span style={{ opacity }} className={token.hl ? "text-accent-soft" : "text-white"}>
      {token.word}{" "}
    </motion.span>
  );
}

export default function About() {
  const scene = useScene();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 48%"],
  });
  // in the horizontal scene the words light up as the station slides in
  const slide = useStationProgress("about", 0.95, 0.3);
  const progress = scene ? slide : scrollYProgress;
  const tokens = tokenize(statement);

  return (
    <Section id="about">
      <SectionHead>
        <Kicker>The position</Kicker>
      </SectionHead>

      <p
        ref={ref}
        className={`mt-6 font-medium leading-[1.18] tracking-tight ${
          scene
            ? "max-w-[1080px] text-[clamp(1.6rem,2.9vw,2.8rem)]"
            : "max-w-5xl text-[clamp(1.75rem,3.9vw,3.25rem)]"
        }`}
      >
        {tokens.map((t, i) => {
          const start = i / tokens.length;
          const end = Math.min(1, start + 1.6 / tokens.length);
          return <Word key={i} token={t} range={[start, end]} progress={progress} />;
        })}
      </p>

      <div className={`grid gap-6 lg:grid-cols-[1fr_1.15fr] ${scene ? "mt-10" : "mt-16"}`}>
        <Reveal from="right" className="h-full">
          <TiltCard className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-panel/85 p-7">
              <Kicker>Right now</Kicker>
              <p className="mt-4 text-[17px] leading-[1.65] text-ink">{rightNow}</p>
              <p className="mt-4 text-[15px] leading-[1.65] text-muted">{person.availability}</p>
              <a
                href={person.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-accent transition-colors hover:text-white"
              >
                Read the resume <span aria-hidden>↗</span>
              </a>
            </div>
          </TiltCard>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.12} from={i % 2 ? "left" : "right"} className="h-full">
              <TiltCard className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-panel/85 p-6 transition-colors duration-300 hover:border-accent/40">
                  <p className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-none tracking-tight text-white">
                    <Accent>{s.value}</Accent>
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.55] text-muted">{s.label}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
