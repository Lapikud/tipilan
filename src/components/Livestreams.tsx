"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

const livestreamsStartAt = new Date("2026-09-11T00:00:00+03:00").getTime();
const maximumTimeout = 2_147_483_647;

const streams = [
  { channel: "tipilan_ee", translationKey: "cs2" },
  { channel: "tipilan_ee2", translationKey: "lol" },
] as const;

export default function Livestreams() {
  const t = useTranslations("home.livestreams");
  const [twitchParent, setTwitchParent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const revealWhenReady = () => {
      const timeUntilStart = livestreamsStartAt - Date.now();

      if (timeUntilStart <= 0) {
        setTwitchParent(window.location.hostname);
        setIsVisible(true);
        return;
      }

      timeoutId = window.setTimeout(
        revealWhenReady,
        Math.min(timeUntilStart, maximumTimeout),
      );
    };

    revealWhenReady();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!isVisible || !twitchParent) {
    return null;
  }

  return (
    <section
      className={`mx-auto flex w-full flex-col items-center gap-10 border-b-4 border-[#00A3E0]/50 px-4 py-11 sm:gap-12 sm:px-8 sm:py-14 lg:gap-16 lg:px-12 lg:py-[68px] ${vipnagorgialla.className} font-bold italic`}
    >
      <h2 className="text-center text-2xl leading-none text-white uppercase sm:text-3xl lg:text-[40px]">
        {t("title")}
      </h2>

      <div className="grid w-full max-w-[1216px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {streams.map((stream) => {
          const query = new URLSearchParams({
            channel: stream.channel,
            parent: twitchParent,
            muted: "true",
          });

          return (
            <article
              key={stream.channel}
              className="overflow-hidden border-3 border-[#1F5673] bg-[#0E0F19]"
            >
              <h3 className="px-5 py-4 text-xl leading-none text-[#00A3E0] uppercase sm:px-6 sm:text-2xl">
                {t(stream.translationKey)}
              </h3>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://player.twitch.tv/?${query.toString()}`}
                  title={`${t(stream.translationKey)} — Twitch`}
                  className="absolute inset-0 size-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
