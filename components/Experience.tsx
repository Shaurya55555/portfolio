"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { experiences, sectionCopy } from "@/lib/data";

type Exp = (typeof experiences)[number];

function ExperienceItem({ experience }: { experience: Exp }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pl-16 sm:pl-20"
    >
      {/* node on the line */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.15, type: "spring", bounce: 0.5 }}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-primary sm:h-12 sm:w-12"
        style={{ background: experience.iconBg }}
      >
        <Image
          src={experience.icon}
          alt={experience.companyName}
          width={44}
          height={44}
          className="h-[60%] w-[60%] object-contain"
        />
      </motion.div>

      <div className="rounded-2xl bg-black-100 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[19px] font-bold text-white sm:text-[22px]">
            {experience.title}
          </h3>
          <span className="whitespace-nowrap rounded-full bg-tertiary px-3 py-1 text-[12px] font-medium text-secondary">
            {experience.date}
          </span>
        </div>
        <p className="mt-1 text-[15px] font-semibold text-[#9db8ff]">
          {experience.companyName}
        </p>

        <ul className="mt-4 space-y-2.5">
          {experience.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="flex gap-2.5 text-[14px] leading-relaxed text-white-100"
            >
              <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4468ff]" />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });

  return (
    <>
      <Header {...sectionCopy.experience} />
      <p className="mt-3 max-w-xl text-[14px] text-secondary">
        The line fills in as you scroll, point to point.
      </p>

      <div ref={trackRef} className="relative mt-16">
        {/* dim track */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[3px] rounded-full bg-white/10 sm:left-[23px]" />
        {/* fill that grows with scroll position */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[19px] top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#4468ff] to-[#9db8ff] sm:left-[23px]"
        />

        <div className="flex flex-col gap-12">
          {experiences.map((experience, i) => (
            <ExperienceItem key={i} experience={experience} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="work">
      <Experience />
    </SectionWrapper>
  );
}
