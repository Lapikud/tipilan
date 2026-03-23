// TipiLAN 2026 event date — September 11, 17:00 Estonian time (EEST = UTC+3)
export const EVENT_DATE = new Date("2026-09-11T17:00:00+03:00");

export interface CarouselSlide {
  titleKey: string;
  descKey: string;
  bgImage: string;
  heroImage: string;
  layout: "left" | "right";
}

export const SLIDES: CarouselSlide[] = [
  {
    titleKey: "teaser.compete.title",
    descKey: "teaser.compete.description",
    bgImage: "/images/backgrounds/compete_teaser.webp",
    heroImage: "/images/heros/compete_hero.webp",
    layout: "left",
  },
  {
    titleKey: "teaser.play.title",
    descKey: "teaser.play.description",
    bgImage: "/images/backgrounds/play_teaser.webp",
    heroImage: "/images/heros/play_hero.webp",
    layout: "right",
  },
  {
    titleKey: "teaser.explore.title",
    descKey: "teaser.explore.description",
    bgImage: "/images/backgrounds/explore_teaser.webp",
    heroImage: "/images/heros/explore_hero.webp",
    layout: "left",
  },
];

