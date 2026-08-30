// Content for the Messiala (expo) page.
//
// Titles, studio and team names are proper nouns, so they live here as plain
// strings rather than in the translation files. Section headings and captions
// are translated (see the `expo` block in translations/et.json + en.json).
//
// NOTE: only the four cards shown in the design mockup are listed here. More
// logos are available under public/images/EXPO/GameDev logos and
// public/images/EXPO/ylikoolid if this list should grow later.
// Paths use %20 for the space in the "GameDev logos" folder name.

export interface DeveloperCard {
  /** Game / product name (proper noun, shown as-is). */
  title: string;
  /** Studio behind it. TODO: confirm the two "Placeholder Gameworks" entries. */
  studio: string;
  /** Logo image under /public. Rendered object-contain in a bordered box. */
  logo: string;
  /** External link for the game title (opens in a new tab). */
  url: string;
}

export interface UniversityCard {
  /** Game name (proper noun, shown as-is). */
  title: string;
  /** Team / course that made it. */
  team: string;
  /** Landscape thumbnail under /public. Rendered object-cover. */
  image: string;
  /** External link for the game title (opens in a new tab). */
  url: string;
}

export const developers: DeveloperCard[] = [
  {
    title: "Broken Alliance",
    studio: "Placeholder Gameworks",
    logo: "/images/EXPO/GameDev%20logos/broken_alliance.png",
    url: "https://placeholder.games/",
  },
  {
    title: "Buckshot Roulette",
    studio: "Mike Klubnika",
    logo: "/images/EXPO/mklubi.jpg",
    url: "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
  },
  {
    title: "CraftCraft Simulator",
    studio: "Placeholder Gameworks",
    logo: "/images/EXPO/GameDev%20logos/craftcat_sim.png",
    url: "https://placeholder.games/",
  },
  {
    title: "CYBER DOC ROGUE",
    studio: "HRA Interactive",
    logo: "/images/EXPO/GameDev%20logos/Cyber_Doc_Rogue.png",
    url: "https://drive.google.com/drive/folders/1R6_3s92byAeHlKMeBP8f5ZnclUl5Wpj5?usp=sharing",
  },
];

export const universities: UniversityCard[] = [
  {
    title: "Dwarf Escape",
    team: 'TalTech GameCamp ("Mõmmid")',
    image: "/images/EXPO/ylikoolid/dwarf_escape.png",
    url: "https://ihorsylin.itch.io/dwarf-escape",
  },
  {
    title: "Packet Tracers",
    team: "TalTech IT-teaduskond",
    image: "/images/EXPO/ylikoolid/packet_tracers.png",
    url: "https://alacrisdevs.itch.io/packet-tracers",
  },
  {
    title: "OH CRAP!",
    team: 'TalTech GameCamp ("Skill Issue")',
    image: "/images/EXPO/ylikoolid/oh_crap.png",
    url: "https://heavybro.itch.io/oh-crap",
  },
  {
    title: "Void of Hermes",
    team: 'TalTech GameCamp ("OnlyFun")',
    image: "/images/EXPO/ylikoolid/void_of_hermes.png",
    url: "https://ron88.itch.io/voidofhermes",
  },
];
