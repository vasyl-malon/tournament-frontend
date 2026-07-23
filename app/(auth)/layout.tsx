import Footer from "../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* <div>Header</div> */}
      <main className="flex  justify-center w-full mx-auto text-white px-4 pt-22 md:px-8 md:pt-26 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
