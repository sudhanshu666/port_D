import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center font-mono"
    >
      <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden mb-8">
        <motion.div 
          className="absolute inset-0 bg-white" 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-white text-[10px] tracking-[0.5em] uppercase space-y-2 text-center">
        <p>Initializing_Systems...</p>
        <p className="text-white/40">Disha_Devgirkar_OS_v2026.04</p>
        <p className="text-xl font-black mt-4">{percent}%</p>
      </div>
    </motion.div>
  );
}