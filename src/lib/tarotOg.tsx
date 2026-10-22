import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

let font: Buffer | null = null;

function fontData() {
  if (!font) {
    font = readFileSync(path.join(process.cwd(), "src/fonts/Inter/static/Inter-Regular.ttf"));
  }
  return font;
}

export function tarotOgResponse(input: { kicker: string; title: string; dateLabel: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#100e0c",
          color: "#f4efe4",
          fontFamily: "Inter",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "3px solid #d7be8a",
            padding: "56px",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.12em", color: "#d7be8a" }}>
            {input.kicker}
          </div>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.15 }}>{input.title}</div>
          <div style={{ display: "flex", fontSize: 32 }}>{input.dateLabel}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData(), weight: 400, style: "normal" }],
    }
  );
}
