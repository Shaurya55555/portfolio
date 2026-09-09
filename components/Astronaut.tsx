"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Astronaut({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -18, 0], rotate: [-1.4, 1.4, -1.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 260 460"
        role="img"
        aria-label="Illustration of an astronaut holding a laptop"
        className="h-auto w-full drop-shadow-[0_28px_55px_rgba(68,104,255,0.28)]"
      >
        <defs>
          <radialGradient id="astro-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#4468ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4468ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="visor" cx="36%" cy="32%" r="78%">
            <stop offset="0%" stopColor="#22326e" />
            <stop offset="55%" stopColor="#0b1436" />
            <stop offset="100%" stopColor="#05091d" />
          </radialGradient>
          <linearGradient id="suit" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef1fb" />
            <stop offset="100%" stopColor="#d0d7ed" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13224e" />
            <stop offset="100%" stopColor="#0a1024" />
          </linearGradient>
        </defs>

        <ellipse cx="130" cy="230" rx="135" ry="232" fill="url(#astro-glow)" />

        {/* tether */}
        <path
          d="M40 198 C 10 278, 52 340, 40 432"
          fill="none"
          stroke="#9db8ff"
          strokeOpacity="0.42"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* backpack */}
        <rect x="90" y="90" width="80" height="150" rx="24" fill="#b4bedd" />

        {/* ---- legs ---- */}
        <path
          d="M104 248 C 98 248, 95 300, 96 342 C 96 374, 98 390, 102 400 L 122 400 C 125 390, 126 374, 126 342 C 127 300, 124 250, 116 248 Z"
          fill="url(#suit)"
        />
        <path
          d="M156 248 C 162 248, 165 300, 164 342 C 164 374, 162 390, 158 400 L 138 400 C 135 390, 134 374, 134 342 C 133 300, 136 250, 144 248 Z"
          fill="url(#suit)"
        />
        <path d="M150 262 C 158 300, 158 360, 151 396 L 145 394 C 153 360, 153 300, 145 264 Z" fill="#9aa4c8" fillOpacity="0.26" />
        {/* knee seams */}
        <path d="M99 342 q12 5 24 0" fill="none" stroke="#c3cbe6" strokeWidth="4" strokeLinecap="round" />
        <path d="M137 342 q12 5 24 0" fill="none" stroke="#c3cbe6" strokeWidth="4" strokeLinecap="round" />
        {/* boots */}
        <path d="M100 388 h26 v16 q0 10 -10 10 H84 q-10 0 -10 -10 q0 -13 12 -20 q4 -2 8 0 q3 -6 6 -6 z" fill="#c3cbe6" />
        <path d="M160 388 h-26 v16 q0 10 10 10 h32 q10 0 10 -10 q0 -13 -12 -20 q-4 -2 -8 0 q-3 -6 -6 -6 z" fill="#c3cbe6" />

        {/* ---- torso ---- */}
        <path
          d="M108 108 q22 -6 44 0 q26 6 30 46 l3 46 q1 22 -13 36 q-44 15 -86 0 q-14 -14 -13 -36 l3 -46 q4 -40 30 -46z"
          fill="url(#suit)"
        />
        <path d="M156 116 C 174 140, 174 196, 164 232 L 158 231 C 168 196, 166 145, 152 120 Z" fill="#9aa4c8" fillOpacity="0.3" />
        <path
          d="M106 114 C 88 126, 82 162, 85 204"
          fill="none"
          stroke="#c7d8ff"
          strokeOpacity="0.5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="100" y="228" width="60" height="15" rx="7" fill="#c3cbe6" />
        <rect x="110" y="96" width="40" height="15" rx="7" fill="#c3cbe6" />

        {/* chest panel */}
        <rect x="106" y="140" width="48" height="32" rx="8" fill="#0c1330" />
        <rect x="113" y="147" width="13" height="9" rx="2" fill="#4468ff" />
        <rect x="130" y="147" width="13" height="9" rx="2" fill="#9db8ff" />
        <rect x="113" y="160" width="30" height="7" rx="2" fill="#2a3358" />

        {/* ---- arms ---- */}
        <path
          d="M100 118 C 78 126, 70 158, 82 186 C 88 200, 104 208, 118 206"
          fill="none"
          stroke="#e9edfa"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M160 118 C 182 126, 190 158, 178 186 C 172 200, 156 208, 142 206"
          fill="none"
          stroke="#e0e5f4"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="122" r="10" fill="#c3cbe6" />
        <circle cx="160" cy="122" r="10" fill="#c3cbe6" />
        <circle cx="81" cy="180" r="7" fill="#c3cbe6" />
        <circle cx="179" cy="180" r="7" fill="#c3cbe6" />

        {/* ---- laptop ---- */}
        <g transform="rotate(-4 130 195)">
          <rect x="66" y="208" width="128" height="14" rx="4" fill="#2c3450" />
          <rect x="76" y="156" width="108" height="56" rx="6" fill="#1b2138" />
          <rect x="82" y="162" width="96" height="44" rx="4" fill="url(#screen)" />
          <text
            x="130"
            y="191"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="22"
            fontWeight="700"
            fill="#9db8ff"
          >
            &lt;/&gt;
          </text>
          <rect x="82" y="162" width="96" height="44" rx="4" fill="#4468ff" fillOpacity="0.12" />
        </g>
        <circle cx="114" cy="214" r="12" fill="#f3f5fc" />
        <circle cx="146" cy="214" r="12" fill="#eceffa" />

        {/* ---- helmet ---- */}
        <circle cx="130" cy="62" r="46" fill="url(#suit)" />
        <circle cx="130" cy="62" r="46" fill="none" stroke="#c3cbe6" strokeWidth="4" />
        <circle cx="130" cy="62" r="34" fill="url(#visor)" />
        <path
          d="M108 47 q10 -16 34 -11 q-20 4 -27 20 q-5 11 0 22 q-13 -11 -7 -31z"
          fill="#4468ff"
          fillOpacity="0.55"
        />
        <circle cx="118" cy="50" r="5.5" fill="#ffffff" fillOpacity="0.85" />
        <line x1="130" y1="16" x2="130" y2="6" stroke="#c3cbe6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="130" cy="4" r="4.5" fill="#4468ff" />
      </svg>
    </motion.div>
  );
}
