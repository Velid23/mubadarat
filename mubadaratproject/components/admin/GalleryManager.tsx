"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", src: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalSrc = formData.src;

      if (selectedFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", selectedFile);

        const upRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData.error || "فشل رفع الصورة");
        finalSrc = upData.url;
      }

      if (!finalSrc) {
        alert("يرجى اختيار ملف صورة أو وضع رابط مباشر.");
        setUploading(false);
        return;
      }

      if (editingItem) {
        const res = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            title: formData.title,
            description: formData.description,
            src: finalSrc,
          }),
        });

        const resData = await res.json();
        if (!res.ok) throw new Error(resData.error || "فشل تعديل البيانات");

        await fetchGallery();
        resetForm();
      } else {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            src: finalSrc,
          }),
        });

        const resData = await res.json();
        if (!res.ok) throw new Error(resData.error || "فشل إضافة الصورة");

        await fetchGallery();
        resetForm();
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "حدث خطأ غير متوقع أثناء الحفظ");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("فشل حذف الصورة من السيرفر.");
      }
    } catch (err) {
      console.error(err);
      alert("تعذر حذف الصورة");
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      src: item.src,
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ title: "", description: "", src: "" });
    setSelectedFile(null);
  };

  return (
    <div className="space-y-8 font-sans" dir="rtl">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {editingItem ? "✏️ تعديل بيانات الصورة" : "➕ إضافة صورة جديدة للمعرض"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                اختر ملف صورة من جهازك
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-700 w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                أو ضع مسار / رابط الصورة المباشر
              </label>
              <input
                type="text"
                placeholder="/uploads/example.jpg"
                value={formData.src}
                onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                className="text-gray-700 w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                عنوان الصورة (اختياري)
              </label>
              <input
                type="text"
                placeholder="عنوان أو مناسبة النشاط..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-gray-700 w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الشرح / الوصف التوضيحي (اختياري)
              </label>
              <input
                type="text"
                placeholder="شرح موجز يظهر أسفل الصورة..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="text-gray-700 w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl text-xs transition disabled:opacity-50"
            >
              {uploading ? "جاري الحفظ..." : editingItem ? "تحديث الصورة" : "إضافة إلى المعرض"}
            </button>

            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl text-xs transition"
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="text-md font-bold text-slate-800 mb-4">
          الصور الحالية بالمعرض ({items.length})
        </h3>

        {loading ? (
          <p className="text-center text-slate-400 py-8 text-sm">جاري تحميل المعرض...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-400 py-8 text-sm">لا توجد صور في المعرض حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="border border-stone-200 rounded-2xl overflow-hidden flex flex-col bg-stone-50"
              >
                <div className="relative h-44 w-full bg-stone-200">
                  <Image
                    src={item.src}
                    alt={item.title || "صورة"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs truncate">
                      {item.title || "بدون عنوان"}
                    </h4>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-stone-200">
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-1 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg text-xs font-semibold transition"
                    >
                      تعديل ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition"
                    >
                      حذف 🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}