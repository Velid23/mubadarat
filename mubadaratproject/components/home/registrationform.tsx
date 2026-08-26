"use client";

import React, { useState, useEffect } from "react";
import { ContactInfo } from "@/types";

export default function RegistrationForm() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "المقر الرئيسي",
    phone: "+000 000 000 000",
    email: "contact@example.org",
    workingHours: "السبت - الخميس: 9:00 ص - 5:00 م",
    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: "",
    telegramUrl: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.address) {
          setContactInfo(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى.");
      }
    } catch {
      alert("تعذر الاتصال بالسيرفر.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-5 px-4 font-sans bg-[#FDFBF7] relative overflow-hidden" dir="rtl">
      {/* لمسات إضاءة خلفية دائرية متدرجة بألوان الموقع */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        
        {/* رأس القسم المفعم بالألوان والحيوية */}
        <div id="contact" className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-cyan-100/80 border border-cyan-300/60 text-cyan-900 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
            تواصل مباشر وسريع
          </div>
          <h2 className="text-2xl md:text-3xl font-black bg-linear-to-l from-slate-900 via-cyan-900 to-cyan-700 bg-clip-text text-transparent">
            يسعدنا تواصلك معنا
          </h2>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            أرسل استفسارك وسيقوم فريقنا بالرد عليك ومتابعة طلبك فوراً.
          </p>
        </div>

        {/* البطاقة الرئيسية مع إطار مضيء وتأثيرات ألوان الموقع */}
        <div className="relative group p-[1.5px] rounded-3xl bg-linear-to-b from-cyan-400/40 via-cyan-600/20 to-stone-200 shadow-xl shadow-cyan-900/5">
          <div className="bg-white/95 backdrop-blur-md rounded-[23px] p-6 sm:p-8 space-y-6">
            
            {submitted ? (
              <div className="py-8 text-center space-y-3 bg-cyan-50/60 rounded-2xl border border-cyan-200/60 p-6">
                <div className="w-12 h-12 bg-linear-to-tr from-cyan-600 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-md shadow-cyan-600/30">
                  ✓
                </div>
                <h3 className="text-base font-bold text-slate-900">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  شكراً لتواصلك معنا، تم استلام بياناتك وسنعاود الاتصال بك عبر الواتساب في أقرب وقت.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", notes: "" });
                  }}
                  className="mt-2 px-5 py-2 bg-linear-to-r from-cyan-700 to-cyan-800 hover:from-cyan-800 hover:to-cyan-900 text-white rounded-xl text-xs font-bold transition shadow-sm hover:scale-105"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد محمد"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 text-xs transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الواتساب *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 text-xs transition duration-200 text-right"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الرسالة أو الاستفسار *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="اكتب استفسارك أو تفاصيل طلبك هنا..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 text-xs transition duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-cyan-700 via-cyan-800 to-slate-900 hover:from-cyan-800 hover:to-slate-950 text-white font-bold rounded-xl text-xs transition-all duration-300 shadow-md shadow-cyan-900/20 hover:shadow-lg hover:shadow-cyan-900/30 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "جاري إرسال الرسالة..." : "إرسال الرسالة الآن ✉️"}
                </button>
              </form>
            )}

            {/* شريط معلومات التواصل التفاعلي الملون */}
            <div className="pt-5 border-t border-stone-100 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
                
                {/* العنوان */}
                <div className="p-2.5 rounded-2xl bg-linear-to-br from-stone-50 to-cyan-50/40 border border-stone-200/80 shadow-2xs">
                  <span className="block text-[10px] text-cyan-800 font-bold">📍 المقر</span>
                  <span className="text-xs font-semibold text-slate-700 truncate block mt-0.5">{contactInfo.address}</span>
                </div>

                {/* الهاتف */}
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="p-2.5 rounded-2xl bg-linear-to-br from-stone-50 to-emerald-50/40 border border-stone-200/80 hover:border-emerald-400 hover:bg-emerald-50/80 transition-all duration-200 group block shadow-2xs"
                >
                  <span className="block text-[10px] text-emerald-800 font-bold">📞 هاتف / واتساب</span>
                  <span className="text-xs font-semibold text-slate-700 font-mono block mt-0.5 group-hover:text-emerald-700 transition" dir="ltr">{contactInfo.phone}</span>
                </a>

                {/* البريد */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="p-2.5 rounded-2xl bg-linear-to-br from-stone-50 to-sky-50/40 border border-stone-200/80 hover:border-sky-400 hover:bg-sky-50/80 transition-all duration-200 group block col-span-2 sm:col-span-1 shadow-2xs"
                >
                  <span className="block text-[10px] text-sky-800 font-bold">✉️ البريد الإلكتروني</span>
                  <span className="text-xs font-semibold text-slate-700 font-mono truncate block mt-0.5 group-hover:text-sky-700 transition">{contactInfo.email}</span>
                </a>

              </div>

              {/* منصات التواصل الاجتماعي بألوان نابضة وحركة عائمة */}
              {(contactInfo.facebookUrl || contactInfo.instagramUrl || contactInfo.whatsappUrl || contactInfo.telegramUrl) && (
                <div className="flex items-center justify-center gap-3 pt-1">
                  
                  {/* Facebook */}
                  {contactInfo.facebookUrl && (
                    <a
                      href={contactInfo.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-2xl bg-stone-100/90 text-slate-600 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  )}

                  {/* Instagram */}
                  {contactInfo.instagramUrl && (
                    <a
                      href={contactInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-2xl bg-stone-100/90 text-slate-600 hover:bg-linear-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md hover:shadow-pink-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {contactInfo.whatsappUrl && (
                    <a
                      href={contactInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-10 h-10 rounded-2xl bg-stone-100/90 text-slate-600 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md hover:shadow-emerald-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                    </a>
                  )}

                  {/* Telegram */}
                  {contactInfo.telegramUrl && (
                    <a
                      href={contactInfo.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="w-10 h-10 rounded-2xl bg-stone-100/90 text-slate-600 hover:bg-[#229ED9] hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md hover:shadow-sky-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                      </svg>
                    </a>
                  )}

                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}