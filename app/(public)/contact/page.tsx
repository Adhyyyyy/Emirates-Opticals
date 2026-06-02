import React from "react";
import { ContactPageContent } from "@/components/sections/contact/ContactPageContent";

export const metadata = {
  title: "Contact Showrooms & Branch Locations in Kerala | Emirates Optician",
  description: "Get in touch with Emirates Optician. Find direct contact numbers, Google Map locations, and store hours for Changanassery, Thiruvalla, Kottayam, Angamaly, and other showrooms.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
