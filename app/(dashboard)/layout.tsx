import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "../components/footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Betting App",
  description: "Football predictions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex-1 w-full max-w-[87.5rem] mx-auto text-white px-4 pt-22 md:px-8 md:pt-26 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
