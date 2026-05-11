"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const LOGO_WIDTH = 2092;
const LOGO_HEIGHT = 300;

const logoLetters = [
  { letter: "T", src: "/letters/T.svg", x: 0, width: 367 },
  { letter: "I", src: "/letters/I.svg", x: 334.858, width: 178 },
  { letter: "P", src: "/letters/P.svg", x: 481.258, width: 411 },
  { letter: "I", src: "/letters/I.svg", x: 872.218, width: 178 },
  { letter: "L", src: "/letters/L.svg", x: 1018.64, width: 286 },
  { letter: "A", src: "/letters/A.svg", x: 1289.2, width: 390 },
  { letter: "N", src: "/letters/N.svg", x: 1690.72, width: 402 },
] as const;

export default function AnimatedTipilanLogo() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const loadedLetterIndicesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    if (loadedCount >= logoLetters.length) {
      const rafId = window.requestAnimationFrame(() => {
        setShouldAnimate(true);
      });

      return () => window.cancelAnimationFrame(rafId);
    }

    return undefined;
  }, [loadedCount]);

  const handleLetterLoad = (index: number) => {
    if (loadedLetterIndicesRef.current.has(index)) {
      return;
    }

    loadedLetterIndicesRef.current.add(index);
    setLoadedCount(loadedLetterIndicesRef.current.size);
  };

  if (isReducedMotion) {
    return (
      <div
        className="relative z-0 w-[max(260px,min(100%,750px))]"
        style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
      >
        <Image
          src="/tipilan-dark.svg"
          alt="TipiLAN Logo"
          priority
          fill
          sizes="(max-width: 750px) 100vw, 750px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      aria-label="TipiLAN Logo"
      className="relative z-0 w-[max(260px,min(100%,750px))] overflow-visible"
      role="img"
      style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
    >
      {logoLetters.map((letter, index) => {
        return (
          <Image
            key={`${letter.letter}-${letter.x}`}
            src={letter.src}
            width={letter.width}
            height={LOGO_HEIGHT}
            alt=""
            aria-hidden
            priority
            className={`absolute top-0 h-full object-fill ${shouldAnimate ? "tipilan-logo-letter" : ""}`}
            onLoad={() => handleLetterLoad(index)}
            onError={() => handleLetterLoad(index)}
            style={
              {
                left: `${(letter.x / LOGO_WIDTH) * 100}%`,
                width: `${(letter.width / LOGO_WIDTH) * 100}%`,
                zIndex: logoLetters.length - index,
                "--tipilan-logo-letter-delay": `${index * 90}ms`,
                ...(shouldAnimate
                  ? {}
                  : {
                      opacity: 0,
                      transform: "translate3d(0, 100%, 0)",
                    }),
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
