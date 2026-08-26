import React from "react";
import Image from "next/image";
import { Course } from "@/types";

interface Props {
  course: Course;
  onSelect: (course: Course) => void;
}

export default function CourseCard({ course, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(course)}
      className="group cursor-pointer bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col font-sans"
    >
      <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between text-right space-y-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg group-hover:text-cyan-700 transition mb-2">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">{course.summary}</p>
        </div>
        <span className="text-xs font-bold text-cyan-700 block">عرض كامل التفاصيل والتسجيل ←</span>
      </div>
    </div>
  );
}