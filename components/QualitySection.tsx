"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { QUALITY_HIGHLIGHT_CARD, QUALITY_PILLARS } from "@/data/siteData";
import {
  SectionHeader,
  RevealBlock,
  staggerContainerVariants,
  staggerItemVariants,
} from "./MotionPrimitives";

const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "material-inspection": SearchCheck,
  "quality-verification": ShieldCheck,
  "consistent-specs": SlidersHorizontal,
  "documentation-compliance": FileCheck2,
};

export function QualitySection() {
  return (
    <section
      id="quality"
      className="relative overflow-hidden bg-[#07111B] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-10 h-[380px] w-[380px] rounded-full bg-[#087CFF]/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Visual Column */}
          <RevealBlock className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#087CFF]/45 via-white/10 to-[#C87535]/50 p-[1px] shadow-[0_28px_72px_rgba(0,0,0,0.65)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0C1B29]">
                <Image
                  src="/images/quality-inspection.jpg"
                  alt="Metallurgical inspector wearing nitrile gloves performing XRF spectrometer analysis on copper wire scrap samples"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-[#07111B]/80 via-transparent to-[#087CFF]/10"
                />
              </div>
            </div>

            {/* Highlighted Quality Verification Card (Subtle Blue + Copper Accent) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 rounded-2xl border border-[#087CFF]/30 bg-gradient-to-br from-[#102233]/95 via-[#0C1B29]/95 to-[#102233]/90 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#087CFF]/40 bg-[#087CFF]/12 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
                  {QUALITY_HIGHLIGHT_CARD.badge}
                </span>
                <span className="font-mono text-[11px] text-[#E58A45]">
                  Batch Protocol
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-[#F8FAFC]">
                {QUALITY_HIGHLIGHT_CARD.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A7B4C2] sm:text-sm">
                {QUALITY_HIGHLIGHT_CARD.description}
              </p>
              <ul className="mt-4 space-y-2">
                {QUALITY_HIGHLIGHT_CARD.checkpoints.map((cp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#F8FAFC]/90"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E58A45]"
                      aria-hidden="true"
                    />
                    <span>{cp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </RevealBlock>

          {/* Right Content Column */}
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="QUALITY ASSURANCE"
              title="Quality You Can Trust"
              description="Reliable international copper trade depends on clear material grading, pre-shipment discipline, and accurate export records."
            />

            <motion.ul
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 space-y-4"
            >
              {QUALITY_PILLARS.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.id] ?? ShieldCheck;
                return (
                  <motion.li
                    key={pillar.id}
                    variants={staggerItemVariants}
                    className="group flex items-start gap-4 rounded-xl border border-white/10 bg-[#0C1B29]/75 p-5 transition-all duration-300 hover:border-[#C87535]/50 hover:bg-[#102233]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C87535]/35 bg-[#C87535]/10 text-[#E58A45] transition-colors group-hover:bg-[#C87535] group-hover:text-[#07111B]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#A7B4C2]">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

