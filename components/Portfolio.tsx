"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

// Code-split the 3D/WebGL layers out of the main bundle so the text, nav
// and layout can paint immediately instead of waiting on three.js.
const StarsCanvas = dynamic(() => import("./canvas/Stars"), { ssr: false });
const AstronautCanvas = dynamic(() => import("./AstronautCanvas"), {
  ssr: false,
});

export default function Portfolio() {
  return (
    <>
      {/* full-page space backdrop, fixed behind all content */}
      <StarsCanvas />

      {/* 3D astronaut, confined to the hero */}
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
