"use client";

import { motion } from "framer-motion";

/** Full-bleed geometric bin × bag scene for the hero plane */
export function HeroIllustration() {
  return (
    <div
      className="texture-grain pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#bfd9cc] via-[#d4e5db] to-[#a8c4b5]" />
      {/* Soft concentric rings — atmosphere without clutter */}
      <div className="absolute -right-24 top-1/2 size-[520px] -translate-y-1/2 rounded-full border border-[#1f4d3d]/10 sm:size-[640px]" />
      <div className="absolute -right-8 top-1/2 size-[360px] -translate-y-1/2 rounded-full border border-[#1f4d3d]/12 sm:size-[460px]" />
      <motion.svg
        className="absolute -right-[18%] top-[18%] h-[78%] w-auto opacity-40 sm:-right-[2%] sm:top-[4%] sm:h-[96%] sm:opacity-95"
        viewBox="0 0 480 560"
        fill="none"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft floor shadow */}
        <ellipse cx="240" cy="520" rx="150" ry="18" fill="#1f4d3d" opacity="0.12" />

        {/* Trash bin body */}
        <motion.path
          d="M110 180 L130 470 Q240 500 350 470 L370 180 Z"
          fill="#f4f8f5"
          stroke="#1f4d3d"
          strokeWidth="3.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        />
        {/* Bin rim */}
        <ellipse
          cx="240"
          cy="180"
          rx="130"
          ry="28"
          fill="#e7efea"
          stroke="#1f4d3d"
          strokeWidth="3.5"
        />
        {/* Inner opening */}
        <ellipse cx="240" cy="180" rx="108" ry="20" fill="#c5d6cc" opacity="0.7" />

        {/* Bag overhang folds */}
        <motion.path
          d="M132 175 Q100 210 115 250 Q150 230 165 195"
          stroke="#3f7a62"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        />
        <motion.path
          d="M348 175 Q380 210 365 250 Q330 230 315 195"
          stroke="#3f7a62"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        />

        {/* Bag liner inside */}
        <path
          d="M150 195 Q240 230 330 195 L318 430 Q240 455 162 430 Z"
          fill="#3f7a62"
          opacity="0.18"
        />

        {/* Dimension callouts */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <line
            x1="390"
            y1="190"
            x2="390"
            y2="455"
            stroke="#1f4d3d"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x="405"
            y="330"
            fill="#1f4d3d"
            fontSize="18"
            fontFamily="sans-serif"
          >
            高さ
          </text>
          <line
            x1="140"
            y1="145"
            x2="340"
            y2="145"
            stroke="#1f4d3d"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x="220"
            y="132"
            fill="#1f4d3d"
            fontSize="18"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            口まわり
          </text>
        </motion.g>
      </motion.svg>

      {/* Soft vignette for text legibility on left */}
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#e7efea]/95 via-[#e7efea]/75 to-transparent sm:w-[62%]" />
    </div>
  );
}
