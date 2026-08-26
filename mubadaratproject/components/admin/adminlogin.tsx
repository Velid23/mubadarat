"use client";

import React, { useState } from "react";

interface Props {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: Props) {
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(data.error || "كلمة المرور غير صحيحة، حاول مجدداً.");
      }
    } catch {
      setErrorMsg("تعذر الاتصال بالسيرفر للتحقق من كلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200 w-full max-w-sm text-center">
        <div className="text-gray-700 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          🔒
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">لوحة الإدارة</h1>
        <p className="text-sm text-slate-500 mb-6">يرجى إدخال كلمة المرور للوصول إلى اللوحة</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="text-gray-700  w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm text-center"
            autoFocus
          />

          {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}