"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Astronaut({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        reduce
          ? undefined
          : { y: [0, -18, 0], rotate: [-2.5, 2.5, -2.5] }
      }
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 400 440"
        role="img"
        aria-label="Illustration of an astronaut holding a laptop"
        className="h-auto w-full drop-shadow-[0_25px_45px_rgba(68,104,255,0.25)]"
      >
        <defs>
          <radialGradient id="astro-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#4468ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4468ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="visor" cx="38%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#1b2a5c" />
            <stop offset="55%" stopColor="#0a1230" />
            <stop offset="100%" stopColor="#05091d" />
          </radialGradient>
          <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d7ddf0" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12204a" />
            <stop offset="100%" stopColor="#0a1024" />
          </linearGradient>
        </defs>

        {/* ambient glow */}
        <ellipse cx="200" cy="210" rx="180" ry="190" fill="url(#astro-glow)" />

        {/* tether */}
        <path
          d="M92 250 C 60 300, 120 340, 96 392"
          fill="none"
          stroke="#9db8ff"
          strokeOpacity="0.5"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* backpack */}
        <rect x="150" y="150" width="100" height="150" rx="30" fill="#b9c2e0" />

        {/* left leg */}
        <path
          d="M176 286 q-16 6 -20 46 q-2 24 10 40 q16 8 26 -4 q6 -34 6 -70 q0 -18 -22 -12z"
          fill="url(#suit)"
        />
        <rect x="150" y="360" width="42" height="26" rx="12" fill="#c7cee6" />
        {/* right leg */}
        <path
          d="M224 286 q16 6 20 46 q2 24 -10 40 q-16 8 -26 -4 q-6 -34 -6 -70 q0 -18 22 -12z"
          fill="url(#suit)"
        />
        <rect x="208" y="360" width="42" height="26" rx="12" fill="#c7cee6" />

        {/* torso */}
        <path
          d="M200 150 q54 0 58 60 q4 58 -10 84 q-48 16 -96 0 q-14 -26 -10 -84 q4 -60 58 -60z"
          fill="url(#suit)"
        />

        {/* chest panel */}
        <rect x="176" y="196" width="48" height="34" rx="8" fill="#0c1330" />
        <rect x="183" y="203" width="12" height="9" rx="2" fill="#4468ff" />
        <rect x="199" y="203" width="12" height="9" rx="2" fill="#9db8ff" />
        <rect x="183" y="216" width="28" height="7" rx="2" fill="#2a3358" />

        {/* arms wrapping to the laptop */}
        <path
          d="M150 196 q-34 10 -40 60 q-2 20 18 30 l24 -18 q-14 -8 -12 -26 q2 -22 20 -30z"
          fill="url(#suit)"
        />
        <path
          d="M250 196 q34 10 40 60 q2 20 -18 30 l-24 -18 q14 -8 12 -26 q-2 -22 -20 -30z"
          fill="url(#suit)"
        />

        {/* laptop */}
        <g transform="rotate(-4 200 300)">
          <rect x="132" y="298" width="136" height="14" rx="4" fill="#2c3450" />
          <rect x="140" y="238" width="120" height="64" rx="6" fill="#1b2138" />
          <rect x="147" y="245" width="106" height="50" rx="4" fill="url(#screen)" />
          <text
            x="200"
            y="277"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="26"
            fontWeight="700"
            fill="#9db8ff"
          >
            &lt;/&gt;
          </text>
          <rect x="147" y="245" width="106" height="50" rx="4" fill="#4468ff" fillOpacity="0.12" />
        </g>
        {/* gloves */}
        <circle cx="150" cy="300" r="14" fill="#eef1fb" />
        <circle cx="250" cy="300" r="14" fill="#eef1fb" />

        {/* helmet */}
        <circle cx="200" cy="112" r="66" fill="url(#suit)" />
        <circle cx="200" cy="112" r="66" fill="none" stroke="#c7cee6" strokeWidth="4" />
        <circle cx="200" cy="112" r="48" fill="url(#visor)" />
        <path
          d="M170 92 q14 -20 44 -14 q-26 4 -34 24 q-6 14 0 28 q-16 -14 -10 -38z"
          fill="#4468ff"
          fillOpacity="0.55"
        />
        <circle cx="184" cy="96" r="7" fill="#ffffff" fillOpacity="0.85" />

        {/* helmet antenna */}
        <line x1="200" y1="44" x2="200" y2="30" stroke="#c7cee6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="200" cy="26" r="5" fill="#4468ff" />
      </svg>
    </motion.div>
  );
}
