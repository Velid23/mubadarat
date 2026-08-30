export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getGalleryItems, saveGalleryItems } from "@/lib/storage";
import { GalleryItem } from "@/types";

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: "فشل جلب المعرض" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { src, title, description } = body;

    if (!src) {
      return NextResponse.json({ error: "رابط الصورة مطلوب" }, { status: 400 });
    }

    const newItem: GalleryItem = {
      id: `img-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      src,
      title: title || "",
      description: description || "",
      createdAt: new Date().toISOString(),
    };

    const items = await getGalleryItems();
    items.unshift(newItem);
    await saveGalleryItems(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("Gallery POST Error:", error);
    return NextResponse.json({ error: "فشل حفظ بيانات الصورة" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, src } = body;

    if (!id) {
      return NextResponse.json({ error: "معرف الصورة مطلوب" }, { status: 400 });
    }

    const items = await getGalleryItems();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "الصورة غير موجودة" }, { status: 404 });
    }

    items[index] = {
      ...items[index],
      title: title !== undefined ? title : items[index].title,
      description: description !== undefined ? description : items[index].description,
      src: src || items[index].src,
    };

    await saveGalleryItems(items);
    return NextResponse.json(items[index]);
  } catch (error: any) {
    console.error("Gallery PUT Error:", error);
    return NextResponse.json({ error: "فشل تعديل الصورة" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الصورة مطلوب" }, { status: 400 });
    }

    const items = await getGalleryItems();
    const filtered = items.filter((i) => i.id !== id);
    await saveGalleryItems(filtered);

    return NextResponse.json({ success: true, message: "تم حذف الصورة بنجاح" });
  } catch (error: any) {
    console.error("Gallery DELETE Error:", error);
    return NextResponse.json({ error: "فشل حذف الصورة" }, { status: 500 });
  }
}