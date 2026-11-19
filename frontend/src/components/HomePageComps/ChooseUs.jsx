"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, TrendingUp, ShieldCheck, Handshake } from "lucide-react";

const features = [
  { id: "planning", title: "Personalized Financial Planning", description: "Financial strategies shaped around your priorities, aspirations, and long-term goals.", icon: Target, tabletRotation: -2, panel: "bg-amber-50 dark:bg-amber-400/10", iconColor: "text-amber-600 dark:text-amber-300", pin: "from-yellow-300 via-yellow-400 to-amber-500", pinShadow: "shadow-amber-400/30" },
  { id: "goals", title: "Goal-Oriented Approach", description: "Thoughtful investment planning that keeps your financial objectives at the center of every decision.", icon: TrendingUp, tabletRotation: 2, panel: "bg-violet-50 dark:bg-violet-400/10", iconColor: "text-violet-600 dark:text-violet-300", pin: "from-violet-400 via-violet-500 to-purple-700", pinShadow: "shadow-violet-400/30" },
  { id: "transparency", title: "Transparency & Clarity", description: "Clear communication and practical insights to help you understand your financial choices.", icon: ShieldCheck, tabletRotation: 2, panel: "bg-pink-50 dark:bg-pink-400/10", iconColor: "text-pink-500 dark:text-pink-300", pin: "from-pink-300 via-pink-400 to-fuchsia-600", pinShadow: "shadow-pink-400/30" },
  { id: "relationships", title: "Long-Term Relationships", description: "We focus on building lasting relationships through consistent support and a client-first approach.", icon: Handshake, tabletRotation: -2, panel: "bg-sky-50 dark:bg-sky-400/10", iconColor: "text-sky-600 dark:text-sky-300", pin: "from-sky-300 via-blue-400 to-blue-600", pinShadow: "shadow-blue-400/30" },
];

function DecorativePin({ feature }) {
  return (
    <div aria-hidden="true" className="relative mx-auto mb-5 h-12 w-14 shrink-0">
      <div className={`absolute left-2 top-1 h-10 w-10 rounded-full bg-gradient-to-br ${feature.pin} shadow-lg ${feature.pinShadow}`} />
      <div className={`absolute left-5 top-2 h-10 w-10 rounded-full bg-gradient-to-br ${feature.pin} shadow-md`} />
      <div className="absolute left-6 top-3 h-6 w-6 rounded-full bg-white/20 blur-[2px]" />
      <div className="absolute bottom-0 left-5 h-1.5 w-8 rounded-full bg-slate-900/10 blur-sm dark:bg-black/40" />
    </div>
  );
}

function ConnectingLines({ reducedMotion }) {
  const paths = [
    { d: "M 340 190 C 490 95, 650 95, 790 190", duration: 1.4, delay: 0 },
    { d: "M 790 280 C 630 365, 460 465, 350 585", duration: 1.5, delay: 0.2 },
    { d: "M 340 680 C 500 605, 650 605, 790 680", duration: 1.5, delay: 0.35 },
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 1100 850" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full text-slate-400 dark:text-blue-400/60 lg:block" fill="none">
      {paths.map((path) => (
        <motion.path key={path.d} d={path.d} stroke="currentColor" strokeWidth="1.4" strokeDasharray="7 9" strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: path.duration, delay: path.delay, ease: "easeInOut" }} />
      ))}
    </svg>
  );
}

function FeatureCard({ feature, index, reducedMotion }) {
  const Icon = feature.icon;
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 35, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: reducedMotion ? 0 : feature.tabletRotation }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative z-10 w-full max-w-[420px] justify-self-center"
    >
      <motion.div
        initial={false}
        whileHover={reducedMotion ? undefined : { y: -9, rotate: 0, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.8 }}
        className="rounded-[28px] border border-white/90 bg-white p-4 shadow-[0_20px_55px_-20px_rgba(15,23,42,0.17)] transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-[0_28px_65px_-18px_rgba(15,23,42,0.23)] dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-[0_20px_55px_-20px_rgba(0,0,0,0.55)] dark:hover:border-blue-500/50 dark:hover:shadow-[0_28px_65px_-18px_rgba(37,99,235,0.22)] sm:p-5 lg:p-6"
      >
        <DecorativePin feature={feature} />
        <div className={`flex min-h-[215px] flex-col rounded-[22px] ${feature.panel} p-6 ring-1 ring-transparent transition-colors duration-300 dark:ring-white/5 sm:min-h-[230px] sm:p-7`}>
          <Icon aria-hidden="true" className={`mb-5 h-8 w-8 ${feature.iconColor}`} strokeWidth={2} />
          <h3 className="mb-3 text-xl font-semibold leading-snug tracking-tight text-slate-950 dark:text-slate-50 md:text-2xl">{feature.title}</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">{feature.description}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ChooseUs() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="why-choose-us" aria-labelledby="why-choose-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-[#FAFBFC] py-20 transition-colors duration-300 dark:bg-slate-950 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 119px, rgba(148,163,184,0.10) 120px)" }} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 id="why-choose-heading" initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-4xl font-semibold leading-[1.15] tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl lg:text-6xl">
            Why <span className="font-serif italic font-medium text-blue-600 dark:text-blue-400">Choose</span> Shreeji Investments?
          </motion.h2>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.15 }} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            Because your financial future deserves thoughtful planning, clear guidance, and a partner who puts your goals first.
          </motion.p>
        </div>
        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
          <ConnectingLines reducedMotion={reducedMotion} />
          <div className="relative grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 sm:gap-y-20 lg:gap-x-28 lg:gap-y-24">
            {features.map((feature, index) => <FeatureCard key={feature.id} feature={feature} index={index} reducedMotion={reducedMotion} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
