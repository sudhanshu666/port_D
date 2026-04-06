import { motion } from 'framer-motion';

export default function TransitionBreak({ text, colorClass }) {
  return (
    <div className={`relative h-24 flex items-center overflow-hidden border-y border-white/5 ${colorClass}`}>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        <span className="text-[10px] font-mono uppercase tracking-[1em] opacity-20 px-4">
          {text} • {text} • {text} • {text} • {text} • {text} • 
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[1em] opacity-20 px-4">
          {text} • {text} • {text} • {text} • {text} • {text} • 
        </span>
      </motion.div>
    </div>
  );
}