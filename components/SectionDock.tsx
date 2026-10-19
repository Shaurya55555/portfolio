"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { dockLinks } from "@/lib/data";

/** Floating bottom section nav with an overall scroll-progress line, kendor-style. */
export default function SectionDock() {
  const [active, setActive] = useState("intro");
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const els = dockLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center md:flex">
      <AnimatePresence>
        {show && (
          <motion.nav
            aria-label="Sections"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 22 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1.5 pb-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {dockLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
                  active === l.id
                    ? "bg-accent text-black"
                    : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
            <span className="absolute inset-x-5 bottom-[3px] h-[2px] overflow-hidden rounded-full bg-white/10">
              <motion.span
                style={{ scaleX: progress }}
                className="block h-full w-full origin-left bg-gradient-to-r from-white/25 to-accent"
              />
            </span>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
