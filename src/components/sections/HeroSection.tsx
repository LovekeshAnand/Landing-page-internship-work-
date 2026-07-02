"use client";

import React from "react";
import Image from "next/image";
import BrandLogo from "../common/BrandLogo";
import LeadForm from "./LeadForm";
import { Brand } from "@/data/landingData";

interface HeroSectionProps {
  activeBrand: Brand;
}

export default function HeroSection({ activeBrand }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 pt-6 pb-10 sm:px-6">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Steel construction background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.07] select-none pointer-events-none"
        />
        {/* Soft white-to-light-blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/80 to-white"></div>
        {/* Radial highlight for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-md flex flex-col items-center">
        {/* Main Campaign Headline */}
        <div className="w-full text-left mb-4.5 space-y-2.5 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[11px] font-bold text-sky-300 uppercase tracking-wider select-none">
            ⭐ Your Trusted Steel Marketplace
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
            Get Best Prices Today on{" "}
            <span className="text-sky-500">
              easeInfra
            </span>
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
            Compare quotes from verified steel suppliers near you.
          </p>
        </div>

        {/* Brand Creative Area (Banner) */}
        <div className="w-full mb-5.5 animate-fade-in-up">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-2 shadow-sm transition-all duration-300 hover:border-slate-300/80 hover:shadow-md">
            {/* Tag */}
            <span className="absolute top-3.5 left-3.5 z-10 rounded-lg bg-orange-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-sm select-none">
              Campaign Offer
            </span>
            
            {/* Banner Image Container */}
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={activeBrand.bannerUrl}
                alt={`${activeBrand.name} Campaign Creative`}
                fill
                sizes="(max-w-md) 100vw, 450px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102 select-none pointer-events-none opacity-95"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Subtle brand attribution text */}
            <div className="mt-2 px-1 flex justify-between items-center text-[9px] text-slate-400 font-bold select-none uppercase tracking-wide">
              <span>{activeBrand.name} Steel Dealership campaign</span>
              <span className="text-orange-500 flex items-center gap-1 font-extrabold">
                ● Active Quotes
              </span>
            </div>
          </div>
        </div>

        {/* Lead Capturing Form */}
        <div className="w-full animate-fade-in-up">
          <LeadForm activeBrand={activeBrand} />
        </div>

      </div>
    </section>
  );
}
