'use client';

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const SidebarParent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    return (
        <div className="fixed w-screen top-0 z-9999">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        </div>
    );
};

// This component is responsible for rendering the sidebar and header together. 
// It manages the state of the sidebar (open/closed) and passes the necessary props to both the Header and Sidebar components.

export default SidebarParent;