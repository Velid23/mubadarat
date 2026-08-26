"use client";

import React, { useState } from "react";
import Image from "next/image";
import { coursesData } from "@/data/courses";
import { Course } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseForRegister: (courseTitle: string) => void;
}

export default function CourseModal({ isOpen, onClose, onSelectCourseForRegister }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {selectedCourse ? selectedCourse.title : "البرامج والدورات المستمرة"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedCourse ? selectedCourse.category : "انقر على أي دورة للاطلاع على كامل التفاصيل والمحاور"}
            </p>
          </div>
          <button
            onClick={() => {
              if (selectedCourse) setSelectedCourse(null);
              else onClose();
            }}
            className="w-9 h-9 rounded-full bg-white border border-stone-200 text-slate-600 hover:bg-stone-100 flex items-center justify-center text-lg transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {!selectedCourse ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {coursesData.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="group cursor-pointer bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-44 w-full bg-stone-100">
                    <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between text-right">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-cyan-700 transition mb-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{course.summary}</p>
                    </div>
                    <span className="text-xs text-cyan-700 font-semibold mt-3 inline-block">عرض المحاور والتفاصيل ←</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 items-start text-right">
              <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 top-0">
                <Image src={selectedCourse.image} alt={selectedCourse.title} fill className="object-contain" />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-full inline-block">
                    {selectedCourse.category}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 pt-1">{selectedCourse.title}</h4>
                </div>
                <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
                  {selectedCourse.description.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs space-y-1.5 text-slate-700">
                  <p><strong>🎯 الفئة المستهدفة:</strong> {selectedCourse.targetAudience}</p>
                  <p><strong>📍 المكان:</strong> {selectedCourse.location}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 mb-2">أبرز المحاور والمميزات:</h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedCourse.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => {
                      onSelectCourseForRegister(selectedCourse.title);
                      setSelectedCourse(null);
                      onClose();
                    }}
                    className="flex-1 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold rounded-xl transition shadow-md text-center"
                  >
                    التسجيل في هذه الدورة
                  </button>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                  >
                    رجوع للقائمة
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}