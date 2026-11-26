export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  label: string;
  placeholderValue: string;
  verifiedNumericValue?: number;
  suffix?: string;
  helperNote: string;
}

export interface CopperProduct {
  id: string;
  name: string;
  categoryTag: string;
  shortDescription: string;
  specificationLabel: string;
  image: string;
  imageAlt: string;
  overview: string;
  specs: { label: string; value: string }[];
  packagingNote: string;
  availableConfirmed: boolean;
}

export interface QualityPillar {
  id: string;
  title: string;
  description: string;
}

export interface LogisticsCard {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  metricTag: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Quality & Inspection", href: "#quality" },
  { label: "Export & Logistics", href: "#logistics" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact Us", href: "#contact" },
];

/**
 * Editable company statistics.
 * Keep verifiedNumericValue undefined until confirmed figures are supplied so
 * unverified numbers are never fabricated or animated falsely.
 */
export const COMPANY_STATS: StatItem[] = [
  {
    id: "experience",
    label: "Years of Experience",
    placeholderValue: "[Years — Placeholder]",
    helperNote: "Editable placeholder for verified trade tenure",
  },
  {
    id: "clients",
    label: "Global Clients",
    placeholderValue: "[Clients — Placeholder]",
    helperNote: "Editable placeholder for verified partner count",
  },
  {
    id: "destinations",
    label: "Export Destinations",
    placeholderValue: "[Markets — Placeholder]",
    helperNote: "Editable placeholder for verified destination ports",
  },
  {
    id: "commitment",
    label: "Quality Commitment",
    placeholderValue: "Batch-Verified",
    helperNote: "Pre-shipment inspection & material verification focus",
  },
];

export const ABOUT_CONTENT = {
  eyebrow: "WHO WE ARE",
  heading: "Building Reliable Copper Supply Partnerships",
  paragraphs: [
    "DCHIND EXPORTS is an international copper scrap sourcing and trading enterprise focused on connecting vetted industrial supply streams with global smelters, foundries, and manufacturing partners.",
    "Our operations are structured around disciplined material sorting, transparent commercial documentation, and coordinated port-to-port export execution. [Editable Placeholder: Insert verified founding year, headquarters jurisdiction, and primary yard or sourcing network details once confirmed.]",
  ],
  ctaLabel: "Learn More",
  floatingCard: {
    label: "OPERATIONAL PROFILE",
    title: "Structured Global Trade",
    note: "[Editable Placeholder: Confirm primary export ports, monthly capacity, and commercial incoterms supported.]",
  },
};

/**
 * Editable product catalog.
 * Confirm actual traded grades and specifications before publishing live commercial offers.
 */
export const COPPER_PRODUCTS: CopperProduct[] = [
  {
    id: "copper-wire-scrap",
    name: "Copper Wire Scrap",
    categoryTag: "WIRE & CONDUCTOR GRADE",
    shortDescription:
      "Clean, uncoated bare bright copper wire scrap bundles prepared for high-yield remelting and rod production.",
    specificationLabel: "Spec: [Confirm Grade / Purity — Placeholder]",
    image: "/images/product-wire-scrap.jpg",
    imageAlt:
      "Tightly bundled uncoated bare bright copper wire scrap strands on dark slate",
    overview:
      "Sourced and sorted to minimize insulation residue and foreign alloys. Available grades, strand diameters, and bale weights can be tailored to buyer furnace requirements once commercial specifications are confirmed.",
    specs: [
      { label: "Material Form", value: "Uncoated bare copper wire bundles / coils" },
      { label: "Grade Reference", value: "[Editable: e.g., Millberry / Berry — Confirm]" },
      { label: "Purity Range", value: "[Editable: Insert verified Cu %]" },
      { label: "Contamination Limit", value: "[Editable: Free of lacquer / solder — Confirm]" },
    ],
    packagingNote:
      "Containerized loading in hydraulically pressed bales, strapped coils, or jumbo bags per buyer instructions.",
    availableConfirmed: true,
  },
  {
    id: "copper-scrap",
    name: "Copper Scrap",
    categoryTag: "HEAVY INDUSTRIAL SCRAP",
    shortDescription:
      "Sorted industrial copper pipe, busbar offcuts, and heavy copper scrap prepared for foundry and refinery feed.",
    specificationLabel: "Spec: [Confirm Grade / Sizing — Placeholder]",
    image: "/images/product-copper-scrap.jpg",
    imageAlt:
      "Sorted heavy copper busbar offcuts and industrial copper tubing sections on dark table",
    overview:
      "Industrial heavy copper scrap comprising clean tubing, busbars, and manufacturing offcuts, visually sorted to separate non-copper attachments and surface oxidation.",
    specs: [
      { label: "Material Form", value: "Cut pipe, busbar offcuts & heavy solids" },
      { label: "Grade Reference", value: "[Editable: e.g., Candy / Birch / Cliff — Confirm]" },
      { label: "Purity Range", value: "[Editable: Insert verified Cu %]" },
      { label: "Sizing / Prep", value: "[Editable: Sheared or baled dimensions]" },
    ],
    packagingNote:
      "Prepared for 20ft/40ft dry container export with weight tickets and pre-loading photographic records.",
    availableConfirmed: true,
  },
  {
    id: "copper-cathode",
    name: "Copper Cathode",
    categoryTag: "ELECTROLYTIC PLATE",
    shortDescription:
      "High-conductivity electrolytic copper cathode plates for continuous casting, wire rod mills, and alloy manufacturing.",
    specificationLabel: "Spec: [Confirm Cathode Grade — Placeholder]",
    image: "/images/product-copper-cathode.jpg",
    imageAlt:
      "Stacked electrolytic copper cathode plates with sharp metallic edges in dark warehouse",
    overview:
      "Full-plate or cut electrolytic copper cathodes sourced from verified commercial channels, subject to lot-level documentation and physical inspection protocols.",
    specs: [
      { label: "Material Form", value: "Electrolytic rectangular cathode plates" },
      { label: "Grade Reference", value: "[Editable: Confirm LME / ASTM Grade]" },
      { label: "Purity Range", value: "[Editable: Insert verified Cu %]" },
      { label: "Bundle Weight", value: "[Editable: Palletized bundle weight]" },
    ],
    packagingNote:
      "Strapped on ISPM-15 compliant wooden pallets or steel-banded bundles suitable for maritime transit.",
    availableConfirmed: true,
  },
  {
    id: "copper-granules",
    name: "Copper Granules",
    categoryTag: "CHOPPED & GRANULATED",
    shortDescription:
      "Mechanically processed, uniform copper wire choppings and granules separated for clean melting efficiency.",
    specificationLabel: "Spec: [Confirm Particle Size — Placeholder]",
    image: "/images/product-copper-granules.jpg",
    imageAlt:
      "Bright chopped pure copper granules mounded cleanly on dark charcoal slate",
    overview:
      "Granulated copper recovered from precision cable chopping and air-table density separation, offering consistent bulk density and streamlined furnace charging.",
    specs: [
      { label: "Material Form", value: "Clean chopped copper granules" },
      { label: "Granule Size", value: "[Editable: e.g., 1–5 mm — Confirm]" },
      { label: "Purity Range", value: "[Editable: Insert verified Cu %]" },
      { label: "Moisture / Oil", value: "[Editable: Dry, oil-free — Confirm]" },
    ],
    packagingNote:
      "Packed in heavy-duty FIBC jumbo bags (1 MT / 1.25 MT) or steel drums per destination port requirements.",
    availableConfirmed: true,
  },
  {
    id: "copper-sheets",
    name: "Copper Sheets",
    categoryTag: "FLAT ROLLED & COIL",
    shortDescription:
      "Industrial copper sheets, plate offcuts, and rolled copper strip materials for fabrication and electrical applications.",
    specificationLabel: "Spec: [Confirm Thickness / Temper — Placeholder]",
    image: "/images/product-copper-sheets.jpg",
    imageAlt:
      "Brushed industrial copper metal sheets stacked alongside rolled copper coils on pallet",
    overview:
      "Clean copper sheet stock and industrial flat-rolled materials available in commercial thicknesses and widths upon confirmed buyer inquiry.",
    specs: [
      { label: "Material Form", value: "Flat sheets, plate clips & slit coils" },
      { label: "Thickness / Width", value: "[Editable: Confirm millimeter gauge]" },
      { label: "Alloy / Grade", value: "[Editable: Confirm C11000 / Cu-ETP etc.]" },
      { label: "Surface Finish", value: "[Editable: Mill finish / clean scrap]" },
    ],
    packagingNote:
      "Interleaved or strapped on reinforced export skids with moisture-barrier wrapping.",
    availableConfirmed: true,
  },
  {
    id: "other-copper-materials",
    name: "Other Copper Materials",
    categoryTag: "CUSTOM & SECONDARY FORMS",
    shortDescription:
      "Copper rod billets, ingots, industrial turnings, and bespoke secondary copper grades sourced on requirement.",
    specificationLabel: "Spec: [Confirm Custom Requirement — Placeholder]",
    image: "/images/product-other-copper.jpg",
    imageAlt:
      "Assorted copper rod billets, cast ingots, spiral turnings, and copper fittings on dark slate",
    overview:
      "Beyond standard wire and heavy scrap, DCHIND EXPORTS supports custom procurement inquiries for specialized copper alloys, billets, ingots, and secondary mill forms.",
    specs: [
      { label: "Material Forms", value: "Rods, billets, ingots, turnings & fittings" },
      { label: "Grade Reference", value: "[Editable: Buyer-specified standard]" },
      { label: "Minimum Order", value: "[Editable: Container load / trial lot]" },
      { label: "Verification", value: "[Editable: Pre-shipment check protocol]" },
    ],
    packagingNote:
      "Custom export packing configured around material density, port handling, and buyer unloading equipment.",
    availableConfirmed: true,
  },
];

export const QUALITY_PILLARS: QualityPillar[] = [
  {
    id: "material-inspection",
    title: "Material Inspection",
    description:
      "Visual sorting and physical batch screening to verify material uniformity and identify unwanted coatings or foreign attachments prior to packing.",
  },
  {
    id: "quality-verification",
    title: "Quality Verification",
    description:
      "Structured pre-shipment verification workflows—with third-party inspection support arranged per contract terms when requested by the buyer.",
  },
  {
    id: "consistent-specs",
    title: "Consistent Material Specifications",
    description:
      "Clear grade definitions, moisture checks, and batch weight reconciliation aligned with agreed commercial purchase specifications.",
  },
  {
    id: "documentation-compliance",
    title: "Documentation & Compliance",
    description:
      "Accurate packing lists, commercial invoices, origin paperwork, and regulatory export filings prepared for smooth customs clearance.",
  },
];

export const QUALITY_HIGHLIGHT_CARD = {
  badge: "VERIFICATION PROTOCOL",
  title: "Pre-Shipment Assurance Framework",
  description:
    "Every shipment follows a documented review before container sealing. [Editable Placeholder: Add verified inspection agency partnerships, analytical testing methods, or quality certifications once formally confirmed.]",
  checkpoints: [
    "Pre-loading material & container photo/video logs",
    "Weighbridge verification & seal number recording",
    "[Placeholder: Optional 3rd-party inspection per buyer contract]",
  ],
};

export const LOGISTICS_CARDS: LogisticsCard[] = [
  {
    id: "global-shipping",
    tag: "01 / MARITIME FREIGHT",
    title: "Global Shipping",
    description:
      "Coordinated sea-freight container bookings structured for international buyers across major commercial shipping lanes.",
  },
  {
    id: "export-documentation",
    tag: "02 / TRADE PAPERWORK",
    title: "Export Documentation",
    description:
      "Complete commercial invoicing, packing lists, bills of lading, and customs documentation prepared with meticulous accuracy.",
  },
  {
    id: "secure-packaging",
    tag: "03 / CARGO INTEGRITY",
    title: "Secure Packaging & Handling",
    description:
      "Pressed bales, strapped coils, jumbo bags, and container bracing engineered to protect cargo stability throughout transit.",
  },
  {
    id: "shipment-coordination",
    tag: "04 / END-TO-END TRACKING",
    title: "Reliable Shipment Coordination",
    description:
      "Clear milestone updates from yard loading and port gate-in through vessel departure and document dispatch.",
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: "quality-focused",
    metricTag: "01",
    title: "Quality-Focused Supply",
    description:
      "Disciplined material screening and clear specification alignment so buyers receive consistent copper scrap feed.",
  },
  {
    id: "reliable-partnerships",
    metricTag: "02",
    title: "Reliable Business Partnerships",
    description:
      "Built for repeat, long-term commercial relationships grounded in accountability and straightforward execution.",
  },
  {
    id: "competitive-approach",
    metricTag: "03",
    title: "Competitive Commercial Approach",
    description:
      "Market-aligned pricing structures and transparent commercial terms tailored to volume and grade requirements.",
  },
  {
    id: "efficient-communication",
    metricTag: "04",
    title: "Efficient Communication",
    description:
      "Direct, responsive trade desk coordination from initial quotation through vessel sailing and post-delivery support.",
  },
  {
    id: "export-coordination",
    metricTag: "05",
    title: "Export Coordination",
    description:
      "Structured container loading, export compliance, and timely shipping documentation for cross-border delivery.",
  },
];

/**
 * Editable Contact Details.
 * Replace placeholders with verified company contact data before deployment.
 */
export const CONTACT_INFO = {
  addressLabel: "Registered Office & Operations",
  addressValue: "[Editable Placeholder: Street Address, City, Country]",
  emailLabel: "Trade & Export Desk",
  emailValue: "trade@dchindexports-placeholder.com",
  phoneLabel: "Direct Telephone",
  phoneDisplay: "+[XX] [XXX-XXX-XXXX] (Placeholder)",
  phoneHref: "tel:+00000000000",
  whatsappLabel: "WhatsApp Business",
  whatsappDisplay: "Chat on WhatsApp (Configurable Link)",
  whatsappUrl: "https://wa.me/00000000000?text=Hello%20DCHIND%20EXPORTS%2C%20I%20would%20like%20to%20discuss%20a%20copper%20scrap%20inquiry.",
  linkedinUrl: "#contact",
};

