import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default function Expo() {
    return (
        <div className="flex flex-col min-h-[90vh] bg-[#EEE5E5] p-12 pt-18">
            <h1 className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] mt-8 mb-4`}>Messiala</h1>
            <p className="text-2xl text-[#2A2C3F]">Koostööpartneritega arutamisel. Rohkem infot teel!</p>
        </div>
    );
}
