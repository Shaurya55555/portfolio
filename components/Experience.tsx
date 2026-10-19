"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Accent, Chip, H2, Kicker, Reveal, Section, Window } from "./ui";
import { experiences } from "@/lib/data";

type Exp = (typeof experiences)[number];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Role({ exp, index }: { exp: Exp; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <Window
        title={`~/experience/${slug(exp.companyName)}`}
        right={exp.date}
        bodyClassName="p-5 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: exp.iconBg }}
          >
            <Image
              src={exp.icon}
              alt={exp.companyName}
              width={44}
              height={44}
              className="h-[68%] w-[68%] object-contain"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[21px]">
              {exp.title}
            </h3>
            <p className="mt-0.5 text-[15px] font-medium text-accent-soft">{exp.companyName}</p>
          </div>
        </div>

        <p className="mt-6 font-mono text-[12px] text-secondary">$ cat highlights.md</p>
        <ul className="mt-3 space-y-2.5">
          {exp.points.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="flex gap-3 text-[14px] leading-[1.6] text-white-100"
            >
              <span className="mt-[2px] font-mono text-accent" aria-hidden>
                ✓
              </span>
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <span className="mr-1 font-mono text-[12px] text-secondary">Running</span>
          {exp.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </Window>
    </Reveal>
  );
}

/** Kendor-style "environment" split: sticky copy on the left, terminal windows on the right. */
export default function Experience() {
  return (
    <Section id="work">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>The experience</Kicker>
            <H2>
              Where I&apos;ve <Accent>shipped.</Accent>
            </H2>
            <p className="mt-5 max-w-md text-[17px] leading-[1.65] text-secondary">
              Two internships, one on the backend and one on the frontend. Real users, real
              deploys, and production issues traced to the root cause.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>2 internships</Chip>
              <Chip>Backend + Frontend</Chip>
              <Chip>Aug 2024 to Jan 2026</Chip>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <Role key={exp.companyName} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
