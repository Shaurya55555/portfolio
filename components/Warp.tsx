"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

/** Faint light-speed streaks that appear only while you are travelling fast. */
export default function Warp() {
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 });
  const opacity = useTransform(v, (x) => Math.min(0.12, Math.abs(x) / 14000));
  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 46px, rgba(255,232,214,0.55) 46px 47px, transparent 47px 131px, rgba(255,232,214,0.35) 131px 132px, transparent 132px 233px)",
        maskImage: "radial-gradient(ellipse at center, transparent 30%, #000 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, #000 100%)",
      }}
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
