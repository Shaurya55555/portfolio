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
    <div className="relative z-0">
      {/* full-page space backdrop */}
      <StarsCanvas />

      <div className="hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Contact />
      <Footer />
    </div>
  );
}
