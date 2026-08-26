import React from "react";
import { Registration } from "@/types";

interface Props {
  registrations: Registration[];
  loading: boolean;
  deletingId: number | null;
  onDelete: (id: number) => void;
}

export default function RegistrationsTable({ registrations, loading, deletingId, onDelete }: Props) {
  if (loading) {
    return <p className="text-center text-slate-500 py-8">جاري جلب البيانات...</p>;
  }

  if (registrations.length === 0) {
    return <p className="text-center text-slate-500 py-8">لا توجد طلبات مسجلة حتى الآن.</p>;
  }

  return (
    <div className="overflow-x-auto font-sans">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b border-stone-200 text-slate-500 text-xs">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">الاسم</th>
            <th className="py-3 px-4">رقم الواتساب</th>
            <th className="py-3 px-4">المسار</th>
            <th className="py-3 px-4">ملاحظات</th>
            <th className="py-3 px-4">تاريخ الإرسال</th>
            <th className="py-3 px-4 text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-stone-100">
          {registrations.map((item, idx) => (
            <tr key={item.id || idx} className="hover:bg-slate-50">
              <td className="py-3.5 px-4 text-slate-400 font-mono text-xs">{idx + 1}</td>
              <td className="py-3.5 px-4 font-semibold text-slate-800">{item.name}</td>
              <td className="py-3.5 px-4 text-cyan-700 font-mono" dir="ltr">
                {item.phone}
              </td>
              <td className="py-3.5 px-4 text-slate-500">{item.notes || "-"}</td>
              <td className="py-3.5 px-4 text-xs text-slate-400">
                {new Date(item.createdAt).toLocaleDateString("ar-EG")}
              </td>
              <td className="py-3.5 px-4 text-center">
                <button
                  onClick={() => onDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                >
                  {deletingId === item.id ? "جاري الحذف..." : "حذف 🗑️"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}