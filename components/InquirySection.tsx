"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  Clock,
  FileSpreadsheet,
} from "lucide-react";
import { COPPER_PRODUCTS } from "@/data/siteData";
import { SectionHeader, RevealBlock } from "./MotionPrimitives";

interface InquirySectionProps {
  selectedProduct: string;
  onProductChange: (productName: string) => void;
}

interface FormValues {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  quantity: string;
  message: string;
  website: string; // honeypot
}

const INITIAL_VALUES: FormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  quantity: "",
  message: "",
  website: "",
};

export function InquirySection({
  selectedProduct,
  onProductChange,
}: InquirySectionProps) {
  const formHeadingId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const announcerRef = useRef<HTMLDivElement | null>(null);
  const announceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  // Consistent ARIA error sync & :user-invalid fallback per modern-web-guidance
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" && CSS.supports("selector(:user-invalid)");
    const dirtyState = new WeakMap<
      Element,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();
    let announcedField: Element | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const announceError = (el: HTMLElement) => {
      const errorId = el.dataset.error;
      const errorEl = errorId ? document.getElementById(errorId) : null;
      const announcer = announcerRef.current;
      if (!errorEl || !announcer) return;

      const labelEl = form.querySelector(`label[for="${el.id}"]`);
      const labelText = labelEl
        ? labelEl.textContent?.replace(/\*/g, "").trim() + ": "
        : "";
      const errText = errorEl.textContent?.trim() ?? "";

      if (announceTimerRef.current) clearTimeout(announceTimerRef.current);
      announcer.textContent = "";
      announcedField = el;
      announceTimerRef.current = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = `${labelText}${errText}`;
        }
      }, 450);
    };

    const syncAria = (el: EventTarget | null, announce = false) => {
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }
      if (el.name === "website") return;

      const isInvalid = supportsUserInvalid
        ? el.matches(":user-invalid")
        : !el.validity.valid && Boolean(dirtyState.get(el)?.hasBlurred);

      if (!supportsUserInvalid && dirtyState.get(el)?.hasBlurred) {
        el.classList.toggle("user-invalid-fallback", !el.validity.valid);
        el.classList.toggle("user-valid-fallback", el.validity.valid);
      }

      if (isInvalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el && announcerRef.current) {
          if (announceTimerRef.current) clearTimeout(announceTimerRef.current);
          announcerRef.current.textContent = "";
        }
      }
    };

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el instanceof HTMLElement && el.getAttribute("name") !== "website") {
        el.setAttribute("aria-invalid", "false");
      }
    });

    const onBlur = (e: FocusEvent) => {
      if (e.target instanceof Element) {
        const st = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        st.hasBlurred = true;
        dirtyState.set(e.target, st);
      }
      syncAria(e.target, true);
    };

    const onInput = (e: Event) => {
      if (e.target instanceof Element) {
        const st = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        st.hasInteracted = true;
        dirtyState.set(e.target, st);
      }
      if (e.target instanceof HTMLElement && e.target.hasAttribute("aria-invalid")) {
        syncAria(e.target, false);
      }
    };

    const onChange = (e: Event) => syncAria(e.target, true);

    const onInvalid = (e: Event) => {
      if (e.target instanceof Element) {
        dirtyState.set(e.target, { hasInteracted: true, hasBlurred: true });
        announced.add(e.target);
      }
      syncAria(e.target, false);
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
      if (announceTimerRef.current) clearTimeout(announceTimerRef.current);
    };
  }, [status]);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "product") {
      onProductChange(value);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
    if (status === "error") {
      setStatus("idle");
      setServerError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(
        "input:invalid, select:invalid, textarea:invalid"
      );
      form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea").forEach((el) => {
        if (!el.validity.valid) {
          el.classList.add("user-invalid-fallback");
          el.setAttribute("aria-invalid", "true");
        }
      });
      firstInvalid?.focus();
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, product: selectedProduct }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        referenceId?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(
          data.error || "Unable to submit your inquiry. Please verify your entries."
        );
        return;
      }

      setReferenceId(data.referenceId || "DCH-CONFIRMED");
      setStatus("success");
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
      setServerError(
        "Network error while sending your inquiry. Please check your connection and retry."
      );
    }
  };

  const inputBaseClass =
    "field-control mt-2 block w-full min-h-[48px] rounded-xl border border-white/15 bg-[#07111B]/85 px-4 py-3 text-base text-[#F8FAFC] placeholder:text-[#A7B4C2]/45 transition-colors focus:border-[#E58A45] focus:outline-none";

  return (
    <section
      id="inquiry"
      className="relative overflow-hidden bg-[#0C1B29] py-24 sm:py-32 border-t border-white/10"
    >
      {/* Subtle Ambient Copper Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#C87535]/12 blur-[150px]"
      />

      {/* Centralized Polite Screen-Reader Announcer */}
      <div
        ref={announcerRef}
        aria-live="polite"
        className="visually-hidden"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Context & Trust Column */}
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="BUSINESS INQUIRY"
              title="Let's Build a Business Partnership"
              description="Looking for copper scrap supply or interested in working with us? Send your requirements and our team can get in touch."
            />

            <RevealBlock delay={0.12} className="mt-10 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#102233]/80 p-5">
                <div className="flex items-start gap-3.5">
                  <FileSpreadsheet
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#E58A45]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                      Tailored Commercial Quotation
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#A7B4C2]">
                      Include your target grade, monthly or trial volume, and destination port so our trade desk can respond accurately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#102233]/80 p-5">
                <div className="flex items-start gap-3.5">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#E58A45]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                      Specification & Inspection Alignment
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#A7B4C2]">
                      Share required packaging formats or pre-shipment verification preferences upfront to streamline processing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#102233]/80 p-5">
                <div className="flex items-start gap-3.5">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#087CFF]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                      Direct Trade Desk Review
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#A7B4C2]">
                      All inquiries are routed directly to our export coordination team for prompt commercial follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#C87535]/35 bg-[#102233]/90 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8 lg:p-10">
              <h3
                id={formHeadingId}
                className="font-display text-2xl font-bold text-[#F8FAFC]"
              >
                Submit Your Copper Supply Inquiry
              </h3>
              <p className="mt-1.5 text-sm text-[#A7B4C2]">
                Fields marked with <span className="text-[#E58A45]">*</span> are required.
              </p>

              {status === "success" ? (
                <div
                  role="status"
                  className="mt-8 rounded-2xl border border-emerald-500/35 bg-emerald-950/30 p-7 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h4 className="mt-4 font-display text-2xl font-bold text-[#F8FAFC]">
                    Business Inquiry Received
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#A7B4C2]">
                    Thank you for contacting DCHIND EXPORTS. Our export trade desk will review your copper requirements and follow up shortly.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#07111B]/80 px-4 py-2 font-mono text-xs text-[#E58A45]">
                    <span>Reference ID:</span>
                    <span className="font-semibold text-[#F8FAFC]">{referenceId}</span>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#C87535]/50 bg-[#C87535]/15 px-5 py-2.5 text-sm font-semibold text-[#E58A45] transition-colors hover:bg-[#C87535] hover:text-[#07111B]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  ref={formRef}
                  aria-labelledby={formHeadingId}
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-7 space-y-5"
                >
                  {/* Honeypot field for bot protection (hidden from users & assistive tech) */}
                  <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor="inquiry-website">Website</label>
                    <input
                      id="inquiry-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleFieldChange}
                    />
                  </div>

                  {status === "error" && serverError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200"
                    >
                      <AlertTriangle
                        className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="inquiry-fullName"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Full Name <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="inquiry-fullName"
                        name="fullName"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        enterKeyHint="next"
                        placeholder="e.g., Arjun Mehta"
                        value={values.fullName}
                        onChange={handleFieldChange}
                        data-error="err-fullName"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-fullName"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please enter your full name (at least 2 characters).</span>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="inquiry-companyName"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Company Name <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="inquiry-companyName"
                        name="companyName"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="organization"
                        enterKeyHint="next"
                        placeholder="e.g., Apex Metals Foundry Ltd."
                        value={values.companyName}
                        onChange={handleFieldChange}
                        data-error="err-companyName"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-companyName"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please enter your company or organization name.</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Email Address <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <span
                        id="hint-email"
                        className="mt-1 block text-xs text-[#A7B4C2]/80"
                      >
                        Format: name@company.com
                      </span>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="next"
                        placeholder="procurement@company.com"
                        value={values.email}
                        onChange={handleFieldChange}
                        aria-describedby="hint-email"
                        data-error="err-email"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-email"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Enter a valid business email in the format name@company.com.</span>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Phone Number <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <span
                        id="hint-phone"
                        className="mt-1 block text-xs text-[#A7B4C2]/80"
                      >
                        Include country code if international
                      </span>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        required
                        minLength={6}
                        autoComplete="tel"
                        enterKeyHint="next"
                        placeholder="+44 20 7946 0000"
                        value={values.phone}
                        onChange={handleFieldChange}
                        aria-describedby="hint-phone"
                        data-error="err-phone"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-phone"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please enter a valid telephone number (at least 6 digits).</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {/* Country */}
                    <div>
                      <label
                        htmlFor="inquiry-country"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Country <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="inquiry-country"
                        name="country"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="country-name"
                        enterKeyHint="next"
                        placeholder="e.g., Germany / UAE"
                        value={values.country}
                        onChange={handleFieldChange}
                        data-error="err-country"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-country"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please enter your destination country.</span>
                      </div>
                    </div>

                    {/* Product Interested In */}
                    <div>
                      <label
                        htmlFor="inquiry-product"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Product Interested In{" "}
                        <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="inquiry-product"
                        name="product"
                        required
                        value={selectedProduct}
                        onChange={handleFieldChange}
                        data-error="err-product"
                        className={`${inputBaseClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23E58A45%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[position:right_14px_center] bg-no-repeat pr-10`}
                      >
                        {COPPER_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.name} className="bg-[#07111B] text-[#F8FAFC]">
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <div
                        id="err-product"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please select a product category.</span>
                      </div>
                    </div>

                    {/* Quantity Required */}
                    <div>
                      <label
                        htmlFor="inquiry-quantity"
                        className="block text-sm font-medium text-[#F8FAFC]"
                      >
                        Quantity Required{" "}
                        <span className="text-[#E58A45]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="inquiry-quantity"
                        name="quantity"
                        type="text"
                        required
                        enterKeyHint="next"
                        placeholder="e.g., 25 MT / 1x 20ft FCL"
                        value={values.quantity}
                        onChange={handleFieldChange}
                        data-error="err-quantity"
                        className={inputBaseClass}
                      />
                      <div
                        id="err-quantity"
                        className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                      >
                        <span role="img" aria-label="Error">!</span>
                        <span>Please indicate your required quantity.</span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-sm font-medium text-[#F8FAFC]"
                    >
                      Message <span className="text-[#E58A45]" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      placeholder="Specify grade expectations, target port of discharge, preferred Incoterms (FOB/CIF), and inspection requirements..."
                      value={values.message}
                      onChange={handleFieldChange}
                      data-error="err-message"
                      className={`${inputBaseClass} min-h-[120px] resize-y`}
                    />
                    <div
                      id="err-message"
                      className="field-error mt-1.5 hidden items-center gap-1.5 text-xs text-red-300"
                    >
                      <span role="img" aria-label="Error">!</span>
                      <span>Please describe your inquiry (at least 10 characters).</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C87535] to-[#E58A45] px-7 py-3.5 text-base font-semibold text-[#07111B] shadow-[0_12px_36px_rgba(200,117,53,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(229,138,69,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Submit Business Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
