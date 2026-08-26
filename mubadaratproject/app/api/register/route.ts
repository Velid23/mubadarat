import { NextResponse } from "next/server";
import { getRegistrations, saveRegistrations } from "@/lib/storage";
import { Registration } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, program, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "البيانات غير مكتملة" }, { status: 400 });
    }

    const newEntry: Registration = {
      id: Date.now(),
      name,
      phone,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    const currentData = getRegistrations();
    currentData.push(newEntry);
    saveRegistrations(currentData);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "فشل حفظ البيانات" }, { status: 500 });
  }
}