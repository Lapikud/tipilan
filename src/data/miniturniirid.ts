// Content for the Miniturniirid (mini-tournaments) page.
//
// Game titles and prize amounts are proper nouns / language-neutral, so they
// live here as plain strings rather than in the translation files (same
// convention as src/data/expo.ts). Page headings and button labels are
// translated (see the `minipage` block in translations/et.json + en.json).
//
// Cover images live in public/images/miniturniirid/. `image` is optional and
// games without artwork fall back to a text tile showing the title.

export type MiniTournamentCategory = "simRacing" | "fightingGames" | "other";
export type PrizePool = string | "giftBags";

export interface MiniTournament {
  /** Game name (proper noun, shown as-is). */
  title: string;
  /** Category used to group tournaments on the page. */
  category: MiniTournamentCategory;
  /** Total prize pool, including non-cash prizes where applicable. */
  prizePool: PrizePool;
  /** Prizes for first through fourth place. */
  placements: string[];
  /** Tournament format, when it is part of the published name. */
  format?: string;
  /** Whether the tournament also awards gift bags alongside its cash pool. */
  includesGiftBags?: boolean;
  /** Organization running the tournament, when one has been confirmed. */
  organizer?: string;
  /** Public organizer page. */
  organizerUrl?: string;
  /** Cover image under /public. Rendered object-cover. Optional. */
  image?: string;
}

export const miniTournaments: MiniTournament[] = [
  {
    title: "GT7",
    category: "simRacing",
    organizer: "Red Bull",
    organizerUrl: "https://www.redbull.com/ee-et/",
    prizePool: "200€",
    placements: ["100€", "60€", "40€"],
    image: "/images/miniturniirid/gran_turismo.jpg",
  },
  {
    title: "WRC, Dirt Rally 2",
    category: "simRacing",
    organizer: "EVAL",
    organizerUrl: "https://www.simracing.ee/",
    prizePool: "350€",
    placements: ["200€", "100€", "50€", "Kinkekott ainult"],
    includesGiftBags: true,
    image: "/images/miniturniirid/wrc.jpg",
  },
  {
    title: "Tekken 8",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/tekken8.jpg",
  },
  {
    title: "Street Fighter 6",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/street_fighter.jpg",
  },
  {
    title: "2XKO",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/2xko.png",
  },
  {
    title: "Super Smash Bros. Ultimate",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/super_smash_bros.jpg",
  },
  {
    title: "Invincible Vs.",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/invincible_vs.png",
  },
  {
    title: "Marvel Tokon: Fighting Souls",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/marvel_tokon.png",
  },
  {
    title: "Avatar Legends: The Fighting Game",
    category: "fightingGames",
    organizer: "BFGL",
    organizerUrl: "https://www.instagram.com/baltic_fighting_game_league/",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/avatar_legends.jpg",
  },
  {
    title: "EA FC",
    category: "other",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/fc26.jpg",
  },
  {
    title: "osu!",
    category: "other",
    prizePool: "100€",
    placements: ["50€", "30€", "20€"],
    image: "/images/miniturniirid/osu.jpg",
  },
  {
    title: "Counter-Strike 1.6",
    category: "other",
    organizer: "K-space",
    organizerUrl: "https://k-space.ee/",
    prizePool: "giftBags",
    placements: ["Kinkekott", "Kinkekott", "Kinkekott", "Kinkekott"],
    image: "/images/miniturniirid/cs16.jpg",
  },
  {
    title: "Quake",
    category: "other",
    prizePool: "giftBags",
    placements: ["Kinkekott", "Kinkekott", "Kinkekott", "Kinkekott"],
    image: "/images/miniturniirid/quake.jpg",
  },
  {
    title: "Rocket League",
    category: "other",
    format: "2v2",
    prizePool: "50€",
    placements: ["25€ + 25€", "Kinkekott 2x", "Kinkekott 2x"],
    includesGiftBags: true,
    image: "/images/miniturniirid/rocket_league.jpg",
  },
  {
    title: "Dwarf Escape",
    category: "other",
    prizePool: "50€",
    placements: ["25€", "15€", "10€"],
    image: "/images/miniturniirid/dwarf_escape.png",
  },
];
