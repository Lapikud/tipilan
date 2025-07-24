import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default function Tourney() {
    return (
        <div className="flex flex-col min-h-[90vh] p-12 pt-18">
            <h1 className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}>Turniirid</h1>
            <p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">Kui tahate oma oskusi proovile panna, siis vaadake siia tagasi! Rohkem infot lähiajal.</p>
        </div>
    );
}
