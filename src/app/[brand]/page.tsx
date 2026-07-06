import React from "react";
import { notFound } from "next/navigation";
import MainLandingPage from "@/components/sections/MainLandingPage";
import { BRANDS } from "@/data/landingData";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  
  // Find matching brand by id from path parameter
  const activeBrand = BRANDS.find(b => b.id === brand.toLowerCase());

  if (!activeBrand) {
    notFound();
  }

  return <MainLandingPage activeBrand={activeBrand} />;
}

// Generate static params for optimal static site generation (SSG)
export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    brand: brand.id,
  }));
}
