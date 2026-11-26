import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DCHIND EXPORTS | Global Copper Scrap Supplier & International Trading",
  description:
    "DCHIND EXPORTS delivers quality-driven copper scrap solutions with reliable sourcing, transparent business practices, and efficient global export operations.",
  keywords: [
    "DCHIND EXPORTS",
    "copper scrap export",
    "copper wire scrap",
    "copper cathode",
    "copper granules",
    "international metals trading",
  ],
};

export const viewport: Viewport = {
  themeColor: "#07111B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} dark h-full`}
    >
      <body className="min-h-full bg-[#07111B] text-[#F8FAFC] selection:bg-[#C87535]/35 selection:text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
