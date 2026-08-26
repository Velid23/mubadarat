import fs from "fs";
import path from "path";
import { Registration, GalleryItem, ContactInfo, Course } from "@/types";
import { galleryImages as defaultGallery } from "@/data/gallery";
import { coursesData as defaultCourses } from "@/data/courses";

const REG_FILE_PATH = path.join(process.cwd(), "registrations.json");
const GALLERY_FILE_PATH = path.join(process.cwd(), "gallery.json");
const CONTACT_FILE_PATH = path.join(process.cwd(), "contact.json");
const COURSES_FILE_PATH = path.join(process.cwd(), "courses.json");
const SECURITY_FILE_PATH = path.join(process.cwd(), "security.json");

// 1. إدارة التسجيلات
export function getRegistrations(): Registration[] {
  if (!fs.existsSync(REG_FILE_PATH)) return [];
  const content = fs.readFileSync(REG_FILE_PATH, "utf-8");
  return content ? JSON.parse(content) : [];
}

export function saveRegistrations(data: Registration[]): void {
  fs.writeFileSync(REG_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// 2. إدارة المعرض
export function getGalleryItems(): GalleryItem[] {
  if (!fs.existsSync(GALLERY_FILE_PATH)) {
    fs.writeFileSync(GALLERY_FILE_PATH, JSON.stringify(defaultGallery, null, 2), "utf-8");
    return defaultGallery;
  }
  const content = fs.readFileSync(GALLERY_FILE_PATH, "utf-8");
  return content ? JSON.parse(content) : [];
}

export function saveGalleryItems(data: GalleryItem[]): void {
  fs.writeFileSync(GALLERY_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// 3. إدارة معلومات التواصل
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

export function getContactInfo(): ContactInfo {
  if (!fs.existsSync(CONTACT_FILE_PATH)) {
    fs.writeFileSync(CONTACT_FILE_PATH, JSON.stringify(defaultContactInfo, null, 2), "utf-8");
    return defaultContactInfo;
  }
  const content = fs.readFileSync(CONTACT_FILE_PATH, "utf-8");
  return content ? JSON.parse(content) : defaultContactInfo;
}

export function saveContactInfo(data: ContactInfo): void {
  fs.writeFileSync(CONTACT_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// 4. إدارة الدورات والبرامج
export function getCourses(): Course[] {
  if (!fs.existsSync(COURSES_FILE_PATH)) {
    fs.writeFileSync(COURSES_FILE_PATH, JSON.stringify(defaultCourses, null, 2), "utf-8");
    return defaultCourses;
  }
  const content = fs.readFileSync(COURSES_FILE_PATH, "utf-8");
  return content ? JSON.parse(content) : defaultCourses;
}

export function saveCourses(data: Course[]): void {
  fs.writeFileSync(COURSES_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// 5. إدارة كلمة المرور (تعتمد حصراً على البيئة أو الملف المخزن)
const ENV_FILE_PATH = path.join(process.cwd(), ".env.local");

export function getAdminPassword(): string {
  if (fs.existsSync(ENV_FILE_PATH)) {
    const content = fs.readFileSync(ENV_FILE_PATH, "utf-8");
    const match = content.match(/^ADMIN_PASSWORD=(.*)$/m);
    if (match && match[1]) return match[1].trim();
  }
  return process.env.ADMIN_PASSWORD || "";
}

export function saveAdminPassword(newPassword: string): void {
  let content = "";
  if (fs.existsSync(ENV_FILE_PATH)) {
    content = fs.readFileSync(ENV_FILE_PATH, "utf-8");
  }

  // إذا كان السطر موجوداً نستبدله، وإذا لم يكن موجوداً نضيفه
  if (/^ADMIN_PASSWORD=/m.test(content)) {
    content = content.replace(/^ADMIN_PASSWORD=.*$/m, `ADMIN_PASSWORD=${newPassword}`);
  } else {
    content += `\nADMIN_PASSWORD=${newPassword}\n`;
  }

  fs.writeFileSync(ENV_FILE_PATH, content.trim() + "\n", "utf-8");
}