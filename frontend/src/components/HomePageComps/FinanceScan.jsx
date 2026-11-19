"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, BriefcaseBusiness, Car, Check, CheckCircle2, CircleHelp, Download, GraduationCap, HeartPulse, House, Landmark, Plane, RotateCcw, Share2, ShieldCheck, Target, TrendingUp, Wallet } from "lucide-react";

const steps = ["Personal Details", "Financial Snapshot", "Financial Protection", "Financial Goals", "Investment Preferences"];
const initial = { age:"", employment:"", dependents:"", income:"", expenses:"", savings:"", investments:"", emi:"", life:"", health:"", emergency:"", goals:[], experience:"", horizon:"", reaction:"" };
const ages = ["Under 25","25–34","35–44","45–54","55 and above"];
const jobs = ["Salaried","Business Owner","Self-Employed / Professional","Retired","Student / Other"];
const emergencyOptions = ["None","Less Than 3 Months","3–6 Months","More Than 6 Months"];
const goals = [{label:"Buy a House",icon:House},{label:"Buy a Car",icon:Car},{label:"Children's Education",icon:GraduationCap},{label:"Retirement Planning",icon:Landmark},{label:"Wealth Creation",icon:TrendingUp},{label:"International Travel",icon:Plane},{label:"Financial Independence",icon:Target}];
const experienceOptions = ["New to Investing","Some Experience — FDs / Basic Mutual Funds","Experienced — Equity / Mutual Funds"];
const horizons = ["Under 3 Years","3–7 Years","7–15 Years","15+ Years"];
const reactions = ["I would sell to avoid further losses.","I would wait and review my investments.","I would consider investing more after evaluating the situation."];
const moneyFields = [
  {key:"income",label:"Monthly Income",hint:"Your approximate monthly take-home income"},
  {key:"expenses",label:"Monthly Expenses",hint:"Exclude EMI payments and savings contributions"},
  {key:"savings",label:"Monthly Savings / Investments",hint:"Amount you regularly set aside each month"},
  {key:"investments",label:"Existing Investments",hint:"Approximate current total value, not a monthly contribution"},
  {key:"emi",label:"Monthly Loans / EMI",hint:"Total monthly loan repayments"},
];
const MAX_AMOUNT = 1_000_000_000_000;
const INR = new Intl.NumberFormat("en-IN", { maximumFractionDigits:0 });
const num = value => Number(value || 0);
const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
const rupees = value => `₹${INR.format(value)}`;
const percent = value => `${Math.round(value)}%`;
const classNames = (...values) => values.filter(Boolean).join(" ");

