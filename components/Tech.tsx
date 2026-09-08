"use client";

import BallCanvas from "./canvas/Ball";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { technologies } from "@/lib/data";

function Tech() {
  return (
    <>
      <Header p="What I work with" h2="Tech." />
      <div className="mt-14 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="h-28 w-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
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
