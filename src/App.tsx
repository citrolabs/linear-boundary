import { motion } from 'framer-motion';
import { FadeIn } from './components/FadeIn';
import { Terminal } from './components/Terminal';
import { Workflow } from './components/Workflow';
import { IssueCard } from './components/IssueCard';
import { TypingText } from './components/TypingText';

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_SUBTITLES = [
  'Create issues from natural language',
  'Auto-assign tasks with context',
  'Draft PRs while you sleep',
  'Ship faster with AI at every step',
];

const TERMINAL_ISSUE = [
  { type: 'comment' as const, text: 'linear-boundary workspace', delay: 300 },
  { type: 'prompt' as const, text: 'linear issue create', delay: 600 },
  { type: 'ai' as const, text: 'Describe what you want to build...', delay: 400 },
  { type: 'output' as const, text: '"Add dark mode support to dashboard"', delay: 600 },
  { type: 'ai' as const, text: 'Analyzing codebase context...', delay: 800 },
  { type: 'ai' as const, text: 'Found 12 related files · Priority: Medium', delay: 500 },
  { type: 'success' as const, text: 'Issue CITRO-847 created', delay: 400 },
  { type: 'success' as const, text: 'Sub-issues generated: 4 tasks', delay: 300 },
  { type: 'success' as const, text: 'Assigned to: Team AI · Sprint 23', delay: 300 },
];

const TERMINAL_AGENT = [
  { type: 'comment' as const, text: 'Background agent — CITRO-831', delay: 300 },
  { type: 'ai' as const, text: 'Reading issue context...', delay: 700 },
  { type: 'ai' as const, text: 'Cloning repo & installing deps...', delay: 600 },
  { type: 'prompt' as const, text: 'git checkout -b feat/CITRO-831-auth-flow', delay: 500 },
  { type: 'ai' as const, text: 'Implementing OAuth2 login flow...', delay: 1200 },
  { type: 'ai' as const, text: 'Writing unit tests (coverage: 94%)...', delay: 900 },
  { type: 'prompt' as const, text: 'git push origin feat/CITRO-831-auth-flow', delay: 500 },
  { type: 'success' as const, text: 'PR #142 opened · Ready for review', delay: 400 },
  { type: 'success' as const, text: 'Issue CITRO-831 → In Review', delay: 300 },
];

const WORKFLOW_STEPS = [
  {
    icon: '💬',
    label: 'Describe in natural language',
    description: 'Type what you need in plain Chinese or English — Linear AI understands intent.',
    color: 'bg-violet-500/20',
  },
  {
    icon: '🧠',
    label: 'AI enriches the issue',
    description: 'Context, priority, assignee, and sub-tasks are generated automatically.',
    color: 'bg-blue-500/20',
  },
  {
    icon: '🤖',
    label: 'Background agent picks it up',
    description: 'An autonomous agent reads the issue, writes code, and opens a PR.',
    color: 'bg-indigo-500/20',
  },
  {
    icon: '✅',
    label: 'Review & merge',
    description: 'You review the diff, approve, and the issue closes automatically.',
    color: 'bg-emerald-500/20',
  },
];

const ISSUES_SPRINT = [
  { id: 'CITRO-851', title: 'Implement AI-powered search autocomplete', status: 'done' as const, priority: 'high' as const, assignee: 'AI', label: 'feat', aiGenerated: true },
  { id: 'CITRO-852', title: 'Refactor authentication middleware', status: 'done' as const, priority: 'high' as const, assignee: 'Alex', label: 'refactor' },
  { id: 'CITRO-853', title: 'Add real-time collaboration cursor sync', status: 'in-progress' as const, priority: 'urgent' as const, assignee: 'AI', label: 'feat', aiGenerated: true },
  { id: 'CITRO-854', title: 'Fix memory leak in event listener cleanup', status: 'in-progress' as const, priority: 'high' as const, assignee: 'Sam', label: 'bug' },
  { id: 'CITRO-855', title: 'Generate API documentation from types', status: 'todo' as const, priority: 'medium' as const, assignee: 'AI', label: 'docs', aiGenerated: true },
  { id: 'CITRO-856', title: 'Optimize bundle size with tree shaking', status: 'todo' as const, priority: 'medium' as const, assignee: 'Jordan', label: 'perf' },
];

