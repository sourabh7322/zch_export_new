"use client";

import React from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClasses =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <RevealBlock className={`flex flex-col max-w-3xl ${alignClasses}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-[#C87535]/35 bg-[#C87535]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#E58A45]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E58A45]" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[#A7B4C2] sm:text-lg">
          {description}
        </p>
      )}
    </RevealBlock>
  );
}