function calculate(data) {
  const income=num(data.income), expenses=num(data.expenses), savings=num(data.savings), emi=num(data.emi);
  const surplus=income-expenses-emi;
  const savingsRate=income>0?savings/income*100:0;
  const emiRatio=income>0?emi/income*100:(emi>0?Infinity:0);
  const consistent=savings<=Math.max(0,surplus);
  // Cash flow: 15 points; savings rate: 15 points. Inconsistent inputs cap the combined category.
  const cash=income===0 ? (expenses+emi===0?5:0) : surplus<0?0:surplus===0?5:surplus/income>=0.2?15:surplus/income>=0.1?12:9;
  const saving=income===0?0:savingsRate>=20?15:savingsRate>=10?11:savingsRate>0?6:0;
  const cashflow=clamp(consistent?cash+saving:Math.min(10,cash+saving),0,30);
  const debt=income===0&&emi>0?0:emiRatio<=20?20:emiRatio<=30?15:emiRatio<=40?10:emiRatio<=50?5:0;
  const emergency=({"None":0,"Less Than 3 Months":5,"3–6 Months":15,"More Than 6 Months":20})[data.emergency]??0;
  const coverage=v=>v==="Yes, I Have Coverage"?10:v==="Not Sure"?3:0;
  const insurance=coverage(data.life)+coverage(data.health);
  // Participation and planning only; neither longer horizons nor risk-taking earn extra points.
  const investments=clamp((num(data.investments)>0?5:0)+(data.experience!=="New to Investing"?3:0)+(data.horizon?2:0),0,10);
  const categories=[
    {label:"Savings & Cash Flow",score:cashflow,max:30},
    {label:"Debt Management",score:debt,max:20},
    {label:"Emergency Preparedness",score:emergency,max:20},
    {label:"Insurance Protection",score:insurance,max:20},
    {label:"Investment Readiness",score:investments,max:10},
  ];
  const score=categories.reduce((total,item)=>total+item.score,0);
  const classification=score<40?"Needs Attention":score<60?"Building Foundations":score<80?"On the Right Track":"Strong Foundations";
  const strengths=[], improvements=[], next=[];
  if(income>0&&surplus>0&&consistent) strengths.push("Your reported monthly cash flow is positive.");
  if(income>0&&savingsRate>=20&&consistent) strengths.push("Your reported savings rate is at least 20%.");
  if(income>0&&emiRatio<=20) strengths.push("Your EMI commitments are relatively low compared with reported income.");
  if(data.emergency==="More Than 6 Months"||data.emergency==="3–6 Months") strengths.push("You report an emergency savings buffer of at least three months.");
  if(data.health==="Yes, I Have Coverage") strengths.push("You report having health insurance; coverage adequacy still needs review.");
  if(num(data.investments)>0) strengths.push("You have already started building investments.");
  if(surplus<0) { improvements.push("Reported monthly expenses and EMI exceed income."); next.push("Review essential spending and loan obligations against income."); }
  if(!consistent) { improvements.push("Reported savings exceed the available monthly surplus."); next.push("Reconcile savings, expenses and EMI entries to create a realistic budget."); }
  if(income>0&&savingsRate<10) { improvements.push("Your reported savings rate is below 10%."); next.push("Consider a sustainable monthly savings target."); }
  if(emiRatio>40) { improvements.push("Loan repayments consume over 40% of reported income."); next.push("Review debt obligations and repayment flexibility."); }
  if(data.emergency==="None"||data.emergency==="Less Than 3 Months") { improvements.push("Your emergency savings may offer limited protection against disruptions."); next.push("Build an emergency reserve based on essential monthly costs."); }
  if(data.health!=="Yes, I Have Coverage") { improvements.push("Health insurance protection is missing or uncertain."); next.push("Review your health insurance needs and existing coverage."); }
  if(data.life!=="Yes, I Have Coverage"&&data.dependents!=="None") { improvements.push("Life insurance protection is missing or uncertain despite reported dependents."); next.push("Evaluate life insurance needs based on financial dependents and liabilities."); }
  if(data.life!=="Yes, I Have Coverage"&&data.dependents==="None") next.push("Consider whether life insurance is relevant to your personal circumstances.");
  if(!num(data.investments)) next.push("Create a plan for your selected goals before choosing investments.");
  if(data.goals.length) next.push(`Define a timeline and target amount for ${data.goals[0].toLowerCase()}.`);
  if(data.horizon==="Under 3 Years") next.push("Review whether your investment choices match your short time horizon.");
  if(!improvements.length) improvements.push("Review whether existing insurance coverage and investments remain appropriate for your needs.");
  if(!next.length) next.push("Review your financial plan periodically as your circumstances change.");
  const insights=[...improvements,...strengths].slice(0,5);
  return {score,classification,categories,surplus,savingsRate,emiRatio,consistent,strengths,improvements,next:[...new Set(next)].slice(0,4),insights};
}

