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
        className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-6`}
      >
        Ajakava
      </h1>

      {/* Tab menu */}
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded ${
              activeTab === tab
                ? "bg-[#00A3E0] text-white"
                : "bg-[#d5d5e0] dark:bg-[#2A2C3F] text-[#2A2C3F] dark:text-[#EEE5E5] hover:bg-blue-200 dark:hover:bg-blue-700"
            } transition-colors`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Schedule entries */}
      <div className="space-y-6">
        {schedule.map((item, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <div className="text-blue-500 text-2xl font-bold">{item.time}</div>
            <div className="text-xl font-semibold text-[#2A2C3F] dark:text-[#EEE5E5]">
              {item.title}
            </div>
            {item.description && (
              <div className="text-md text-[#4B4E6D] dark:text-gray-400">
                {item.description}
              </div>
            )}
            {item.location && (
              <div className="text-sm italic text-[#7C7F99] dark:text-gray-500">
                {item.location}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
