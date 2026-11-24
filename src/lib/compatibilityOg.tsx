import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

const SIZES = {
  og: { width: 1200, height: 630 },
  story: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;

export type CardFormat = keyof typeof SIZES;

let regular: Buffer | null = null;
let display: Buffer | null = null;

function fonts() {
  if (!regular) regular = readFileSync(path.join(process.cwd(), "src/fonts/Inter/static/Inter-Regular.ttf"));
  if (!display) display = readFileSync(path.join(process.cwd(), "src/fonts/DM_Serif_Display/DMSerifDisplay-Regular.ttf"));
  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Display", data: display, weight: 400 as const, style: "normal" as const },
  ];
}

export function compatibilityCard(input: {
  format: CardFormat;
  names: string;
  score: number;
  verdict: string;
  from: string;
  to: string;
}) {
  const size = SIZES[input.format];
  const titleSize = input.format === "og" ? 64 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(160deg, ${input.from}, #0D0A1A 42%, ${input.to})`,
          color: "#F5EFE6",
          fontFamily: "Inter",
          padding: input.format === "story" ? "96px" : "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "3px solid rgba(215,190,138,0.7)",
            borderRadius: 36,
            padding: input.format === "story" ? "72px" : "48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 2, color: "#D7BE8A" }}>horoscopzodii.ro</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", fontFamily: "Display", fontSize: titleSize, lineHeight: 1.1 }}>{input.names}</div>
            <div style={{ display: "flex", fontSize: input.format === "og" ? 92 : 120, color: "#D7BE8A" }}>{input.score}%</div>
            <div style={{ display: "flex", fontFamily: "Display", fontSize: input.format === "og" ? 36 : 42, lineHeight: 1.3 }}>
              {input.verdict}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#B9B0C9" }}>horoscopzodii.ro</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts() }
  );
}
