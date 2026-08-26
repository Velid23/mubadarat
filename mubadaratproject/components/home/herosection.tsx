"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-14 px-4 sm:px-6 bg-[#FDFBF7] overflow-hidden font-sans border-b border-stone-200/60" dir="rtl">
      
      {/* 1. البانر العريض في الخلفية بالكامل يملأ الصفحة بنعومة وفخامة */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/545955086_122097980973016482_7559645831261984231_n.jpg"
          alt="زخرفة الخلفية"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/80" />
      </div>

      {/* 2. إضاءات لونية إضافية فوق الخلفية */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-1/4 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* 3. المحتوى الأصلي (النصوص + الصور الحية) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* الجانب الأيمن: النصوص والمعلومات */}
        <div className="lg:col-span-6 space-y-4 text-center lg:text-right">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100/80 border border-cyan-200/80 text-cyan-900 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
            {siteConfig.badgeText}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {siteConfig.name}
            <span className="block mt-1 bg-linear-to-l from-cyan-800 to-cyan-600 bg-clip-text text-transparent font-extrabold">
              {siteConfig.tagline}
            </span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
            {siteConfig.aboutDescription}
          </p>

          {/* أزرار الإجراء السريع */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <Link
              href="#register"
              className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-1xs transition shadow-md shadow-cyan-900/15 hover:-translate-y-0.5"
            >
              تواصل معنا الآن ✉️
            </Link>
            <Link
              href="/courses"
              className="px-5 py-2.5 bg-white hover:bg-stone-50 text-slate-700 font-bold rounded-xl text-1xs border border-stone-200 transition shadow-2xs hover:-translate-y-0.5"
            >
              استكشف الدورات والبرامج 📚
            </Link>
          </div>

          {/* إحصائيات سريعة */}
          <div className="pt-4 border-t border-stone-200/60 grid grid-cols-3 gap-3 text-center lg:text-right">
            <div className="bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
              <span className="block text-xl md:text-2xl font-black text-cyan-800 font-mono">+15</span>
              <span className="text-[10px] text-slate-500 font-medium">برنامج ودورة</span>
            </div>
            <div className="bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
              <span className="block text-xl md:text-2xl font-black text-cyan-800 font-mono">+500</span>
              <span className="text-[10px] text-slate-500 font-medium">مستفيد ومشارك</span>
            </div>
            <div className="bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
              <span className="block text-xl md:text-2xl font-black text-cyan-800 font-mono">100%</span>
              <span className="text-[10px] text-slate-500 font-medium">تطوعي ومستدام</span>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: تشكيلة الصور الحية */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none grid grid-cols-2 gap-3">
            
            {/* الصورة الرئيسية */}
            <div className="col-span-2 relative h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/595787870_122114469171016482_8065660395669261138_n.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 text-white">
                <span className="text-[9px] bg-cyan-600/80 backdrop-blur-xs px-2 py-0.5 rounded-md font-bold">بناء وتمكين</span>
                <p className="text-[11px] font-bold mt-0.5">تنمية الكوادر وصناعة الأثر</p>
              </div>
            </div>

            {/* صورة فرعية 1 */}
            <div className="  relative h-32 rounded-xl   overflow-hidden border-2 border-white shadow-sm">
              <Image
                src="/604770897_122117600121016482_6594753782999462502_n.jpg"
                alt="أنشطة وفعاليات"
                fill 
                className="object-cover object-[center_20%] hover:scale-105 transition-transform duration-500"
              />
            </div>

{/* بطاقة قبس من نور (الخيار الثالث) */}
<div className="relative h-32 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-linear-to-br from-cyan-900 to-slate-900 text-white p-3.5 flex flex-col justify-between">
  <div className="flex items-center justify-between">
    <span className="text-[15px] bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded-md font-bold border border-cyan-400/20">
      قبس من نور
    </span>
    <span className="text-sm">📖</span>
  </div>
  <div>
    <p className="text-1xs font-bold text-white leading-relaxed">
      "خيرُ الناسِ أنفَعُهُم للناس"
    </p>
    <span className="text-[10px] text-cyan-300/70 block mt-0.5">
      نهجنا في كل مبادرة وعمل
    </span>
  </div>
</div>

          </div>
        </div>

      </div>
    </section>
  );
}