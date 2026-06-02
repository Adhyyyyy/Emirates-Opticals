import React from "react";
import { BookingHero } from "@/components/sections/booking/BookingHero";
import { BookingForm } from "@/components/sections/booking/BookingForm";
import { BookingFAQ } from "@/components/sections/booking/BookingFAQ";

export const metadata = {
  title: "Book Computerized Eye Test & Vision Consultation Online | Emirates Optician",
  description: "Schedule a professional computerized eye checkup and designer frame styling consultation online at any Emirates Optician showroom across Kerala.",
  alternates: { canonical: "/book-eye-test" },
};

export default function BookEyeTestPage() {
  return (
    <div className="flex flex-col w-full">
      <BookingHero />
      <BookingForm />
      <BookingFAQ />
    </div>
  );
}
