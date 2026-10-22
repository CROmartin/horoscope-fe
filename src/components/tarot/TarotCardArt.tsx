"use client";

import { useId } from "react";
import type { TarotSuit } from "@/lib/tarotCards";

const ROMAN = [
  "0",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
  "XVIII",
  "XIX",
  "XX",
  "XXI",
];

const SUIT_INK: Record<TarotSuit, string> = {
  wands: "#8d3428",
  cups: "#1d4f78",
  swords: "#3a4250",
  pentacles: "#2b5a38",
};

function starPoints(cx: number, cy: number, outer: number, inner: number, points = 8) {
  const pairs: string[] = [];
  for (let index = 0; index < points; index += 1) {
    const outerAngle = -Math.PI / 2 + (index * 2 * Math.PI) / points;
    const innerAngle = outerAngle + Math.PI / points;
    pairs.push(`${cx + Math.cos(outerAngle) * outer},${cy + Math.sin(outerAngle) * outer}`);
    pairs.push(`${cx + Math.cos(innerAngle) * inner},${cy + Math.sin(innerAngle) * inner}`);
  }
  return pairs.join(" ");
}

function indexLabel(arcana: "major" | "minor", number: number) {
  if (arcana === "major") return ROMAN[number] ?? String(number);
  if (number === 1) return "A";
  if (number <= 10) return String(number);
  return ["V", "C", "R", "K"][number - 11] ?? String(number);
}

function SuitGlyph({ suit, ink }: { suit: TarotSuit; ink: string }) {
  if (suit === "cups") {
    return (
      <g fill={ink}>
        <ellipse cx="0" cy="-12" rx="18" ry="5.5" />
        <path d="M-16 -10 C-17 8 -10 20 0 23 C10 20 17 8 16 -10 C8 -6 4 -6 0 -11 C-4 -6 -8 -6 -16 -10 Z" />
        <path d="M-7 -8 C-5 2 -2 8 0 10 C2 8 5 2 7 -8 C3 -5 1 -5 0 -9 C-1 -5 -3 -5 -7 -8 Z" fill="#f7f1e4" opacity="0.4" />
        <rect x="-1.8" y="22" width="3.6" height="12" rx="1" />
        <path d="M-11 34 h22 l2 3.5 h-26 z" />
        <path d="M-14 37.5 h28 v4 h-28 z" />
      </g>
    );
  }
  if (suit === "wands") {
    return (
      <g fill={ink}>
        <rect x="-3.2" y="-24" width="6.4" height="52" rx="3" />
        <circle cx="0" cy="-28" r="7" />
        <circle cx="0" cy="-28" r="3" fill="#e7c56a" />
        <rect x="-7" y="-8" width="14" height="3" rx="1" />
        <rect x="-7" y="10" width="14" height="3" rx="1" />
        <path d="M-12 32 h24 v6 h-24 z" />
      </g>
    );
  }
  if (suit === "swords") {
    return (
      <g fill={ink}>
        <path d="M0 -34 L7 16 H-7 Z" />
        <path d="M-16 16 h32 v4 h-32 z" />
        <rect x="-2.4" y="20" width="4.8" height="14" />
        <circle cx="0" cy="38" r="4.5" />
      </g>
    );
  }
  return (
    <g fill="none" stroke={ink} strokeWidth="2.4">
      <circle cx="0" cy="0" r="18" fill="#f4e7c4" />
      <circle cx="0" cy="0" r="18" />
      <polygon points={starPoints(0, 0, 11, 5, 5)} fill={ink} stroke="none" />
    </g>
  );
}

