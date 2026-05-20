import { BranchesHero } from "@/components/sections/BranchesHero";
import { BranchPhilosophy } from "@/components/sections/BranchPhilosophy";
import { KeralaMapShowcase } from "@/components/sections/KeralaMapShowcase";
import { BranchGrid } from "@/components/sections/BranchGrid";
import { BranchExperience } from "@/components/sections/BranchExperience";
import { BranchAmenities } from "@/components/sections/BranchAmenities";
import { TrustStats } from "@/components/sections/TrustStats";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { HiringBanner } from "@/components/sections/HiringBanner";

export const metadata = {
  title: "Our Branches | Emirates Opticians",
  description: "Visit our premium optical destinations across Kerala for authentic luxury eyewear and professional eye care.",
};

export default function BranchesPage() {
  return (
    <main>
      <BranchesHero />
      <BranchPhilosophy />
      <KeralaMapShowcase />
      <BranchGrid />
      <BranchExperience />
      <BranchAmenities />
      <TrustStats />
      <BookingCTA />
      <HiringBanner />
    </main>
  );
}
