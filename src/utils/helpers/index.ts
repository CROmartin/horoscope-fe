// Returns an array of strings instead of JSX.Elements
export const renderAffirmations = (affirmations: string): string[] => {
  return affirmations.split("\n");
};