function Choice({label,selected,onClick,icon:Icon,multiple=false}) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={classNames("flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800",selected?"border-blue-800 bg-blue-50 dark:bg-blue-950/60 text-blue-950 dark:text-blue-100 shadow-sm dark:border-blue-400 dark:bg-blue-950/70 dark:text-blue-100":"border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-700")}>
    {Icon&&<Icon size={19} aria-hidden="true" className={selected?"text-blue-600 dark:text-blue-400":"text-slate-400 dark:text-slate-400"}/>}
    <span className="flex-1">{label}</span>
    <span aria-hidden="true" className={classNames("flex h-5 w-5 items-center justify-center border",multiple?"rounded-md":"rounded-full",selected?"border-blue-800 bg-blue-800 text-white":"border-slate-300 dark:border-slate-500")}>{selected&&<Check size={13}/>}</span>
  </button>;
}
function Question({title,hint,children,error}) {
  return <fieldset className="space-y-3"><legend className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</legend>{hint&&<p className="text-sm text-slate-500 dark:text-slate-400">{hint}</p>}{children}{error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}</fieldset>;
}
function SummaryStat({label,value,note}) {return <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>{note&&<p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}</div>}
function ScoreCircle({score,reduced}) {
  const r=88,circumference=2*Math.PI*r;
  return <div className="relative mx-auto h-56 w-56" role="img" aria-label={`Financial wellness score ${score} out of 100`}><svg viewBox="0 0 220 220" className="h-full w-full -rotate-90" aria-hidden="true"><circle cx="110" cy="110" r={r} fill="none" stroke="#e2e8f0" strokeWidth="14"/><motion.circle cx="110" cy="110" r={r} fill="none" stroke={score<40?"#e11d48":score<60?"#d97706":score<80?"#2563eb":"#059669"} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} initial={reduced?false:{strokeDashoffset:circumference}} animate={{strokeDashoffset:circumference*(1-score/100)}} transition={{duration:1.1,ease:"easeOut"}}/></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{score}</span><span className="text-sm text-slate-500 dark:text-slate-400">out of 100</span></div></div>;
}
function Report({data,result,reduced,onRestart}) {
  const [feedback,setFeedback]=useState("");
  const summary=`Shreeji Investments — Financial Wellness Report\nScore: ${result.score}/100 (${result.classification})\n${result.categories.map(x=>`${x.label}: ${x.score}/${x.max}`).join("\n")}\nEducational estimate only; not professional financial advice.`;
  async function share() {
    try {
      if(navigator.share) {await navigator.share({title:"Financial Wellness Report",text:summary});setFeedback("Sharing completed or handed to your device.");}
      else if(navigator.clipboard?.writeText) {await navigator.clipboard.writeText(summary);setFeedback("Summary copied to clipboard.");}
      else setFeedback("Sharing is not available in this browser.");
    } catch(error) {if(error?.name!=="AbortError")setFeedback("Unable to share. Please try again.");}
  }
  function printReport(){window.print();}
  return <motion.div initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-7" id="financial-report">
    <div className="print:hidden flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Your assessment is complete</span><button type="button" onClick={onRestart} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600"><RotateCcw size={16}/> Start again</button></div>
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 shadow-sm sm:p-9">
      <div className="mb-4 text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Shreeji Investments · {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">Your Financial Wellness Report</h3><p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">Here's a snapshot of your financial strengths, potential gaps, and opportunities to improve your financial preparedness.</p></div>
      <ScoreCircle score={result.score} reduced={reduced}/><p className="mt-4 text-center text-xl font-semibold text-slate-900 dark:text-slate-100">{result.classification}</p><p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">Educational estimate · Not a validated financial rating</p>
      <div className="mt-9 space-y-5"><h4 className="text-lg font-semibold text-slate-950 dark:text-slate-50">Category breakdown</h4>{result.categories.map(item=><div key={item.label}><div className="mb-2 flex items-center justify-between gap-2 text-sm"><span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span><span className="tabular-nums text-slate-500 dark:text-slate-400">{item.score}/{item.max}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><motion.div initial={reduced?false:{width:0}} animate={{width:`${item.score/item.max*100}%`}} transition={{duration:.8}} className="h-full rounded-full bg-blue-800"/></div></div>)}</div>
      <p className="mt-7 rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-xs leading-6 text-slate-600 dark:text-slate-300">Scoring weights: Savings & Cash Flow 30, Debt Management 20, Emergency Preparedness 20, Insurance Protection 20, Investment Readiness 10. Scores use reported information only. Insurance selection does not verify adequacy; risk preference does not increase the score. The result is an illustrative educational estimate, not a professional financial diagnosis.</p>
    </div>
    <div className="grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 sm:p-7"><h4 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100"><BadgeCheck className="text-emerald-600"/> Your Financial Strengths</h4>{result.strengths.length?<ul className="mt-4 space-y-3">{result.strengths.map(t=><li key={t} className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300"><CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-600"/>{t}</li>)}</ul>:<p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No clear positive indicators were established from these answers.</p>}</div><div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 sm:p-7"><h4 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100"><CircleHelp className="text-amber-600"/> Areas Worth Reviewing</h4><ul className="mt-4 space-y-3">{result.improvements.map(t=><li key={t} className="text-sm leading-6 text-slate-600 dark:text-slate-300">• {t}</li>)}</ul></div></div>
    <div className="grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 sm:p-7"><h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Key insights</h4><ul className="mt-4 space-y-3">{result.insights.map(t=><li key={t} className="text-sm leading-6 text-slate-600 dark:text-slate-300">• {t}</li>)}</ul></div><div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 sm:p-7"><h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Personalized next steps</h4><ol className="mt-4 space-y-3">{result.next.map((t,i)=><li key={t} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><span className="font-semibold text-blue-600 dark:text-blue-400">{i+1}.</span>{t}</li>)}</ol></div></div>
    <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">This assessment is for educational purposes only. It does not assess product suitability, verify insurance coverage, or replace advice from a qualified professional. All calculations were performed locally in your browser.</p>
    <div className="print:hidden flex flex-wrap gap-3"><button type="button" onClick={printReport} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"><Download size={18}/> Print / Save as PDF</button><button type="button" onClick={share} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 px-5 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-800"><Share2 size={18}/> Share Report</button></div>{feedback&&<p role="status" className="print:hidden text-sm text-slate-600 dark:text-slate-300">{feedback}</p>}
    <div className="print:hidden rounded-3xl bg-slate-950 px-6 dark:bg-blue-950 py-10 text-center text-white sm:px-12"><h4 className="text-2xl font-semibold sm:text-3xl">Your Financial Future Deserves More Than a Score.</h4><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">Your financial scan is the starting point. Connect with Shreeji Investments to discuss your goals, understand your options, and explore your next steps.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/contact-us" className="inline-flex min-h-12 items-center rounded-xl bg-blue-50 dark:bg-blue-600 px-5 font-semibold text-white hover:bg-blue-400">Book Your Free Consultation <ArrowRight size={17} className="ml-2"/></Link><Link href="/services" className="inline-flex min-h-12 items-center rounded-xl border border-slate-600 dark:border-slate-500 px-5 font-semibold text-white hover:bg-slate-800">Explore Our Services</Link></div></div>
  </motion.div>;
}

