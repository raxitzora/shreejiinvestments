"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight, BadgeCheck, Clock3, Compass, Landmark,
  MapPin, ShieldCheck, Target, TrendingUp,
} from "lucide-react";

const items = [
  { title: "Mutual Funds", icon: Landmark, detail: "Explore mutual fund options aligned with your financial goals and investment horizon." },
  { title: "Long-Term Investing", icon: TrendingUp, detail: "Take a disciplined, long-term approach to investing with your future in mind." },
  { title: "24/7 Availability", icon: Clock3, detail: "Connect with the Shreeji Investments team whenever you need assistance." },
  { title: "Gujarat Offices", icon: MapPin, detail: "Meet and connect with our team through our offices in Gujarat." },
  { title: "AMFI Registered", icon: BadgeCheck, detail: "AMFI-registered mutual fund distributor, ARN 249212." },
];

const spring = { stiffness: 210, damping: 19, mass: 0.18 };
const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

function ServiceCard({ item, mouseX, mouseY, reduced }) {
  const ref = useRef(null);
  const Icon = item.icon;
  // Measure the untransformed layout position to prevent feedback jitter.
  const distance = useTransform([mouseX, mouseY], ([x, y]) => {
    const node = ref.current;
    if (!node || !Number.isFinite(x) || !Number.isFinite(y)) return 1000;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.hypot(x - cx, y - cy);
  });
  const scale = useSpring(useTransform(distance, [0, 130, 310, 470], [1.14, 1.09, 1.035, 1]), spring);
  const lift = useSpring(useTransform(distance, [0, 130, 310, 470], [-22, -13, -5, 0]), spring);
  const iconScale = useSpring(useTransform(distance, [0, 130, 310, 470], [1.3, 1.18, 1.05, 1]), spring);
  const glow = useSpring(useTransform(distance, [0, 130, 310, 470], [1, 0.7, 0.25, 0]), spring);

  return (
    <motion.article
      ref={ref}
      tabIndex={0}
      style={reduced ? undefined : { scale, y: lift }}
      whileFocus={reduced ? undefined : { scale: 1.08, y: -12 }}
      className="group relative isolate flex min-h-[225px] flex-col rounded-[1.5rem] border border-blue-100/80 bg-white/95 dark:border-slate-700 dark:bg-slate-900/95 p-5 shadow-[0_8px_30px_-18px_rgba(30,64,175,.2)] outline-none transition-[border-color,box-shadow,background-color] duration-300 hover:z-20 hover:border-blue-400 hover:bg-white dark:hover:border-blue-500 dark:hover:bg-slate-800 hover:shadow-[0_28px_65px_-22px_rgba(30,64,175,.35)] focus-visible:z-20 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950 sm:p-6"
    >
      <motion.div aria-hidden="true" style={reduced ? undefined : { opacity: glow }} className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(circle_at_30%_0%,rgba(147,197,253,.45),transparent_75%)] dark:bg-[radial-gradient(circle_at_30%_0%,rgba(37,99,235,.25),transparent_75%)]" />
      <motion.div style={reduced ? undefined : { scale: iconScale }} className="mb-5 flex h-12 w-12 origin-center items-center justify-center rounded-2xl bg-blue-50 text-blue-900 dark:bg-blue-500/15 dark:text-blue-300 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white group-focus-visible:bg-blue-900 group-focus-visible:text-white dark:group-focus-visible:bg-blue-500">
        <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
      </motion.div>
      <h3 className="text-base font-semibold tracking-tight text-blue-950 dark:text-slate-100 sm:text-lg">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
      <div aria-hidden="true" className="mt-auto pt-5"><span className="block h-0.5 w-9 rounded-full bg-blue-200 dark:bg-blue-700 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-700 dark:group-hover:bg-blue-400 group-focus-visible:w-16 group-focus-visible:bg-blue-700 dark:group-focus-visible:bg-blue-400" /></div>
    </motion.article>
  );
}

