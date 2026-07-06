"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import HeroSection from "./HeroSection";
import LeadForm from "./LeadForm";
import ProcessSection from "./ProcessSection";
import BenefitsSection from "./BenefitsSection";
import Footer from "./Footer";
import BrandLogo from "../common/BrandLogo";
import LanguageToggle from "../common/LanguageToggle";
import { Brand } from "@/data/landingData";

interface MainLandingPageProps {
  activeBrand: Brand;
}

export default function MainLandingPage({ activeBrand: initialBrand }: MainLandingPageProps) {
  const [activeBrand, setActiveBrand] = useState<Brand>(initialBrand);

  useEffect(() => {
    setActiveBrand(initialBrand);
  }, [initialBrand]);

  return (
    <main className="min-h-screen w-full bg-slate-100 flex justify-center items-center py-0 md:py-6 lg:py-0 lg:bg-white">
      {/* 
        MOBILE VERSION (Rendered on screen sizes < lg)
        - Unchanged structure and styling to ensure mobile display is preserved 100%
      */}
      <div className="w-full max-w-md bg-white flex flex-col justify-between shadow-2xl md:rounded-[32px] md:overflow-hidden md:border md:border-slate-200 relative lg:hidden">
        {/* Sticky Header/Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100/80 py-3.5 px-5 flex items-center justify-between select-none">
          <BrandLogo />
          <LanguageToggle />
        </header>

        {/* Core Sections Stack */}
        <div className="flex-1 flex flex-col">
          {/* Hero Section with Campaign Brand and Lead Capturing Form */}
          <HeroSection activeBrand={activeBrand} onBrandChange={setActiveBrand} />

          {/* Stepper Flow (Post -> Get Quotes -> Close Deal) */}
          <ProcessSection />

          {/* Buyer & Seller Value Propositions (Interactive Sliding Tabs) */}
          <BenefitsSection />
        </div>

        {/* Footer: Credits & Campaign Notice */}
        <Footer />
      </div>

      {/* 
        DESKTOP VERSION (Rendered on screen sizes >= lg)
        - Full screen width layout
        - Form on the right in Hero Section
        - Brand creative is big on the left
      */}
      <div className="hidden lg:flex flex-col w-full bg-white relative">
        {/* Header/Navbar */}
        <header className="w-full bg-white border-b border-slate-100/80 py-2.5 px-8 flex items-center justify-between select-none">
          <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between">
            <BrandLogo />
            <LanguageToggle />
          </div>
        </header>

        {/* Desktop Hero Section: 2 columns */}
        <div className="w-full bg-white">
          <div className="max-w-[1360px] mx-auto grid grid-cols-12 gap-6 px-6 md:px-8 pt-1 pb-8 items-start">
            {/* Left Column: Big Creative Banner */}
            <div className="col-span-7 flex flex-col justify-between pr-4 pt-5">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[11px] font-bold text-sky-500 uppercase tracking-wider select-none">
                  ⭐ Your Trusted Steel Marketplace
                </div>
                <h1 className="text-3xl lg:text-[44px] lg:leading-[1.15] font-black tracking-tight text-slate-900 leading-tight">
                  Get Best Prices Today on{" "}
                  <span className="text-sky-500">
                    {activeBrand.name} TMT Rebar
                  </span>
                </h1>
                <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
                  Compare wholesale quotes from verified steel suppliers near you.
                </p>
              </div>

            {/* Banner Creative Image */}
            <div className="mt-4 relative w-full h-[430px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
              <Image
                src={activeBrand.bannerUrl}
                alt={`${activeBrand.name} Campaign Creative`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-center select-none pointer-events-none rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent rounded-xl"></div>
            </div>
            </div>

            {/* Right Column: LeadCapturing Form */}
            <div className="col-span-5 flex items-start justify-center pl-6 border-l border-slate-100 pt-16">
              <div className="w-full max-w-[460px]">
                <LeadForm activeBrand={activeBrand} onBrandChange={setActiveBrand} />
              </div>
            </div>
          </div>
        </div>

        {/* Stepper Flow (Post -> Get Quotes -> Close Deal) */}
        <div className="border-t border-slate-100 bg-slate-50/30 w-full">
          <ProcessSection />
        </div>

        {/* Buyer & Seller Value Propositions */}
        <div className="border-t border-slate-100 bg-slate-50/50 w-full">
          <BenefitsSection />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating WhatsApp Button (visible globally but positioned responsively) */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/919319917006?text=Hello%20EaseInfra%2C%20I%20am%20interested%20in%20buying%20steel."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:right-[calc(50%-200px)] lg:right-8 z-40 transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <Image 
          src="/whatsapp.png" 
          alt="WhatsApp" 
          width={80} 
          height={80} 
          className="w-20 h-20 object-contain drop-shadow-lg"
        />
      </a>
    </main>
  );
}
