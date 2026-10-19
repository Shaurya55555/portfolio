"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Accent, Chip, H2, Kicker, Section, SectionHead, Window } from "./ui";
import { experiences } from "@/lib/data";

type Exp = (typeof experiences)[number];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
      {/* node on the line */}
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

      <Window
        title={`~/experience/${slug(exp.companyName)}`}
        right={exp.date}
        bodyClassName="p-5 sm:p-6"
        className="transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[21px]">
          {exp.title}
        </h3>
        <p className="mt-0.5 text-[15px] font-medium text-accent-soft">{exp.companyName}</p>

        <p className="mt-6 font-mono text-[12px] text-muted">$ cat highlights.md</p>
        <ul className="mt-3 space-y-2.5">
          {exp.points.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="flex gap-3 text-[14px] leading-[1.6] text-ink"
            >
              <span className="mt-[2px] font-mono text-accent" aria-hidden>
                ✓
              </span>
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <span className="mr-1 font-mono text-[12px] text-muted">Running</span>
          {exp.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </Window>
    </motion.div>
  );
}

/** Sticky copy on the left; the right column keeps the original scroll-filled line. */
export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });

  return (
    <Section id="work">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead>
            <Kicker>The experience</Kicker>
            <H2>
              Where I&apos;ve <Accent>shipped.</Accent>
            </H2>
            <p className="mt-5 max-w-md text-[17px] leading-[1.65] text-muted">
              Two internships, one on the backend and one on the frontend. Real users, real
              deploys, and production issues traced to the root cause. The line fills in as
              you scroll.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>2 internships</Chip>
              <Chip>Backend + Frontend</Chip>
              <Chip>Aug 2024 to Jan 2026</Chip>
            </div>
          </SectionHead>
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
