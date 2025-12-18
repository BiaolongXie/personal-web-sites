"use client";

// 导入语言工具
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/lib/i18n";
import { RecordPlayer } from "@/components/ui/record-player";

export default function AboutPage() {
  // 1. 获取当前语言状态
  const { language } = useLanguageStore();
  // 2. 根据状态选字典：t 就代表了当前语言的所有文本
  const t = translations[language].hero;

  return (
    <div className=" ">
      {/* <NeteaseVinyl /> */}
      <RecordPlayer />
    </div>
  );
}
