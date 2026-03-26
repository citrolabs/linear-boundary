# Linear + GitHub Copilot 协作指南

本文档介绍如何借助 GitHub Copilot 在代码仓库中定位问题、理解上下文、生成修复思路或辅助实现，并结合 Linear 项目管理工作流沉淀最佳实践。

---

## 目录

- [概述](#概述)
- [Linear 与 GitHub Copilot 的结合能做什么](#linear-与-github-copilot-的结合能做什么)
- [典型工作流](#典型工作流)
- [实际案例](#实际案例)
- [最佳实践](#最佳实践)

---

## 概述

[Linear](https://linear.app) 是一款以速度和简洁著称的工程项目管理工具，支持 Issue 追踪、Sprint 规划、Roadmap 视图等功能。

[GitHub Copilot](https://github.com/features/copilot) 是 GitHub 推出的 AI 编程助手，能够在 IDE 中提供代码补全、代码解释、测试生成、错误修复等能力。

将两者结合，可以构建出从 **需求→任务→代码→PR→合并** 的完整闭环，大幅提升工程团队的交付效率。

---

## Linear 与 GitHub Copilot 的结合能做什么

### 1. 问题定位与上下文理解

| 能力 | 说明 |
|------|------|
| **Issue 关联代码** | 在 Linear Issue 中粘贴相关代码片段或文件路径，Copilot 可基于上下文快速定位根因 |
| **错误日志分析** | 将报错信息或堆栈跟踪发送给 Copilot Chat，获取可能的原因和修复建议 |
| **代码解释** | 对陌生模块或历史遗留代码，使用 Copilot 的"解释代码"功能快速建立理解 |

### 2. 修复思路生成

| 能力 | 说明 |
|------|------|
| **修复方案建议** | 描述 Bug 现象后，Copilot 给出一至多种修复方案供选择 |
| **重构建议** | 对技术债或代码坏味道，Copilot 可提供更现代、更简洁的替代写法 |
| **安全漏洞修复** | Copilot 能识别常见的 SQL 注入、XSS 等安全问题并给出补丁建议 |

### 3. 代码实现辅助

| 能力 | 说明 |
|------|------|
| **代码补全** | 在编写业务逻辑时实时补全函数体、循环、条件分支等 |
| **单元测试生成** | 选中目标函数，一键生成对应的单元测试用例 |
| **API 接口实现** | 根据接口注释或 Linear Issue 描述自动生成 Controller / Handler 骨架 |
| **文档注释生成** | 为函数、类或模块自动生成 JSDoc / docstring 等文档注释 |

### 4. PR 与代码审查

| 能力 | 说明 |
|------|------|
| **PR 描述生成** | Copilot 可根据 diff 自动生成 PR 摘要，节省撰写时间 |
| **Review 辅助** | 在 Code Review 中，Copilot 可解释复杂逻辑、指出潜在风险 |
| **Commit Message** | 基于变更内容生成符合规范的 Commit Message |

### 5. 项目管理与文档

| 能力 | 说明 |
|------|------|
| **Issue 拆解** | 将大型需求（Epic）拆解为可执行的子 Issue，Copilot 可辅助评估工作量 |
| **技术方案文档** | 根据需求描述自动生成 RFC / 设计文档草稿 |
| **变更日志生成** | 汇总多个 PR / Issue，自动输出 Release Notes |

---

## 典型工作流

```
Linear Issue 创建
       │
       ▼
在 Copilot Chat 中粘贴 Issue 描述
→ 获取实现思路 / 代码骨架
       │
       ▼
在 IDE 中借助 Copilot 补全实现
→ 生成单元测试
       │
       ▼
提交 PR（Copilot 辅助生成描述）
→ Linear Issue 自动关联 PR
       │
       ▼
Code Review（Copilot 辅助解释逻辑）
→ 合并后 Linear Issue 自动关闭
```

---

## 实际案例

### 案例 1：快速定位前端渲染 Bug

**背景**：Linear Issue 描述"列表页在数据为空时白屏"。

**操作步骤**：
1. 在 Copilot Chat 输入：`以下组件在 data 为空数组时会白屏，请分析原因并给出修复方案`，粘贴组件代码。
2. Copilot 指出 `.map()` 前缺少空数组守卫，并提供修复代码。
3. 应用修复，本地验证，提交 PR，关联 Linear Issue。

**效果**：从问题定位到修复提交，全程 < 10 分钟。

---

### 案例 2：为遗留模块补充单元测试

**背景**：Linear Issue 要求为核心计算模块补充测试覆盖。

**操作步骤**：
1. 在 VS Code 中选中目标函数，使用 `/tests` 命令请求 Copilot 生成测试。
2. Copilot 生成覆盖正常路径、边界值、异常路径的测试用例。
3. 微调后提交，Linear Issue 进入"In Review"状态。

**效果**：测试覆盖率从 42% 提升至 78%，耗时约 30 分钟。

---

### 案例 3：API 接口快速实现

**背景**：Linear Issue 定义了新的 REST API 规范（字段、状态码、错误格式）。

**操作步骤**：
1. 将 API 规范粘贴到 Copilot Chat，要求生成 Express.js Handler 骨架。
2. Copilot 输出包含参数校验、错误处理、响应格式的完整骨架。
3. 补充业务逻辑后提交 PR。

**效果**：骨架代码生成时间 < 2 分钟，开发者聚焦于业务逻辑而非样板代码。

---

## 最佳实践

1. **在 Linear Issue 中提供足够上下文**  
   描述清楚"期望行为"与"实际行为"，方便 Copilot 准确理解问题。

2. **使用 Copilot Chat 而非纯补全**  
   对于理解型、分析型任务，使用 `@workspace` 或 `#file` 引用，让 Copilot 获取完整仓库上下文。

3. **验证 Copilot 的建议**  
   AI 生成的代码可能包含错误，务必在本地运行测试后再合并。

4. **将分支名与 Linear Issue 关联**  
   命名格式 `feature/CITRO-123-brief-description` 可自动触发 Linear 与 GitHub 的双向同步。

5. **复用 Prompt 模板**  
   将常用的 Copilot Chat Prompt（如"分析 Bug"、"生成测试"）整理为团队共享模板，提升协作一致性。

---

> 本文档基于 Linear Boundary 仓库实践整理，持续更新。  
> 如有补充，欢迎提交 PR 或在 Linear 中创建 Issue。
