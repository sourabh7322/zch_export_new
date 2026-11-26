"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2, Building2, ShieldCheck } from "lucide-react";
import { COMPANY_STATS, type StatItem } from "@/data/siteData";
import { staggerContainerVariants, staggerItemVariants } from "./MotionPrimitives";

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  experience: Clock,
  clients: Building2,
  destinations: Globe2,
  commitment: ShieldCheck,
};

function StatValueDisplay({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayCount, setDisplayCount] = useState<number>(0);

  // Animate counters ONLY when verifiedNumericValue is actually provided
  useEffect(() => {
    if (!inView || item.verifiedNumericValue === undefined) return;
    const target = item.verifiedNumericValue;
    const duration = 1200;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, item.verifiedNumericValue]);

  if (item.verifiedNumericValue !== undefined) {
    return (
      <span ref={ref} className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
        {displayCount.toLocaleString()}
        {item.suffix ?? ""}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="font-display text-xl font-semibold tracking-tight text-[#F8FAFC] sm:text-2xl"
    >
      {item.placeholderValue}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      id="stats"
      aria-label="Company overview metrics"
      className="relative z-20 -mt-12 px-4 sm:-mt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/15 bg-[#0C1B29]/88 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10"
        >
          {COMPANY_STATS.map((item) => {
            const Icon = STAT_ICONS[item.id] ?? ShieldCheck;
            return (
              <motion.div
                key={item.id}
                variants={staggerItemVariants}
                className="group relative flex flex-col justify-between p-6 transition-colors duration-300 hover:bg-[#102233]/85 sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-[#C87535] to-[#E58A45] transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A7B4C2]">
                    {item.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C87535]/35 bg-[#C87535]/10 text-[#E58A45] shadow-[0_0_16px_rgba(200,117,53,0.18)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-4">
                  <StatValueDisplay item={item} />
                  <p className="mt-1.5 text-xs text-[#A7B4C2]/80">{item.helperNote}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

