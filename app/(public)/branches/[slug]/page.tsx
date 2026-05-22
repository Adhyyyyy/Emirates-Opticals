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
  CheckCircle2
} from "lucide-react";

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
    timings: "Tuesday: 9:30 AM–7:30 PM",
    coordinates: "9.4447, 76.5413",
    whatsapp: "+918714032601",
    storefrontImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
  },
  thiruvalla: {
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    email: "Thiruvalla@EmiratesOptician.com",
    timings: "Tuesday: 10 AM–7 PM",
    coordinates: "9.3835, 76.5740",
    whatsapp: "+918714032602",
    storefrontImage: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=1600",
  },
  kumbanad: {
    name: "Emirates Optician, Kumbanad",
    address: "Bethel complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    email: "Kumbanad@EmiratesOptician.com",
    timings: "Tuesday: 9:30 AM–7 PM",
    coordinates: "9.3892, 76.6577",
    whatsapp: "+918714032603",
    storefrontImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1600",
  },
  kothamangalam: {
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Malayenkeezhu, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    email: "Kothamangalam@EmiratesOptician.com",
    timings: "Tuesday: 9 AM–8 PM",
    coordinates: "10.0531, 76.6218",
    whatsapp: "+918714032607",
    storefrontImage: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=1600",
  },
  pandalam: {
    name: "Emirates Optician, Pandalam",
    address: "KARANDIYIL BUILDING, IV/558-2, THONALLOR, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    email: "Pandalam@EmiratesOptician.com",
    timings: "Tuesday: 10 AM–7:30 PM",
    coordinates: "9.2312, 76.6133",
    whatsapp: "+918714032606",
    storefrontImage: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=1600",
  },
  kakkanad: {
    name: "Emirates Optician, Kakkanad",
    address: "Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    email: "Kakkanad@EmiratesOptician.com",
    timings: "Tuesday: 10 AM–8 PM",
    coordinates: "10.0159, 76.3418",
    whatsapp: "+917736441211",
    storefrontImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1600",
  },
  kottayam: {
    name: "Emirates Optician, Kottayam",
    address: "M D Commercial Centre Adjacent to Kallarackal Ladies Collections Adjacent to Karakkattu Ladies Collections, Kottayam - Kumily Rd, opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    email: "Kottayam@EmiratesOptician.com",
    timings: "Tuesday: 9:30 AM–8 PM",
    coordinates: "9.5916, 76.5222",
    whatsapp: "+918547866755",
    storefrontImage: "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=1600",
  },
  ettumanur: {
    name: "Emirates Optician, Ettumanur",
    address: "Adams 2 101, near HP petrol station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    email: "Ettumanur@EmiratesOptician.com",
    timings: "Tuesday: 9 AM–8 PM",
    coordinates: "9.6702, 76.5621",
    whatsapp: "+918714032604",
    storefrontImage: "https://images.unsplash.com/photo-1621868310160-c3d52c42d3cf?auto=format&fit=crop&q=80&w=1600",
  },
  angamaly: {
    name: "Emirates Optician, Angamaly",
    address: "Kuruvila Square, Junction, M C Road, near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    email: "Angamaly@EmiratesOptician.com",
    timings: "Tuesday: 9 AM–8 PM",
    coordinates: "10.1983, 76.3862",
    whatsapp: "+918714032605",
    storefrontImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1600",
  },
  irumpanam: {
    name: "Emirates Optician, Irumpanam",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    email: "Irumpanam@EmiratesOptician.com",
    timings: "Tuesday: 10 AM–9 PM",
    coordinates: "9.9576, 76.3478",
    whatsapp: "+918889990533",
    storefrontImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
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

  return (
    <div className="bg-white min-h-screen text-black">

      {/* Cinematic Banner — fills from top behind navbar */}
      <section className="relative w-full h-[60vh] min-h-[480px] bg-brand-charcoal overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={branch.storefrontImage}
            alt={`${branch.name} storefront`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Breadcrumb overlaid at top of banner */}
        <div className="absolute top-0 left-0 right-0 pt-28 md:pt-36 lg:pt-40 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between py-4">
            <Link
              href="/branches"
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Branches
            </Link>
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">
              Emirates Opticians
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 pb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-3 block">
            Kerala Boutique Network
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tighter leading-none font-heading">
            {branch.name}
          </h1>
        </div>
      </section>

      {/* Sticky Quick Action Bar */}
      <div className="bg-white border-b border-black/5 py-4 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-center gap-3">
          <a href="/book-eye-test" className="px-5 py-2.5 bg-black text-white hover:bg-brand-gold rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300">
            Book Eye Test
          </a>
          <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="px-5 py-2.5 border border-black/15 hover:border-black rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300">
            Call Branch
          </a>
          <a href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#25d366] text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:brightness-105">
            <MessageSquare className="w-3 h-3" /> WhatsApp Us
          </a>
          <a href={`mailto:${branch.email}`} className="px-5 py-2.5 border border-black/15 hover:border-black rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2">
            <Mail className="w-3 h-3" /> Email Us
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2">
            <Navigation className="w-3 h-3" /> Get Directions
          </a>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Two-column: Info + Services */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

          {/* Branch Information — wider left column */}
          <div className="lg:col-span-3">
            <div className="border border-black/8 rounded-3xl p-8 md:p-10 h-full">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold mb-8">
                Branch Information
              </p>
              <div className="space-y-7">

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-black/45" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 block mb-1.5">Address</span>
                    <p className="text-sm text-black/70 leading-relaxed font-light">{branch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-black/45" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 block mb-1.5">Phone</span>
                    <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="text-sm font-semibold text-black hover:text-brand-gold transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-black/45" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 block mb-1.5">Email</span>
                    <a href={`mailto:${branch.email}`} className="text-sm font-semibold text-black hover:text-brand-gold transition-colors">
                      {branch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-black/45" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 block mb-1.5">Opening Hours</span>
                    <p className="text-sm text-black/70 font-light">{branch.timings}</p>
                    <p className="text-[11px] text-black/30 font-light italic mt-1">Hours may vary on holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-black/5">
                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center shrink-0 text-base leading-none">
                    🅿️
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 block mb-1.5">Parking</span>
                    <p className="text-sm text-black/70 font-light">Ample parking space available</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Available Services — right column */}
          <div className="lg:col-span-2">
            <div className="bg-brand-charcoal rounded-3xl p-8 md:p-10 h-full relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold mb-8 relative z-10">
                Available Services
              </p>
              <ul className="space-y-5 relative z-10">
                {[
                  "Free Professional Eye Testing",
                  "Authentic Branded Eyewear",
                  "Quality Lenses",
                  "Expert Styling Consultation",
                  "Premium Sunglasses",
                ].map((service, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light text-white/75">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Location Map — full width */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full border border-black/8 rounded-3xl overflow-hidden group"
        >
          <div className="bg-slate-50 group-hover:bg-slate-100 transition-colors duration-500 flex flex-col items-center justify-center py-16 md:py-20 px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-6 h-6 text-brand-gold" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-black/30 mb-2">Location Map</span>
            <p className="text-base font-semibold text-black uppercase tracking-tight font-heading mb-6">{branch.name}</p>
            <span className="px-8 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-full group-hover:bg-brand-gold transition-colors duration-300">
              Open in Google Maps
            </span>
          </div>
        </a>

      </section>
    </div>
  );
}
