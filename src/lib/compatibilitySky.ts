import { EclipticGeoMoon, MakeTime, SiderealTime, e_tilt } from "astronomy-engine";
import { SKY_CITIES } from "./compatibilityCities";
import { WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

export function signFromLongitude(longitude: number): ZodiacSlug {
  const turns = ((longitude % 360) + 360) % 360;
  return WESTERN_SIGNS[Math.floor(turns / 30) % 12].slug;
}

function bucharestOffsetMinutes(date: Date) {
  const name =
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Bucharest",
      timeZoneName: "shortOffset",
      hour: "2-digit",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value || "";
  const match = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 120;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] || 0));
}

export function bucharestInstant(isoDate: string, time: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if (![year, month, day, hour, minute].every(Number.isFinite)) return null;
  let utc = Date.UTC(year, month - 1, day, hour, minute);
  for (let step = 0; step < 2; step += 1) {
    const offset = bucharestOffsetMinutes(new Date(utc));
    utc = Date.UTC(year, month - 1, day, hour, minute) - offset * 60 * 1000;
  }
  return new Date(utc);
}

function risingLongitude(gastHours: number, latitude: number, longitude: number, obliquityDeg: number) {
  const lst = (((gastHours + longitude / 15) % 24) + 24) % 24;
  const ramc = (lst * 15 * Math.PI) / 180;
  const eps = (obliquityDeg * Math.PI) / 180;
  const lat = (latitude * Math.PI) / 180;
  let lon = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps)));
  if (lon < 0) lon += Math.PI * 2;
  return (lon * 180) / Math.PI;
}

export function describeSky(input: { isoDate: string; time?: string; cityId: string }) {
  const city = SKY_CITIES.find((item) => item.id === input.cityId);
  if (!city || !/^\d{4}-\d{2}-\d{2}$/.test(input.isoDate)) return null;
  const clock = input.time && /^\d{2}:\d{2}$/.test(input.time) ? input.time : "12:00";
  const instant = bucharestInstant(input.isoDate, clock);
  if (!instant) return null;
  const time = MakeTime(instant);
  const moon = signFromLongitude(EclipticGeoMoon(time).lon);
  const rising = input.time
    ? signFromLongitude(risingLongitude(SiderealTime(time), city.lat, city.lon, e_tilt(time).tobl))
    : null;
  return { moon, rising };
}
