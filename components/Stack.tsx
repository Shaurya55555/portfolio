"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Accent, H2, Kicker, Reveal, Section, Window } from "./ui";
import { stackGroups, stackIcons } from "@/lib/data";

/** Kendor-style "stacks" block: a terminal card of grouped chips. */
export default function Stack() {
  return (
    <Section id="stack">
      <Reveal>
        <Kicker>The stack</Kicker>
        <H2 className="max-w-4xl">
          My real stack. <Accent>Not a keyword list.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-secondary">
          Everything here shipped in a project or an internship above.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <Window title="stack --list" right="6 groups" bodyClassName="p-5 sm:p-7">
          <p className="font-mono text-[13px] text-white-100/80">
            $ stack --list <span className="text-secondary"># 5 languages · 3 databases · 2 CI systems</span>
          </p>

          <div className="mt-6 divide-y divide-white/10">
            {stackGroups.map((g, gi) => (
              <div
                key={g.label}
                className="grid gap-3 py-4 sm:grid-cols-[150px_1fr] sm:items-center"
              >
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-secondary">
                  {g.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.3, delay: gi * 0.04 + i * 0.03 }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-tertiary/70 px-3 py-1.5 font-mono text-[13px] text-white-100 transition-colors hover:border-accent/50"
                    >
                      {stackIcons[item] ? (
                        <Image
                          src={stackIcons[item]}
                          alt=""
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                      )}
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Window>
      </Reveal>
    </Section>
  );
}
