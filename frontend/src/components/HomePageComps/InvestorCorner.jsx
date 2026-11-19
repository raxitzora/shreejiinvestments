"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, BookOpen, Calculator, CircleHelp,
  FileCheck2, Landmark, ShieldAlert, TrendingUp,
} from "lucide-react";

const resources = [
  { title: "Investor Education", description: "Understand mutual funds, NAV, expense ratios, and the difference between SIP and lump-sum investing.", icon: BookOpen, tag: "Learn the basics" },
  { title: "KYC Essentials", description: "Learn why Know Your Customer verification matters and what to check before starting an investment.", icon: FileCheck2, tag: "Getting started" },
  { title: "Risk & Suitability", description: "Explore market volatility, investment horizons, diversification, and the importance of matching risk to goals.", icon: ShieldAlert, tag: "Invest responsibly" },
  { title: "Investor FAQs", description: "Find answers to common questions about SIPs, redemptions, fund categories, and investing terminology.", icon: CircleHelp, tag: "Quick answers" },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

function estimate(monthly, years, annualRate) {
  const months = years * 12;
  const r = annualRate / 1200;
  const invested = monthly * months;
  const value = r === 0 ? invested : monthly * (((1 + r) ** months - 1) / r) * (1 + r);
  return { invested, value, gain: value - invested };
}

function RangeField({ id, label, value, min, max, step, onChange, display }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</label>
        <span className="text-sm font-bold tabular-nums text-blue-950 dark:text-blue-200">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-blue-800 dark:accent-blue-400" />
    </div>
  );
}

export default function InvestorCorner() {
  const reduced = useReducedMotion();
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(10);
  const result = useMemo(() => estimate(monthly, years, annualRate), [monthly, years, annualRate]);
  const entrance = reduced ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } };

  return (
    <section id="investor-corner" aria-labelledby="investor-corner-heading" className="relative isolate scroll-mt-20 overflow-hidden bg-[#fcfdff] px-5 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,rgba(219,234,254,.55),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_15%_20%,rgba(30,64,175,.19),transparent_50%)]" />
      <div className="mx-auto max-w-7xl">
        <motion.div {...entrance} className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-blue-800 dark:text-blue-300">Investor Corner</span>
          <h2 id="investor-corner-heading" className="mt-5 text-balance text-4xl font-bold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Learn more. <span className="text-blue-800 dark:text-blue-400">Invest with clarity.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Explore essential investing concepts, understand common risks, and estimate how consistent contributions could grow over time.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.article key={resource.title} {...entrance} transition={reduced ? undefined : { duration: 0.5, delay: index * 0.07 }}
                whileHover={reduced ? undefined : { y: -9, scale: 1.025 }}
                className="group relative flex min-h-64 flex-col rounded-[1.6rem] border border-blue-100 bg-white/90 p-6 shadow-[0_12px_40px_-28px_rgba(30,64,175,.3)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-300 hover:shadow-[0_25px_60px_-30px_rgba(30,64,175,.35)] dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-[0_12px_40px_-28px_rgba(0,0,0,.7)] dark:hover:border-blue-500 dark:hover:shadow-[0_25px_60px_-30px_rgba(37,99,235,.35)]">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 p-3 text-blue-900 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                  <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.13em] text-blue-700 dark:text-blue-300">{resource.tag}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-blue-950 dark:text-white">{resource.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{resource.description}</p>
                <div aria-hidden="true" className="mt-auto pt-6"><span className="block h-0.5 w-9 rounded-full bg-blue-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-700 dark:bg-blue-700 dark:group-hover:bg-blue-400" /></div>
              </motion.article>
            );
          })}
        </div>

        <motion.div {...entrance} className="mt-14 grid overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,.3)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,.85)] lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-9 lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300"><Calculator size={15} /> Interactive tool</div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">SIP Growth Calculator</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300">Adjust the contribution, time horizon, and hypothetical annual return to explore an illustrative future value.</p>
            <div className="mt-9 space-y-7">
              <RangeField id="sip-monthly" label="Monthly investment" value={monthly} min={500} max={100000} step={500} onChange={setMonthly} display={formatMoney(monthly)} />
              <RangeField id="sip-years" label="Investment period" value={years} min={1} max={35} step={1} onChange={setYears} display={`${years} years`} />
              <RangeField id="sip-rate" label="Assumed annual return" value={annualRate} min={0} max={20} step={0.5} onChange={setAnnualRate} display={`${annualRate}%`} />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-6 text-white dark:from-slate-950 dark:via-blue-950 dark:to-blue-900 sm:p-9 lg:p-12">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-200"><TrendingUp size={18} /> Illustrative projection</div>
            <p className="mt-7 text-sm text-blue-200">Estimated future value</p>
            <p aria-live="polite" className="mt-2 break-words text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{formatMoney(result.value)}</p>
            <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
              <motion.div className="h-full rounded-full bg-sky-300" animate={{ width: `${result.value > 0 ? (result.invested / result.value) * 100 : 100}%` }} transition={reduced ? { duration: 0 } : { duration: 0.35 }} />
            </div>
            <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/20 pt-6">
              <div><p className="text-xs text-blue-200">Total invested</p><p className="mt-2 text-lg font-semibold tabular-nums sm:text-xl">{formatMoney(result.invested)}</p></div>
              <div><p className="text-xs text-blue-200">Illustrative growth</p><p className="mt-2 text-lg font-semibold tabular-nums sm:text-xl">{formatMoney(result.gain)}</p></div>
            </div>
            <p className="mt-7 text-xs leading-6 text-blue-100/80">For education only. Assumes a constant monthly return and contributions at the beginning of each month. Actual returns vary, are not guaranteed, and may be negative. Taxes, fees, and inflation are not included.</p>
          </div>
        </motion.div>

        <motion.div {...entrance} className="mt-10 flex flex-col gap-5 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 transition-colors duration-300 dark:border-blue-900/60 dark:bg-blue-950/40 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-300"><Landmark size={19} /> Shreeji Investments</div>
            <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Have questions about getting started?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Connect with our team for information about mutual fund distribution services.</p>
          </div>
          <Link href="/contact-us" className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-400 sm:self-auto">
            Contact us <ArrowUpRight size={17} />
          </Link>
        </motion.div>
        <p className="mt-7 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Shreeji Investments is an AMFI-registered mutual fund distributor (ARN 249212), not a SEBI-registered investment adviser.</p>
      </div>
    </section>
  );
}
