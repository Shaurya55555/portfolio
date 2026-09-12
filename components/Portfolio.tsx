"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import Contact from "./Contact";
import Footer from "./Footer";
import StarsCanvas from "./canvas/Stars";
import AstronautCanvas from "./AstronautCanvas";
import ScrollProgress from "./ScrollProgress";

export default function Portfolio() {
  return (
    <>
      {/* full-page space backdrop, fixed behind all content */}
      <StarsCanvas />

      {/* 3D astronaut drifting across the page, behind the content */}
      <AstronautCanvas className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />

      <ScrollProgress />

      <div className="relative z-[1]">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Works />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
