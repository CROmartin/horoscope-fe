const TIME_ZONE = "Europe/Bucharest";

export function bucharestISODate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function bucharestDayOfYear(date = new Date()) {
  const [year, month, day] = bucharestISODate(date).split("-").map(Number);
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);
  return Math.floor((current - start) / 86400000);
}

export function nextBucharestMidnight(now = new Date()) {
  const today = bucharestISODate(now);
  let lo = now.getTime();
  let hi = now.getTime() + 26 * 60 * 60 * 1000;
  while (hi - lo > 500) {
    const mid = Math.floor((lo + hi) / 2);
    if (bucharestISODate(new Date(mid)) === today) lo = mid;
    else hi = mid;
  }
  return hi;
}

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

export function isBucharestSunday(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "short" }).format(date) === "Sun";
}

export function formatBucharestDate(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("ro-RO", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toLocaleUpperCase("ro-RO") + formatted.slice(1);
}
