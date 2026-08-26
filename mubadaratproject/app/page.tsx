import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/herosection";
import GallerySection from "@/components/home/gallerysection";
import RegistrationForm from "@/components/home/registrationform";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans" dir="rtl">
      <Navbar />
      <main>
        <HeroSection />
        <GallerySection />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}