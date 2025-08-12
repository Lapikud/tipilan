import {vipnagorgialla} from "@/components/Vipnagorgialla";
import Link from "next/link";

export default function RulesMenu() {
    const headingStyle = `text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5]`;
    
    const boxStyle = `-skew-x-2 md:-skew-x-5 text-white md:px-12 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]`;
    
    const boxTextStyle = `text-3xl ${vipnagorgialla.className} font-bold uppercase text-[#EEE5E5] pb-2`;

    const SectionDivider = () => <div className="border-b-[3px] border-[#1F5673] w-full"/>;

    return (
        <div>
            <div className="flex flex-col md:m-16">
                <h1 className={`${headingStyle} mt-8 md:mt-16`}>
                    REEGLID
                </h1>

                <div className='flex flex-wrap flex-row lg:mt-16 justify-center lg:items-start gap-12 flex-grow mb-8'>
                    <Link href="/kodukord">
                        <div className={`${boxStyle} bg-[#007CAB] py-20`}>
                            <h2 className={`${boxTextStyle}`}>
                                Kodukord
                            </h2>
                        </div>
                    </Link>

                    <Link href="/reeglid/cs2">
                        <div className={`${boxStyle} bg-[#1F5673] py-20`}>
                            <h2 className={`${boxTextStyle}`}>
                                CS2 reeglid
                            </h2>
                        </div>
                    </Link>


                    <Link href="reeglid/lol">
                        <div className={`${boxStyle} bg-[#007CAB] py-20`}>
                            <h2 className={`${boxTextStyle}`}>
                                LoL reeglid
                            </h2>
                        </div>
                    </Link>

                    {/* Minitourn. link coming soon*/}
                    {/*<Link href="">*/} 
                        <div
                            className={`${boxStyle} bg-[#1F5673] py-16`}>
                            <h2 className={`${boxTextStyle}`}>
                                Miniturniiride reeglid
                            </h2>
                        </div>
                    {/*</Link>*/}
                    
                </div>
            </div>
            
            <SectionDivider />
            
        </div>
    );
}