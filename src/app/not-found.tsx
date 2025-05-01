import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-[90vh] p-12 justify-center items-center">
            <h1 className={`text-7xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}>404</h1>
            <p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">Seda lehte me ei leidnud.</p>
        </div>
    );
}
