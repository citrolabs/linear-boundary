import { motion } from 'framer-motion';

interface IssueCardProps {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee?: string;
  label?: string;
  aiGenerated?: boolean;
  delay?: number;
}

const STATUS_CONFIG = {
  todo: { color: 'text-slate-400', bg: 'bg-slate-400', icon: '○' },
  'in-progress': { color: 'text-yellow-400', bg: 'bg-yellow-400', icon: '◐' },
  done: { color: 'text-emerald-400', bg: 'bg-emerald-400', icon: '●' },
  cancelled: { color: 'text-slate-600', bg: 'bg-slate-600', icon: '×' },
};

const PRIORITY_CONFIG = {
  urgent: { icon: '▲▲', color: 'text-red-400' },
  high: { icon: '▲', color: 'text-orange-400' },
  medium: { icon: '▶', color: 'text-yellow-400' },
  low: { icon: '▽', color: 'text-slate-500' },
};

export function IssueCard({
  id,
  title,
  status,
  priority,
  assignee,
  label,
  aiGenerated = false,
  delay = 0,
}: IssueCardProps) {
  const statusCfg = STATUS_CONFIG[status];
  const priorityCfg = PRIORITY_CONFIG[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.10] transition-all duration-200 group cursor-default"
    >
      {aiGenerated && (
        <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-[9px] font-mono font-semibold">
          AI
        </div>
      )}

      <span className={`text-xs ${priorityCfg.color} shrink-0 w-4`}>
        {priorityCfg.icon}
      </span>

      <span className={`text-sm ${statusCfg.color} shrink-0`}>
        {statusCfg.icon}
      </span>

      <span className="text-xs text-slate-600 shrink-0 font-mono">{id}</span>

      <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1 truncate">
        {title}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        {label && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
            {label}
          </span>
        )}
        {assignee && (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[9px] font-bold text-white">
            {assignee[0].toUpperCase()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
