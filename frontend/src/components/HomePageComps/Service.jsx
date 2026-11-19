"use client";

import { useReducedMotion } from "framer-motion";
import { ChartNoAxesCombined, Landmark, ShieldCheck, Calculator, Wallet } from "lucide-react";

const services = [
  { title: "Mutual Funds", icon: Landmark, detail: "Explore mutual fund options suited to different financial goals and time horizons." },
  { title: "Insurance", icon: ShieldCheck, detail: "Explore protection options for life's uncertainties and your family's needs." },
  { title: "Tax Planning", icon: Calculator, detail: "Understand tax-aware financial decisions and available planning options." },
  { title: "Direct Equity", icon: ChartNoAxesCombined, detail: "Explore direct equity investing with an understanding of risk and volatility." },
  { title: "Financial Planning", icon: Wallet, detail: "Organize your savings, protection, and long-term financial priorities." },
];

function ServiceCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="group/card relative flex h-[205px] w-[285px] shrink-0 flex-col rounded-[1.5rem] border border-blue-100 bg-white/95 p-6 shadow-[0_8px_30px_-18px_rgba(30,64,175,.16)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-2 hover:border-blue-300 hover:bg-blue-50/70 hover:shadow-[0_22px_55px_-22px_rgba(30,64,175,.3)] dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,.55)] dark:hover:border-blue-500/70 dark:hover:bg-slate-800 dark:hover:shadow-[0_22px_55px_-22px_rgba(37,99,235,.25)] sm:w-[340px]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 transition-all duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:bg-blue-900 group-hover/card:text-white dark:bg-blue-500/15 dark:text-blue-300 dark:group-hover/card:bg-blue-600 dark:group-hover/card:text-white">
        <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-blue-950 dark:text-slate-50">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
    </article>
  );
}

function Marquee({ children, reverse = false, pauseOnHover = true, reduced = false, duration = 38 }) {
  return (
    <div
      className={`service-marquee flex w-full overflow-hidden py-4 [--gap:1rem] ${pauseOnHover ? "hover:[&_.service-marquee-track]:[animation-play-state:paused] focus-within:[&_.service-marquee-track]:[animation-play-state:paused]" : ""}`}
      style={{ "--duration": `${duration}s` }}
    >
      {[0, 1, 2, 3].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy > 0 ? "true" : undefined}
          className={`service-marquee-track flex shrink-0 justify-around gap-[var(--gap)] pr-[var(--gap)] ${reduced ? "" : "animate-service-marquee"} ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default function Service() {
  const reduced = useReducedMotion();
  return (
    <section id="services" aria-labelledby="services-heading" className="relative scroll-mt-20 overflow-hidden bg-[#fcfdff] py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-800 dark:text-blue-400">What we offer</p>
        <h2 id="services-heading" className="mt-5 text-balance text-4xl font-bold tracking-[-.045em] text-slate-950 dark:text-white sm:text-6xl">Financial services, <span className="text-blue-800 dark:text-blue-400">in focus.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">Explore the financial solutions and topics available through Shreeji Investments.</p>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1600px]">
        <Marquee reduced={reduced} duration={38}>
          {services.map((item) => <ServiceCard key={item.title} item={item} />)}
        </Marquee>
        <Marquee reduced={reduced} reverse duration={43}>
          {[...services.slice(2), ...services.slice(0, 2)].map((item) => <ServiceCard key={item.title} item={item} />)}
        </Marquee>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fcfdff] to-transparent dark:from-slate-950 sm:w-32 lg:w-52" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fcfdff] to-transparent dark:from-slate-950 sm:w-32 lg:w-52" />
      </div>
      <p className="mx-auto mt-7 max-w-3xl px-5 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">Availability of specific services depends on applicable registrations and authorizations. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
      <style jsx global>{`
        @keyframes service-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-service-marquee {
          animation: service-marquee var(--duration, 40s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-service-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
