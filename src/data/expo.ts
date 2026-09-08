// Content for the Messiala (expo) page.
//
// Titles, studio and team names are proper nouns, so they live here as plain
// strings rather than in the translation files. Section headings and captions
// are translated (see the `expo` block in translations/et.json + en.json).
//
// The developer list is sourced from the TipiLAN 2026 game-dev showcase signup
// sheet. University / TalTech GameCamp teams live in `universities` instead.
//
// Logos were downloaded from the signup sheet's Drive folder into
// public/images/EXPO/gamedev/. `logo` / `image` stay optional (one team has no
// logo yet); cards fall back to a text tile when absent.

export interface DeveloperCard {
  /** Game / product name (proper noun, shown as-is). */
  title: string;
  /** Studio / team behind it. */
  studio: string;
  /** External link for the game (Steam, itch.io, etc.). Omitted when none yet. */
  url?: string;
  /** Logo image under /public. Rendered object-contain. Optional. */
  logo?: string;
}

export interface UniversityCard {
  /** Game name (proper noun, shown as-is). */
  title: string;
  /** Team / course that made it. */
  team: string;
  /** External link for the game. Omitted when none. */
  url?: string;
  /** Thumbnail under /public. Optional. */
  image?: string;
  /** Render the image object-contain (a logo) instead of object-cover (a screenshot). */
  contain?: boolean;
}

// Studio / commercial teams (order follows the signup sheet).
export const developers: DeveloperCard[] = [
  {
    title: "ORMS",
    studio: "Rhea Games",
    url: "https://store.steampowered.com/app/3743150/ORMS/",
    logo: "/images/EXPO/gamedev/orms.png",
  },
  {
    title: "Grandpa's Bee Haven",
    studio: "Kickstart Now",
    url: "https://store.steampowered.com/app/3209160/Grandpas_Bee_Haven/",
    logo: "/images/EXPO/gamedev/grandpas_bee_haven.png",
  },
  {
    title: "walk",
    studio: "bilge",
    url: "https://store.steampowered.com/app/4563880/walk/",
    logo: "/images/EXPO/gamedev/walk.png",
  },
  {
    title: "War-Torn",
    studio: "Moccer Interactive",
    url: "https://kingoftheend.itch.io/war-torn",
    logo: "/images/EXPO/gamedev/war_torn.png",
  },
  {
    title: "Machine Party",
    studio: "Mike Klubnika",
    url: "https://store.steampowered.com/app/4108000/Machine_Party/",
    logo: "/images/EXPO/gamedev/machine_party.png",
  },
  {
    title: "Manala: Equinox War",
    studio: "OÜ Kilbirivi",
    url: "https://store.steampowered.com/app/4898080/Manala_Equinox_War/",
    logo: "/images/EXPO/gamedev/manala.png",
  },
  {
    title: "Toimkonna simulator",
    studio: "M4rtenn",
    url: "https://store.steampowered.com/app/4834280/Toimkonna_simulator/",
    logo: "/images/EXPO/gamedev/toimkonna_simulator.png",
  },
  {
    title: "MULTIMATUM",
    studio: "DeepDevelopment Games",
    logo: "/images/EXPO/gamedev/multimatum.png",
  },
  {
    title: "SELF STORM",
    studio: "Triple Trigger",
    url: "https://taavippp.itch.io/self-storm",
    logo: "/images/EXPO/gamedev/self_storm.svg",
  },
  {
    title: "JazzWitch",
    studio: "VuKaan",
    url: "https://store.steampowered.com/app/4952960/JazzWitch/",
    logo: "/images/EXPO/gamedev/jazzwitch.png",
  },
  {
    title: "Hearthland",
    studio: "Best mäng OÜ",
    logo: "/images/EXPO/gamedev/hearthland.png",
  },
  {
    title: "Bullosseum",
    studio: "Pullivennad",
    url: "https://bullosseum.richard.work/",
    logo: "/images/EXPO/gamedev/bullosseum.png",
  },
  {
    title: "Hardwired",
    studio: "Lostbyte",
    url: "https://store.steampowered.com/app/3682210/Hardwired/",
    logo: "/images/EXPO/gamedev/hardwired.png",
  },
  {
    title: "Osta",
    studio: "Cup",
    url: "https://store.steampowered.com/app/3997240/Osta/",
    logo: "/images/EXPO/gamedev/osta.png",
  },
  {
    title: "Midnight Clinic",
    studio: "HRA Interactive",
    logo: "/images/EXPO/gamedev/midnight_clinic.png",
  },
  {
    title: "Midnight Souvenirs",
    studio: "Path of Pixels",
    url: "https://store.steampowered.com/app/3623230/Midnight_Souvenirs",
    logo: "/images/EXPO/gamedev/midnight_souvenirs.png",
  },
  {
    title: "Estonian Language Learning Games",
    studio: "Estonian Language Self Study Club",
    url: "https://www.instagram.com/estonian_studyclub/",
    logo: "/images/EXPO/gamedev/estonian_language.png",
  },
];

// University / TalTech GameCamp teams.
export const universities: UniversityCard[] = [
  {
    title: "Dwarf Escape",
    team: 'TalTech GameCamp ("Mõmmid")',
    url: "https://ihorsylin.itch.io/dwarf-escape",
    image: "/images/EXPO/ylikoolid/dwarf_escape.png",
  },
  {
    title: "Packet Tracers",
    team: "TalTech IT-teaduskond",
    url: "https://alacrisdevs.itch.io/packet-tracers",
    image: "/images/EXPO/ylikoolid/packet_tracers.png",
  },
  {
    title: "OH CRAP!",
    team: 'TalTech GameCamp ("Skill Issue")',
    url: "https://heavybro.itch.io/oh-crap",
    image: "/images/EXPO/ylikoolid/oh_crap.png",
  },
  {
    title: "Void of Hermes",
    team: 'TalTech GameCamp ("OnlyFun")',
    url: "https://ron88.itch.io/voidofhermes",
    image: "/images/EXPO/ylikoolid/void_of_hermes.png",
  },
  {
    title: "Eelloon",
    team: "TalTech",
    image: "/images/EXPO/gamedev/eelloon.png",
    contain: true,
  },
];
