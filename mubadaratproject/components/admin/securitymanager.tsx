"use client";

import React, { useState } from "react";

export default function SecurityManager() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: "", isError: false });

    if (newPassword !== confirmPassword) {
      setMsg({ text: "كلمة المرور الجديدة غير متطابقة مع التأكيد.", isError: true });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ text: "✅ تم تغيير كلمة المرور بنجاح! احفظها في مكان آمن.", isError: false });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMsg({ text: data.error || "فشل تغيير كلمة المرور.", isError: true });
      }
    } catch {
      setMsg({ text: "تعذر الاتصال بالسيرفر.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto font-sans" dir="rtl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          🔒 أمان الحساب وتغيير كلمة المرور
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          يمكنك تغيير كلمة المرور الخاصة بلوحة الإدارة لضمان خصوصية بيانات المؤسسة.
        </p>
      </div>

      {msg.text && (
        <div
          className={`mb-5 p-3.5 rounded-xl text-xs font-semibold ${
            msg.isError
              ? "bg-rose-50 border border-rose-200 text-rose-700"
              : "bg-emerald-50 border border-emerald-200 text-emerald-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">كلمة المرور الحالية *</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
            placeholder="أدخل كلمة المرور الحالية"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">كلمة المرور الجديدة *</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
            placeholder="6 أحرف أو أرقام على الأقل"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">تأكيد كلمة المرور الجديدة *</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
            placeholder="أعد كتابة كلمة المرور الجديدة"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl text-xs transition shadow-sm disabled:opacity-50 mt-2"
        >
          {loading ? "جاري التحديث..." : "حفظ كلمة المرور الجديدة 💾"}
        </button>
      </form>
    </div>
  );
}