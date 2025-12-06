// 这里不需要 "use client" 了！它现在是 Server Component，对 SEO 极好。
import { MyDock } from "@/components/business/MyDock";
import Hero from "@/components/business/Hero";
import LanguageSwitch from "@/components/business/LanguageSwitch";
import Footer from "@/components/business/Footer";
import { Mainlogo } from "@/components/business/Logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <Hero />

      <LanguageSwitch />

      <Mainlogo />

      {/* {
      fixed：表示固定住这个组件，不随着滚动条滚动
      bottom-10：表示距离底部约40px
      left-1/2：表示左边缘排到居中位置
      -translate-x-1/2：把组件拉回自身宽度的一半，实现完美居中
      } */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <MyDock />
      </div> */}



      <Footer />

    </main>
  );
}
