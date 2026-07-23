import { LandingHeader } from "../components/landing-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <LandingHeader />
      <div className="flex items-center justify-center flex-grow flex-1 w-full px-4 md:px-8 pt-26 md:pt-32 pb-12 md:pb-20">
        {children}
      </div>
    </div>
  );
}
