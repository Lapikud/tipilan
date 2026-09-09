"use client";

import React from "react";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { developers, universities } from "@/data/expo";

/** Thick semi-transparent cyan rule that separates the full-bleed sections. */
const DIVIDER = "border-t-4 border-[rgba(0,163,224,0.5)]";
/** Horizontal padding used by the padded sections (64px at the design width). */
const GUTTER = "px-6 md:px-16";

/** Map Modal Component */
function MapModal({ onClose, imageSrc, label, rotateMessage }: { onClose: () => void; imageSrc: string; label: string; rotateMessage: string }) {
  return (
    <div
      className="fixed inset-0 bg-[#0E0F19]/90 z-[10000] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Container for the map image - only shown in landscape */}
      <div className="border-4 border-[#1F5673] bg-[rgba(0,163,224,0.1)] w-full max-w-[95vw] md:max-w-[90vw] [@media(orientation:portrait)]:hidden [@media(max-width:767px)]:hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[80vh]">
          <img
            src={imageSrc}
            alt={label}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>
      {/* Portrait warning with border - only shown in portrait on small screens */}
      <div className="border-4 border-[#1F5673] bg-[rgba(0,163,224,0.1)] p-8 max-w-[90vw] md:max-w-md text-[#EEE5E5] text-center text-base md:text-lg [@media(orientation:landscape)]:hidden [@media(min-width:768px)]:hidden pointer-events-none" onClick={(e) => e.stopPropagation()}>
        {rotateMessage}
      </div>
    </div>
  );
}

/** Client component for the maps section with modal functionality */
function MapsSection({ gutter }: { gutter: string }) {
  const t = useTranslations();
  const [selectedMap, setSelectedMap] = useState<{ image: string; label: string } | null>(null);

  React.useEffect(() => {
    if (selectedMap) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMap]);

  const maps = [
    { image: "/images/messiala/fuajee-kaart.svg", label: t("expo.mapFoyer") },
    { image: "/images/messiala/tudengimaja-kaart.svg", label: t("expo.mapStudentHouse") },
  ];

  return (
    <>
      <div className={`${gutter} pb-12 md:pb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {maps.map((map) => (
            <button
              key={map.image}
              onClick={() => setSelectedMap(map)}
              className="relative aspect-[3/2] md:aspect-[4/3] w-full cursor-zoom-in hover:brightness-110 transition"
              aria-label={t("expo.viewMap")}
            >
              <img
                src={map.image}
                alt={map.label}
                className="w-full h-full object-contain p-2 md:p-4 lg:p-8"
              />
            </button>
          ))}
        </div>
      </div>
      {selectedMap && (
        <MapModal
          onClose={() => setSelectedMap(null)}
          imageSrc={selectedMap.image}
          label={selectedMap.label}
          rotateMessage={t("expo.rotateDevice")}
        />
      )}
    </>
  );
}

/** Venue map card: the map SVG rendered transparent over the page background. */
function MapCard({ image, label }: { image: string; label: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={image}
        alt={label}
        fill
        className="object-contain p-4 md:p-6"
        sizes="(max-width: 768px) 100vw, 50vw"
        // next/image's optimizer rejects SVG (400) unless dangerouslyAllowSVG
        // is enabled globally; serve the map SVG as-is instead.
        unoptimized
      />
    </div>
  );
}

/**
 * Photo tile in the gallery band: the image is faded over the dark background
 * (as in the design) with a large caption. Caption alignment is configurable so
 * the middle tile can sit bottom-right like the mockup.
 */
function FadedPhoto({
  image,
  caption,
  align = "left",
  valign = "center",
}: {
  image: string;
  caption: string;
  align?: "left" | "right";
  valign?: "center" | "bottom";
}) {
  return (
    <div className="relative min-h-[260px] md:min-h-0 overflow-hidden bg-[#0A121F]">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover opacity-45"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className={`absolute inset-0 flex p-6 md:p-9 ${
          valign === "bottom" ? "items-end" : "items-center"
        } ${align === "right" ? "justify-end" : "justify-start"}`}
      >
        <h3
          className={`${vipnagorgialla.className} font-bold italic uppercase text-white leading-tight max-w-[85%] text-[clamp(1.25rem,0.9rem+1.6vw,2.25rem)] ${
            align === "right" ? "text-right" : "text-left"
          }`}
        >
          {caption}
        </h3>
      </div>
    </div>
  );
}

/** Skewed section heading (no rule underneath — sections are split by DIVIDER). */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 md:mb-10 w-fit origin-left -skew-x-6">
      <h2
        className={`${vipnagorgialla.className} font-bold italic uppercase text-[#EEE5E5] leading-none text-[clamp(1.5rem,1rem+2.5vw,2.5rem)]`}
      >
        {children}
      </h2>
    </div>
  );
}

/**
 * One showcase card: a cyan-bordered logo box above a linked title and a
 * studio/team line. Logos render object-contain; screenshots (`cover`) fill the
 * box. Teams without a logo yet fall back to their name set inside the box.
 */
function GameCard({
  image,
  title,
  subtitle,
  url,
  cover = false,
}: {
  image?: string;
  title: string;
  subtitle: string;
  url?: string;
  cover?: boolean;
}) {
  const titleEl = url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit font-bold underline text-white leading-tight text-[clamp(1rem,0.85rem+0.8vw,1.5rem)] hover:text-[#00A3E0] transition"
    >
      {title}
    </a>
  ) : (
    <span className="font-bold text-white leading-tight text-[clamp(1rem,0.85rem+0.8vw,1.5rem)]">
      {title}
    </span>
  );

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative aspect-[3/2] border-4 border-[#00A3E0] overflow-hidden ${
          cover ? "bg-black" : "bg-[#0E0F19]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={cover ? "object-cover" : "object-contain p-5 md:p-7"}
            sizes="(max-width: 768px) 50vw, 25vw"
            // next/image's optimizer rejects SVG (400) unless dangerouslyAllowSVG
            // is enabled globally; serve SVG logos as-is instead.
            unoptimized={image.endsWith(".svg")}
          />
        ) : (
          <span
            className={`${vipnagorgialla.className} absolute inset-0 flex items-center justify-center p-4 text-center font-bold italic uppercase text-white/85 leading-tight text-[clamp(1rem,0.8rem+1vw,1.5rem)]`}
          >
            {title}
          </span>
        )}
      </div>
      {titleEl}
      <span className="text-white/70 leading-tight text-[clamp(0.9rem,0.8rem+0.5vw,1.25rem)]">
        {subtitle}
      </span>
    </div>
  );
}

