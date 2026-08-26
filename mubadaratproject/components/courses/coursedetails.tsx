import React from "react";
import Image from "next/image";
import { Course } from "@/types";

interface Props {
  course: Course;
  onBack: () => void;
}

export default function CourseDetails({ course, onBack }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-10 shadow-sm font-sans" dir="rtl">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl transition inline-flex items-center gap-1"
      >
        ← رجوع لجميع الدورات
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="relative h-80 md:h-112.5 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-full inline-block mb-2">
              {course.category}
            </span>
            <h2 className="text-3xl font-bold text-slate-900">{course.title}</h2>
          </div>

          <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
            {course.description.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2 text-slate-700">
            <p><strong>🎯 الفئة المستهدفة:</strong> {course.targetAudience}</p>
            <p><strong>📍 المكان:</strong> {course.location}</p>
          </div>

          {course.features.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-3">أبرز المحاور والمميزات:</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4">
            <a
              href={course.registrationLink || "/#register"}
              target={course.registrationLink?.startsWith("http") ? "_blank" : "_self"}
              rel={course.registrationLink?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block w-full text-center py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl transition shadow-md"
            >
              الانتقال للتسجيل في الدورة ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}