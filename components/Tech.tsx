"use client";

import { motion } from "framer-motion";
import BallCanvas from "./canvas/Ball";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { technologies } from "@/lib/data";

function Tech() {
  return (
    <>
      <Header p="What I work with" h2="Tech." />
      <div className="mt-14 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
            className="group relative h-28 w-28"
          >
            <BallCanvas icon={technology.icon} />
            <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-md bg-tertiary px-2.5 py-1 text-[12px] font-medium text-white opacity-0 shadow-card transition-all duration-200 group-hover:opacity-100">
              {technology.name}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function TechSection() {
  return (
    <SectionWrapper id="tech">
      <Tech />
    </SectionWrapper>
  );
}
