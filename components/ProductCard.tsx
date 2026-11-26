"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import type { CopperProduct } from "@/data/siteData";
import { staggerItemVariants } from "./MotionPrimitives";

interface ProductCardProps {
  product: CopperProduct;
  onViewDetails: (product: CopperProduct) => void;
  onRequestInquiry: (productName: string) => void;
}

export function ProductCard({
  product,
  onViewDetails,
  onRequestInquiry,
}: ProductCardProps) {
  return (
    <motion.article
      variants={staggerItemVariants}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#102233] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C87535]/65 hover:shadow-[0_24px_60px_rgba(200,117,53,0.18)]"
    >
      {/* Subtle Top Copper Glow Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-[#E58A45] to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* Image Showcase Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#07111B]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#102233] via-[#07111B]/25 to-transparent"
        />
        <span className="absolute top-4 left-4 z-10 rounded-full border border-white/15 bg-[#07111B]/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E58A45] backdrop-blur-md">
          {product.categoryTag}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#E58A45]">
            {product.name}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#A7B4C2]">
            {product.shortDescription}
          </p>
          <div className="mt-4 rounded-lg border border-white/10 bg-[#07111B]/65 px-3 py-2 font-mono text-xs text-[#A7B4C2]">
            {product.specificationLabel}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#A7B4C2] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
          >
            <Eye className="h-3.5 w-3.5 text-[#E58A45]" aria-hidden="true" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestInquiry(product.name)}
            className="group/btn inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#C87535]/40 bg-[#C87535]/12 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#E58A45] transition-all duration-300 hover:border-[#E58A45] hover:bg-[#C87535] hover:text-[#07111B]"
          >
            <span>Request Inquiry</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

