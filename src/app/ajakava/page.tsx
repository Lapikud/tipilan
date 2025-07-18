"use client";

import { useState } from "react";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { scheduleData } from "@/data/timetable";

const tabs = Object.keys(scheduleData);

export default function Timetable() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const schedule = scheduleData[activeTab];

  return (
    <div className="flex flex-col min-h-[90vh] p-6 sm:p-12 pt-18">
      <h1
        className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-14 mb-8`}
      >
        Ajakava
      </h1>

      {/* Tab menu */}
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${vipnagorgialla.className} uppercase italic px-4 py-2 text-lg font-semibold ${
              activeTab === tab
                ? "bg-[#00A3E0] text-white"
                : "bg-[#007CAB] dark:bg-[#007CAB] text-[#EEE5E5] hover:bg-[#00A3E0] dark:hover:bg-[#007CAB]"
            } transition-colors`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Schedule entries */}
      <div className="space-y-6">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className="border-l-3 border-[#007CAB] pl-4 flex flex-row gap-12"
          >
            <div
              className={` ${vipnagorgialla.className} text-[#00A3E0] text-5xl font-bold italic`}
            >
              {item.time}
            </div>
            <div>
              <div
                className={`${vipnagorgialla.className} text-4xl italic font-bold text-[#2A2C3F] dark:text-[#EEE5E5]`}
              >
                {item.title}
              </div>
              {item.description && (
                <div className="text-2xl text-[#938BA1] dark:text-[#938BA1]">
                  {item.description}
                </div>
              )}
              {item.location && (
                <div className="text-2xl text-[#938BA1] dark:text-[#938BA1]">
                  {item.location}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
