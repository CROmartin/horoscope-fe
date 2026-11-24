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
