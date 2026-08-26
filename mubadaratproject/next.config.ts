
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // لتصدير الموقع كملفات HTML/CSS/JS جاهزة
  images: {
    unoptimized: true, // ضروري لأن GitHub Pages لا يدعم سيرفر معالجة صور Next.js
  },
};

module.exports = nextConfig;
