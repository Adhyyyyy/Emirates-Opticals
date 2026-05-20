import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, MessageSquare, Compass, ArrowLeft, ShieldCheck, BadgePercent, CalendarCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps) {
  const branch = await prisma.branch.findUnique({
    where: { slug: params.slug },
  });

  if (!branch) {
    return {
      title: "Boutique Not Found | Emirates Opticians",
    };
  }

  return {
    title: `${branch.name} | Luxury Eyewear & Eye Care`,
    description: `Experience luxury vision services at ${branch.name}. Located at ${branch.address}. Phone: ${branch.phone}`,
  };
}

export default async function BranchDetailPage({ params }: PageProps) {
  // Query branch details
  const branch = await prisma.branch.findUnique({
    where: { slug: params.slug },
  });

  if (!branch || branch.deletedAt) {
    notFound();
  }

  // Fetch dynamic boutique stocks (inventory)
  const stockItems = await prisma.inventory.findMany({
    where: { 
      branchId: branch.id,
      quantity: { gt: 0 }
    },
    include: {
      product: {
        include: {
          brand: true,
          images: { orderBy: { order: "asc" } }
        }
      }
    },
    take: 8
  });

  const mapsQuery = branch.coordinates ? branch.coordinates : `${branch.name} ${branch.address}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  return (
    <div className="bg-brand-pearl/10 min-h-screen pb-24 text-black">
      
      {/* Return Navigation bar */}
      <div className="bg-white border-b border-black/5 py-6">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link 
            href="/branches" 
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Network
          </Link>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">
            Emirates Opticians Flagship
          </span>
        </div>
      </div>

      {/* Cinematic Banner Hero */}
      <section className="relative w-full h-[40vh] min-h-[300px] bg-brand-charcoal overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image 
            src={branch.images?.[0] || "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=1800"} 
            alt={branch.name}
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 md:px-10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-3 block">
              {branch.location || "Kerala Network"}
            </span>
            <h1 className="text-4xl md:text-6xl font-normal text-white uppercase tracking-tighter leading-none font-heading">
              {branch.name}
            </h1>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <a 
              href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25d366] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-lg hover:brightness-105 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat Stylist
            </a>
            <Link 
              href={`/book-eye-test?branchId=${branch.id}`}
              className="px-8 py-4 bg-brand-gold text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-lg hover:bg-white hover:text-black transition-all"
            >
              <CalendarCheck2 className="w-3.5 h-3.5" />
              Schedule Test
            </Link>
          </div>
        </div>
      </section>

      {/* Main Info Blocks Layout */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Boutique Curation Details */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm">
            <h2 className="text-xl font-bold uppercase tracking-tight text-brand-charcoal pb-4 border-b border-black/5">
              Boutique Credentials
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">STREET ADDRESS</span>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">{branch.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">OPERATIONAL SCHEDULE</span>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">{branch.timings || "10:00 AM - 08:30 PM"}</p>
                  <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full mt-2 inline-block border border-emerald-100">
                    Open Today
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">HOTLINE CONNECTION</span>
                  <a href={`tel:${branch.phone}`} className="text-sm font-bold text-brand-charcoal hover:text-brand-gold transition-colors">
                    {branch.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Compass className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-1">GPS MAPPING</span>
                  <a 
                    href={mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1.5"
                  >
                    Launch Google Maps Navigation →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Guarantee Card */}
          <div className="bg-black text-white rounded-[2.5rem] p-8 md:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-bold uppercase tracking-tight text-brand-gold">Boutique Luxuries</h3>
            <ul className="space-y-4 text-xs font-light text-white/70">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                100% Authentic Luxury Eyewear Certify
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                Expert Optometrists on Premise
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                Complimentary Specialized Styling
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Dynamic Inventory stocks catalog */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-8 border-b border-black/5 mb-8">
              <div>
                <h2 className="text-2xl font-normal text-brand-charcoal tracking-tight uppercase">
                  Available <em className="italic font-light text-brand-gold">Boutique Inventory</em>
                </h2>
                <p className="text-xs text-brand-charcoal/40 font-light mt-1">
                  Real-time premium collections currently cataloged in this physical showroom.
                </p>
              </div>

              <span className="px-4 py-2 bg-brand-pearl rounded-2xl text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/50 shrink-0 self-start sm:self-center">
                {stockItems.length} curated frames(s)
              </span>
            </div>

            {stockItems.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-black/10 rounded-3xl">
                <p className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold mb-1">Stock registry is loading</p>
                <p className="text-[11px] font-light text-brand-charcoal/30">Connect to our customer line above to verify brand listings.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {stockItems.map((item) => {
                  const product = item.product;
                  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400";
                  
                  return (
                    <div key={item.id} className="group border border-black/5 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-gold/30 hover:shadow-xl transition-all duration-700">
                      
                      {/* Product Visual */}
                      <div className="aspect-[16/10] relative w-full mb-6 overflow-hidden rounded-2xl bg-brand-pearl/35 flex items-center justify-center">
                        <Image 
                          src={primaryImage}
                          alt={product.name}
                          fill
                          className="object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 30vw"
                        />
                        
                        {/* Dynamic Stock Status tag */}
                        <div className="absolute top-4 left-4">
                          <span className={cn(
                            "px-2.5 py-1 text-[7.5px] font-extrabold uppercase tracking-widest rounded-full shadow-sm",
                            item.status === "IN_STOCK" ? "bg-emerald-500 text-white" : 
                            item.status === "LOW_STOCK" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                          )}>
                            {item.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Details block */}
                      <div>
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-brand-gold block mb-1">
                          {product.brand.name}
                        </span>
                        <h4 className="text-base font-bold text-brand-charcoal uppercase tracking-tight line-clamp-1 mb-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm font-bold text-brand-charcoal">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <Link 
                            href={`/product/${product.id}`}
                            className="text-[9px] font-bold uppercase tracking-widest text-brand-gold hover:text-black transition-colors"
                          >
                            Explore Product →
                          </Link>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </section>
      
    </div>
  );
}
