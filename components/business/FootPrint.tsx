"use client";

import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/lib/i18n";
import { Globe } from "@/components/business/Globe";
import { EphemeralText } from "@/components/ui/ephemeral-text";
import { ScrollingGallery } from "@/components/ui/scrolling-gallery"; // 导入组件

// 模拟旅行数据 (你可以换成真实的图片路径)
const PLACES = [
  { id: "1", name: "Tokyo, Japan", image: "/image/city/tokyo.jpg" },
  { id: "2", name: "ChangSha, China", image: "/image/city/changsha.jpg" },
  { id: "3", name: "SuZhou, China", image: "/image/city/suzhou.jpg" },
  { id: "4", name: "Sydney, Australia", image: "/image/city/sydney.jpg" },
  { id: "5", name: "Shanghai, China", image: "/image/city/shanghai.jpg" },
  { id: "6", name: "HaiNan, China", image: "/image/city/hainan.jpg" },
];

export default function FootPrint() {
  const { language } = useLanguageStore();
  const t = translations[language].hero;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* --- 层级 0: 动态照片墙背景 --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* 稍微旋转一点角度，更有艺术感 (可选) */}
        <div className="w-full -rotate-3 scale-110"> 
             <ScrollingGallery items={PLACES} />
        </div>
      </div>

      {/* --- 层级 1: 黑色渐变遮罩 (关键！) --- */}
      {/* 上下是实黑，中间半透明，这样保证照片只在中间隐约可见，不抢地球风头 */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-zinc-950 pointer-events-none" />
      
      {/* --- 层级 2: 3D 地球 --- */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[800px] z-10">
  <Globe />
</div>

      {/* --- 层级 3: 前景文字 --- */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <EphemeralText 
            duration={1000} 
            className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 text-center leading-tight pb-4 drop-shadow-2xl"
        >
            My Foot Print
        </EphemeralText>
      </div>

    </div>
  );
}