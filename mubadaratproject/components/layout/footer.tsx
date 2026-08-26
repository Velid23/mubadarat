import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="bg-[#1C2430] text-slate-300 py-10 px-6 border-t border-slate-700 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
        <div>
          <span className="text-lg font-bold text-white block">{siteConfig.name}</span>
          <p className="text-xs text-slate-400 mt-1">{siteConfig.tagline}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>

        </div>
      </div>
    </footer>
  );
}