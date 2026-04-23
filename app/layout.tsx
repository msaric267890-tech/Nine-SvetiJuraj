import type { Metadata } from "next";
import { DM_Sans, Cormorant } from "next/font/google";
import { LangProvider } from "@/lib/LangContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nine Sveti Juraj",
  description: "Privatni smještaj uz plažu u Svetom Jurju. Ocjena 8.9/10.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
