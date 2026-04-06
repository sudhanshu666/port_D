import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  const scale = useTransform(scrollY, [0, 600], [1, 3.5]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const blurValue = useTransform(scrollY, [0, 500], [0, 25]);
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      style={{ scale, opacity, filter: blur }} 
      className="relative z-50 h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none"
    >
      <div className="border-l-[1px] border-white/20 pl-10">
        <h1 className="text-8xl md:text-[11rem] font-black text-white uppercase tracking-tighter leading-[0.8]">
          DISHA <br /> DEVGIRKAR
        </h1>
        <div className="mt-10 h-[1px] bg-white/40 w-48" />
        <div className="mt-8 space-y-1">
          <p className="text-white/50 font-mono text-xs tracking-[0.4em] uppercase">
            Computer Science and Engineering Undergraduate 
          </p>
          <p className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase">
            Symbiosis Institute of Technology, Nagpur 
          </p>
        </div>
      </div>
    </motion.div>
  );
}