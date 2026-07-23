import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/query-provider";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Footer from "./components/footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Football predictions",
  description: "Predict your win",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body
          className={cn(
            "bg-brand-page min-h-screen flex flex-col",
            inter.className,
          )}
        >
          <main>
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Footer />
          <Toaster position="top-center" />
        </body>
      </html>
    </Suspense>
  );
}
