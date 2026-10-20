export type HoroscopeCopy = {
  sign: string;
  description: string;
  interval: "zilnic" | "azi" | "saptamanal" | "anual";
  variant: "standard" | "azi" | "chinese";
};

export function horoscopeHeading(data: Pick<HoroscopeCopy, "sign" | "interval" | "variant">) {
  if (data.variant === "chinese" && data.interval === "anual") {
    return `Horoscop chinezesc anual ${data.sign}`;
  }
  if (data.variant === "chinese") {
    return `Horoscop chinezesc zilnic ${data.sign}`;
  }
  if (data.interval === "azi") return `Horoscop azi ${data.sign}`;
  if (data.interval === "saptamanal") return `Horoscop săptămânal ${data.sign}`;
  return `Horoscop zilnic ${data.sign}`;
}

function excerpt(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim();
  return `${shortened}…`;
}

export function horoscopeDescription(data: HoroscopeCopy) {
  const lead = horoscopeHeading(data);
  const body = excerpt(data.description || "", 110);
  const text = body ? `${lead}. ${body}` : lead;
  return text.length > 160 ? excerpt(text, 155) : text;
}

export function isoDate(value?: string) {
  const match = value?.match(/\d{4}-\d{2}-\d{2}/);
  return match?.[0];
}
