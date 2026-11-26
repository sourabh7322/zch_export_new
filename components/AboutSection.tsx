"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Layers } from "lucide-react";
import { ABOUT_CONTENT } from "@/data/siteData";
import { staggerContainerVariants, staggerItemVariants } from "./MotionPrimitives";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#07111B] py-24 sm:py-32"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#C87535]/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Editorial Column */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <motion.div variants={staggerItemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C87535]/35 bg-[#C87535]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#E58A45]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E58A45]" aria-hidden="true" />
                {ABOUT_CONTENT.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              variants={staggerItemVariants}
              className="mt-5 font-display text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              {ABOUT_CONTENT.heading}
            </motion.h2>

            <div className="mt-6 space-y-5">
              {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={staggerItemVariants}
                  className="text-base leading-relaxed text-[#A7B4C2] sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={staggerItemVariants}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-white/10 bg-[#0C1B29]/80 p-4">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#F8FAFC]">
                  <Layers className="h-4 w-4 text-[#E58A45]" aria-hidden="true" />
                  <span>Material Discipline</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#A7B4C2]">
                  Structured grade sorting and contamination checks aligned with industrial buyer specs.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0C1B29]/80 p-4">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#F8FAFC]">
                  <Compass className="h-4 w-4 text-[#087CFF]" aria-hidden="true" />
                  <span>Transparent Trade</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#A7B4C2]">
                  Clear commercial communication, verifiable weight logs, and coordinated export execution.
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="mt-9">
              <a
                href="#quality"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-[#C87535]/50 bg-[#102233] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition-all duration-300 hover:border-[#E58A45] hover:bg-[#C87535] hover:text-[#07111B]"
              >
                <span>{ABOUT_CONTENT.ctaLabel}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            {/* Decorative Copper Gradient Frame */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#C87535]/55 via-white/10 to-[#087CFF]/30 p-[1px] shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0C1B29]">
                <Image
                  src="/images/about-copper.jpg"
                  alt="Tightly compressed recycled copper scrap bales and gleaming copper wire spools in a dark export warehouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#07111B]/80 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Floating Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 rounded-xl border border-[#C87535]/35 bg-[#102233]/92 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:absolute sm:-bottom-8 sm:left-6 sm:mt-0 sm:max-w-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E58A45]">
                  {ABOUT_CONTENT.floatingCard.label}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#E58A45]" aria-hidden="true" />
              </div>
              <p className="mt-2 font-display text-lg font-bold text-[#F8FAFC]">
                {ABOUT_CONTENT.floatingCard.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#A7B4C2]">
                {ABOUT_CONTENT.floatingCard.note}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

