import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

export default function ScrambleText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Controls the speed of the decode
      }, 30);
    };

    // Wait for the delay before starting the scramble
    const timeout = setTimeout(startAnimation, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <motion.span>{displayText}</motion.span>;
}