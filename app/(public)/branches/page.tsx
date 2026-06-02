import { BranchesHero } from "@/components/sections/BranchesHero";
import { BranchGrid } from "@/components/sections/BranchGrid";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

export const metadata = {
  title: "Optical Showrooms & Eye Testing Centres in Kerala | Emirates Optician",
  description: "Locate your nearest Emirates Optician showroom in Kerala (including Changanassery, Thiruvalla, Kottayam, Angamaly, Ettumanur, Irumpanam, Kothamangalam, Pandalam, Kumbanad). Visit us for professional eye care.",
  alternates: { canonical: "/branches" },
};

export default function BranchesPage() {
  return (
    <main className="flex flex-col w-full">
      <BranchesHero />
      <BranchGrid />
      <HelpChoosingCTA />
    </main>
  );
}
