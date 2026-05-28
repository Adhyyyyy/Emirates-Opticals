import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  ArrowLeft, 
  Mail, 
  Navigation,
  Car
} from "lucide-react";
import { HelpChoosingCTA } from "@/components/sections/HelpChoosingCTA";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const STATIC_BRANCHES: Record<string, any> = {
  changanassery: {
    name: "Emirates Optician, Changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    email: "Changanassery@EmiratesOptician.com",
    timings: "Tuesday: 9:30 AM - 7:30 PM",
    coordinates: "9.4447, 76.5413",
    whatsapp: "+918714032601",
    storefrontImage: "/branches/changanssery.png",
  },
  thiruvalla: {
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    email: "Thiruvalla@EmiratesOptician.com",
    timings: "Tuesday: 10 AM - 7 PM",
    coordinates: "9.3835, 76.5740",
    whatsapp: "+918714032602",
    storefrontImage: "/branches/thiruvalla.png",
  },
  kumbanad: {
    name: "Emirates Optician, Kumbanad",
    address: "Bethel complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    email: "Kumbanad@EmiratesOptician.com",
    timings: "Tuesday: 9:30 AM - 7 PM",
    coordinates: "9.3892, 76.6577",
    whatsapp: "+918714032603",
    storefrontImage: "/branches/kumbanad.png",
  },
  kothamangalam: {
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Malayenkeezhu, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    email: "Kothamangalam@EmiratesOptician.com",
    timings: "Tuesday: 9 AM - 8 PM",
    coordinates: "10.0531, 76.6218",
    whatsapp: "+918714032607",
    storefrontImage: "/branches/Kothamangalam.png",
  },
  pandalam: {
    name: "Emirates Optician, Pandalam",
    address: "KARANDIYIL BUILDING, IV/558-2, THONALLOR, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    email: "Pandalam@EmiratesOptician.com",
    timings: "Tuesday: 10 AM - 7:30 PM",
    coordinates: "9.2312, 76.6133",
    whatsapp: "+918714032606",
    storefrontImage: "/branches/Pandalam.png",
  },
  kakkanad: {
    name: "Emirates Optician, Kakkanad",
    address: "Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    email: "Kakkanad@EmiratesOptician.com",
    timings: "Tuesday: 10 AM - 8 PM",
    coordinates: "10.0159, 76.3418",
    whatsapp: "+917736441211",
    storefrontImage: "/branches/kakkanad.png",
  },
  kottayam: {
    name: "Emirates Optician, Kottayam",
    address: "M D Commercial Centre Adjacent to Kallarackal Ladies Collections Adjacent to Karakkattu Ladies Collections, Kottayam - Kumily Rd, opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    email: "Kottayam@EmiratesOptician.com",
    timings: "Tuesday: 9:30 AM - 8 PM",
    coordinates: "9.5916, 76.5222",
    whatsapp: "+918547866755",
    storefrontImage: "/branches/kottayam.png",
  },
  ettumanur: {
    name: "Emirates Optician, Ettumanur",
    address: "Adams 2 101, near HP petrol station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    email: "Ettumanur@EmiratesOptician.com",
    timings: "Tuesday: 9 AM - 8 PM",
    coordinates: "9.6702, 76.5621",
    whatsapp: "+918714032604",
    storefrontImage: "/branches/ettumanur.png",
  },
  angamaly: {
    name: "Emirates Optician, Angamaly",
    address: "Kuruvila Square, Junction, M C Road, near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    email: "Angamaly@EmiratesOptician.com",
    timings: "Tuesday: 9 AM - 8 PM",
    coordinates: "10.1983, 76.3862",
    whatsapp: "+918714032605",
    storefrontImage: "/branches/angamaly.png",
  },
  irumpanam: {
    name: "Emirates Optician, Irumpanam",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    email: "Irumpanam@EmiratesOptician.com",
    timings: "Tuesday: 10 AM - 9 PM",
    coordinates: "9.9576, 76.3478",
    whatsapp: "+918889990533",
    storefrontImage: "/branches/Irumpanam.png",
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const branch = STATIC_BRANCHES[slug];
  if (!branch) return { title: "Branch Not Found | Emirates Opticians" };
  return {
    title: `${branch.name} | Luxury Eyewear & Eye Care`,
    description: `Visit ${branch.name} at ${branch.address}. Phone: ${branch.phone}`,
  };
}

export default async function BranchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const branch = STATIC_BRANCHES[slug];

  if (!branch) notFound();

  const mapsQuery = branch.coordinates ?? branch.address;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const cleanName = branch.name.includes(",") ? branch.name.split(",")[1].trim() : branch.name.replace("Emirates Optician,", "").trim();

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-brand-charcoal flex flex-col w-full">

      {/* Cinematic Banner — absolute unmasked luxury header */}
      <section className="relative w-full h-[55vh] min-h-[440px] bg-brand-charcoal overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={branch.storefrontImage}
            alt={`${branch.name} storefront`}
            fill
            className="object-cover object-center opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Overlaid Breadcrumb back-link */}
        <div className="absolute top-0 left-0 right-0 pt-28 md:pt-36 z-20">
          <div className="max-w-[1240px] mx-auto px-6 md:px-8 flex items-center justify-between py-4">
            <Link
              href="/branches"
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-brand-gold transition-colors duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Boutiques
            </Link>
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/25 px-3 py-1 rounded-[2px]">
              Emirates Gallery
            </span>
          </div>
        </div>

        {/* Title overlay */}
        <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-8 pb-16 pt-20">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-3 block">
            Kerala Luxury Network
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white uppercase tracking-tighter leading-none font-heading drop-shadow-lg">
            {branch.name}
          </h1>
        </div>
      </section>

      {/* Sticky Quick Action Ribbon (Sharp, Premium rounded-[3px] styling) */}
      <div className="bg-white border-b border-black/[0.04] py-4 sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/book-eye-test" className="px-6 py-3 bg-brand-charcoal text-brand-gold hover:bg-brand-gold hover:text-white rounded-[3px] text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-md">
            Book Eye Test
          </Link>
          <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="px-6 py-3 border border-brand-charcoal/20 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-brand-charcoal rounded-[3px] text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500">
            Call Boutique
          </a>
          <a href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white hover:bg-emerald-600 rounded-[3px] text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-500 shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
          </a>
          <a href={`mailto:${branch.email}`} className="px-6 py-3 border border-brand-charcoal/20 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-brand-charcoal rounded-[3px] text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Email Boutique
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-[3px] text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="max-w-[1240px] w-full mx-auto px-6 md:px-8 py-16 md:py-24 flex-1">

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 mb-12">

          {/* Left Column: Interactive Boutique details (Off-white luxury panel) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-black/[0.03] rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8 block">
                  Boutique Details
                </span>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[3px] bg-[#FAF9F6] border border-black/[0.03] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 block mb-1.5">Boutique Address</span>
                      <p className="text-[13px] text-brand-charcoal/70 leading-relaxed font-light">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[3px] bg-[#FAF9F6] border border-black/[0.03] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 block mb-1.5">Direct Line</span>
                      <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="text-sm font-semibold text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[3px] bg-[#FAF9F6] border border-black/[0.03] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 block mb-1.5">Digital Concierge</span>
                      <a href={`mailto:${branch.email}`} className="text-sm font-semibold text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                        {branch.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[3px] bg-[#FAF9F6] border border-black/[0.03] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 block mb-1.5">Boutique Timings</span>
                      <p className="text-[13px] text-brand-charcoal/75 font-light leading-relaxed">{branch.timings}</p>
                      <p className="text-[10px] text-brand-charcoal/45 font-light italic mt-1">Hours may vary slightly on public holidays</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-6 border-t border-black/[0.03]">
                    <div className="w-10 h-10 rounded-[3px] bg-[#FAF9F6] border border-black/[0.03] flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 block mb-1.5">Parking Amenities</span>
                      <p className="text-[13px] text-brand-charcoal/70 font-light">Complimentary client parking available on-site</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Experience Curation (Dark minimal luxury card) */}
          <div className="lg:col-span-2">
            <div className="bg-[#0D0D0D] border border-white/[0.03] rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8 block relative z-10">
                  Experience Curation
                </span>
                <ul className="space-y-6 relative z-10">
                  {[
                    "Free Clinical Eye Examinations",
                    "Authentic Global Designer Collections",
                    "Premium Custom Zeiss & Essilor Lenses",
                    "Personalized Haute Eyewear Styling",
                    "Curated Luxury Sunglass Galleries",
                  ].map((service, i) => (
                    <li key={i} className="flex items-center gap-3.5 text-[13px] font-light text-white/80">
                      <span className="text-brand-gold text-xs">◈</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 relative z-10">
                <p className="text-[11px] text-white/50 font-light leading-relaxed">
                  Visit the {cleanName} showroom today for an uncompromised standard of optical clarity and global designer luxury styling.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Location Map CTA Redirect Block (Standardized home page CTA outline style) */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#0D0D0D] border border-brand-gold/20 rounded-2xl overflow-hidden group shadow-xl hover:border-brand-gold transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)]"
        >
          <div className="relative flex flex-col items-center justify-center py-16 md:py-20 px-8 text-center bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]">
            <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-gold/25 transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)] border border-brand-gold/20">
              <MapPin className="w-6 h-6 text-brand-gold" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-3 block">Navigation Map</span>
            <h3 className="text-xl md:text-3xl font-light text-white uppercase tracking-tight mb-8">
              Open <em className="italic font-light font-serif text-brand-gold">Google Maps</em> Direction
            </h3>
            <span className="px-8 py-3.5 bg-brand-gold text-brand-charcoal text-[9px] font-bold uppercase tracking-[0.2em] rounded-[3px] group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-md">
              Locate Showroom
            </span>
          </div>
        </a>

      </section>

      {/* Global Call To Action Footer Integration */}
      <HelpChoosingCTA />
      
    </div>
  );
}
