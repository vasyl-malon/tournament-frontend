import { LandingHeader } from "../components/landing-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <LandingHeader />
      <div className="flex items-center justify-center flex-grow flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
