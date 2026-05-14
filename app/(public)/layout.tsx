import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[90px] md:pt-[110px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
