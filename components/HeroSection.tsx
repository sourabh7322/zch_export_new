"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const HEADLINE_LINE_1 = ["Premium", "Copper", "Scrap."];
const HEADLINE_LINE_2 = ["Reliable", "Global", "Supply."];

const PARTICLES = [
  { left: "14%", top: "74%", delay: "0s", size: "h-1 w-1" },
  { left: "34%", top: "82%", delay: "2.4s", size: "h-1.5 w-1.5" },
  { left: "58%", top: "70%", delay: "4.2s", size: "h-1 w-1" },
  { left: "78%", top: "78%", delay: "1.6s", size: "h-1.5 w-1.5" },
  { left: "88%", top: "64%", delay: "5.5s", size: "h-1 w-1" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[94vh] flex items-center overflow-hidden bg-[#07111B] pt-24 pb-28 sm:pt-28 sm:pb-36"
    >
      {/* Parallax Cinematic Hero Background Image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/hero-copper.jpg"
          alt="Gleaming bare bright copper wire scrap bundles and strapped industrial copper coils inside a dark metals export facility"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center opacity-75"
        />
      </motion.div>

      {/* Atmospheric Multi-Layer Vignette & Gradient Overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#07111B] via-[#07111B]/82 to-[#07111B]/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#07111B] via-transparent to-[#07111B]/65"
      />

      {/* Animated Ambient Copper & Subtle Blue Glows */}
      <div
        aria-hidden="true"
        className="animate-copper-drift pointer-events-none absolute -left-24 top-1/4 z-[2] h-[420px] w-[420px] rounded-full bg-[#C87535]/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-16 z-[2] h-[340px] w-[340px] rounded-full bg-[#087CFF]/12 blur-[130px]"
      />

      {/* Sparing Floating Copper Ember Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {PARTICLES.map((p, idx) => (
          <span
            key={idx}
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
            className={`animate-ember-float absolute rounded-full bg-[#E58A45] shadow-[0_0_12px_#E58A45] ${p.size}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C87535]/40 bg-[#0C1B29]/80 px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E58A45]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E58A45]">
              Global Copper Scrap Supplier
            </span>
          </motion.div>

          {/* Staggered Word Headline */}
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.06]">
            <span className="block">
              {HEADLINE_LINE_1.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.12 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-[0.26em] ${
                    word === "Copper" || word === "Scrap." ? "copper-gradient-text" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block mt-1">
              {HEADLINE_LINE_2.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.38 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-[0.26em] ${
                    word === "Global" ? "copper-gradient-text" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#A7B4C2] sm:text-lg lg:text-xl"
          >
            Delivering quality-driven copper scrap solutions with reliable sourcing,
            transparent business practices and efficient global export operations.
          </motion.p>

          {/* Sequential CTA Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href="#inquiry"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#C87535] to-[#E58A45] px-7 py-3.5 text-base font-semibold text-[#07111B] shadow-[0_12px_36px_rgba(200,117,53,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(229,138,69,0.52)]"
            >
              <span>Request a Quote</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              href="#products"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#0C1B29]/75 px-7 py-3.5 text-base font-semibold text-[#F8FAFC] backdrop-blur-md transition-all duration-300 hover:border-[#C87535]/70 hover:bg-[#102233]"
            >
              <span>Explore Our Products</span>
              <ArrowRight
                className="h-4 w-4 text-[#E58A45] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        aria-label="Scroll to company overview statistics"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[#A7B4C2] transition-colors hover:text-[#E58A45]"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-[#E58A45]" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}

