import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Clock, ShieldCheck, Glasses, Calendar } from "lucide-react";

// Full Comprehensive Data for All 10 Strategic Kerala Locations
const BRANCH_DATA: Record<string, {
  name: string;
  landmark: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbed: string;
  metaDesc: string;
}> = {
  kakkanad: {
    name: "Kakkanad Branch",
    landmark: "Near Infopark Expressway, Kakkanad",
    address: "Emirates Opticians, Luxury Heights, Kakkanad, Kochi, Kerala - 682030",
    phone: "+91-484-2900000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.84711311029!2d76.3419!3d10.0159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c3b00000001%3A0x0!2zMTDCsDAwJzU3LjIiTiA3NsKwMjAnMzAuOCJF!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Visit Emirates Opticians in Kakkanad for professional computerized eye testing, authentic premium luxury eyewear, and specialized optician services."
  },
  kottayam: {
    name: "Kottayam Branch",
    landmark: "Opposite General Hospital, Kottayam",
    address: "Emirates Opticians, Golden Plaza, MC Road, Kottayam, Kerala - 686001",
    phone: "+91-481-2560000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.12!2d76.52!3d9.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Discover high-fidelity international eyewear brands and professional optometric eye examinations at Emirates Opticians MC Road Kottayam."
  },
  changanassery: {
    name: "Changanassery Branch",
    landmark: "Near College Junction, Changanassery",
    address: "Emirates Opticians, MC Road, Changanassery, Kerala - 686101",
    phone: "+91-481-2420000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.30!2d76.54!3d9.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Get premium optical diagnostic eye testing and authentic sunglasses collections at Emirates Opticians MC Road Changanassery."
  },
  thiruvalla: {
    name: "Thiruvalla Branch",
    landmark: "Opposite Pushpagiri Medical College, Thiruvalla",
    address: "Emirates Opticians, TK Road, Thiruvalla, Kerala - 689101",
    phone: "+91-469-2600000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.50!2d76.58!3d9.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Experience luxury styling consultations and computerized eye examinations at Emirates Opticians Pushpagiri road Thiruvalla."
  },
  kumbanad: {
    name: "Kumbanad Branch",
    landmark: "Near Kumbanad Junction",
    address: "Emirates Opticians, TK Road, Kumbanad, Kerala - 689547",
    phone: "+91-469-2660000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.70!2d76.62!3d9.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Find authentic luxury sunglasses and specialized contact lens solutions at Emirates Opticians TK Road Kumbanad branch showroom."
  },
  kothamangalam: {
    name: "Kothamangalam Branch",
    landmark: "Near High Range Junction, Kothamangalam",
    address: "Emirates Opticians, Royal Plaza, AM Road, Kothamangalam, Kerala - 686691",
    phone: "+91-485-2820000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.40!2d76.63!3d10.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Your trusted neighborhood optical store in Kothamangalam for authentic fashion eyewear, frames, and precise computerized eye checks."
  },
  pandalam: {
    name: "Pandalam Branch",
    landmark: "Opposite NSS College Road, Pandalam",
    address: "Emirates Opticians, MC Road, Pandalam, Pathanamthitta, Kerala - 689501",
    phone: "+91-473-2250000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.20!2d76.67!3d9.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Enjoy elite eyewear collections and highly accurate computerized eye vision tests at Emirates Opticians MC Road Pandalam."
  },
  ettumanur: {
    name: "Ettumanur Branch",
    landmark: "Near Temple Junction, Ettumanur",
    address: "Emirates Opticians, MC Road, Ettumanur, Kottayam, Kerala - 686631",
    phone: "+91-481-2530000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.00!2d76.56!3d9.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Premium global optical boutique in Ettumanur providing authorized luxury frames, sunglasses, and optometric eye care checks."
  },
  angamaly: {
    name: "Angamaly Branch",
    landmark: "Opposite KSRTC Bus Stand, Angamaly",
    address: "Emirates Opticians, MC Road, Angamaly, Kochi, Kerala - 683572",
    phone: "+91-484-2450000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.50!2d76.38!3d10.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Your trusted destination in Angamaly for premium global brand sunglasses, computerized optical testing, and frame consulting."
  },
  irumpanam: {
    name: "Irumpanam Branch",
    landmark: "Near Seaport-Airport Road Junction",
    address: "Emirates Opticians, Kakkanad-Tripunithura Road, Irumpanam, Kochi, Kerala - 682309",
    phone: "+91-484-2780000",
    hours: "09:30 AM - 08:30 PM (Sunday Closed)",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.50!2d76.35!3d9.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000",
    metaDesc: "Shop international luxury eyewear brands and receive comprehensive optician eye diagnostics at Emirates Opticians Irumpanam showroom."
  }
};

