const TIME_ZONE = "Europe/Bucharest";

export function bucharestISODate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
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
