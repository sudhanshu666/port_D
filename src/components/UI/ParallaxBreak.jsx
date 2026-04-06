import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBreak() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text moves horizontally in opposite directions
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[60vh] bg-[#0a0a0a] overflow-hidden flex flex-col justify-center">
      {/* Background Layered Text */}
      <motion.div style={{ x: xLeft }} className="whitespace-nowrap opacity-[0.03] select-none">
        <span className="text-[15rem] font-black uppercase italic leading-none">
          RED_HAT_CERTIFIED // RH124 // AD141 // RED_HAT_CERTIFIED // 
        </span>
      </motion.div>

      {/* Foreground Interactive Content */}
      <motion.div style={{ scale }} className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center px-6">
          <p className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.6em] mb-4">
            // Research_Focus
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none max-w-4xl mx-auto">
            Bridging the gap between <br /> 
            <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px white' }}>
              Academic Logic
            </span> & Industry Scale.
          </h2>
        </div>
      </motion.div>

      <motion.div style={{ x: xRight }} className="whitespace-nowrap opacity-[0.03] select-none mt-4">
        <span className="text-[15rem] font-black uppercase italic leading-none">
          IOT_RESEARCH // BLOCKCHAIN_VERIFY // AI_ANALYTICS // IOT_RESEARCH //
        </span>
      </motion.div>
    </section>
  );
}