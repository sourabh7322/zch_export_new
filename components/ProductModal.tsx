"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowRight, PackageCheck } from "lucide-react";
import type { CopperProduct } from "@/data/siteData";

interface ProductModalProps {
  product: CopperProduct | null;
  onClose: () => void;
  onSelectForInquiry: (productName: string) => void;
}

export function ProductModal({
  product,
  onClose,
  onSelectForInquiry,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [product]);

  // Light-dismiss fallback for browsers without native closedby="any" support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if ("closedBy" in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
    };

    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);
    return () => {
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.returnValue = "";
      if (dialog.open) dialog.close();
    }
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="product-modal-title"
      onClose={() => {
        if (dialogRef.current) dialogRef.current.returnValue = "";
        onClose();
      }}
      className="w-[min(94vw,48rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#C87535]/40 bg-[#0C1B29] p-0 text-[#F8FAFC] shadow-[0_32px_90px_rgba(0,0,0,0.8)]"
    >
      {product && (
        <div>
          {/* Top Visual Banner */}
          <div className="relative h-56 w-full bg-[#07111B] sm:h-72">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              fetchPriority="low"
              sizes="(max-width: 768px) 94vw, 768px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0C1B29] via-[#07111B]/35 to-transparent"
            />
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 bg-[#07111B]/85 text-[#F8FAFC] backdrop-blur-md transition-colors hover:border-[#E58A45] hover:text-[#E58A45]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 z-10">
              <span className="inline-block rounded-full border border-[#C87535]/40 bg-[#07111B]/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E58A45]">
                {product.categoryTag}
              </span>
              <h1
                id="product-modal-title"
                className="mt-2 font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl"
              >
                {product.name}
              </h1>
            </div>
          </div>

          {/* Modal Body */}
          <div className="space-y-6 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-[#A7B4C2] sm:text-base">
              {product.overview}
            </p>

            {/* Editable Specification Table */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E58A45]">
                Material Specifications (Editable Reference)
              </h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#07111B]/75">
                <dl className="divide-y divide-white/10">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <dt className="text-xs font-medium text-[#A7B4C2]">
                        {spec.label}
                      </dt>
                      <dd className="font-mono text-xs font-medium text-[#F8FAFC]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Packaging & Export Handling */}
            <div className="flex items-start gap-3 rounded-xl border border-[#087CFF]/25 bg-[#087CFF]/8 p-4">
              <PackageCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[#087CFF]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
                  Export Packaging & Loading
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#A7B4C2]">
                  {product.packagingNote}
                </p>
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-[#A7B4C2] transition-colors hover:border-white/30 hover:text-[#F8FAFC]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = product.name;
                  handleClose();
                  onSelectForInquiry(name);
                }}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C87535] to-[#E58A45] px-6 py-2.5 text-sm font-semibold text-[#07111B] shadow-[0_8px_24px_rgba(200,117,53,0.35)] transition-transform hover:-translate-y-0.5"
              >
                <span>Request Quote for {product.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

