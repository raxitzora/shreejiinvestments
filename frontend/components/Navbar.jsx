"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";

const MotionLink = motion(Link);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Why Choose Us", href: "/#why-choose-us" },
  {
    name: "About Us",
    href: "/#about-us",
    children: [
      { name: "Mission & Vision", href: "/#our-mission" },
      { name: "Our Achievements", href: "/#our-achievements" },
    ],
  },
  { name: "Services", href: "/#services" },
  { name: "Investor Corner", href: "/#investor-corner" },
  { name: "Contact Us", href: "/#contact-us" },
];

const spring = { type: "spring", stiffness: 380, damping: 30 };
const allSections = navLinks.flatMap((link) => [link, ...(link.children || [])])
  .filter((link) => link.href.startsWith("/#"));

function parentHref(href) {
  const parent = navLinks.find((link) =>
    link.href === href || link.children?.some((child) => child.href === href)
  );
  return parent?.href || href;
}

function ThemeButton({ mobile = false, darkMode, themeReady, toggleTheme }) {
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      disabled={!themeReady}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      title={darkMode ? "Light mode" : "Dark mode"}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-950 transition-colors hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-100 dark:hover:bg-slate-700 ${mobile ? "ml-auto" : ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={darkMode ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -50, scale: 0.65 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 50, scale: 0.65 }}
          transition={{ duration: 0.2 }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileLink, setExpandedMobileLink] = useState(null);
  const scrollLockRef = useRef(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setExpandedMobileLink(null);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    setOpenDropdown(null);
    setHoveredLink(null);
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const stored = localStorage.getItem("shreeji-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = stored === "dark" || (stored === null && prefersDark);
    document.documentElement.classList.toggle("dark", enabled);
    document.documentElement.style.colorScheme = enabled ? "dark" : "light";
    setDarkMode(enabled);
    setThemeReady(true);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("shreeji-theme", next ? "dark" : "light");
    setDarkMode(next);
  };

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = null;
    const updateActive = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const lock = scrollLockRef.current;
        if (lock) {
          if (Math.abs(window.scrollY - lock.top) > 8 && performance.now() < lock.until) return;
          scrollLockRef.current = null;
        }
        const sections = allSections
          .map(({ href }) => ({ href, el: document.getElementById(href.slice(2)) }))
          .filter(({ el }) => el)
          .map(({ href, el }) => ({ href, top: el.getBoundingClientRect().top + window.scrollY }))
          .sort((a, b) => a.top - b.top);
        const position = window.scrollY + 160;
        let current = "/";
        for (const section of sections) {
          if (section.top <= position) current = section.href;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && sections.length) {
          current = sections[sections.length - 1].href;
        }
        setActiveSection(parentHref(current));
      });
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const isActive = (link) => {
    if (pathname !== "/") return link.href !== "/" && !link.href.includes("#") && (pathname === link.href || pathname.startsWith(`${link.href}/`));
    return activeSection === link.href;
  };

  const handleAnchorClick = (event, href) => {
    if (href === "/") {
      setActiveSection("/");
      if (pathname === "/") {
        event.preventDefault();
        scrollLockRef.current = { top: 0, until: performance.now() + 1500 };
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        window.history.replaceState(null, "", "/");
      }
      return;
    }
    if (!href.startsWith("/#")) return;
    setActiveSection(parentHref(href));
    if (pathname !== "/") return;
    const target = document.getElementById(decodeURIComponent(href.slice(2)));
    if (!target) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 104);
    scrollLockRef.current = { top: targetTop, until: performance.now() + 1800 };
    window.scrollTo({ top: targetTop, behavior: reducedMotion ? "instant" : "smooth" });
    window.history.replaceState(null, "", href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="relative mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <Link href="/" onClick={(event) => { handleAnchorClick(event, "/"); closeMobileMenu(); }} className="relative z-50 flex shrink-0 items-center" aria-label="Shreeji Investments home">
          <Image src="/images/shreeji-logo.png" alt="Shreeji Investments" width={200} height={70} priority className="h-auto w-40 object-contain sm:w-44" />
        </Link>

        <div className="hidden items-center gap-1 xl:flex" onMouseLeave={() => { setHoveredLink(null); setOpenDropdown(null); }}>
          {navLinks.map((link) => {
            const active = isActive(link);
            const highlighted = hoveredLink === link.href || (!hoveredLink && active);
            return (
              <div key={link.href} className="relative" onMouseEnter={() => { setHoveredLink(link.href); setOpenDropdown(link.children ? link.href : null); }} onFocus={() => { setHoveredLink(link.href); setOpenDropdown(link.children ? link.href : null); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setHoveredLink(null); setOpenDropdown(null); } }}>
                <MotionLink href={link.href} onClick={(event) => handleAnchorClick(event, link.href)} aria-current={active ? (link.href === "/" ? "page" : "location") : undefined} aria-haspopup={link.children ? "true" : undefined} aria-expanded={link.children ? openDropdown === link.href : undefined} whileTap={{ scale: 0.96 }} transition={spring} className={`relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-3 text-[16px] font-semibold tracking-[-0.02em] transition-colors duration-200 ${active || highlighted ? "text-blue-950 dark:text-blue-100" : "text-slate-600 hover:text-blue-950 dark:text-slate-300 dark:hover:text-white"}`}>
                  {highlighted && <motion.span layoutId="navbar-active-border" className="absolute inset-0 -z-10 rounded-full border border-blue-200/80 bg-blue-50/90 shadow-sm dark:border-blue-800 dark:bg-blue-950/70" transition={spring} />}
                  <span>{link.name}</span>
                  {link.children && <ChevronDown size={17} strokeWidth={2} className={`transition-transform duration-300 ${openDropdown === link.href ? "rotate-180" : ""}`} />}
                </MotionLink>
                <AnimatePresence>
                  {link.children && openDropdown === link.href && (
                    <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} className="absolute left-0 top-full z-50 w-64 pt-3">
                      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_16px_50px_-15px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900">
                        {link.children.map((child) => (
                          <MotionLink key={child.href} href={child.href} onClick={(event) => { handleAnchorClick(event, child.href); setOpenDropdown(null); setHoveredLink(null); }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }} className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-950 focus-visible:bg-blue-50 focus-visible:text-blue-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
                            <span>{child.name}</span><span className="text-blue-800 transition-transform group-hover:translate-x-1 dark:text-blue-300">→</span>
                          </MotionLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeButton darkMode={darkMode} themeReady={themeReady} toggleTheme={toggleTheme} />
          <MotionLink href="/#contact-us" onClick={(event) => handleAnchorClick(event, "/#contact-us")} whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(30, 58, 138, 0.2)" }} whileTap={{ scale: 0.96 }} transition={spring} className="inline-flex items-center justify-center rounded-full bg-blue-950 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-900 dark:bg-blue-700">
            Get in Touch <span className="ml-2 text-lg leading-none">↗</span>
          </MotionLink>
        </div>

        <div className="ml-auto mr-3 xl:hidden"><ThemeButton mobile darkMode={darkMode} themeReady={themeReady} toggleTheme={toggleTheme} /></div>
        <motion.button type="button" whileTap={{ scale: 0.88 }} onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 xl:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={mobileMenuOpen ? "close" : "menu"} initial={{ opacity: 0, rotate: -45, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 45, scale: 0.7 }} transition={{ duration: 0.18 }}>
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="absolute left-0 right-0 top-full max-h-[calc(100dvh-88px)] overflow-y-auto border-b border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 xl:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-7 pt-4 sm:px-8">
                {navLinks.map((link, index) => {
                  const active = isActive(link);
                  const expanded = expandedMobileLink === link.href;
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                      <div className="flex items-center gap-1">
                        <MotionLink href={link.href} onClick={(event) => { handleAnchorClick(event, link.href); closeMobileMenu(); }} aria-current={active ? (link.href === "/" ? "page" : "location") : undefined} whileTap={{ scale: 0.98 }} className={`flex-1 rounded-xl px-4 py-3.5 text-[16px] font-semibold transition-colors ${active ? "bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-100" : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}>{link.name}</MotionLink>
                        {link.children && (
                          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setExpandedMobileLink(expanded ? null : link.href)} aria-label={`${expanded ? "Collapse" : "Expand"} ${link.name}`} aria-expanded={expanded} className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                            <ChevronDown size={20} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                          </motion.button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {link.children && expanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                            <div className="ml-5 mt-1 space-y-1 border-l-2 border-blue-100 py-2 pl-4 dark:border-slate-700">
                              {link.children.map((child) => (
                                <Link key={child.href} href={child.href} onClick={(event) => { handleAnchorClick(event, child.href); closeMobileMenu(); }} className="block rounded-lg px-3 py-3 text-[15px] font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">{child.name}</Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                <MotionLink href="/#contact-us" onClick={(event) => { handleAnchorClick(event, "/#contact-us"); closeMobileMenu(); }} whileTap={{ scale: 0.97 }} className="mt-4 flex items-center justify-center rounded-full bg-blue-950 px-6 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-blue-900 dark:bg-blue-700">Get in Touch <span className="ml-2">↗</span></MotionLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
