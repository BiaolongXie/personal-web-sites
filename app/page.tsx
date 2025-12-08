import Hero from "@/components/business/Hero";
import Footer from "@/components/business/Footer";

export default function Home() {
  return (
    // ✅ 修改重点：
    // 1. 删掉了 items-center 和 justify-center (不再挤压)
    // 2. 加上了 w-full (强制占满屏幕宽度)
    // 3. 保留 flex-col (保证从上往下排)
    // 4. overflow-x-hidden (防止某些动画导致出现横向滚动条)
    <main className="flex min-h-screen w-full flex-col bg-zinc-950 overflow-x-hidden">
      
      {/* 这里的 section 默认就是 block 元素，会自动占满一行 */}
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        
      </section>

      <section id="tech">
        
      </section>

      <section id="hobby">
        
      </section>

      <section id="project">
        
      </section>

      <section id="game">
        
      </section>

      <section id="footer">
        <Footer />
      </section>
      
    </main>
  );
}