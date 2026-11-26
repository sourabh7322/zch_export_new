"use client";

import React, { useState } from "react";
import { MotionProvider } from "./MotionPrimitives";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { AboutSection } from "./AboutSection";
import { ProductsSection } from "./ProductsSection";
import { QualitySection } from "./QualitySection";
import { LogisticsSection } from "./LogisticsSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection";
import { InquirySection } from "./InquirySection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { COPPER_PRODUCTS } from "@/data/siteData";

export function LandingPageClient() {
  const [selectedProduct, setSelectedProduct] = useState<string>(
    COPPER_PRODUCTS[0]?.name ?? "Copper Wire Scrap"
  );

  const handleSelectProductAndScroll = (productName: string) => {
    setSelectedProduct(productName);
    const inquiryEl = document.getElementById("inquiry");
    if (inquiryEl) {
      inquiryEl.scrollIntoView({ behavior: "smooth", block: "start" });
      // Gently move focus to product select after scroll for keyboard users
      setTimeout(() => {
        const selectEl = document.getElementById("inquiry-product");
        selectEl?.focus({ preventScroll: true });
      }, 450);
    }
  };

  return (
    <MotionProvider>
      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProductsSection
          onSelectProductForInquiry={handleSelectProductAndScroll}
        />
        <QualitySection />
        <LogisticsSection />
        <WhyChooseUsSection />
        <InquirySection
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
        />
        <ContactSection />
      </main>

      <Footer onSelectProductForInquiry={handleSelectProductAndScroll} />
    </MotionProvider>
  );
}

