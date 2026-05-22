"use client";

import React from "react";
import { BranchCard } from "@/components/ui/BranchCard";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

const KERALA_BRANCHES = [
  {
    id: "br-changanassery",
    name: "Emirates Optician, Changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    hours: "Tuesday: 9:30 AM–7:30 PM",
    coordinates: "9.4447, 76.5413",
    slug: "changanassery",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    description: "Our premier Changanassery flagship lounge featuring expert clinical vision checks and styled collections."
  },
  {
    id: "br-thiruvalla",
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    hours: "Tuesday: 10 AM–7 PM",
    coordinates: "9.3835, 76.5740",
    slug: "thiruvalla",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    description: "A luxury boutique destination in Thiruvalla showcasing globally renowned designer eyewear."
  },
  {
    id: "br-kumbanad",
    name: "Emirates Optician, Kumbanad",
    address: "Bethel complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    hours: "Tuesday: 9:30 AM–7 PM",
    coordinates: "9.3892, 76.6577",
    slug: "kumbanad",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    description: "Dedicated optical care and personalized frame curation in the heart of Kumbanad."
  },
  {
    id: "br-kothamangalam",
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Malayenkeezhu, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    hours: "Tuesday: 9 AM–8 PM",
    coordinates: "10.0531, 76.6218",
    slug: "kothamangalam",
    image: "https://images.unsplash.com/photo-1511499767390-90342f16b1a7?auto=format&fit=crop&q=80&w=800",
    description: "Advanced testing facilities and high-fashion curation serving the Kothamangalam community."
  },
  {
    id: "br-pandalam",
    name: "Emirates Optician, Pandalam",
    address: "KARANDIYIL BUILDING, IV/558-2, THONALLOR, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    hours: "Tuesday: 10 AM–7:30 PM",
    coordinates: "9.2312, 76.6133",
    slug: "pandalam",
    image: "https://images.unsplash.com/photo-1509633282173-3eb4499382a6?auto=format&fit=crop&q=80&w=800",
    description: "An elegant optical lounge offering tailored frame fitting and state-of-the-art diagnostics."
  },
  {
    id: "br-kakkanad",
    name: "Emirates Optician, Kakkanad",
    address: "Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    hours: "Tuesday: 10 AM–8 PM",
    coordinates: "10.0159, 76.3418",
    slug: "kakkanad",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
    description: "Contemporary optical hub offering luxury collections and premium pediatric eye checkups."
  },
  {
    id: "br-kottayam",
    name: "Emirates Optician, Kottayam",
    address: "M D Commercial Centre Adjacent to Kallarackal Ladies Collections Adjacent to Karakkattu Ladies Collections, Kottayam - Kumily Rd, opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    hours: "Tuesday: 9:30 AM–8 PM",
    coordinates: "9.5916, 76.5222",
    slug: "kottayam",
    image: "https://images.unsplash.com/photo-1556740758-90eb39138efd?auto=format&fit=crop&q=80&w=800",
    description: "Our premium flagship retail store in Kottayam displaying elite luxury international brands."
  },
  {
    id: "br-ettumanur",
    name: "Emirates Optician, Ettumanur",
    address: "Adams 2 101, near HP petrol station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    hours: "Tuesday: 9 AM–8 PM",
    coordinates: "9.6702, 76.5621",
    slug: "ettumanur",
    image: "https://images.unsplash.com/photo-1621868310160-c3d52c42d3cf?auto=format&fit=crop&q=80&w=800",
    description: "Custom styling consultation and comprehensive vision diagnostics at our Kavala station."
  },
  {
    id: "br-angamaly",
    name: "Emirates Optician, Angamaly",
    address: "Kuruvila Square, Junction, M C Road, near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    hours: "Tuesday: 9 AM–8 PM",
    coordinates: "10.1983, 76.3862",
    slug: "angamaly",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
    description: "Advanced ophthalmic solutions and modern optical lens personalization at MC Road."
  },
  {
    id: "br-irumpanam",
    name: "Emirates Optician, Irumpanam",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    hours: "Tuesday: 10 AM–9 PM",
    coordinates: "9.9576, 76.3478",
    slug: "irumpanam",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    description: "Spacious optical atelier on Seaport-Airport Road showcasing authentic luxury sports eyewear."
  }
];

export function BranchGrid() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <Reveal delay={0.2}>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 mb-4 block">
              10 Convenient Locations
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="h2-editorial text-black">
              Our Destination Boutiques
            </h2>
          </Reveal>
        </div>

        {/* Cinematic Grid */}
        <GridStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mb-32">
          {KERALA_BRANCHES.map((branch) => (
            <StaggerItem key={branch.id}>
              <BranchCard 
                name={branch.name}
                address={branch.address}
                description={branch.description}
                image={branch.image}
                phone={branch.phone}
                hours={branch.hours}
                coordinates={branch.coordinates}
                slug={branch.slug}
              />
            </StaggerItem>
          ))}
        </GridStagger>

        {/* Book Your Visit Today CTA Section */}
        <div className="border-t border-black/5 pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-black uppercase font-heading mb-6">
                Book Your <em className="italic text-brand-gold">Visit Today</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-black/60 font-light max-w-xl mx-auto mb-12 leading-relaxed">
                Free eye testing available at all branches. Book an appointment or walk in anytime.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <LuxuryButton asChild className="bg-black text-white hover:bg-brand-gold px-12">
                  <a href="/book-eye-test">Book Free Eye Test</a>
                </LuxuryButton>
                <LuxuryButton asChild variant="secondary" className="px-12">
                  <a href="tel:9682929968">Call 9682929968</a>
                </LuxuryButton>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
