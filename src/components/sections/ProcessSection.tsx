"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, ClipboardList, BadgePercent, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import { PROCESS_STEPS } from "@/data/landingData";

export default function ProcessSection() {
  const getIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <ClipboardList className="h-6 w-6 text-brand-blue" />;
      case 2:
        return <BadgePercent className="h-6 w-6 text-brand-blue" />;
      case 3:
        return <ShieldCheck className="h-6 w-6 text-brand-blue" />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-md">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-wider text-brand-blue uppercase bg-brand-blue-light px-3 py-1 rounded-full select-none">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-3">
            How EaseInfra Works
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            From submitting your inquiry to direct site delivery in record time.
          </p>
        </div>

        {/* Process Steps Stepper */}
        <div className="relative flex flex-col items-center">
          
          {PROCESS_STEPS.map((step, idx) => {
            const isLast = idx === PROCESS_STEPS.length - 1;
            
            return (
              <React.Fragment key={step.number}>
                {/* Step Card */}
                <div className="w-full group relative flex items-start gap-4.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200/60">
                  {/* Icon Circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm text-brand-blue transition-transform duration-300 group-hover:scale-105">
                    {getIcon(step.number)}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-blue/70 font-mono tracking-wider">
                        STEP 0{step.number}
                      </span>
                      <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="my-4 flex items-center justify-center text-brand-blue/30 animate-pulse">
                    <ArrowDown className="h-6 w-6 stroke-[3]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}

        </div>

        {/* Call To Action Container: "Want to post another requirement?" */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-light via-blue-50/40 to-slate-50 border border-brand-blue/10 p-5 text-center shadow-sm">
            {/* Background graphics */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-blue/5 blur-xl"></div>
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-indigo-500/5 blur-xl"></div>
            
            <div className="relative z-10 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                Share your next requirement, and we'll connect you with the right expert.
              </h3>
              <div className="pt-1">
                <a
                  href="https://easeinfra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    rightIcon={<ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  >
                    Visit EaseInfra today
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
