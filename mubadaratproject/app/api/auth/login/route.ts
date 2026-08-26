import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const currentPassword = getAdminPassword();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "لم يتم ضبط كلمة المرور في ملف البيئة ADMIN_PASSWORD" },
        { status: 500 }
      );
    }

    if (password === currentPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "كلمة المرور غير صحيحة" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}