"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryItem, ContactInfo } from "@/types";

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [facebookUrl, setFacebookUrl] = useState("");

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGallery(data);
      })
      .catch(console.error);

    fetch("/api/contact")
      .then((res) => res.json())
      .then((data: ContactInfo) => {
        if (data && data.facebookUrl) setFacebookUrl(data.facebookUrl);
      })
      .catch(console.error);
  }, []);

  if (gallery.length === 0) return null;

  return (
  <section 
  className="my-12 py-12 px-6 max-w-4xl mx-auto rounded-3xl border
   border-stone-200/80 bg-white/90 backdrop-blur-xs shadow-sm font-sans" 
  dir="rtl">

      <div className="text-center mb-12 space-y-2">
        <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 py-1 px-3 rounded-full">
          توثيق مستمر
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">معرض الأنشطة والدورات</h2>
        <p className="text-sm text-slate-500">تصفح أبرز الفعاليات والإعلانات الخاصة بمركز الأنشطة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((img, idx) => (
          <div
            key={img.id || idx}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
          >
            <div className="relative h-72 w-full bg-stone-100 overflow-hidden">
              <Image
                src={img.src}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                alt={img.title || "نشاط"}
              />
            </div>
            {(img.title || img.description) && (
              <div className="p-4 bg-white flex-1 flex flex-col justify-center text-center border-t border-stone-100">
                {img.title && (
                  <p className="text-sm font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
                    {img.title}
                  </p>
                )}
                {img.description && (
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {img.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {facebookUrl && (
          <div className="bg-linear-to-br from-cyan-900 to-slate-900 rounded-2xl p-6 text-center text-white flex flex-col justify-center items-center space-y-4 shadow-md border border-cyan-800/40 min-h-80">
            <div className="w-12 h-12 rounded-2xl bg-cyan-800/60 flex items-center justify-center text-2xl">📸</div>
            <div>
              <h3 className="text-lg font-bold">والمزيد من الأنشطة المستمرة</h3>
              <p className="text-stone-300 text-xs mt-2 leading-relaxed">
                نشارككم يوميات ودورات المركز لحظة بلحظة عبر منصاتنا الرسمية.
              </p>
            </div>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs transition-all duration-200 shadow-md hover:scale-105"
            >
              مشاهدة باقي الألبومات ←
            </a>
          </div>
        )}
      </div>
    </section>
  );
}