import Aries from "@/Icons/Aries";
import Taurus from "@/Icons/Taurus";
import Gemini from "@/Icons/Gemini";
import Cancer from "@/Icons/Cancer";
import Leo from "@/Icons/Leo";
import Virgo from "@/Icons/Virgo";
import Libra from "@/Icons/Libra";
import Scorpio from "@/Icons/Scorpio";
import Sagittarius from "@/Icons/Sagittarius";
import Capricorn from "@/Icons/Capricorn";
import Aquarius from "@/Icons/Aquarius";
import Pisces from "@/Icons/Pisces";
import type { ZodiacSlug } from "@/lib/zodiacSigns";
import type { ComponentType } from "react";

export const SIGN_ICONS: Record<ZodiacSlug, ComponentType> = {
  berbec: Aries,
  taur: Taurus,
  gemeni: Gemini,
  rac: Cancer,
  leu: Leo,
  fecioara: Virgo,
  balanta: Libra,
  scorpion: Scorpio,
  sagetator: Sagittarius,
  capricorn: Capricorn,
  varsator: Aquarius,
  pesti: Pisces,
};
