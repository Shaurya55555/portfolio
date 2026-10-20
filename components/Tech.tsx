"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Accent, H2, Kicker, Section, SectionHead } from "./ui";
import InView from "./InView";
import { useScene } from "./HorizontalScene";
import { technologies } from "@/lib/data";

const BallCanvas = dynamic(() => import("./canvas/Ball"), { ssr: false });

function TechBall({
  name,
  icon,
  index,
}: {
  name: string;
  icon: string;
  index: number;
}) {
  // Stagger when each ball actually opens a WebGL context, so 11 canvases
  // don't all initialize in the same frame the moment this row scrolls in.
  const [mount, setMount] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMount(true), (index % 6) * 90);
    return () => window.clearTimeout(id);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group relative h-28 w-28"
    >
      {mount && <BallCanvas icon={icon} />}
      <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-md border border-white/10 bg-panel-2 px-2.5 py-1 text-[12px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {name}
      </span>
    </motion.div>
  );
}

/** The floating 3D tech stones, as on the original site. */
export default function Tech() {
  const scene = useScene();
  return (
    <Section id="stack" planet="stack">
      <div className={scene ? "flex items-center gap-14" : ""}>
      <div className={scene ? "w-[300px] flex-none" : ""}>
      <SectionHead>
        <Kicker>What I work with</Kicker>
        <H2>
          Tech. <Accent>In orbit.</Accent>
        </H2>
      </SectionHead>
      </div>
      <InView className={scene ? "flex w-[600px] flex-none flex-row flex-wrap justify-center gap-x-8 gap-y-6" : "mt-14 flex flex-row flex-wrap justify-center gap-10"} rootMargin="250px">
        {technologies.map((t, i) => (
          <TechBall key={t.name} name={t.name} icon={t.icon} index={i} />
        ))}
      </InView>
      </div>
    </Section>
  );
}
