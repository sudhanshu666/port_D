import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectPanel({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-[#0a0a0a] z-[200] border-l border-white/10 p-10 flex flex-col shadow-2xl"
      >
        <button onClick={onClose} className="self-end text-white/30 hover:text-white font-mono text-xs tracking-widest mb-20">
          [ CLOSE_SESSION ]
        </button>

        <div className="flex-1">
          <p className="font-mono text-blue-500 text-[10px] mb-2 tracking-[0.3em] uppercase">// {project.id}</p>
          <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-8 leading-none">
            {project.title}
          </h2>
          
          <p className="text-gray-400 font-light leading-relaxed mb-12">
            {project.description}
          </p>

          <div className="mb-12">
            <p className="font-mono text-[10px] text-gray-600 mb-4 tracking-widest uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a 
          href={project.github} 
          target="_blank" 
          className="w-full py-4 bg-white text-black text-center font-mono text-xs tracking-[0.5em] uppercase hover:bg-gray-200 transition-colors"
        >
          View Source Code
        </a>
      </motion.div>
    </AnimatePresence>
  );
}