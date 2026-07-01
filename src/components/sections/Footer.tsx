"use client";

import React from "react";
import BrandLogo from "../common/BrandLogo";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-100 px-4 py-8 text-center select-none">
      <div className="mx-auto max-w-md flex flex-col items-center gap-4">
        
        {/* Footer Brand Logo */}
        <BrandLogo className="opacity-90 hover:opacity-100 transition-opacity duration-200" />
        
        {/* Short Text */}
        <p className="text-[10px] text-slate-400 leading-normal max-w-xs font-semibold">
          EaseInfra is India’s most trusted steel marketplace, helping you buy steel online with confidence. We connect verified steel buyers and suppliers, show live steel prices, and offer access to unsold inventory through competitive bids.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <a href="https://easeinfra.com/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
          <span className="text-slate-350 select-none">•</span>
          <a href="https://easeinfra.com/terms" className="hover:text-brand-blue transition-colors">Terms of Service</a>
          <span className="text-slate-350 select-none">•</span>
          <a href="https://easeinfra.com/contact" className="hover:text-brand-blue transition-colors">Support</a>
        </div>

        {/* Horizontal Line */}
        <div className="w-full border-t border-slate-100 my-1"></div>

        {/* Copyright */}
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          © {new Date().getFullYear()} EaseInfra. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
