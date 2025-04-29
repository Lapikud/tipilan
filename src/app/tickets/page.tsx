import { vipnagorgialla } from "../layout";
import Link from 'next/link';

export default function Tickets() {
    return (
        <div className="flex flex-col min-h-[90vh] bg-[#EEE5E5] p-12 pt-18">
            <h1 className={`text-6xl ${vipnagorgialla.className} font-bold text-[#2A2C3F] mt-8 pb-8`}>Piletid ja registreerimine</h1>
            <div className="flex justify-center items-center flex-row gap-16 flex-grow">
                <div className="bg-[#007CAB] -skew-x-5 text-white px-12 py-16 w-72 hover:scale-105 transition-all">   
                    <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>8€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>Osaleja</h3>
                    <ul className="pl-4 pb-4 list-[square] marker:text-[#1F5673]">
                    <li className="text-xl">Isiklik laud, voolu- ja internetiühendus</li>
                        <li className="text-xl">Ligipääs demoalale</li>
                        <li className="text-xl">Turniiride pealt vaatamine</li>
                        <li className="text-xl">Võimalus osaleda miniturniiridel</li>
                    </ul>
                    <Link href="https://fienta.com/et/tipilan">
                        <button className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}>OSTA PILET</button>
                    </Link>
                </div>

                <div className="bg-[#007CAB] -skew-x-5 text-white px-12 py-16 w-72 hover:scale-105 transition-all">
                    <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>10€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>Võistleja</h3>
                    <ul className="pl-4 pb-4 list-[square] marker:text-[#1F5673]">
                        <li className="text-xl">Võimalus osaleda turniiridel</li>
                        <li className="text-xl">Isiklik laud, voolu- ja internetiühendus</li>
                        <li className="text-xl">Ligipääs demoalale</li>
                        <li className="text-xl">Turniiride pealt vaatamine</li>
                        <li className="text-xl">Võimalus osaleda miniturniiridel</li>
                    </ul>
                    <Link href="https://fienta.com/et/tipilan">
                        <button className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}>OSTA PILET</button>
                    </Link>
                </div>

                <div className="bg-[#007CAB] -skew-x-5 text-white px-12 py-16 w-72 hover:scale-105 transition-all">
                    <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}>6€</h2>
                    <h3 className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}>Külastaja</h3>
                    <ul className="pl-4 pb-4 list-[square] marker:text-[#1F5673]">
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