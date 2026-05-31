"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="xp-boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="180" height="80" viewBox="0 0 180 80" aria-hidden>
            <text x="0" y="35" fill="#fff" fontFamily="Tahoma, sans-serif" fontSize="28" fontWeight="bold">
              Windows
            </text>
            <text
              x="0"
              y="65"
              fill="#FF8C00"
              fontFamily="Tahoma, sans-serif"
              fontSize="32"
              fontStyle="italic"
              fontWeight="bold"
            >
              XP
            </text>
          </svg>
          <p className="xp-boot-logo-text">Microsoft Windows XP</p>
          <div className="xp-boot-progress">
            <div
              className="xp-boot-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
