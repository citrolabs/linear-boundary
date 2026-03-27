import { motion } from 'framer-motion';
import { FadeIn } from './components/FadeIn';
import { Terminal } from './components/Terminal';
import { Workflow } from './components/Workflow';
import { IssueCard } from './components/IssueCard';
import { TypingText } from './components/TypingText';

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_SUBTITLES = [
  '用自然语言创建任务',
  '智能分配任务与上下文',
  '在你休息时自动创建 PR',
  '让 AI 驱动每一步，更快发布',
];

const TERMINAL_ISSUE = [
  { type: 'comment' as const, text: 'linear-boundary 工作区', delay: 300 },
  { type: 'prompt' as const, text: 'linear issue create', delay: 600 },
  { type: 'ai' as const, text: '描述你想要构建的内容……', delay: 400 },
  { type: 'output' as const, text: '"为仪表板添加深色模式支持"', delay: 600 },
  { type: 'ai' as const, text: '正在分析代码库上下文……', delay: 800 },
  { type: 'ai' as const, text: '找到 12 个相关文件 · 优先级：中等', delay: 500 },
  { type: 'success' as const, text: '任务 CITRO-847 已创建', delay: 400 },
  { type: 'success' as const, text: '已生成子任务：4 项', delay: 300 },
  { type: 'success' as const, text: '已分配至：Team AI · Sprint 23', delay: 300 },
];

const TERMINAL_AGENT = [
  { type: 'comment' as const, text: '后台代理 — CITRO-831', delay: 300 },
  { type: 'ai' as const, text: '正在读取任务上下文……', delay: 700 },
  { type: 'ai' as const, text: '正在克隆仓库并安装依赖……', delay: 600 },
  { type: 'prompt' as const, text: 'git checkout -b feat/CITRO-831-auth-flow', delay: 500 },
  { type: 'ai' as const, text: '正在实现 OAuth2 登录流程……', delay: 1200 },
  { type: 'ai' as const, text: '正在编写单元测试（覆盖率：94%）……', delay: 900 },
  { type: 'prompt' as const, text: 'git push origin feat/CITRO-831-auth-flow', delay: 500 },
  { type: 'success' as const, text: 'PR #142 已创建 · 等待代码审查', delay: 400 },
  { type: 'success' as const, text: '任务 CITRO-831 → 审查中', delay: 300 },
];

const WORKFLOW_STEPS = [
  {
    icon: '💬',
    label: '用自然语言描述',
    description: '输入你的需求，中英文均可——Linear AI 理解你的意图。',
    color: 'bg-violet-500/20',
  },
  {
    icon: '🧠',
    label: 'AI 完善任务内容',
    description: '自动生成上下文、优先级、负责人和子任务。',
    color: 'bg-blue-500/20',
  },
  {
    icon: '🤖',
    label: '后台代理自动接手',
    description: '自主代理读取任务、编写代码并创建 PR。',
    color: 'bg-indigo-500/20',
  },
  {
    icon: '✅',
    label: '审查并合并',
    description: '你审查差异、批准后，任务自动关闭。',
    color: 'bg-emerald-500/20',
  },
];

const ISSUES_SPRINT = [
  { id: 'CITRO-851', title: '实现 AI 驱动的搜索自动补全', status: 'done' as const, priority: 'high' as const, assignee: 'AI', label: 'feat', aiGenerated: true },
  { id: 'CITRO-852', title: '重构身份验证中间件', status: 'done' as const, priority: 'high' as const, assignee: 'Alex', label: 'refactor' },
  { id: 'CITRO-853', title: '添加实时协作光标同步', status: 'in-progress' as const, priority: 'urgent' as const, assignee: 'AI', label: 'feat', aiGenerated: true },
  { id: 'CITRO-854', title: '修复事件监听器清理中的内存泄漏', status: 'in-progress' as const, priority: 'high' as const, assignee: 'Sam', label: 'bug' },
  { id: 'CITRO-855', title: '从类型定义生成 API 文档', status: 'todo' as const, priority: 'medium' as const, assignee: 'AI', label: 'docs', aiGenerated: true },
  { id: 'CITRO-856', title: '使用 Tree Shaking 优化打包体积', status: 'todo' as const, priority: 'medium' as const, assignee: 'Jordan', label: 'perf' },
];

