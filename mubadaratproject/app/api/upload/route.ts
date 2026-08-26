export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "لم يتم استلام أي ملف صورة" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalName = file.name || "image.jpg";
    const extension = path.extname(originalName) || ".jpg";
    const safeFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    const filePath = path.join(uploadDir, safeFileName);

    fs.writeFileSync(filePath, buffer);

    const webUrl = `/uploads/${safeFileName}`;
    return NextResponse.json({ url: webUrl }, { status: 201 });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error?.message || "فشل رفع وحفظ الصورة على السيرفر" },
      { status: 500 }
    );
  }
}