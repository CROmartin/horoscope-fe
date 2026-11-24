"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { SocialDraft } from "@/lib/socialReviewClient";

const PHONE_WIDTH = 390;

function mediaSrc(id: string) {
  return `/api/social/v1/social/asset?id=${encodeURIComponent(id)}`;
}

export function PhonePreview({ draft }: { draft: SocialDraft }) {
  const assets = draft.assets || [];
  const video = assets.find((asset) => asset.kind === "video");
  const stills = assets
    .filter((asset) => asset.kind === "still" || asset.kind === "preview")
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));
  if (draft.format === "vertical_video" && (video || stills.length)) {
    return <ReelFrame caption={draft.caption} videoId={video?.id} stillId={stills[0]?.id} />;
  }
  if (stills.length) return <CarouselFrame caption={draft.caption} stills={stills.map((asset) => asset.id)} />;
  return null;
}

function ReelFrame({ caption, videoId, stillId }: { caption: string; videoId?: string; stillId?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setPaused(true));
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <figure style={frameStyle("9 / 16")}>
      {videoId ? (
        <video
          ref={videoRef}
          src={mediaSrc(videoId)}
          poster={stillId ? mediaSrc(stillId) : undefined}
          autoPlay
          muted={muted}
          loop
          playsInline
          onClick={togglePlay}
          style={fillStyle}
        />
      ) : (
        <img alt="" src={mediaSrc(stillId || "")} style={fillStyle} />
      )}
      <figcaption style={captionStyle}>
        <button type="button" onClick={() => setOpen((value) => !value)} style={captionButton}>
          <span style={{ display: "-webkit-box", WebkitLineClamp: open ? "unset" : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {caption}
          </span>
        </button>
      </figcaption>
      {videoId ? (
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = !video.muted;
            setMuted(video.muted);
          }}
          style={muteStyle}
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      ) : null}
      {paused ? <span style={playStyle}>Paused</span> : null}
    </figure>
  );
}

function CarouselFrame({ caption, stills }: { caption: string; stills: string[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function go(next: number) {
    const root = scroller.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(stills.length - 1, next));
    root.scrollTo({ left: clamped * root.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }

  return (
    <figure style={frameStyle("4 / 5")}>
      <div
        ref={scroller}
        onScroll={(event) => {
          const root = event.currentTarget;
          if (!root.clientWidth) return;
          setIndex(Math.round(root.scrollLeft / root.clientWidth));
        }}
        style={{ display: "flex", height: "100%", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {stills.map((id) => (
          <img key={id} alt="" src={mediaSrc(id)} style={{ ...fillStyle, flex: "0 0 100%", scrollSnapAlign: "start" }} />
        ))}
      </div>
      <button type="button" aria-label="Previous card" onClick={() => go(index - 1)} style={{ ...edgeStyle, left: 0 }} />
      <button type="button" aria-label="Next card" onClick={() => go(index + 1)} style={{ ...edgeStyle, right: 0 }} />
      <div style={dotsStyle}>
        {stills.map((id, card) => (
          <button
            key={id}
            type="button"
            aria-label={`Card ${card + 1}`}
            onClick={() => go(card)}
            style={{ width: card === index ? 16 : 6, height: 6, border: 0, borderRadius: 99, padding: 0, background: card === index ? "#fff" : "rgba(255,255,255,0.55)" }}
          />
        ))}
      </div>
      <figcaption style={captionStyle}>
        <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{caption}</span>
      </figcaption>
    </figure>
  );
}

function frameStyle(ratio: string): CSSProperties {
  return {
    position: "relative",
    width: "100%",
    maxWidth: PHONE_WIDTH,
    aspectRatio: ratio,
    margin: 0,
    overflow: "hidden",
    borderRadius: 28,
    background: "#000",
    boxShadow: "0 0 0 8px #1c1c1c, 0 18px 40px rgba(0,0,0,0.45)",
  };
}

const fillStyle: CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

const captionStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: "36px 14px 16px",
  color: "#fff",
  background: "linear-gradient(transparent, rgba(0,0,0,0.72))",
  fontFamily: "Georgia, serif",
  fontSize: 15,
  lineHeight: 1.35,
};

const captionButton: CSSProperties = {
  display: "block",
  width: "100%",
  padding: 0,
  border: 0,
  background: "transparent",
  color: "inherit",
  textAlign: "left",
  font: "inherit",
  cursor: "pointer",
};

const muteStyle: CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  border: 0,
  borderRadius: 99,
  padding: "6px 10px",
  background: "rgba(0,0,0,0.55)",
  color: "#fff",
  fontSize: 12,
};

const playStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  color: "#fff",
  fontSize: 18,
  pointerEvents: "none",
  textShadow: "0 1px 8px #000",
};

const dotsStyle: CSSProperties = {
  position: "absolute",
  top: 12,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  gap: 4,
};

const edgeStyle: CSSProperties = {
  position: "absolute",
  top: 28,
  bottom: 72,
  width: "22%",
  border: 0,
  background: "transparent",
  cursor: "pointer",
};
