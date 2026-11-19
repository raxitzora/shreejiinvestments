"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Compass,
  Headphones,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const insights = [
  { label: "Portfolio Growth", value: "Long-term Wealth", detail: "Investment Focus", icon: ChartNoAxesCombined },
  { label: "Financial Planning", value: "Goal Based", detail: "Plan with Confidence", icon: Compass },
  { label: "Wealth Management", value: "Strategic Approach", detail: "Built Around You", icon: ShieldCheck },
  { label: "Investor Support", value: "Expert Guidance", detail: "Here to Help", icon: Headphones },
];

function AmbientMarketBackground({ reducedMotion }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="market-ambient market-ambient-one absolute -left-32 top-[8%] h-[28rem] w-[28rem] rounded-full bg-sky-200/35 blur-[95px] dark:bg-blue-700/15" />
      <div className="market-ambient market-ambient-two absolute -right-32 bottom-[4%] h-[30rem] w-[30rem] rounded-full bg-indigo-200/30 blur-[105px] dark:bg-indigo-600/15" />
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-45 dark:opacity-30">
        <defs>
          <pattern id="hero-market-grid" width="76" height="76" patternUnits="userSpaceOnUse">
            <path d="M76 0H0V76" fill="none" stroke="currentColor" strokeWidth="0.65" className="text-blue-200/60 dark:text-slate-600/40" />
          </pattern>
          <linearGradient id="hero-market-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect width="1440" height="800" fill="url(#hero-market-grid)" opacity="0.42" />
        <motion.g
          animate={reducedMotion ? undefined : { x: [0, -55, 0], y: [0, -14, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M-80 665 C100 670 150 620 255 630 S435 560 545 590 S740 470 850 505 S1050 360 1170 390 S1330 285 1520 265" fill="none" stroke="url(#hero-market-line)" strokeWidth="2.2" />
          <path d="M-80 720 C90 710 180 735 285 690 S465 675 570 630 S755 640 860 585 S1065 530 1170 500 S1370 445 1520 420" fill="none" stroke="url(#hero-market-line)" strokeWidth="1.5" opacity="0.6" />
          {[ [255,630], [545,590], [850,505], [1170,390] ].map(([cx,cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill="#60a5fa" opacity="0.4"
              animate={reducedMotion ? undefined : { opacity: [0.15, 0.65, 0.15], r: [3, 5, 3] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }} />
          ))}
        </motion.g>
      </svg>
      <style jsx>{`
        @keyframes market-drift-one { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(45px,-25px,0); } }
        @keyframes market-drift-two { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-40px,30px,0); } }
        .market-ambient-one { animation: market-drift-one 24s ease-in-out infinite; }
        .market-ambient-two { animation: market-drift-two 29s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .market-ambient-one, .market-ambient-two { animation: none; } }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <section className="relative isolate overflow-hidden bg-[#fcfdff] text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <AmbientMarketBackground reducedMotion={shouldReduceMotion} />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white/90 py-2 pl-2 pr-4 shadow-sm shadow-blue-950/[0.03] dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-black/20">
            <span className="flex items-center pl-1" aria-hidden="true">
              {["bg-blue-100 dark:bg-blue-900", "bg-indigo-100 dark:bg-indigo-900", "bg-sky-100 dark:bg-sky-900"].map((color, index) => (
                <span key={index} className={"-ml-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-blue-900 dark:border-slate-900 dark:text-blue-200 " + color} style={{ zIndex: 3 - index }}>
                  <UserRound size={14} strokeWidth={1.8} />
                </span>
              ))}
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200 sm:text-sm">Trusted by Investors</span>
          </motion.div>

          <motion.h1 initial={revealInitial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }} className="text-balance text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-[4.25rem]">
            Build Your <span className="text-blue-800 dark:text-blue-400">Financial Future</span>{" "}with{" "}
            <span className="relative inline-block align-baseline">
              <span className="bg-gradient-to-r from-blue-950 via-blue-700 to-indigo-600 bg-clip-text text-transparent dark:from-sky-200 dark:via-blue-400 dark:to-indigo-300">Us</span>
              <motion.span aria-hidden="true" className="absolute -bottom-1 left-[4%] h-[3px] w-[92%] origin-left rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-400" initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }} />
            </span>.
          </motion.h1>

          <motion.p initial={revealInitial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }} className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
            Make informed financial decisions with trusted guidance, thoughtful planning, and investment solutions designed around your goals.
          </motion.p>

          <motion.div initial={revealInitial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }} className="mt-8 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
            <Link href="/services" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-950/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-slate-950">
              Explore Our Services <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact-us" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950">
              Talk to Our Team
            </Link>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
          {insights.map((item, index) => {
            const Icon = item.icon;
            const positions = ["left-0 top-[25%]", "right-0 top-[25%]", "bottom-[16%] left-0", "right-0 bottom-[16%]"];
            return (
              <motion.article key={item.label} initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }} whileHover={shouldReduceMotion ? undefined : { y: -4 }} className={"pointer-events-auto absolute " + positions[index] + " w-56 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.24)] transition-[background-color,border-color,box-shadow] duration-200 hover:shadow-[0_20px_48px_-24px_rgba(15,23,42,0.3)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 dark:hover:border-blue-700 2xl:w-60"}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">{item.detail}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="relative z-10 mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:hidden">
          {insights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.label} initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }} whileHover={shouldReduceMotion ? undefined : { y: -2 }} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.28)] transition-[background-color,border-color,box-shadow] duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 dark:hover:border-blue-700">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-slate-900 dark:text-slate-100">{item.value}</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">{item.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
