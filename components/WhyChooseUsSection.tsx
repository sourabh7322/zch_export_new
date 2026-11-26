"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Handshake,
  TrendingUp,
  MessageSquareCheck,
  ShipWheel,
} from "lucide-react";
import { WHY_CHOOSE_ITEMS } from "@/data/siteData";
import {
  SectionHeader,
  staggerContainerVariants,
  staggerItemVariants,
} from "./MotionPrimitives";

const WHY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "quality-focused": Award,
  "reliable-partnerships": Handshake,
  "competitive-approach": TrendingUp,
  "efficient-communication": MessageSquareCheck,
  "export-coordination": ShipWheel,
};

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#07111B] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[#C87535]/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="COMMERCIAL ADVANTAGE"
          title="Why Choose DCHIND EXPORTS"
          description="Built around disciplined sourcing, clear communication, and consistent export execution for international metal buyers."
          align="center"
        />

        {/* Responsive 6-column bento layout: 3 items top row, 2 balanced wide cards bottom row */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = WHY_ICONS[item.id] ?? Award;
            const spanClass = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";

            return (
              <motion.div
                key={item.id}
                variants={staggerItemVariants}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#102233] to-[#0C1B29] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C87535]/60 hover:shadow-[0_22px_54px_rgba(200,117,53,0.16)] ${spanClass}`}
              >
                {/* Subtle Radial Hover Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C87535]/10 blur-2xl transition-opacity duration-300 group-hover:bg-[#E58A45]/20"
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C87535]/40 bg-[#C87535]/12 text-[#E58A45] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#C87535] group-hover:text-[#07111B]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#A7B4C2]/60">
                    {item.metricTag}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-bold text-[#F8FAFC]">
                  {item.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-[#A7B4C2]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

