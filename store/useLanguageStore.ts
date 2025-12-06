import { create } from 'zustand';
import { Language } from '@/lib/i18n';

type LanguageState = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en', // 默认设为中文
  // 切换功能的逻辑：如果是 en 就变 zh，反之亦然
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'en' ? 'zh' : 'en' 
  })),
  setLanguage: (lang) => set({ language: lang }),
}));