"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BranchCard } from "@/components/ui/BranchCard";
import { Calendar, Phone } from "lucide-react";

const KERALA_BRANCHES = [
  {
    id: "br-changanassery",
    name: "Emirates Optician, Changanassery",
    address: "Manjippuzha Tower, Mathumoola, Changanassery, Kerala 686103, India",
    phone: "+91 87140 32601",
    hours: "Monday - Saturday: 9:30 AM - 7:30 PM",
    coordinates: "9.4447, 76.5413",
    slug: "changanassery",
    image: "/branches/changanssery.png",
    description: "Elegant optical retail experience with expert customer assistance."
  },
  {
    id: "br-thiruvalla",
    name: "Emirates Optician, Thiruvalla",
    address: "Karappunnasseril arcade, Thirumoolapuram, Thiruvalla, Kerala 689115, India",
    phone: "+91 87140 32602",
    hours: "Monday - Saturday: 9:30 AM - 7:30 PM",
    coordinates: "9.3835, 76.5740",
    slug: "thiruvalla",
    image: "/branches/thiruvalla.png",
    description: "A luxury boutique destination in Thiruvalla showcasing globally renowned designer eyewear."
  },
  {
    id: "br-kumbanad",
    name: "Emirates Optician, Kumbanad",
    address: "Bethel complex, Kumbanad, Kerala 689547, India",
    phone: "+91 87140 32603",
    hours: "Monday - Saturday: 9:30 AM - 7:30 PM",
    coordinates: "9.3892, 76.6577",
    slug: "kumbanad",
    image: "/branches/kumbanad.png",
    description: "Dedicated optical care and personalized frame curation in the heart of Kumbanad."
  },
  {
    id: "br-kothamangalam",
    name: "Emirates Optician, Kothamangalam",
    address: "Pulickal Square, Malayinkeezhu Kozhipally Bypass Rd, Malayenkeezhu, Kothamangalam, Kerala 686691, India",
    phone: "+91 87140 32607",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM",
    coordinates: "10.0531, 76.6218",
    slug: "kothamangalam",
    image: "/branches/Kothamangalam.png",
    description: "Advanced testing facilities and high-fashion curation serving the Kothamangalam community."
  },
  {
    id: "br-pandalam",
    name: "Emirates Optician, Pandalam",
    address: "KARANDIYIL BUILDING, IV/558-2, THONALLOR, Pandalam, Kerala 689501, India",
    phone: "+91 87140 32606",
    hours: "Monday - Saturday: 9:30 AM - 7:30 PM",
    coordinates: "9.2312, 76.6133",
    slug: "pandalam",
    image: "/branches/Pandalam.png",
    description: "An elegant optical lounge offering tailored frame fitting and state-of-the-art diagnostics."
  },
  {
    id: "br-kakkanad",
    name: "Emirates Optician, Kakkanad",
    address: "Seaport - Airport Rd, Chittethukara, Kakkanad, Kerala 682037, India",
    phone: "+91 77364 41211",
    hours: "Monday - Saturday: 10:00 AM - 8:00 PM",
    coordinates: "10.0159, 76.3418",
    slug: "kakkanad",
    image: "/branches/kakkanad.png",
    description: "Modern premium optical experience with luxury eyewear collections."
  },
  {
    id: "br-kottayam",
    name: "Emirates Optician, Kottayam",
    address: "M D Commercial Centre Adjacent to Kallarackal Ladies Collections Adjacent to Karakkattu Ladies Collections, Kottayam - Kumily Rd, opposite Joseph Antony's Petrol Pump, Kottayam, Kerala 686001, India",
    phone: "+91 85478 66755",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM",
    coordinates: "9.5916, 76.5222",
    slug: "kottayam",
    image: "/branches/kottayam.png",
    description: "Trusted destination for professional eye care and authentic premium eyewear."
  },
  {
    id: "br-ettumanur",
    name: "Emirates Optician, Ettumanur",
    address: "Adams 2 101, near HP petrol station, Kavala, Ettumanoor, Kerala 686562, India",
    phone: "+91 87140 32604",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM",
    coordinates: "9.6702, 76.5621",
    slug: "ettumanur",
    image: "/branches/ettumanur.png",
    description: "Custom styling consultation and comprehensive vision diagnostics at our Kavala station."
  },
  {
    id: "br-angamaly",
    name: "Emirates Optician, Angamaly",
    address: "Kuruvila Square, Junction, M C Road, near Moolans FamilyMart, East Nagar, Kavaraparmbu, Angamaly, Kerala 683572, India",
    phone: "+91 87140 32605",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM",
    coordinates: "10.1983, 76.3862",
    slug: "angamaly",
    image: "/branches/angamaly.png",
    description: "Advanced ophthalmic solutions and modern optical lens personalization at MC Road."
  },
  {
    id: "br-irumpanam",
    name: "Emirates Optician, Irumpanam",
    address: "MM Arcade, Seaport - Airport Rd, Irumpanam, Thrippunithura, Kochi, Ernakulam, Kerala 682309, India",
    phone: "+91 88899 90533",
    hours: "Monday - Saturday: 10:00 AM - 8:00 PM",
    coordinates: "9.9576, 76.3478",
    slug: "irumpanam",
    image: "/branches/Irumpanam.png",
    description: "Spacious optical atelier on Seaport-Airport Road showcasing authentic luxury sports eyewear."
  }
];

export function BranchGrid() {
  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-20 md:pt-12 md:pb-24 overflow-hidden" id="brand-grid">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title */}
        <div className="md:hidden text-center mb-12">
          <h1 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Our Branches
          </h1>
        </div>
        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KERALA_BRANCHES.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
            >
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
