"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface EphemeralTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // 进入时的延迟
  duration?: number; // 停留的时间（毫秒），默认 2000
}

export const EphemeralText = ({
  children,
  className = "",
  delay = 0,
  duration = 2000,
}: EphemeralTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); 
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      if (isInView) {
        // --- 第一幕：浮现 ---
        await controls.start({
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          // ✨ 新增：开始显示时，开启鼠标交互
          pointerEvents: "auto", 
          transition: { duration: 1, delay: delay, ease: "easeOut" },
        });

        // --- 第二幕：停留 ---
        await new Promise((resolve) => setTimeout(resolve, duration));

        // --- 第三幕：消失 ---
        await controls.start({
          opacity: 0,
          y: -20,
          filter: "blur(10px)",
          // ✨ 关键修复：动画结束后，禁用鼠标交互 (transitionEnd)
          transitionEnd: { pointerEvents: "none" }, 
          transition: { duration: 1.5, ease: "easeInOut" },
        });
      } else {
        // 重置状态
        controls.set({ 
            opacity: 0, 
            y: 20, 
            filter: "blur(10px)",
            pointerEvents: "none" // 默认状态下禁用交互
        });
      }
    };

    sequence();
  }, [isInView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} // 初始状态：在下方、透明、模糊
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};