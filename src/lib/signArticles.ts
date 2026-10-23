import { hubCopy } from "./hubCopy";
import { signProfile } from "./signProfiles";
import { WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

export type SignArticle = {
  intro: string;
  whenH2: string;
  whenP: string;
  howH2: string;
  howP: string;
  traitsH2: string;
  traitsP: string;
  loveH2: string;
  loveP: string;
  loveLink: string;
  workH2: string;
  workP: string;
  readH2: string;
  readP: string;
  readOr: string;
  readDaily: string;
  readWeekly: string;
};

function article(
  slug: ZodiacSlug,
  body: Omit<SignArticle, "whenP" | "loveLink" | "readP" | "readOr" | "readDaily" | "readWeekly"> & {
    whenLead: string;
  }
): SignArticle {
  const sign = WESTERN_SIGNS.find((item) => item.slug === slug);
  const name = sign?.name || slug;
  return {
    intro: body.intro,
    whenH2: body.whenH2,
    whenP: body.whenLead,
    howH2: body.howH2,
    howP: body.howP,
    traitsH2: body.traitsH2,
    traitsP: body.traitsP,
    loveH2: body.loveH2,
    loveP: body.loveP,
    loveLink: "instrumentul de compatibilitate",
    workH2: body.workH2,
    workP: body.workP,
    readH2: body.readH2,
    readP: "Citește",
    readOr: "sau",
    readDaily: `horoscopul zilnic pentru ${name}`,
    readWeekly: `horoscopul săptămânal pentru ${name}`,
  };
}

const ARTICLES: Record<Exclude<ZodiacSlug, "berbec">, SignArticle> = {
  taur: article("taur", {
    intro:
      "Taurul este un semn de pământ, iar planeta asociată în tradiția astrologică este Venus. Descrierile pun accent pe răbdare, pe lucruri făcute temeinic și pe un ritm care nu se schimbă dintr-o dată.",
    whenH2: "Când este zodia Taur?",
    whenLead:
      "Perioada asociată de obicei Taurului este 20 aprilie – 20 mai. Ziua de 20 aprilie stă lângă Berbec, iar 20 mai stă lângă Gemeni. În unii ani Soarele schimbă semnul cu o zi mai devreme sau mai târziu.",
    howH2: "Cum este descris Taurul în astrologie?",
    howP:
      "În interpretările tradiționale, Taurul este văzut ca un semn practic și statornic. Preferă să ducă un lucru până la capăt decât să schimbe direcția înainte să vadă rezultatul. Acestea sunt descrieri simbolice, nu o obligație pentru fiecare persoană născută în Taur.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Încrederea, răbdarea și devotamentul sunt calități atribuite frecvent Taurului. Aceeași stabilitate poate fi citită și ca încăpățânare sau posesivitate, mai ales când o schimbare vine fără timp de adaptare.",
    loveH2: "Taurul în relații",
    loveP:
      "În descrierile astrologice, Taurul ține la gesturi concrete și la un ritm liniștit. O relație reală depinde de mai mult decât de zodie. Dacă vrei perspectiva simbolică dintre două semne, încearcă",
    workH2: "Taurul în activități și proiecte",
    workP:
      "Simbolismul Taurului leagă efortul de ceva care se vede: o grădină, o masă, un obiect făcut cu mâna. Un ritm constant duce lucrul mai departe, iar refuzul oricărei schimbări îl poate încetini.",
    readH2: "Horoscop pentru Taur",
  }),
  gemeni: article("gemeni", {
    intro:
      "Gemenii sunt un semn de aer, iar planeta asociată în tradiția astrologică este Mercur. Textele îi leagă de curiozitate, de schimbul de idei și de o atenție care se mută repede de la un subiect la altul.",
    whenH2: "Când este zodia Gemeni?",
    whenLead:
      "Perioada asociată de obicei Gemenilor este 21 mai – 20 iunie. Intervalul începe după Taur și se încheie înainte de Rac. Pentru o naștere pe 21 mai sau pe 20 iunie, ora contează, fiindcă Soarele nu intră în semn la miezul nopții.",
    howH2: "Cum sunt descriși Gemenii în astrologie?",
    howP:
      "În interpretările tradiționale, Gemenii sunt văzuți ca un semn curios și adaptabil. O conversație nouă îi atrage mai mult decât o rutină repetată fără variație. Descrierea este simbolică și nu spune că fiecare persoană născută în Gemeni învață sau vorbește la fel.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Curiozitatea și ușurința de a schimba idei sunt calități atribuite frecvent Gemenilor. Aceeași mobilitate poate fi citită și ca nehotărâre, atunci când prea multe variante rămân deschise în același timp.",
    loveH2: "Gemenii în relații",
    loveP:
      "În descrierile astrologice, Gemenii țin la dialog și la noutate împărtășită. Compatibilitatea dintre doi oameni nu se reduce la semnul zodiacal. Pentru o comparație simbolică, încearcă",
    workH2: "Gemenii în activități și proiecte",
    workP:
      "Simbolismul Gemenilor pune accent pe informație, pe legături și pe schimbarea de context. O idee nouă poate deschide proiectul, iar alta poate sări peste unul care avea nevoie de continuitate.",
    readH2: "Horoscop pentru Gemeni",
  }),
  rac: article("rac", {
    intro:
      "Racul este un semn de apă, condus în tradiția astrologică de Lună. Descrierile vorbesc despre casă, despre oamenii apropiați și despre o memorie afectivă care ține minte gesturile mici.",
    whenH2: "Când este zodia Rac?",
    whenLead:
      "Perioada asociată de obicei Racului este 21 iunie – 22 iulie. Semnul urmează Gemenilor și lasă loc Leului spre sfârșitul lui iulie. O naștere pe 21 iunie sau pe 22 iulie se verifică după oră, nu doar după dată.",
    howH2: "Cum este descris Racul în astrologie?",
    howP:
      "În interpretările tradiționale, Racul este văzut ca un semn loial și atent la atmosfera din jur. Protejează ce consideră al lui și se retrage când se simte expus. Nu este o regulă pentru fiecare persoană născută în Rac.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Loialitatea și imaginația sunt calități atribuite frecvent Racului. Aceeași sensibilitate poate fi citită și ca neîncredere, mai ales când o critică atinge familia sau viața privată.",
    loveH2: "Racul în relații",
    loveP:
      "În descrierile astrologice, Racul caută siguranță și gesturi care arată că celălalt rămâne aproape. O relație reală nu se decide după zodie. Dacă vrei comparația simbolică, încearcă",
    workH2: "Racul în activități și proiecte",
    workP:
      "Simbolismul Racului leagă munca de grijă: un spațiu îngrijit, o masă cu oamenii apropiați, un proiect care protejează pe cineva. Grija ține un astfel de proiect în viață și, dusă prea departe, poate amâna un început nou.",
    readH2: "Horoscop pentru Rac",
  }),
  leu: article("leu", {
    intro:
      "Leul este un semn de foc, iar astrul asociat în tradiția astrologică este Soarele. Textele îi leagă de generozitate, de expresie creativă și de nevoia de a fi recunoscut pentru ce aduce într-un grup.",
    whenH2: "Când este zodia Leu?",
    whenLead:
      "Perioada asociată de obicei Leului este 23 iulie – 22 august. Înaintea lui stă Racul, iar după 22 august începe Fecioara. La cele două capete, ora nașterii poate muta ziua în semnul vecin.",
    howH2: "Cum este descris Leul în astrologie?",
    howP:
      "În interpretările tradiționale, Leul este văzut ca un semn cald și expresiv. Îi place să contribuie vizibil și să împartă entuziasmul. Indiferența îl atinge, fiindcă descrierile tradiționale leagă semnul de nevoia de a fi văzut. Descrierea rămâne simbolică.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Creativitatea, generozitatea și umorul sunt calități atribuite frecvent Leului. Aceeași dorință de a fi văzut poate fi citită și ca încăpățânare, atunci când atenția celorlalți devine condiția oricărui pas.",
    loveH2: "Leul în relații",
    loveP:
      "În descrierile astrologice, Leul apreciază admirația sinceră și timpul petrecut la vedere, împreună. Compatibilitatea reală nu se măsoară doar prin zodie. Pentru o comparație simbolică, încearcă",
    workH2: "Leul în activități și proiecte",
    workP:
      "Simbolismul Leului pune accent pe creație, pe prezență și pe un rezultat care poate fi arătat. Recunoașterea poate alimenta lucrul, iar așteptarea ei îl poate lăsa neînceput.",
    readH2: "Horoscop pentru Leu",
  }),
  fecioara: article("fecioara", {
    intro:
      "Fecioara este un semn de pământ, iar planeta asociată în tradiția astrologică este Mercur. Descrierile vorbesc despre observație, despre ordine și despre un mod de lucru care verifică detaliul înainte să declare un lucru gata.",
    whenH2: "Când este zodia Fecioară?",
    whenLead:
      "Perioada asociată de obicei Fecioarei este 23 august – 22 septembrie. Semnul preia locul de la Leu și îl predă Balanței în a doua jumătate a lui septembrie. Pentru o naștere pe 23 august sau pe 22 septembrie, ora contează, fiindcă Soarele nu intră în semn la aceeași oră în fiecare an.",
    howH2: "Cum este descrisă Fecioara în astrologie?",
    howP:
      "În interpretările tradiționale, Fecioara este văzută ca un semn analitic și harnic. Preferă un plan clar unei impresii generale. Acestea sunt simboluri, nu o dovadă că fiecare persoană născută în Fecioară lucrează la fel.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Loialitatea, analiza și simțul practic sunt calități atribuite frecvent Fecioarei. Aceeași atenție la detaliu poate deveni critică excesivă, față de sine sau față de ceilalți, când nimic nu pare suficient de bine făcut.",
    loveH2: "Fecioara în relații",
    loveP:
      "În descrierile astrologice, Fecioara arată grija prin fapte concrete și prin atenție la ce are nevoie celălalt. O relație nu se rezumă la zodie. Dacă vrei comparația simbolică, încearcă",
    workH2: "Fecioara în activități și proiecte",
    workP:
      "Simbolismul Fecioarei leagă progresul de ordine: o listă, o corectură, un spațiu pus la punct. Verificarea face proiectul mai bun până în clipa în care amână finalul.",
    readH2: "Horoscop pentru Fecioară",
  }),
  balanta: article("balanta", {
    intro:
      "Balanța este un semn de aer, iar planeta asociată în tradiția astrologică este Venus. Textele o leagă de echilibru, de dialog și de o grijă pentru felul în care o decizie îi afectează pe cei din jur.",
    whenH2: "Când este zodia Balanță?",
    whenLead:
      "Perioada asociată de obicei Balanței este 23 septembrie – 22 octombrie. Fecioara o precede, iar Scorpionul îi urmează. Datele de 23 septembrie și 22 octombrie sunt limite obișnuite, nu un comutator care cade mereu la miezul nopții.",
    howH2: "Cum este descrisă Balanța în astrologie?",
    howP:
      "În interpretările tradiționale, Balanța este văzută ca un semn diplomatic și sociabil. Caută o formulă în care ambele părți rămân în joc și evită conflictul deschis. Nu înseamnă că fiecare persoană născută în Balanță decide la fel de greu.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Cooperarea și simțul echității sunt calități atribuite frecvent Balanței. Aceeași dorință de armonie poate fi citită și ca amânare, atunci când o alegere clară pare să strice atmosfera.",
    loveH2: "Balanța în relații",
    loveP:
      "În descrierile astrologice, Balanța ține la reciprocitate și la un ton blând. Compatibilitatea dintre doi oameni nu se stabilește din zodie. Pentru o comparație simbolică, încearcă",
    workH2: "Balanța în activități și proiecte",
    workP:
      "Simbolismul Balanței pune accent pe colaborare și pe un rezultat care ține seama de mai multe puncte de vedere. O părere în plus poate limpezi decizia, iar încă una o poate ține pe loc.",
    readH2: "Horoscop pentru Balanță",
  }),
  scorpion: article("scorpion", {
    intro:
      "Scorpionul este un semn de apă. În tradiția astrologică este asociat cu Pluto și cu Marte. Descrierile vorbesc despre intensitate, despre încredere și despre o preferință pentru adevărul spus până la capăt, nu pentru conversația de suprafață.",
    whenH2: "Când este zodia Scorpion?",
    whenLead:
      "Perioada asociată de obicei Scorpionului este 23 octombrie – 21 noiembrie. Balanța ține zilele de dinainte, iar Săgetătorul începe după 21 noiembrie. Când Soarele grăbește sau întârzie trecerea, o naștere de pe margine poate aparține semnului vecin.",
    howH2: "Cum este descris Scorpionul în astrologie?",
    howP:
      "În interpretările tradiționale, Scorpionul este văzut ca un semn care cercetează ce stă sub aparență. Ține la loialitate și se îndepărtează când un secret este tratat cu ușurință. Descrierea este simbolică și nu atribuie un caracter fix fiecărei persoane născute în Scorpion.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Curajul și loialitatea față de cei apropiați sunt calități atribuite frecvent Scorpionului. Neîncrederea și gelozia apar în aceleași descrieri tradiționale, ca o umbră a intensității, nu ca o sentință despre oameni.",
    loveH2: "Scorpionul în relații",
    loveP:
      "În descrierile astrologice, Scorpionul caută o legătură în care încrederea se construiește în timp. O relație reală nu se judecă după zodie. Dacă vrei comparația simbolică, încearcă",
    workH2: "Scorpionul în activități și proiecte",
    workP:
      "Simbolismul Scorpionului pune accent pe concentrare și pe un subiect dus în profunzime. Insistența poate lămuri subiectul, iar suspiciunea poate închide o colaborare de care avea nevoie.",
    readH2: "Horoscop pentru Scorpion",
  }),
  sagetator: article("sagetator", {
    intro:
      "Săgetătorul este un semn de foc, iar planeta asociată în tradiția astrologică este Jupiter. Textele îl leagă de drum, de idei largi și de o nevoie de spațiu care nu se împacă bine cu limitele strânse.",
    whenH2: "Când este zodia Săgetător?",
    whenLead:
      "Perioada asociată de obicei Săgetătorului este 22 noiembrie – 21 decembrie. Intervalul pleacă din Scorpion și se oprește înainte de Capricorn. Ziua de 21 decembrie este limita folosită de obicei, nu o regulă identică în fiecare an.",
    howH2: "Cum este descris Săgetătorul în astrologie?",
    howP:
      "În interpretările tradiționale, Săgetătorul este văzut ca un semn generos și direct. Îl atrag călătoria, întrebările mari și aerul liber. Spune ce gândește chiar și când formularea nu este diplomatică. Nu este un portret obligatoriu pentru fiecare persoană născută în Săgetător.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Generozitatea și umorul sunt calități atribuite frecvent Săgetătorului. Aceeași deschidere poate fi citită și ca nerăbdare, sau ca o promisiune mai mare decât timpul pe care îl poate susține.",
    loveH2: "Săgetătorul în relații",
    loveP:
      "În descrierile astrologice, Săgetătorul ține la libertate și la un ton sincer. O relație nu se reduce la semnul zodiacal. Pentru o comparație simbolică, încearcă",
    workH2: "Săgetătorul în activități și proiecte",
    workP:
      "Simbolismul Săgetătorului leagă proiectele de orizont: o călătorie, o idee, un context nou. Entuziasmul deschide drumul, iar un detaliu lăsat pe mai târziu îl poate face greu de urmat.",
    readH2: "Horoscop pentru Săgetător",
  }),
  capricorn: article("capricorn", {
    intro:
      "Capricornul este un semn de pământ, iar planeta asociată în tradiția astrologică este Saturn. Descrierile vorbesc despre disciplină, despre timp lung și despre un rezultat care se vede abia după ce treptele au fost urcate.",
    whenH2: "Când este zodia Capricorn?",
    whenLead:
      "Perioada asociată de obicei Capricornului este 22 decembrie – 19 ianuarie. Este semnul occidental din acest șir care trece dintr-un an calendaristic în altul. Săgetătorul stă înainte de 22 decembrie, iar Vărsătorul începe după 19 ianuarie. Ora nașterii contează la ambele capete.",
    howH2: "Cum este descris Capricornul în astrologie?",
    howP:
      "În interpretările tradiționale, Capricornul este văzut ca un semn responsabil și metodic. Ține la tradiție și la un lucru care rezistă. Acestea sunt simboluri, nu o garanție că fiecare persoană născută în Capricorn conduce sau planifică la fel.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Disciplina și simțul responsabilității sunt calități atribuite frecvent Capricornului. Aceeași exigență poate fi citită și ca severitate, atunci când așteptarea unui rezultat perfect lasă puțin loc pentru o încercare nereușită.",
    loveH2: "Capricornul în relații",
    loveP:
      "În descrierile astrologice, Capricornul arată apropierea prin consecvență și prin grijă pentru cei din familie. Compatibilitatea reală nu se decide după zodie. Dacă vrei comparația simbolică, încearcă",
    workH2: "Capricornul în activități și proiecte",
    workP:
      "Simbolismul Capricornului pune accent pe structură și pe un obiectiv măsurabil. Disciplina urcă obiectivul, iar controlul excesiv îl poate face greu de pornit.",
    readH2: "Horoscop pentru Capricorn",
  }),
  varsator: article("varsator", {
    intro:
      "Vărsătorul este un semn de aer. În tradiția astrologică este asociat cu Uranus și cu Saturn. Textele îl leagă de independență, de prieteni și de idei care nu se mulțumesc cu regula deja acceptată.",
    whenH2: "Când este zodia Vărsător?",
    whenLead:
      "Perioada asociată de obicei Vărsătorului este 20 ianuarie – 18 februarie. Capricornul ține zilele de dinainte, iar Peștii încep după 18 februarie. Semnul cade în ianuarie și februarie, dar ține de parcursul Soarelui, nu de anul din zodiacul chinezesc.",
    howH2: "Cum este descris Vărsătorul în astrologie?",
    howP:
      "În interpretările tradiționale, Vărsătorul este văzut ca un semn original și orientat spre grup. Se atașează de o cauză sau de o conversație de idei mai ușor decât de o limită impusă fără explicație. Descrierea nu obligă fiecare persoană născută în Vărsător să fie la fel de detașată.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Independența și interesul pentru ceilalți sunt calități atribuite frecvent Vărsătorului. Aceeași distanță poate fi citită și ca rezervă emoțională, atunci când un sentiment rămâne nespus.",
    loveH2: "Vărsătorul în relații",
    loveP:
      "În descrierile astrologice, Vărsătorul ține la prietenie și la un spațiu în care fiecare rămâne el însuși. O relație reală nu se reduce la zodie. Pentru o comparație simbolică, încearcă",
    workH2: "Vărsătorul în activități și proiecte",
    workP:
      "Simbolismul Vărsătorului leagă proiectele de experiment și de o cauză mai largă decât interesul imediat. O idee nouă mișcă lucrul, iar refuzul oricărui compromis îl poate bloca.",
    readH2: "Horoscop pentru Vărsător",
  }),
  pesti: article("pesti", {
    intro:
      "Peștii închid cercul zodiacului occidental. Sunt un semn de apă, iar în tradiția astrologică sunt asociați cu Neptun și cu Jupiter. Descrierile vorbesc despre imaginație, despre compasiune și despre nevoia de liniște când lumea devine prea zgomotoasă.",
    whenH2: "Când este zodia Pești?",
    whenLead:
      "Perioada asociată de obicei Peștilor este 19 februarie – 20 martie. Vărsătorul o precede, iar Berbecul deschide ciclul după 20 martie. O naștere chiar pe 20 martie stă pe închiderea cercului, iar ora o poate muta în Berbec.",
    howH2: "Cum sunt descriși Peștii în astrologie?",
    howP:
      "În interpretările tradiționale, Peștii sunt văzuți ca un semn intuitiv și artistic. Se apropie de muzică, de imagini și de teme care lasă loc interpretării. Acestea sunt simboluri, nu o dovadă că fiecare persoană născută în Pești visează sau creează la fel.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Compasiunea și sensibilitatea artistică sunt calități atribuite frecvent Peștilor. Aceeași deschidere poate fi citită și ca o tendință de a amâna o realitate incomodă, atunci când retragerea pare mai ușoară decât o limită clară.",
    loveH2: "Peștii în relații",
    loveP:
      "În descrierile astrologice, Peștii caută blândețe și un spațiu în care emoția poate fi spusă fără grabă. Compatibilitatea dintre doi oameni nu se judecă după zodie. Dacă vrei comparația simbolică, încearcă",
    workH2: "Peștii în activități și proiecte",
    workP:
      "Simbolismul Peștilor leagă lucrul de imaginație: o melodie, o imagine, o idee care nu are încă o formă fixă. Imaginația hrănește proiectul atâta timp cât nu înlocuiește pasul concret.",
    readH2: "Horoscop pentru Pești",
  }),
};

export function signArticle(slug: ZodiacSlug): SignArticle {
  if (slug === "berbec") {
    const source = hubCopy("ro").berbec;
    return {
      intro: source.intro,
      whenH2: source.whenH2,
      whenP: source.whenP,
      howH2: source.howH2,
      howP: source.howP,
      traitsH2: source.traitsH2,
      traitsP: source.traitsP,
      loveH2: source.loveH2,
      loveP: source.loveP,
      loveLink: source.loveLink,
      workH2: source.workH2,
      workP: source.workP,
      readH2: source.readH2,
      readP: source.readP,
      readOr: source.readOr,
      readDaily: source.readDaily,
      readWeekly: source.readWeekly,
    };
  }
  return ARTICLES[slug];
}

export function sameElementSlugs(slug: ZodiacSlug): ZodiacSlug[] {
  const element = signProfile(slug)?.element;
  if (!element) return [];
  return WESTERN_SIGNS.map((sign) => sign.slug).filter(
    (candidate) => candidate !== slug && signProfile(candidate)?.element === element
  );
}
