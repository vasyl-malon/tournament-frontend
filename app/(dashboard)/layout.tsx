import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/header";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Betting App",
  description: "Football predictions with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Header />
      <div className="flex-1 w-full max-w-[1400px] mx-auto text-white px-4 py-6 md:px-8 md:py-10">{children}</div>
    </div>
  );
}
