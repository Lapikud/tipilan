import { vipnagorgialla } from "@/components/Vipnagorgialla";

interface SoldOutOverlayProps {
  text: string;
}

export default function SoldOutOverlay({ text }: SoldOutOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex cursor-not-allowed select-none items-center justify-center overflow-hidden bg-[#0E0F19]/40">
      <p
        className={`${vipnagorgialla.className} -rotate-[15deg] whitespace-nowrap text-[clamp(2.5rem,5vw,5.5rem)] leading-none font-bold italic text-[#00A3E0] uppercase`}
      >
        {text}
      </p>
    </div>
  );
}
