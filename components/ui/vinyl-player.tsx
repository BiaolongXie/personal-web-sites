"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image"; // 引入 Next.js 的优化图片组件

// 模拟歌曲信息
const currentSong = {
  title: "Divide",
  artist: "Ed Sheeran",
  coverUrl: "/image/music/album-cover.png",
  audioSrc: "/image/music/audio/test2.mp3",
  // 新增素材路径
  vinylTexture: "/image/music/vinyl-texture.png",
  tonearmImage: "/image/music/tonearm.png",
};

export const NeteaseVinyl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // play() 返回一个 Promise，我们可以捕获它的错误
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 播放成功
            setIsPlaying(true);
          })
          .catch((error) => {
            // 播放失败！这里会打印具体原因
            console.error("播放失败，原因：", error);
            alert("播放出错了！请按 F12 查看控制台报错。");
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 rounded-3xl">
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
        {/* --- 1. 唱臂图片层 (Tonearm Image) --- */}
        {/* - z-30: 确保它在最最上面
           - pointer-events-none: 让鼠标点击能穿透它打到唱片上
           - origin-[20%_10%]: 关键！你需要根据你的图片素材调整这个旋转中心点。
             这表示以图片左侧20%，顶部10%的位置为轴心旋转。
        */}
        <motion.div
          className="absolute -top-[40px] right-[-30px] w-32 h-48 z-30 pointer-events-none"
          style={{ transformOrigin: "50% 24%" }}
          animate={{ rotate: isPlaying ? 10 : -20 }} // 播放时逆时针转20度
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          {/* 使用 Next/Image 引入透明 PNG */}
          <Image
            src={currentSong.tonearmImage}
            alt="Tonearm"
            fill // 填满父容器
            className="object-contain" // 保持图片比例
          />
          <div
            className="absolute w-2 h-2 bg-red-600 rounded-full"
            style={{
              left: "50%",
              top: "24%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* 👆 让这个红点的 left/top 和上面的 transformOrigin 保持一致 */}
        </motion.div>

        {/* --- 2. 旋转主体 (唱片 + 纹理 + 封面) --- */}
        <div
          className="w-full h-full relative flex items-center justify-center cursor-pointer rounded-full shadow-2xl shadow-black/60 border-4 border-zinc-800"
          onClick={togglePlay}
        >
          {/* A. 最底层：纯黑背景 */}
          <div className="absolute inset-0 rounded-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
            {/* B. 中间层：真实的黑胶纹理图 (New!) */}
            {/* - z-10: 在黑底之上，封面之下
                 - opacity-70: 半透明，让纹理看起来融合在黑色里，而不是贴在上面
                 - mix-blend-overlay: (可选) 混合模式，增加质感
              */}

            <div className="absolute inset-0 z-10 opacity-70 screen">
              <Image
                src={currentSong.vinylTexture}
                alt="Vinyl Texture"
                fill
                className="object-cover" // 确保纹理覆盖整个圆
              />
            </div>
          </div>
          {/* C. 顶层：专辑封面 */}
          <div
            className="w-[65%] h-[65%] rounded-full bg-cover bg-center border-[6px] border-[#0a0a0a] relative z-20 shadow-md"
            style={{
              backgroundImage: `url(${currentSong.coverUrl})`,
              // 动画只作用于这张图片
              animation: "spin 20s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full transition-opacity">
                <Play className="text-white/90 w-12 h-12" fill="white" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
        <p className="text-zinc-400">{currentSong.artist}</p>
      </div>
    </div>
  );
};
