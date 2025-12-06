"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import { FaBilibili } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";

export function MyDock() {
  // 提取公共样式，让代码更整洁
  const linkClass = "flex items-center justify-center w-full h-full text-white";

  return (
    <div className="relative">
      <Dock iconMagnification={60} iconDistance={100}>
        
        {/* Bilibili */}
        <DockIcon className="bg-black/10 dark:bg-white/8">
          <a 
            href="https://space.bilibili.com/431187111?spm_id_from=333.1007.0.0" 
            target="_blank" 
            rel="noopener noreferrer" // 安全性最佳实践
            className={linkClass}     // <--- 记得把这个加回去，否则图标还会歪！
            aria-label="Bilibili"
          >
            <FaBilibili size={30} />
          </a>
        </DockIcon>

        {/* GitHub */}
        <DockIcon className="bg-black/10 dark:bg-white/8">
          <a 
            href="https://github.com/BiaolongXie" 
            target="_blank" 
            rel="noopener noreferrer"
            className={linkClass} 
            aria-label="GitHub"
          >
            <IoLogoGithub size={30} />
          </a>
        </DockIcon>

      </Dock>
    </div>
  );
}