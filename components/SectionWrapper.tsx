"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

export default function SectionWrapper({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-0 mx-auto max-w-7xl px-6 py-10 sm:px-16 sm:py-16"
      id={id}
    >
      <span className="hash-span">&nbsp;</span>
      {children}
    </motion.section>
  );
}
