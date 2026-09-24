// Complete Anatomy Database extracted 100% strictly from Vital Institut PDF
// Single source of truth. No external facts added.

export const TERMINOLOGY = [
  { term: "C1-C7", meaning: "1.-7. krční obratel; C1 = první krční obratel (atlas), C2 = druhý krční obratel (čepovec)" },
  { term: "Th1-Th12", meaning: "1.-12. hrudní obratel" },
  { term: "L1-L5", meaning: "1.-5. bederní obratel" },
  { term: "m.", meaning: "musculus = sval" },
  { term: "mm.", meaning: "musculi = svaly" },
  { term: "origo", meaning: "začátek svalu" },
  { term: "insertio", meaning: "úpon svalu" },
  { term: "proximálně", meaning: "blíže k trupu / začátku končetiny" },
  { term: "distálně", meaning: "dále od trupu / směrem k prstům" },
  { term: "mediálně", meaning: "směrem ke střední rovině těla" },
  { term: "laterálně", meaning: "směrem od střední roviny těla" },
  { term: "kraniálně", meaning: "směrem k hlavě" },
  { term: "kaudálně", meaning: "směrem dolů / k dolnímu konci těla" },
  { term: "ventrálně", meaning: "dopředu" },
  { term: "dorzálně", meaning: "dozadu" },
  { term: "flexe", meaning: "ohnutí / předklon / zmenšení úhlu v kloubu" },
  { term: "extenze", meaning: "natažení / napřímení" },
  { term: "abdukce", meaning: "odtažení od střední roviny" },
  { term: "addukce", meaning: "přitažení ke střední rovině" },
  { term: "rotace", meaning: "otáčení kolem dlouhé osy" },
  { term: "pronace", meaning: "otáčení ruky/předloktí palcem dolů a malíkovou hranou nahoru" },
  { term: "supinace", meaning: "opačný pohyb k pronaci; dlaň se vytáčí nahoru" }
];

export const BONES_AND_LANDMARKS = [
  { lat: "clavicula", cz: "klíční kost" },
  { lat: "scapula", cz: "lopatka" },
  { lat: "humerus", cz: "pažní kost" },
  { lat: "radius", cz: "vřetenní kost" },
  { lat: "ulna", cz: "loketní kost" },
  { lat: "sternum", cz: "hrudní kost" },
  { lat: "costae", cz: "žebra" },
  { lat: "pelvis", cz: "pánev" },
  { lat: "os ilium", cz: "kost kyčelní" },
  { lat: "os ischii", cz: "kost sedací" },
  { lat: "os pubis", cz: "kost stydká" },
  { lat: "femur", cz: "stehenní kost" },
  { lat: "patella", cz: "čéška" },
  { lat: "tibia", cz: "holenní kost" },
  { lat: "fibula", cz: "lýtková kost" },
  { lat: "os sacrum", cz: "křížová kost" },
  { lat: "processus coracoideus", cz: "hákovitý výběžek lopatky" },
  { lat: "trochanter major", cz: "velký chocholík stehenní kosti" },
  { lat: "trochanter minor", cz: "malý chocholík stehenní kosti" },
  { lat: "olecranon", cz: "okovec loketní kosti" },
  { lat: "linea alba", cz: "bílá čára / vazivový pruh uprostřed břišní stěny" },
  { lat: "centrum tendineum", cz: "šlašitý střed bránice" }
];

export const FUNCTIONAL_TERMS = [
  { term: "Agonista", definition: "hlavní vykonavatel pohybu", example: "při flexi v lokti m. biceps brachii" },
  { term: "Antagonista", definition: "vykonává opačný pohyb", example: "při flexi v lokti m. triceps brachii" },
  { term: "Synergista", definition: "pomocný sval stejného pohybu", example: "m. brachialis a m. brachioradialis pomáhají při flexi lokte" },
  { term: "Stabilizátor / neutralizační sval", definition: "ruší nevhodný směr pohybu a stabilizuje segment", example: "ostatní svaly ve svalovém řetězci stabilizují pohyb" }
];

export const MODULES = [
  {
    id: "mod-1",
    number: 1,
    title: "Terminologie, Kosti a Základní Pojmy",
    description: "Zkratky obratlů, latinské směry, pohyby, kosti a role svalů (agonista, antagonista, synergista, stabilizátor).",
    icon: "BookOpen",
    system: "Základy anatomie"
  },
  {
    id: "mod-2",
    number: 2,
    title: "Hluboké svalstvo zad",
    description: "Sakrospinální, spinotransverzální, spinospinální, krátké zádové svaly a transverzospinální systém.",
    icon: "Shield",
    system: "Páteř a záda"
  },
  {
    id: "mod-3",
    number: 3,
    title: "Krční páteř & Šíje",
    description: "Hluboké šíjové svaly (mm. suboccipitales), kloněné svaly (mm. scaleni) a zdvihač hlavy (m. sternocleidomastoideus).",
    icon: "Activity",
    system: "Krční páteř"
  },
  {
    id: "mod-4",
    number: 4,
    title: "Funkční anatomie lopatky",
    description: "M. trapezius, mm. rhomboidei, m. levator scapulae, m. pectoralis minor, m. subclavius a m. serratus anterior.",
    icon: "Layers",
    system: "Pletenec ramenní"
  },
  {
    id: "mod-5",
    number: 5,
    title: "Ramenní kloub & Rotátorová manžeta",
    description: "Pectoralis major, latissimus, teres major/minor, infraspinatus, deltoideus, supraspinatus, subscapularis, coracobrachialis.",
    icon: "Target",
    system: "Rameno"
  },
  {
    id: "mod-6",
    number: 6,
    title: "Loketní kloub & Paže",
    description: "M. biceps brachii, m. brachialis, m. brachioradialis a m. triceps brachii.",
    icon: "Zap",
    system: "Horní končetina"
  },
  {
    id: "mod-7",
    number: 7,
    title: "Funkční anatomie hrudníku",
    description: "Bránice (diaphragma) a mezižeberní svaly (mm. intercostales externi et interni).",
    icon: "Wind",
    system: "Hrudník"
  },
  {
    id: "mod-8",
    number: 8,
    title: "Funkční anatomie břišní stěny",
    description: "M. rectus abdominis, mm. obliqui, m. transversus abdominis a m. quadratus lumborum.",
    icon: "Compass",
    system: "Břicho & Bedra"
  },
  {
    id: "mod-9",
    number: 9,
    title: "Svaly pánevního dna",
    description: "M. levator ani - zdvihač pánevního dna a jeho funkce v trupovém pletenci.",
    icon: "Anchor",
    system: "Pánevní dno"
  },
  {
    id: "mod-10",
    number: 10,
    title: "Kyčelní kloub & Přitahovače",
    description: "M. iliopsoas, gluteus maximus/medius, TFL, m. pectineus, adduktory a m. gracilis.",
    icon: "Maximize2",
    system: "Kyčel"
  },
  {
    id: "mod-11",
    number: 11,
    title: "Stehno & Kolenní kloub",
    description: "M. quadriceps femoris, m. sartorius a hamstringy (biceps femoris, semimembranosus, semitendinosus).",
    icon: "Flame",
    system: "Stehno & Koleno"
  },
  {
    id: "mod-12",
    number: 12,
    title: "Bérec, Noha & Hlezen",
    description: "M. tibialis anterior, m. gastrocnemius a m. soleus.",
    icon: "Move",
    system: "Bérec & Noha"
  },
  {
    id: "mod-13",
    number: 13,
    title: "Hluboký stabilizační systém (HSS)",
    description: "4 klíčové složky HSS: Bránice, M. transversus abdominis, Mm. multifidi a Svaly pánevního dna.",
    icon: "ShieldAlert",
    system: "Stabilizace"
  },
  {
    id: "mod-14",
    number: 14,
    title: "Tonické a Fázické svaly",
    description: "Posturální vs. hybné svaly, vláknové typy, tendence ke zkrácení/oslabení a svalové dysbalance.",
    icon: "Scale",
    system: "Svalový tonus"
  },
  {
    id: "mod-15",
    number: 15,
    title: "Zkouškový test A1–A21 & Checklist",
    description: "Kompletní sada 21 oficiálních otázek z Testu Anatomie a finální zkouškový checklist.",
    icon: "Award",
    system: "Zkouška"
  }
];

