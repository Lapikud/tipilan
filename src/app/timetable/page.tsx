import { vipnagorgialla } from "../layout";

export default function Timetable() {
    return (
        <div className="flex flex-col min-h-[90vh] bg-[#EEE5E5] p-12">
            <h1 className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] mt-8 mb-4`}>Ajakava</h1>
            <p className="text-xl  text-[#2A2C3F]">Ajakava on tegemisel.</p>
        </div>
    );
}
