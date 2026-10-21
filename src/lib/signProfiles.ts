import { WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

export type SignProfile = {
  slug: ZodiacSlug;
  element: string;
  ruler: string;
  dates: string;
  strengths: string;
  weaknesses: string;
  likes: string;
  dislikes: string;
  likeOf: string;
  summary: string;
};

export const SIGN_PROFILES: SignProfile[] = [
  {
    slug: "berbec",
    element: "Foc",
    ruler: "Marte",
    dates: "21 Martie - 19 Aprilie",
    strengths: "Curajos, hotărât, încrezător, entuziast, optimist, sincer, pasionat",
    weaknesses: "Nerăbdător, schimbător de dispoziție, irascibil, impulsiv, agresiv",
    likes: "Haine confortabile, să preia roluri de conducere, provocări fizice, sporturi individuale",
    dislikes: "Inactivitate, întârzieri, munci care nu îi folosesc talentele",
    likeOf: "Berbecului",
    summary:
      "Berbecul deschide zodiacul. Este un semn de foc condus de Marte, cunoscut pentru curaj și inițiativă, iar nerăbdarea apare când lucrurile se mișcă încet.",
  },
  {
    slug: "taur",
    element: "Pământ",
    ruler: "Venus",
    dates: "20 Aprilie - 20 Mai",
    strengths: "De încredere, răbdător, practic, devotat, responsabil, stabil",
    weaknesses: "Încăpățânat, posesiv, inflexibil",
    likes: "Grădinărit, gătit, muzică, romantism, haine de calitate înaltă, să lucreze cu mâinile",
    dislikes: "Schimbări bruste, complicații, insecuritate de orice fel, țesături sintetice",
    likeOf: "Taurului",
    summary:
      "Taurul este un semn de pământ condus de Venus. Caută stabilitate și lucruri bine făcute, iar schimbările bruște îl scot din ritm.",
  },
  {
    slug: "gemeni",
    element: "Aer",
    ruler: "Mercur",
    dates: "21 Mai - 20 Iunie",
    strengths: "Blând, afectuos, curios, adaptabil, capacitatea de a învăța rapid și de a schimba idei",
    weaknesses: "Nervos, inconstant, indecis",
    likes: "Muzică, cărți, reviste, discuții cu aproape oricine, excursii scurte prin oraș",
    dislikes: "Să fie singuri, să fie confinați, repetiția și rutina",
    likeOf: "Gemenilor",
    summary:
      "Gemenii sunt un semn de aer condus de Mercur. Învață repede și le place conversația, iar rutina lungă îi obosește.",
  },
  {
    slug: "rac",
    element: "Apă",
    ruler: "Lună",
    dates: "21 Iunie - 22 Iulie",
    strengths: "Tenace, foarte imaginativ, loial, emoțional, simpatic, convingător",
    weaknesses: "Schimbător de dispoziție, pesimist, suspicios, manipulativ, nesigur",
    likes: "Arta, hobby-uri bazate pe casă, să se relaxeze lângă sau în apă, să ajute persoanele dragi, o masă bună cu prietenii",
    dislikes: "Străini, orice critică la adresa mamei, dezvăluirea vieții personale",
    likeOf: "Racului",
    summary:
      "Racul este un semn de apă condus de Lună. Ține la casa lui și la oamenii apropiați, iar critica la adresa familiei îl atinge tare.",
  },
  {
    slug: "leu",
    element: "Foc",
    ruler: "Soare",
    dates: "23 Iulie - 22 August",
    strengths: "Creativ, pasionat, generos, cu inimă caldă, vesel, umoristic",
    weaknesses: "Arogant, încăpățânat, egocentric, leneș, inflexibil",
    likes: "Teatru, a lua vacanțe, a fi admirat, lucruri scumpe, culori vii, distracție cu prietenii",
    dislikes: "A fi ignorat, a se confrunta cu realități dificile, a nu fi tratat ca un rege sau o regină",
    likeOf: "Leului",
    summary:
      "Leul este un semn de foc condus de Soare. Este generos și creativ, îi place să fie văzut, iar indiferența îl rănește.",
  },
  {
    slug: "fecioara",
    element: "Pământ",
    ruler: "Mercur",
    dates: "23 August – 22 Septembrie",
    strengths: "Loial, analitic, amabil, harnic, practic",
    weaknesses: "Timid, îngrijorat, prea critic față de sine și de ceilalți, numai muncă și fără distracție",
    likes: "Animale, mâncare sănătoasă, cărți, natură, curățenie",
    dislikes: "Nepolitețe, a cere ajutor, a fi în centrul atenției",
    likeOf: "Fecioarei",
    summary:
      "Fecioara este un semn de pământ condus de Mercur. Observă detaliile și lucrează metodic, iar grija excesivă o poate face prea critică.",
  },
  {
    slug: "balanta",
    element: "Aer",
    ruler: "Venus",
    dates: "23 Septembrie - 22 Octombrie",
    strengths: "Cooperant, diplomatic, grațios, echitabil, sociabil",
    weaknesses: "Indecis, evită confruntările, păstrează ranchiunea, autocompătimire",
    likes: "Armonia, blândețea, a împărți cu alții, aerul liber",
    dislikes: "Violența, injustiția, persoanele gălăgioase, conformismul",
    likeOf: "Balanței",
    summary:
      "Balanța este un semn de aer condus de Venus. Caută echilibrul în relații și evită conflictul deschis, iar deciziile îi iau timp.",
  },
  {
    slug: "scorpion",
    element: "Apă",
    ruler: "Pluto, Marte",
    dates: "23 Octombrie - 21 Noiembrie",
    strengths: "Ingenios, puternic, curajos, pasionat, un adevărat prieten",
    weaknesses: "Neîncredere, gelozie, manipulativ, violent",
    likes: "Adevărul, faptele, a avea dreptate, talentele, a glumi, pasiunea",
    dislikes: "Necinstea, divulgarea secretelor, superficialitatea, discuții banale",
    likeOf: "Scorpionului",
    summary:
      "Scorpionul este un semn de apă condus de Pluto și Marte. Merge în profunzime și ține la încredere, iar superficialitatea sau secretul trădat îl îndepărtează.",
  },
  {
    slug: "sagetator",
    element: "Foc",
    ruler: "Jupiter",
    dates: "22 Noiembrie - 21 Decembrie",
    strengths: "Generos, idealist, cu un simț al umorului excelent",
    weaknesses: "Promite mai mult decât poate oferi, foarte nerăbdător, va spune orice indiferent cât de nediplomatic este",
    likes: "Libertatea, călătoriile, filozofia, a fi în aer liber",
    dislikes: "Persoanele lipicioase, a fi constrâns, teorii nefondate, detaliile",
    likeOf: "Săgetătorului",
    summary:
      "Săgetătorul este un semn de foc condus de Jupiter. Îl atrag drumul, ideile mari și libertatea, iar constrângerea îl irită.",
  },
  {
    slug: "capricorn",
    element: "Pământ",
    ruler: "Saturn",
    dates: "22 Decembrie - 19 Ianuarie",
    strengths: "Responsabil, disciplinat, autocontrol, buni manageri",
    weaknesses: "Pretind că știu tot, neiertători, condescendenți, așteaptă cel mai rău",
    likes: "Familia, tradiția, muzica, statutul subestimat, meșteșugul de calitate",
    dislikes: "Aproape orice, la un moment dat",
    likeOf: "Capricornului",
    summary:
      "Capricornul este un semn de pământ condus de Saturn. Construiește pe termen lung, cu disciplină, și ține la tradiție și la rezultatul concret.",
  },
  {
    slug: "varsator",
    element: "Aer",
    ruler: "Uranus, Saturn",
    dates: "20 Ianuarie - 18 Februarie",
    strengths: "Progresist, original, independent, umanitar",
    weaknesses: "Fuge de exprimarea emoțională, temperamental, fără compromisuri, distant",
    likes: "Distracție cu prietenii, afaceri riscante, luptă pentru cauze, conversații intelectuale",
    dislikes: "Limitări, promisiuni nerespectate, a fi singur, situații plictisitoare sau monotone",
    likeOf: "Vărsătorului",
    summary:
      "Vărsătorul este un semn de aer condus de Uranus și Saturn. Gândește independent și se atașează de prieteni și de cauze, iar limitele rigide îl îndepărtează.",
  },
  {
    slug: "pesti",
    element: "Apă",
    ruler: "Neptun, Jupiter",
    dates: "19 Februarie - 20 Martie",
    strengths: "Compasiv, artistic, intuitiv, blând, înțelept, muzical",
    weaknesses: "Fricos, prea încrezător, trist, dorința de a evada realitatea, poate fi o victimă sau un martir",
    likes: "A fi singur, dragostea, dormitul, muzica, romantismul, înotul, temele spirituale",
    dislikes: "Oameni care se cred deștepți, a fi criticat, trecutul care revine să bântuie, cruzimea de orice fel",
    likeOf: "Peștilor",
    summary:
      "Peștii închid zodiacul. Sunt un semn de apă condus de Neptun și Jupiter, cu imaginație și compasiune, și caută liniște când lumea devine prea dură.",
  },
];

const BY_SLUG = new Map(SIGN_PROFILES.map((profile) => [profile.slug, profile]));

export function signProfile(slug: string): SignProfile | undefined {
  return BY_SLUG.get(slug as ZodiacSlug);
}

export function signProfileSlugs(): ZodiacSlug[] {
  return WESTERN_SIGNS.map((sign) => sign.slug);
}
