import React from "react";
import MainLandingPage from "@/components/sections/MainLandingPage";
import { BRANDS } from "@/data/landingData";

interface PageProps {
  searchParams: Promise<{ brand?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { brand } = await searchParams;
  
  // Find matching brand by id from query params, fallback to default "rathi"
  const activeBrand = 
    BRANDS.find(b => b.id === brand?.toLowerCase()) || 
    BRANDS.find(b => b.id === "rathi") || 
    BRANDS[0];

  return <MainLandingPage activeBrand={activeBrand} />;
}
