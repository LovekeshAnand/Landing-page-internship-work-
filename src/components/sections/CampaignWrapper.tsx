"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "./HeroSection";
import { BRANDS } from "@/data/landingData";

export default function CampaignWrapper() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");

  // Find matching brand by id, default to rathi
  const activeBrand = 
    BRANDS.find(b => b.id === brandParam?.toLowerCase()) || 
    BRANDS.find(b => b.id === "rathi") || 
    BRANDS[0];

  return <HeroSection activeBrand={activeBrand} />;
}
