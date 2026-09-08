"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Astronaut({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -22, 0], rotate: [-1.6, 1.6, -1.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 300 640"
        role="img"
        aria-label="Illustration of an astronaut holding a laptop"
        className="h-auto w-full drop-shadow-[0_30px_60px_rgba(68,104,255,0.25)]"
      >
        <defs>
          <radialGradient id="astro-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#4468ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4468ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="visor" cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor="#1b2a5c" />
            <stop offset="55%" stopColor="#0a1230" />
            <stop offset="100%" stopColor="#05091d" />
          </radialGradient>
          <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d3d9ef" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12204a" />
            <stop offset="100%" stopColor="#0a1024" />
          </linearGradient>
        </defs>

        {/* ambient glow */}
        <ellipse cx="150" cy="300" rx="150" ry="320" fill="url(#astro-glow)" />

        {/* tether */}
        <path
          d="M46 270 C 12 360, 70 460, 50 604"
          fill="none"
          stroke="#9db8ff"
          strokeOpacity="0.45"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* backpack */}
        <rect x="96" y="118" width="108" height="170" rx="30" fill="#b7c0de" />

        {/* left leg */}
        <path
          d="M138 316 q-30 8 -32 74 l-4 150 q-1 26 6 44 q16 10 30 0 q6 -66 6 -132 l2 -96 q1 -32 -8 -40z"
          fill="url(#suit)"
        />
        <rect x="96" y="596" width="52" height="32" rx="13" fill="#c7cee6" />

        {/* right leg */}
        <path
          d="M162 316 q30 8 32 74 l4 150 q1 26 -6 44 q-16 10 -30 0 q-6 -66 -6 -132 l-2 -96 q-1 -32 8 -40z"
          fill="url(#suit)"
        />
        <rect x="152" y="596" width="52" height="32" rx="13" fill="#c7cee6" />

        {/* torso */}
        <path
          d="M150 122 q46 0 52 58 l6 96 q3 40 -12 56 q-46 16 -92 0 q-15 -16 -12 -56 l6 -96 q6 -58 52 -58z"
          fill="url(#suit)"
        />

        {/* neck ring */}
        <rect x="126" y="112" width="48" height="18" rx="8" fill="#c7cee6" />

        {/* chest panel */}
        <rect x="124" y="176" width="52" height="38" rx="9" fill="#0c1330" />
        <rect x="132" y="184" width="14" height="10" rx="2" fill="#4468ff" />
        <rect x="150" y="184" width="14" height="10" rx="2" fill="#9db8ff" />
        <rect x="132" y="199" width="32" height="8" rx="2" fill="#2a3358" />

        {/* arms */}
        <path
          d="M100 150 q-32 14 -36 74 l-2 56 q0 20 18 28 l20 -16 q-13 -8 -11 -26 l2 -50 q3 -42 27 -62z"
          fill="url(#suit)"
        />
        <path
          d="M200 150 q32 14 36 74 l2 56 q0 20 -18 28 l-20 -16 q13 -8 11 -26 l-2 -50 q-3 -42 -27 -62z"
          fill="url(#suit)"
        />

        {/* laptop */}
        <g transform="rotate(-4 150 300)">
          <rect x="72" y="300" width="156" height="16" rx="4" fill="#2c3450" />
          <rect x="84" y="236" width="132" height="68" rx="6" fill="#1b2138" />
          <rect x="91" y="243" width="118" height="54" rx="4" fill="url(#screen)" />
          <text
            x="150"
            y="278"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="28"
            fontWeight="700"
            fill="#9db8ff"
          >
            &lt;/&gt;
          </text>
          <rect x="91" y="243" width="118" height="54" rx="4" fill="#4468ff" fillOpacity="0.12" />
        </g>
        {/* gloves */}
        <circle cx="76" cy="304" r="16" fill="#eef1fb" />
        <circle cx="224" cy="304" r="16" fill="#eef1fb" />

        {/* helmet */}
        <circle cx="150" cy="76" r="56" fill="url(#suit)" />
        <circle cx="150" cy="76" r="56" fill="none" stroke="#c7cee6" strokeWidth="4" />
        <circle cx="150" cy="76" r="41" fill="url(#visor)" />
        <path
          d="M124 58 q12 -18 40 -13 q-24 4 -31 22 q-6 13 0 26 q-15 -13 -9 -35z"
          fill="#4468ff"
          fillOpacity="0.55"
        />
        <circle cx="135" cy="61" r="6.5" fill="#ffffff" fillOpacity="0.85" />
        <line x1="150" y1="20" x2="150" y2="8" stroke="#c7cee6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="150" cy="5" r="5" fill="#4468ff" />
      </svg>
    </motion.div>
  );
}
