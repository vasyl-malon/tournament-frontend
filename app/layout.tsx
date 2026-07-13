import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/query-provider";
import { Suspense } from "react";

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
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <html
        lang="en"
        className={cn("bg-[#17181c]", "font-sans", geist.variable)}
      >
        <body className={`${inter.className} bg-[#0d1117] min-h-screen`}>
          <main>
            <QueryProvider>{children}</QueryProvider>
          </main>
        </body>
      </html>
    </Suspense>
  );
}
