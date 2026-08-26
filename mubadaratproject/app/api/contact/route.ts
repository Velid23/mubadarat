export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getContactInfo, saveContactInfo, defaultContactInfo } from "@/lib/storage";
import { ContactInfo } from "@/types";

export async function GET() {
  try {
    const data = getContactInfo();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(defaultContactInfo);
  }
}

export async function PUT(request: Request) {
  try {
    const body: ContactInfo = await request.json();
    saveContactInfo(body);
    return NextResponse.json({ success: true, message: "تم تحديث معلومات التواصل بنجاح" });
  } catch (error) {
    return NextResponse.json({ error: "فشل حفظ التعديلات" }, { status: 500 });
  }
}