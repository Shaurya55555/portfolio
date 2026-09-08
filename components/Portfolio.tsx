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

export default function Portfolio() {
  return (
    <>
      {/* full-page space backdrop, fixed behind all content */}
      <StarsCanvas />

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
