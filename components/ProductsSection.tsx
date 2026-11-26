"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { COPPER_PRODUCTS, type CopperProduct } from "@/data/siteData";
import { SectionHeader, staggerContainerVariants } from "./MotionPrimitives";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

interface ProductsSectionProps {
  onSelectProductForInquiry: (productName: string) => void;
}

export function ProductsSection({
  onSelectProductForInquiry,
}: ProductsSectionProps) {
  const [activeProduct, setActiveProduct] = useState<CopperProduct | null>(null);

  const products = COPPER_PRODUCTS.filter((p) => p.availableConfirmed);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#0C1B29] py-24 sm:py-32 border-y border-white/10"
    >
      {/* Subtle Background Radials */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-full max-w-[720px] -translate-x-1/2 rounded-full bg-[#C87535]/8 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="PRODUCT PORTFOLIO"
            title="Our Copper Products"
            description="Explore our copper scrap and copper material offerings for industrial and international trade requirements."
          />
          <p className="max-w-xs font-mono text-xs leading-relaxed text-[#A7B4C2]/80">
            Note: Final commercial grades, purities, and lot availability are confirmed upon formal inquiry.
          </p>
        </div>

        {/* 3-col Desktop / 2-col Tablet / 1-col Mobile Product Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setActiveProduct}
              onRequestInquiry={onSelectProductForInquiry}
            />
          ))}
        </motion.div>
      </div>

      {/* Native <dialog> Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onSelectForInquiry={onSelectProductForInquiry}
      />
    </section>
  );
}

