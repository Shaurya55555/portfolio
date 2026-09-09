"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Astronaut({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -15, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 320 400"
        role="img"
        aria-label="Cartoon astronaut holding a laptop"
        className="h-auto w-full drop-shadow-[0_26px_50px_rgba(68,104,255,0.3)]"
      >
        <defs>
          <radialGradient id="astro-glow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#4468ff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#4468ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="visor" cx="34%" cy="28%" r="88%">
            <stop offset="0%" stopColor="#2c3556" />
            <stop offset="45%" stopColor="#0c1122" />
            <stop offset="100%" stopColor="#04060e" />
          </radialGradient>
          <linearGradient id="suit" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#eef1fb" />
            <stop offset="100%" stopColor="#d3dbef" />
          </linearGradient>
        </defs>

        <ellipse cx="160" cy="190" rx="150" ry="196" fill="url(#astro-glow)" />

        {/* tether */}
        <path
          d="M84 222 C 54 282, 94 332, 80 388"
          fill="none"
          stroke="#9db8ff"
          strokeOpacity="0.4"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ---- legs ---- */}
        <path d="M150 292 C 141 296, 137 322, 141 342 C 143 356, 152 360, 158 354 C 162 336, 162 308, 160 296 C 158 290, 154 290, 150 292 Z" fill="url(#suit)" />
        <path d="M170 292 C 179 296, 183 322, 179 342 C 177 356, 168 360, 162 354 C 158 336, 158 308, 160 296 C 162 290, 166 290, 170 292 Z" fill="url(#suit)" />
        <path d="M176 302 C 182 322, 182 344, 176 355 L 171 353 C 177 342, 177 322, 171 304 Z" fill="#9aa4c8" fillOpacity="0.22" />
        {/* boots */}
        <path d="M134 346 q-8 6 -8 18 q0 10 12 10 h20 q8 0 8 -10 v-10 q0 -10 -10 -10 z" fill="#eef1fb" />
        <path d="M186 346 q8 6 8 18 q0 10 -12 10 h-20 q-8 0 -8 -10 v-10 q0 -10 10 -10 z" fill="#eef1fb" />
        <rect x="120" y="370" width="42" height="8" rx="4" fill="#c7cee6" />
        <rect x="158" y="370" width="42" height="8" rx="4" fill="#c7cee6" />

        {/* ---- torso ---- */}
        <path d="M160 158 q38 0 44 40 l4 44 q2 26 -16 38 q-32 12 -64 0 q-18 -12 -16 -38 l4 -44 q6 -40 44 -40z" fill="url(#suit)" />
        <path d="M200 170 C 213 196, 213 246, 203 274 L 197 272 C 206 246, 204 200, 193 176 Z" fill="#9aa4c8" fillOpacity="0.28" />
        <path d="M160 162 L 160 286" stroke="#cdd4ea" strokeWidth="2.4" strokeLinecap="round" />
        {/* shoulders */}
        <circle cx="120" cy="184" r="18" fill="url(#suit)" />
        <circle cx="200" cy="184" r="18" fill="url(#suit)" />

        {/* ---- arms ---- */}
        <path d="M124 186 C 100 196, 94 224, 106 242 C 116 256, 134 260, 152 256" fill="none" stroke="#eef1fb" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M196 186 C 220 196, 226 224, 214 242 C 204 256, 186 260, 168 256" fill="none" stroke="#e6eaf6" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="102" cy="230" r="8" fill="#d7dcee" />
        <circle cx="218" cy="230" r="8" fill="#d7dcee" />

        {/* ---- laptop ---- */}
        <rect x="116" y="234" width="88" height="12" rx="3" fill="#2c3450" />
        <rect x="124" y="188" width="72" height="48" rx="5" fill="#1b2138" />
        <rect x="129" y="193" width="62" height="38" rx="3" fill="#0a1024" />
        <text x="160" y="216" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="21" fontWeight="700" fill="#9db8ff">
          &lt;/&gt;
        </text>
        <rect x="129" y="193" width="62" height="38" rx="3" fill="#4468ff" fillOpacity="0.12" />
        {/* gloves gripping the laptop */}
        <circle cx="140" cy="240" r="16" fill="#f6f8fd" />
        <circle cx="180" cy="240" r="16" fill="#eef1fb" />

        {/* belt + red buckle (below the laptop) */}
        <rect x="122" y="258" width="76" height="15" rx="4" fill="#cfd6ec" />
        <rect x="150" y="256" width="20" height="20" rx="3" fill="#ff5c5c" />
        <rect x="154" y="261" width="12" height="4" rx="2" fill="#ffb3b3" />

        {/* ---- helmet ---- */}
        <circle cx="160" cy="94" r="66" fill="url(#suit)" />
        <circle cx="160" cy="94" r="66" fill="none" stroke="#d7dcee" strokeWidth="3" />
        <rect x="104" y="46" width="112" height="98" rx="46" fill="#f2f4fb" />
        <rect x="111" y="52" width="98" height="86" rx="40" fill="url(#visor)" />
        <ellipse cx="136" cy="76" rx="12" ry="17" transform="rotate(-22 136 76)" fill="#ffffff" fillOpacity="0.9" />
        <ellipse cx="157" cy="68" rx="5.5" ry="8" transform="rotate(-22 157 68)" fill="#ffffff" fillOpacity="0.75" />
        {/* antenna */}
        <line x1="182" y1="34" x2="190" y2="16" stroke="#c7cee6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="191" cy="13" r="5" fill="#4468ff" />
        {/* neck */}
        <path d="M146 150 h28 l-3 12 h-22 z" fill="#e6eaf6" />
      </svg>
    </motion.div>
  );
}
