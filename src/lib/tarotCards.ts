/**
 * Original entertainment copy for this site.
 * Faces are drawn as original geometry, not a historic deck.
 * Version 1 sentences stay as published; a later edit adds a version.
 */

export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";

export type TarotCard = {
  id: string;
  deckCode: "original-v1";
  titleRo: string;
  arcana: "major" | "minor";
  suit: TarotSuit | null;
  number: number;
  headline: string;
  message: string;
  love: string;
  work: string;
  reflection: string;
  contentVersion: 1;
  editorialStatus: "approved";
};

type Meaning = [string, string, string, string, string];

const RANKS: Array<[number, string]> = [
  [1, "Asul"],
  [2, "Doi"],
  [3, "Trei"],
  [4, "Patru"],
  [5, "Cinci"],
  [6, "Șase"],
  [7, "Șapte"],
  [8, "Opt"],
  [9, "Nouă"],
  [10, "Zece"],
  [11, "Valetul"],
  [12, "Cavalerul"],
  [13, "Regina"],
  [14, "Regele"],
];

const MAJOR: Array<[string, string, number, Meaning]> = [
  [
    "major-fool",
    "Nebunul",
    0,
    [
      "Un început fără hartă completă",
      "Poți lăsa o rutină care nu îți mai folosește, printr-un pas mic și asumat, nu printr-o fugă.",
      "Spune pe șleau ce îți dorești de la apropiere, înainte să ceri celuilalt să ghicească.",
      "Un proiect nou merită o probă scurtă, nu o plecare făcută din impuls.",
      "Ce aș începe dacă nu ar trebui să iasă perfect?",
    ],
  ],
  [
    "major-magician",
    "Magicianul",
    1,
    [
      "Mijloacele sunt deja la îndemână",
      "Ai mai multe resurse decât pare: timp, o abilitate sau o conversație pe care o tot amâni.",
      "Oferă o atenție concretă, nu o promisiune mare.",
      "Alege un singur instrument și du o sarcină până la capăt.",
      "Ce pot folosi acum, fără să mai aștept condiții ideale?",
    ],
  ],
  [
    "major-priestess",
    "Marea Preoteasă",
    2,
    [
      "Mai întâi ascultă",
      "Nu toate răspunsurile cer o reacție imediată. Unele se limpezesc dacă le lași în liniște.",
      "Întreabă ce simte celălalt înainte să interpretezi tăcerea.",
      "Citește încă o dată informația pe care o ai, înainte de o decizie zgomotoasă.",
      "Ce știu deja, dar încă nu mi-am spus cu voce tare?",
    ],
  ],
  [
    "major-empress",
    "Împărăteasa",
    3,
    [
      "Ce îngrijești, crește",
      "O relație, o idee sau un obicei are nevoie de grijă repetată, nu de un gest spectaculos.",
      "Tandrețea poate fi practică: timp, mâncare, răbdare.",
      "Protejează o bucată de lucru ca să se coacă, în loc să o arăți prea devreme.",
      "Ce am plantat și încă nu am udat?",
    ],
  ],
  [
    "major-emperor",
    "Împăratul",
    4,
    [
      "Pune o limită clară",
      "Ordinea ajută când este aleasă. Stabilește o regulă pe care o poți ține.",
      "Spune ce îți este confortabil și ce nu, fără să pedepsești.",
      "Un cadru simplu, cu oră, limită și responsabil, face treaba mai ușoară.",
      "Unde las lucrurile neclare ca să evit o conversație?",
    ],
  ],
  [
    "major-hierophant",
    "Hierofantul",
    5,
    [
      "Învață de la cineva care a mai trecut pe aici",
      "Nu trebuie să reinventezi totul. O regulă veche sau un sfat experimentat poate fi folositor dacă îl înțelegi.",
      "Întreabă-te ce model de cuplu repeți fără să îl fi ales.",
      "Cere sfatul unei persoane cu experiență, apoi decide tu.",
      "Ce regulă urmez din obișnuință și care încă mă ajută?",
    ],
  ],
  [
    "major-lovers",
    "Îndrăgostiții",
    6,
    [
      "O alegere făcută pe față",
      "Cartea nu alege în locul tău. Îți cere să numești valoarea după care decizi.",
      "Alinierea contează mai mult decât intensitatea de o singură clipă.",
      "Dacă două drumuri par bune, alege-l pe cel care se potrivește cu ce vrei să dureze.",
      "Aleg din dorință, din frică sau din obișnuință?",
    ],
  ],
  [
    "major-chariot",
    "Carul",
    7,
    [
      "Ține direcția, nu viteza",
      "Poți înainta dacă nu te lași tras de două impulsuri deodată. Alege sensul și păstrează-l o vreme.",
      "Un dezacord se mișcă mai bine când fiecare spune unde vrea să ajungă.",
      "Concentrează-te pe următorul prag, nu pe tot anul.",
      "Ce mă trage în două părți și ce aleg să urmez?",
    ],
  ],
  [
    "major-strength",
    "Forța",
    8,
    [
      "Blândețea care nu cedează",
      "Nu câștigi nimic folositor dacă te forțezi până te rupi. Rămâi prezent, cu o mână calmă.",
      "Răbdarea față de celălalt începe cu răbdarea față de propria iritare.",
      "O conversație dificilă iese mai bine dacă nu ridici tonul ca să grăbești rezultatul.",
      "Unde pot fi ferm fără să fiu dur?",
    ],
  ],
  [
    "major-hermit",
    "Eremitul",
    9,
    [
      "Un pas înapoi ca să vezi drumul",
      "Retragerea este pentru claritate, nu pentru izolare. Ia o oră fără zgomot.",
      "Nu trebuie să ai un răspuns pentru celălalt înainte să înțelegi ce simți tu.",
      "O pauză scurtă poate arăta care sarcină este a ta și care nu.",
      "Ce aș auzi dacă aș reduce zgomotul o oră?",
    ],
  ],
  [
    "major-wheel",
    "Roata Norocului",
    10,
    [
      "Se schimbă ceva ce nu controlezi tot",
      "O împrejurare se mișcă. Poți alege cum răspunzi, nu poți opri roata cu mâna.",
      "Lasă o așteptare rigidă să se ajusteze la ce este real acum.",
      "Pregătește un plan scurt pentru varianta bună și pentru cea incomodă.",
      "La ce schimbare mă opun doar pentru că nu am pornit-o eu?",
    ],
  ],
  [
    "major-justice",
    "Dreptatea",
    11,
    [
      "Numește faptele, apoi cântărește",
      "O decizie cinstită separă ce s-a întâmplat de povestea pe care o spui despre asta.",
      "Echilibrul într-o relație se vede în fapte, nu doar în scuze.",
      "Verifică ce datorezi și ce ți se datorează, apoi spune clar.",
      "Ce adevăr amân pentru că ar schimba o concluzie comodă?",
    ],
  ],
  [
    "major-hanged",
    "Spânzuratul",
    12,
    [
      "Alt unghi, nu o înfrângere",
      "O oprire poate fi utilă. Privește situația din altă parte înainte să mai tragi de ea.",
      "Cineva poate avea nevoie de timp, nu de un ultimatum.",
      "Dacă un plan s-a blocat, schimbă întrebarea, nu doar efortul.",
      "Ce aș vedea dacă aș renunța o vreme la felul meu de a avea dreptate?",
    ],
  ],
  [
    "major-death",
    "Moartea",
    13,
    [
      "Lasă să se încheie ce s-a încheiat",
      "Nu este o sentință. Este locul în care un capitol vechi nu mai poate fi peticit și face loc altuia.",
      "O formă veche a relației poate apune ca să rămână ceva mai sincer.",
      "Închide o sarcină sau un rol care îți consumă energia fără rezultat.",
      "Ce păstrez doar ca să nu trec printr-un final?",
    ],
  ],
  [
    "major-temperance",
    "Cumpătarea",
    14,
    [
      "Amestecă încet",
      "Extremele obosesc. Doza potrivită, repetată, bate un efort uriaș făcut o singură dată.",
      "Reparația se face în gesturi mici, nu într-o discuție care le rezolvă pe toate.",
      "Combină două lucruri pe care le știi deja, în loc să cauți o metodă nouă.",
      "Unde merg din extremă în extremă?",
    ],
  ],
  [
    "major-devil",
    "Diavolul",
    15,
    [
      "Vezi lanțul pe care îl poți desface",
      "O obișnuință sau o tentație pare mai puternică decât este. Uită-te la ce alegi când nimeni nu te obligă.",
      "Dorința este reală. Nevoia de aprobare nu trebuie să conducă relația.",
      "Un câștig rapid care te leagă de un compromis prost merită refuzat.",
      "Ce scuză repet ca să rămân într-un obicei care mă strâmtorează?",
    ],
  ],
  [
    "major-tower",
    "Turnul",
    16,
    [
      "Ce era șubred se vede",
      "O surpriză neplăcută poate dărâma o construcție deja crăpată. După șoc, rămâne ce este solid.",
      "O discuție sinceră poate durea și totuși scoate relația din minciună.",
      "Nu reconstrui imediat pe același plan dacă planul tocmai a căzut.",
      "Ce adevăr evitam și acum nu mai poate fi evitat?",
    ],
  ],
  [
    "major-star",
    "Steaua",
    17,
    [
      "Un pas spre claritate",
      "Poți reveni la o intenție lăsată în urmă. Nu trebuie să rezolvi totul: alege un pas mic și concret.",
      "Speranța într-o relație se arată prin consecvență, nu prin promisiuni mari.",
      "Reia un proiect cu o singură acțiune măsurabilă.",
      "Ce intenție bună am abandonat prea devreme?",
    ],
  ],
  [
    "major-moon",
    "Luna",
    18,
    [
      "Nu confunda ceața cu un fapt",
      "Imaginația este activă. Verifică ce este întâmplare și ce este temere înainte să acționezi.",
      "O nesiguranță se spune mai bine decât se interpretează pe întuneric.",
      "Amână o decizie mare până vezi informația la lumina zilei.",
      "Ce poveste îmi spun când nu am destule date?",
    ],
  ],
  [
    "major-sun",
    "Soarele",
    19,
    [
      "Arată lucrul așa cum este",
      "Claritatea și bucuria simplă sunt permise. Nu micșora un lucru bun ca să pari modest.",
      "Spune ce îți place la celălalt, concret.",
      "Prezintă rezultatul pe care îl ai, fără să îl îngropi în scuze.",
      "Ce lucru bun refuz să recunosc?",
    ],
  ],
  [
    "major-judgement",
    "Judecata",
    20,
    [
      "Răspunde la o chemare veche",
      "Un capitol cere o revizuire cinstită: ce iei cu tine și ce lași. Nu este un proces, este o trezire.",
      "Poți relua o conversație închisă prost, dacă vii fără un scor de plătit.",
      "O ocazie mai veche poate fi încă valabilă dacă o privești cu ochii de acum.",
      "Ce chemare am auzit și am acoperit cu ocupații?",
    ],
  ],
  [
    "major-world",
    "Lumea",
    21,
    [
      "Încheie cercul",
      "Un ciclu este gata să fie recunoscut ca întreg. Marchează finalul înainte să deschizi altul.",
      "O relație sau o împăcare poate intra într-o formă mai matură.",
      "Livrează, nu mai adăuga o îmbunătățire nesfârșită. Închide și arată.",
      "Ce ciclu este de fapt gata, chiar dacă mă tem de golul de după?",
    ],
  ],
];

