"use client";

import { useTranslations } from "next-intl";
import { SiFacebook, SiInstagram, SiTiktok, SiDiscord, SiTwitch, SiYoutube } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: SiFacebook, href: "https://facebook.com/tipilan.ee", label: "Facebook" },
  { icon: SiInstagram, href: "https://instagram.com/tipilan.ee", label: "Instagram" },
  { icon: SiTiktok, href: "https://tiktok.com/@tipilan.ee", label: "TikTok" },
  { icon: SiDiscord, href: "https://discord.gg/pPhhatZAfA", label: "Discord" },
  { icon: SiTwitch, href: "https://twitch.tv/tipilan", label: "Twitch" },
  { icon: SiYoutube, href: "https://youtube.com/@tipilan", label: "YouTube" },
];

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-bg-dark w-full">
      {/* Mobile: only social icons */}
      <div className="flex lg:hidden items-center justify-center gap-6 py-8 px-6 flex-wrap">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light hover:text-primary transition-colors"
            aria-label={label}
          >
            <Icon size={32} />
          </a>
        ))}
      </div>

      {/* Desktop: full footer */}
      <div className="hidden lg:flex flex-wrap gap-y-12 gap-x-8 xl:gap-x-0 items-start justify-between p-8 xl:p-16">
        {/* Left: Organization info */}
        <div className="flex flex-col gap-4 text-p font-bold text-text-light">
          <p>{t("teaser.footer.organization")}</p>
          <p>{t("teaser.footer.regCode")}</p>
          <p>{t("teaser.footer.bankAccount")}</p>
          <div className="flex items-center gap-2">
            <span className="text-[16px]">©</span>
            <p>{t("teaser.footer.copyright")}</p>
          </div>
        </div>

        {/* Center: Contact info */}
        <div className="flex flex-col gap-4 text-p font-bold text-text-light">
          <p>{t("teaser.footer.studentUnion")}</p>
          <a href="mailto:tipilan@ituk.ee" className="underline">{t("teaser.footer.email")}</a>
          <p>{t("teaser.footer.phone")}</p>
          <p>{t("teaser.footer.address")}</p>
        </div>

        {/* Right: Social links */}
        <div className="flex flex-col items-end">
          <div className="flex flex-wrap gap-6 items-center justify-center w-[169px]">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon size={40} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
