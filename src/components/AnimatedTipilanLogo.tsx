"use client";

import Image from "next/image";
import type { AnimationEvent, CSSProperties } from "react";
import { useEffect, useState } from "react";

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
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsAnimationComplete(true);
    }
  }, []);

  if (isAnimationComplete) {
    return (
      <Image
        src="/tipilan-dark.svg"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        alt="TipiLAN Logo"
        priority
        className="relative z-0 w-[max(260px,min(100%,750px))] h-auto"
      />
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
        const isLastLetter = index === logoLetters.length - 1;

        return (
          <Image
            key={`${letter.letter}-${letter.x}`}
            src={letter.src}
            width={letter.width}
            height={LOGO_HEIGHT}
            alt=""
            aria-hidden
            priority
            className="tipilan-logo-letter absolute top-0 h-full object-fill"
            onAnimationEnd={
              isLastLetter
                ? (event: AnimationEvent<HTMLImageElement>) => {
                    if (event.animationName === "tipilan-logo-letter-in") {
                      setIsAnimationComplete(true);
                    }
                  }
                : undefined
            }
            style={
              {
                left: `${(letter.x / LOGO_WIDTH) * 100}%`,
                width: `${(letter.width / LOGO_WIDTH) * 100}%`,
                zIndex: logoLetters.length - index,
                "--tipilan-logo-letter-delay": `${index * 90}ms`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