const FEATURES = [
  {
    icon: '✦',
    title: 'Issue Intelligence',
    description:
      'Paste a Slack message, a bug report, or a vague idea. Linear AI breaks it into structured issues with context, priority, and assignments.',
    color: 'from-violet-500/10 to-violet-500/0',
    borderColor: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: '⚡',
    title: 'Instant Sprint Planning',
    description:
      'AI estimates velocity, suggests backlog items, and auto-schedules sprints based on your team\'s historical delivery patterns.',
    color: 'from-blue-500/10 to-blue-500/0',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: '🔁',
    title: 'Background Agents',
    description:
      'Autonomous agents run in the background, picking up issues, writing code, and opening PRs while you focus on high-leverage decisions.',
    color: 'from-indigo-500/10 to-indigo-500/0',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: '📊',
    title: 'Project Insights',
    description:
      'Ask questions like "Why did we miss the deadline?" or "Which engineer is overloaded?" and get honest, data-driven answers.',
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
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
          <a href="#sprint" className="hover:text-white transition-colors">Sprint</a>
          <a
            href="https://linear.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.10] transition-all text-xs"
          >
            Open Linear ↗
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <Section className="pt-24 pb-20 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Linear × AI — The Self-Driving Workflow
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto">
            Ship faster with{' '}
            <span className="gradient-text">AI at every step</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            From vague idea to merged PR — Linear AI handles the planning,
            context, and execution so your team can focus on what matters.
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
              Get started with Linear
            </a>
            <a
              href="#workflow"
              className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.10] font-medium text-sm transition-all duration-200"
            >
              See how it works ↓
            </a>
          </div>
        </FadeIn>
      </Section>

      <Divider />

      {/* ── Features ── */}
      <Section id="features" className="py-24">
        <FadeIn className="text-center mb-16">
          <div className="text-xs font-mono text-violet-400 mb-3 tracking-widest uppercase">Capabilities</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            AI woven into your workflow
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Not a chatbot bolted on the side — intelligence built into every step
            of how your team plans, builds, and ships.
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
          <div className="text-xs font-mono text-blue-400 mb-3 tracking-widest uppercase">Live demos</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Watch AI work in real time
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            These animated sequences show the actual interactions that happen
            when Linear AI processes your team's issues.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div>
              <div className="text-xs font-mono text-violet-400 mb-3 uppercase tracking-widest">
                ✦ Issue Creation
              </div>
              <Terminal title="linear — create issue" lines={TERMINAL_ISSUE} />
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Describe in plain language. AI generates structured issues, 
                sub-tasks, and assignments in seconds.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div className="text-xs font-mono text-blue-400 mb-3 uppercase tracking-widest">
                ⚡ Background Agent
              </div>
              <Terminal title="agent — feat/CITRO-831" lines={TERMINAL_AGENT} />
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Autonomous agents pick up issues, write code with full context,
                and open PRs while your team is offline.
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
              End-to-end flow
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              From idea to merged PR,<br />
              <span className="gradient-text">fully automated</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              The traditional path from idea to shipped feature involves dozens
              of manual steps. Linear AI compresses this into a conversation.
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>✓</span>
                <span>Average: 4× faster delivery</span>
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
          <div className="text-xs font-mono text-indigo-400 mb-3 tracking-widest uppercase">Sprint Board</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            AI-assisted sprint, in action
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Issues marked <span className="text-violet-400 font-mono text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">AI</span> were
            created, estimated, and partially implemented by Linear AI agents.
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
            <span>Sprint 23 · Dec 11 – Dec 24</span>
            <span className="text-violet-400">6 issues · 34 pts</span>
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
              The self-driving codebase<br />
              starts with one issue
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Linear AI doesn't replace your engineering team — it amplifies them.
              Less coordination overhead, more time building what matters.
            </p>
            <a
              href="https://linear.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-medium transition-all duration-200 shadow-xl shadow-violet-500/20"
            >
              Start building with Linear AI
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
          <p>Built to explore Linear's AI capabilities · {new Date().getFullYear()}</p>
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
