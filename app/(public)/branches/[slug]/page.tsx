import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Clock, ShieldCheck, Glasses, Calendar } from "lucide-react";

// Full Comprehensive Data for All 10 Strategic Kerala Locations
// Full Comprehensive Data for All 10 Strategic Kerala Locations
const BRANCH_DATA: Record<string, {
  name: string;
  landmark: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbed: string;
  metaDesc: string;
  image: string;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
}> = {
  kottayam: {
    name: "Kottayam Branch",
    landmark: "Opposite Joseph Antony's Petrol Pump, MC Road",
    address: "Emirates Optician, M D Commercial Centre, Kottayam - Kumily Rd, Opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.5916,76.5222&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Authorized dealer of 100% original luxury eyewear and sunglasses in Kottayam. Visit Emirates Optician for certified computerized eye testing and official warranties.",
    image: "/branches/kottayam.png",
    latitude: 9.5916,
    longitude: 76.5222,
    openTime: "09:00",
    closeTime: "20:00"
  },
  changanassery: {
    name: "Changanassery Branch",
    landmark: "Near Mathumoola, Changanassery",
    address: "Emirates Optician, Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.4447,76.5413&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Shop genuine designer frames and authentic sunglasses at Emirates Optician Changanassery. Kerala's trusted authorized optometry showroom.",
    image: "/branches/changanssery.png",
    latitude: 9.4447,
    longitude: 76.5413,
    openTime: "09:30",
    closeTime: "19:30"
  },
  thiruvalla: {
    name: "Thiruvalla Branch",
    landmark: "Near Thirumoolapuram, TK Road",
    address: "Emirates Optician, Karappunnasseril Arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.3835,76.5740&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Get 100% original international eyewear and certified eye examinations at Emirates Optician Thiruvalla. Authentic luxury optical store with official brand support.",
    image: "/branches/thiruvalla.png",
    latitude: 9.3835,
    longitude: 76.5740,
    openTime: "09:30",
    closeTime: "19:30"
  },
  kumbanad: {
    name: "Kumbanad Branch",
    landmark: "Near Bethel Complex, Kumbanad",
    address: "Emirates Optician, Bethel Complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.3892,76.6577&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Certified luxury optical boutique at Kumbanad. Authorized dealer of original designer sunglasses, progressive lenses, and contact lenses.",
    image: "/branches/kumbanad.png",
    latitude: 9.3892,
    longitude: 76.6577,
    openTime: "09:30",
    closeTime: "19:30"
  },
  kothamangalam: {
    name: "Kothamangalam Branch",
    landmark: "Near Pulickal Square, Kozhipally Bypass Rd",
    address: "Emirates Optician, Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=10.0531,76.6218&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Authorized showroom in Kothamangalam for genuine designer eyewear and precise computerized eye testing. 100% original brand warranty on all frames.",
    image: "/branches/Kothamangalam.png",
    latitude: 10.0531,
    longitude: 76.6218,
    openTime: "09:00",
    closeTime: "20:00"
  },
  pandalam: {
    name: "Pandalam Branch",
    landmark: "Near Thonallor Junction, MC Road",
    address: "Emirates Optician, Karandiyil Building, IV/558-2, Thonallor, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    hours: "Monday - Saturday: 09:30 AM - 07:30 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.2312,76.6133&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Shop authentic international glasses and sunglasses at Emirates Optician Pandalam. Authorized dealer with official brand warranties and certified opticians.",
    image: "/branches/Pandalam.png",
    latitude: 9.2312,
    longitude: 76.6133,
    openTime: "09:30",
    closeTime: "19:30"
  },
  ettumanur: {
    name: "Ettumanur Branch",
    landmark: "Near HP Petrol Station, Kavala",
    address: "Emirates Optician, Adams 2 101, Near HP Petrol Station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.6702,76.5621&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Authorized luxury optical boutique in Ettumanur. Discover 100% original designer frames and professional computerized eye testing services.",
    image: "/branches/ettumanur.png",
    latitude: 9.6702,
    longitude: 76.5621,
    openTime: "09:00",
    closeTime: "20:00"
  },
  angamaly: {
    name: "Angamaly Branch",
    landmark: "Near Kuruvila Square, MC Road",
    address: "Emirates Optician, Kuruvila Square, Junction, MC Road, Near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    hours: "Monday - Saturday: 09:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=10.1983,76.3862&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Authorized optician showroom in Angamaly. Shop 100% genuine luxury sunglasses, prescription glasses, and get certified eye tests.",
    image: "/branches/angamaly.png",
    latitude: 10.1983,
    longitude: 76.3862,
    openTime: "09:00",
    closeTime: "20:00"
  },
  irumpanam: {
    name: "Irumpanam Branch",
    landmark: "Near MM Arcade, Seaport - Airport Rd",
    address: "Emirates Optician, MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    hours: "Monday - Saturday: 10:00 AM - 08:00 PM (Sunday Closed)",
    mapEmbed: "https://maps.google.com/maps?q=9.9576,76.3478&t=&z=15&ie=UTF8&iwloc=&output=embed",
    metaDesc: "Authorized premium optical store in Irumpanam (Kochi). Buy original luxury brands with certified optical checkups and personalized frame styling.",
    image: "/branches/Irumpanam.png",
    latitude: 9.9576,
    longitude: 76.3478,
    openTime: "10:00",
    closeTime: "20:00"
  }
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return Object.keys(BRANCH_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const branch = BRANCH_DATA[resolvedParams.slug];
  if (!branch) return {};
  const cityName = branch.name.replace(" Branch", "");
  return {
    title: `Authorized Optician in ${cityName} | Emirates Optician`,
    description: branch.metaDesc,
    alternates: { canonical: `/branches/${resolvedParams.slug}` }
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const branch = BRANCH_DATA[resolvedParams.slug];
  if (!branch) notFound();

  const cityName = branch.name.replace(" Branch", "");

  // Custom Local OpticalStore Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OpticalStore",
    "name": `Emirates Optician - ${cityName}`,
    "description": branch.metaDesc,
    "image": `https://emiratesoptician.in${branch.image}`,
    "logo": "https://emiratesoptician.in/assets/favicon-32x32.png",
    "url": `https://emiratesoptician.in/branches/${resolvedParams.slug}`,
    "telephone": branch.phone,
    "priceRange": "$$$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, UPI",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address,
      "addressLocality": cityName,
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": branch.latitude,
      "longitude": branch.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": branch.openTime,
        "closes": branch.closeTime
      }
    ],
    "parentOrganization": {
      "@type": "LocalBusiness",
      "name": "Emirates Optician",
      "url": "https://emiratesoptician.in",
      "logo": "https://emiratesoptician.in/assets/favicon-32x32.png"
    }
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
              Emirates Optician <br />
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
                title={`Emirates Optician - ${branch.name} Directions`}
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

        {/* Authorized Collections Available at this Location */}
        <div className="mt-16 border-t border-black/5 pt-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-8 text-center md:text-left">
            Authorized Collections Available at this Location
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Cartier", "Prada", "Gucci", "Ray-Ban", "Oakley", "Tom Ford", 
              "BVLGARI", "Montblanc", "Dolce & Gabbana", "Bausch & Lomb", "Acuvue", "Alcon",
              "Maui Jim", "Stepper", "Emporio Armani", "Tommy Hilfiger", "Nike", "Armani Exchange",
              "Police", "Lacoste", "Calvin Klein", "Diesel", "Vogue Eyewear"
            ].sort((a, b) => a.localeCompare(b)).map((brand) => (
              <div 
                key={brand} 
                className="bg-white border border-black/[0.02] hover:border-[#C9A84C]/30 py-4 px-6 flex items-center justify-center rounded-[3px] shadow-sm hover:shadow-md transition-all duration-500 group"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/45 group-hover:text-[#C9A84C] transition-colors duration-500 select-none text-center">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
