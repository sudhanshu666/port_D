import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for ultra-smooth performance (bypasses React state renders)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics to the cursor movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by 16px to perfectly center the 32px circle on the mouse pointer
      cursorX.set(e.clientX - 16); 
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over our grid cards or interactive elements
      if (e.target.closest('.cursor-pointer, button, a')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Only show custom cursor on devices with a fine pointer (desktop)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; 
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-neon rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        scale: isHovered ? 1.8 : 1,
        backgroundColor: isHovered ? 'rgba(0, 243, 255, 1)' : 'transparent',
        borderWidth: isHovered ? '0px' : '1px',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="w-1 h-1 bg-neon rounded-full"
        animate={{ opacity: isHovered ? 0 : 1 }}
      />
    </motion.div>
  );
}