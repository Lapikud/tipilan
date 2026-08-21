"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { scheduleData, type ScheduleItem } from "@/data/timetable";
import { useTranslations, useLocale } from "next-intl";

const tabs = Object.keys(scheduleData);

// Map of filter shorthand to location key suffixes
const FILTER_MAP: Record<string, string[]> = {
  aula: ['auditorium'],
  auditorium: ['auditorium'],
  tudengimaja: ['studentHouse'],
  studenthouse: ['studentHouse'],
  fuajee: ['lobbyAndLanArea'],
  foyer: ['lobbyAndLanArea'],
  lan: ['lobbyAndLanArea'],
  lanarea: ['lobbyAndLanArea'],
  lobby: ['lobbyAndLanArea'],
};

function matchesFilter(item: ScheduleItem, filter: string): boolean {
  const normalizedFilter = filter.toLowerCase();
  const locationKeys = Array.isArray(item.locationKey) ? item.locationKey : [item.locationKey];
  
  // Get the matching location suffixes from the filter map, or use the filter directly
  const filterSuffixes = FILTER_MAP[normalizedFilter] || [normalizedFilter];
  
  // Check if any of the item's location keys contain any of the filter suffixes
  return locationKeys.some(key => 
    filterSuffixes.some(suffix => 
      key.toLowerCase().includes(suffix.toLowerCase())
    )
  );
}

function formatLocationKeys(keys: string[], t: (key: string) => string, locale: string): string {
  const translated = keys.map(k => t(k));
  if (translated.length === 1) return translated[0];
  
  const isEstonian = locale === 'et';
  const and = isEstonian ? ' ja ' : ' and ';
  
  if (translated.length === 2) {
    return translated.join(and);
  }
  
  if (isEstonian) {
    return translated.slice(0, -1).join(', ') + and + translated[translated.length - 1];
  }
  
  return translated.slice(0, -1).join(', ') + ', and ' + translated[translated.length - 1];
}

export default function Timetable() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const schedule = scheduleData[activeTab];
  const t = useTranslations();
  const locale = useLocale();
  
  // Filter schedule items based on the filter parameter
  const filteredSchedule = filter 
    ? schedule.filter(item => matchesFilter(item, filter))
    : schedule;

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-8`}
        >
          {t("schedule.title")}
        </h1>

        {/* Tab menu */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${vipnagorgialla.className} group font-bold cursor-pointer italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition ${
                activeTab === tab
                  ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                  : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
              }`}
            >
              {t(`schedule.${tab}`)}
            </button>
          ))}
        </div>

        {/* Filter buttons */}
        <div className="mb-2">
          <h2 className={`${vipnagorgialla.className} text-2xl md:text-3xl italic font-bold uppercase text-[#2A2C3F] dark:text-[#EEE5E5]`}>
            {t("schedule.location")}
          </h2>
        </div>
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('filter');
              window.history.pushState({}, '', url.toString());
            }}
            className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition cursor-pointer ${
              !filter
                ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
            }`}
          >
            {t("common.all")}
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('filter', 'aula');
              window.history.pushState({}, '', url.toString());
            }}
            className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition cursor-pointer ${
              filter === 'aula'
                ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
            }`}
          >
            {t("schedule.locations.auditorium")}
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('filter', 'tudengimaja');
              window.history.pushState({}, '', url.toString());
            }}
            className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition cursor-pointer ${
              filter === 'tudengimaja'
                ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
            }`}
          >
            {t("schedule.locations.studentHouse")}
          </button>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('filter', 'lobby');
              window.history.pushState({}, '', url.toString());
            }}
            className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition cursor-pointer ${
              filter === 'lobby'
                ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
            }`}
          >
            {t("schedule.locations.lobbyAndLanArea")}
          </button>
        </div>

        {/* Schedule entries */}
        <div className="space-y-6">
          {filteredSchedule.map((item, idx) => (
            <div
              key={idx}
              className="border-l-4 border-[#007CAB] pl-8 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5 items-stretch"
            >
              <div
                className={`${vipnagorgialla.className} w-[260px] md:w-[360px] text-[#00A3E0] text-3xl md:text-[2.5rem] font-bold italic flex items-start justify-start sm:pt-3 whitespace-nowrap`}
              >
                {item.time}
              </div>
              <div className="flex-1 flex flex-col justify-start pt-3 min-w-0 sm:min-h-24">
                <div
                  className={`${vipnagorgialla.className} text-2xl md:text-3xl italic font-bold text-[#2A2C3F] dark:text-[#EEE5E5] text-balance`}
                >
                  {t(item.titleKey)}
                </div>
                {item.description && (
                  <div className="text-xl md:text-2xl text-[#938BA1] dark:text-[#938BA1] text-balance">
                    {item.description}
                  </div>
                )}
                <div className="text-xl md:text-2xl text-[#938BA1] dark:text-[#938BA1] text-balance">
                  {Array.isArray(item.locationKey) 
                    ? formatLocationKeys(item.locationKey, t, locale)
                    : t(item.locationKey)
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
          <p className="text-xl pt-8 max-w-4xl italic">{t("schedule.transportInfo")}</p>
      </div>
    </div>
  );
}
