import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased selection:bg-cyan-100 selection:text-cyan-900 bg-[#FDFBF7]">
        {children}
      </body>
    </html>
  );
}