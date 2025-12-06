"use client";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-5 right-5 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
    >
      {language === 'en' ? '中文' : 'En'}
    </button>
  );
}