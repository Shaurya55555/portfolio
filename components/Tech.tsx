"use client";

import dynamic from "next/dynamic";
import { Accent, H2, Kicker, Section, SectionHead } from "./ui";

// one WebGL scene for every brick, loaded only when the section nears the screen
const TechOrbit = dynamic(() => import("./canvas/TechOrbit"), { ssr: false });

/** The whole toolbox as a small solar system. */
export default function Tech() {
  return (
    <Section id="stack" planet="stack">
      <SectionHead>
        <Kicker>What I work with</Kicker>
        <H2>
          Tech. <Accent>In orbit.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          Front end on the inner orbit, back end and data in the middle, infrastructure and AI tooling on the outer ring.
        </p>
      </SectionHead>
      <TechOrbit />
    </Section>
  );
}
