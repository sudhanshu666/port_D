import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

export default function PortfolioSections({ onProjectSelect }) {
  return (
    <div className="w-full">
      {portfolioData.map((section, index) => (
        <motion.section
          key={section.id}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`min-h-[80vh] w-full ${section.bgColor} ${section.textColor} flex flex-col justify-center px-6 md:px-24 py-20 sticky top-0`}
        >
          <div className="max-w-6xl w-full mx-auto">
            <span className="font-mono text-xs tracking-[0.5em] opacity-50 block mb-6 uppercase">
              // NODE_0{index + 1}
            </span>
            
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16">
              {section.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  onClick={() => onProjectSelect(section)}
                  className="group cursor-pointer border-l-2 border-current pl-6 py-4 hover:opacity-100 opacity-60 transition-all"
                >
                  <p className="text-xl md:text-2xl font-light italic">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}