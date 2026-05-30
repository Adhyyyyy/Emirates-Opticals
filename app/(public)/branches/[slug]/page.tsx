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
    landmark: "Near Chittethukara Junction, Seaport - Airport Rd",
    address: "Emirates Optician, Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    hours: "Monday - Saturday: 10:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=10.0159,76.3418&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Visit Emirates Opticians in Kakkanad for professional computerized eye testing, authentic premium luxury eyewear, and specialized optician services."
  },
  kottayam: {
    name: "Kottayam Branch",
    landmark: "Opposite Joseph Antony's Petrol Pump, MC Road",
    address: "Emirates Optician, M D Commercial Centre, Kottayam - Kumily Rd, Opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.5916,76.5222&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Discover high-fidelity international eyewear brands and professional optometric eye examinations at Emirates Opticians MC Road Kottayam."
  },
  changanassery: {
    name: "Changanassery Branch",
    landmark: "Near Mathumoola, Changanassery",
    address: "Emirates Optician, Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.4447,76.5413&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Get premium optical diagnostic eye testing and authentic sunglasses collections at Emirates Opticians MC Road Changanassery."
  },
  thiruvalla: {
    name: "Thiruvalla Branch",
    landmark: "Near Thirumoolapuram, TK Road",
    address: "Emirates Optician, Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.3835,76.5740&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Experience luxury styling consultations and computerized eye examinations at Emirates Opticians Pushpagiri road Thiruvalla."
  },
  kumbanad: {
    name: "Kumbanad Branch",
    landmark: "Near Bethel Complex, Kumbanad",
    address: "Emirates Optician, Bethel Complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.3892,76.6577&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Find authentic luxury sunglasses and specialized contact lens solutions at Emirates Opticians TK Road Kumbanad branch showroom."
  },
  kothamangalam: {
    name: "Kothamangalam Branch",
    landmark: "Near Pulickal Square, Kozhipally Bypass Rd",
    address: "Emirates Optician, Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=10.0531,76.6218&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Your trusted neighborhood optical store in Kothamangalam for authentic fashion eyewear, frames, and precise computerized eye checks."
  },
  pandalam: {
    name: "Pandalam Branch",
    landmark: "Near Thonallor Junction, MC Road",
    address: "Emirates Optician, Karandiyil Building, IV/558-2, Thonallor, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.2312,76.6133&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Enjoy elite eyewear collections and highly accurate computerized eye vision tests at Emirates Opticians MC Road Pandalam."
  },
  ettumanur: {
    name: "Ettumanur Branch",
    landmark: "Near HP Petrol Station, Kavala",
    address: "Emirates Optician, Adams 2 101, Near HP Petrol Station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.6702,76.5621&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Premium global optical boutique in Ettumanur providing authorized luxury frames, sunglasses, and optometric eye care checks."
  },
  angamaly: {
    name: "Angamaly Branch",
    landmark: "Near Kuruvila Square, MC Road",
    address: "Emirates Optician, Kuruvila Square, Junction, MC Road, Near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=10.1983,76.3862&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Your trusted destination in Angamaly for premium global brand sunglasses, computerized optical testing, and frame consulting."
  },
  irumpanam: {
    name: "Irumpanam Branch",
    landmark: "Near MM Arcade, Seaport - Airport Rd",
    address: "Emirates Optician, MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    hours: "Monday - Saturday: 10:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.9576,76.3478&t=&z=15&ie=UTF8&iwloc=&output=embed",
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