const questions = [
  { key: "age", stage: 0, title: "Which age group are you in?", subtitle: "Your life stage helps put financial goals into context.", options: ages },
  { key: "employment", stage: 0, title: "What best describes your work?", subtitle: "Select your current employment status.", options: jobs },
  { key: "dependents", stage: 0, title: "How many people depend on you financially?", subtitle: "Include anyone who relies on your income or support.", options: ["None", "1", "2", "3", "4 or more"] },
  ...moneyFields.map(field => ({ key: field.key, stage: 1, title: field.label, subtitle: field.hint, money: true })),
  { key: "life", stage: 2, title: "Do you have life insurance?", subtitle: "A yes response does not confirm coverage is sufficient.", options: ["Yes, I Have Coverage", "No", "Not Sure"], icon: ShieldCheck },
  { key: "health", stage: 2, title: "Do you have health insurance?", subtitle: "Coverage adequacy depends on your circumstances.", options: ["Yes, I Have Coverage", "No", "Not Sure"], icon: HeartPulse },
  { key: "emergency", stage: 2, title: "How long could your emergency savings last?", subtitle: "Think in months of essential expenses.", options: emergencyOptions, icon: Wallet },
  { key: "goals", stage: 3, title: "What are your financial goals?", subtitle: "Select as many as apply. We won't assume their priority.", options: goals, multiple: true },
  { key: "experience", stage: 4, title: "How experienced are you with investing?", subtitle: "There is no right or wrong experience level.", options: experienceOptions },
  { key: "horizon", stage: 4, title: "What is your investment time horizon?", subtitle: "Choose the timeframe that best reflects your plans.", options: horizons },
  { key: "reaction", stage: 4, title: "What if your investments dropped by 15%?", subtitle: "This explores your comfort with losses, not an official risk profile.", options: reactions },
];

