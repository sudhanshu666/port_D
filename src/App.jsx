import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';

import Preloader from './components/UI/Preloader';
import Hero from './components/UI/Hero';
import ParticleUniverse from './components/3D/ParticleUniverse';
import ParallaxBreak from './components/UI/ParallaxBreak';
import TransitionBreak from './components/UI/TransitionBreak';

/* --- 120 FPS HIGH-PERFORMANCE REPULSION POINTS --- */
function RepulsionPoints() {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const count = 1500; 
  
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 2;
      pos.set([x, y, z], i * 3);
      initial.set([x, y, z], i * 3);
    }
    return [pos, initial];
  }, []);

  useFrame(() => {
    const currentPos = meshRef.current.geometry.attributes.position.array;
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const dx = currentPos[ix] - mx;
      const dy = currentPos[iy] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const repulsionRadius = 2.5;
      const force = 0.15; 
      const returnSpeed = 0.05; 

      if (dist < repulsionRadius) {
        const angle = Math.atan2(dy, dx);
        const push = (repulsionRadius - dist) * force;
        currentPos[ix] += Math.cos(angle) * push;
        currentPos[iy] += Math.sin(angle) * push;
      } else {
        currentPos[ix] += (initialPositions[ix] - currentPos[ix]) * returnSpeed;
        currentPos[iy] += (initialPositions[iy] - currentPos[iy]) * returnSpeed;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#000000" transparent opacity={0.95} sizeAttenuation />
    </points>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothTouch: false }); // Disabled smooth on touch for better mobile feel
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-full bg-black selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleUniverse isProjectOpen={false} />
        </Canvas>
      </div>

      {!isLoading && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
          <Hero />

          <TransitionBreak text="Initializing_Capabilities_Matrix" colorClass="bg-[#121212]" />

          {/* SECTION: SKILLS */}
          <section className="relative z-20 bg-[#121212] py-24 md:py-40 px-6 md:px-24 border-t border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white/5 text-6xl md:text-[13rem] font-black uppercase tracking-tighter mb-10 md:mb-20 leading-none">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 overflow-hidden rounded-xl">
                <div className="bg-[#121212] p-8 md:p-12 hover:bg-white/[0.02] transition-colors group">
                  <p className="font-mono text-[10px] text-blue-400 mb-6 md:mb-10">// Core_Logic</p>
                  <ul className="space-y-4 text-white/50 text-lg md:text-xl font-light">
                    <li>Data Structures</li>
                    <li>DBMS & MySQL</li>
                    <li>OOP Concepts</li>
                  </ul>
                </div>
                <div className="bg-[#121212] p-8 md:p-12 hover:bg-white/[0.02] transition-colors group border-y md:border-y-0 md:border-x border-white/10">
                  <p className="font-mono text-[10px] text-blue-400 mb-6 md:mb-10">// Languages</p>
                  <ul className="space-y-4 text-white/50 text-lg md:text-xl font-light">
                    <li>Python</li>
                    <li>C Programming</li>
                    <li>Basic Java</li>
                  </ul>
                </div>
                <div className="bg-[#121212] p-8 md:p-12 hover:bg-white/[0.02] transition-colors group">
                  <p className="font-mono text-[10px] text-blue-400 mb-6 md:mb-10">// Certificates</p>
                  <ul className="space-y-4 text-white/50 text-lg md:text-xl font-light">
                    <li>Red Hat Admin (RH124)</li>
                    <li>Python/Red Hat (AD141)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <ParallaxBreak />

          <TransitionBreak text="Parsing_Project_Architecture" colorClass="bg-[#f2f2f2] !border-black/5" />

          {/* SECTION: WORK */}
          <section className="relative z-20 bg-[#f2f2f2] py-24 md:py-40 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-black/5 text-6xl md:text-[13rem] font-black uppercase tracking-tighter mb-16 md:mb-24 leading-none">Work</h2>
              <div className="space-y-24 md:space-y-40">
                
                {/* Project 01 */}
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="lg:col-span-1 text-black/20 font-mono text-xl italic hidden md:block">01</div>
                  <div className="lg:col-span-6">
                    <p className="text-black/20 font-mono text-sm italic mb-2 md:hidden">01</p>
                    <h3 className="text-4xl md:text-8xl font-black text-black uppercase tracking-tighter group-hover:italic transition-all">IoT Shade System</h3>
                  </div>
                  <div className="lg:col-span-5 pt-2 md:pt-4">
                    <p className="text-black/60 text-base md:text-lg font-light mb-8 md:mb-10 italic">Designed a sensor-based system using Arduino UNO and moisture sensors to automatically open shades during rainfall, protecting indoor spaces. Authored an IEEE-format research paper.</p>
                    <a href="https://github.com/disha260406" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black text-white text-[10px] font-mono tracking-widest hover:bg-blue-600 transition-all">Access_Data</a>
                  </div>
                </div>

                {/* Project 02 */}
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="lg:col-span-1 text-black/20 font-mono text-xl italic hidden md:block">02</div>
                  <div className="lg:col-span-6">
                    <p className="text-black/20 font-mono text-sm italic mb-2 md:hidden">02</p>
                    <h3 className="text-4xl md:text-8xl font-black text-black uppercase tracking-tighter group-hover:italic transition-all">AI Readiness Hub</h3>
                  </div>
                  <div className="lg:col-span-5 pt-2 md:pt-4">
                    <p className="text-black/60 text-base md:text-lg font-light mb-8 md:mb-10 italic">Developed an AI-based analytics platform to evaluate student readiness for industry roles by mapping academic curriculum with job outcomes to identify skill gaps.</p>
                    <a href="https://github.com/disha260406" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black text-white text-[10px] font-mono tracking-widest hover:bg-blue-600 transition-all">Access_Data</a>
                  </div>
                </div>

                {/* Project 03 */}
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="lg:col-span-1 text-black/20 font-mono text-xl italic hidden md:block">03</div>
                  <div className="lg:col-span-6">
                    <p className="text-black/20 font-mono text-sm italic mb-2 md:hidden">03</p>
                    <h3 className="text-4xl md:text-8xl font-black text-black uppercase tracking-tighter group-hover:italic transition-all">Blockchain Verify</h3>
                  </div>
                  <div className="lg:col-span-5 pt-2 md:pt-4">
                    <p className="text-black/60 text-base md:text-lg font-light mb-8 md:mb-10 italic">Built a blockchain-based system to verify the authenticity of certificates, enhancing data security and preventing fraudulent document usage.</p>
                    <a href="https://github.com/disha260406" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black text-white text-[10px] font-mono tracking-widest hover:bg-blue-600 transition-all">Access_Data</a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* IMPROVED POINT PARALLAX */}
          <section className="relative h-[40vh] md:h-[65vh] bg-[#e8e8e8] z-20 overflow-hidden border-t border-black/5 shadow-inner">
            <div className="absolute inset-0 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
                <RepulsionPoints />
              </Canvas>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none text-center px-4">
              <p className="font-black text-xl md:text-5xl text-black uppercase tracking-[0.2em] mb-4">
                Initializing_Network_Node
              </p>
              <p className="font-bold text-xs md:text-lg text-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
                [ 120hz Interactive Particle Stream ]
              </p>
            </div>
          </section>

          <TransitionBreak text="Establish_Remote_Handshake" colorClass="bg-white !border-black/5" />

          {/* SECTION: CONNECT */}
          <section className="relative z-20 bg-white py-24 md:py-40 px-6 md:px-24">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-6xl md:text-[11rem] font-black text-black uppercase tracking-tighter mb-16 md:mb-20">Connect_</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16 md:mb-20">
                <a href="https://github.com/disha260406" target="_blank" className="p-10 md:p-20 border border-black/5 hover:bg-black group transition-all duration-500 rounded-xl">
                  <p className="font-mono text-[10px] text-gray-400 group-hover:text-blue-400 uppercase tracking-widest mb-4">Source_Control</p>
                  <p className="text-3xl md:text-6xl font-black uppercase text-black group-hover:text-white">GitHub</p>
                </a>
                <a href="https://www.linkedin.com/in/disha-devgirkar-84486631a" target="_blank" className="p-10 md:p-20 border border-black/5 hover:bg-black group transition-all duration-500 rounded-xl">
                  <p className="font-mono text-[10px] text-gray-400 group-hover:text-blue-400 uppercase tracking-widest mb-4">Professional</p>
                  <p className="text-3xl md:text-6xl font-black uppercase text-black group-hover:text-white">LinkedIn</p>
                </a>
              </div>

              {/* VIEW RESUME BUTTON */}
              <div className="flex justify-center mb-24 md:mb-40">
                <a 
                  href="/assets/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-10 py-5 md:px-12 md:py-6 bg-black text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl rounded-full"
                >
                  View_My_Resume
                </a>
              </div>
              
              <footer className="pt-10 md:pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.5em] gap-4 md:gap-0">
                <p>Disha Devgirkar // SIT Nagpur // B.Tech CSE</p>
                <p>© {new Date().getFullYear()} // Online</p>
              </footer>
            </div>
          </section>

        </motion.main>
      )}
    </div>
  );
}

export default App;