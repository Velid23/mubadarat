export interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  description: string[];
  targetAudience: string;
  location: string;
  features: string[];
  registrationLink?: string;
}

export interface Registration {
  id: number;
  name: string;
  phone: string;
  notes: string;
  createdAt: string;
}

export interface GalleryItem {
  id?: string;
  src: string;
  title: string;
  description?: string;
  createdAt?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
  telegramUrl: string;
}