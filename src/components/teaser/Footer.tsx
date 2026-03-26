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
    <footer className="bg-bg-dark w-full border-t-4 border-primary-50 lg:border-t-0">
      {/* Desktop: full footer */}
      <div className="flex flex-col-reverse lg:flex-row flex-wrap gap-y-12 gap-x-8 xl:gap-x-0 items-start justify-between p-8 xl:p-16">
        {/* Left: Organization info */}
        <div className="flex flex-col gap-2 text-p text-text-light">
          <p className="font-bold">{t("teaser.footer.organization")}</p>
          <p>{t("teaser.footer.regCode")}</p>
          <p>{t("teaser.footer.bankAccount")}</p>
          <div className="flex items-center gap-2 font-bold">
            <span className="text-[16px]">©</span>
            <p>{t("teaser.footer.copyright")}</p>
          </div>
        </div>

        {/* Center: Contact info */}
        <div className="flex flex-col gap-2 text-p text-text-light">
          <p className="font-bold">{t("teaser.footer.studentUnion")}</p>
          <a href="mailto:tipilan@ituk.ee" className="underline">{t("teaser.footer.email")}</a>
          <p>{t("teaser.footer.phone")}</p>
          <p>{t("teaser.footer.address")}</p>
        </div>

        {/* Right: Social links */}
        <div className="flex flex-col items-end">
            <div className="grid grid-cols-3 gap-8 lg:gap-6 w-[169px]">
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
