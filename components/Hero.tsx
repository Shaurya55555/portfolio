"use client";

import { motion } from "framer-motion";
import Astronaut from "./Astronaut";
import { person, heroCopy } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative mx-auto h-screen w-full">
      <Astronaut className="pointer-events-none absolute right-2 top-[46%] hidden w-[240px] -translate-y-1/2 md:block lg:right-10 lg:w-[320px] xl:right-24 xl:w-[380px]" />

      <div className="absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5 px-6 sm:px-16">
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#4468ff]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className="mt-2 text-[40px] font-black text-white xs:text-[50px] sm:text-[60px] sm:leading-[80px] lg:text-[80px] lg:leading-[98px]">
            Hi, I&apos;m <span className="text-[#4468ff]">{person.firstName}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] font-medium text-white-100 xs:text-[20px] sm:text-[26px] sm:leading-[38px] lg:text-[30px] lg:leading-[40px]">
            {heroCopy.lead}{" "}
            <span className="text-[#9db8ff]">{heroCopy.lead2}</span>
          </p>
          <p className="mt-4 max-w-xl text-[14px] leading-[24px] text-secondary sm:text-[16px]">
            {heroCopy.sub}
          </p>
        </div>
      </div>

      <div className="absolute bottom-32 flex w-full items-center justify-center xs:bottom-10">
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