const MINOR: Record<TarotSuit, Meaning[]> = {
  wands: [
    [
      "O scânteie care cere un prim gest",
      "O idee are energie doar dacă o pui în mișcare printr-o acțiune mică și vizibilă.",
      "Spune ce te entuziasmează, în loc să aștepți ca celălalt să observe singur.",
      "Deschide un proiect cu un prim rezultat, nu cu un plan de douăzeci de pagini.",
      "Care este primul gest concret pe care îl tot amân?",
    ],
    [
      "Două direcții, o singură alegere",
      "Ai o vedere destul de largă ca să alegi. Rămâi cu o direcție până o testezi.",
      "Vorbește despre unde vreți să ajungeți împreună, nu doar despre cum vă simțiți acum.",
      "Compară două opțiuni după un criteriu clar, apoi alege una pentru o perioadă.",
      "Ce alegere țin deschisă doar ca să nu pierd cealaltă variantă?",
    ],
    [
      "Ai pornit; lasă drumul să răspundă",
      "O parte din efort este deja trimisă. Următorul pas este să observi ce se întoarce, nu să împingi din nou imediat.",
      "Dă spațiu unui răspuns. Nu umple tăcerea cu o nouă ofertă.",
      "Verifică rezultatul unui pas deja făcut înainte să adaugi altul.",
      "Unde continui să împing, deși încă nu am citit răspunsul?",
    ],
    [
      "Marchează un prag",
      "Un moment de stabilitate merită recunoscut. Oprește-te să vezi ce ai construit, nu doar ce lipsește.",
      "O masă sau o plimbare poate întări o legătură deja bună.",
      "Închide o etapă cu o notă clară despre ce este gata.",
      "Ce reușită trec mai departe fără să o recunosc?",
    ],
    [
      "Frecarea nu este neapărat dușmănie",
      "Părerile se ciocnesc. Poți rămâne în discuție fără să transformi fiecare obiecție într-un atac.",
      "Un dezacord poate apropia dacă fiecare spune ce apără, nu pe cine învinge.",
      "Folosește critica ca să îmbunătățești o piesă, nu ca să câștigi o rundă.",
      "Unde mă lupt ca să am dreptate, nu ca să înțeleg?",
    ],
    [
      "Primește recunoașterea și rămâi prezent",
      "Un rezultat bun poate fi arătat. Nu îl micșora și nu te urca pe el ca și cum restul nu ar mai conta.",
      "Spune mulțumesc pentru un gest primit și întoarce unul la fel de concret.",
      "Notează ce a funcționat, ca să poți repeta metoda, nu doar sărbătoarea.",
      "Pot primi o laudă fără să o resping și fără să mă pierd în ea?",
    ],
    [
      "Ține poziția pe care ai ales-o",
      "Nu trebuie să răspunzi la fiecare provocare. Apără doar ceea ce chiar contează pentru tine.",
      "Un hotar spus calm este mai util decât o ceartă lungă.",
      "Refuză o cerere care îți strică lucrul deja asumat.",
      "Ce luptă nu este a mea și totuși o duc?",
    ],
    [
      "Lucrurile se mișcă; alege ce prinzi",
      "Veștile și sarcinile vin repede. Răspunde la ce este important și lasă restul să treacă fără vinovăție.",
      "Un mesaj clar acum valorează mai mult decât o explicație perfectă mai târziu.",
      "Trimite răspunsul care deblochează pe alții, apoi revino la restul.",
      "Ce las să treacă ca să nu pierd ceea ce chiar contează?",
    ],
    [
      "Ești obosit, nu la capăt",
      "Rezerva de energie este mică. Păstreaz-o pentru lucrul care îți aparține și lasă garda jos acolo unde nu e nevoie.",
      "Spune că ești obosit înainte să devii tăios.",
      "Reduce lista la o singură apărare necesară, nu la zece fronturi.",
      "Unde stau de gardă deși nimeni nu mă atacă?",
    ],
    [
      "Lasă jos ce nu este al tău",
      "Povara pare mare pentru că ai adunat și lucruri care pot fi puse jos sau împărțite fără pagubă.",
      "Nu căra singur o tensiune care aparține amândurora.",
      "Mută o sarcină de pe umerii tăi pe o listă împărțită.",
      "Ce duc doar pentru că m-am obișnuit să fiu cel care duce?",
    ],
    [
      "O veste care vrea o încercare",
      "Curiozitatea este proaspătă. Testeaz-o într-un exercițiu scurt, nu într-o declarație grandioasă.",
      "Un gest jucăuș și sincer poate deschide o conversație înțepenită.",
      "Încearcă o metodă nouă pe o bucată mică de lucru.",
      "Ce aș încerca dacă n-ar trebui să iasă din prima?",
    ],
    [
      "Înaintează fără să calci peste oameni",
      "Avântul este util când știi încotro. Graba care ignoră pe ceilalți îți consumă chiar drumul.",
      "Spune unde te grăbești, ca celălalt să nu rămână în urmă fără explicație.",
      "Pune un termen realist înainte să promiți că este gata.",
      "Unde confund viteza cu curajul?",
    ],
    [
      "Căldură care nu împinge",
      "Poți încuraja fără să preiei controlul. Prezența calmă aprinde mai bine decât presiunea.",
      "Oferă încredere și lasă celuilalt loc să crească în ritmul lui.",
      "Sprijină o idee cu resurse, nu cu grabă.",
      "Unde ajut atât de tare încât nu mai las loc și altcuiva?",
    ],
    [
      "Condu printr-un exemplu ținut în timp",
      "Autoritatea de aici se arată prin consecvență, nu printr-un foc de paie.",
      "Stabilește direcția prin ce faci, nu prin discursuri.",
      "Ia o decizie vizibilă și rămâi lângă ea destul cât să se vadă efectul.",
      "Unde cer altora o disciplină pe care eu nu o țin?",
    ],
  ],
  cups: [
    [
      "O emoție nouă cere să fie primită",
      "Ceva se deschide: afecțiune, o idee de apropiere, o bucurie. Primește-o înainte să o diseci.",
      "Lasă un sentiment să existe fără să îi ceri imediat un viitor.",
      "Un proiect poate începe din plăcere, nu doar din obligație. Notează ce te mișcă.",
      "Ce emoție am pus deoparte pentru că nu știam ce să fac cu ea?",
    ],
    [
      "Reciprocitatea se vede în fapte",
      "O legătură se întărește când amândoi puneți ceva pe masă, nu când unul așteaptă.",
      "Propune un schimb clar: timp, atenție sau o conversație pe care o tot amânați.",
      "Un parteneriat merge când rolurile sunt spuse, nu ghicite.",
      "Ce ofer și ce aștept, și le-am spus cu voce tare?",
    ],
    [
      "Împarte bucuria",
      "O veste bună crește când o spui oamenilor care contează, fără să o transformi într-un spectacol.",
      "Include pe cineva drag într-un moment simplu, nu doar în probleme.",
      "Recunoaște contribuția unui coleg pe nume, nu doar rezultatul de ansamblu.",
      "Cu cine aș vrea să împart un lucru bun și încă n-am făcut-o?",
    ],
    [
      "Uită-te și la ce ai refuzat din oboseală",
      "Nemulțumirea poate acoperi o ofertă reală. Verifică dacă spui nu din claritate sau din apatie.",
      "Un gest simplu al celuilalt poate fi exact ce ai cerut, într-o formă mai mică.",
      "Reia o ocazie pe care ai lăsat-o deoparte înainte să cauți alta.",
      "Ce refuz din reflex, fără să mă uit a doua oară?",
    ],
    [
      "Vezi și ce a rămas în picioare",
      "O pierdere doare. După ce o recunoști, rămâne ceva întreg lângă ea, și merită privit.",
      "Poți jelui o dezamăgire fără să anulezi tot ce este încă viu în relație.",
      "Notează ce s-a stricat și ce încă funcționează, pe două rânduri separate.",
      "Ce pierdere țin în față atât de aproape încât nu mai văd restul?",
    ],
    [
      "O amintire bună poate hrăni prezentul",
      "Trecutul aduce un gust cald. Ia din el ce te liniștește și nu lăsa nostalgia să decidă în locul tău.",
      "Un gest de tandrețe dintr-o perioadă bună poate fi reluat, adaptat la cine sunteți acum.",
      "O metodă care a mers odată merită încercată din nou, cu datele de acum.",
      "Ce amintire folosesc ca să evit o alegere de acum?",
    ],
    [
      "Alege una dintre fantazii și verific-o",
      "Imaginile sunt multe și atrăgătoare. Doar una poate fi pusă la încercare în realitate.",
      "Nu construi un viitor întreg dintr-un singur semn. Întreabă.",
      "Alege o idee și fă un test mic, în loc să le păstrezi pe toate deschise.",
      "Care variantă îmi place doar în minte și care rezistă la o probă?",
    ],
    [
      "Poți pleca de la ce nu te mai umple",
      "Nu tot ce ai construit trebuie ținut la nesfârșit. Uneori pasul cinstit este să lași un loc care nu te mai hrănește.",
      "O relație, sau o formă a ei, poate fi părăsită fără să urăști ce a fost.",
      "Închide un proiect care consumă și nu mai dă nimic înapoi.",
      "Ce continui din loialitate față de o versiune veche a mea?",
    ],
    [
      "Primește partea care este deja aici",
      "O dorință s-a împlinit măcar parțial. Bucuria nu cere ca totul să fie perfect ca să fie reală.",
      "Spune ce îți place la relația de acum, nu doar ce i-ar mai lipsi.",
      "Recunoaște un rezultat pe care îl ai, înainte să ridici ștacheta.",
      "Ce lucru bun tratez ca și cum nu s-ar număra?",
    ],
    [
      "Aparținerea stă în viața de fiecare zi",
      "O imagine de fericire nu ține locul gesturilor repetate. Căldura se vede în rutină, nu într-o scenă.",
      "Întreabă ce face casa sau relația să se simtă sigură pentru amândoi.",
      "O echipă se leagă prin încredere repetată, nu printr-un discurs.",
      "Ce gest mic ar face un loc să se simtă al meu și al celorlalți?",
    ],
    [
      "Un gest tandru spune mai mult",
      "Sensibilitatea este trează. Un mesaj sincer și scurt poate deschide mai mult decât un discurs.",
      "Oferă o atenție fără să ceri imediat aceeași măsură înapoi.",
      "Spune aprecierea pe care o simți față de o colaborare, simplu.",
      "Ce tandrețe țin în gând și n-am trimis-o?",
    ],
    [
      "Urmează sentimentul și spune încotro",
      "Idealismul mișcă. Ca să nu rămână doar o chemare frumoasă, spune ce propui concret.",
      "Invită, nu doar visa. Un plan clar arată că sentimentul are un drum.",
      "Prezintă o idee cu inima ei și cu primul pas practic.",
      "Unde aștept să fiu înțeles fără să spun ce vreau?",
    ],
    [
      "Empatie care nu te pierde",
      "Poți simți cu celălalt și totuși să îți păstrezi marginea. Grija nu înseamnă să dispari în povestea lui.",
      "Ascultă până la capăt, apoi spune și ce simți tu.",
      "Un sfat blând este mai bun când nu preiei tu problema cu totul.",
      "Unde confund grija cu obligația de a repara pe toată lumea?",
    ],
    [
      "Ține emoția fără să o verși",
      "Stăpânirea de aici nu este răceală. Este capacitatea de a rămâne prezent când sentimentul este mare.",
      "Răspunde după ce ai înțeles ce simți, nu în vârful valului.",
      "O decizie delicată iese mai curat dacă o lași o oră să se așeze.",
      "Ce emoție conduc eu, și care mă conduce?",
    ],
  ],
  swords: [
    [
      "Spune lucrul pe nume",
      "O idee clară taie ceața. Formuleaz-o într-o frază, fără ornamente care o ascund.",
      "Adevărul spus simplu este mai bun decât o tăcere politicoasă care încurcă.",
      "Scrie concluzia înainte de argumente, ca să știi ce susții.",
      "Ce adevăr învârt în prea multe cuvinte?",
    ],
    [
      "Alegerea amânată doare mai mult",
      "Două opțiuni par egale doar cât timp refuzi să le cântărești. Pune-le una lângă alta și alege pentru o vreme.",
      "Evitarea unei conversații ține amândoi într-o poziție înțepenită.",
      "Stabilește un termen până la care decizia este luată, chiar dacă poate fi revăzută.",
      "Ce alegere țin blocată ca să nu simt costul ei?",
    ],
    [
      "Numește durerea, nu o explica departe",
      "O supărare sau o despărțire doare. O poți spune fără să o transformi imediat într-o lecție.",
      "Recunoaște rana înainte să ceri împăcare sau distanță.",
      "Un eșec se notează ca fapt, nu ca sentință despre valoarea ta.",
      "Ce durere acopăr cu o explicație deșteaptă?",
    ],
    [
      "Odihna face parte din gândire",
      "Mintea obosită taie prost. O pauză reală este un instrument, nu o întârziere de care să te rușinezi.",
      "Spune că ai nevoie de liniște, ca celălalt să nu citească retragerea ca respingere.",
      "Lasă o problemă să se odihnească înainte de varianta finală.",
      "Unde numesc oboseala lene ca să nu mă opresc?",
    ],
    [
      "O victorie care umilește costă",
      "Poți avea dreptate și totuși să lași în urmă un gust sărac. Verifică dacă merită prețul.",
      "Câștigul unei certe nu este același lucru cu binele relației.",
      "Alege o soluție pe care și ceilalți o pot locui, nu doar una care te pune deasupra.",
      "Unde vreau să câștig mai mult decât să rezolv?",
    ],
    [
      "Treci mai departe cu ce ai învățat",
      "Un loc mai liniștit este posibil. Nu trebuie să uiți de unde pleci ca să mergi într-acolo.",
      "O relație poate intra într-o apă mai calmă dacă schimbați un obicei, nu persoana.",
      "Mută un proces care scârțâie spre o variantă mai simplă.",
      "Ce duc cu mine și ce pot lăsa pe mal?",
    ],
    [
      "Verifică dacă scurtătura este strategie",
      "O cale laterală poate fi inteligentă sau doar evitare. Spune-ți pe care dintre ele o folosești.",
      "O omisiune mică poate părea o stratagemă. Spune ce ai lăsat pe dinafară.",
      "Dacă ocolești un pas, notează riscul, nu doar timpul câștigat.",
      "Unde mă strecor ca să nu am o conversație directă?",
    ],
    [
      "Multe limite sunt gânduri",
      "Te poți simți legat deși ușa este mai deschisă decât pare. Testează o singură limită, concret.",
      "Spune teama care te ține, ca să nu pară indiferență.",
      "Verifică o regulă: este impusă sau doar presupusă?",
      "Ce constrângere n-am întrebat niciodată dacă este reală?",
    ],
    [
      "Grijile nopții nu sunt fapte",
      "Mintea poate repeta un scenariu până pare inevitabil. Scrie-l și lasă-l până îl poți verifica.",
      "Nu acuza dintr-o neliniște pe care încă n-ai spus-o.",
      "Separă problema de acum de catastrofa imaginată.",
      "Ce scenariu repet fără o dovadă proaspătă?",
    ],
    [
      "Un final recunoscut nu trebuie repetat",
      "Ceva s-a încheiat dureros. După ce o recunoști, nu mai ești obligat să retrăiești același final.",
      "O formă a relației s-a terminat. Rămâne de văzut, separat, dacă mai există altceva de construit.",
      "Închide oficial un efort mort, ca să nu mai primească energie.",
      "Ce final evit să numesc și de aceea îl tot repet?",
    ],
    [
      "Întreabă înainte să acuzi",
      "Curiozitatea ascuțită este un instrument bun când caută informația, nu când vânează greșeala.",
      "Pune o întrebare deschisă în locul unei concluzii.",
      "Verifică o sursă înainte să repeți o părere.",
      "Unde întreb ca să înțeleg și unde întreb ca să prind pe cineva?",
    ],
    [
      "Graba de a avea dreptate taie",
      "Un argument rapid poate câștiga o clipă și pierde încrederea. Încetinește înainte de lovitura finală.",
      "O replică tăioasă poate fi adevărată și totuși nedreaptă în momentul ei.",
      "Trimite varianta recitită, nu prima formulare furioasă.",
      "Unde confund viteza minții cu claritatea?",
    ],
    [
      "Claritate fără răutate",
      "Poți vedea lucrurile exact și să le spui fără să rănești degeaba. Discernământul nu are nevoie de venin.",
      "O limită spusă precis protejează relația mai bine decât o tăcere rece.",
      "Taie ce este de prisos dintr-un text sau dintr-un plan, păstrând sensul.",
      "Unde folosesc inteligența ca scut, nu ca lumină?",
    ],
    [
      "O hotărâre spusă o dată",
      "Autoritatea gândului stă într-o decizie limpede, ținută fără să o tot întorci ca să arăți că poți.",
      "Spune regula relației pe care chiar o vei respecta și tu.",
      "Alege criteriul, aplică-l și nu îl schimba la jumătatea drumului fără un motiv nou.",
      "Ce hotărâre tot o reiau pentru că nu m-am ținut de ea?",
    ],
  ],
  pentacles: [
    [
      "O șansă practică, luată măsurat",
      "Apare ceva tangibil: o sumă, un obiect, o pricepere sau o ușă de lucru. Începe cu un gest pe care îl poți susține.",
      "Stabilitatea se arată printr-un plan mic, nu printr-o promisiune mare.",
      "Acceptă sau propune o ocazie cu un prim pas verificabil.",
      "Ce ocazie concretă stă în fața mea și încă n-am atins-o?",
    ],
    [
      "Nu toate mingile trebuie prinse deodată",
      "Jonglarea are o limită. Spune care obligație poate aștepta și care cere mâna acum.",
      "Împarte timpul în mod vizibil, ca nimeni să nu primească doar resturile.",
      "Mută o sarcină în altă zi în loc să le ții pe toate pe jumătate.",
      "Ce țin în aer doar ca să nu dezamăgesc, deși nu mai pot?",
    ],
    [
      "Lucrul bun se face împreună",
      "Priceperea crește când fiecare își face partea lui și o arată celorlalți. Nu trebuie să duci tot singur.",
      "Construiți ceva practic împreună: o treabă, un spațiu sau o decizie de bani.",
      "Cere părerea cuiva care se pricepe la bucata la care ești slab.",
      "Unde refuz ajutorul ca să rămân singurul autor?",
    ],
    [
      "Siguranța nu cere să strângi totul",
      "Păstrarea este înțeleaptă până în punctul în care te închide. Lasă o margine de aer în jurul a ceea ce aperi.",
      "Controlul asupra banilor sau timpului poate sufoca apropierea. Spune teama, nu doar regula.",
      "Păstrează o rezervă și eliberează o resursă care stă blocată fără folos.",
      "Ce strâng din frică, nu din grijă?",
    ],
    [
      "Strâmtoarea se traversează cu ajutor",
      "O perioadă săracă în bani, energie sau sprijin este grea. Cererea de ajutor la timp este parte din soluție.",
      "Spune nevoia înainte să te retragi de rușine.",
      "Caută o variantă mai mică și realistă, nu doar ieșirea perfectă.",
      "Pe cine aș putea ruga, și ce mă oprește?",
    ],
    [
      "Dă și primește fără un scor invizibil",
      "Generozitatea este curată când nu ține un registru secret. Primește la fel, fără să te simți dator pe viață.",
      "Un schimb echitabil se negociază pe față, nu prin reproșuri târzii.",
      "Oferă ce poți și spune limita, ca darul să nu devină resentiment.",
      "Unde țin scorul și pretind că nu o fac?",
    ],
    [
      "Verifică metoda, apoi las-o să crească",
      "Rezultatul încă nu se vede. Întreabă dacă îngrijești bine, și dacă da, nu smulge planta ca să verifici rădăcina.",
      "O relație în creștere are ritmul ei. Nu o judeca după o singură perioadă grea.",
      "Măsoară un semn de progres, nu recolta întreagă.",
      "Unde sunt nerăbdător cu un lucru care are nevoie de timp?",
    ],
    [
      "Repetiția este meșteșug",
      "Exercițiul consecvent face priceperea. Nu este o pedeapsă și nu trebuie să arate spectaculos ca să conteze.",
      "Gesturile mici, repetate, construiesc încrederea mai tare decât un moment mare.",
      "Fă încă o dată bucata de lucru, un pic mai îngrijit.",
      "Ce abilitate aș căpăta dacă aș repeta fără să mă disprețuiesc pentru asta?",
    ],
    [
      "Independența stă în lucruri terminate",
      "Poți sta pe picioarele tale. Recunoaște ce ai construit și bucură-te de el fără să te scuzi.",
      "Autonomia nu exclude apropierea. Poți fi întreg și totuși invita pe cineva.",
      "Arată un rezultat finisat, nu doar efortul din spate.",
      "Ce reușită îmi este greu să o locuiesc liniștit?",
    ],
    [
      "Stabilitatea se întreține",
      "O casă, o familie sau o structură durabilă nu se menține singură. Se ține prin decizii practice, repetate.",
      "Vorbiți despre viitorul concret: bani, timp și loc, nu doar despre sentiment.",
      "Lasă un lucru în ordine astfel încât și altcineva să îl poată continua.",
      "Ce vreau să dureze, și ce fac efectiv pentru asta?",
    ],
    [
      "Fii începător fără rușine",
      "O pricepere nouă cere să nu știi încă. Începutul stângaci este prețul învățării, nu o dovadă că nu e de tine.",
      "Poți admite că înveți cum să fii într-o relație, fără să te prefaci expert.",
      "Cere instrucțiunea de bază în loc să ascunzi că nu o știi.",
      "Unde evit să fiu novice și de aceea nu învăț?",
    ],
    [
      "Încet și ținut până la capăt",
      "Ritmul constant bate saltul nepăsător. Un plan pe care îl poți repeta valorează mai mult decât un efort eroic.",
      "Arată-ți interesul prin prezență regulată, nu printr-un vârf izolat.",
      "Fă porția care îți revine dintr-un plan lung, nimic mai mult și nimic mai puțin.",
      "Unde aș vrea un salt ca să nu fac munca necesară?",
    ],
    [
      "Grijă concretă, pusă în ordine",
      "Afecțiunea se vede în lucruri practice: timp, masă, bani, odihnă, un spațiu îngrijit. Alege unul și fă-l bine.",
      "Îngrijește relația printr-un gest util, nu doar printr-o declarație.",
      "Pune resursele în ordinea care susține oamenii, nu doar cifra.",
      "Ce nevoie practică, a mea sau a cuiva drag, am tratat-o ca pe un detaliu?",
    ],
    [
      "Administrează fără să confundzi valoarea cu posesia",
      "Poți conduce resurse cu sobrietate. Valoarea nu este suma pe care o ții, ci felul în care o folosești.",
      "Siguranța materială este un dar când este împărțită, nu când devine control.",
      "Ia o decizie de durată: ce păstrezi, ce investești, ce închizi.",
      "Unde măsor valoarea unui om, sau pe a mea, doar în ce se poate număra?",
    ],
  ],
};

