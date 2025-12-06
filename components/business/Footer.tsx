"use client";
import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";
import { FaBilibili } from "react-icons/fa6";

// 导入语言工具
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/lib/i18n";

export default function Footer() {
  // 1. 获取当前语言状态
  const { language } = useLanguageStore();
  // 2. 根据状态选字典：t 就代表了当前语言的所有文本
  const t = translations[language].footer;
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-10 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 左侧：版权信息与简单的Slogan */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              Biaolong Xie
              {/* 一个闪烁的光标，增加黑客感 */}
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse"></span>
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {t.description}
              <br />
              <span className="text-xs text-gray-600">
                {/* 这里到时候可以放备案号 */}
                &copy; {new Date().getFullYear()} • Built with Next.js 14
              </span>
            </p>
          </div>

          {/* 右侧：极简社交图标 */}
          <div className="flex justify-center md:justify-end gap-6">
            <SocialLink
              href="https://github.com/BiaolongXie"
              icon={<FaGithub size={20} />}
              label="GitHub"
            />
            <SocialLink
              href="https://space.bilibili.com/431187111?spm_id_from=333.1007.0.0"
              icon={<FaBilibili size={20} />}
              label="Bilibili"
            />
          </div>
        </div>

        {/* 底部链接 (可选，不需要可以删掉) */}
        <div className="mt-8 border-t border-white/5 pt-8 flex justify-center">
          <p className="text-xs text-gray-500">
            Designed with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

// 提取一个小组件复用样式，让代码更干净
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-200"
    aria-label={label}
  >
    {icon}
  </a>
);
