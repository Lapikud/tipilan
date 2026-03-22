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
    bgImage: "/images/compete_teaser.png",
    heroImage: "/images/compete_hero.png",
    layout: "left",
  },
  {
    titleKey: "teaser.play.title",
    descKey: "teaser.play.description",
    bgImage: "/images/play_teaser.png",
    heroImage: "/images/play_hero.png",
    layout: "right",
  },
  {
    titleKey: "teaser.explore.title",
    descKey: "teaser.explore.description",
    bgImage: "/images/explore_teaser.png",
    heroImage: "/images/explore_hero.png",
    layout: "left",
  },
];

