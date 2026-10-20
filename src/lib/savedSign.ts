import { isZodiacSlug, type ZodiacSlug } from "./zodiacSigns";

export const SAVED_SIGN_KEY = "horoscopzodii.sign";

export type SignStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function readSavedSign(storage: Pick<SignStorage, "getItem">): ZodiacSlug | null {
  try {
    const value = storage.getItem(SAVED_SIGN_KEY);
    return isZodiacSlug(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeSavedSign(storage: SignStorage, slug: ZodiacSlug) {
  storage.setItem(SAVED_SIGN_KEY, slug);
}

export function clearSavedSign(storage: SignStorage) {
  storage.removeItem(SAVED_SIGN_KEY);
}
