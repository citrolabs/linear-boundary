# Linear Boundary

> 探索 Linear × GitHub Copilot 协作潜力的实验性仓库

---

## 简介

**Linear Boundary** 是一个专注于验证 [Linear](https://linear.app) 项目管理工具与 [GitHub Copilot](https://github.com/features/copilot) AI 编程助手深度集成能力的实验性仓库。

通过本仓库，团队可以：

- 🔗 **打通工作流闭环**：从 Linear Issue 到代码提交、PR 合并，全流程自动化关联
- 🤖 **验证 AI 辅助编码**：使用 GitHub Copilot 加速问题定位、代码实现与测试生成
- 📋 **沉淀最佳实践**：将协作经验整理为可复用的工作流模板

---

## 核心能力

### 🧩 Linear 与 GitHub 双向同步

| 功能 | 说明 |
|------|------|
| Issue → Branch | 分支命名遵循 `feature/CITRO-xxx-description` 格式，自动触发 Linear 状态更新 |
| PR → Issue | Pull Request 合并后，关联的 Linear Issue 自动关闭 |
| Commit 追踪 | Commit Message 中包含 Issue 编号，可在 Linear 时间线中追溯变更 |

### 🤖 GitHub Copilot 辅助能力

| 能力 | 场景 |
|------|------|
| **问题定位** | 将报错日志或异常堆栈发送给 Copilot Chat，快速获取根因分析与修复建议 |
| **代码实现** | 根据 Issue 描述生成函数骨架、业务逻辑及 API Handler |
| **测试生成** | 一键为目标函数生成覆盖正常路径、边界值、异常路径的单元测试 |
| **PR 描述** | 基于 diff 自动生成规范的 Pull Request 摘要 |
| **文档注释** | 为函数、类、模块自动生成 JSDoc / docstring |

---

## 快速上手

### 1. 克隆仓库

```bash
git clone https://github.com/citrolabs/linear-boundary.git
cd linear-boundary
```

### 2. 关联 Linear Issue

创建新分支时，使用包含 Linear Issue 编号的命名格式：

```bash
git checkout -b feature/CITRO-123-your-feature-description
```

### 3. 使用 GitHub Copilot 辅助开发

在 VS Code 中打开 Copilot Chat，结合 Issue 描述获取实现思路：

```
@workspace 请根据以下 Linear Issue 描述，给出实现方案：
[粘贴 Issue 内容]
```

---

## 文档

| 文档 | 说明 |
|------|------|
| [Linear + GitHub Copilot 协作指南](./linear-copilot-guide.md) | 详细介绍典型工作流、实际案例与最佳实践 |

---

## 贡献指南

1. 在 Linear 中创建或认领 Issue
2. 按规范创建特性分支（包含 Issue 编号）
3. 借助 GitHub Copilot 实现功能并生成测试
4. 提交 Pull Request，关联对应的 Linear Issue
5. Code Review 通过后合并，Linear Issue 自动关闭

---

> 本仓库持续迭代中，欢迎通过 Linear Issue 或 GitHub PR 参与贡献。
