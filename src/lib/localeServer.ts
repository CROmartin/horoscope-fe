import { cookies } from "next/headers";
import { LOCALE_COOKIE, parseLocale, type Locale } from "./locale";

export async function currentLocale(): Promise<Locale> {
  const store = await cookies();
  return parseLocale(store.get(LOCALE_COOKIE)?.value);
}