function Pips({ suit, number }: { suit: TarotSuit; number: number }) {
  const ink = SUIT_INK[suit];
  const spots: Record<number, Array<[number, number]>> = {
    2: [
      [150, 168],
      [150, 332],
    ],
    3: [
      [150, 156],
      [150, 248],
      [150, 340],
    ],
    4: [
      [112, 168],
      [188, 168],
      [112, 332],
      [188, 332],
    ],
    5: [
      [112, 164],
      [188, 164],
      [150, 248],
      [112, 332],
      [188, 332],
    ],
    6: [
      [112, 156],
      [188, 156],
      [112, 248],
      [188, 248],
      [112, 340],
      [188, 340],
    ],
    7: [
      [112, 150],
      [188, 150],
      [150, 198],
      [112, 248],
      [188, 248],
      [112, 344],
      [188, 344],
    ],
    8: [
      [112, 146],
      [188, 146],
      [150, 190],
      [112, 236],
      [188, 236],
      [150, 306],
      [112, 348],
      [188, 348],
    ],
    9: [
      [112, 146],
      [188, 146],
      [112, 206],
      [188, 206],
      [150, 248],
      [112, 290],
      [188, 290],
      [112, 348],
      [188, 348],
    ],
    10: [
      [112, 140],
      [188, 140],
      [150, 176],
      [112, 214],
      [188, 214],
      [112, 282],
      [188, 282],
      [150, 320],
      [112, 356],
      [188, 356],
    ],
  };
  const scale = number <= 3 ? 0.72 : number <= 6 ? 0.56 : 0.46;
  return (
    <>
      {(spots[number] ?? []).map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale} ${y > 260 ? -scale : scale})`}>
          <SuitGlyph suit={suit} ink={ink} />
        </g>
      ))}
    </>
  );
}

function Court({ suit }: { suit: TarotSuit }) {
  const ink = SUIT_INK[suit];
  return (
    <g>
      <rect x="86" y="128" width="128" height="292" rx="64" fill={ink} opacity="0.05" />
      <rect x="86" y="128" width="128" height="292" rx="64" fill="none" stroke={ink} strokeWidth="1.4" />
      <rect x="98" y="140" width="104" height="268" rx="52" fill="none" stroke="#b8893e" strokeWidth="1" />
      <path d="M118 168 h64 l-8 16 h-48 z" fill="#b8893e" />
      <path d="M126 160 h10 l-5 -12 z M150 160 h10 l-5 -12 z M174 160 h10 l-5 -12 z" fill="#b8893e" />
      <circle cx="131" cy="148" r="2.4" fill="#f4e7c4" />
      <circle cx="155" cy="144" r="2.4" fill="#f4e7c4" />
      <circle cx="179" cy="148" r="2.4" fill="#f4e7c4" />
      <g transform="translate(150 268) scale(1.85)">
        <SuitGlyph suit={suit} ink={ink} />
      </g>
      <path d="M122 372 h56" stroke="#b8893e" strokeWidth="1.3" />
    </g>
  );
}

function AceMedallion() {
  return (
    <g>
      {Array.from({ length: 24 }, (_, index) => (
        <line
          key={index}
          x1="150"
          y1="158"
          x2="150"
          y2="132"
          stroke="#d7b56a"
          strokeWidth="1.7"
          strokeLinecap="round"
          transform={`rotate(${index * 15} 150 252)`}
        />
      ))}
      <circle cx="150" cy="252" r="92" fill="#fffaf1" stroke="#b8893e" strokeWidth="1.7" />
      <circle cx="150" cy="252" r="84" fill="none" stroke="#e7d3ae" strokeWidth="1" />
    </g>
  );
}

function Ace({ suit }: { suit: TarotSuit }) {
  const ink = SUIT_INK[suit];
  return (
    <g>
      <AceMedallion />
      {suit === "cups" ? (
        <g fill={ink} transform="translate(150 258)">
          <path d="M-34 -34 C-37 6 -18 34 0 40 C18 34 37 6 34 -34 Z" />
          <ellipse cx="0" cy="-34" rx="36" ry="12" />
          <path d="M-11 -24 C-7 0 -3 12 0 16 C3 12 7 0 11 -24 C5 -18 2 -18 0 -26 C-2 -18 -5 -18 -11 -24 Z" fill="#f4fbff" opacity="0.4" />
          <ellipse cx="0" cy="8" rx="3.5" ry="6" fill="#8ec4e0" />
          <rect x="-3.2" y="38" width="6.4" height="26" rx="1.5" />
          <path d="M-22 64 h44 l3 7 h-50 z" />
          <path d="M-28 71 h56 v8 h-56 z" />
          <circle cx="0" cy="-68" r="3.2" fill="#b8893e" />
          <path d="M0 -60 v-12" stroke="#b8893e" strokeWidth="1.3" fill="none" />
        </g>
      ) : null}
      {suit === "wands" ? (
        <g fill={ink} transform="translate(150 252)">
          <rect x="-7" y="-62" width="14" height="128" rx="7" />
          <circle cx="0" cy="-70" r="16" />
          <circle cx="0" cy="-70" r="7" fill="#e7c56a" />
          <path d="M-7 -20 h-22 l10 8 h12 z" fill="#2b5a38" />
          <path d="M7 8 h22 l-10 8 h-12 z" fill="#2b5a38" />
          <rect x="-16" y="-28" width="32" height="5" rx="1" fill="#b8893e" />
          <rect x="-16" y="16" width="32" height="5" rx="1" fill="#b8893e" />
          <path d="M-22 62 h44 v8 h-44 z" />
        </g>
      ) : null}
      {suit === "swords" ? (
        <g fill={ink} transform="translate(150 250)">
          <path d="M0 -88 L16 28 H-16 Z" />
          <path d="M-6 -70 L0 -8 L6 -70" fill="#f7f1e4" opacity="0.35" />
          <path d="M-40 28 h80 v8 h-80 z" fill="#b8893e" />
          <rect x="-5" y="36" width="10" height="28" rx="2" />
          <circle cx="0" cy="74" r="9" fill="#b8893e" />
          <circle cx="0" cy="74" r="3.5" fill="#fffaf1" />
        </g>
      ) : null}
      {suit === "pentacles" ? (
        <g transform="translate(150 252)">
          <circle cx="0" cy="0" r="58" fill="#f4e7c4" stroke={ink} strokeWidth="3" />
          <circle cx="0" cy="0" r="48" fill="none" stroke="#b8893e" strokeWidth="1.4" />
          <polygon points={starPoints(0, 0, 34, 14, 5)} fill={ink} />
          <circle cx="0" cy="0" r="7" fill="#f4e7c4" stroke={ink} strokeWidth="1.4" />
        </g>
      ) : null}
    </g>
  );
}

function MajorEmblem({ number }: { number: number }) {
  const ink = "#3c2b1e";
  const gold = "#a67c3d";
  if (number === 0) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.2">
        <path d="M150 150 c40 10 58 48 40 78 c-16 26 -58 24 -78 4 c-22 -22 -8 -62 22 -74" />
        <circle cx="196" cy="156" r="10" fill={gold} stroke={ink} />
      </g>
    );
  }
  if (number === 1) {
    return (
      <g fill={ink}>
        <path d="M118 188 q32 -46 64 0" fill="none" stroke={ink} strokeWidth="2.4" />
        <rect x="146" y="188" width="8" height="78" />
        <circle cx="122" cy="286" r="8" fill={gold} />
        <circle cx="178" cy="286" r="8" />
        <circle cx="150" cy="312" r="8" fill={gold} />
        <circle cx="150" cy="260" r="8" />
      </g>
    );
  }
  if (number === 2) {
    return (
      <g fill="none" stroke={ink} strokeWidth="3">
        <path d="M118 150 v150" />
        <path d="M182 150 v150" />
        <path d="M168 188 a22 22 0 1 0 0 28" stroke={gold} strokeWidth="3" />
      </g>
    );
  }
  if (number === 3) {
    return (
      <g fill={gold} stroke={ink} strokeWidth="1.4">
        {Array.from({ length: 10 }, (_, index) => (
          <ellipse key={index} cx="150" cy="188" rx="10" ry="26" transform={`rotate(${index * 36} 150 236)`} />
        ))}
        <circle cx="150" cy="236" r="16" fill="#fffaf1" />
      </g>
    );
  }
  if (number === 4) {
    return (
      <g fill={ink}>
        <path d="M104 210 h92 v18 h-36 v78 h-20 v-78 h-36 z" />
        <path d="M118 168 q32 -36 64 0" fill="none" stroke={gold} strokeWidth="4" />
      </g>
    );
  }
  if (number === 5) {
    return (
      <g fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round">
        <circle cx="132" cy="196" r="16" />
        <path d="M132 212 v78" />
        <circle cx="176" cy="214" r="16" />
        <path d="M176 230 v60" />
        <path d="M116 168 h80" stroke={gold} />
      </g>
    );
  }
  if (number === 6) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.4">
        <circle cx="124" cy="248" r="34" fill="#fffaf1" />
        <circle cx="176" cy="248" r="34" fill="#fffaf1" />
        <path d="M150 168 l10 22 h-20 z" fill={gold} stroke={gold} />
      </g>
    );
  }
  if (number === 7) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.4">
        <path d="M108 196 h84 v18 h-84 z" fill="#fffaf1" />
        <path d="M116 214 v70" />
        <path d="M184 214 v70" />
        <circle cx="122" cy="300" r="16" fill="#fffaf1" />
        <circle cx="178" cy="300" r="16" fill="#fffaf1" />
      </g>
    );
  }
  if (number === 8) {
    return (
      <g fill="none" stroke={ink} strokeWidth="3">
        <path d="M118 196 c20 -28 44 -28 64 0 c-20 20 -44 20 -64 0 z" />
        <path d="M118 228 c20 28 44 28 64 0" />
        <circle cx="150" cy="292" r="28" fill="#fffaf1" />
      </g>
    );
  }
  if (number === 9) {
    return (
      <g stroke={ink} fill="#fffaf1" strokeWidth="2">
        <path d="M150 150 l18 34 h36 l-28 24 10 36 -36 -20 -36 20 10 -36 -28 -24 h36 z" fill={gold} />
        <rect x="128" y="268" width="44" height="58" rx="6" />
        <path d="M142 292 h16" />
      </g>
    );
  }
  if (number === 10) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.2">
        <circle cx="150" cy="246" r="70" />
        <circle cx="150" cy="246" r="18" fill={gold} stroke={gold} />
        {Array.from({ length: 8 }, (_, index) => (
          <line key={index} x1="150" y1="184" x2="150" y2="210" transform={`rotate(${index * 45} 150 246)`} />
        ))}
      </g>
    );
  }
  if (number === 11) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.4">
        <path d="M150 168 v120" />
        <path d="M118 196 h64" />
        <path d="M118 196 l-16 48 h32 z" fill="#fffaf1" />
        <path d="M182 196 l-16 48 h32 z" fill="#fffaf1" />
        <rect x="142" y="288" width="16" height="28" fill={ink} stroke="none" />
      </g>
    );
  }
  if (number === 12) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.4">
        <path d="M116 168 h68" />
        <path d="M150 168 v36" />
        <path d="M150 214 l-36 78 h72 z" fill="#fffaf1" />
      </g>
    );
  }
  if (number === 13) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.2">
        <path d="M96 300 h108" />
        <path d="M150 300 v-40" />
        <circle cx="150" cy="214" r="28" fill={gold} stroke={ink} />
        {Array.from({ length: 10 }, (_, index) => (
          <line key={index} x1="150" y1="176" x2="150" y2="164" transform={`rotate(${index * 36} 150 214)`} />
        ))}
      </g>
    );
  }
  if (number === 14) {
    return (
      <g fill={ink}>
        <path d="M104 210 h28 c2 16 -6 26 -14 28 c-8 -2 -16 -12 -14 -28 z" />
        <path d="M168 248 h28 c2 16 -6 26 -14 28 c-8 -2 -16 -12 -14 -28 z" />
        <path d="M128 214 c28 20 28 48 8 62" fill="none" stroke={gold} strokeWidth="3" />
      </g>
    );
  }
  if (number === 15) {
    return (
      <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
        <path d="M116 230 a16 16 0 1 0 32 0 a16 16 0 1 0 32 0" />
        <path d="M108 268 h84" stroke={gold} strokeWidth="3" />
      </g>
    );
  }
  if (number === 16) {
    return (
      <g fill="#fffaf1" stroke={ink} strokeWidth="2.2">
        <path d="M122 168 h40 l10 36 h-18 v96 h-24 v-96 h-18 z" />
        <path d="M136 214 l28 20" stroke={gold} />
      </g>
    );
  }
  if (number === 17) {
    return (
      <g>
        <polygon points={starPoints(150, 210, 48, 22, 8)} fill={gold} stroke={ink} strokeWidth="1.4" />
        <path d="M110 320 q20 -16 40 0 t40 0" fill="none" stroke={ink} strokeWidth="2.4" />
        <path d="M118 338 q16 -12 32 0 t32 0" fill="none" stroke={ink} strokeWidth="2" />
      </g>
    );
  }
  if (number === 18) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.2">
        <path d="M168 176 a36 36 0 1 0 0 64 a28 28 0 1 1 0 -64 z" fill={gold} />
        <path d="M112 300 v-70 h12 v70" />
        <path d="M176 300 v-70 h12 v70" />
        <path d="M124 300 q26 -28 52 0" />
      </g>
    );
  }
  if (number === 19) {
    return (
      <g fill={gold} stroke={ink} strokeWidth="1.6">
        <circle cx="150" cy="236" r="32" />
        {Array.from({ length: 16 }, (_, index) => (
          <line key={index} x1="150" y1="188" x2="150" y2="168" stroke={ink} strokeWidth="2.4" transform={`rotate(${index * 22.5} 150 236)`} />
        ))}
      </g>
    );
  }
  if (number === 20) {
    return (
      <g fill="none" stroke={ink} strokeWidth="2.4">
        <path d="M150 150 v70" />
        <path d="M128 214 h44 l-22 36 z" fill={gold} />
        <path d="M118 300 h64" />
        <path d="M132 300 v28 M168 300 v28" />
      </g>
    );
  }
  return (
    <g fill="none" stroke={ink} strokeWidth="2">
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse key={index} cx="150" cy="196" rx="8" ry="22" transform={`rotate(${index * 30} 150 246)`} fill="#fffaf1" />
      ))}
      <rect x="132" y="220" width="36" height="36" transform="rotate(45 150 238)" fill={gold} stroke={ink} />
    </g>
  );
}

function Flourish({ x, y, turn }: { x: number; y: number; turn: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`} fill="none" stroke="#b8893e" strokeWidth="1.25" strokeLinecap="round">
      <path d="M2 28 C2 10 12 2 28 2" />
      <path d="M2 20 C8 10 12 7 20 2" />
      <path d="M8 28 C8 16 16 8 28 8" />
      <circle cx="3.4" cy="3.4" r="1.6" fill="#b8893e" stroke="none" />
    </g>
  );
}

