# My Portfolio

一个基于 Next.js 构建的个人作品集网站，用于展示个人介绍、技术兴趣、旅行足迹与音乐偏好。项目强调沉浸式视觉表现和可交互体验，包含 3D 卡片、动态地球、滚动照片墙、黑胶唱片播放器以及中英文切换等模块。

## 项目亮点

- **沉浸式首页**：使用 3D 卡片、聚光灯背景、动态文字和头像动效构建首屏介绍。
- **多语言支持**：通过 Zustand 管理语言状态，支持英文与中文文案切换。
- **旅行足迹展示**：结合 Three.js / three-globe 与城市照片墙，展示个人足迹。
- **音乐交互体验**：提供可拖拽的黑胶唱片播放器，支持唱片拖放、播放、暂停和弹出。
- **现代前端技术栈**：使用 Next.js App Router、React、TypeScript、Tailwind CSS、Motion / GSAP 等工具。
- **组件化结构**：业务组件与通用 UI 组件拆分，便于后续扩展作品、技能、项目和游戏模块。

## 技术栈

| 类型 | 技术 |
| --- | --- |
| 框架 | Next.js 16, React 19 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 动画 | Motion, GSAP |
| 3D / 可视化 | Three.js, @react-three/fiber, @react-three/drei, three-globe |
| 状态管理 | Zustand |
| 图标 | lucide-react, @tabler/icons-react, react-icons |
| 工程化 | ESLint, Prettier |

## 功能模块

### Hero

首页首屏个人介绍区域，包含：

- 个人身份标签
- 加密文字效果
- 3D 悬浮卡片
- 头像动效
- 页面锚点跳转入口

### About

关于页面的聚合区域，目前包含旅行足迹和音乐播放器两个核心交互模块。

### Footprint

旅行足迹模块，包含：

- 3D 地球展示
- 城市图片滚动墙
- 动态标题文字
- 城市足迹数据配置

### Music Player

黑胶唱片播放器，包含：

- 唱片拖拽
- 拖放到唱盘后播放音乐
- 播放 / 暂停
- 弹出当前唱片
- 唱片封面与音频资源联动

### Internationalization

语言切换能力由 `lib/i18n.ts` 和 `store/useLanguageStore.ts` 提供，组件通过当前语言状态读取对应文案。

## 目录结构

```text
my-portfolio/
├── app/                    # Next.js App Router 入口、全局样式与页面布局
├── components/
│   ├── business/           # 页面业务组件
│   └── ui/                 # 可复用 UI / 动效组件
├── data/                   # 静态数据，例如地球路径数据
├── lib/                    # 工具函数与国际化配置
├── public/
│   ├── audio/              # 音乐播放器音频资源
│   └── image/              # 头像、城市、音乐封面等图片资源
├── store/                  # Zustand 状态管理
├── package.json            # 项目脚本与依赖
└── README.md
```

## 本地开发

### 环境要求

建议使用以下环境：

- Node.js 20 LTS 或更高版本
- npm 10 或更高版本

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问：

```text
http://localhost:3000
```

### 生产构建

```bash
npm run build
```

### 启动生产服务

```bash
npm run start
```

### 代码检查

```bash
npm run lint
```

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产环境服务 |
| `npm run lint` | 运行 ESLint 代码检查 |

## 内容维护指南

### 修改个人介绍

主要文案位于：

```text
lib/i18n.ts
```

可以在 `translations.en` 和 `translations.zh` 中分别维护英文与中文内容。

### 修改旅行城市

城市展示数据位于：

```text
components/business/FootPrint.tsx
```

新增城市图片时，请将资源放入：

```text
public/image/city/
```

### 修改音乐列表

音乐列表位于：

```text
components/ui/record-player.tsx
```

新增音乐时，需要同时准备：

- 音频文件：`public/audio/`
- 封面图片：`public/image/music/cover/`
- `PLAYLIST` 中对应的 `title`、`artist`、`coverUrl` 和 `audioSrc`

### 修改全局页面结构

首页结构位于：

```text
app/page.tsx
```

当前已经预留以下页面分区：

- `home`
- `about`
- `tech`
- `hobby`
- `project`
- `game`
- `footer`

后续可以逐步补充技术栈、项目展示、兴趣爱好和小游戏模块。

## 部署

该项目可以部署到 Vercel、Netlify 或其他支持 Next.js 的平台。

以 Vercel 为例：

1. 将项目推送到 GitHub / GitLab / Bitbucket。
2. 在 Vercel 中导入仓库。
3. 保持默认 Next.js 构建配置。
4. 部署完成后绑定自定义域名。

默认构建命令：

```bash
npm run build
```

默认输出由 Next.js 自动处理，无需手动配置静态目录。

## 开发规范建议

- 业务组件放在 `components/business/`。
- 通用动效、基础 UI、可复用展示组件放在 `components/ui/`。
- 静态资源统一放在 `public/` 下，并使用清晰的分类目录。
- 多语言文案统一维护在 `lib/i18n.ts`，避免散落在组件中。
- 新增交互模块时优先拆成独立组件，避免让 `app/page.tsx` 变得臃肿。
- 提交前建议运行 `npm run lint` 和 `npm run build`。

## 后续规划

- 完善技术栈展示模块。
- 增加项目作品详情模块。
- 增加兴趣爱好展示模块。
- 增加游戏或互动实验区。
- 优化移动端黑胶播放器布局。
- 补充更完整的 SEO metadata。

## 许可证

当前项目未声明开源许可证。如计划公开发布或允许他人复用代码，建议补充 `LICENSE` 文件并在此处说明授权方式。
