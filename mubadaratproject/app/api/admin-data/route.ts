export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRegistrations, saveRegistrations } from "@/lib/storage";

export async function GET() {
  try {
    const data = getRegistrations();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الطلب مطلوب" }, { status: 400 });
    }

    const currentData = getRegistrations();
    const filteredData = currentData.filter((item) => item.id.toString() !== id);
    saveRegistrations(filteredData);

    return NextResponse.json({ success: true, message: "تم الحذف بنجاح" });
  } catch {
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}