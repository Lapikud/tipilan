import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from 'next/link';

export default function Tickets() {
    return (
        <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4`}>PILETID JA REGIS&shy;TREERIMINE</h1>
            <div className="flex justify-center lg:items-center flex-col lg:flex-row gap-8 md:gap-12 flex-grow mb-16 md:mt-8 lg:mt-0">
                <div className="bg-[#007CAB] -skew-x-2 md:-skew-x-5 text-white px-8 md:px-12 py-16 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]">   
                    <h2 className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>8€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>Arvutiga osaleja</h3>
                    <ul className="pl-4 mb-8 list-[square] marker:text-[#1F5673]">
                        <li className="text-xl italic">Isiklik laud, voolu- ja internetiühendus</li>
                        <li className="text-xl">Ligipääs demoalale</li>
                        <li className="text-xl">Turniiride pealt vaatamine</li>
                        <li className="text-xl">Võimalus osaleda miniturniiridel</li>
                    </ul>
                    <Link href="https://fienta.com/et/tipilan">
                        <button className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}>OSTA PILET</button>
                    </Link>
                </div>
                <div className="bg-[#1F5673] -skew-x-2 md:-skew-x-5 text-white px-8 md:px-12 py-16 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]">
                    <h2 className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>12-15€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>Võistleja</h3>
                    <ul className="pl-4 mb-8 list-[square] marker:text-[#007CAB]">
                        <li className="text-xl">Võimalus osaleda turniiridel</li>
                        <li className="text-xl">Isiklik laud, voolu- ja internetiühendus</li>
                        <li className="text-xl">Ligipääs demoalale</li>
                        <li className="text-xl">Turniiride pealt vaatamine</li>
                        <li className="text-xl">Võimalus osaleda miniturniiridel</li>
                    </ul>
                    <Link href="https://fienta.com/et/tipilan">
                        <button className={`px-4 py-2 bg-[#007CAB] cursor-pointer ${vipnagorgialla.className} font-bold italic`}>OSTA PILET</button>
                    </Link>
                </div>

                <div className="bg-[#007CAB] -skew-x-2 md:-skew-x-5 text-white px-8 md:px-12 py-16 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]">
                    <h2 className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>6€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>Külastaja</h3>
                    <ul className="pl-4 mb-8 list-[square] marker:text-[#1F5673]">
                        <li className="text-xl">Ligipääs demoalale</li>
                        <li className="text-xl">Turniiride pealt vaatamine</li>
                        <li className="text-xl">Võimalus osaleda miniturniiridel</li>
                    </ul>
                    <Link href="https://fienta.com/et/tipilan">
                        <button className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}>OSTA PILET</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}