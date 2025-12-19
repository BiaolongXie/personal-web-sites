"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// 定义数据接口
interface Place {
  id: string;
  name: string;
  image: string;
}

// 单个卡片组件
// components/ui/scrolling-gallery.tsx

const PhotoCard = ({ place }: { place: Place }) => {
  return (
    <div className="relative w-[200px] h-[140px] md:w-[280px] md:h-[200px] shrink-0 rounded-xl overflow-hidden mr-6 
      border border-white/10
      transition-all duration-300 ease-out cursor-pointer 
      group
      
      {/* === 默认状态 (未悬停) === */}
      {/* 1. grayscale: 黑白 */}
      {/* 2. brightness-50: 变暗 */}
      {/* 3. opacity-40: 半透明 (代替之前父级的 opacity-60) */}
      grayscale brightness-50 opacity-60

      {/* === 悬停状态 (还原真身) === */}
      {/* 1. scale: 放大 */}
      {/* 2. z-index: 层级置顶 */}
      {/* 3. opacity-100: 完全不透明 */}
      {/* 4. grayscale-0: 恢复彩色 */}
      {/* 5. brightness-100: 恢复原始亮度 (不加不减) */}
      {/* 6. contrast-100: 恢复原始对比度 (不加不减) */}
      hover:scale-110 hover:z-50 
      hover:opacity-100
      hover:grayscale-0 hover:brightness-100 hover:contrast-100
      
      hover:border-white/50
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <Image
        src={place.image}
        alt={place.name}
        fill
        className="object-cover"
      />
      
      {/* 渐变遮罩：悬停时稍微淡一点，让图片更清晰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 transition-all duration-500 group-hover:from-black/40">
        <span className="text-white font-bold text-sm md:text-lg tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
          {place.name}
        </span>
      </div>
    </div>
  );
};

// 单行滚动组件
const MarqueeRow = ({
  items,
  direction = "left",
  speed = 20,
}: {
  items: Place[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    // ✨ 修改 1: 增加 vertical padding (py-8 或 py-12)
    // 这里的 py-12 给了上下足够的“隐形空间”，让卡片放大时不会碰到边界
    // overflow-x-hidden 保证横向不溢出，但利用 padding 避免纵向裁剪
    <div className="flex relative w-full select-none overflow-x-hidden py-12 pointer-events-none">
      
      {/* 内部容器开启 pointer-events-auto，让卡片可以交互 */}
      <motion.div
        className="flex pointer-events-auto"
        animate={{
          x: direction === "left" ? "-50%" : "0%",
        }}
        initial={{
          x: direction === "left" ? "0%" : "-50%",
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <PhotoCard key={`${item.id}-${idx}`} place={item} />
        ))}
      </motion.div>
    </div>
  );
};

export const ScrollingGallery = ({ items }: { items: Place[] }) => {
  return (
    // ✨ 修改 2: 使用负间距 (-space-y) 或负 margin
    // 因为 MarqueeRow 加了 py-12 (上下各48px)，行距变得很大
    // 这里用 flex-col 和 -mt-20 (负margin) 把它们强行拉近，抵消掉 padding
    // 这里的 opacity-60 是整体透明度，可以根据需要调整
    <div className="flex flex-col w-full -space-y-8 md:-space-y-16">
      
      <MarqueeRow items={items} direction="left" speed={40} />
      
      <MarqueeRow items={items.slice().reverse()} direction="right" speed={35} />
      
      <MarqueeRow items={items} direction="left" speed={30} />
      
    </div>
  );
};