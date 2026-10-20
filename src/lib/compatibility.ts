import { isZodiacSlug, WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

const ORDER = WESTERN_SIGNS.map((sign) => sign.slug);

export function canonicalPairSlug(a: string, b: string): string | null {
  if (!isZodiacSlug(a) || !isZodiacSlug(b)) return null;
  const left = ORDER.indexOf(a) <= ORDER.indexOf(b) ? a : b;
  const right = left === a ? b : a;
  return `${left}-${right}`;
}

export function allCanonicalPairs(): string[] {
  const pairs: string[] = [];
  for (let i = 0; i < ORDER.length; i += 1) {
    for (let j = i; j < ORDER.length; j += 1) {
      pairs.push(`${ORDER[i]}-${ORDER[j]}`);
    }
  }
  return pairs;
}

export function parsePairParam(param: string): {
  first: ZodiacSlug;
  second: ZodiacSlug;
  canonical: string;
} | null {
  const splitAt = param.indexOf("-");
  if (splitAt <= 0) return null;
  const a = param.slice(0, splitAt);
  const b = param.slice(splitAt + 1);
  const canonical = canonicalPairSlug(a, b);
  if (!canonical || !isZodiacSlug(a) || !isZodiacSlug(b)) return null;
  const divider = canonical.indexOf("-");
  const first = canonical.slice(0, divider);
  const second = canonical.slice(divider + 1);
  if (!isZodiacSlug(first) || !isZodiacSlug(second)) return null;
  return { first, second, canonical };
}

export function pairFromPath(pathname: string): { first: ZodiacSlug; second: ZodiacSlug } | null {
  const prefix = "/compatibilitate/";
  if (!pathname.startsWith(prefix)) return null;
  const parsed = parsePairParam(pathname.slice(prefix.length));
  if (!parsed || `${prefix}${parsed.canonical}` !== pathname) return null;
  return { first: parsed.first, second: parsed.second };
}
