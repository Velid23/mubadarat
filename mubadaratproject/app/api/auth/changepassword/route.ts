export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminPassword, saveAdminPassword } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "يرجى إدخال كلمة المرور الحالية والجديدة" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل" },
        { status: 400 }
      );
    }

    const savedPassword = getAdminPassword();

    // التحقق من صحة كلمة المرور الحالية
    if (currentPassword !== savedPassword) {
      return NextResponse.json(
        { error: "كلمة المرور الحالية غير صحيحة" },
        { status: 401 }
      );
    }

    // حفظ كلمة المرور الجديدة
    saveAdminPassword(newPassword);

    return NextResponse.json({
      success: true,
      message: "تم تغيير كلمة المرور بنجاح",
    });
  } catch (error) {
    console.error("Change Password API Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم أثناء تحديث كلمة المرور" },
      { status: 500 }
    );
  }
}