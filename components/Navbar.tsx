"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07111B]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          : "bg-gradient-to-b from-[#07111B]/80 via-[#07111B]/35 to-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#C87535] via-[#E58A45] to-[#087CFF]"
        style={{ scaleX }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Actual Company Logo Asset */}
        <a
          href="#home"
          onClick={() => handleLinkClick("#home")}
          className="group relative flex items-center shrink-0 rounded-xl bg-white/95 px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/25 transition-transform duration-300 hover:scale-[1.02]"
          aria-label="DCHIND EXPORTS — Return to top"
        >
          <Image
            src="/images/dchind-logo.jpg"
            alt="DCHIND EXPORTS logo"
            width={156}
            height={52}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#F8FAFC]"
                    : "text-[#A7B4C2] hover:text-[#F8FAFC]"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#C87535] to-[#E58A45] transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#inquiry"
            onClick={() => handleLinkClick("#inquiry")}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#C87535] to-[#E58A45] px-4 py-2.5 text-sm font-semibold text-[#07111B] shadow-[0_6px_24px_rgba(200,117,53,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(229,138,69,0.5)]"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex xl:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#0C1B29]/80 text-[#F8FAFC] transition-colors hover:border-[#C87535]/60 hover:text-[#E58A45]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#07111B]/95 backdrop-blur-2xl xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-[#102233] text-[#E58A45] border border-[#C87535]/35"
                            : "text-[#A7B4C2] hover:bg-[#0C1B29] hover:text-[#F8FAFC]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="#inquiry"
                  onClick={() => handleLinkClick("#inquiry")}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C87535] to-[#E58A45] px-5 py-3 text-base font-semibold text-[#07111B]"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

