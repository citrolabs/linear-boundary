# Linear Boundary

用于测试 Linear 的各种功能

## 项目简介

这是一个 React 应用，通过文字与动画演示 Linear 中的 AI 用法，包括：

- **Issue 智能创建** — 用自然语言描述需求，AI 自动生成结构化 Issue
- **后台 Agent** — 自主 Agent 读取 Issue、编写代码并提交 PR
- **Sprint 智能规划** — AI 估算速率、推荐 Backlog 并自动排期
- **项目洞察** — 用自然语言查询项目进展和团队状态

动画风格参考 [background-agents.com](https://background-agents.com/)：深色主题、终端动画、流程可视化。

## 技术栈

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) — 构建工具
- [Tailwind CSS v4](https://tailwindcss.com/) — 样式
- [Framer Motion](https://www.framer.com/motion/) — 动画

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173) 查看效果。

## 构建

```bash
npm run build
npm run preview
```

## 文档

- [Ask Linear 使用指南](docs/ask-linear-guide.md) — Ask Linear 高频使用场景、操作说明与示例
- [Linear + GitHub Copilot 协作指南](linear-copilot-guide.md)
