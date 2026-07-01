import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src="/headerlogo.png"
        alt="EaseInfra Logo"
        width={130}
        height={32}
        priority
        className="h-8 w-auto object-contain"
      />
    </div>
  );
}
