"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Globe, Mail, X } from "lucide-react";
import {
  CONTACT_INFO,
  COPPER_PRODUCTS,
  NAV_LINKS,
} from "@/data/siteData";

interface FooterProps {
  onSelectProductForInquiry: (productName: string) => void;
}

export function Footer({ onSelectProductForInquiry }: FooterProps) {
  const legalDialogRef = useRef<HTMLDialogElement | null>(null);
  const [legalDoc, setLegalDoc] = useState<"privacy" | "terms" | null>(null);

  const openLegalModal = (doc: "privacy" | "terms") => {
    setLegalDoc(doc);
    requestAnimationFrame(() => {
      legalDialogRef.current?.showModal();
    });
  };

  const closeLegalModal = () => {
    if (legalDialogRef.current) {
      legalDialogRef.current.returnValue = "";
      if (legalDialogRef.current.open) legalDialogRef.current.close();
    }
    setLegalDoc(null);
  };

  return (
    <footer className="relative bg-[#050C14] border-t border-[#C87535]/25 text-[#A7B4C2]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="inline-flex items-center rounded-xl bg-white/95 px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ring-1 ring-white/20"
              aria-label="DCHIND EXPORTS — Back to top"
            >
              <Image
                src="/images/dchind-logo.jpg"
                alt="DCHIND EXPORTS logo"
                width={156}
                height={52}
                loading="lazy"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A7B4C2]">
              International copper scrap sourcing, material grading, and global export trading built on transparent commercial operations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={CONTACT_INFO.linkedinUrl}
                aria-label="DCHIND EXPORTS LinkedIn profile (placeholder)"
                className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-white/10 bg-[#0C1B29] text-[#A7B4C2] transition-colors hover:border-[#C87535]/60 hover:text-[#E58A45]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.emailValue}`}
                aria-label="Email DCHIND EXPORTS"
                className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-white/10 bg-[#0C1B29] text-[#A7B4C2] transition-colors hover:border-[#C87535]/60 hover:text-[#E58A45]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#logistics"
                aria-label="Global Export Operations"
                className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-white/10 bg-[#0C1B29] text-[#A7B4C2] transition-colors hover:border-[#C87535]/60 hover:text-[#E58A45]"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-[#F8FAFC]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-0.5 transition-colors hover:text-[#E58A45]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Product Quick Links */}
          <nav aria-label="Products" className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-[#F8FAFC]">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COPPER_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProductForInquiry(product.name)}
                    className="text-left py-0.5 transition-colors hover:text-[#E58A45]"
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Summary */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-[#F8FAFC]">
              Contact Details
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-wider text-[#A7B4C2]/65">
                  Address
                </span>
                <span className="mt-0.5 block text-[#F8FAFC]/90">
                  {CONTACT_INFO.addressValue}
                </span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider text-[#A7B4C2]/65">
                  Email
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.emailValue}`}
                  className="mt-0.5 block break-all text-[#E58A45] hover:underline"
                >
                  {CONTACT_INFO.emailValue}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider text-[#A7B4C2]/65">
                  Phone
                </span>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="mt-0.5 block text-[#F8FAFC]/90 hover:text-[#E58A45]"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center">
          <p className="text-[#A7B4C2]">
            &copy; 2026 DCHIND EXPORTS. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => openLegalModal("privacy")}
              className="text-[#A7B4C2] transition-colors hover:text-[#E58A45]"
            >
              Privacy Policy (Placeholder)
            </button>
            <button
              type="button"
              onClick={() => openLegalModal("terms")}
              className="text-[#A7B4C2] transition-colors hover:text-[#E58A45]"
            >
              Terms of Trade (Placeholder)
            </button>
          </div>
        </div>
      </div>

      {/* Native Legal Placeholder Dialog */}
      <dialog
        ref={legalDialogRef}
        {...({ closedby: "any" } as Record<string, string>)}
        aria-labelledby="legal-dialog-title"
        onClose={() => {
          if (legalDialogRef.current) legalDialogRef.current.returnValue = "";
          setLegalDoc(null);
        }}
        className="w-[min(92vw,36rem)] rounded-2xl border border-[#C87535]/40 bg-[#0C1B29] p-6 text-[#F8FAFC] shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <h1 id="legal-dialog-title" className="font-display text-xl font-bold">
            {legalDoc === "privacy"
              ? "Privacy Policy (Editable Placeholder)"
              : "Terms of Trade (Editable Placeholder)"}
          </h1>
          <button
            type="button"
            onClick={closeLegalModal}
            aria-label="Close legal notice"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-white/15 text-[#A7B4C2] hover:text-[#F8FAFC]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#A7B4C2]">
          {legalDoc === "privacy" ? (
            <p>
              [Editable Placeholder: Insert DCHIND EXPORTS formal privacy notice detailing how business inquiry submissions, corporate contact information, and commercial correspondence are stored and protected.]
            </p>
          ) : (
            <p>
              [Editable Placeholder: Insert DCHIND EXPORTS commercial terms of trade, Incoterms guidelines, inspection dispute procedures, and applicable governing jurisdiction.]
            </p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={closeLegalModal}
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#C87535] px-5 py-2 text-sm font-semibold text-[#07111B]"
          >
            Close
          </button>
        </div>
      </dialog>
    </footer>
  );
}
