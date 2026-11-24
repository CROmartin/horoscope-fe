"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
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
  if (!video && stills.length === 0) return null;
  const reel = draft.format === "vertical_video";
  return (
    <div style={{ width: PHONE_WIDTH, maxWidth: "100%", minWidth: 0, margin: "8px 0 36px" }}>
      <Phone>
        {reel ? (
          <VerticalApp
            platform={draft.platform === "tiktok" ? "tiktok" : "instagram"}
            caption={draft.caption}
            videoId={video?.id}
            stillId={stills[0]?.id}
          />
        ) : (
          <InstagramPost caption={draft.caption} stills={stills.map((asset) => asset.id)} />
        )}
      </Phone>
    </div>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div style={{
      boxSizing: "border-box",
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      overflow: "hidden",
      padding: "12px 10px 14px",
      borderRadius: 46,
      background: "#0a0a0a",
      boxShadow: "0 0 0 2px #2a2a2a, 0 24px 48px rgba(0,0,0,0.55)",
    }}>
      <StatusBar />
      <div style={{ width: "100%", minWidth: 0, overflow: "hidden", borderRadius: 8, background: "#000" }}>{children}</div>
      <div style={{ width: 124, height: 5, margin: "12px auto 0", borderRadius: 99, background: "#f2f2f2" }} />
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 28, padding: "0 16px 6px", color: "#fff", fontFamily: "Helvetica, Arial, sans-serif", fontSize: 14, fontWeight: 600 }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <Signal />
        <Battery />
      </span>
    </div>
  );
}

function InstagramPost({ caption, stills }: { caption: string; stills: string[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const drag = useRef<{ x: number } | null>(null);

  function go(next: number) {
    setIndex(Math.max(0, Math.min(stills.length - 1, next)));
  }

  function finishDrag(clientX: number) {
    if (!drag.current) return;
    const delta = clientX - drag.current.x;
    drag.current = null;
    setShift(0);
    if (delta <= -48) go(index + 1);
    else if (delta >= 48) go(index - 1);
  }

  return (
    <div style={{ width: "100%", maxWidth: "100%", minWidth: 0, overflow: "hidden", background: "#000", color: "#fff", fontFamily: "Helvetica, Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px 10px" }}>
        <Avatar />
        <strong style={{ fontSize: 14 }}>horoscopzodii</strong>
      </div>
      <Stage width={4} height={5}>
        <div
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", touchAction: "none", cursor: "grab" }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            drag.current = { x: event.clientX };
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              /* The pointer still ends on this surface. */
            }
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            setShift(event.clientX - drag.current.x);
          }}
          onPointerUp={(event) => finishDrag(event.clientX)}
          onPointerCancel={() => {
            drag.current = null;
            setShift(0);
          }}
        >
          <img alt="" src={mediaSrc(stills[index] || "")} style={{ ...fittedMedia, transform: `translateX(${shift}px)`, pointerEvents: "none" }} />
          {stills.length > 1 ? (
            <span style={carouselCount}>{index + 1}/{stills.length}</span>
          ) : null}
        </div>
      </Stage>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px 4px" }}>
        <Heart />
        <Comment />
        <Share />
        <span style={{ marginLeft: "auto" }}><Bookmark /></span>
      </div>
      <p style={{ margin: 0, padding: "4px 12px 14px", fontSize: 14, lineHeight: 1.35 }}>
        <strong>horoscopzodii </strong>
        <button type="button" onClick={() => setOpen((value) => !value)} style={textButton}>
          <span style={clamp(open ? 0 : 2)}>{caption}</span>
        </button>
      </p>
    </div>
  );
}

function VerticalApp({
  platform,
  caption,
  videoId,
  stillId,
}: {
  platform: "instagram" | "tiktok";
  caption: string;
  videoId?: string;
  stillId?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);
  const tiktok = platform === "tiktok";

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
    <Stage width={9} height={16}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", color: "#fff", fontFamily: "Helvetica, Arial, sans-serif" }}>
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
          style={fittedMedia}
        />
      ) : (
        <img alt="" src={mediaSrc(stillId || "")} style={fittedMedia} />
      )}
      <div style={{ position: "absolute", top: 10, left: 14, fontSize: 16, fontWeight: 700 }}>{tiktok ? "Following" : "Reels"}</div>
      <div style={{ position: "absolute", right: 10, bottom: 86, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {tiktok ? <Avatar /> : null}
        <Heart />
        <Comment />
        {tiktok ? <Bookmark /> : null}
        <Share />
        {videoId ? (
          <button
            type="button"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.muted = !video.muted;
              setMuted(video.muted);
            }}
            style={{ border: 0, background: "transparent", color: "#fff", fontSize: 11, padding: 0 }}
          >
            {muted ? "Sound" : "Mute"}
          </button>
        ) : null}
      </div>
      <div style={{ position: "absolute", left: 12, right: 64, bottom: 16 }}>
        <strong style={{ display: "block", marginBottom: 4 }}>{tiktok ? "@horoscopzodii" : "horoscopzodii"}</strong>
        <button type="button" onClick={() => setOpen((value) => !value)} style={textButton}>
          <span style={clamp(open ? 0 : 2)}>{caption}</span>
        </button>
      </div>
      {paused ? <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none", fontSize: 42 }}>▶</span> : null}
      </div>
    </Stage>
  );
}

function Avatar() {
  return <span style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)", display: "inline-block", flex: "0 0 auto" }} />;
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return <span role="img" aria-label={label} style={{ display: "inline-flex", color: "#fff" }}>{children}</span>;
}

function Heart() {
  return <IconButton label="Like"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" /></svg></IconButton>;
}
function Comment() {
  return <IconButton label="Comment"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17.5 3 21l4.2-1.2A9 9 0 1 0 5 17.5z" /></svg></IconButton>;
}
function Share() {
  return <IconButton label="Share"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4 10 13M21 4l-7 17-4-7-7-4 18-6z" /></svg></IconButton>;
}
function Bookmark() {
  return <IconButton label="Save"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 3h10a1 1 0 0 1 1 1v17l-6-3-6 3V4a1 1 0 0 1 1-1z" /></svg></IconButton>;
}
function Signal() {
  return <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff"><rect x="0" y="8" width="3" height="4" /><rect x="4.5" y="5" width="3" height="7" /><rect x="9" y="2" width="3" height="10" /><rect x="13.5" y="0" width="2.5" height="12" /></svg>;
}
function Battery() {
  return <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="#fff" fill="none" /><rect x="2" y="2" width="16" height="8" rx="1" fill="#fff" /><rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="#fff" /></svg>;
}

function Stage({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", minWidth: 0, overflow: "hidden", background: "#000" }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ display: "block", width: "100%", height: "auto" }} aria-hidden="true" />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
}

const fittedMedia: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const carouselCount: CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 1,
  padding: "4px 9px",
  borderRadius: 12,
  background: "rgba(0,0,0,0.65)",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.2,
  pointerEvents: "none",
};

const textButton: CSSProperties = { display: "inline", padding: 0, border: 0, background: "transparent", color: "inherit", font: "inherit", textAlign: "left", cursor: "pointer" };

function clamp(lines: number): CSSProperties {
  if (!lines) return {};
  return { display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", overflow: "hidden" };
}
