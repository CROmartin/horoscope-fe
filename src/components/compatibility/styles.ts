import styled, { css } from "styled-components";

export const ELEMENT_TINT: Record<string, string> = {
  Foc: "#FF8A65",
  Pământ: "#A8C686",
  Aer: "#C3B5FF",
  Apă: "#7CC6D6",
};

export const Sky = styled.div`
  width: 100%;
  position: relative;
  isolation: isolate;
  color: #f5efe6;
  background: radial-gradient(ellipse at top, #2a1748 0%, #0d0a1a 60%);
  font-family: Inter, system-ui, sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6;

  a {
    color: #d7be8a;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-repeat: repeat;
  }

  &::before {
    background-image: radial-gradient(1px 1px at 12% 18%, rgba(255, 255, 255, 0.75) 50%, transparent 50%),
      radial-gradient(1px 1px at 72% 36%, rgba(255, 255, 255, 0.5) 50%, transparent 50%),
      radial-gradient(1.5px 1.5px at 40% 78%, rgba(243, 227, 181, 0.85) 50%, transparent 50%);
    background-size: 180px 220px;
    animation: compat-drift 90s linear infinite;
  }

  &::after {
    opacity: 0.85;
    background-image: radial-gradient(1px 1px at 28% 62%, rgba(255, 255, 255, 0.45) 50%, transparent 50%),
      radial-gradient(1px 1px at 84% 12%, rgba(255, 255, 255, 0.65) 50%, transparent 50%);
    background-size: 240px 260px;
    animation: compat-drift 140s linear infinite reverse, compat-twinkle 4.5s ease-in-out infinite;
  }

  @keyframes compat-drift {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -180px 220px;
    }
  }

  @keyframes compat-twinkle {
    50% {
      opacity: 0.45;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

export const Stage = styled.div`
  position: relative;
  z-index: 1;
  width: min(760px, calc(100% - 32px));
  min-width: 0;
  margin: 32px auto 64px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;

  > * {
    min-width: 0;
    max-width: 100%;
  }
`;

export const Display = styled.h1`
  margin: 0;
  font-family: "DM Serif Display", Georgia, serif;
  font-weight: 400;
  font-size: clamp(36px, 8vw, 48px);
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: "DM Serif Display", Georgia, serif;
  font-weight: 400;
  font-size: clamp(26px, 5vw, 28px);
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-transform: none;
`;

export const Lead = styled.p`
  margin: 0;
  color: #f5efe6;
`;

export const Muted = styled.p`
  margin: 0;
  color: #b9b0c9;
  font-size: 15px;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(215, 190, 138, 0.28);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  padding: 16px;
`;

export const PrimaryButton = styled.button`
  min-height: 52px;
  padding: 0 28px;
  border: 0;
  border-radius: 999px;
  background: #d7be8a;
  color: #140f22;
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

export const GhostButton = styled.button`
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: transparent;
  color: #f5efe6;
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

export const chipStyle = css<{ $on?: boolean }>`
  min-height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: ${(props) => (props.$on ? "rgba(107, 63, 160, 0.55)" : "transparent")};
  color: #f5efe6;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

export const Chip = styled.button<{ $on?: boolean }>`
  ${chipStyle}
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const GoldLink = styled.a`
  color: #d7be8a;
`;
