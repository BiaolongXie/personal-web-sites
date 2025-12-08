"use client";
import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

export const Cursor = () => {
  // 1. 使用 MotionValue 来追踪鼠标位置 (比 useState 性能好很多，不会触发重渲染)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


  useEffect(() => {
    // 3. 监听鼠标移动
    const moveCursor = (e: MouseEvent) => {
      // 减去 16 是为了让光标圆心对准鼠标尖端 (假设光标宽32px)
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-white z-[9999] pointer-events-none mix-blend-difference"  // 白色，到不同的颜色区域会变色，如果要使用记得把style里的backgroundcolor一起解除注释
      style={{
        x: mouseX, 
        y: mouseY,
        backgroundColor: "white", // 配合 mix-blend-difference 实现反色
      }}
    />
  );
};