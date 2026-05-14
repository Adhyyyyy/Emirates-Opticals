import React from "react";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactBranchShowcase } from "@/components/sections/contact/ContactBranchShowcase";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";

export const metadata = {
  title: "Contact Us | Premium Customer Care - Emirates Optician",
  description: "Get in touch with Emirates Optician for professional eye care guidance, luxury eyewear assistance, and personalized support across Kerala.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <ContactHero />
      <ContactForm />
      <ContactBranchShowcase />
      <ContactFAQ />
    </div>
  );
}
