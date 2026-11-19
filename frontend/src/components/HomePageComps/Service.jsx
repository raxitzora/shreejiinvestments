"use client";

import { useReducedMotion } from "framer-motion";
import { ChartNoAxesCombined, Landmark, ShieldCheck, Calculator, Wallet } from "lucide-react";

const services = [
  { title: "Mutual Funds", icon: Landmark, detail: "Explore mutual fund options suited to different financial goals and time horizons.", theme: "emerald" },
  { title: "Insurance", icon: ShieldCheck, detail: "Explore protection options for life's uncertainties and your family's needs.", theme: "sky" },
  { title: "Tax Planning", icon: Calculator, detail: "Understand tax-aware financial decisions and available planning options.", theme: "amber" },
  { title: "Direct Equity", icon: ChartNoAxesCombined, detail: "Explore direct equity investing with an understanding of risk and volatility.", theme: "violet" },
  { title: "Financial Planning", icon: Wallet, detail: "Organize your savings, protection, and long-term financial priorities.", theme: "rose" },
];

// Static Tailwind classes ensure each palette is included in the production CSS.
const palettes = {
  emerald: {
    card: "border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/70 to-teal-50/80 hover:border-emerald-300 dark:border-emerald-800/60 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 dark:hover:border-emerald-600/70",
    icon: "bg-emerald-100 text-emerald-700 group-hover/card:bg-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 dark:group-hover/card:bg-emerald-600",
    accent: "bg-emerald-500", glow: "bg-emerald-200/50 dark:bg-emerald-500/10", title: "text-emerald-950 dark:text-emerald-100",
  },
  sky: {
    card: "border-sky-200/80 bg-gradient-to-br from-white via-sky-50/70 to-cyan-50/80 hover:border-sky-300 dark:border-sky-800/60 dark:from-slate-900 dark:via-sky-950/30 dark:to-slate-900 dark:hover:border-sky-600/70",
    icon: "bg-sky-100 text-sky-700 group-hover/card:bg-sky-600 dark:bg-sky-500/15 dark:text-sky-300 dark:group-hover/card:bg-sky-600",
    accent: "bg-sky-500", glow: "bg-sky-200/50 dark:bg-sky-500/10", title: "text-sky-950 dark:text-sky-100",
  },
  amber: {
    card: "border-amber-200/80 bg-gradient-to-br from-white via-amber-50/70 to-orange-50/80 hover:border-amber-300 dark:border-amber-800/60 dark:from-slate-900 dark:via-amber-950/25 dark:to-slate-900 dark:hover:border-amber-600/70",
    icon: "bg-amber-100 text-amber-700 group-hover/card:bg-amber-600 dark:bg-amber-500/15 dark:text-amber-300 dark:group-hover/card:bg-amber-600",
    accent: "bg-amber-500", glow: "bg-amber-200/50 dark:bg-amber-500/10", title: "text-amber-950 dark:text-amber-100",
  },
  violet: {
    card: "border-violet-200/80 bg-gradient-to-br from-white via-violet-50/70 to-indigo-50/80 hover:border-violet-300 dark:border-violet-800/60 dark:from-slate-900 dark:via-violet-950/30 dark:to-slate-900 dark:hover:border-violet-600/70",
    icon: "bg-violet-100 text-violet-700 group-hover/card:bg-violet-600 dark:bg-violet-500/15 dark:text-violet-300 dark:group-hover/card:bg-violet-600",
    accent: "bg-violet-500", glow: "bg-violet-200/50 dark:bg-violet-500/10", title: "text-violet-950 dark:text-violet-100",
  },
  rose: {
    card: "border-rose-200/80 bg-gradient-to-br from-white via-rose-50/70 to-pink-50/80 hover:border-rose-300 dark:border-rose-800/60 dark:from-slate-900 dark:via-rose-950/25 dark:to-slate-900 dark:hover:border-rose-600/70",
    icon: "bg-rose-100 text-rose-700 group-hover/card:bg-rose-600 dark:bg-rose-500/15 dark:text-rose-300 dark:group-hover/card:bg-rose-600",
    accent: "bg-rose-500", glow: "bg-rose-200/50 dark:bg-rose-500/10", title: "text-rose-950 dark:text-rose-100",
  },
};

function ServiceCard({ item }) {
  const Icon = item.icon;
  const palette = palettes[item.theme];
  return (
    <article className={`group/card relative flex h-[205px] w-[285px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border p-6 shadow-[0_8px_30px_-18px_rgba(30,64,175,.13)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-2 hover:shadow-[0_22px_55px_-22px_rgba(30,64,175,.20)] dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,.45)] sm:w-[340px] ${palette.card}`}>
      <div aria-hidden="true" className={`absolute -right-12 -top-14 h-40 w-40 rounded-full blur-3xl ${palette.glow}`} />
      <div aria-hidden="true" className={`absolute inset-x-6 top-0 h-[3px] rounded-b-full opacity-70 ${palette.accent}`} />
      <div className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:text-white dark:group-hover/card:text-white ${palette.icon}`}>
        <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <h3 className={`relative text-lg font-semibold tracking-tight ${palette.title}`}>{item.title}</h3>
      <p className="relative mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
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
className={`service-marquee-track flex shrink-0 justify-around gap-[var(--gap)] pr-[var(--gap)] ${
  reduced ? "" : reverse ? "animate-service-marquee-reverse" : "animate-service-marquee"
}`}        >
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
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes service-marquee-reverse {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-service-marquee {
    animation: service-marquee var(--duration, 40s) linear infinite;
  }

  .animate-service-marquee-reverse {
    animation: service-marquee-reverse var(--duration, 40s) linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-service-marquee,
    .animate-service-marquee-reverse {
      animation: none !important;
    }
  }
`}</style>
    </section>
  );
}
