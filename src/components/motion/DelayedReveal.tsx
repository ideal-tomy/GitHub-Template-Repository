"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion/variants";
import { DURATION_SMOOTH } from "@/lib/motion/config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type DelayedRevealProps = {
  show: boolean;
  delayMs?: number;
  children: React.ReactNode;
  className?: string;
};

export function DelayedReveal({
  show,
  delayMs = 600,
  children,
  className,
}: DelayedRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [show, delayMs, prefersReducedMotion]);

  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{
        duration: prefersReducedMotion ? 0 : DURATION_SMOOTH / 1000,
        ease: EASE_SMOOTH,
      }}
      className={className}
      aria-hidden={!visible}
    >
      {visible ? children : null}
    </motion.div>
  );
}
