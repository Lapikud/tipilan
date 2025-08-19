"use client";

import {useState} from "react";
import {vipnagorgialla} from "@/components/Vipnagorgialla";
import {scheduleData} from "@/data/timetable";
import SectionDivider from "@/components/SectionDivider";

const tabs = Object.keys(scheduleData);

export default function Timetable() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const schedule = scheduleData[activeTab];

    return (
        <div>
            <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
                <h1
                    className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-8`}
                >
                    Ajakava
                </h1>

                {/* Tab menu */}
                <div className="flex space-x-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${vipnagorgialla.className} cursor-pointer uppercase italic px-4 py-2 text-lg font-semibold ${
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
                            className="border-l-3 border-[#007CAB] pl-4 flex flex-row flex-wrap gap-5 items-stretch"
                        >
                            <div
                                className={`${vipnagorgialla.className} text-[#00A3E0] text-4xl font-bold italic flex-shrink-0 flex items-center justify-center`}
                                style={{ width: "180px", minWidth: "180px" }}
                            >
                                {item.time}
                            </div>
                            <div
                                className="flex-1 flex flex-col justify-center min-h-[120px]"
                                style={{ minWidth: "0" }}
                            >
                                <div
                                    className={`${vipnagorgialla.className} text-3xl italic font-bold text-[#2A2C3F] dark:text-[#EEE5E5] text-balance`}
                                >
                                    {item.title}
                                </div>
                                {item.description && (
                                    <div className="text-2xl text-[#938BA1] dark:text-[#938BA1] text-balance">
                                        {item.description}
                                    </div>
                                )}
                                {item.location && (
                                    <div className="text-2xl text-[#938BA1] dark:text-[#938BA1] text-balance">
                                        {item.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <SectionDivider/>
        </div>
    );
}