const FEATURES = [
  {
    icon: '✦',
    title: '任务智能化',
    description:
      '粘贴 Slack 消息、Bug 报告或模糊想法，Linear AI 将其转化为带有上下文、优先级和分配信息的结构化任务。',
    color: 'from-violet-500/10 to-violet-500/0',
    borderColor: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: '⚡',
    title: '即时迭代规划',
    description:
      'AI 根据团队历史交付规律估算速率、推荐待办事项并自动安排迭代计划。',
    color: 'from-blue-500/10 to-blue-500/0',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: '🔁',
    title: '后台代理',
    description:
      '自主代理在后台运行，接手任务、编写代码并创建 PR，让你专注于高价值决策。',
    color: 'from-indigo-500/10 to-indigo-500/0',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: '📊',
    title: '项目洞察',
    description:
      '提问"我们为何错过截止日期？"或"哪位工程师超负荷？"，获得诚实的数据驱动分析。',
    color: 'from-cyan-500/10 to-cyan-500/0',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
];

// ─── Background grid ──────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a78bfa 1px, transparent 1px),
            linear-gradient(to bottom, #a78bfa 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
      {/* Ambient glow orbs */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[100px]" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/4 blur-[80px]" />
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 md:px-12 lg:px-24 ${className}`}>
      {children}
    </section>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-slate-300 overflow-x-hidden">
      <GridBackground />

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-24 py-5 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">Linear Boundary</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
          <a href="#features" className="hover:text-white transition-colors">功能特性</a>
          <a href="#workflow" className="hover:text-white transition-colors">工作流程</a>
          <a href="#sprint" className="hover:text-white transition-colors">迭代看板</a>
          <a
            href="https://linear.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.10] transition-all text-xs"
          >
            打开 Linear ↗
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <Section className="pt-24 pb-20 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Linear × AI — 自动驾驶工作流
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto">
            更快发布，借助{' '}
            <span className="gradient-text">AI 驱动每一步</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            从模糊想法到合并 PR——Linear AI 处理规划、上下文和执行，
            让你的团队专注于真正重要的事。
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="text-slate-500 text-sm font-mono h-6">
            <TypingText lines={HERO_SUBTITLES} speed={45} />
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <a
              href="https://linear.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
            >
              立即开始使用 Linear
            </a>
            <a
              href="#workflow"
              className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.10] font-medium text-sm transition-all duration-200"
            >
              查看工作原理 ↓
            </a>
          </div>
        </FadeIn>
      </Section>

      <Divider />

      {/* ── Features ── */}
      <Section id="features" className="py-24">
        <FadeIn className="text-center mb-16">
          <div className="text-xs font-mono text-violet-400 mb-3 tracking-widest uppercase">核心能力</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            AI 融入你的每个工作环节
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            不是附加的聊天机器人——智能融入团队规划、开发和发布的每一个步骤。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {FEATURES.map((f, i) => (
            <FadeIn key={i} delay={i * 0.08} direction="up">
              <div className={`h-full p-5 rounded-xl bg-gradient-to-b ${f.color} border ${f.borderColor} transition-all duration-300 hover:border-white/20 group`}>
                <div className={`text-2xl mb-3 ${f.iconColor}`}>{f.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Terminal demos ── */}
      <Section className="py-24">
        <FadeIn className="text-center mb-16">
          <div className="text-xs font-mono text-blue-400 mb-3 tracking-widest uppercase">实时演示</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            实时观看 AI 工作
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            这些动画演示展示了 Linear AI 处理团队任务时的真实交互过程。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div>
              <div className="text-xs font-mono text-violet-400 mb-3 uppercase tracking-widest">
                ✦ 创建任务
              </div>
              <Terminal title="linear — 创建任务" lines={TERMINAL_ISSUE} />
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                用自然语言描述，AI 在秒内生成结构化任务、子任务和分配信息。
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div className="text-xs font-mono text-blue-400 mb-3 uppercase tracking-widest">
                ⚡ 后台代理
              </div>
              <Terminal title="agent — feat/CITRO-831" lines={TERMINAL_AGENT} />
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                自主代理接手任务、在完整上下文中编写代码，并在团队离线时创建 PR。
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Divider />

      {/* ── Workflow ── */}
      <Section id="workflow" className="py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="text-xs font-mono text-emerald-400 mb-3 tracking-widest uppercase">
              端到端流程
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              从想法到合并 PR，<br />
              <span className="gradient-text">全程自动化</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              从想法到发布功能的传统流程包含数十个手动步骤。Linear AI 将这一切压缩为一次对话。
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>✓</span>
                <span>平均交付速度提升 4 倍</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <Workflow steps={WORKFLOW_STEPS} />
          </FadeIn>
        </div>
      </Section>

      <Divider />

      {/* ── Sprint board ── */}
      <Section id="sprint" className="py-24">
        <FadeIn className="text-center mb-12">
          <div className="text-xs font-mono text-indigo-400 mb-3 tracking-widest uppercase">迭代看板</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            AI 辅助迭代，实时进行
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            标有 <span className="text-violet-400 font-mono text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">AI</span> 标记的任务由
            Linear AI 代理创建、估算并部分实现。
          </p>
        </FadeIn>

        <div className="max-w-2xl mx-auto space-y-1.5">
          {/* Sprint header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-600 font-mono border-b border-white/[0.05] mb-3"
          >
            <span>Sprint 23 · 12月11日 – 12月24日</span>
            <span className="text-violet-400">6 个任务 · 34 分</span>
          </motion.div>

          {ISSUES_SPRINT.map((issue, i) => (
            <IssueCard key={issue.id} {...issue} delay={i * 0.07} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── CTA ── */}
      <Section className="py-24 text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-6">✦</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              自动驾驶代码库<br />
              从一个任务开始
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Linear AI 不会取代你的工程团队——而是为他们赋能。
              减少协调开销，将更多时间用于构建真正重要的内容。
            </p>
            <a
              href="https://linear.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-medium transition-all duration-200 shadow-xl shadow-violet-500/20"
            >
              开始使用 Linear AI 构建
              <span>→</span>
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-white/[0.05] px-6 md:px-12 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">L</span>
            </div>
            <span>Linear Boundary</span>
          </div>
          <p>专为探索 Linear 的 AI 能力而构建 · {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <a href="https://linear.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">
              Linear ↗
            </a>
            <a href="https://github.com/citrolabs/linear-boundary" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
