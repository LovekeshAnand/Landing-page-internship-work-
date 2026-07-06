"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronDown, 
  Check, 
  MapPin, 
  Layers, 
  TrendingUp, 
  Truck, 
  Loader2, 
  CheckCircle2, 
  FileCheck,
  Search,
  Lock,
  User,
  Phone,
  Mail
} from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import { LOCATIONS, BRANDS, Brand, Location } from "@/data/landingData";
import { useRouter } from "next/navigation";

interface LeadFormProps {
  activeBrand: Brand;
  onBrandChange?: (brand: Brand) => void;
}

export default function LeadForm({ activeBrand, onBrandChange }: LeadFormProps) {
  const router = useRouter();
  // Form State
  const [selectedBrand, setSelectedBrand] = useState<Brand>(activeBrand);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  const [hasFormStarted, setHasFormStarted] = useState(false);
  const triggerFormStart = () => {
    if (!hasFormStarted) {
      setHasFormStarted(true);
      if (typeof window !== "undefined") {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: "form_start",
          form_id: "lead_capturing_form"
        });
      }
    }
  };

  // Track global clicks on the floating WhatsApp button
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const floatingWhatsappBtn = target.closest("#floating-whatsapp-btn");
      if (floatingWhatsappBtn) {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: "click_whatsapp",
          location: "floating_button",
          brand: selectedBrand.id
        });
      }
    };
    
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [selectedBrand.id]);
  
  const [quantity, setQuantity] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Contact details
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  // Dropdown visibility
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [apiLocations, setApiLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Refs for closing dropdowns on click outside
  const locationRef = useRef<HTMLDivElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [successStep, setSuccessStep] = useState(0);

  // Errors state
  const [errors, setErrors] = useState<{ 
    quantity?: string; 
    location?: string;
    name?: string;
    phone?: string;
  }>({});

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selectedBrand if activeBrand prop changes
  useEffect(() => {
    setSelectedBrand(activeBrand);
  }, [activeBrand]);

  const getBrandDisplayName = (b: Brand) => {
    if (b.id === "jsw-neo") return "JSW Neo TMT Bar";
    if (b.id === "rathi") return "Rathi TMT Bar";
    return `${b.name} TMT Bar`;
  };

  // Fetch locations from public API
  useEffect(() => {
    let active = true;
    setIsLoadingLocations(true);

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://api.easeinfra.com/user/common/getAllLocations?search=${encodeURIComponent(locationSearch)}`
        );
        
        if (response.status === 404) {
          if (active) {
            setApiLocations([]);
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const mappedLocations: Location[] = data.data.map((locName: string) => ({
            id: locName,
            name: locName,
            state: "",
          }));
          if (active) {
            setApiLocations(mappedLocations);
          }
        } else if (data.success === false && data.message === "No locations found.") {
          if (active) {
            setApiLocations([]);
          }
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Failed to fetch locations from API, falling back to local JSON:", err);
        if (active) {
          const fallback = LOCATIONS.filter(loc =>
            loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
            loc.state.toLowerCase().includes(locationSearch.toLowerCase())
          ).map(loc => ({
            id: loc.id,
            name: loc.name,
            state: loc.state
          }));
          setApiLocations(fallback);
        }
      } finally {
        if (active) {
          setIsLoadingLocations(false);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLocations();
    }, 300);

    return () => {
      active = false;
      clearTimeout(delayDebounceFn);
    };
  }, [locationSearch]);

  const filteredLocations = apiLocations;

  // Synchronize locationSearch and selectedLocation
  useEffect(() => {
    if (!locationSearch.trim()) {
      setSelectedLocation(null);
      return;
    }

    // Check if there is an exact match in apiLocations
    const exactMatch = apiLocations.find(
      (loc) => loc.name.toLowerCase() === locationSearch.trim().toLowerCase()
    );

    if (exactMatch) {
      setSelectedLocation(exactMatch);
    } else {
      // If it doesn't match any API location exactly, treat it as a custom location
      setSelectedLocation({
        id: "custom",
        name: locationSearch.trim(),
        state: "",
      });
    }
  }, [locationSearch, apiLocations]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // Validations
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity (min 1 ton)";
    }
    if (!selectedLocation) {
      newErrors.location = "Please select a delivery location";
    }
    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const generatedLeadId = "EI-TMT-" + Math.floor(100000 + Math.random() * 900000);
      
      // Payload adapted from user's logic
      const formDataToSend = {
        lead_id: generatedLeadId,
        name,
        email: "Not Provided",
        phone,
        material: `${selectedBrand.name} TMT Rebar`,
        quantity: `${quantity} Tons`,
        location: selectedLocation?.state ? `${selectedLocation.name}, ${selectedLocation.state}` : (selectedLocation?.name || ""),
      };


      // 2. Google Sheets Web App GET Integration
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (googleScriptUrl && !googleScriptUrl.includes("your_")) {
        const formDataEncoded = new URLSearchParams(formDataToSend);
        await fetch(`${googleScriptUrl}?${formDataEncoded}`, {
          method: "GET",
          mode: "no-cors",
        });
      } else {
        console.warn("Google Script Web App URL not set/default. Skipping Sheets submission.");
      }

      // Proceed to Thank You Page
      setIsSubmitting(false);
      setLeadId(generatedLeadId);
      setIsSuccess(true);
      router.push(`/${selectedBrand.id}/thank-you`);

    } catch (error) {
      console.error("Submission failed:", error);
      setErrors({ 
        quantity: "Network submission failed. Displaying simulated backup status." 
      });
      
      // Fallback: Proceed to thank you page
      const backupLeadId = "EI-TMT-BACKUP-" + Math.floor(100000 + Math.random() * 900000);
      setIsSubmitting(false);
      setLeadId(backupLeadId);
      setIsSuccess(true);
      router.push(`/${selectedBrand.id}/thank-you`);
    }
  };

  const resetForm = () => {
    setQuantity("");
    setSelectedLocation(null);
    setLocationSearch("");
    setName("");
    setPhone("");
    setEmail("");
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Form Container */}
      <div className="glass-panel rounded-3xl shadow-[0_15px_40px_-15px_rgba(15,98,254,0.12),0_1px_4px_rgba(0,0,0,0.03)] border border-slate-100 p-5 sm:p-6.5 lg:p-7 lg:py-8 relative transition-all duration-300">
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {/* Header Text */}
            <div className="text-center mb-2">
              <h3 className="text-[20px] font-extrabold text-slate-800 tracking-tight">
                Submit Requirement
              </h3>
              <p className="text-xs text-slate-450 mt-0.5 leading-relaxed font-semibold">
                Post your requirement and connect with sellers instantly!
              </p>
            </div>

            {/* FIELD 1: Brand Dropdown Selector */}
            <div className="space-y-1.5" ref={brandRef}>
              <label className="text-[10px] font-bold tracking-wider uppercase text-slate-700 select-none">
                Select Product
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsBrandOpen(!isBrandOpen);
                    triggerFormStart();
                  }}
                  className={`w-full flex items-center justify-between rounded-xl border bg-white px-4 py-2.5 lg:py-3 text-sm font-semibold transition-all duration-200 text-left cursor-pointer
                    ${isBrandOpen ? "border-sky-500 ring-2 ring-sky-500/10" : "border-slate-200 hover:border-slate-350"}
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Layers className="h-4 w-4 shrink-0 text-sky-500" />
                    <span className="truncate font-bold text-slate-700">
                      {getBrandDisplayName(selectedBrand)}
                    </span>
                  </div>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 shrink-0 ${isBrandOpen ? "rotate-180 text-sky-500" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isBrandOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-xl bg-white border border-slate-100 shadow-xl py-1 focus:outline-none">
                    {BRANDS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(b);
                          setIsBrandOpen(false);
                          if (onBrandChange) {
                            onBrandChange(b);
                          }
                          window.history.pushState(null, "", `/${b.id}`);
                          triggerFormStart();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left hover:bg-slate-50 cursor-pointer
                          ${selectedBrand.id === b.id ? "bg-sky-500-light/50 text-sky-500 font-semibold" : "text-slate-700"}
                        `}
                      >
                        <span className="truncate font-semibold">{getBrandDisplayName(b)}</span>
                        {selectedBrand.id === b.id && (
                          <Check className="h-4 w-4 text-sky-500 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* FIELD 2: Quantity Input */}
            <div className="space-y-1.5">
              <Input
                id="quantity"
                type="number"
                inputMode="numeric"
                min="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) setErrors({ ...errors, quantity: undefined });
                }}
                onFocus={triggerFormStart}
                label="Quantity (in Tons)"
                placeholder="e.g. 10"
                leftIcon={<TrendingUp className="h-4 w-4 text-slate-400" />}
                rightIcon={<span className="text-xs font-bold text-slate-400 select-none mr-1.5">Tons</span>}
                error={errors.quantity}
                required
                className="lg:py-3"
              />
            </div>

            {/* FIELD 3: Delivery Location */}
            <div className="space-y-1.5 relative" ref={locationRef}>
              <Input
                id="location"
                type="text"
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setIsLocationOpen(true);
                  if (errors.location) setErrors({ ...errors, location: undefined });
                }}
                onFocus={() => {
                  setIsLocationOpen(true);
                }}
                label="Delivery Location"
                placeholder="Select or type delivery location"
                leftIcon={<MapPin className={`h-4 w-4 shrink-0 ${selectedLocation ? "text-sky-500" : "text-slate-400"}`} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLocationOpen(!isLocationOpen);
                    }}
                    className="p-1 -mr-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 shrink-0 ${isLocationOpen ? "rotate-180 text-sky-500" : ""}`} />
                  </button>
                }
                error={errors.location}
                required
                autoComplete="off"
                className="lg:py-3"
              />

              {/* Dropdown Menu */}
              {isLocationOpen && (
                <div className="absolute z-25 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-xl bg-white border border-slate-100 shadow-xl py-1 focus:outline-none">
                  <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                    Available locations
                  </div>
                  
                  {isLoadingLocations ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
                    </div>
                  ) : (
                    <>
                      {filteredLocations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setLocationSearch(loc.name);
                            setIsLocationOpen(false);
                            if (errors.location) setErrors({ ...errors, location: undefined });
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left hover:bg-slate-50 cursor-pointer
                            ${selectedLocation?.name === loc.name ? "bg-sky-500-light/50 text-sky-500 font-semibold" : "text-slate-700"}
                          `}
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="truncate font-semibold">{loc.name}</span>
                            {loc.state && <span className="text-[9px] text-slate-400 font-normal truncate">{loc.state}</span>}
                          </div>
                          {selectedLocation?.name === loc.name && (
                            <Check className="h-4 w-4 text-sky-500 shrink-0 ml-2" />
                          )}
                        </button>
                      ))}

                      {/* If user search does not have an exact match in the API results, show custom selectable option */}
                      {locationSearch.trim() !== "" && !filteredLocations.some(loc => loc.name.toLowerCase() === locationSearch.trim().toLowerCase()) && (
                        <button
                          type="button"
                          onClick={() => {
                            const customLoc = {
                              id: "custom",
                              name: locationSearch.trim(),
                              state: "",
                            };
                            setSelectedLocation(customLoc);
                            setLocationSearch(customLoc.name);
                            setIsLocationOpen(false);
                            if (errors.location) setErrors({ ...errors, location: undefined });
                          }}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left hover:bg-slate-50 cursor-pointer text-slate-700 border-t border-slate-100/50 bg-sky-500-light/10"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="truncate font-semibold text-sky-600">Use "{locationSearch.trim()}"</span>
                            <span className="text-[9px] text-slate-400 font-normal truncate">Select typed location</span>
                          </div>
                          {selectedLocation?.id === "custom" && selectedLocation?.name === locationSearch.trim() && (
                            <Check className="h-4 w-4 text-sky-500 shrink-0 ml-2" />
                          )}
                        </button>
                      )}

                      {filteredLocations.length === 0 && locationSearch.trim() === "" && (
                        <div className="px-4 py-4 text-center text-xs text-slate-400 font-medium">
                          No locations match
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Contact Name & Phone (Side by Side) */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  label="Full Name"
                  placeholder="Your Name"
                  leftIcon={<User className="h-4 w-4 text-slate-400" />}
                  error={errors.name}
                  required
                  className="lg:py-3"
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  label="Phone Number"
                  placeholder="e.g. 9876543210"
                  leftIcon={<Phone className="h-4 w-4 text-slate-400" />}
                  error={errors.phone}
                  required
                  className="lg:py-3"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2.5">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                className="lg:py-3.5 shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 active:scale-98 transition-all"
                rightIcon={<Truck className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />}
              >
                {isSubmitting ? "Connecting you with verified sellers..." : "Get Best Price"}
              </Button>
            </div>
            
            <p className="text-[10px] text-slate-400 text-center select-none leading-relaxed px-2 font-medium">
              By submitting, you agree to connect with EaseInfra&apos;s network of vetted, authorized steel distributors.
            </p>
          </form>
        ) : (
          /* SUCCESS STATE */
          <div className="py-8 animate-fade-in-up text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 border border-blue-100 shadow-sm animate-bounce">
              <Loader2 className="h-8 w-8 text-sky-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
              Thank you! Your requirement has been submitted successfully. We are now taking you to India&apos;s trusted steel marketplace.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}