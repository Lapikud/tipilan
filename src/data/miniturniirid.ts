// Content for the Miniturniirid (mini-tournaments) page.
//
// Game titles and prize amounts are proper nouns / language-neutral, so they
// live here as plain strings rather than in the translation files (same
// convention as src/data/expo.ts). Page headings and button labels are
// translated (see the `minipage` block in translations/et.json + en.json).
//
// Source of truth: the organizers' "MINITURNIIRID" sheet in Google Drive
// (TipiLAN 2026 → Messiala, last modified 2026-09-06). Total funded prize pool
// is 1600€ across all tournaments. Buckshot Roulette is intentionally NOT here:
// per the sheet it is a showcase/side activity, not a funded mini-tournament.
//
// Cover images live in public/images/miniturniirid/. `image` is optional: games
// without artwork yet (Avatar Legends, osu!, Counter-Strike 1.6, Rocket League,
// Quake) fall back to a text tile showing the title.

export interface MiniTournament {
  /** Game name (proper noun, shown as-is). */
  title: string;
  /** Prize pool for this tournament, e.g. "350€", or a non-cash prize ("Kinkekott"). */
  prize: string;
  /** Cover image under /public. Rendered object-cover. Optional. */
  image?: string;
}

export const miniTournaments: MiniTournament[] = [
  { title: "WRC", prize: "350€", image: "/images/miniturniirid/wrc.jpg" },
  {
    title: "Gran Turismo 7",
    prize: "200€",
    image: "/images/miniturniirid/gran_turismo.jpg",
  },
  {
    title: "Super Smash Bros. Ultimate",
    prize: "100€",
    image: "/images/miniturniirid/super_smash_bros.jpg",
  },
  {
    title: "Street Fighter 6",
    prize: "100€",
    image: "/images/miniturniirid/street_fighter.jpg",
  },
  { title: "Tekken 8", prize: "100€", image: "/images/miniturniirid/tekken8.jpg" },
  { title: "2XKO", prize: "100€", image: "/images/miniturniirid/2xko.png" },
  {
    title: "Invincible Vs.",
    prize: "100€",
    image: "/images/miniturniirid/invincible_vs.png",
  },
  {
    title: "Marvel Tokon",
    prize: "100€",
    image: "/images/miniturniirid/marvel_tokon.png",
  },
  { title: "FC 26", prize: "100€", image: "/images/miniturniirid/fc26.jpg" },
  {
    title: "Avatar Legends",
    prize: "100€",
    image: "/images/miniturniirid/avatar_legends.jpg",
  },
  { title: "osu!", prize: "100€", image: "/images/miniturniirid/osu.jpg" },
  {
    title: "Dwarf Escape",
    prize: "50€",
    image: "/images/miniturniirid/dwarf_escape.png",
  },
  {
    title: "Counter-Strike 1.6",
    prize: "50€",
    image: "/images/miniturniirid/cs16.jpg",
  },
  {
    title: "Rocket League",
    prize: "50€",
    image: "/images/miniturniirid/rocket_league.jpg",
  },
  { title: "Quake", prize: "Kinkekott", image: "/images/miniturniirid/quake.jpg" },
];
