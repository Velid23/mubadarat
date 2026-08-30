import { put, list } from "@vercel/blob";
import { Registration, GalleryItem, ContactInfo, Course } from "@/types";
import { galleryImages as defaultGallery } from "@/data/gallery";
import { coursesData as defaultCourses } from "@/data/courses";

// 3. إدارة معلومات التواصل - القيمة الافتراضية
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

// دوال مساعدة للتعامل مع ملفات JSON السحابية
async function readBlobJson<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: `data/${fileName}` });
    if (!blobs || blobs.length === 0) return fallback;

    const latestBlob = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];

    const res = await fetch(latestBlob.url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return await res.json();
  } catch (error) {
    console.error(`Error reading ${fileName} from blob:`, error);
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
  } catch (error) {
    console.error(`Error saving ${fileName} to blob:`, error);
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