function FinancialGlobe({ reduced = false }) {
  const spin = reduced ? undefined : { rotate: 360 };
  return (
    <div role="img" aria-label="Shreeji Investments premium animated financial globe" className="relative mx-auto flex h-[300px] w-full max-w-[540px] items-center justify-center sm:h-[390px] xl:h-[460px]">
      <div aria-hidden="true" className="absolute h-[78%] w-[78%] rounded-full bg-blue-300/20 blur-[75px] dark:bg-blue-500/15" />
      <div aria-hidden="true" className="absolute h-[65%] w-[65%] rounded-full bg-indigo-200/20 blur-[55px] dark:bg-indigo-400/10" />
      <motion.div aria-hidden="true" className="absolute h-[91%] w-[91%] rounded-full border border-blue-200/70 dark:border-blue-500/25" style={{ rotateX: 67 }} animate={spin} transition={{ duration: 46, ease: "linear", repeat: Infinity }} />
      <motion.div aria-hidden="true" className="absolute h-[77%] w-[77%] rounded-full border border-dashed border-sky-300/60 dark:border-sky-500/25" style={{ rotateX: 64, rotate: 35 }} animate={reduced ? undefined : { rotate: -325 }} transition={{ duration: 52, ease: "linear", repeat: Infinity }} />
      <motion.div aria-hidden="true" className="relative flex aspect-square h-[66%] items-center justify-center overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_22%,#ffffff_0%,#e9f3ff_37%,#bed9f5_76%,#8eb5e0_100%)] shadow-[inset_-25px_-24px_48px_rgba(30,64,175,.16),0_26px_70px_-35px_rgba(37,99,235,.36)] dark:border-blue-300/15 dark:bg-[radial-gradient(circle_at_30%_22%,#334e78_0%,#172d50_45%,#0b1730_100%)] dark:shadow-[inset_-25px_-24px_48px_rgba(2,6,23,.55),0_26px_75px_-30px_rgba(37,99,235,.18)]" animate={reduced ? undefined : { y: [0, -7, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="pointer-events-none absolute left-[15%] top-[10%] h-[35%] w-[40%] rounded-full bg-white/50 blur-2xl dark:bg-sky-300/10" />
        <motion.svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-blue-700/35 dark:text-sky-300/35" fill="none" animate={reduced ? undefined : { x: [0, -26, 0] }} transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}>
          <circle cx="200" cy="200" r="166" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="200" cy="200" rx="62" ry="166" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="200" cy="200" rx="121" ry="166" stroke="currentColor" strokeWidth="1.3" />
          <path d="M34 200h332M63 120h274M63 280h274M95 71c55 38 155 38 210 0M95 329c55-38 155-38 210 0" stroke="currentColor" strokeWidth="1.3" />
          <path d="M48 250 120 226 166 242 224 167 271 185 348 110" stroke="#3b82f6" strokeOpacity=".38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-blue-950/10 dark:to-slate-950/35" />
      </motion.div>
      <motion.div className="absolute z-10 flex min-w-[225px] flex-col items-center rounded-2xl border border-white/80 bg-white/90 px-6 py-4 text-center shadow-[0_20px_55px_-25px_rgba(15,23,42,.28)] backdrop-blur-xl dark:border-slate-600/60 dark:bg-slate-900/90 sm:min-w-[265px] sm:px-8 sm:py-5" animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <span className="mb-2 h-0.5 w-9 rounded-full bg-gradient-to-r from-sky-300 via-blue-500 to-indigo-400" />
        <span className="text-xl font-bold tracking-[-.045em] text-slate-950 dark:text-white sm:text-2xl">Shreeji <span className="bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-indigo-300">Investments</span></span>
        <span className="mt-2 text-[10px] font-medium tracking-[.09em] text-slate-500 dark:text-slate-300 sm:text-xs">Planning Today. Securing Tomorrow.</span>
      </motion.div>
      <motion.div aria-hidden="true" className="absolute left-[7%] top-[18%] flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white/90 text-blue-700 shadow-[0_12px_32px_-15px_rgba(30,58,138,.25)] backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/90 dark:text-sky-300" animate={reduced ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><TrendingUp size={23} strokeWidth={1.7} /></motion.div>
      <motion.div aria-hidden="true" className="absolute bottom-[16%] right-[8%] flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white/90 text-blue-700 shadow-[0_12px_32px_-15px_rgba(30,58,138,.25)] backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/90 dark:text-sky-300" animate={reduced ? undefined : { y: [0, 9, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}><ShieldCheck size={23} strokeWidth={1.7} /></motion.div>
      <div aria-hidden="true" className="absolute bottom-[8%] left-[16%] h-1.5 w-1.5 rounded-full bg-sky-400/70 shadow-[0_0_14px_4px_rgba(56,189,248,.15)]" />
      <div aria-hidden="true" className="absolute right-[17%] top-[10%] h-2 w-2 rounded-full bg-blue-400/50 shadow-[0_0_14px_4px_rgba(96,165,250,.12)]" />
    </div>
  );
}

export default function FinanceScan() {
  const [index, setIndex] = useState(-1);
  const [data, setData] = useState(initial);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const reduced = useReducedMotion();
  const snapshot = useMemo(() => calculate(data), [data]);
  const question = questions[index];
  const button = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950";

  function update(key, value) {
    setData(previous => ({ ...previous, [key]: value }));
    setError("");
  }
  function toggleGoal(goal) {
    update("goals", data.goals.includes(goal) ? data.goals.filter(g => g !== goal) : [...data.goals, goal]);
  }
  function amountChange(key, value) {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    if (digits === "" || Number(digits) <= MAX_AMOUNT) update(key, digits);
  }
  function validateCurrent() {
    if (!question) return false;
    const value = data[question.key];
    if (question.multiple && value.length === 0) { setError("Select at least one goal to continue."); return false; }
    if (question.money && (value === "" || !Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > MAX_AMOUNT)) {
      setError("Enter a valid amount, including ₹0 if applicable."); return false;
    }
    if (!question.money && !question.multiple && value === "") { setError("Choose an option to continue."); return false; }
    if (question.key === "savings" && Number(value) > Math.max(0, snapshot.surplus)) {
      setError("Savings exceed your available monthly surplus. Review your entries before continuing."); return false;
    }
    return true;
  }
  function advance() {
    if (!validateCurrent()) return;
    setError("");
    if (index === questions.length - 1) {
      setReport(calculate(data));
      setIndex(questions.length);
    } else setIndex(i => i + 1);
  }
  function back() { setError(""); setIndex(i => i - 1); }
  function restart() { setData(initial); setError(""); setReport(null); setIndex(-1); }

  return (
    <>
      <style jsx global>{`@media print { html.dark #financial-report { color-scheme: light !important; } #financial-report { background: white !important; color: #0f172a !important; } body * { visibility: hidden !important; } #financial-report, #financial-report * { visibility: visible !important; } #financial-report { position: absolute !important; inset: 0 auto auto 0; width: 100%; } #financial-report .print\\:hidden, #financial-report .print\\:hidden * { display: none !important; } #financial-report > div { break-inside: avoid; } }`}</style>
      <section id="financial-health-scan" aria-label="Financial health scan" className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#fcfdff] dark:bg-slate-950 px-5 py-4 text-slate-900 dark:text-slate-100 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(219,234,254,.35),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_20%,rgba(37,99,235,.12),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          {index === -1 ? (
            <motion.div initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid min-h-[min(760px,calc(100svh-8rem))] w-full items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
              <div className="max-w-2xl text-center lg:text-left">
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">Your Financial Wellness Starts Here</p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-[4.25rem]">How Healthy Are Your <span className="text-blue-800 dark:text-blue-300">Finances?</span></h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">Discover where you stand financially, identify potential gaps, and take the first step toward a more confident financial future.</p>
              <button type="button" onClick={() => setIndex(0)} className={`${button} mt-8 w-full sm:w-auto`}>Start My Financial Scan <ArrowRight size={18} /></button>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">About 3–5 minutes · Free · No account required</p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-400">Your answers are processed locally in your browser.</p>
              </div>
              <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[min(500px,calc(100svh-9rem))]">
                <FinancialGlobe reduced={reduced} />
                <p className="absolute bottom-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-800/70">Your financial world, in focus</p>
              </div>
            </motion.div>
          ) : index === questions.length && report ? (
            <div><h2 className="sr-only">Financial wellness report</h2><Report data={data} result={report} reduced={reduced} onRestart={restart} /></div>
          ) : (
            <div className="grid w-full items-center gap-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
              <div className="w-full min-w-0 max-w-[560px] rounded-[1.75rem] border border-slate-200 dark:border-slate-700/80 bg-white dark:border-slate-700 dark:bg-slate-900 p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,.16)] sm:p-5 lg:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800 dark:text-blue-300">{steps[question.stage]}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Question {index + 1} of {questions.length}</p></div>
                <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-sm font-semibold tabular-nums text-blue-900 dark:text-blue-200">{Math.round((index / questions.length) * 100)}%</span>
              </div>
              <div role="progressbar" aria-label="Financial scan progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index} className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <motion.div animate={{ width: `${(index / questions.length) * 100}%` }} transition={{ duration: reduced ? 0 : 0.35 }} className="h-full rounded-full bg-blue-800" />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={question.key} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -20 }} transition={{ duration: reduced ? 0 : 0.25 }} className="w-full">
                  <div className="mb-4 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"><Target size={21} strokeWidth={1.7} /></div>
                    <h2 className="text-xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">{question.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{question.subtitle}</p>
                  </div>
                  {question.money ? (
                    <div className="mx-auto max-w-md">
                      <label htmlFor={`scan-${question.key}`} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Amount in Indian Rupees</label>
                      <div className="relative"><span aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-400 dark:text-slate-400">₹</span><input id={`scan-${question.key}`} inputMode="numeric" autoComplete="off" value={data[question.key] === "" ? "" : INR.format(num(data[question.key]))} onChange={e => amountChange(question.key, e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); advance(); } }} placeholder="0" aria-invalid={!!error} aria-describedby={error ? "scan-question-error" : undefined} className="h-14 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 pr-5 text-3xl font-semibold text-slate-950 dark:text-slate-50 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50" /></div>
                      {question.key === "expenses" && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Exclude EMI and savings contributions to avoid double counting.</p>}
                      {question.key === "savings" && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Available monthly surplus: {rupees(snapshot.surplus)}. This is not assumed to equal your savings.</p>}
                      {question.key === "emi" && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Monthly surplus: {rupees(snapshot.surplus)} · Savings rate: {num(data.income) > 0 ? percent(snapshot.savingsRate) : "N/A"} · EMI ratio: {num(data.income) > 0 ? percent(snapshot.emiRatio) : "N/A"}</p>}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2" role="group" aria-label={question.title}>
                      {question.options.map(option => {
                        const label = typeof option === "string" ? option : option.label;
                        const Icon = typeof option === "string" ? question.icon : option.icon;
                        const selected = question.multiple ? data.goals.includes(label) : data[question.key] === label;
                        return <Choice key={label} label={label} icon={Icon} multiple={question.multiple} selected={selected} onClick={() => question.multiple ? toggleGoal(label) : update(question.key, label)} />;
                      })}
                    </div>
                  )}
                  {question.multiple && <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">{data.goals.length} selected · Select all that apply</p>}
                  {error && <p id="scan-question-error" role="alert" className="mt-5 text-center text-sm font-medium text-rose-700">{error}</p>}
                </motion.div>
              </AnimatePresence>
              <div className="mx-auto mt-5 flex max-w-2xl flex-col-reverse justify-between gap-3 border-t border-slate-100 dark:border-slate-700 pt-4 sm:flex-row">
                <button type="button" onClick={back} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:border-slate-700 dark:bg-slate-900 px-6 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition duration-200 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-slate-800"><ArrowLeft size={17} /> Back</button>
                <button type="button" onClick={advance} className={button}>{index === questions.length - 1 ? "Scan My Finances" : "Continue"} <ArrowRight size={17} /></button>
              </div>
              </div>
              <aside aria-label="Shreeji Investments financial globe" className="relative flex min-h-[310px] items-center justify-center lg:min-h-[min(500px,calc(100svh-9rem))]">
                <FinancialGlobe reduced={reduced} />
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
