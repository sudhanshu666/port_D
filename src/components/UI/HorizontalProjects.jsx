import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
  { title: "IoT Automated Shade", id: "01", color: "bg-[#f2f2f2]", desc: "Arduino sensor system for rainfall protection " },
  { title: "AI Industry Hub", id: "02", color: "bg-[#e2e2e2]", desc: "Mapping curriculum to job outcomes via AI " },
  { title: "Blockchain Verify", id: "03", color: "bg-[#ffffff]", desc: "Anti-fraud system for certificate authenticity [cite: 24, 25]" },
  { title: "Red Hat Systems", id: "04", color: "bg-[#d2d2d2]", desc: "System Administration & Python certifications " }
];

export default function HorizontalProjects({ onSelect }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Increased from -75% to -85% to ensure all 4 cards clear the screen
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-10 md:px-32">
          {items.map((project, i) => (
            <motion.div
              key={i}
              onClick={() => onSelect(project)}
              className={`group flex-shrink-0 h-[600px] w-[450px] md:w-[800px] flex flex-col justify-end p-16 cursor-pointer shadow-sm border border-gray-100 ${project.color} text-black`}
            >
              <span className="font-mono text-[10px] text-gray-400 mb-4 tracking-[0.5em] uppercase italic">
                SEC_NODE_DATA_{project.id}
              </span>
              <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                {project.title}
              </h3>
              <p className="font-mono text-xs opacity-50 uppercase tracking-widest">{project.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}