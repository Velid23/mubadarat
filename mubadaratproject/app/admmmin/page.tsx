"use client";

import React, { useState } from "react";
import { Registration } from "@/types";
import AdminLogin from "@/components/admin/adminlogin";
import RegistrationsTable from "@/components/admin/registrationstable";
import GalleryManager from "@/components/admin/GalleryManager";
import ContactManager from "@/components/admin/ContactManager";
import CoursesManager from "@/components/admin/coursesmanager";
import SecurityManager from "@/components/admin/securitymanager";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"registrations" | "courses" | "gallery" | "contact" | "security">("registrations");

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-data", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchRegistrations();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا الطلب؟")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin-data?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("فشل حذف الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch {
      alert("تعذر الاتصال بالسيرفر لحذف الطلب.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">لوحة إدارة الموقع</h1>
            <p className="text-xs text-slate-500 mt-1">التحكم في الدورات، طلبات التواصل، المعرض، ومعلومات التواصل</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* أزرار التبويبات */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "registrations"
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            طلبات التواصل ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "courses"
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            📚 إدارة الدورات والبرامج
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "gallery"
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            🖼️ إدارة معرض الصور
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "contact"
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            ⚙️ إعدادات معلومات التواصل
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "security"
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            🔒 الأمان وكلمة المرور
          </button>
        </div>

        {/* عرض محتوى التبويب */}
        {activeTab === "registrations" ? (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-bold text-slate-800">الطلبات الواردة</h2>
              <button
                onClick={fetchRegistrations}
                className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-xl text-xs font-semibold transition"
              >
                تحديث البيانات 🔄
              </button>
            </div>

            <RegistrationsTable
              registrations={registrations}
              loading={loading}
              deletingId={deletingId}
              onDelete={handleDelete}
            />
          </div>
        ) : activeTab === "courses" ? (
          <CoursesManager />
        ) : activeTab === "gallery" ? (
          <GalleryManager />
        ) : activeTab === "contact" ? (
          <ContactManager />
        ) : (
          <SecurityManager />
        )}
      </div>
    </div>
  );
}