"use client";

import React, { useEffect, useState } from "react";

interface RedirectTimerProps {
  brandId?: string;
}

export default function RedirectTimer({ brandId }: RedirectTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    // 1. Push lead submission conversion event to Google Tag Manager / Analytics dataLayer
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      
      const currentPath = brandId ? `/${brandId}/thank-you` : "/thank-you";
      
      // Prevent duplicate pushes on mount (especially useful during dev mode StrictMode)
      const hasFiredRecently = win.dataLayer.some((item: any) => 
        item.event === "lead_submitted" && 
        item.page_path === currentPath && 
        item.submission_timestamp &&
        (new Date().getTime() - new Date(item.submission_timestamp).getTime()) < 1500
      );

      if (!hasFiredRecently) {
        // Page View / Conversion Event
        win.dataLayer.push({
          event: "lead_submitted",
          page_path: currentPath,
          brand: brandId || "unknown",
          page_title: "Thank You - Requirement Submitted",
          submission_timestamp: new Date().toISOString()
        });

        // Track GTM custom page view
        win.dataLayer.push({
          event: "custom_page_view",
          page_path: currentPath,
          brand: brandId || "unknown"
        });
      }
    }

    // 2. Set up interval for the countdown
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 3. Set up timeout for the redirection & engagement time push
    const timeoutId = setTimeout(() => {
      if (typeof window !== "undefined") {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: "engagement_time",
          seconds: 3,
          page_path: brandId ? `/${brandId}/thank-you` : "/thank-you"
        });
      }
      const redirectUrl = brandId 
        ? `https://www.easeinfra.com/products/tmt-bar/${brandId}`
        : "https://easeinfra.com";
      window.location.href = redirectUrl;
    }, 3000);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const whatsappBtn = target.closest("#whatsapp-support-btn") || target.closest("#whatsapp-support-btn-desktop");
      if (whatsappBtn) {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: "click_whatsapp",
          location: "thank_you_page",
          brand: brandId || "unknown"
        });
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [brandId]);

  return (
    <>
      {/* Smooth Loading Progress Bar at the top of the screen */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-[100] select-none pointer-events-none">
        <div 
          className="h-full bg-sky-500 transition-all duration-1000 ease-linear"
          style={{ width: `${(secondsLeft / 3) * 100}%` }}
        />
      </div>

      {/* Elegant floating toast at the bottom of the screen */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-lg z-[100] tracking-wide select-none animate-pulse flex items-center gap-2 border border-slate-800">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></div>
        Redirecting to easeinfra.com in {secondsLeft}s...
      </div>
    </>
  );
}
