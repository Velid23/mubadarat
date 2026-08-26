"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { coursesData } from "@/data/courses";
import { Course } from "@/types";
import CourseCard from "@/components/courses/coursecard";
import CourseDetails from "@/components/courses/coursedetails";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((err) => console.error("Error fetching courses:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans" dir="rtl">
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-sm bg-white">
              <Image
                src={siteConfig.logoImage}
                alt={siteConfig.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-lg block text-slate-800 leading-tight">{siteConfig.shortName}</span>
              <span className="text-xs text-cyan-800 font-medium">البرامج والدورات</span>
            </div>
          </div>

          <Link
            href="/"
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-sm font-semibold rounded-xl transition"
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-slate-500 py-16 text-sm">جاري تحميل الدورات والبرامج...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <h1 className="text-2xl font-bold text-slate-800">لا توجد دورات متاحة حالياً</h1>
            <p className="text-slate-500 text-sm">سيتم إضافة الدورات والبرامج التدريبية قريباً.</p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold rounded-xl transition"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : !selectedCourse ? (
          <div>
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 py-1 px-3 rounded-full">
                بناء وتمكين
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">البرامج والدورات المستمرة</h1>
              <p className="text-slate-500 text-sm">
                اختر الدورة للاطلاع على الشرح الكامل ومحاور التدريب والتسجيل
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={(c) => setSelectedCourse(c)}
                />
              ))}
            </div>
          </div>
        ) : (
          <CourseDetails
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
          />
        )}
      </main>
    </div>
  );
}