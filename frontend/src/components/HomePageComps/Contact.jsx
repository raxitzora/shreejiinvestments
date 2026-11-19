"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3, MapPin, Mail, MessageCircle, Send, ShieldCheck } from "lucide-react";

// Set the verified business email before enabling email enquiries.
const CONTACT_EMAIL = "";

const details = [
  { icon: Clock3, title: "Availability", value: "24/7", note: "Reach out at any time; response times may vary." },
  { icon: MapPin, title: "Our presence", value: "Gujarat, India", note: "Contact us for the appropriate office address." },
  { icon: ShieldCheck, title: "Registration", value: "ARN 249212", note: "AMFI-registered mutual fund distributor." },
];

const fields = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", placeholder: "you@example.com", autoComplete: "email" },
  { name: "phone", label: "Phone number (optional)", type: "tel", placeholder: "+91", autoComplete: "tel" },
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "Mutual Funds", message: "" });
  const [notice, setNotice] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (notice) setNotice("");
  };

  const submit = (event) => {
    event.preventDefault();
    if (!CONTACT_EMAIL) {
      setNotice("Email enquiries are not configured yet. Please add the verified business email in Contact.jsx.");
      return;
    }
    const subject = `Shreeji Investments enquiry: ${form.topic}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Interested in: ${form.topic}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app should open with a prepared enquiry. Please send it from there.");
  };

  return (
    <section id="contact-us" aria-labelledby="contact-heading" className="relative isolate overflow-hidden bg-[#fcfdff] px-5 py-20 text-slate-900 scroll-mt-20 sm:px-8 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_20%,rgba(191,219,254,.4),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(219,234,254,.5),transparent_45%)]" />
      <div className="mx-auto max-w-7xl">
        <motion.div initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ duration: 0.55 }} className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-800">Contact Shreeji Investments</p>
          <h2 id="contact-heading" className="mt-5 text-balance text-4xl font-bold leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
            Your financial questions, <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">our attention.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Have a question about mutual funds or long-term investing? Tell us what you would like to discuss, and connect with the Shreeji Investments team.</p>
        </motion.div>

        <div className="mt-12 grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="space-y-4">
            {details.map(({ icon: Icon, title, value, note }, index) => (
              <motion.div key={title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.09 }} whileHover={reduced ? undefined : { y: -5, scale: 1.015 }} className="group flex items-start gap-4 rounded-[1.5rem] border border-blue-100/80 bg-white/85 p-5 shadow-[0_10px_35px_-25px_rgba(30,64,175,.3)] transition-colors hover:border-blue-300 sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 transition-colors group-hover:bg-blue-900 group-hover:text-white"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{title}</p><h3 className="mt-1 text-xl font-semibold text-blue-950">{value}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{note}</p></div>
              </motion.div>
            ))}
            <div className="rounded-[1.5rem] bg-blue-950 p-6 text-white sm:p-7">
              <MessageCircle size={25} className="text-blue-200" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">A conversation starts here.</h3>
              <p className="mt-2 text-sm leading-7 text-blue-100/85">We welcome enquiries from first-time and experienced investors alike.</p>
              {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-blue-300 underline-offset-4 hover:text-blue-200"><Mail size={16} /> Email our team <ArrowUpRight size={16} /></a>}
            </div>
          </div>

          <motion.form onSubmit={submit} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }} className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_25px_80px_-45px_rgba(30,64,175,.24)] sm:p-9 lg:p-10">
            <div className="mb-7 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white"><Send size={19} /></span><div><h3 className="text-xl font-semibold text-slate-950">Send an enquiry</h3><p className="text-sm text-slate-500">Fill in the details below.</p></div></div>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => <label key={field.name} className={field.name === "phone" ? "sm:col-span-2" : ""}><span className="mb-2 block text-sm font-semibold text-slate-800">{field.label}</span><input required={field.name !== "phone"} name={field.name} type={field.type} autoComplete={field.autoComplete} value={form[field.name]} onChange={update} placeholder={field.placeholder} maxLength={field.name === "name" ? 100 : 254} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" /></label>)}
              <label className="sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-slate-800">I am interested in</span><select name="topic" value={form.topic} onChange={update} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">{["Mutual Funds", "Insurance", "Tax Planning", "Direct Equity", "Financial Planning", "General Enquiry"].map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></label>
              <label className="sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-slate-800">Your message</span><textarea required name="message" value={form.message} onChange={update} rows={5} maxLength={2000} placeholder="Tell us how we can help..." className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">Prepare email enquiry <ArrowUpRight size={18} /></button>
            {notice && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm leading-6 text-blue-900">{notice}</p>}
            <p className="mt-4 text-xs leading-5 text-slate-500">This form prepares an email in your email app; it does not submit information to a server. Please avoid sharing sensitive financial or identity documents here.</p>
          </motion.form>
        </div>
        <p className="mt-10 text-center text-xs leading-6 text-slate-500">Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
      </div>
    </section>
  );
}
