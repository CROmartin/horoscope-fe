export async function translateFields<T extends Record<string, string>>(
  fields: T,
  engine: (text: string) => Promise<string>
): Promise<T> {
  const entries = await Promise.all(
    Object.entries(fields).map(async ([key, value]) => {
      const text = value ?? "";
      if (!text.trim()) return [key, text] as const;
      return [key, await engine(text)] as const;
    })
  );
  return Object.fromEntries(entries) as T;
}
