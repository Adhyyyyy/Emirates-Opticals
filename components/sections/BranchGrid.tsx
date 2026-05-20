"use client";

import React, { useState, useEffect } from "react";
import { BranchCard } from "@/components/ui/BranchCard";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { getBranches } from "@/actions/branches";
import { Loader2 } from "lucide-react";

const FALLBACK_BRANCHES = [
  {
    id: "fb-1",
    name: "Emirates Optician, Changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103",
    description: "Premium eyewear collections, professional eye testing, expert styling consultation, and ample parking facilities.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    timings: "10:00 AM - 08:30 PM",
    coordinates: "9.4447, 76.5413"
  },
  {
    id: "fb-2",
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115",
    description: "Authentic luxury eyewear and advanced optical solutions delivered with personalized customer care.",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    timings: "09:30 AM - 08:30 PM",
    coordinates: "9.3835, 76.5740"
  },
  {
    id: "fb-3",
    name: "Emirates Optician, Kumbanad",
    address: "Bethel Complex, Kumbanad, Kerala 689547",
    description: "Premium optical collections and expert consultation services in a welcoming retail environment.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    timings: "10:00 AM - 08:00 PM",
    coordinates: "9.3892, 76.6577"
  },
  {
    id: "fb-4",
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Kothamangalam, Kerala 686691",
    description: "Luxury eyewear, modern optical solutions, and professional vision care services.",
    image: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=800",
    timings: "10:00 AM - 08:30 PM",
    coordinates: "10.0531, 76.6218"
  },
  {
    id: "fb-5",
    name: "Emirates Optician, Pandalam",
    address: "Karandiyil Building, IV/558-2, Thonallor, Pandalam, Kerala 689501",
    description: "Authentic global eyewear brands with professional styling and eye testing support.",
    image: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=800",
    timings: "09:30 AM - 08:00 PM",
    coordinates: "9.2312, 76.6133"
  },
  {
    id: "fb-6",
    name: "Emirates Optician, Kakkanad",
    address: "Seaport-Airport Road, Chittethukara, Kakkanad, Kerala 682037",
    description: "Contemporary optical retail experience with luxury collections and premium eye care services.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    timings: "10:00 AM - 08:30 PM",
    coordinates: "10.0159, 76.3418"
  },
];

export function BranchGrid() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getBranches();
      if (res.data && res.data.length > 0) {
        // Map database branches to public card structures
        const mapped = res.data.filter((b: any) => b.isActive).map((b: any) => ({
          id: b.id,
          name: b.name,
          address: b.address,
          description: `${b.location || "Kerala"} premium flagship lounge with comprehensive styling services and WhatsApp routing.`,
          image: b.images?.[0] || "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=600",
          timings: b.timings || "10:00 AM - 08:30 PM",
          coordinates: b.coordinates,
          slug: b.slug
        }));
        setBranches(mapped);
      } else {
        // Fallback to static seed data
        setBranches(FALLBACK_BRANCHES);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
              The Visionist Map
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="h2-editorial text-black">
              Our Destination Boutiques
            </h2>
          </Reveal>
        </div>

        {/* Loading display */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          /* Cinematic Grid - Corrected for Horizontal Row Flow */
          <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {branches.map((branch) => (
              <StaggerItem key={branch.id}>
                <BranchCard 
                  name={branch.name}
                  address={branch.address}
                  description={branch.description}
                  image={branch.image}
                  hours={branch.timings}
                  coordinates={branch.coordinates}
                  slug={branch.slug}
                />
              </StaggerItem>
            ))}
          </GridStagger>
        )}
      </div>
    </section>
  );
}
