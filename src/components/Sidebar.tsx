'use client';

// Fonts
import { vipnagorgialla } from '@/app/layout';

// Use effect to handle route changes and close the sidebar if it's open
// usePathName to listen to route changes in Next.js
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            toggleSidebar();
        }
    }, [pathname]);

    return (
        <>
            <div
                className="fixed inset-0 backdrop-blur mt-16 z-20"
                style={{ display: isOpen ? 'block' : 'none' }}
                onClick={toggleSidebar} // Close sidebar when clicking outside
            ></div>
            <div
                className={`text-5xl ${vipnagorgialla.className} font-bold italic fixed flex items-center flex-col gap-8 pt-16 top-0 left-0 h-[99vh] mt-16 -skew-x-5 border-r-3 border-[#007CAB] w-128 bg-[#EEE5E5] text-[#2A2C3F] transition-transform transform z-20`}
                style={{ transform: isOpen ? 'translateX(-10%) skewX(calc(5deg * -1)' : 'translateX(-150%) skewX(calc(5deg * -1)' }}
            >
                <Link href="/" prefetch={true} onClick={toggleSidebar}>Avaleht</Link>
                <Link href="/timetable" prefetch={true} onClick={toggleSidebar}>Ajakava</Link>
                <Link href="/" prefetch={true} onClick={toggleSidebar}>Turniirid</Link>
                <Link href="/" prefetch={true} onClick={toggleSidebar}>Messiala</Link>
            </div>
        </>
    );
};

export default Sidebar;