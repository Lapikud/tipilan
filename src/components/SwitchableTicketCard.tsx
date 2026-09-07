"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SoldOutOverlay from "@/components/SoldOutOverlay";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

interface TicketData {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
}

interface SwitchableTicketCardProps {
  optionA: TicketData;
  optionB: TicketData;
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
  backgroundImageB?: string;
  backgroundOpacity?: number;
  backgroundOpacityA?: number;
  backgroundOpacityB?: number;
  soldOutA?: boolean;
  soldOutB?: boolean;
  soldOutText: string;
  className?: string;
}

export default function SwitchableTicketCard({
  optionA,
  optionB,
  buttonText,
  buttonHref,
  backgroundImage,
  backgroundImageB,
  backgroundOpacity = 40,
  backgroundOpacityA,
  backgroundOpacityB,
  soldOutA = false,
  soldOutB = false,
  soldOutText,
  className = "",
}: SwitchableTicketCardProps) {
  const [isA, setIsA] = useState(true);

  const titleOnRight = !isA;
  const soldOut = isA ? soldOutA : soldOutB;

  function renderPrice(price: string) {
    return Array.from(price).map((char, index) => (
      <span
        key={`${char}-${index}`}
        className={
          char === "€" || char === "+"
            ? "text-[#00A3E0]"
            : "text-[#EEE5E5]"
        }
      >
        {char}
      </span>
    ));
  }

  function renderFeatures(features: string[]) {
    return (
      <ul className="flex flex-col gap-2 grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-start gap-2 text-[#EEE5E5] text-base ${titleOnRight ? "flex-row-reverse" : ""}`}
          >
            <span className="w-1 self-stretch min-h-5 bg-[#00A3E0] shrink-0" />
            <span className={titleOnRight ? "text-end" : ""}>{feature}</span>
          </li>
        ))}
      </ul>
    );
  }

  function renderMobileFeatures(features: string[]) {
    return (
      <ul className="flex flex-col gap-2 grow mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-[#EEE5E5] text-base"
          >
            <span className="w-1 self-stretch min-h-5 bg-[#00A3E0] shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={`relative bg-[#0E0F19] border-[#1F5673] px-12 sm:py-16 py-0 flex flex-col min-h-87.5 h-full overflow-hidden ${className}`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center transition-opacity duration-700 ease-out"
          style={{ opacity: isA ? (backgroundOpacityA ?? backgroundOpacity) / 100 : 0 }}
        />
      )}
      {backgroundImageB && (
        <Image
          src={backgroundImageB}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center transition-opacity duration-700 ease-out"
          style={{ opacity: isA ? 0 : (backgroundOpacityB ?? backgroundOpacity) / 100 }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Mobile: Simple slide transition at sm: breakpoint (640px) */}
        <div className="sm:hidden relative w-full flex flex-col h-full">
          <div className="relative flex-grow overflow-hidden">
            <div
              className={`absolute inset-0 flex flex-col transition-transform duration-700 ease-out`}
              style={{ transform: isA ? "translateX(0)" : "translateX(-100%)" }}
            >
              <div className="pt-16 pb-8">
                <h2
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-[#00A3E0] uppercase`}
                >
                  {optionA.title}
                </h2>
                <h3
                  className={`${vipnagorgialla.className} font-bold italic text-2xl text-[#EEE5E5] uppercase mb-4`}
                >
                  {optionA.subtitle}
                </h3>
                <p
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none mb-4`}
                >
                  {renderPrice(optionA.price)}
                </p>
                {renderMobileFeatures(optionA.features)}
              </div>
            </div>
            <div
              className={`absolute inset-0 flex flex-col transition-transform duration-700 ease-out`}
              style={{ transform: !isA ? "translateX(0)" : "translateX(100%)" }}
            >
              <div className="pt-16 pb-8">
                <h2
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-[#00A3E0] uppercase`}
                >
                  {optionB.title}
                </h2>
                <h3
                  className={`${vipnagorgialla.className} font-bold italic text-2xl text-[#EEE5E5] uppercase mb-4`}
                >
                  {optionB.subtitle}
                </h3>
                <p
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none mb-4`}
                >
                  {renderPrice(optionB.price)}
                </p>
                {renderMobileFeatures(optionB.features)}
              </div>
            </div>
          </div>
          <div className="pb-16 flex-shrink-0">
            {!soldOut && (
              <Link
                href={buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-fit px-4 py-2 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] cursor-pointer ${vipnagorgialla.className} font-bold italic leading-none uppercase transition`}
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>

        {/* Desktop: Original transition behavior */}
        <div className="hidden sm:flex flex-col h-full">
          {/* Title + subtitle + price with position shift */}
          <div className="flex items-start mb-2 ">
            <div
              className="transition-[flex-grow] duration-700 ease-out "
              style={{ flexGrow: titleOnRight ? 1 : 0 }}
            />
            <div className={`grid ${titleOnRight ? "text-end" : ""}`}>
              <div
                className="col-start-1 row-start-1 transition-opacity duration-500 ease-out"
                style={{ opacity: isA ? 1 : 0 }}
              >
                <h2
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-[#00A3E0] uppercase`}
                >
                  {optionA.title}
                </h2>
                <h3
                  className={`${vipnagorgialla.className} font-bold italic text-2xl text-[#EEE5E5] uppercase`}
                >
                  {optionA.subtitle}
                </h3>
                <p
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none mt-2`}
                >
                  {renderPrice(optionA.price)}
                </p>
              </div>
              <div
                className="col-start-1 row-start-1 transition-opacity duration-500 ease-out pointer-events-none"
                style={{ opacity: isA ? 0 : 1 }}
              >
                <h2
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-[#00A3E0] uppercase`}
                >
                  {optionB.title}
                </h2>
                <h3
                  className={`${vipnagorgialla.className} font-bold italic text-2xl text-[#EEE5E5] uppercase`}
                >
                  {optionB.subtitle}
                </h3>
                <p
                  className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none mt-2`}
                >
                  {renderPrice(optionB.price)}
                </p>
              </div>
            </div>
            <div
              className="transition-[flex-grow] duration-700 ease-out "
              style={{ flexGrow: titleOnRight ? 0 : 1 }}
            />
          </div>

          <div className="relative grow">
            <div
              className={`absolute inset-0 flex flex-col transition-all duration-700 ease-out ${
                isA
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex ">
                <div
                  className="transition-[flex-grow] duration-700 ease-out "
                  style={{ flexGrow: titleOnRight ? 1 : 0 }}
                />
                <div>
                  {renderFeatures(optionA.features)}
                </div>
                <div
                  className="transition-[flex-grow] duration-700 ease-out "
                  style={{ flexGrow: titleOnRight ? 0 : 1 }}
                />
              </div>
            </div>

            <div
              className={`absolute inset-0 flex flex-col transition-all duration-700 ease-out ${
                !isA
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex ">
                <div
                  className="transition-[flex-grow] duration-700 ease-out "
                  style={{ flexGrow: titleOnRight ? 1 : 0 }}
                />
                <div>
                  {renderFeatures(optionB.features)}
                </div>
                <div
                  className="transition-[flex-grow] duration-700 ease-out "
                  style={{ flexGrow: titleOnRight ? 0 : 1 }}
                />
              </div>
            </div>
          </div>

          {!soldOut && (
            <Link
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-fit px-4 py-2 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] cursor-pointer ${vipnagorgialla.className} font-bold italic leading-none uppercase transition`}
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>

      {soldOut && <SoldOutOverlay text={soldOutText} />}

      {/* Chevron buttons on left/right sides */}
      <button
        onClick={() => setIsA(false)}
        className={`${isA ? "flex" : "hidden"} absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center cursor-pointer bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition-all duration-300 z-30`}
        aria-label={optionB.title}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <button
        onClick={() => setIsA(true)}
        className={`${!isA ? "flex" : "hidden"} absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center cursor-pointer bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition-all duration-300 z-30`}
        aria-label={optionA.title}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 pb-2 z-30">
        <button
          onClick={() => setIsA(true)}
          className={`w-3 h-3 rounded-full transition ${
            isA ? "bg-[#00A3E0]" : "bg-[#1F5673] hover:bg-[#007CAB]/60"
          }`}
          aria-label={optionA.title}
        />
        <button
          onClick={() => setIsA(false)}
          className={`w-3 h-3 rounded-full transition ${
            !isA ? "bg-[#00A3E0]" : "bg-[#1F5673] hover:bg-[#007CAB]/60"
          }`}
          aria-label={optionB.title}
        />
      </div>
    </div>
  );
}
