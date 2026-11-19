"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Wallet } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

function InvestmentStory() {
  return (
    <div className="relative mx-auto h-[235px] w-[310px] max-w-full sm:h-[275px] sm:w-[390px]" aria-hidden="true">
      <div className="absolute inset-x-7 bottom-5 h-32 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
      {/* Investor, illustrated with simple scalable vector shapes. */}
      <motion.svg viewBox="0 0 390 275" className="relative h-full w-full overflow-visible" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
        <defs>
          <linearGradient id="shreeji-coat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#1e3a8a"/></linearGradient>
          <linearGradient id="shreeji-chart" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#bfdbfe" stopOpacity=".6"/><stop offset="1" stopColor="#dbeafe" stopOpacity=".04"/></linearGradient>
        </defs>
        {/* Background growth panel */}
        <rect x="165" y="23" width="209" height="190" rx="22" fill="#ffffff" fillOpacity=".92" stroke="#bfdbfe" strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-blue-800" />
        <path d="M185 165H353M185 123H353M185 81H353" stroke="#dbeafe" strokeDasharray="4 6" className="dark:stroke-slate-700" />
        <path d="M186 174 L225 151 L258 158 L290 112 L326 100 L353 57 L353 190 L186 190Z" fill="url(#shreeji-chart)" />
        <motion.path d="M186 174 L225 151 L258 158 L290 112 L326 100 L353 57" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.45, delay: 0.45, ease }} />
        <motion.circle cx="353" cy="57" r="6" fill="#2563eb" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.75, type: "spring" }} />
        {/* Person */}
        <ellipse cx="106" cy="250" rx="77" ry="9" fill="#94a3b8" opacity=".18" />
        <path d="M72 183 L68 245 L90 245 L111 201 L124 245 L146 245 L138 178Z" fill="#334155" />
        <path d="M63 108 Q108 89 145 115 L151 195 Q110 208 58 191Z" fill="url(#shreeji-coat)" />
        <path d="M93 104 L111 145 L126 105" fill="#eff6ff" />
        <rect x="100" y="88" width="19" height="23" rx="8" fill="#dca985" />
        <ellipse cx="110" cy="65" rx="32" ry="36" fill="#e8b891" />
        <path d="M78 68 Q71 29 106 26 Q142 24 143 59 Q127 45 111 47 Q92 49 78 68" fill="#1e293b" />
        <path d="M75 119 Q51 146 66 171 L107 182" fill="none" stroke="#2563eb" strokeWidth="22" strokeLinecap="round" />
        <path d="M138 124 Q154 150 161 165" fill="none" stroke="#1d4ed8" strokeWidth="20" strokeLinecap="round" />
        <circle cx="160" cy="166" r="10" fill="#e8b891" />
        <circle cx="107" cy="181" r="10" fill="#e8b891" />
        {/* Phone used to invest */}
        <rect x="92" y="146" width="32" height="54" rx="7" transform="rotate(-13 92 146)" fill="#0f172a" />
        <rect x="97" y="152" width="22" height="40" rx="3" transform="rotate(-13 97 152)" fill="#dbeafe" />
        <path d="M100 178 L106 171 L112 174 L119 159" stroke="#16a34a" strokeWidth="2.5" fill="none" />
        {/* Coin progression */}
        {[{x:208,y:225,d:0.6},{x:247,y:225,d:0.9},{x:286,y:225,d:1.2}].map(({x,y,d},i)=>(
          <motion.g key={x} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d, duration: 0.5 }}>
            <rect x={x} y={y - i * 12} width="29" height={20 + i * 12} rx="5" fill={i===2?"#2563eb":"#93c5fd"}/>
            <text x={x+14.5} y={y+14-i*6} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">₹</text>
          </motion.g>
        ))}
      </motion.svg>
      <motion.div initial={{ opacity: 0, scale: 0.85, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.5 }} className="absolute right-0 top-0 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 dark:border-emerald-900 dark:bg-slate-800">
        <ArrowUpRight size={17} className="text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-100">Potential growth</span>
      </motion.div>
    </div>
  );
}

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
        timer = window.setTimeout(() => {
          try { sessionStorage.setItem("shreeji-intro-seen", "true"); } catch {}
          setVisible(false);
        }, 3200);
      }
    } catch {
      // No storage access: skip the intro.
    }
    setReady(true);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="shreeji-intro" role="status" aria-label="Welcome to Shreeji Investments" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }} className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f8fbff] text-slate-950 dark:bg-slate-950 dark:text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(147,197,253,.25),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_42%,rgba(37,99,235,.15),transparent_65%)]" />
          <div className="relative flex w-full max-w-xl flex-col items-center px-5 text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-1 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-blue-800 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300">
              <Wallet size={15} /> Invest with purpose
            </motion.div>
            <InvestmentStory />
            <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-1 text-3xl font-bold tracking-tight sm:text-5xl">
              Shreeji <span className="text-blue-700 dark:text-blue-400">Investments</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 sm:text-base">
              <TrendingUp size={17} className="text-blue-600" /> Planning Today. Securing Tomorrow.
            </motion.p>
            <div className="mt-8 h-1 w-52 overflow-hidden rounded-full bg-blue-100 dark:bg-slate-800">
              <motion.div className="h-full origin-left rounded-full bg-blue-600" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.85, ease: "linear" }} />
            </div>
            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Illustrative journey · Investment returns are not guaranteed</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
