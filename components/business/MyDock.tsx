"use client";
import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/dock";
import {
  IconBrandGithub,
  IconHome,
  IconTerminal2,
  IconUser,
  IconFolder,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export function Dock() {
  // 1. 定义一个状态，控制 Dock 是否显示
  // 默认是 false (隐藏)，只有滚动了才显示
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 2. 滚动监听函数
    const handleScroll = () => {
      // 当滚动距离大于 200px 时显示，否则隐藏
      // 你可以调整这个 200 的数值，数值越大，就要滑得越远才出来
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // 添加监听器
    window.addEventListener("scroll", handleScroll);

    // 清理监听器 (防止内存泄漏)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 链接配置 (保持你原有的不变)
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 text-neutral-300" />,
      href: "#home",
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-neutral-500 text-neutral-300" />,
      href: "#about",
    },
    {
      title: "Projects",
      icon: <IconFolder className="h-full w-full text-neutral-500 text-neutral-300" />,
      href: "#projects",
    },
    {
      title: "Tech Stack",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 text-neutral-300" />,
      href: "#skills",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 text-neutral-300" />,
      href: "https://github.com/你的用户名",
      target: "_blank",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      {/* 3. 使用 AnimatePresence 允许组件卸载时播放动画 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            // 初始化状态：藏在底部 (y: 100), 透明 (opacity: 0)
            initial={{ y: 100, opacity: 0 }}
            // 动画状态：回到原位 (y: 0), 不透明 (opacity: 1)
            animate={{ y: 0, opacity: 1 }}
            // 退出状态：再滑下去藏起来
            exit={{ y: 100, opacity: 0 }}
            // 过渡效果：弹簧动画
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="fixed bottom-10 z-50" // 👈 关键！把 fixed 定位写在这里
          >
            <FloatingDock items={links} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}