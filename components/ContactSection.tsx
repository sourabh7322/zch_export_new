"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/siteData";
import {
  SectionHeader,
  staggerContainerVariants,
  staggerItemVariants,
} from "./MotionPrimitives";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#07111B] py-24 sm:py-28 border-t border-white/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 bottom-0 h-[340px] w-[520px] rounded-full bg-[#087CFF]/8 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="DIRECT CHANNELS"
            title="Contact Us"
            description="Connect directly with DCHIND EXPORTS for commercial inquiries, material availability, and export coordination."
          />
          <a
            href="#inquiry"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C87535]/50 bg-[#102233] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition-all duration-300 hover:border-[#E58A45] hover:bg-[#C87535] hover:text-[#07111B]"
          >
            <span>Open Inquiry Form</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Address Card */}
          <motion.div
            variants={staggerItemVariants}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#102233]/85 p-6 transition-all duration-300 hover:border-[#C87535]/50"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C87535]/35 bg-[#C87535]/12 text-[#E58A45]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#F8FAFC]">
                {CONTACT_INFO.addressLabel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A7B4C2]">
                {CONTACT_INFO.addressValue}
              </p>
            </div>
            <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-[#A7B4C2]/65">
              Editable Address Slot
            </span>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={staggerItemVariants}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#102233]/85 p-6 transition-all duration-300 hover:border-[#C87535]/50"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C87535]/35 bg-[#C87535]/12 text-[#E58A45]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#F8FAFC]">
                {CONTACT_INFO.emailLabel}
              </h3>
              <a
                href={`mailto:${CONTACT_INFO.emailValue}`}
                className="mt-2 inline-block break-all text-sm font-medium text-[#E58A45] underline-offset-4 hover:underline"
              >
                {CONTACT_INFO.emailValue}
              </a>
            </div>
            <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-[#A7B4C2]/65">
              Direct Mailto Link
            </span>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            variants={staggerItemVariants}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#102233]/85 p-6 transition-all duration-300 hover:border-[#C87535]/50"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C87535]/35 bg-[#C87535]/12 text-[#E58A45]">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#F8FAFC]">
                {CONTACT_INFO.phoneLabel}
              </h3>
              <a
                href={CONTACT_INFO.phoneHref}
                className="mt-2 inline-block text-sm font-medium text-[#F8FAFC] underline-offset-4 hover:text-[#E58A45] hover:underline"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
            <span className="mt-5 font-mono text-[11px] uppercase tracking-wider text-[#A7B4C2]/65">
              Direct Tel Link
            </span>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            variants={staggerItemVariants}
            className="flex flex-col justify-between rounded-2xl border border-[#C87535]/35 bg-gradient-to-br from-[#102233] to-[#0C1B29] p-6 transition-all duration-300 hover:border-[#E58A45]"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#087CFF]/40 bg-[#087CFF]/12 text-[#60A5FA]">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#F8FAFC]">
                {CONTACT_INFO.whatsappLabel}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A7B4C2]">
                Instant commercial messaging via configurable WhatsApp business endpoint.
              </p>
            </div>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C87535] to-[#E58A45] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#07111B] transition-transform hover:-translate-y-0.5"
            >
              <span>Message on WhatsApp</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

