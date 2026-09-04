"use client";

import { useRef, useEffect, ReactNode } from "react";

interface HoverTickerProps {
    children: ReactNode;
    className?: string;
    baseSpeed?: number;
    hoverSpeed?: number;
}

export default function HoverTicker({
        children,
        className = "",
        baseSpeed = 1.2,
        hoverSpeed = 3.5,
    }: HoverTickerProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseZoneRef = useRef<"left" | "right" | "paused" | "none">("none");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;

        const animate = () => {
            if (container) {
                const zone = mouseZoneRef.current;

                if (zone === "none") {
                    container.scrollLeft += baseSpeed;
                } else if (zone === "right") {
                    container.scrollLeft += hoverSpeed;
                } else if (zone === "left") {
                    container.scrollLeft -= hoverSpeed;
                }

                // Infinite scroll cycle
                const maxScroll = container.scrollWidth / 2;

                if (container.scrollLeft >= maxScroll) {
                    container.scrollLeft -= maxScroll / 2;
                } else if (container.scrollLeft <= 0 && (zone === "left" || zone === "paused")) {
                    container.scrollLeft += maxScroll / 2;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [baseSpeed, hoverSpeed]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const width = rect.width;

        if (mouseX < width * 0.3) {
            mouseZoneRef.current = "left";
        } else if (mouseX > width * 0.7) {
            mouseZoneRef.current = "right";
        } else {
            mouseZoneRef.current = "paused";
        }
    };

    const handleMouseLeave = () => {
        mouseZoneRef.current = "none";
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`ticker-container relative overflow-x-auto select-none ${className}`}
        >
            <div className="flex items-center w-max">
                {children}
            </div>

            <style jsx>{`
        .ticker-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ticker-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}