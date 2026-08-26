"use client";

import React, { useState, useEffect } from "react";
import { ContactInfo } from "@/types";

export default function ContactManager() {
  const [formData, setFormData] = useState<ContactInfo>({
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: "",
    telegramUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMsg("✅ تم حفظ التعديلات بنجاح وستظهر مباشرة في الموقع!");
      } else {
        alert("فشل حفظ التعديلات.");
      }
    } catch {
      alert("تعذر الاتصال بالسيرفر.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-slate-500 py-8">جاري جلب البيانات...</p>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm font-sans" dir="rtl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">⚙️ تعديل معلومات التواصل والروابط</h2>
        <p className="text-xs text-slate-500 mt-1">
          يمكنك تعديل أي معلومة تظهر في بطاقة التواصل السفلية أو تحديث روابط التواصل الاجتماعي.
        </p>
      </div>

      {msg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-cyan-800 mb-3 pb-1 border-b border-stone-200">
            📍 المعلومات الأساسية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">الموقع والعنوان</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="مثال: المدينة - المقر الرئيسي"
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الهاتف / الواتساب الظاهر</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+000 000 000 000"
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none text-right"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@example.org"
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none text-right"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">أوقات العمل واستقبال الزوار</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                placeholder="السبت - الخميس: 9:00 ص - 5:00 م"
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-cyan-800 mb-3 pb-1 border-b border-stone-200">
            🌐 روابط منصات التواصل الاجتماعي
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رابط فيسبوك (Facebook)</label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                placeholder="https://facebook.com/..."
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رابط انستغرام (Instagram)</label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رابط دردشة واتساب (WhatsApp Link)</label>
              <input
                type="text"
                value={formData.whatsappUrl}
                onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                placeholder="https://wa.me/000000000000"
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رابط قناة / حساب تلغرام (Telegram)</label>
              <input
                type="text"
                value={formData.telegramUrl}
                onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                placeholder="https://t.me/..."
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl text-xs transition shadow-md disabled:opacity-50"
        >
          {saving ? "جاري حفظ التعديلات..." : "حفظ التعديلات الآن 💾"}
        </button>
      </form>
    </div>
  );
}