"use client";

import React, { useState } from "react";
import { 
  Check, 
  Coins, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Percent, 
  UserCheck, 
  Wallet, 
  LayoutGrid,
  Clock,
  Globe,
  TrendingUp,
  Handshake,
  Network,
  Tag
} from "lucide-react";
import { BUYER_BENEFITS, SELLER_BENEFITS, Benefit } from "@/data/landingData";

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("buyers");

  const getIcon = (iconName: string) => {
    const iconStyles = "h-5 w-5 text-brand-blue";
    switch (iconName) {
      // Buyer Icons
      case "currency":
        return <Coins className={iconStyles} />;
      case "shield":
        return <ShieldCheck className={iconStyles} />;
      case "card":
        return <CreditCard className={iconStyles} />;
      case "truck":
        return <Truck className={iconStyles} />;
      case "clock":
        return <Clock className={iconStyles} />;
      case "globe":
        return <Globe className={iconStyles} />;
      case "handshake":
        return <Handshake className={iconStyles} />;
      case "network":
        return <Network className={iconStyles} />;
      case "tag":
        return <Tag className={iconStyles} />;
      // Seller Icons
      case "trend":
        return <TrendingUp className={iconStyles} />;
      case "verify":
        return <UserCheck className={iconStyles} />;
      case "percent":
        return <Percent className={iconStyles} />;
      case "wallet":
        return <Wallet className={iconStyles} />;
      case "grid":
        return <LayoutGrid className={iconStyles} />;
      default:
        return <Check className={iconStyles} />;
    }
  };

  return (
    <section className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-18">
      <div className="mx-auto max-w-md">
        
        {/* Section Header */}
        <div className="text-center mb-9">
          <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
            Built for Buyers and Sellers!
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Our platform connects both sides of the trade with transparent live steel prices and direct supplier matching.
          </p>
        </div>

        {/* Sliding Tab Switcher */}
        <div className="p-1 bg-slate-200/60 rounded-xl flex items-center mb-8 border border-slate-200/20 select-none">
          <button
            onClick={() => setActiveTab("buyers")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer
              ${activeTab === "buyers" ? "bg-white text-slate-850 shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-700"}
            `}
          >
            For Buyers
          </button>
          <button
            onClick={() => setActiveTab("sellers")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer
              ${activeTab === "sellers" ? "bg-white text-slate-850 shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-700"}
            `}
          >
            For Sellers
          </button>
        </div>

        {/* Dynamic Benefits List with animation */}
        <div className="space-y-4">
          
          {(activeTab === "buyers" ? BUYER_BENEFITS : SELLER_BENEFITS).map((benefit: Benefit, index: number) => (
            <div
              key={`${activeTab}-${index}`}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100/60 shadow-sm animate-fade-in-up transition-all duration-300 hover:border-slate-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Holder */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light/60 text-brand-blue">
                {getIcon(benefit.icon)}
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-850 tracking-tight">
                  {benefit.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Small Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 select-none">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            100% Verified Business Network
          </span>
        </div>

      </div>
    </section>
  );
}
