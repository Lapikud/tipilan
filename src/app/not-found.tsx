import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { ThemeProvider } from "@/components/Theme-provider";

export default function NotFound() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-[90vh] p-12 justify-center items-center">
        <h1
          className={`text-7xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
        >
          404
        </h1>
        <div className="text-center">
          <p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5] mb-2">
            Lehte ei leitud!
          </p>
          <p className="text-lg text-[#2A2C3F]/80 dark:text-[#EEE5E5]/80">
            Page not found!
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
}
