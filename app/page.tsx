// 这里不需要 "use client" 了！它现在是 Server Component，对 SEO 极好。
import { MyDock } from "@/components/business/MyDock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <h1 className="text-5xl font-bold text-white mb-4">Hello World</h1>
      <p className="text-xl text-gray-400 mb-10">
        这是我的炫酷个人网站开发起点
      </p>

      {/* 实例化你的组件：就像调用对象一样简单 */}
      <MyDock />
      
    </main>
  );
}