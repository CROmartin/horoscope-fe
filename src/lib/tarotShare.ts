export function personalShareText(input: { title: string; headline: string; path: string; locale: "ro" | "en" }) {
  const url = `https://horoscopzodii.ro${input.path}?din=cartea-ta`;
  if (input.locale === "en") {
    return `My card today: ${input.title}. "${input.headline}" Draw yours → ${url}`;
  }
  return `Cartea mea de azi: ${input.title}. „${input.headline}" Trage-ți și tu cartea → ${url}`;
}

export function friendShareText(input: { locale: "ro" | "en" }) {
  const url = "https://horoscopzodii.ro/tarot/cartea-ta";
  if (input.locale === "en") return `Draw a card for yourself → ${url}`;
  return `Trage-ți și tu cartea → ${url}`;
}

type SharePaint = {
  title: string;
  quote: string;
  keywords: string;
  mark: string;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  const words = text.split(/\s+/);
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function paintShareCard(canvas: HTMLCanvasElement, input: SharePaint) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#0D0A1A";
  ctx.fillRect(0, 0, width, height);
  const margin = Math.round(width * 0.08);
  const cardHeight = Math.round(height * 0.78);
  ctx.fillStyle = "#F4ECDD";
  ctx.beginPath();
  ctx.roundRect(margin, margin, width - margin * 2, cardHeight, 36);
  ctx.fill();
  ctx.strokeStyle = "#D7BE8A";
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.fillStyle = "#3C2B1E";
  ctx.textAlign = "center";
  ctx.font = `${Math.round(width * 0.055)}px Georgia, serif`;
  const titleLines = wrap(ctx, input.title, width - margin * 4);
  let y = margin + Math.round(height * 0.16);
  for (const line of titleLines) {
    ctx.fillText(line, width / 2, y);
    y += Math.round(width * 0.07);
  }
  ctx.font = `${Math.round(width * 0.032)}px Georgia, serif`;
  const quoteLines = wrap(ctx, `„${input.quote}"`, width - margin * 4);
  y += Math.round(height * 0.04);
  for (const line of quoteLines.slice(0, 8)) {
    ctx.fillText(line, width / 2, y);
    y += Math.round(width * 0.048);
  }
  ctx.font = `${Math.round(width * 0.028)}px Inter, sans-serif`;
  ctx.fillStyle = "#6E522C";
  y += Math.round(height * 0.03);
  for (const line of wrap(ctx, input.keywords, width - margin * 4).slice(0, 2)) {
    ctx.fillText(line, width / 2, y);
    y += Math.round(width * 0.04);
  }
  ctx.fillStyle = "#D7BE8A";
  ctx.font = `${Math.round(width * 0.028)}px Inter, sans-serif`;
  ctx.fillText(input.mark, width / 2, height - margin);
}