export default function Expo() {
  const t = useTranslations();

  return (
    <div className="bg-[#0E0F19] min-h-screen">
      <div className="mx-auto w-full">
        {/* Page title */}
        <div className={`${GUTTER} pt-24 md:pt-32 pb-8`}>
          <h1
            className={`${vipnagorgialla.className} font-bold italic uppercase text-[#EEE5E5] leading-none text-[clamp(1.75rem,1.4rem+3vw,3.5rem)]`}
          >
            {t("expo.title")}
          </h1>
        </div>

        {/* Venue maps */}
        <MapsSection gutter={GUTTER} />

        {/* Mini-tournaments feature (full-bleed) */}
        <section
          className={`relative overflow-hidden ${DIVIDER} min-h-[360px] md:min-h-[480px]`}
        >
          <Image
            src="/images/landing/compete_teaser.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0F19] via-[#0E0F19]/85 to-[#0E0F19]/30" />
          <div
            className={`relative z-10 flex flex-col justify-center h-full min-h-[360px] md:min-h-[480px] max-w-2xl gap-6 py-10 ${GUTTER}`}
          >
            <h2
              className={`${vipnagorgialla.className} font-bold italic uppercase text-[#EEE5E5] leading-none text-[clamp(1.75rem,1.4rem+2.5vw,3rem)]`}
            >
              {t("expo.miniTournaments.title")}
            </h2>
            <p className="text-[#EEE5E5] text-base md:text-lg max-w-md">
              {t("expo.miniTournaments.description")}
            </p>
            <Link href="/turniirid" className="w-fit">
              <button
                className={`${vipnagorgialla.className} px-4 py-2 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] cursor-pointer font-bold italic leading-none uppercase transition`}
              >
                {t("expo.miniTournaments.cta")}
              </button>
            </Link>
          </div>
        </section>

        {/* Photo gallery: two faded tiles left, one tall faded tile right,
            separated by thin cyan gaps (the band background shows through). */}
        <section className={DIVIDER}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-[rgba(0,163,224,0.5)] md:h-[42vw] md:max-h-[760px]">
            <div className="grid grid-cols-1 md:grid-rows-2 gap-1 min-h-0">
              <FadedPhoto
                image="/images/EXPO/chill_ala.jpg"
                caption={t("expo.photos.chill")}
              />
              <FadedPhoto
                image="/images/EXPO/console.jpg"
                caption={t("expo.photos.console")}
                align="right"
              />
            </div>
            <FadedPhoto
              image="/images/EXPO/baar.jpg"
              caption={t("expo.photos.bar")}
              valign="bottom"
            />
          </div>
        </section>

        {/* Estonian game developers */}
        <section className={`${DIVIDER} ${GUTTER} py-12 md:py-16`}>
          <SectionHeading>{t("expo.developers")}</SectionHeading>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {developers.map((dev) => (
              <GameCard
                key={dev.title}
                image={dev.logo}
                title={dev.title}
                subtitle={dev.studio}
                url={dev.url}
              />
            ))}
          </div>
        </section>

        {/* Universities */}
        <section className={`${DIVIDER} ${GUTTER} py-12 md:py-16`}>
          <SectionHeading>{t("expo.universities")}</SectionHeading>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {universities.map((uni) => (
              <GameCard
                key={uni.title}
                image={uni.image}
                title={uni.title}
                subtitle={uni.team}
                url={uni.url}
                cover={!uni.contain}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
