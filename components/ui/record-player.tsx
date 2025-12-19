"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Play, Disc } from "lucide-react";
import Image from "next/image";
import GlitchText from "@/components/ui/glitch-text-props";

// 导入语言工具
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/lib/i18n";

// --- 1. 定义公共素材 (配置中心) ---
const DEFAULT_ASSETS = {
  vinylTexture: "/image/music/vinyl-texture.png",
  tonearmImage: "/image/music/tonearm.png",
};

// --- 2. 数据结构 ---
type Song = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioSrc: string;
};

// 模拟数据
const PLAYLIST: Song[] = [
  // 第一列
  {
    id: "1",
    title: "明明就",
    artist: "Jay Chou",
    coverUrl: "/image/music/cover/十二新作.png",
    audioSrc: "/audio/周杰伦-明明就.mp3",
  },
  {
    id: "2",
    title: "搁浅",
    artist: "Jay Chou",
    coverUrl: "/image/music/cover/七里香.png",
    audioSrc: "/audio/周杰伦-搁浅.flac",
  },
  {
    id: "3",
    title: "退后",
    artist: "Jay Chou",
    coverUrl: "/image/music/cover/范特西.png",
    audioSrc: "/audio/周杰伦-退后.flac",
  },
  {
    id: "4",
    title: "爱情废柴",
    artist: "Jay Chou",
    coverUrl: "/image/music/cover/床边的故事.png",
    audioSrc: "/audio/周杰伦-爱情废柴.flac",
  },
  // 第二列
  {
    id: "5",
    title: "手心的蔷薇",
    artist: "JJ Lin & G.E.M.",
    coverUrl: "/image/music/cover/可惜没如果-手心的蔷薇.jpg",
    audioSrc: "/audio/手心的蔷薇.mp3",
  },
  {
    id: "6",
    title: "愿与愁",
    artist: "JJ Lin",
    coverUrl: "/image/music/cover/愿与愁.jpg",
    audioSrc: "/audio/愿与愁.flac",
  },
  {
    id: "7",
    title: "伟大的渺小",
    artist: "JJ Lin",
    coverUrl: "/image/music/cover/伟大的渺小.jpg",
    audioSrc: "/audio/伟大的渺小.flac",
  },
  {
    id: "8",
    title: "可惜没如果",
    artist: "JJ Lin",
    coverUrl: "/image/music/cover/可惜没如果-手心的蔷薇.jpg",
    audioSrc: "/audio/可惜没如果.mp3",
  },
  // 第三列
  {
    id: "9",
    title: "Something Just Like This",
    artist: "The Chainsmokers",
    coverUrl: "/image/music/cover/SomeThing.jpg",
    audioSrc: "/audio/Something Just Like This.mp3",
  },
  {
    id: "10",
    title: "Monsters",
    artist: "Timeflies & Katie Sky",
    coverUrl: "/image/music/cover/monsters.jpg",
    audioSrc: "/audio/Monsters.mp3",
  },
  {
    id: "11",
    title: "See You Again",
    artist: "Wiz Khalifa & Charlie Puth",
    coverUrl: "/image/music/cover/SeeYou.png",
    audioSrc: "/audio/See You Again.mp3",
  },
  {
    id: "12",
    title: "The Spectre",
    artist: "Alan Walker",
    coverUrl: "/image/music/cover/TheSpectre.jpg",
    audioSrc: "/audio/The Spectre.mp3",
  },
];

