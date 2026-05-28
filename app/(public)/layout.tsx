import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";
import { QuickContactBar } from "@/components/common/QuickContactBar";
import { RevealObserver } from "@/components/motion/RevealObserver";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <QuickContactBar />
    </>
  );
}
