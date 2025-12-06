"use client";

// 导入语言工具
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/lib/i18n";

import { cn } from "@/lib/utils";

// 导入 UI 组件
import { Spotlight } from "@/components/ui/spotlight";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const EncryptedText = dynamic(
  () =>
    import("@/components/ui/encrypted-text").then((mod) => mod.EncryptedText),
  { ssr: false } // <--- 关键！关闭服务端渲染
);

export default function Hero() {
  // 1. 获取当前语言状态
  const { language } = useLanguageStore();
  // 2. 根据状态选字典：t 就代表了当前语言的所有文本
  const t = translations[language].hero;

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-grid-white/[0.02] antialiased relative overflow-hidden ">
      {/* 1. 聚光灯效果：从左上角打入白光 */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* 2. 内容区域 */}
      {/* 3D 介绍卡 */}
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[38rem] h-auto rounded-xl p-8 border">
          {/* ✅ 修改点2：主容器改为 flex-row (水平排列)，并用 justify-between 拉开间距 */}
          <div
            className="mt-2 flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* --- 左侧：文字信息区域 --- */}
            <div
              className="flex flex-col gap-2 items-start"
              style={{ transformStyle: "preserve-3d" }}
            >
              <CardItem
                translateZ="80"
                className="text-2xl font-bold text-neutral-600 dark:text-white hover:text-white hover:scale-105 transition-all origin-left"
              >
                {t.greeting} {/* 名字换行显示，更有冲击力 */}
                {/* 打字机效果 */}
                <div className="mx-auto flex max-w-lg items-center justify-center text-4xl md:text-5xl text-blue-500 mt-2">
                  <EncryptedText text={t.name} />
                </div>
              </CardItem>

              <CardItem
                translateZ="60"
                className="text-neutral-500 text-lg md:text-xl max-w-sm dark:text-neutral-300 mb-4 hover:text-white hover:scale-105 transition-all origin-left"
              >
                {t.introduce}
              </CardItem>

              {/* 身份标签组 */}
              <div
                className="flex flex-col gap-1 mt-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                {[
                  t.identity1,
                  t.identity2,
                  t.identity3,
                  t.identity4,
                  t.identity5,
                ].map((identity, index) => (
                  <CardItem
                    key={index}
                    translateZ="60"
                    // 关键：hover:scale-110 + origin-left，确保向右放大
                    className="w-full text-base md:text-lg font-mono text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-200 cursor-pointer origin-left whitespace-nowrap"
                  >
                    ➜ {identity}
                  </CardItem>
                ))}
              </div>

              <CardItem
                translateZ="60"
                className="text-neutral-500 text-xl max-w-sm dark:text-neutral-300 hover:text-white hover:scale-105 transition-all origin-left mt-6 italic"
              >
                “{t.motto}”
              </CardItem>
            </div>

            {/* --- 右侧：头像区域 --- */}
            <div
              // ✅ 关键修改 1: flex flex-col (垂直排列) + items-center (水平居中) + gap-8 (间距)
              className="flex-shrink-0 flex flex-col items-center gap-28"
              style={{ transformStyle: "preserve-3d" }}
            >
              <CardItem translateZ="100" className="w-full mt-0">
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 10 }} // 稍微调小一点 scale，避免太夸张
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  // ✅ 修正提示: Tailwind 默认没有 w-50/h-50，建议用 w-48 或 w-52，或者 w-[200px]
                  className="relative w-32 h-32 md:w-52 md:h-52 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border-[3px] border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] cursor-pointer overflow-hidden z-10 group/avatar"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full"></div>
                  <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden border border-white/10">
                    <Image
                      src="/avatar1.png"
                      alt="DevStudent Avatar"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </CardItem>

              {/* 底部按钮 */}
              {/* ✅ 关键修改 2: 删掉了外层多余的 div，直接把 CardItem 放在 flex-col 里 */}
              <CardItem
                translateZ="60"
                as={Link}
                href="#about"
                // ✅ 修正提示: hover:scale-120 可能无效(因为Tailwind默认只有110/125)，改成了 scale-110 或 arbitary value
                className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 hover:scale-125 transition-all shadow-lg "
              >
                View My Work →
              </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>


    </div>
  );
}