// --- 3. 通用唱片组件 ---
const VinylDisc = ({
  song,
  isSpinning = false,
}: {
  song: Song;
  isSpinning?: boolean;
}) => {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
      {/* 黑色底盘 */}
      <div className="absolute inset-0 rounded-full bg-[#0a0a0a] border border-white/5 shadow-xl">
        <div className="absolute inset-0 z-10 opacity-80 mix-blend-screen">
          <Image
            src={DEFAULT_ASSETS.vinylTexture}
            alt="texture"
            fill
            className="object-cover rounded-full"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 z-15 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
      </div>
      {/* 封面 */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div
          className="relative w-[65%] h-[65%] rounded-full overflow-hidden border-[4px] border-[#111] shadow-inner"
          style={{
            backgroundImage: `url(${song.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // 1. 始终保留动画规则，不要移除它
            animation: "spin 20s linear infinite",

            // 2. 只控制播放状态：是“运行”还是“暂停”
            animationPlayState: isSpinning ? "running" : "paused",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

// --- 4. 主组件 ---
export const RecordPlayer = () => {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOverDropZone, setIsOverDropZone] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // 1. 获取当前语言状态
  const { language } = useLanguageStore();
  // 2. 根据状态选字典：t 就代表了当前语言的所有文本
  const t = translations[language].aboutMusic;

  useEffect(() => {
    if (activeSong && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      const timer = setTimeout(() => {
        setIsPlaying(true);
        audioRef.current?.play().catch((e) => console.error(e));
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [activeSong]);

  const togglePlay = () => {
    if (!audioRef.current || !activeSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const ejectRecord = () => {
    setIsPlaying(false);
    setActiveSong(null);
  };

  const checkHit = (point: { x: number; y: number }) => {
    if (!dropZoneRef.current) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const absoluteRect = {
      top: rect.top + scrollY,
      bottom: rect.bottom + scrollY,
      left: rect.left + scrollX,
      right: rect.right + scrollX,
    };
    return (
      point.x >= absoluteRect.left &&
      point.x <= absoluteRect.right &&
      point.y >= absoluteRect.top &&
      point.y <= absoluteRect.bottom
    );
  };

  const handleDrag = (info: PanInfo) => {
    const isHit = checkHit(info.point);
    if (isHit !== isOverDropZone) setIsOverDropZone(isHit);
  };

  const handleDragEnd = (song: Song, info: PanInfo) => {
    setIsOverDropZone(false);
    if (checkHit(info.point)) setActiveSong(song);
  };

  const chunkArray = (array: Song[], size: number) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size)
      chunked.push(array.slice(i, i + size));
    return chunked;
  };

  const songColumns = chunkArray(PLAYLIST.slice(0, 12), 4);

  return (
    <div className="w-full max-w-full overflow-x-hidden mx-auto py-12 px-4 select-none relative z-10 h-screen">
      <audio
        ref={audioRef}
        src={activeSong?.audioSrc}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-row lg:flex-row gap-4 items-center justify-center h-[600px]">
        {/* === 左侧：唱片机 === */}

        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center relative h-full shrink-0 z-40">
          <div
            ref={dropZoneRef}
            className={`relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] transition-all duration-300 rounded-full flex items-center justify-center
                    ${
                      isOverDropZone
                        ? "bg-black/60 scale-105 border-4 border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.5)] z-50"
                        : "bg-transparent"
                    }
                `}
          >
            <div className="absolute inset-4 rounded-full bg-[#111] shadow-2xl border-4 border-zinc-800 flex items-center justify-center overflow-visible">
              {!activeSong && (
                <div className="text-zinc-600 flex flex-col items-center animate-pulse pointer-events-none">
                  <Disc size={48} className="mb-2 opacity-20" />
                  <p className="text-sm font-medium tracking-widest uppercase">
                    {t.remind}
                  </p>
                </div>
              )}
              <AnimatePresence>
                {activeSong && (
                  <motion.div
                    key={activeSong.id}
                    layoutId={`vinyl-${activeSong.id}`}
                    className="absolute inset-2 z-20 cursor-pointer"
                    onClick={togglePlay}
                    animate={{
                      scale: isOverDropZone ? 0.9 : 1,
                      filter: isOverDropZone
                        ? "brightness(0.5)"
                        : "brightness(1)",
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  >
                    <VinylDisc song={activeSong} isSpinning={isPlaying} />
                    {!isPlaying && !isOverDropZone && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-[1px]">
                        <Play className="fill-white text-white w-12 h-12" />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              className="absolute -top-[10%] right-[-10%] w-32 h-48 z-40 pointer-events-none origin-[50%_15%]"
              animate={{ rotate: isPlaying && !isOverDropZone ? 25 : -25 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <Image
                src={DEFAULT_ASSETS.tonearmImage}
                alt="Tonearm"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="mt-8 h-20 text-center">
            <AnimatePresence mode="wait">
              {activeSong ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {activeSong.title}
                  </h2>
                  <p className="text-zinc-400 text-sm mb-4">
                    {activeSong.artist}
                  </p>
                  <button
                    onClick={ejectRecord}
                    className="px-6 py-1.5 text-xs font-bold text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-colors uppercase tracking-wider"
                  >
                    {t.exit}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* === 右侧：三列唱片架 (包含标题) === */}
        {/* ✨ 修改：改为 flex-col，这样标题和唱片架可以垂直排列 */}
        <div className="flex-1 w-full h-full flex flex-col justify-center items-center z-50">
          {/* 🎵 新增标题区域 */}

          <div className="mb-4">
            <GlitchText
              speed={2}
              enableShadows={true}
              enableOnHover={false}
              className="!text-6xl"
            >
              {t.title}
            </GlitchText>
          </div>

          {/* 唱片列容器 */}
          <div className="w-full flex-1 flex items-start justify-around">
            {songColumns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="relative flex flex-col -space-y-20 min-w-[100px] items-center"
              >
                {column.map((song, index) => {
                  if (activeSong?.id === song.id) {
                    return <div key={song.id} className="h-32 w-36" />;
                  }
                  return (
                    <motion.div
                      key={song.id}
                      layoutId={`vinyl-${song.id}`}
                      drag
                      dragSnapToOrigin={true}
                      dragElastic={0}
                      dragMomentum={false}
                      whileDrag={{
                        scale: 1.1,
                        zIndex: 9999,
                        cursor: "grabbing",
                      }}
                      onDrag={(e, info) => handleDrag(info)}
                      onDragEnd={(e, info) => handleDragEnd(song, info)}
                      initial={{ x: 0, scale: 0.85, rotateX: 10, opacity: 0 }}
                      animate={{ x: 0, scale: 0.85, rotateX: 10, opacity: 1 }}
                      whileHover={{
                        x: -40,
                        y: -10,
                        scale: 1,
                        rotateX: 0,
                        zIndex: 100,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      className="relative w-36 h-36 lg:w-40 lg:h-40 cursor-grab active:cursor-grabbing group origin-bottom-left"
                      style={{ zIndex: index, marginLeft: `${index * 12}px` }}
                    >
                      <VinylDisc song={song} isSpinning={false} />
                      <div className="absolute -right-28 top-1/2 -translate-y-1/2 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-start pl-2">
                        <p className="text-white font-bold text-sm lg:text-base drop-shadow-md leading-tight">
                          {song.title}
                        </p>
                        <p className="text-white/60 text-xs font-light drop-shadow-sm mt-0.5">
                          {song.artist}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
