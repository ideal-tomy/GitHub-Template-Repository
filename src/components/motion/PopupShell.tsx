"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion/variants";
import { DURATION_SMOOTH } from "@/lib/motion/config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type PopupShellProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function PopupShell({ open, title, onClose, children }: PopupShellProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 md:items-center"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : DURATION_SMOOTH / 1000,
            ease: EASE_SMOOTH,
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Popup"}
            className="w-full max-w-xl rounded-xl bg-white p-4 shadow-xl"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            transition={{
              duration: prefersReducedMotion ? 0 : DURATION_SMOOTH / 1000,
              ease: EASE_SMOOTH,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[1rem] font-semibold text-black">
                {title ?? "Popup"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-black/15 px-2 py-1 text-[14px] text-black/80"
              >
                Close
              </button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
