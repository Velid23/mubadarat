import { put, list } from "@vercel/blob";
import { Registration, GalleryItem, ContactInfo, Course } from "@/types";
import { galleryImages as defaultGallery } from "@/data/gallery";
import { coursesData as defaultCourses } from "@/data/courses";

export const defaultContactInfo: ContactInfo = {
  address: "المقر الرئيسي",
  phone: "+000 000 000 000",
  email: "contact@example.org",
  workingHours: "السبت - الخميس: 9:00 ص - 5:00 م",
  facebookUrl: "",
  instagramUrl: "",
  whatsappUrl: "",
  telegramUrl: "",
};

async function readBlobJson<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: `data/${fileName}` });
    if (!blobs || blobs.length === 0) {
      console.log(`[STORAGE] No blob found for data/${fileName}, using fallback.`);
      return fallback;
    }

    const targetBlob = blobs[0];
    const res = await fetch(`${targetBlob.url}?nocache=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });

    if (!res.ok) {
      console.error(`[STORAGE] Failed to fetch blob url ${targetBlob.url}: status ${res.status}`);
      return fallback;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[STORAGE ERROR] reading ${fileName}:`, error);
    return fallback;
  }
}

async function writeBlobJson<T>(fileName: string, data: T): Promise<void> {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await put(`data/${fileName}`, jsonString, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    console.log(`[STORAGE SUCCESS] Saved data/${fileName}`);
  } catch (error) {
    console.error(`[STORAGE ERROR] writing ${fileName}:`, error);
  }
}

// 1. إدارة التسجيلات
export async function getRegistrations(): Promise<Registration[]> {
  return await readBlobJson<Registration[]>("registrations.json", []);
}

export async function saveRegistrations(data: Registration[]): Promise<void> {
  await writeBlobJson("registrations.json", data);
}

// 2. إدارة المعرض
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return await readBlobJson<GalleryItem[]>("gallery.json", defaultGallery);
}

export async function saveGalleryItems(data: GalleryItem[]): Promise<void> {
  await writeBlobJson("gallery.json", data);
}

// 3. إدارة معلومات التواصل
export async function getContactInfo(): Promise<ContactInfo> {
  return await readBlobJson<ContactInfo>("contact.json", defaultContactInfo);
}

export async function saveContactInfo(data: ContactInfo): Promise<void> {
  await writeBlobJson("contact.json", data);
}

// 4. إدارة الدورات والبرامج
export async function getCourses(): Promise<Course[]> {
  return await readBlobJson<Course[]>("courses.json", defaultCourses);
}

export async function saveCourses(data: Course[]): Promise<void> {
  await writeBlobJson("courses.json", data);
}

// 5. إدارة كلمة المرور
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

export function saveAdminPassword(newPassword: string): void {
  console.log("Admin password updated to:", newPassword);
}