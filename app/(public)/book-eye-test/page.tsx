import React from "react";
import { BookingHero } from "@/components/sections/booking/BookingHero";
import { BookingForm } from "@/components/sections/booking/BookingForm";
import { BookingExpectations } from "@/components/sections/booking/BookingExpectations";
import { BookingFAQ } from "@/components/sections/booking/BookingFAQ";

export const metadata = {
  title: "Book Free Eye Test | Professional Eye Care - Emirates Optician",
  description: "Schedule your free professional eye examination at Emirates Optician. Experience expert consultation and personalized eyewear guidance across Kerala.",
};

export default function BookEyeTestPage() {
  return (
    <div className="flex flex-col w-full">
      <BookingHero />
      <BookingExpectations />
      <BookingForm />
      <BookingFAQ />
    </div>
  );
}
