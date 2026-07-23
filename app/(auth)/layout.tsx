import Footer from "../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex justify-center items-center w-full mx-auto text-white py-2">
        {children}
      </main>
      <Footer />
    </div>
  );
}
