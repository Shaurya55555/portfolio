"use client";

import { motion } from "framer-motion";
import { person, heroCopy } from "@/lib/data";
import OrbitMap from "./OrbitMap";

export default function Hero() {
  return (
    <section id="intro" className="relative mx-auto h-screen w-full">
      <OrbitMap />
      <div className="pointer-events-none absolute inset-0 top-[120px] z-10 mx-auto flex max-w-7xl flex-row items-start gap-5 px-6 sm:px-16">
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#ffc8a2]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div className="pointer-events-auto">
          <h1 className="mt-2 text-[40px] font-black text-white xs:text-[50px] sm:text-[60px] sm:leading-[80px] lg:text-[80px] lg:leading-[98px]">
            Hi, I&apos;m <span className="text-[#ffc8a2]">{person.firstName}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] font-medium text-white-100 xs:text-[20px] sm:text-[26px] sm:leading-[38px] lg:text-[30px] lg:leading-[40px]">
            {heroCopy.lead}{" "}
            <span className="text-[#ffe9db]">{heroCopy.lead2}</span>
          </p>
          <p className="mt-4 max-w-xl text-[14px] leading-[24px] text-secondary sm:text-[16px]">
            {heroCopy.sub}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-[#ffc8a2] px-6 py-2.5 text-[14px] font-semibold text-black transition-transform hover:scale-105"
            >
              View projects
            </a>
            <a
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:border-[#ffc8a2]"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 hidden w-full items-center justify-center sm:flex xs:bottom-10">
        <a href="#about">
          <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="mb-1 h-3 w-3 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