function SectionHeading({ eyebrow, title, accent, description, id }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      transition={{ duration: 0.65 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800 dark:text-blue-300">{eyebrow}</p>
      <h2 id={id} className="mt-5 text-balance text-4xl font-bold leading-tight tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
        {title} <span className="text-blue-800 dark:text-blue-300">{accent}</span>
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{description}</p>
    </motion.div>
  );
}

function Principle({ icon: Icon, title, description, index = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={reduced ? undefined : { y: -8, scale: 1.025 }}
      className="group rounded-[1.75rem] border border-blue-100 bg-white dark:border-slate-700 dark:bg-slate-900 p-7 shadow-[0_15px_45px_-30px_rgba(30,64,175,.3)] transition-colors hover:border-blue-300 dark:hover:border-blue-500 sm:p-8"
    >
      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 p-3 text-blue-900 transition-colors group-hover:bg-blue-900 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /></div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-blue-950 dark:text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{description}</p>
    </motion.article>
  );
}

export default function AboutUs() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <>
      <section id="about-us" aria-labelledby="about-us-heading" className="relative isolate flex min-h-[min(820px,100svh)] scroll-mt-20 flex-col items-center justify-between bg-[#fcfdff] dark:bg-slate-950 px-5 pb-12 pt-20 text-slate-900 dark:text-slate-100 sm:px-8 sm:pt-24 lg:px-12 lg:pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(ellipse_at_50%_38%,rgba(219,234,254,.55),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_38%,rgba(30,58,138,.25),transparent_60%)]" />
        <motion.div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[40%] -z-10 h-64 w-64 -translate-x-1/2 rounded-full border border-blue-200/50 dark:border-blue-500/20 sm:h-96 sm:w-96" animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 45, ease: "linear", repeat: Infinity }}><span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-blue-500" /></motion.div>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
          <motion.p initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800 dark:text-blue-300">About Shreeji Investments</motion.p>
          <motion.h2 id="about-us-heading" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }} className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.12] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl lg:text-[4.5rem]">
            Invest with clarity.
            <span className="block bg-gradient-to-r from-blue-950 via-blue-600 to-blue-900 dark:from-blue-200 dark:via-blue-400 dark:to-blue-200 bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[shimmer_7s_ease-in-out_infinite]">Think long term.</span>
          </motion.h2>
          <motion.p initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-7 max-w-2xl text-pretty text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Shreeji Investments is an AMFI-registered mutual fund distributor (ARN 249212) with offices in Gujarat. We offer mutual fund distribution services and support a disciplined, long-term approach to investing, with 24/7 availability to connect.
          </motion.p>
          <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.26 }} className="mt-8">
            <Link href="/contact-us" className="inline-flex min-h-11 items-center rounded-full border border-blue-200 bg-white/85 px-6 text-sm font-semibold text-blue-900 dark:border-slate-600 dark:bg-slate-800/90 dark:text-blue-200 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:hover:border-blue-400 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 dark:focus-visible:outline-blue-400">Connect with us <ArrowUpRight size={16} className="ml-2" /></Link>
          </motion.div>
        </div>
        <div className="relative z-10 mt-12 flex w-full max-w-6xl flex-col items-center gap-7">
          <div aria-label="Shreeji Investments services and credentials" className="grid w-full grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4" onPointerMove={(event) => { if (!reduced && event.pointerType === "mouse") { mouseX.set(event.clientX); mouseY.set(event.clientY); } }} onPointerLeave={() => { mouseX.set(Infinity); mouseY.set(Infinity); }}>
            {items.map((item) => <ServiceCard key={item.title} item={item} mouseX={mouseX} mouseY={mouseY} reduced={reduced} />)}
          </div>
          <p className="max-w-xl text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400">Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
        </div>
      </section>

      <section id="our-mission" aria-labelledby="mission-heading" className="relative scroll-mt-20 overflow-hidden bg-white dark:bg-slate-950 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading id="mission-heading" eyebrow="Our Mission" title="Make investing" accent="more approachable." description="Our mission is to help people explore mutual fund investing with greater clarity, practical support, and a focus on their long-term financial goals." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Principle icon={Compass} title="Clarity first" description="Explain mutual fund choices in a way that helps investors understand their options and investment horizons." index={0} />
            <Principle icon={Target} title="Goals in focus" description="Keep individual financial goals and long-term planning at the center of every conversation." index={1} />
            <Principle icon={Clock3} title="Accessible support" description="Stay available to connect and help investors navigate questions along their journey." index={2} />
          </div>
        </div>
      </section>



      <section id="our-achievements" aria-labelledby="achievements-heading" className="relative scroll-mt-20 bg-white dark:bg-slate-950 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="achievements-heading" eyebrow="Our Achievements" title="The foundations of" accent="our journey." description="A few established facts about Shreeji Investments and the services we provide. We believe credibility begins with transparency." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Principle icon={BadgeCheck} title="ARN 249212" description="Registered with AMFI as a mutual fund distributor under ARN 249212." index={0} />
            <Principle icon={MapPin} title="Presence in Gujarat" description="Offices in Gujarat provide a local point of contact for clients." index={1} />
            <Principle icon={ShieldCheck} title="24/7 availability" description="Clients can reach out to connect with the team around the clock." index={2} />
          </div>
          <p className="mt-10 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">AMFI registration identifies a mutual fund distributor, not a SEBI-registered investment adviser. Mutual fund investments are subject to market risks.</p>
        </div>
      </section>
      <style jsx global>{`@keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
    </>
  );
}
