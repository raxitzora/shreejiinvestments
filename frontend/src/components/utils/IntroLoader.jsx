
"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let timer;

    try {
      const seen = sessionStorage.getItem("shreeji-intro-seen");

      if (!seen && !reduceMotion) {
        setVisible(true);

        timer = setTimeout(() => {
          sessionStorage.setItem("shreeji-intro-seen", "true");
          setVisible(false);
        }, 1800);
      }
    } catch {
      // Skip the intro if session storage is unavailable.
    }

    setReady(true);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="shreeji-intro"
          role="status"
          aria-label="Welcome to Shreeji Investments"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8FAFC]"
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-80 w-80 rounded-full bg-blue-100/50 blur-[100px]"
          />

          <div className="relative flex flex-col items-center px-5 text-center">
            {/* Brand symbol */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 flex h-20 w-20 items-center justify-center rounded-[24px] border border-blue-100 bg-white shadow-[0_15px_45px_-12px_rgba(37,99,235,0.25)]"
            >
              <TrendingUp
                size={36}
                strokeWidth={1.7}
                className="text-blue-600"
              />
            </motion.div>

            {/* Brand name */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
            >
              Shreeji{" "}
              <span className="text-blue-600">Investments</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm"
            >
              Planning Today. Securing Tomorrow.
            </motion.p>

            {/* Animated progress line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 h-[3px] w-48 overflow-hidden rounded-full bg-blue-100"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/3 rounded-full bg-blue-600"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