export async function generateStaticParams() {
  return Object.keys(BRANCH_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const branch = BRANCH_DATA[params.slug];
  if (!branch) return {};
  return {
    title: `Premium Optician in ${branch.name} | Eye Testing & Luxury Eyewear`,
    description: branch.metaDesc,
  };
}

export default function BranchPage({ params }: { params: { slug: string } }) {
  const branch = BRANCH_DATA[params.slug];
  if (!branch) notFound();

  // Custom Local OpticalStore Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OpticalStore",
    "name": `Emirates Opticians - ${branch.name}`,
    "description": branch.metaDesc,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address,
      "addressLocality": branch.name,
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "telephone": branch.phone,
    "priceRange": "$$$$"
  };

  return (
    <main className="w-full bg-[#FAF9F6] text-black pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Breadcrumbs */}
        <div className="text-[10px] uppercase tracking-widest text-black/40 mb-6 flex gap-2">
          <Link href="/" className="hover:text-black transition-colors">Home</Link> 
          <span>/</span> 
          <Link href="/branches" className="hover:text-black transition-colors">Branches</Link> 
          <span>/</span> 
          <span className="text-[#C9A84C] font-semibold">{branch.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-heading font-extralight uppercase tracking-tight text-black leading-tight">
              Emirates Opticians <br />
              <span className="text-[#C9A84C] font-normal italic">{branch.name}</span>
            </h1>
            <p className="text-black/60 text-[14px] leading-relaxed max-w-lg">
              Experience the absolute pinnacle of optical luxury at our showroom in {branch.name}. We specialize in bringing handpicked international eyewear designers, bespoke frame consultations, and state-of-the-art eye care testing directly to you.
            </p>

            <div className="flex flex-col gap-5 mt-4 border-t border-black/5 pt-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-[0.2em] text-black/40 mb-1">Address</h4>
                  <p className="text-sm font-sans text-black/85 leading-relaxed">{branch.address}</p>
                  <span className="text-[11px] text-black/50 block mt-1">Landmark: {branch.landmark}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-[0.2em] text-black/40 mb-1">Telephone</h4>
                  <p className="text-sm font-sans text-black/85 font-semibold">{branch.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-[0.2em] text-black/40 mb-1">Operating Hours</h4>
                  <p className="text-sm font-sans text-black/85">{branch.hours}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/book-eye-test"
                className="inline-flex items-center justify-center bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-[3px] transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2" /> Book Eye Test
              </Link>
            </div>
          </div>

          {/* Right Map & Trust Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="w-full aspect-[4/3] bg-white rounded-[3px] overflow-hidden border border-black/5 shadow-sm relative">
              <iframe
                src={branch.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Emirates Opticians - ${branch.name} Directions`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-black/[0.03] rounded-[3px]">
                <ShieldCheck className="w-5 h-5 text-[#C9A84C] mb-2" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1 text-black">100% Authentic</h4>
                <p className="text-[11px] text-black/50 leading-relaxed">Certified authorized distributor of all international luxury brands.</p>
              </div>
              <div className="p-4 bg-white border border-black/[0.03] rounded-[3px]">
                <Glasses className="w-5 h-5 text-[#C9A84C] mb-2" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1 text-black">Bespoke Styling</h4>
                <p className="text-[11px] text-black/50 leading-relaxed">Expert frame pairing customized for your specific facial aesthetics.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
