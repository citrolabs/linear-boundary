import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'prompt' | 'output' | 'ai' | 'success' | 'comment';
  text: string;
  delay: number;
}

interface TerminalProps {
  title: string;
  lines: TerminalLine[];
  loop?: boolean;
}

const TYPE_COLOR: Record<TerminalLine['type'], string> = {
  prompt: 'text-violet-400',
  output: 'text-slate-300',
  ai: 'text-blue-400',
  success: 'text-emerald-400',
  comment: 'text-slate-500',
};

const TYPE_PREFIX: Record<TerminalLine['type'], string> = {
  prompt: '$ ',
  output: '  ',
  ai: '✦ ',
  success: '✓ ',
  comment: '# ',
};

export function Terminal({ title, lines, loop = true }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setVisibleCount(0);
      for (let i = 0; i < lines.length; i++) {
        await new Promise<void>((resolve) =>
          setTimeout(resolve, lines[i].delay)
        );
        if (cancelled) return;
        setVisibleCount(i + 1);
      }
      if (loop) {
        await new Promise<void>((resolve) => setTimeout(resolve, 3000));
        if (!cancelled) setKey((k) => k + 1);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [key, lines, loop]);

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d0d15] border border-white/[0.08] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-slate-500 ml-2 font-mono">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[180px]">
        <AnimatePresence>
          {lines.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`${key}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`leading-relaxed ${TYPE_COLOR[line.type]}`}
            >
              <span className="opacity-50">{TYPE_PREFIX[line.type]}</span>
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleCount < lines.length && (
          <span className="text-violet-400 cursor-blink">█</span>
        )}
      </div>
    </div>
  );
}
