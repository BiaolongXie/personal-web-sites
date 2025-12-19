"use client";
import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function Globe() {
    const globeConfig = {
        pointSize: 3, 
        // 1. 底色稍微提亮一点点，不要纯黑，这样能接受更多反光
        globeColor: "#080808", 
        showAtmosphere: true,
        // 2. 大气层改成纯白，光晕更明显
        atmosphereColor: "#ffffff", 
        atmosphereAltitude: 0.15,
        // 3. 发光颜色稍微浅一点（灰色），让整体暗部有细节
        emissive: "#222222", 
        // 4. ✨ 关键：提高发光强度 (0.2 -> 0.6)，这是变亮的核心
        emissiveIntensity: 0.6, 
        shininess: 0.5,
        // 5. ✨ 关键：增加陆地不透明度 (0.6 -> 0.85)，让白色更实、更亮
        polygonColor: "rgba(255, 255, 255, 0.85)", 
        ambientLight: "#ffffff",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 28.2282, lng: 112.9388 },
        autoRotate: true,
        autoRotateSpeed: 0.3,
    };
  //   const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const colors = ["#ffffff", "#e5e5e5", "#a3a3a3"];
  const sampleArcs = [
    // 1. 湖南长沙 -> 澳大利亚悉尼 (跨半球长途，飞得高)
    {
      order: 1,
      startLat: 28.2282,
      startLng: 112.9388,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.4, 
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // 2. 澳大利亚悉尼 -> 新西兰奥克兰 (南半球短途)
    {
      order: 2,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: -36.8485,
      endLng: 174.7633,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // 3. 湖南长沙 -> 上海 (国内向东飞)
    {
      order: 3,
      startLat: 28.2282,
      startLng: 112.9388,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // 4. 上海 -> 日本东京 (跨海向东飞)
    {
      order: 4,
      startLat: 31.2304,
      startLng: 121.4737,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // 5. 🆕 湖南长沙 -> 海南三亚 (国内向南飞，度假路线)
    {
      order: 5,
      startLat: 28.2282,
      startLng: 112.9388,
      endLat: 18.2528, 
      endLng: 109.5120,
      arcAlt: 0.25, // 中长距离，高度适中
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen relative w-full">
      <div className="max-w-7xl mx-auto w-full relative px-4">
        {/* 关键修改：把高度写死在包围 World 的这一层 */}
        {/* 增加高度到 600px+ (h-[600px])，给飞线留出起飞的空间 */}
        <div className="w-full h-[800px] z-20 relative">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
