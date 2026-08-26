"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/70 font-sans shadow-2xs" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* الجانب الأيمن: الشعار والاسم */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-xs bg-white shrink-0">
            <Image
              src={siteConfig.logoImage}
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="font-black text-base sm:text-lg block text-slate-800 leading-tight">
              {siteConfig.shortName || siteConfig.name}
            </span>
            <span className="text-[11px] font-bold text-cyan-800">
              {siteConfig.subTitle}
            </span>
          </div>
        </div>

        {/* الجانب الأيسر: شارة رسمية غير مكررة */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 border border-cyan-200/70 text-cyan-950 text-xs font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>منظومة تنموية وإنسانية معتمدة</span>
        </div>

      </div>
    </header>
  );
}