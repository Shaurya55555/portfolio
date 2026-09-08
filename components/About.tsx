"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { fadeIn } from "@/lib/motion";
import { services, aboutContent, sectionCopy } from "@/lib/data";

function ServiceCard({
  index,
  title,
  icon,
}: {
  index: number;
  title: string;
  icon: string;
}) {
  return (
    <Tilt
      glareEnable
      tiltMaxAngleX={30}
      tiltMaxAngleY={30}
      glareColor="#aaa6c3"
      className="w-full xs:w-[250px]"
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="green-pink-gradient w-full rounded-[20px] p-[1px] shadow-card"
      >
        <div className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary px-12 py-5">
          <Image src={icon} alt={title} width={64} height={64} className="h-16 w-16 object-contain" />
          <h3 className="text-center text-[20px] font-bold text-white">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

function About() {
  return (
    <>
      <Header {...sectionCopy.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        {aboutContent}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
}

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <About />
    </SectionWrapper>
  );
}
