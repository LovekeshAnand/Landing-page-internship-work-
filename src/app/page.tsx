import React, { Suspense } from "react";
import Image from "next/image";
import CampaignWrapper from "@/components/sections/CampaignWrapper";
import ProcessSection from "@/components/sections/ProcessSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import Footer from "@/components/sections/Footer";
import BrandLogo from "@/components/common/BrandLogo";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-slate-100 flex justify-center items-stretch md:py-6 lg:py-12">
      {/* 
        Centered mobile wrapper:
        - Full width & height on mobile devices (no rounding/shadow/margins)
        - Centered, shadowed card structure on tablets & desktop (md sizes and up)
      */}
      <div className="w-full max-w-md bg-white flex flex-col justify-between shadow-2xl md:rounded-[32px] md:overflow-hidden md:border md:border-slate-200 relative">
        
        {/* Sticky Header/Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100/80 py-3.5 px-5 flex items-center justify-between select-none">
          <BrandLogo />
        </header>

        {/* Core Sections Stack */}
        <div className="flex-1 flex flex-col">
          {/* Section 1: Dynamic campaign Hero, Logo, Creative and Form */}
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center p-12 bg-white min-h-[350px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-3 tracking-wider select-none">
                Loading Campaign...
              </span>
            </div>
          }>
            <CampaignWrapper />
          </Suspense>

          {/* Section 2: Stepper Flow (Post -> Get Quotes -> Close Deal) + secondary CTA */}
          <ProcessSection />

          {/* Section 3: Buyer & Seller Value Propositions (Interactive Sliding Tabs) */}
          <BenefitsSection />
        </div>

        {/* Footer: Credits & Campaign Notice */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/917672781782?text=Hello%20EaseInfra%2C%20I%20am%20interested%20in%20buying%20steel."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:right-[calc(50%-200px)] z-40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer hover:scale-105"
          aria-label="Contact on WhatsApp"
        >
          <Image 
            src="/whatsapp.png" 
            alt="WhatsApp" 
            width={48} 
            height={48} 
            className="w-12 h-12 object-contain drop-shadow-lg"
          />
        </a>
      </div>
    </main>
  );
}
