import { BranchesHero } from "@/components/sections/BranchesHero";
import { BranchGrid } from "@/components/sections/BranchGrid";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

export const metadata = {
  title: "Our Branches | Emirates Optician",
  description: "Visit our premium optical destinations across Kerala for authentic luxury eyewear and professional eye care.",
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
