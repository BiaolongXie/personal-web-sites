// src/lib/i18n.ts
// 通过 zustand 库来管理页面显示语言转换功能
// 定义字典结构
export const translations = {
    en: {
      hero: {
        greeting: "Hello, I'm",
        name: "KyleJ",
        description: "A CS developer pursuing perfection.",
        introduce:"At the same time, I'm a:",
        identity1: "XJTLU Student",
        identity2: "Game Developer",
        identity3: "Computer Science Student",
        identity4: "Deep Learning Developer",
        identity5: "Novice video blogger",
        motto: "TODO: Change the world!"
      },
      dock: {
        github: "My Code",
        bilibili: "My Videos"
      },
      footer:{
        description: "Love learning, enjoy sharing, and enjoy creating",
      }
    },
    zh: {
      hero: {
        greeting: "你好，我是",
        name: "凯杰童",
        description: "一个追求极致的CS开发者",
        introduce: "同时 我是一个:",
        identity1: "西交利物浦大学学生",
        identity2: "游戏开发者",
        identity3: "计算机专业学生",
        identity4: "深度学习开发者",
        identity5: "新人视频博主",
        motto: "TODO: Turning coffee into code!"
      },
      dock: {
        github: "我的代码",
        bilibili: "我的视频"
      },
      footer:{
        description: "热爱学习，喜欢分享，享受创造"
      }
    }
  };
  
  // 定义类型，防止写错单词
  export type Language = "en" | "zh";