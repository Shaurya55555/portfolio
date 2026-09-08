"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { fadeIn } from "@/lib/motion";
import { projects, sectionCopy, type Project } from "@/lib/data";

function ProjectCard({ index, ...project }: { index: number } & Project) {
  const external = project.liveLink || project.demoLink;
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.4, 0.75)}>
      <Tilt
        glareEnable
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        glareColor="#aaa6c3"
        className="w-full sm:w-[340px]"
      >
        <div className="group/card w-full rounded-2xl bg-tertiary p-5">
          <div
            className="relative flex h-[200px] w-full items-center justify-center rounded-2xl"
            style={{ background: project.gradient }}
          >
            <span className="text-[56px] font-black text-white/90 drop-shadow">
              {project.monogram}
            </span>

            <div className="card-img_hover absolute inset-0 m-3 flex justify-end gap-2">
              <a
                href={project.sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source`}
                className="black-gradient flex h-10 w-10 items-center justify-center rounded-full"
              >
                <Image
                  src="/github.png"
                  alt="github"
                  width={20}
                  height={20}
                  className="h-1/2 w-1/2 object-contain"
                />
              </a>
              {external && (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live`}
                  className="black-gradient flex h-10 w-10 items-center justify-center rounded-full text-white"
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{project.name}</h3>
            <p className="mt-2 text-[14px] leading-[22px] text-secondary">
              {project.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

function Works() {
  return (
    <>
      <Header p={sectionCopy.works.p} h2={sectionCopy.works.h2} />
      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 max-w-3xl text-[17px] leading-[30px] text-secondary"
        >
          {sectionCopy.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default function WorksSection() {
  return (
    <SectionWrapper id="projects">
      <Works />
    </SectionWrapper>
  );
}
