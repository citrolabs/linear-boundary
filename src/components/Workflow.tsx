import { motion } from 'framer-motion';

interface WorkflowStep {
  icon: string;
  label: string;
  description: string;
  color: string;
}

interface WorkflowProps {
  steps: WorkflowStep[];
}

export function Workflow({ steps }: WorkflowProps) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-emerald-500/50" />

      <div className="space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative flex items-start gap-4 pl-14"
          >
            {/* Icon dot */}
            <div
              className={`absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl ${step.color} border border-white/10 shadow-lg`}
            >
              {step.icon}
            </div>

            <div className="flex-1 py-1">
              <div className="text-sm font-semibold text-white mb-0.5">
                {step.label}
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {step.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
