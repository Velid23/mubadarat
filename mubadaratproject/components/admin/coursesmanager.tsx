"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Course } from "@/types";

export default function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    summary: "",
    descriptionText: "",
    targetAudience: "",
    location: "",
    featuresText: "",
    registrationLink: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
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
      let finalImageUrl = formData.image;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);

        const upRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const upResult = await upRes.json();
        if (!upRes.ok) throw new Error(upResult.error || "فشل رفع الصورة");
        finalImageUrl = upResult.url;
      }

      if (!finalImageUrl) {
        alert("يرجى اختيار صورة للدورة أو وضع مسارها.");
        setUploading(false);
        return;
      }

      const descriptionArray = formData.descriptionText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const featuresArray = formData.featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        category: formData.category || "برامج ودورات",
        image: finalImageUrl,
        summary: formData.summary,
        description: descriptionArray,
        targetAudience: formData.targetAudience,
        location: formData.location,
        features: featuresArray,
        registrationLink: formData.registrationLink,
      };

      if (editingCourse) {
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCourse.id, ...payload }),
        });

        if (!res.ok) throw new Error("فشل تحديث الدورة");
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("فشل إضافة الدورة");
      }

      await fetchCourses();
      resetForm();
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "حدث خطأ أثناء حفظ الدورة");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الدورة بالكامل؟")) return;

    try {
      const res = await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("فشل حذف الدورة.");
      }
    } catch (err) {
      console.error(err);
      alert("تعذر حذف الدورة");
    }
  };

  const startEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      image: course.image,
      summary: course.summary,
      descriptionText: course.description.join("\n"),
      targetAudience: course.targetAudience,
      location: course.location,
      featuresText: course.features.join("\n"),
      registrationLink: course.registrationLink || "",
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      category: "",
      image: "",
      summary: "",
      descriptionText: "",
      targetAudience: "",
      location: "",
      featuresText: "",
      registrationLink: "",
    });
    setSelectedFile(null);
  };

  return (
    <div className="space-y-8 font-sans" dir="rtl">
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {editingCourse ? `✏️ تعديل دورة: ${editingCourse.title}` : "➕ إضافة دورة أو برنامج تدريبي جديد"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">اسم / عنوان الدورة *</label>
              <input
                type="text"
                required
                placeholder="عنوان الدورة أو البرنامج..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">التصنيف أو الفئة</label>
              <input
                type="text"
                placeholder="مثال: مهارات، تدريب مهني، تعليم"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رفع صورة البوستر / الإعلان</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-600w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">أو مسار الصورة المباشر</label>
              <input
                type="text"
                placeholder="/uploads/course.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="text-gray-600  w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">نبذة مختصرة (تظهر بالبطاقة الخارجية)</label>
              <textarea
                rows={2}
                placeholder="شرح في سطر أو سطرين عن الدورة..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رابط التسجيل الخاص بها (Google Form مثلاً)</label>
              <input
                type="text"
                placeholder="https://forms.gle/..."
                value={formData.registrationLink}
                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
                dir="ltr"
              />
              <span className="text-[10px] text-slate-400">إذا تركته فارغاً سيتم توجيه الزائر لنموذج الموقع تلقائياً</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">🎯 الفئة المستهدفة</label>
              <input
                type="text"
                placeholder="مثال: الطلاب، الشباب، الجميع"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">📍 مكان إقامة الدورة</label>
              <input
                type="text"
                placeholder="مثال: المقر الرئيسي أو عبر الإنترنت"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الشرح والوصف التفصيلي (كل فقرة في سطر جديد)
              </label>
              <textarea
                rows={4}
                placeholder="الفقرة الأولى...&#10;الفقرة الثانية..."
                value={formData.descriptionText}
                onChange={(e) => setFormData({ ...formData, descriptionText: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                أبرز المحاور والمميزات (كل ميزة أو محور في سطر جديد)
              </label>
              <textarea
                rows={4}
                placeholder="المحور الأول&#10;المحور الثاني&#10;شهادة حضور"
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                className="text-gray-600 w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-cyan-600 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl text-xs transition shadow-md disabled:opacity-50"
            >
              {uploading ? "جاري الحفظ..." : editingCourse ? "تحديث بيانات الدورة" : "إضافة الدورة للموقع"}
            </button>

            {editingCourse && (
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

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="text-md font-bold text-slate-800 mb-4">
          الدورات والبرامج المتاحة حالياً ({courses.length})
        </h3>

        {loading ? (
          <p className="text-center text-slate-400 py-8 text-sm">جاري تحميل الدورات...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-slate-400 py-8 text-sm">لا توجد دورات مضافة حتى الآن.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border border-stone-200 rounded-2xl overflow-hidden flex flex-col bg-stone-50"
              >
                <div className="relative h-48 w-full bg-stone-200">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-100/70 px-2 py-0.5 rounded-full inline-block mb-1">
                      {course.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{course.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {course.summary}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-stone-200">
                    <button
                      onClick={() => startEdit(course)}
                      className="flex-1 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg text-xs font-semibold transition"
                    >
                      تعديل الشرح والبيانات ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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