"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Accent, Chip, H2, Kicker, Section, SectionHead, Window } from "./ui";
import { useScene, useStationProgress } from "./HorizontalScene";
import { experiences } from "@/lib/data";

type Exp = (typeof experiences)[number];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Node({ exp }: { exp: Exp }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, delay: 0.15, type: "spring", bounce: 0.5 }}
      className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-black sm:h-12 sm:w-12"
      style={{ background: exp.iconBg }}
    >
      <Image
        src={exp.icon}
        alt={exp.companyName}
        width={44}
        height={44}
        className="h-[62%] w-[62%] object-contain"
      />
    </motion.div>
  );
}

function RoleWindow({ exp, compact }: { exp: Exp; compact?: boolean }) {
  return (
    <Window
      title={`~/experience/${slug(exp.companyName)}`}
      right={exp.date}
      bodyClassName={compact ? "p-5" : "p-5 sm:p-6"}
      className="transition-transform duration-300 hover:-translate-y-1"
    >
      <h3 className="text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[21px]">
        {exp.title}
      </h3>
      <p className="mt-0.5 text-[15px] font-medium text-accent-soft">{exp.companyName}</p>

      <p className="mt-5 font-mono text-[12px] text-muted">$ cat highlights.md</p>
      <ul className={`mt-3 ${compact ? "space-y-2" : "space-y-2.5"}`}>
        {exp.points.map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.4, delay: 0.06 * i }}
            className={`flex gap-3 leading-[1.55] text-ink ${compact ? "text-[13px]" : "text-[14px]"}`}
          >
            <span className="mt-[2px] font-mono text-accent" aria-hidden>
              ✓
            </span>
            <span>{p}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <span className="mr-1 font-mono text-[12px] text-muted">Running</span>
        {exp.stack.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </Window>
  );
}

function Role({ exp }: { exp: Exp }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pl-16 sm:pl-20"
    >
      <Node exp={exp} />
      <RoleWindow exp={exp} />
    </motion.div>
  );
}

const Intro = () => (
  <SectionHead>
    <Kicker>The experience</Kicker>
    <H2>
      Where I&apos;ve <Accent>shipped.</Accent>
    </H2>
    <p className="mt-5 max-w-md text-[17px] leading-[1.65] text-muted">
      Two internships, one on the backend and one on the frontend. Real users, real deploys,
      and production issues traced to the root cause. The line fills in as you scroll.
    </p>
    <div className="mt-8 flex flex-wrap gap-2">
      <Chip>2 internships</Chip>
      <Chip>Backend + Frontend</Chip>
      <Chip>Aug 2024 to Jan 2026</Chip>
    </div>
  </SectionHead>
);

/** Vertical: sticky copy on the left, the scroll-filled line on the right.
 *  In the horizontal scene the line runs across and fills as the station slides by. */
export default function Experience() {
  const scene = useScene();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });
  const slide = useStationProgress("work", 0.8, 0.05);

  if (scene) {
    return (
      <Section id="work">
        <div className="flex items-start gap-12">
          <div className="w-[340px] flex-none">
            <Intro />
          </div>

          <div className="relative flex flex-1 gap-6 pt-14">
            {/* dim track + fill that grows as the station slides in */}
            <div className="absolute left-5 right-0 top-[19px] h-[3px] rounded-full bg-white/10 sm:left-6" />
            <motion.div
              style={{ scaleX: slide }}
              className="absolute left-5 right-0 top-[19px] h-[3px] origin-left rounded-full bg-gradient-to-r from-accent to-accent-soft sm:left-6"
            />
            {experiences.map((exp) => (
              <motion.div
                key={exp.companyName}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-[560px] flex-none"
              >
                <div className="absolute -top-14 left-0">
                  <div className="relative h-12 w-12">
                    <Node exp={exp} />
                  </div>
                </div>
                <RoleWindow exp={exp} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="work">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Intro />
        </div>

        <div ref={trackRef} className="relative">
          {/* dim track */}
          <div className="absolute bottom-2 left-[19px] top-2 w-[3px] rounded-full bg-white/10 sm:left-[23px]" />
          {/* fill that grows with scroll position */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-2 left-[19px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent to-accent-soft sm:left-[23px]"
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <Role key={exp.companyName} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
