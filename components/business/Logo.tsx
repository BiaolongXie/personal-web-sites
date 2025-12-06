
"use client"; // 👈 关键！这行代码告诉 Next.js：这个组件要在浏览器里运行，可以包含点击事件。

import { Logo } from "@/components/ui/logo"; // 引入你之前写的纯 SVG Logo

export const Mainlogo = () => {
  const handleScrollToTop = () => {
    // 这里可以使用 window 对象，因为有 "use client"
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      onClick={handleScrollToTop}
      className="fixed top-6 left-6 z-50 mix-blend-difference cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* 复用之前的 SVG Logo，并传入样式 */}
      <Logo className="w-30 h-30 text-white" />
    </div>
  );
};