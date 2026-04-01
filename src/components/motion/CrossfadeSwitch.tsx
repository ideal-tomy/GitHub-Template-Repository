"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion/variants";
import { DURATION_SMOOTH } from "@/lib/motion/config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CrossfadeSwitchProps = {
  activeKey: string | number;
  children: React.ReactNode;
  className?: string;
};

export function CrossfadeSwitch({
  activeKey,
  children,
  className,
}: CrossfadeSwitchProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeKey}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DURATION_SMOOTH / 1000,
          ease: EASE_SMOOTH,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
