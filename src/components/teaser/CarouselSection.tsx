"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SLIDES, type CarouselSlide } from "./constants";
import { BLUR_PLACEHOLDERS } from "@/lib/blurPlaceholders";

function blurKey(src: string) {
  return src.replace('/images/', '').replace(/\.\w+$/, '');
}

function CarouselSlideComponent({
  slide,
  t,
  isActive,
}: {
  slide: CarouselSlide;
  t: ReturnType<typeof useTranslations>;
  isActive: boolean;
}) {
  const isLeft = slide.layout === "left";

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={slide.bgImage}
        alt=""
        fill
        unoptimized
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDERS[blurKey(slide.bgImage)]}
        sizes="100vw"
        className="object-cover pointer-events-none"
      />

      {/* Content — top padding accounts for the floating heading */}
      <div
        className={`relative z-1 flex h-full gap-8 xl:gap-16 pt-[120px] px-8 xl:px-16 ${isLeft ? "items-end" : "items-end flex-row-reverse"
          }`}
      >
        {/* Text content */}
        <div
          className={`flex-1 flex h-full flex-col gap-6 xl:gap-12 justify-center pb-16 ${isLeft ? "items-start" : "items-end"
            }`}
        >
          <h2 className="text-subtitle text-text-light shadow-teaser">{t(slide.titleKey)}</h2>
          <p className={`text-p-lg text-text-light ${isLeft ? "text-left" : "text-right"}`}>
            {t(slide.descKey)}
          </p>
        </div>

        {/* Hero image — locked aspect ratio, enters from bottom, pinned to bottom */}
        <div
          className="relative shrink-0 w-[35vw] xl:w-[40vw] overflow-hidden shadow-teaser transition-transform duration-700 ease-out"
          style={{
            aspectRatio: "850 / 900",
            transform: isActive ? "translateY(0)" : "translateY(110%)",
          }}
        >
          <Image
            src={slide.heroImage}
            alt=""
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS[blurKey(slide.heroImage)]}
            sizes="(min-width: 1280px) 40vw, 35vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

interface CarouselSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function CarouselSection({ sectionRef }: CarouselSectionProps) {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolledInto = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolledInto / totalScrollable));
      setScrollProgress(progress);
      const slideIndex = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length));
      setCurrentSlide(slideIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef]);

  // Heading follows slide layout: left on "left" slides, right on "right" slides
  const headingOnRight = SLIDES[currentSlide]?.layout === "right";

  return (
    <>
      {/* Mobile: stacked slides, no hero images, no transitions */}
      <div className="lg:hidden">
        {SLIDES.map((slide, i) => (
          <div key={i} className="relative w-full h-[60vw] min-h-[320px] overflow-hidden border-t-4 border-primary-50">
            <Image
              src={slide.bgImage}
              alt=""
              fill
              unoptimized
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS[blurKey(slide.bgImage)]}
              sizes="100vw"
              className="object-cover pointer-events-none"
            />
            <div className="relative z-1 flex flex-col gap-4 justify-end h-full p-6 pb-12">
              <h3 className="text-h1 text-text-light text-shadow-teaser">{t(slide.titleKey)}</h3>
              <p className="text-p-lg text-text-light max-w-[500px]">{t(slide.descKey)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: scroll-based carousel with transitions */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `${SLIDES.length * 150}dvh` }}
      >
        <div className="sticky top-0 h-dvh w-full overflow-hidden border-t-4 border-primary-50">
          {/* Slides */}
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: currentSlide === i ? 1 : 0 }}
            >
              <CarouselSlideComponent
                slide={slide}
                t={t}
                isActive={currentSlide === i}
              />
            </div>
          ))}

          {/* Floating heading — slides between left/right via flex-grow spacers (ease-out) */}
          <div className="absolute top-[72px] inset-x-0 px-8 xl:px-16 z-10 flex">
            <div
              className="transition-[flex-grow] duration-700 ease-out"
              style={{ flexGrow: headingOnRight ? 1 : 0 }}
            />
            <div className="text-subtitle text-text-light text-shadow-teaser whitespace-nowrap shrink-0">
              <span>{t("teaser.carousel.heading")}</span>
              <span className="text-primary">LAN</span>
              <span>{t("teaser.carousel.headingSuffix")}</span>
            </div>
            <div
              className="transition-[flex-grow] duration-700 ease-out"
              style={{ flexGrow: headingOnRight ? 0 : 1 }}
            />
          </div>

          {/* Progress bar — 3 segments */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-[240px]">
            {SLIDES.map((_, i) => {
              // Each segment: 0 = empty, 1 = full
              const segmentStart = i / SLIDES.length;
              const segmentEnd = (i + 1) / SLIDES.length;
              const segmentProgress = Math.max(
                0,
                Math.min(1, (scrollProgress - segmentStart) / (segmentEnd - segmentStart))
              );

              return (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full bg-white/30 overflow-hidden"
                >
                  <div
                    className="h-full bg-primary rounded-full transition-[width] duration-300 ease-out"
                    style={{ width: `${segmentProgress * 100}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
