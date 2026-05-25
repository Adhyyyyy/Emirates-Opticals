import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";
import { QuickContactBar } from "@/components/common/QuickContactBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <QuickContactBar />
    </>
  );
}
