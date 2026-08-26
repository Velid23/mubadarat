export interface SiteConfig {
  name: string;             // الاسم الرسمي للمؤسسة
  shortName: string;        // الاسم المختصر
  subTitle: string;         // العنوان الفرعي
  tagline: string;          // الشعار اللفظي
  badgeText: string;        // الشارة العلوية
  aboutDescription: string; // النبذة التعريفية
  logoImage: string;        // مسار الشعار
}

export const siteConfig: SiteConfig = {
  name: "مؤسسة مبادرات الخيرية التنموية", 
  shortName: "مؤسسة مبادرات",
  subTitle: " الخيرية التنموية",
  tagline: "مُبَادَرَاتٌ إِنسَانِيَّةٌ لِخَيرٍ يَدُومُ وَأَثَرٍ يَبْقَى",
  badgeText: "منظمة غير هادفة للربح",
  aboutDescription:
    "منظمة خيرية تنموية تُعنى بتعليم القرآن الكريم، وإقامة الدورات المهنية والتعليمية، وبناء الإنسان وتمكين المجتمع من خلال مشاريع تنموية وإنسانية مستدامة.",
  logoImage: "/545955086_122097980973016482_7559645831261984231_n.jpg",
};