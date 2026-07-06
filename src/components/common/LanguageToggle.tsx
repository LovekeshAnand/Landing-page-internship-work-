"use client";

import React, { useState, useEffect } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  // Check current google translate cookie on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const googtrans = getCookie("googtrans");
    if (googtrans) {
      if (googtrans.endsWith("/hi")) {
        setLang("hi");
      } else {
        setLang("en");
      }
    }
  }, []);

  const changeLanguage = (targetLang: "en" | "hi") => {
    if (lang === targetLang) return;
    setLang(targetLang);

    // Set cookie for google translate
    const domain = window.location.hostname.replace("www", "");
    const cookieStr = `googtrans=/en/${targetLang}; path=/; domain=${domain};`;
    const cookieStrLocal = `googtrans=/en/${targetLang}; path=/;`;
    document.cookie = cookieStr;
    document.cookie = cookieStrLocal;

    // Trigger Google Translate dropdown
    const translateCombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (translateCombo) {
      translateCombo.value = targetLang;
      translateCombo.dispatchEvent(new Event("change"));
    } else {
      // If script is not loaded yet, reload with hash or try again after 100ms
      window.location.hash = `#googtrans(en|${targetLang})`;
      window.location.reload();
    }
  };

  return (
    <div className="relative p-0.5 bg-slate-100 border border-slate-200 rounded-lg flex items-center select-none w-[130px] h-[30px]">
      {/* Sliding background indicator */}
      <div
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white border border-slate-200/50 shadow-sm rounded-md transition-all duration-300 ease-out
          ${lang === "hi" ? "left-[calc(50%+1px)]" : "left-0.5"}
        `}
      />

      {/* English Option */}
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`relative z-10 flex-1 text-[10px] font-extrabold text-center transition-colors duration-200 cursor-pointer h-full flex items-center justify-center
          ${lang === "en" ? "text-sky-600" : "text-slate-500 hover:text-slate-700"}
        `}
      >
        English
      </button>

      {/* Hindi Option */}
      <button
        type="button"
        onClick={() => changeLanguage("hi")}
        className={`relative z-10 flex-1 text-[10px] font-extrabold text-center transition-colors duration-200 cursor-pointer h-full flex items-center justify-center
          ${lang === "hi" ? "text-sky-600" : "text-slate-500 hover:text-slate-700"}
        `}
      >
        हिन्दी
      </button>
    </div>
  );
}
