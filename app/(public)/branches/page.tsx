import { BranchesHero } from "@/components/sections/BranchesHero";
import { BranchGrid } from "@/components/sections/BranchGrid";

export const metadata = {
  title: "Our Branches | Emirates Opticians",
  description: "Visit our premium optical destinations across Kerala for authentic luxury eyewear and professional eye care.",
};

export default function BranchesPage() {
  return (
    <main>
      <BranchesHero />
      <BranchGrid />
    </main>
  );
}
