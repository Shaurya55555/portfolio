"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Astronaut({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-1.2, 1.2, -1.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 280 480"
        role="img"
        aria-label="Illustration of an astronaut in an EVA spacesuit holding a laptop"
        className="h-auto w-full drop-shadow-[0_28px_55px_rgba(68,104,255,0.28)]"
      >
        <defs>
          <radialGradient id="astro-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#4468ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4468ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="visor-gold" cx="36%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffe7ac" />
            <stop offset="45%" stopColor="#e8ad4c" />
            <stop offset="100%" stopColor="#754a17" />
          </radialGradient>
          <linearGradient id="suit" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef1fb" />
            <stop offset="100%" stopColor="#cfd6ec" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13224e" />
            <stop offset="100%" stopColor="#0a1024" />
          </linearGradient>
        </defs>

        <ellipse cx="140" cy="240" rx="140" ry="240" fill="url(#astro-glow)" />

        {/* tether */}
        <path
          d="M40 210 C 8 300, 56 372, 42 456"
          fill="none"
          stroke="#9db8ff"
          strokeOpacity="0.4"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* PLSS life-support backpack (peeks past the shoulders) */}
        <rect x="82" y="92" width="116" height="176" rx="28" fill="#cdd3e6" />
        <rect x="104" y="86" width="72" height="14" rx="6" fill="#b3bad2" />
        <rect x="90" y="150" width="10" height="46" rx="4" fill="#b8bfd6" />
        <rect x="180" y="150" width="10" height="46" rx="4" fill="#b8bfd6" />

        {/* ---- legs ---- */}
        <path d="M104 250 C 96 252, 93 305, 95 345 C 96 378, 99 392, 104 402 L 124 402 C 128 392, 129 378, 129 345 C 130 305, 126 252, 116 250 Z" fill="url(#suit)" />
        <path d="M156 250 C 164 252, 167 305, 165 345 C 164 378, 161 392, 156 402 L 136 402 C 132 392, 131 378, 131 345 C 130 305, 134 252, 144 250 Z" fill="url(#suit)" />
        <path d="M150 264 C 158 302, 158 360, 151 396 L 145 394 C 153 360, 153 302, 145 266 Z" fill="#9aa4c8" fillOpacity="0.24" />
        {/* knee joint ribbing */}
        <g stroke="#c3cbe6" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M96 332 q14 5 27 0" />
          <path d="M95 340 q15 6 29 0" />
          <path d="M96 348 q14 5 27 0" />
          <path d="M137 332 q14 5 27 0" />
          <path d="M136 340 q15 6 29 0" />
          <path d="M137 348 q14 5 27 0" />
        </g>
        {/* boots */}
        <rect x="96" y="394" width="30" height="10" rx="4" fill="#c3cbe6" />
        <path d="M94 402 h32 v12 q0 8 -8 8 H78 q-12 0 -14 -8 q-2 -12 10 -18 z" fill="#eef1fb" />
        <rect x="62" y="420" width="66" height="8" rx="4" fill="#b3bad2" />
        <rect x="154" y="394" width="30" height="10" rx="4" fill="#c3cbe6" />
        <path d="M186 402 h-32 v12 q0 8 8 8 h40 q12 0 14 -8 q2 -12 -10 -18 z" fill="#eef1fb" />
        <rect x="152" y="420" width="66" height="8" rx="4" fill="#b3bad2" />

        {/* ---- torso ---- */}
        <path d="M104 104 q30 -10 60 0 q30 8 34 52 l3 44 q1 24 -14 40 q-52 16 -106 0 q-15 -16 -14 -40 l3 -44 q4 -44 34 -52z" fill="url(#suit)" />
        <path d="M158 114 C 176 138, 176 196, 165 234 L 159 233 C 170 196, 168 144, 154 118 Z" fill="#9aa4c8" fillOpacity="0.3" />
        <path d="M104 110 C 86 124, 80 162, 83 206" fill="none" stroke="#c7d8ff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
        {/* waist joint ribbing */}
        <g stroke="#c3cbe6" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M92 222 q48 12 96 0" />
          <path d="M91 231 q49 13 98 0" />
          <path d="M92 240 q48 12 96 0" />
        </g>

        {/* O2 hose from chest to helmet */}
        <path d="M120 150 C 96 148, 88 116, 98 92 C 102 82, 110 78, 118 80" fill="none" stroke="#b3bad2" strokeWidth="9" strokeLinecap="round" />
        <path d="M120 150 C 96 148, 88 116, 98 92 C 102 82, 110 78, 118 80" fill="none" stroke="#e4e8f5" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 6" />

        {/* ---- arms ---- */}
        <path d="M100 114 C 74 122, 64 156, 78 186 C 84 202, 100 212, 114 212" fill="none" stroke="#eaeefb" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 114 C 186 122, 196 156, 182 186 C 176 202, 160 212, 146 212" fill="none" stroke="#e1e6f5" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" />
        {/* elbow ribbing */}
        <g stroke="#c3cbe6" strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d="M66 168 q10 -6 20 -2" />
          <path d="M64 176 q11 -6 22 -2" />
          <path d="M66 184 q10 -6 20 -2" />
          <path d="M214 168 q-10 -6 -20 -2" />
          <path d="M216 176 q-11 -6 -22 -2" />
          <path d="M214 184 q-10 -6 -20 -2" />
        </g>
        {/* shoulder joints */}
        <circle cx="100" cy="120" r="12" fill="#d7dcee" />
        <circle cx="160" cy="120" r="12" fill="#d7dcee" />
        {/* mission patch on the left arm */}
        <circle cx="76" cy="150" r="9" fill="#1e3a8a" />
        <path d="M76 145 l1.6 3.4 3.7 .4 -2.7 2.6 .7 3.6 -3.3 -1.8 -3.3 1.8 .7 -3.6 -2.7 -2.6 3.7 -.4z" fill="#9db8ff" />
        {/* wrist rings + gloves */}
        <circle cx="116" cy="216" r="12" fill="#c3cbe6" />
        <circle cx="144" cy="216" r="12" fill="#c3cbe6" />
        <circle cx="114" cy="224" r="13" fill="#f4f6fc" />
        <circle cx="146" cy="224" r="13" fill="#edf0fa" />

        {/* ---- chest control module ---- */}
        <rect x="110" y="130" width="60" height="48" rx="7" fill="#e2e6f4" stroke="#b3bad2" strokeWidth="2" />
        <rect x="115" y="135" width="26" height="16" rx="2" fill="#0c1330" />
        <rect x="117" y="137" width="22" height="12" rx="1" fill="#16244f" />
        <circle cx="151" cy="140" r="5" fill="#9aa4c8" />
        <circle cx="163" cy="140" r="5" fill="#9aa4c8" />
        <rect x="115" y="157" width="8" height="6" rx="1" fill="#4468ff" />
        <rect x="126" y="157" width="8" height="6" rx="1" fill="#9db8ff" />
        <rect x="137" y="157" width="8" height="6" rx="1" fill="#4468ff" />
        <rect x="148" y="157" width="8" height="6" rx="1" fill="#9db8ff" />
        <circle cx="118" cy="171" r="2.6" fill="#4dd07a" />
        <circle cx="127" cy="171" r="2.6" fill="#ffb454" />
        <circle cx="136" cy="171" r="2.6" fill="#ff5c5c" />

        {/* ---- laptop ---- */}
        <g transform="rotate(-4 140 210)">
          <rect x="70" y="224" width="140" height="14" rx="4" fill="#2c3450" />
          <rect x="82" y="186" width="116" height="40" rx="6" fill="#1b2138" />
          <rect x="88" y="191" width="104" height="30" rx="4" fill="url(#screen)" />
          <text x="140" y="212" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="20" fontWeight="700" fill="#9db8ff">
            &lt;/&gt;
          </text>
          <rect x="88" y="191" width="104" height="30" rx="4" fill="#4468ff" fillOpacity="0.12" />
        </g>

        {/* ---- helmet ---- */}
        <rect x="112" y="98" width="56" height="20" rx="7" fill="#b3bad2" />
        <rect x="106" y="100" width="8" height="14" rx="3" fill="#a7aecb" />
        <rect x="166" y="100" width="8" height="14" rx="3" fill="#a7aecb" />
        <circle cx="140" cy="62" r="48" fill="url(#suit)" />
        <circle cx="140" cy="62" r="48" fill="none" stroke="#c3cbe6" strokeWidth="4" />
        <circle cx="140" cy="62" r="36" fill="url(#visor-gold)" />
        <circle cx="140" cy="62" r="36" fill="none" stroke="#7a4e17" strokeWidth="2" strokeOpacity="0.6" />
        <path d="M110 58 q10 -24 40 -22 q-24 6 -30 26 q-4 14 4 30 q-20 -12 -14 -34z" fill="#cfe0ff" fillOpacity="0.35" />
        <circle cx="124" cy="48" r="6" fill="#ffffff" fillOpacity="0.85" />
        <line x1="140" y1="14" x2="140" y2="4" stroke="#c3cbe6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="140" cy="2" r="4.5" fill="#4468ff" />
      </svg>
    </motion.div>
  );
}
