"use client";

import dynamic from "next/dynamic";
import { Accent, H2, Kicker, Section, SectionHead } from "./ui";

// one WebGL scene for every brick, loaded only when the section nears the screen
const TechBricks = dynamic(() => import("./canvas/TechOrbit"), { ssr: false });

/** The whole toolbox as a small solar system. */
export default function Tech() {
  return (
    <Section id="stack" planet="stack">
      <SectionHead>
        <Kicker>What I work with</Kicker>
        <H2>
          Tech. <Accent>Stack.</Accent>
        </H2>
      </SectionHead>
      <TechBricks />
    </Section>
  );
}
