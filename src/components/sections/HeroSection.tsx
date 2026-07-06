"use client";

import React from "react";
import Image from "next/image";
import BrandLogo from "../common/BrandLogo";
import LeadForm from "./LeadForm";
import { Brand } from "@/data/landingData";

interface HeroSectionProps {
  activeBrand: Brand;
  onBrandChange?: (brand: Brand) => void;
}

export default function HeroSection({ activeBrand, onBrandChange }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 pt-6 pb-10 sm:px-6">
      

      <div className="relative z-10 mx-auto max-w-md flex flex-col items-center">
        {/* Main Campaign Headline */}
        <div className="w-full text-left mb-4.5 space-y-2.5 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[11px] font-bold text-sky-500 uppercase tracking-wider select-none">
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
            
            {/* Banner Image Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
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
          </div>
        </div>

        {/* Lead Capturing Form */}
        <div className="w-full animate-fade-in-up">
          <LeadForm activeBrand={activeBrand} onBrandChange={onBrandChange} />
        </div>

      </div>
    </section>
  );
}
