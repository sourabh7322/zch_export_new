"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ship, FileText, Package, Radar } from "lucide-react";
import { LOGISTICS_CARDS } from "@/data/siteData";
import {
  SectionHeader,
  RevealBlock,
  staggerContainerVariants,
  staggerItemVariants,
} from "./MotionPrimitives";

const LOGISTICS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "global-shipping": Ship,
  "export-documentation": FileText,
  "secure-packaging": Package,
  "shipment-coordination": Radar,
};

export function LogisticsSection() {
  return (
    <section
      id="logistics"
      className="relative overflow-hidden bg-[#0C1B29] py-24 sm:py-32 border-y border-white/10"
    >
      {/* Cinematic Port Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/logistics-port.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0C1B29] via-[#0C1B29]/78 to-[#07111B]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="GLOBAL OPERATIONS"
          title="Delivering Copper Across Global Markets"
          description="Reliable export coordination, shipment preparation and logistics support for international business partners."
          align="center"
        />

        {/* Cinematic Port Feature Frame + Subtle World Connectivity Map */}
        <RevealBlock delay={0.1} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#07111B]/85 shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Port Photo */}
              <div className="relative min-h-[240px] lg:col-span-6 lg:min-h-[340px]">
                <Image
                  src="/images/logistics-port.jpg"
                  alt="Cargo vessel and gantry cranes illuminated at twilight at an international deep-water export port"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#07111B]/90 hidden lg:block"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-transparent lg:hidden"
                />
              </div>

              {/* Subtle Illustrative Global Shipping Network SVG */}
              <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#E58A45]">
                    Export Corridor Visualization
                  </span>
                  <span className="text-[11px] text-[#A7B4C2]">
                    Illustrative Trade Network
                  </span>
                </div>

                {/* Subtle SVG World Arcs (Purely visual, no unverified route claims) */}
                <div className="my-4 relative">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 600 260"
                    className="w-full h-auto opacity-90"
                    fill="none"
                  >
                    {/* Subtle Grid */}
                    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                      <line x1="0" y1="65" x2="600" y2="65" />
                      <line x1="0" y1="130" x2="600" y2="130" />
                      <line x1="0" y1="195" x2="600" y2="195" />
                      <line x1="150" y1="0" x2="150" y2="260" />
                      <line x1="300" y1="0" x2="300" y2="260" />
                      <line x1="450" y1="0" x2="450" y2="260" />
                    </g>

                    {/* Abstract Continental Silhouettes */}
                    <path
                      d="M75 75 Q110 55 155 70 T185 110 Q150 135 120 120 T75 75 Z"
                      fill="rgba(255,255,255,0.05)"
                    />
                    <path
                      d="M145 145 Q175 140 190 175 T165 225 Q140 215 145 145 Z"
                      fill="rgba(255,255,255,0.05)"
                    />
                    <path
                      d="M270 55 Q335 45 375 80 T355 135 Q305 140 275 105 Z"
                      fill="rgba(255,255,255,0.06)"
                    />
                    <path
                      d="M295 140 Q335 135 350 175 T320 220 Q285 200 295 140 Z"
                      fill="rgba(255,255,255,0.05)"
                    />
                    <path
                      d="M385 65 Q465 45 520 90 T495 155 Q430 165 390 125 Z"
                      fill="rgba(255,255,255,0.06)"
                    />
                    <path
                      d="M475 180 Q515 170 535 198 T500 228 Q468 215 475 180 Z"
                      fill="rgba(255,255,255,0.05)"
                    />

                    {/* Connecting Trade Arcs */}
                    <motion.path
                      d="M150 98 Q250 32 330 92"
                      stroke="url(#copperArc)"
                      strokeWidth="1.75"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0.2, opacity: 0.45 }}
                      whileInView={{ pathLength: 1, opacity: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M330 92 Q405 46 468 106"
                      stroke="url(#copperArc)"
                      strokeWidth="1.75"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0.2, opacity: 0.45 }}
                      whileInView={{ pathLength: 1, opacity: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.15, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M330 92 Q365 150 328 182"
                      stroke="#087CFF"
                      strokeOpacity="0.65"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0.2, opacity: 0.35 }}
                      whileInView={{ pathLength: 1, opacity: 0.75 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.25, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M468 106 Q510 142 502 198"
                      stroke="url(#copperArc)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0.2, opacity: 0.35 }}
                      whileInView={{ pathLength: 1, opacity: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.35, ease: "easeOut" }}
                    />

                    {/* Glowing Hub Nodes */}
                    {[
                      { cx: 150, cy: 98, color: "#E58A45" },
                      { cx: 330, cy: 92, color: "#E58A45" },
                      { cx: 468, cy: 106, color: "#E58A45" },
                      { cx: 328, cy: 182, color: "#087CFF" },
                      { cx: 502, cy: 198, color: "#E58A45" },
                    ].map((node, i) => (
                      <g key={i}>
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="10"
                          fill={node.color}
                          fillOpacity="0.16"
                        />
                        <circle cx={node.cx} cy={node.cy} r="4" fill={node.color} />
                      </g>
                    ))}

                    <defs>
                      <linearGradient id="copperArc" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C87535" />
                        <stop offset="100%" stopColor="#E58A45" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <p className="text-xs leading-relaxed text-[#A7B4C2]">
                  Containerized sea-freight execution tailored to buyer port requirements and agreed Incoterms. Specific shipping routes and destination availability are coordinated per confirmed order.
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* 4 Glass Logistics Cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LOGISTICS_CARDS.map((card) => {
            const Icon = LOGISTICS_ICONS[card.id] ?? Ship;
            return (
              <motion.div
                key={card.id}
                variants={staggerItemVariants}
                className="copper-glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C87535]/60 hover:shadow-[0_20px_50px_rgba(200,117,53,0.16)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E58A45]">
                      {card.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C87535]/35 bg-[#C87535]/12 text-[#E58A45] transition-colors group-hover:bg-[#C87535] group-hover:text-[#07111B]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#F8FAFC]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A7B4C2]">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

