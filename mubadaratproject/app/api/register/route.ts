export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRegistrations, saveRegistrations } from "@/lib/storage";
import { Registration } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, courseTitle, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف مطلوبان" },
        { status: 400 }
      );
    }

    const newRegistration: Registration = {
      id: Date.now(),
      name,
      phone,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    // إضافة await هنا لحل المشكلة
    const registrations = await getRegistrations();
    registrations.push(newRegistration);
    await saveRegistrations(registrations);

    return NextResponse.json(
      { success: true, message: "تم تسجيل طلبك بنجاح" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { error: "فشل إرسال الطلب، يرجى المحاولة لاحقاً" },
      { status: 500 }
    );
  }
}