const SUITS: Array<[TarotSuit, string]> = [
  ["wands", "Bâte"],
  ["cups", "Cupe"],
  ["swords", "Săbii"],
  ["pentacles", "Monede"],
];

function finish(
  id: string,
  titleRo: string,
  arcana: "major" | "minor",
  suit: TarotSuit | null,
  number: number,
  meaning: Meaning
): TarotCard {
  const [headline, message, love, work, reflection] = meaning;
  return {
    id,
    deckCode: "original-v1",
    titleRo,
    arcana,
    suit,
    number,
    headline,
    message,
    love,
    work,
    reflection,
    contentVersion: 1,
    editorialStatus: "approved",
  };
}

export const TAROT_CARDS: readonly TarotCard[] = [
  ...MAJOR.map(([id, titleRo, number, meaning]) => finish(id, titleRo, "major", null, number, meaning)),
  ...SUITS.flatMap(([suit, name]) =>
    MINOR[suit].map((meaning, index) => {
      const [number, rank] = RANKS[index];
      return finish(`${suit}-${String(number).padStart(2, "0")}`, `${rank} de ${name}`, "minor", suit, number, meaning);
    })
  ),
];

const byId = new Map(TAROT_CARDS.map((card) => [card.id, card]));

export function tarotCard(id: string) {
  return byId.get(id) ?? null;
}
