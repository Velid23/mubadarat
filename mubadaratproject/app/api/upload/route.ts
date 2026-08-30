export const dynamic = "force-dynamic";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "لم يتم استلام أي ملف صورة" },
        { status: 400 }
      );
    }

    const safeFileName = `uploads/${Date.now()}-${file.name || "image.jpg"}`;

    // الرفع المباشر إلى Vercel Blob
    const blob = await put(safeFileName, file, {
      access: "public",
    });

    // إرجاع الرابط السحابي المباشر
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error?.message || "فشل رفع وحفظ الصورة على السيرفر" },
      { status: 500 }
    );
  }
}