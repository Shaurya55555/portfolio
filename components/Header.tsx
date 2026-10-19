"use client";

import { motion } from "framer-motion";
import { textVariant } from "@/lib/motion";

export const sectionStyles = {
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

export default function Header({
  p,
  h2,
  useMotion = true,
}: {
  p: string;
  h2: string;
  useMotion?: boolean;
}) {
  const content = (
    <>
      <p className={sectionStyles.sectionSubText}>{p}</p>
      <h2 className={sectionStyles.sectionHeadText}>{h2}</h2>
    </>
  );

  return useMotion ? (
    <motion.div variants={textVariant()}>{content}</motion.div>
  ) : (
    <div>{content}</div>
  );
}
