import React from "react";
import Image from "next/image";
import BrandLogo from "@/components/common/BrandLogo";
import Footer from "@/components/sections/Footer";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import LanguageToggle from "@/components/common/LanguageToggle";
import RedirectTimer from "@/app/thank-you/RedirectTimer";
import { BRANDS } from "@/data/landingData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export const metadata: Metadata = {
  title: "Thank You - Requirement Submitted | EaseInfra",
  description: "Your steel requirement has been submitted. Our expert will contact you shortly to match you with verified suppliers.",
};

export default async function BrandThankYouPage({ params }: PageProps) {
  const { brand } = await params;
  const activeBrand = BRANDS.find((b) => b.id === brand.toLowerCase());

  if (!activeBrand) {
    notFound();
  }

  // Set up client-side-friendly scripts to track whatsapp clicks
  return (
    <main className="min-h-screen w-full bg-slate-100 flex justify-center items-stretch py-0 md:py-6 lg:py-0 lg:bg-white lg:block">
      
      {/* 3-Second Redirect Timer & GTM Event Sender */}
      <RedirectTimer brandId={activeBrand.id} />
      
      {/* 
        MOBILE/TABLET VERSION (Rendered on screen sizes < lg)
        - Kept exactly as it was to ensure 100% fidelity on smaller screens
      */}
      <div className="w-full max-w-md bg-white flex flex-col justify-between shadow-2xl md:rounded-[32px] md:overflow-hidden md:border md:border-slate-200 relative animate-fade-in-up lg:hidden">
        
        {/* Sticky Header/Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100/80 py-3.5 px-5 flex items-center justify-between select-none">
          <BrandLogo />
          <LanguageToggle />
        </header>

        {/* Content Container */}
        <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-8 text-center space-y-8 bg-gradient-to-b from-white via-slate-50/50 to-white">
          
          {/* Animated Success Badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping duration-1000"></div>
            <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow-md">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
          </div>

          {/* Success Messaging */}
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              ✅ Requirement Submitted
            </h1>
            <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
              Our expert will contact you shortly. Meanwhile, explore verified sellers.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="w-full space-y-3 pt-2">
            <a
              id="view-sellers-btn"
              href={`https://www.easeinfra.com/products/tmt-bar/${activeBrand.id}`}
              className="group flex items-center justify-center gap-2 w-full bg-sky-500 text-white text-sm font-bold py-3.5 px-4 rounded-xl hover:bg-sky-600 active:scale-98 transition-all shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 cursor-pointer"
            >
              View Verified Sellers
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              id="whatsapp-support-btn"
              href="https://wa.me/919319917006?text=Hello%20EaseInfra%2C%20I%20just%20submitted%20a%20steel%20requirement%20on%20your%20landing%20page."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white text-sm font-bold py-3.5 px-4 rounded-xl hover:bg-emerald-600 active:scale-98 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
            >
              <Image 
                src="/whatsapp.png" 
                alt="WhatsApp" 
                width={25} 
                height={25} 
                className="brightness-0 invert object-contain"
              />
              Chat on WhatsApp
            </a>
          </div>

          {/* What happens next stepper */}
          <div className="w-full border border-slate-100 rounded-2xl bg-white p-4.5 shadow-sm text-left space-y-3.5">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider select-none">
              What Happens Next?
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold text-sky-500 border border-sky-100">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700">Requirement Submitted</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Your steel requirement has been successfully submitted.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold text-sky-500 border border-sky-100">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700">Sent to Verified Sellers</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Your request is shared to verified sellers to get best price. 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold text-sky-500 border border-sky-100">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700">Get Quotes & Close Deal</h5>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Compare different qoutes and close the deal directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 select-none pt-2">
            <ShieldCheck className="h-4.5 w-4.5 text-sky-500/80" />
            100% Secure & Verified Steel Suppliers
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* 
        DESKTOP VERSION (Rendered on screen sizes >= lg)
        - Clean full width layout
        - Grid with 2 columns: Success message/buttons on the left, next steps on the right
      */}
      <div className="hidden lg:flex flex-col min-h-screen bg-white relative justify-between animate-fade-in-up">
        
        {/* Header */}
        <header className="w-full bg-white border-b border-slate-100/80 py-2.5 px-8 flex items-center justify-between select-none">
          <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between">
            <BrandLogo />
            <LanguageToggle />
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center bg-gradient-to-b from-white via-slate-50/30 to-white py-16">
          <div className="max-w-[1360px] mx-auto w-full px-8 grid grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Success Confirmation and CTAs */}
            <div className="col-span-7 space-y-8">
              
              {/* Success Badge */}
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping duration-1000"></div>
                <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow-md">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Requirement Submitted <br />
                  <span className="text-sky-500">Successfully!</span>
                </h1>
                <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                  Thank you for submitting your steel requirements. Our dedicated steel expert will contact you shortly to match you with verified suppliers and secure the best market prices.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2 max-w-xl">
                <a
                  id="view-sellers-btn-desktop"
                  href={`https://www.easeinfra.com/products/tmt-bar/${activeBrand.id}`}
                  className="group flex items-center justify-center gap-2 flex-1 bg-sky-500 text-white text-sm font-bold py-4 px-6 rounded-xl hover:bg-sky-600 active:scale-98 transition-all shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 cursor-pointer"
                >
                  View Verified Sellers
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <a
                  id="whatsapp-support-btn-desktop"
                  href="https://wa.me/919319917006?text=Hello%20EaseInfra%2C%20I%20just%20submitted%20a%20steel%20requirement%20on%20your%20landing%20page."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 bg-emerald-500 text-white text-sm font-bold py-4 px-6 rounded-xl hover:bg-emerald-600 active:scale-98 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
                >
                  <Image 
                    src="/whatsapp.png" 
                    alt="WhatsApp" 
                    width={22} 
                    height={22} 
                    className="brightness-0 invert object-contain"
                  />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Next Steps Stepper Card */}
            <div className="col-span-5">
              <div className="border border-slate-100 rounded-3xl bg-white p-8 shadow-md space-y-6">
                
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider select-none">
                  What Happens Next?
                </h4>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-500 border border-sky-100 select-none">
                      1
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-sm font-bold text-slate-800">Requirement Submitted</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Your steel requirement has been successfully submitted and logged.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-500 border border-sky-100 select-none">
                      2
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-sm font-bold text-slate-800">Sent to Verified Sellers</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Your request is shared with verified suppliers to get you competitive prices.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-500 border border-sky-100 select-none">
                      3
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-sm font-bold text-slate-800">Get Quotes & Close Deal</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Compare different quotes and complete your order directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badge inside Card */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-2.5 text-xs font-bold text-slate-400 select-none">
                  <ShieldCheck className="h-5 w-5 text-sky-500" />
                  100% Secure & Verified Steel Suppliers
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

    </main>
  );
}

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    brand: brand.id,
  }));
}