export const MUSCLES = [
  // BACK / SPINE
  {
    id: "erector-spinae",
    lat: "M. erector spinae",
    cz: "vzpřimovače páteře",
    system: "Sakrospinální systém",
    module: "mod-2",
    origo: "Odstupuje od bederních obratlů, křížové kosti a hřebene kyčelní kosti. Ve skriptech je rozdělen na vnitřní část m. longissimus a zevní část m. iliocostalis.",
    insertio: "Upíná se v průběhu na jednotlivé obratle a žebra a pokračuje až k bradavkovému výběžku.",
    function: "Oboustranně vzpřimuje jednotlivé části páteře. Jednostranně provádí úklon na svou stranu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic", // bederní část = tonická, hrudní část = fázická
    tonicPhasicNote: "Bederní část vzpřimovačů je tonická, hrudní část je fázická."
  },
  {
    id: "splenius-capitis-et-cervicis",
    lat: "M. splenius capitis et cervicis",
    cz: "řemenový sval hlavy a krku",
    system: "Spinotransverzální systém",
    module: "mod-2",
    origo: "Začíná na trnových výběžcích šestého krčního až šestého hrudního obratle (C6-Th6).",
    insertio: "Upíná se na příčné výběžky obratlů; jeho průběh končí na týlní kosti a bradavkovém výběžku.",
    function: "Při oboustranné kontrakci provádí extenzi krční páteře. Při jednostranné kontrakci uklání a rotuje krční páteř na stejnou stranu.",
    examNotes: "KE ZKOUŠCE (A3): V Testu Anatomie je otázka, ve které oblasti bys m. splenius capitis et cervicis hledal (krční a horní hrudní oblast).",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "spinalis",
    lat: "M. spinalis",
    cz: "trnový sval",
    system: "Spinospinální systém",
    module: "mod-2",
    origo: "Začíná na trnech jedenáctého hrudního až druhého bederního obratle (Th11-L2).",
    insertio: "Upíná se na třetí až devátý hrudní obratel (Th3-Th9).",
    function: "Oboustranně extenduje příslušný segment páteře; jednostranně podle skript rotuje a uklání páteř na stejnou stranu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "interspinales-cervicis",
    lat: "Mm. interspinales cervicis",
    cz: "krátké svaly mezi trnovými výběžky krční páteře",
    system: "Systém krátkých zádových svalů",
    module: "mod-2",
    origo: "Šest párů drobných svalů mezi druhým krčním a prvním hrudním obratlem (C2-Th1).",
    insertio: "Začátek i úpon jsou mezi sousedními segmenty C2-Th1.",
    function: "Vyvolávají extenzi krční páteře.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "intertransversarii",
    lat: "Mm. intertransversarii",
    cz: "krátké svaly mezi příčnými výběžky",
    system: "Systém krátkých zádových svalů",
    module: "mod-2",
    origo: "Sedm párů svalů začínajících mezi prvním a druhým krčním obratlem (C1-C2) a pokračujících až k poslednímu páru mezi C7-Th1.",
    insertio: "Upínají se mezi příčnými výběžky sousedních obratlů.",
    function: "Vyvolávají úklon na stranu kontrakce.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "multifidi",
    lat: "Mm. multifidi",
    cz: "svaly multifidy",
    system: "Transverzospinální systém",
    module: "mod-2",
    origo: "Začínají na příčných výběžcích obratlů po celé délce páteře; největší zastoupení mají v bederní oblasti.",
    insertio: "Upínají se vždy k většímu počtu trnových výběžků.",
    function: "Podle anatomické části skript oboustranně zajišťují extenzi a jednostranně rotují páteř na opačnou stranu. V části o stabilizaci jsou současně uvedeny jako jedna ze čtyř složek HSS.",
    examNotes: "KE ZKOUŠCE (A2, A13): Multifidy spolu s rotatores patří do transverzospinálního systému. Zároveň jsou součástí HSS.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "rotatores",
    lat: "Mm. rotatores",
    cz: "hluboké rotátory páteře",
    system: "Transverzospinální systém",
    module: "mod-2",
    origo: "Jedenáct párů svalů začínajících na příčných výběžcích hrudních a krčních obratlů.",
    insertio: "Upínají se na nejbližší obratel nad sebou.",
    function: "Oboustranně extendují obratel nad sebou; jednostranně jej podle skript rotují na opačnou stranu.",
    examNotes: "KE ZKOUŠCE (A2): V Testu Anatomie se multifidi a rotatores spojují do jednoho systému - transverzospinálního.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },

  // CERVICAL REGION
  {
    id: "rectus-capitis-posterior-minor",
    lat: "M. rectus capitis posterior minor",
    cz: "malý zadní přímý sval hlavy",
    system: "Hluboké šíjové svaly - mm. suboccipitales",
    module: "mod-3",
    origo: "Začíná na prvním krčním obratli (C1, atlas).",
    insertio: "Upíná se na týlní kost.",
    function: "Provádí jemné pohyby hlavy; nejvýznamnější je záklon.",
    examNotes: "KE ZKOUŠCE (A1): Míří na začátek a konec hlubokých šíjových svalů.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "rectus-capitis-posterior-major",
    lat: "M. rectus capitis posterior major",
    cz: "velký zadní přímý sval hlavy",
    system: "Hluboké šíjové svaly - mm. suboccipitales",
    module: "mod-3",
    origo: "Začíná na trnu druhého krčního obratle (C2, čepovec).",
    insertio: "Upíná se na týlní kost.",
    function: "Provádí jemné pohyby hlavy, zejména záklon, a rotuje hlavu na stranu kontrakce.",
    examNotes: "KE ZKOUŠCE (A1): Míří na začátek a konec hlubokých šíjových svalů.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "obliquus-capitis-superior",
    lat: "M. obliquus capitis superior",
    cz: "horní šikmý sval hlavy",
    system: "Hluboké šíjové svaly - mm. suboccipitales",
    module: "mod-3",
    origo: "Začíná na příčném výběžku prvního krčního obratle (C1, atlas).",
    insertio: "Upíná se na týlní kost.",
    function: "Podle skript rotuje hlavu na opačnou stranu.",
    examNotes: "KE ZKOUŠCE (A1): Míří na začátek a konec hlubokých šíjových svalů.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "obliquus-capitis-inferior",
    lat: "M. obliquus capitis inferior",
    cz: "dolní šikmý sval hlavy",
    system: "Hluboké šíjové svaly - mm. suboccipitales",
    module: "mod-3",
    origo: "Začíná na trnu druhého krčního obratle (C2, čepovec).",
    insertio: "Upíná se na příčný výběžek prvního krčního obratle (C1, atlas).",
    function: "Otáčí atlasem a tím i celou hlavu na stranu kontrakce.",
    examNotes: "KE ZKOUŠCE (A1): Míří na začátek a konec hlubokých šíjových svalů.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "scalenus-anterior",
    lat: "M. scalenus anterior",
    cz: "přední kloněný sval",
    system: "Svaly kloněné - mm. scaleni",
    module: "mod-3",
    origo: "Začíná na třetím až šestém krčním obratli (C3-C6).",
    insertio: "Upíná se na první žebro.",
    function: "Spolu s ostatními kloněnými svaly: oboustranně flexe krční páteře, jednostranně rotace na opačnou stranu; zdvih prvního a druhého žebra; pomoc při nádechu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "scalenus-medius",
    lat: "M. scalenus medius",
    cz: "střední kloněný sval",
    system: "Svaly kloněné - mm. scaleni",
    module: "mod-3",
    origo: "Začíná na všech krčních obratlích - prvním až sedmém (C1-C7).",
    insertio: "Upíná se na první žebro za m. scalenus anterior.",
    function: "Stejná společná funkce skupiny mm. scaleni.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "scalenus-posterior",
    lat: "M. scalenus posterior",
    cz: "zadní kloněný sval",
    system: "Svaly kloněné - mm. scaleni",
    module: "mod-3",
    origo: "Začíná na pátém až sedmém krčním obratli (C5-C7).",
    insertio: "Upíná se na druhé žebro.",
    function: "Stejná společná funkce skupiny mm. scaleni.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "sternocleidomastoideus",
    lat: "M. sternocleidomastoideus",
    cz: "zdvihač hlavy",
    system: "Svaly krku",
    module: "mod-3",
    origo: "Má dva začátky: z rukojeti hrudní kosti a z klíční kosti.",
    insertio: "Upíná se na bradavkový výběžek spánkové kosti.",
    function: "Při jednostranné kontrakci uklání hlavu na svou stranu a rotuje ji na opačnou. Při oboustranné kontrakci může podle zapojených snopců hlavu předklánět nebo zaklánět.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },

  // SCAPULA
  {
    id: "trapezius",
    lat: "M. trapezius",
    cz: "trapézový sval",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na hrbolu týlní kosti a na trnech všech krčních a hrudních obratlů - od prvního krčního po dvanáctý hrudní obratel (C1-C7, Th1-Th12).",
    insertio: "Horní sestupná část (pars descendens) -> zevní část klíční kosti. Střední část (pars transversa) -> hřeben lopatky. Dolní vzestupná část (pars ascendens) -> začátek hřebene lopatky.",
    function: "Společně tiskne lopatku k hrudní stěně a fixuje ji. Horní část: elevace lopatky a tah k páteři. Střední část: addukce k páteři. Dolní část: tah mediálně a dolů - deprese. Současná práce horní a dolní části rotuje jamku ramenního kloubu a umožňuje vzpažení.",
    examNotes: "KE ZKOUŠCE (A4): Trapézový sval má 3 části - sestupnou, příčnou a vzestupnou.",
    unusualFormulation: null,
    tonicPhasic: "both",
    tonicPhasicNote: "Horní část m. trapezius je tonická. Dolní a střední část m. trapezius je fázická."
  },
  {
    id: "rhomboideus-minor",
    lat: "M. rhomboideus minor",
    cz: "malý sval rombický",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na trnech posledních dvou krčních obratlů - šestého a sedmého (C6-C7).",
    insertio: "Upíná se na vnitřní hranu lopatky.",
    function: "Táhne lopatku směrem k páteři a nahoru k hlavě.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "rhomboideus-major",
    lat: "M. rhomboideus major",
    cz: "velký sval rombický",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na trnech prvního až čtvrtého hrudního obratle (Th1-Th4).",
    insertio: "Upíná se na vnitřní hranu lopatky.",
    function: "Má stejnou funkci jako m. rhomboideus minor. Při poruše obou rombických svalů se lopatka stáčí spodním úhlem ven od páteře.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "levator-scapulae",
    lat: "M. levator scapulae",
    cz: "zdvihač lopatky",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na výběžcích prvního až čtvrtého krčního obratle (C1-C4).",
    insertio: "Upíná se na horní úhel lopatky.",
    function: "Zdvihá horní úhel lopatky a zpevňuje ramenní pletenec; podle skript bývá přetěžován při nošení těžkých břemen v ruce.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "pectoralis-minor",
    lat: "M. pectoralis minor",
    cz: "malý prsní sval",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na třetím až pátém žebru zevně od jejich chrupavek.",
    insertio: "Upíná se na hákovitý výběžek lopatky (processus coracoideus).",
    function: "Táhne lopatku dolů a vpřed. Při fixované lopatce napomáhá vdechu zdviháním žeber.",
    examNotes: "KE ZKOUŠCE (A5): úpon malého prsního svalu = hákovitý výběžek lopatky.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "subclavius",
    lat: "M. subclavius",
    cz: "podklíčkový sval",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná na prvním žebru.",
    insertio: "Upíná se na spodní plochu klíční kosti.",
    function: "Fixuje spojení klíční kosti s hrudní kostí vtlačením klíčku do jamky.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "serratus-anterior",
    lat: "M. serratus anterior",
    cz: "přední pilovitý sval",
    system: "Svaly lopatky",
    module: "mod-4",
    origo: "Začíná zuby na prvním až osmém žebru; skripta uvádějí, že některé prameny až první až deváté žebro.",
    insertio: "Upíná se na celou plochu vnitřní hrany lopatky (margo medialis).",
    function: "Přitahuje lopatku k hrudníku a táhne její spodní úhel zevně. Tím pomáhá předpažení a vzpažení paže nad horizontálu. Při poruše funkce lopatka křídlovitě odstává a omezí se hybnost horní končetiny.",
    examNotes: "KE ZKOUŠCE (A6): znát funkci m. serratus anterior - fixace lopatky k hrudníku a pohyb spodního úhlu zevně.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },

  // SHOULDER JOINT
  {
    id: "pectoralis-major",
    lat: "M. pectoralis major",
    cz: "velký prsní sval",
    system: "Ramenní kloub",
    module: "mod-5",
    origo: "Klíčková část (pars clavicularis): vnitřní/mediální část klíční kosti. Hrudní část (pars sternocostalis): hrudní kost a chrupavky druhého až pátého žebra. Břišní část (pars abdominalis): pochva přímých břišních svalů.",
    insertio: "Upíná se na hranu velkého hrbolku pažní kosti.",
    function: "Hlavní funkce je addukce paže. Horní klíčková vlákna provádějí flexi/předpažení. Sval se také zapojuje do vnitřní rotace paže. Při fixované paži je pomocným nádechovým svalem.",
    examNotes: "KE ZKOUŠCE (A7, A14): 3 části pectoralis major (klíčková, hrudní, břišní). Úpon na hraně velkého hrbolku pažní kosti.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "latissimus-dorsi",
    lat: "M. latissimus dorsi",
    cz: "široký sval zádový",
    system: "Ramenní kloub",
    module: "mod-5",
    origo: "Začíná na posledních šesti hrudních obratlích, všech trnech bederních obratlů, křížové kosti, hřebeni kyčelní kosti a posledních čtyřech žebrech.",
    insertio: "Upíná se na hranu malého hrbolku pažní kosti.",
    function: "Addukce paže, extenze/zapažení a vnitřní rotace. Při fixované horní končetině napomáhá vdechu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "teres-major",
    lat: "M. teres major",
    cz: "velký sval oblý",
    system: "Ramenní kloub",
    module: "mod-5",
    origo: "Začíná na dolním úhlu lopatky.",
    insertio: "Upíná se na hranu malého hrbolku pažní kosti.",
    function: "Je synergistou širokého svalu zádového; pomáhá při addukci, extenzi a vnitřní rotaci paže.",
    examNotes: "KE ZKOUŠCE (A8): Z hlediska rotace je m. teres major vnitřní rotátor.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "teres-minor",
    lat: "M. teres minor",
    cz: "malý sval oblý",
    system: "Ramenní kloub & Rotátorová manžeta",
    module: "mod-5",
    origo: "Začíná v horních dvou třetinách zevní hrany lopatky.",
    insertio: "Upíná se na velký hrbolek pažní kosti.",
    function: "Addukce a vnější rotace pažní kosti; součást rotátorové manžety.",
    examNotes: "KE ZKOUŠCE (A9, A12): Z hlediska rotace je m. teres minor vnější rotátor. Je součástí rotátorové manžety.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "infraspinatus",
    lat: "M. infraspinatus",
    cz: "sval podhřebenový",
    system: "Ramenní kloub & Rotátorová manžeta",
    module: "mod-5",
    origo: "Začíná v podhřebenové jamce lopatky (fossa infraspinata).",
    insertio: "Upíná se na velký hrbolek pažní kosti ze zadní strany ramenního kloubu.",
    function: "Vnější rotace pažní kosti a pomocná addukce; součást rotátorové manžety.",
    examNotes: "KE ZKOUŠCE (A12): Součást rotátorové manžety.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "deltoideus",
    lat: "M. deltoideus",
    cz: "deltový sval",
    system: "Ramenní kloub",
    module: "mod-5",
    origo: "Zadní část: hřeben lopatky. Střední část: nadpažek (acromion). Přední část: zevní část klíční kosti.",
    insertio: "Upíná se na deltovou drsnatinu pažní kosti (tuberositas deltoidea).",
    function: "Zadní část: extenze ramene. Střední část: abdukce. Přední část: flexe. Klidové napětí svalu pomáhá udržovat pažní kost v ramenním kloubu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "supraspinatus",
    lat: "M. supraspinatus",
    cz: "sval nadhřebenový",
    system: "Ramenní kloub & Rotátorová manžeta",
    module: "mod-5",
    origo: "Začíná v nadhřebenové jamce lopatky (fossa supraspinata).",
    insertio: "Upíná se na velký výběžek/hrbolek pažní kosti.",
    function: "Ve skriptech je uveden jako spouštěč abdukcí prováděných do 90 stupňů, pomocný zevní rotátor a důležitý sval prostorové fixace ramenního kloubu; součást rotátorové manžety.",
    examNotes: "KE ZKOUŠCE (A10, A12): M. supraspinatus: rotátorová manžeta + spouští abdukci do 90° + stabilizace ramene.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "subscapularis",
    lat: "M. subscapularis",
    cz: "sval podlopatkový",
    system: "Ramenní kloub & Rotátorová manžeta",
    module: "mod-5",
    origo: "Začíná na přední ploše lopatky.",
    insertio: "Upíná se na malý hrbolek pažní kosti.",
    function: "Vnitřní rotace a addukce pažní kosti; součást rotátorové manžety.",
    examNotes: "KE ZKOUŠCE (A12): Ze čtyř svalů rotátorové manžety je tento podle skript vnitřním rotátorem.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "coracobrachialis",
    lat: "M. coracobrachialis",
    cz: "hákový sval",
    system: "Ramenní kloub",
    module: "mod-5",
    origo: "Začíná spolu s krátkou hlavou bicepsu na hákovitém výběžku lopatky.",
    insertio: "Upíná se na vnitřní stranu pažní kosti.",
    function: "Zapojuje se do předpažení a addukce; podle skript může paži rotovat oběma směry.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },

  // ELBOW / ARM
  {
    id: "biceps-brachii",
    lat: "M. biceps brachii",
    cz: "dvojhlavý sval pažní",
    system: "Loketní kloub",
    module: "mod-6",
    origo: "Dlouhá hlava začíná na lopatce nad jamkou ramenního kloubu. Krátká hlava začíná na hákovitém výběžku lopatky.",
    insertio: "Upíná se na hrbolek vřetenní kosti (tuberositas radii).",
    function: "Dominantní je flexe předloktí, současně supinace předloktí. V ramenním kloubu se dlouhá hlava zapojuje do abdukce a krátká do addukce a flexe.",
    examNotes: "KE ZKOUŠCE (A16, A20): A16: Úpon bicepsu lokalizuj na vřetenní kost. A20: Příklad vícekloubového svalu.",
    unusualFormulation: "Poznámka: Je zapojen do pohybu ve dvou kloubech - rameni a lokti.",
    tonicPhasic: null,
    multiJoint: true
  },
  {
    id: "brachialis",
    lat: "M. brachialis",
    cz: "hluboký sval pažní",
    system: "Loketní kloub",
    module: "mod-6",
    origo: "Začíná na distální, tedy od trupu vzdálenější, polovině pažní kosti.",
    insertio: "Upíná se na loketní kost v proximální, tedy k trupu bližší, třetině.",
    function: "Provádí flexi předloktí a svým úponem na kloubním pouzdru stabilizuje loketní kloub.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "brachioradialis",
    lat: "M. brachioradialis",
    cz: "sval vřetenní",
    system: "Loketní kloub",
    module: "mod-6",
    origo: "Začíná na distální polovině pažní kosti na palcové straně předloktí.",
    insertio: "Upíná se na vřetenní kost.",
    function: "Je flexorem loketního kloubu a podle skript se zapojuje i do supinace.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "triceps-brachii",
    lat: "M. triceps brachii",
    cz: "trojhlavý sval pažní",
    system: "Loketní kloub",
    module: "mod-6",
    origo: "Dlouhá hlava začíná pod jamkou ramenního kloubu. Zevní hlava na zevní straně pažní kosti. Vnitřní hlava na vnitřní ploše pažní kosti.",
    insertio: "Všechny tři hlavy přecházejí do společné šlachy a upínají se na okovec (olecranon) loketní kosti.",
    function: "Společná aktivita všech hlav vyvolává extenzi v lokti; dlouhá hlava se zapojuje do addukce v ramenním kloubu.",
    examNotes: null,
    unusualFormulation: "Poznámka: Dlouhá hlava je dvoukloubová, vnitřní a zevní hlava jsou jednokloubové.",
    tonicPhasic: null
  },

  // THORAX
  {
    id: "diaphragma",
    lat: "Diaphragma",
    cz: "bránice",
    system: "Hrudník & HSS",
    module: "mod-7",
    origo: "Bederní část: těla prvního až třetího bederního obratle (L1-L3). Žeberní část: chrupavky sedmého až dvanáctého žebra. Hrudní/sternální část: mečovitý výběžek hrudní kosti.",
    insertio: "Upíná se do šlašitých vláken tvořících šlašitý střed (centrum tendineum).",
    function: "Hlavní vdechový sval; skripta uvádějí až 60 % objemu vdechovaného vzduchu. Podílí se na břišním lisu. Při kontrakci se oplošťuje a šlašitý střed se posouvá dolů, čímž se zvětšuje hrudní dutina.",
    examNotes: "KE ZKOUŠCE (A13): Bránice je jedna ze 4 složek HSS.",
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "intercostales-externi",
    lat: "Mm. intercostales externi",
    cz: "vnější mezižeberní svaly",
    system: "Hrudník",
    module: "mod-7",
    origo: "Začínají těsně u páteře na spodním okraji žebra a vedou dolů a vpřed.",
    insertio: "Upínají se na horní okraj následujícího žebra.",
    function: "Zdvihají žebra a rozšiřují hrudní dutinu - nádechové svaly.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },
  {
    id: "intercostales-interni",
    lat: "Mm. intercostales interni",
    cz: "vnitřní mezižeberní svaly",
    system: "Hrudník",
    module: "mod-7",
    origo: "Začínají na horním okraji žebra a vedou opačným směrem než vnější mezižeberní svaly.",
    insertio: "Upínají se na spodní okraj sousedního žebra.",
    function: "Táhnou žebra dolů - výdechové svaly.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },

  // ABDOMEN
  {
    id: "rectus-abdominis",
    lat: "M. rectus abdominis",
    cz: "přímý sval břišní",
    system: "Břišní stěna",
    module: "mod-8",
    origo: "Začíná na chrupavkách pátého až sedmého žebra a na mečovitém výběžku hrudní kosti.",
    insertio: "Upíná se na stydkou kost zevně od stydké spony.",
    function: "Stahuje žebra dolů a napomáhá výdechu. Předklání trup. Při fixaci trupu zdvihá pánev a zmenšuje bederní lordózu. Podílí se na břišním lisu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "obliquus-externus-abdominis",
    lat: "M. obliquus externus abdominis",
    cz: "zevní šikmý sval břišní",
    system: "Břišní stěna",
    module: "mod-8",
    origo: "Začíná na pátém až dvanáctém žebru.",
    insertio: "Upíná se do bílé čáry (linea alba) a částečně na hřeben kyčelní kosti.",
    function: "Oboustranně provádí flexi trupu a zdvih pánve; je synergistou přímého břišního svalu. Jednostranně podle skript rotuje pánev na opačnou stranu.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "obliquus-internus-abdominis",
    lat: "M. obliquus internus abdominis",
    cz: "vnitřní šikmý sval břišní",
    system: "Břišní stěna",
    module: "mod-8",
    origo: "Začíná od fascie bederní páteře a hřebene kyčelní kosti.",
    insertio: "Upíná se na poslední žebra a do bílé čáry (linea alba).",
    function: "Skripta uvádějí obdobnou funkci jako u šikmých břišních svalů a u jednostranné kontrakce formulaci o rotaci trupu na opačnou stranu.",
    examNotes: null,
    unusualFormulation: "Poznámka ze skript: Formulace funkce je v dodaných skriptech na tomto místě nejasná; v osnově ji nepřepisujeme podle jiného zdroje.",
    tonicPhasic: "tonic"
  },
  {
    id: "transversus-abdominis",
    lat: "M. transversus abdominis",
    cz: "příčný sval břišní",
    system: "Břišní stěna & HSS",
    module: "mod-8",
    origo: "Začíná na vnitřní ploše sedmého až dvanáctého žebra, od bederní fascie a hrany kyčelní kosti.",
    insertio: "Upíná se do bílé čáry (linea alba) a tvoří vazivový obal přímého břišního svalu.",
    function: "Je důležitý pro správnou funkci povrchových svalů břišní stěny, účastní se břišního lisu a je výdechovým svalem. V části o stabilizaci je jednou ze 4 složek HSS.",
    examNotes: "KE ZKOUŠCE (A13): Příčný sval břišní je jednou ze 4 složek HSS.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "quadratus-lumborum",
    lat: "M. quadratus lumborum",
    cz: "čtyřhranný sval bederní",
    system: "Břišní stěna",
    module: "mod-8",
    origo: "Začíná na hraně kyčelní kosti a výběžcích prvního až čtvrtého bederního obratle (L1-L4).",
    insertio: "Upíná se na dvanácté žebro.",
    function: "Oboustranně provádí extenzi bederní páteře; jednostranně uklání trup na svou stranu.",
    examNotes: null,
    unusualFormulation: "Poznámka ze skript: Skripta výslovně upozorňují, že některé zdroje uvádějí opačný průběh začátku a úponu.",
    tonicPhasic: "tonic"
  },

  // PELVIC FLOOR
  {
    id: "levator-ani",
    lat: "M. levator ani",
    cz: "zdvihač pánevního dna",
    system: "Pánevní dno & HSS",
    module: "mod-9",
    origo: "Skripta jej v anatomické části popisují jako sval pánevního dna rozdělený na vnitřní a vnější část.",
    insertio: "V dodaném textu anatomické části není popsán samostatný kostní úpon tak jako u ostatních svalů.",
    function: "Je svěračem dutých orgánů a zdvihačem pánevního dna; u žen je důležitý pro udržení dělohy ve správné poloze. V části o stabilizaci patří svaly pánevního dna mezi 4 složky HSS.",
    examNotes: "KE ZKOUŠCE (A13): Svaly pánevního dna tvoří 4. složku HSS.",
    unusualFormulation: "V dodaném textu anatomické části není popsán samostatný kostní úpon tak jako u ostatních svalů.",
    tonicPhasic: "phasic"
  },

  // HIP JOINT
  {
    id: "iliopsoas",
    lat: "M. iliopsoas",
    cz: "bedrokyčlostehenní sval",
    system: "Kyčelní kloub - přední strana",
    module: "mod-10",
    origo: "Je složen z bederní části (psoas major et minor), která začíná na bederních obratlích, a kyčelní části (iliacus), která začíná na vnitřním povrchu kyčelní kosti.",
    insertio: "Upíná se na malý chocholík stehenní kosti (trochanter minor).",
    function: "Bederní část se samostatně zapojuje do flexe trupu, kyčelní část do předklonu pánve. Jako celek je podle skript dominantním svalem výkroku při běhu nebo chůzi.",
    examNotes: "KE ZKOUŠCE (A15, A17): Úpon iliopsoasu = malý chocholík stehenní kosti (trochanter minor). Patří mezi flexory kyčelního kloubu.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "gluteus-maximus",
    lat: "M. gluteus maximus",
    cz: "velký sval hýžďový",
    system: "Kyčelní kloub - zevní svaly",
    module: "mod-10",
    origo: "Začíná na zevní ploše lopaty kyčelní kosti, křížové kosti a kostrči.",
    insertio: "Horní snopce přecházejí do povázky na zevní straně stehna; dolní snopce se upínají na hýžďový výběžek stehenní kosti.",
    function: "Provádí extenzi kyčelního kloubu, udržuje vzpřímené postavení trupu a zajišťuje stranovou stabilitu. Napomáhá addukci i abdukci a je zevním rotátorem. Je důležitý pro chůzi do kopce, schody, terén a výskok.",
    examNotes: "KE ZKOUŠCE (A18): Dominantní funkce gluteus maximus - zejména extenze kyčle; ve skriptech dále stabilita trupu a zevní rotace.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "gluteus-medius",
    lat: "M. gluteus medius",
    cz: "střední sval hýžďový",
    system: "Kyčelní kloub - zevní svaly",
    module: "mod-10",
    origo: "Začíná na zevní ploše lopaty kyčelní kosti.",
    insertio: "Upíná se na velký chocholík stehenní kosti (trochanter major).",
    function: "Přední vlákna pomáhají flexi a vnitřní rotaci; zadní vlákna extenzi a vnější rotaci.",
    examNotes: "KE ZKOUŠCE (A19): Vnitřní rotátory kyčelního kloubu - pamatuj přední vlákna gluteus medius.",
    unusualFormulation: null,
    tonicPhasic: "phasic"
  },
  {
    id: "tensor-fasciae-latae",
    lat: "M. tensor fasciae latae",
    cz: "napínač povázky stehenní",
    system: "Kyčelní kloub - zevní svaly",
    module: "mod-10",
    origo: "Začíná na trnu kyčelní kosti (spina iliaca).",
    insertio: "Svalové snopce přecházejí do povázky na zevní straně stehna a ta se upíná na zevní kondyl holenní kosti.",
    function: "Napíná stehenní povázku, jejím tahem napomáhá extenzi kolennního kloubu ve stoji. V kyčli se účastní flexe, abdukce a slabě i vnitřní rotace.",
    examNotes: "KE ZKOUŠCE (A19): TFL patří mezi svaly, které se podílejí na vnitřní rotaci kyčle.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "pectineus",
    lat: "M. pectineus",
    cz: "hřebenový sval",
    system: "Kyčelní kloub - vnitřní strana (adduktory)",
    module: "mod-10",
    origo: "Začíná na hraně stydké kosti.",
    insertio: "Upíná se na stehenní kost.",
    function: "Addukce, flexe a zevní rotace stehna.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "adductor-brevis",
    lat: "M. adductor brevis",
    cz: "krátký přitahovač",
    system: "Kyčelní kloub - vnitřní strana (adduktory)",
    module: "mod-10",
    origo: "Začíná na stydké kosti.",
    insertio: "Upíná se na stehenní kost.",
    function: "Addukce, flexe a zevní rotace stehna.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "adductor-longus",
    lat: "M. adductor longus",
    cz: "dlouhý přitahovač",
    system: "Kyčelní kloub - vnitřní strana (adduktory)",
    module: "mod-10",
    origo: "Začíná na stydké kosti.",
    insertio: "Upíná se na stehenní kost.",
    function: "Addukce, flexe a zevní rotace stehna.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "adductor-magnus",
    lat: "M. adductor magnus",
    cz: "velký přitahovač",
    system: "Kyčelní kloub - vnitřní strana (adduktory)",
    module: "mod-10",
    origo: "Začíná na stydké a sedací kosti.",
    insertio: "Upíná se vějířovitě na stehenní kost.",
    function: "Mohutná addukce; současně částečná flexe i extenze stehna.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "gracilis",
    lat: "M. gracilis",
    cz: "štíhlý přitahovač",
    system: "Kyčelní kloub - vnitřní strana (adduktory)",
    module: "mod-10",
    origo: "Začíná na stydké kosti.",
    insertio: "Upíná se na vnitřní kondyl holenní kosti.",
    function: "Addukce stehna a flexe bérce; ve flexi může bérec vnitřně rotovat.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: null
  },

  // THIGH / KNEE JOINT
  {
    id: "quadriceps-femoris",
    lat: "M. quadriceps femoris",
    cz: "čtyřhlavý sval stehenní",
    system: "Kolenní kloub",
    module: "mod-11",
    origo: "M. rectus femoris: začíná u horní jamky kyčelního kloubu (jediná část vícekloubová). M. vastus lateralis: zevní plocha stehenní kosti. M. vastus medialis: vnitřní plocha stehenní kosti. M. vastus intermedius: přední plocha stehenní kosti.",
    insertio: "Nad kolenem přechází do společné šlachy, která překrývá čéšku; částečně se upíná na čéšku a hlavní část na holenní kost.",
    function: "Nejdůležitější funkcí je extenze kolenního kloubu. M. rectus femoris se podílí také na flexi kyčelního kloubu. Vastus medialis a lateralis jsou podle skript důležité pro stabilní postavení čéšky.",
    examNotes: "KE ZKOUŠCE (A15, A20): Rectus femoris je vícekloubový a zároveň patří mezi flexory kyčle.",
    unusualFormulation: null,
    tonicPhasic: "both",
    tonicPhasicNote: "M. rectus femoris je tonický sval. Vastus medialis a vastus lateralis jsou fázické svaly."
  },
  {
    id: "sartorius",
    lat: "M. sartorius",
    cz: "krejčovský sval",
    system: "Kolenní kloub",
    module: "mod-11",
    origo: "Začíná na trnu kyčelní kosti.",
    insertio: "Vede přes celé stehno dolů a dovnitř a upíná se na vnitřní kondyl holenní kosti.",
    function: "Flexe, abdukce a zevní rotace stehna. S bércem vykonává flexi a vnitřní rotaci.",
    examNotes: "KE ZKOUŠCE (A11, A20): Nejdelší sval lidského těla = m. sartorius. Je příkladem vícekloubového svalu.",
    unusualFormulation: null,
    tonicPhasic: null,
    multiJoint: true
  },
  {
    id: "biceps-femoris",
    lat: "M. biceps femoris",
    cz: "dvojhlavý sval stehenní",
    system: "Zadní strana stehna (Hamstringy)",
    module: "mod-11",
    origo: "Dlouhá hlava začíná na výběžku sedací kosti; krátká hlava na stehenní kosti.",
    insertio: "Obě hlavy se spojují a upínají na hlavici lýtkové kosti (fibuly).",
    function: "Dlouhá hlava se v kyčli podílí na extenzi a addukci. V koleni obě hlavy provádějí flexi a zevní rotaci bérce.",
    examNotes: "KE ZKOUŠCE (A21, A20): Biceps femoris, semimembranosus a semitendinosus jsou hamstringy. Dlouhá hlava je vícekloubová.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "semimembranosus",
    lat: "M. semimembranosus",
    cz: "sval poloblanitý",
    system: "Zadní strana stehna (Hamstringy)",
    module: "mod-11",
    origo: "Začíná na hrbolku sedací kosti.",
    insertio: "Upíná se v několika částech na vnitřní straně holenní kosti a v jamce kolenního kloubu.",
    function: "Extenze a addukce v kyčli, flexe bérce a vnitřní rotace bérce ve flexi.",
    examNotes: "KE ZKOUŠCE (A21): Součást hamstringů.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },
  {
    id: "semitendinosus",
    lat: "M. semitendinosus",
    cz: "sval pološlašitý",
    system: "Zadní strana stehna (Hamstringy)",
    module: "mod-11",
    origo: "Začíná na výběžku sedací kosti.",
    insertio: "Upíná se na vnitřní kondyl holenní kosti.",
    function: "Funkčně je podle skript stejný jako m. semimembranosus.",
    examNotes: "KE ZKOUŠCE (A21): Hamstringy se vůči gluteus maximus podílejí na extenzi kyčle v synergické roli.",
    unusualFormulation: null,
    tonicPhasic: "tonic"
  },

  // LOWER LEG / ANKLE / FOOT
  {
    id: "tibialis-anterior",
    lat: "M. tibialis anterior",
    cz: "přední sval holenní",
    system: "Bérec a hlezen",
    module: "mod-12",
    origo: "Začíná na zevní straně holenní kosti.",
    insertio: "Upíná se na kůstky nožní klenby.",
    function: "Skripta uvádějí: „palmární flexe nohy a inverze (supinace)“, dále udržování podélné klenby a významnou aktivaci při chůzi.",
    examNotes: null,
    unusualFormulation: "NEOBVYKLÁ FORMULACE ZE SKRIPT: Termín „palmární flexe nohy“ je takto uveden přímo v dodaných skriptech; v osnově jej záměrně neopravujeme podle jiných zdrojů.",
    tonicPhasic: "phasic"
  },
  {
    id: "gastrocnemius",
    lat: "M. gastrocnemius",
    cz: "dvojhlavý sval lýtkový",
    system: "Bérec a hlezen",
    module: "mod-12",
    origo: "Obě hlavy začínají na stehenní kosti na příslušných kondylech.",
    insertio: "Přechází do Achillovy šlachy a spolu se soleem se upíná na hrbol patní kosti.",
    function: "Napomáhá flexi kolenního kloubu; nejdůležitější je plantární flexe hlezenního kloubu, zejména při dynamických pohybech.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic" // součást m. triceps surae
  },
  {
    id: "soleus",
    lat: "M. soleus",
    cz: "šikmý sval lýtkový",
    system: "Bérec a hlezen",
    module: "mod-12",
    origo: "Začíná od hlavičky lýtkové kosti.",
    insertio: "Má stejný úpon jako m. gastrocnemius - přes Achillovu šlachu na hrbol patní kosti.",
    function: "Zapojuje se do statických poloh v hlezenním kloubu a plní především posturální funkci; podle skript mění svou aktivitou sklon holenní kosti.",
    examNotes: null,
    unusualFormulation: null,
    tonicPhasic: "tonic" // součást m. triceps surae
  }
];

export const HSS_COMPONENTS = [
  {
    id: "hss-1",
    name: "Bránice",
    lat: "Diaphragma thoracis",
    role: "Hlavní nádechový sval a zároveň významný stabilizační sval; má zásadní vliv na regulaci nitrobřišního tlaku."
  },
  {
    id: "hss-2",
    name: "Příčný sval břišní",
    lat: "M. transversus abdominis",
    role: "Hluboký břišní sval, který se podílí na břišním lisu a stabilizaci."
  },
  {
    id: "hss-3",
    name: "Multifidy",
    lat: "Mm. multifidi",
    role: "Hluboké svaly páteře, které zajišťují lokální kontrolu jednotlivých segmentů."
  },
  {
    id: "hss-4",
    name: "Svaly pánevního dna",
    lat: "Diaphragma pelvis / M. levator ani",
    role: "Tvoří spodní část stabilizačního systému trupu."
  }
];

export const TONIC_PHASIC_DATA = {
  tonic: {
    name: "Tonické svaly (převážně posturální)",
    properties: "Převaha oxidativních vláken; déle pracují; mají tendenci ke zkrácení.",
    muscles: [
      "m. triceps surae (gastrocnemius + soleus)",
      "hamstringy (biceps femoris, semimembranosus, semitendinosus)",
      "bederní část vzpřimovačů páteře",
      "m. quadratus lumborum",
      "adduktory stehna (pectineus, adductor brevis/longus/magnus)",
      "m. piriformis",
      "m. rectus femoris",
      "m. tensor fasciae latae",
      "m. iliopsoas",
      "šikmé břišní svaly (obliqui)",
      "m. pectoralis minor et major",
      "m. subscapularis",
      "horní část m. trapezius",
      "m. levator scapulae",
      "m. sternocleidomastoideus",
      "flexory ruky a prstů"
    ]
  },
  phasic: {
    name: "Fázické svaly (převážně hybné)",
    properties: "Převaha rychlých vláken; rychleji se unaví; mají tendenci k oslabení.",
    muscles: [
      "hluboké flexory hlavy a krku",
      "extenzory horních končetin",
      "m. deltoideus",
      "dolní a střední část m. trapezius",
      "svaly rombické (minor et major)",
      "m. serratus anterior",
      "m. supraspinatus",
      "m. infraspinatus",
      "hrudní část vzpřimovačů páteře",
      "mm. multifidi",
      "hluboké rotátory páteře (rotatores)",
      "m. rectus abdominis",
      "m. transversus abdominis",
      "pánevní dno",
      "gluteální svaly (gluteus maximus, medius)",
      "m. tibialis anterior",
      "extenzory prstů nohy",
      "vastus medialis et lateralis"
    ]
  },
  dysbalanceNote: "DYSBALANCE: Špatná distribuce svalového tonu vede ke svalové nerovnováze. Skripta jako typické příklady uvádějí horní a dolní zkřížený syndrom."
};

export const EXAM_TEST_QUESTIONS = [
  {
    id: "A1",
    question: "Začátek a konec hlubokých šíjových svalů",
    answer: "C1-C2 (atlas/čepovec) a týlní kost / atlas podle konkrétního svalu.",
    detail: "M. rectus capitis posterior minor (C1 -> týlní kost), major (C2 -> týlní kost), M. obliquus capitis superior (C1 -> týlní kost), inferior (C2 -> C1).",
    module: "mod-3"
  },
  {
    id: "A2",
    question: "Do jakého systému patří multifidi a rotatores?",
    answer: "Transverzospinální systém.",
    detail: "Začínají na příčných výběžcích a upínají se na trnové výběžky.",
    module: "mod-2"
  },
  {
    id: "A3",
    question: "V jaké oblasti hledáme m. splenius capitis et cervicis?",
    answer: "Krční a horní hrudní oblast.",
    detail: "Začátek na trnech C6-Th6, úpon na příčné výběžky, týlní kost a bradavkový výběžek.",
    module: "mod-2"
  },
  {
    id: "A4",
    question: "Kolik částí má trapézový sval (m. trapezius)?",
    answer: "3 části (sestupnou, příčnou a vzestupnou).",
    detail: "Pars descendens (horní), pars transversa (střední), pars ascendens (dolní).",
    module: "mod-4"
  },
  {
    id: "A5",
    question: "Jaký je úpon malého prsního svalu (m. pectoralis minor)?",
    answer: "Hákovitý výběžek lopatky (processus coracoideus).",
    detail: "Začíná na 3.-5. žebru.",
    module: "mod-4"
  },
  {
    id: "A6",
    question: "Jaká je hlaví funkce m. serratus anterior (přední pilovitý sval)?",
    answer: "Fixace lopatky k hrudníku + tah spodního úhlu zevně; pomoc při předpažení/vzpažení.",
    detail: "Při poruše křídlovité odstávání lopatky.",
    module: "mod-4"
  },
  {
    id: "A7",
    question: "Které jsou 3 části m. pectoralis major?",
    answer: "Klíčková část (pars clavicularis), hrudní část (pars sternocostalis), břišní část (pars abdominalis).",
    detail: "Všechny se upínají na hranu velkého hrbolku pažní kosti.",
    module: "mod-5"
  },
  {
    id: "A8",
    question: "Z hlediska rotace je m. teres major jaký rotátor?",
    answer: "Vnitřní rotátor.",
    detail: "Synergista širokého svalu zádového (addukce, extenze, vnitřní rotace).",
    module: "mod-5"
  },
  {
    id: "A9",
    question: "Z hlediska rotace je m. teres minor jaký rotátor?",
    answer: "Vnější rotátor.",
    detail: "Součást rotátorové manžety, upíná se na velký hrbolek pažní kosti.",
    module: "mod-5"
  },
  {
    id: "A10",
    question: "Co je klíčové vědět o m. supraspinatus?",
    answer: "Rotátorová manžeta + spouští abdukci do 90° + stabilizace ramene.",
    detail: "Začíná ve fossa supraspinata, upíná se na velký hrbolek pažní kosti.",
    module: "mod-5"
  },
  {
    id: "A11",
    question: "Který je nejdelší sval lidského těla?",
    answer: "M. sartorius (krejčovský sval).",
    detail: "Začíná na trnu kyčelní kosti, upíná se na vnitřní kondyl holenní kosti.",
    module: "mod-11"
  },
  {
    id: "A12",
    question: "Které 4 svaly tvoří rotátorovou manžetu?",
    answer: "M. supraspinatus, m. infraspinatus, m. teres minor, m. subscapularis.",
    detail: "Zapamatuj si: m. teres major tam NEPATŘÍ!",
    module: "mod-5"
  },
  {
    id: "A13",
    question: "Které jsou 4 složky Hlubokého stabilizačního systému (HSS)?",
    answer: "Bránice + transversus abdominis + multifidi + svaly pánevního dna.",
    detail: "Diaphragma, M. transversus abdominis, Mm. multifidi, Diaphragma pelvis.",
    module: "mod-13"
  },
  {
    id: "A14",
    question: "Kde je úpon m. pectoralis major?",
    answer: "Hrana velkého hrbolku pažní kosti.",
    detail: "Uvedeno u anatomie ramenního kloubu.",
    module: "mod-5"
  },
  {
    id: "A15",
    question: "Které svaly patří mezi flexory kyčelního kloubu?",
    answer: "Především iliopsoas; dále rectus femoris, TFL, přední vlákna gluteus medius.",
    detail: "Iliopsoas je podle skript dominantním svalem výkroku.",
    module: "mod-10"
  },
  {
    id: "A16",
    question: "Kde se upíná m. biceps brachii?",
    answer: "Hrbolek vřetenní kosti (tuberositas radii).",
    detail: "Dominantní flexor a supinátor předloktí.",
    module: "mod-6"
  },
  {
    id: "A17",
    question: "Kde se upíná m. iliopsoas?",
    answer: "Malý chocholík stehenní kosti (trochanter minor).",
    detail: "Složen z psoas major/minor a iliacus.",
    module: "mod-10"
  },
  {
    id: "A18",
    question: "Jaké jsou hlavní funkce m. gluteus maximus podle skript?",
    answer: "Extenze kyčle + stranová stabilita trupu + zevní rotace.",
    detail: "Pomáhá addukci i abdukci, důležitý pro chůzi do kopce a schody.",
    module: "mod-10"
  },
  {
    id: "A19",
    question: "Které svaly se podle skript podílejí na vnitřní rotaci kyčle?",
    answer: "Přední vlákna m. gluteus medius a slabě m. tensor fasciae latae (TFL).",
    detail: "Uvedeno v KE ZKOUŠCE rámečcích.",
    module: "mod-10"
  },
  {
    id: "A20",
    question: "Uveď příklady vícekloubových svalů ze skript.",
    answer: "Nápř. biceps brachii, rectus femoris, dlouhá hlava biceps femoris, sartorius.",
    detail: "Pohybují ve dvou nebo více kloubech.",
    module: "mod-1"
  },
  {
    id: "A21",
    question: "Jakou roli mají hamstringy vůči m. gluteus maximus při extenzi kyčle?",
    answer: "Funkčně spolupracují na extenzi kyčle (synergická role).",
    detail: "Hamstringy = biceps femoris, semimembranosus, semitendinosus.",
    module: "mod-11"
  }
];

export const FINAL_CHECKLIST = [
  { id: "c1", category: "Základy", text: "Umím základní směry a pohyby: flexe, extenze, abdukce, addukce, rotace, pronace, supinace." },
  { id: "c2", category: "Základy", text: "Umím agonista, antagonista, synergista a stabilizátor." },
  { id: "c3", category: "Základy", text: "Umím rozlišit tonické a fázické svaly a znám jejich příklady ze skript." },
  { id: "c4", category: "Záda & Krk", text: "Umím páteř a krk: splenius, erector spinae, spinalis, interspinales, intertransversarii, multifidi, rotatores, suboccipitales, scaleni, SCM." },
  { id: "c5", category: "Lopatka", text: "Umím lopatku: trapezius, rhomboidei, levator scapulae, pectoralis minor, subclavius, serratus anterior." },
  { id: "c6", category: "Rameno", text: "Umím rameno: pectoralis major, latissimus, teres major/minor, infraspinatus, supraspinatus, subscapularis, deltoideus, coracobrachialis." },
  { id: "c7", category: "Rameno", text: "Umím rotátorovou manžetu zpaměti (supraspinatus, infraspinatus, teres minor, subscapularis)." },
  { id: "c8", category: "Paže & Loket", text: "Umím paži/loket: biceps, brachialis, brachioradialis, triceps." },
  { id: "c9", category: "Hrudník & Břicho", text: "Umím hrudník a břicho: bránice, intercostales, rectus, obliqui, transversus, quadratus lumborum, pánevní dno." },
  { id: "c10", category: "Stabilizace", text: "Umím 4 složky HSS přesně (bránice, transversus, multifidy, pánevní dno)." },
  { id: "c11", category: "Kyčel", text: "Umím kyčel: iliopsoas, gluteus maximus/medius, TFL a adduktory." },
  { id: "c12", category: "Stehno & Koleno", text: "Umím stehno/koleno: quadriceps, sartorius, všechny 3 hamstringy." },
  { id: "c13", category: "Bérec", text: "Umím bérec: tibialis anterior, gastrocnemius, soleus." },
  { id: "c14", category: "Zkouška", text: "Umím odpovědět na A1–A21 bez nápovědy." }
];