export function TarotCardArt({
  face,
  arcana,
  suit,
  number,
}: {
  face: "back" | "face";
  arcana: "major" | "minor";
  suit: TarotSuit | null;
  number: number;
}) {
  const raw = useId().replace(/:/g, "");
  const velvet = `velvet-${raw}`;
  const paper = `paper-${raw}`;
  const foil = `foil-${raw}`;
  const lattice = `lattice-${raw}`;
  const label = indexLabel(arcana, number);
  const ink = suit ? SUIT_INK[suit] : "#3c2b1e";

  return (
    <svg viewBox="0 0 300 520" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id={velvet} cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#3a2142" />
          <stop offset="55%" stopColor="#1a1022" />
          <stop offset="100%" stopColor="#09070d" />
        </radialGradient>
        <radialGradient id={paper} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#fffaf1" />
          <stop offset="72%" stopColor="#f3e6cf" />
          <stop offset="100%" stopColor="#e4d0ae" />
        </radialGradient>
        <linearGradient id={foil} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8e7b8" />
          <stop offset="42%" stopColor="#d7b56a" />
          <stop offset="70%" stopColor="#8d6730" />
          <stop offset="100%" stopColor="#f3e2b0" />
        </linearGradient>
        <pattern id={lattice} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M13 1 L25 13 L13 25 L1 13 Z" fill="none" stroke="#e6c98a" strokeWidth="0.7" opacity="0.55" />
          <circle cx="13" cy="13" r="1.15" fill="#f0d48a" />
        </pattern>
      </defs>

      {face === "back" ? (
        <>
          <rect x="2" y="2" width="296" height="516" rx="22" fill={`url(#${velvet})`} />
          <rect x="14" y="14" width="272" height="492" rx="16" fill={`url(#${lattice})`} />
          <rect x="14" y="14" width="272" height="492" rx="16" fill="none" stroke={`url(#${foil})`} strokeWidth="3" />
          <rect x="26" y="26" width="248" height="468" rx="12" fill="none" stroke="#e6c98a" strokeWidth="1" opacity="0.8" />
          <Flourish x={32} y={32} turn={0} />
          <Flourish x={268} y={32} turn={90} />
          <Flourish x={268} y={488} turn={180} />
          <Flourish x={32} y={488} turn={270} />
          <circle cx="150" cy="250" r="92" fill="#120c18" stroke={`url(#${foil})`} strokeWidth="3" />
          <circle cx="150" cy="250" r="78" fill="none" stroke="#e6c98a" strokeWidth="1" />
          {Array.from({ length: 12 }, (_, index) => (
            <ellipse
              key={index}
              cx="150"
              cy="214"
              rx="11"
              ry="30"
              fill="none"
              stroke="#f0d48a"
              strokeWidth="1.3"
              transform={`rotate(${index * 30} 150 250)`}
            />
          ))}
          <polygon points={starPoints(150, 250, 36, 16, 8)} fill="#1a1022" stroke="#f0d48a" strokeWidth="1.6" />
          <circle cx="150" cy="250" r="8" fill={`url(#${foil})`} />
          {Array.from({ length: 24 }, (_, index) => {
            const angle = (index / 24) * Math.PI * 2;
            return <circle key={index} cx={150 + Math.cos(angle) * 104} cy={250 + Math.sin(angle) * 104} r="2.1" fill="#e6c98a" />;
          })}
        </>
      ) : (
        <>
          <rect x="2" y="2" width="296" height="516" rx="22" fill={`url(#${paper})`} />
          <rect x="12" y="12" width="276" height="496" rx="16" fill="none" stroke="#6e522c" strokeWidth="2.2" />
          <rect x="20" y="20" width="260" height="480" rx="12" fill="none" stroke={`url(#${foil})`} strokeWidth="1.5" />
          <Flourish x={30} y={30} turn={0} />
          <Flourish x={270} y={30} turn={90} />
          <Flourish x={270} y={490} turn={180} />
          <Flourish x={30} y={490} turn={270} />
          <text x="40" y="68" fill={ink} fontSize="20" fontFamily="Georgia, 'Times New Roman', serif">
            {label}
          </text>
          {suit ? (
            <g transform="translate(48 92) scale(0.34)">
              <SuitGlyph suit={suit} ink={ink} />
            </g>
          ) : null}
          {arcana === "major" ? (
            <g>
              <circle cx="150" cy="260" r="100" fill="#6e522c" opacity="0.04" />
              <circle cx="150" cy="260" r="100" fill="none" stroke="#b8893e" strokeWidth="1.5" />
              <circle cx="150" cy="260" r="90" fill="none" stroke="#e7d3ae" strokeWidth="1" />
              <g transform="translate(150 262) scale(1.08) translate(-150 -246)">
                <MajorEmblem number={number} />
              </g>
            </g>
          ) : null}
          {arcana === "minor" && suit && number === 1 ? <Ace suit={suit} /> : null}
          {arcana === "minor" && suit && number > 1 && number <= 10 ? <Pips suit={suit} number={number} /> : null}
          {arcana === "minor" && suit && number > 10 ? <Court suit={suit} /> : null}
          <path d="M96 448 H204" stroke="#b8893e" strokeWidth="1.15" />
          <rect x="146" y="444" width="8" height="8" transform="rotate(45 150 448)" fill="#b8893e" />
        </>
      )}
    </svg>
  );
}
