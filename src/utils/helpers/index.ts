// Returns an array of strings instead of JSX.Elements
export const renderAffirmations = (affirmations: string): string[] => {
  return affirmations
    .split("\n")
    .map((line) => line.replace(/^#{1,6}\s+/, "").replace(/^[-*]\s+/, "").replace(/\*\*/g, "").trim())
    .filter(Boolean);
};
