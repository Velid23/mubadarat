export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCourses, saveCourses } from "@/lib/storage";
import { Course } from "@/types";

export async function GET() {
  try {
    const courses = getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "فشل جلب الدورات" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, image, summary, description, targetAudience, location, features, registrationLink } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "عنوان الدورة والصورة مطلوبان" }, { status: 400 });
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title,
      category: body.category || "برامج ودورات",
      image,
      summary: summary || "",
      description: Array.isArray(description) ? description : description ? [description] : [],
      targetAudience: targetAudience || "عامة",
      location: location || "المقر الرئيسي",
      features: Array.isArray(features) ? features : features ? [features] : [],
      registrationLink: registrationLink || "",
    };

    const courses = getCourses();
    courses.push(newCourse);
    saveCourses(courses);

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "فشل إضافة الدورة" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: Course = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "معرف الدورة مطلوب" }, { status: 400 });
    }

    const courses = getCourses();
    const index = courses.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "الدورة غير موجودة" }, { status: 404 });
    }

    courses[index] = {
      ...courses[index],
      ...body,
      description: Array.isArray(body.description) ? body.description : [body.description],
      features: Array.isArray(body.features) ? body.features : [body.features],
    };

    saveCourses(courses);
    return NextResponse.json(courses[index]);
  } catch (error) {
    return NextResponse.json({ error: "فشل تحديث الدورة" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الدورة مطلوب" }, { status: 400 });
    }

    const courses = getCourses();
    const filtered = courses.filter((c) => c.id !== id);
    saveCourses(filtered);

    return NextResponse.json({ success: true, message: "تم حذف الدورة بنجاح" });
  } catch (error) {
    return NextResponse.json({ error: "فشل حذف الدورة" }, { status: 500 });
  }
}