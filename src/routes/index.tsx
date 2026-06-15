import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Factory,
  Globe as Globe2,
  Instagram,
  Layers,
  Layers3,
  Mail,
  MapPin,
  Package,
  Palette,
  PenTool,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { QuoteForm } from "@/components/QuoteForm";
import { FAQ } from "@/components/FAQ";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import heroHeader from "@/hero-header.png";
import threeDAcrylicSign from "@/assets/products/3d-acrylic-sign.jpg";
import acrylicLogoSign from "@/assets/products/acrylic-logo-sign.jpg";
import businessWallSign from "@/assets/products/business-wall-sign.png";
import backlitSign from "@/assets/products/backlit-sign.jpg";
import bulkOrdersSign from "@/assets/products/bulk-orders-sign.jpg";
import frontLitSign from "@/assets/products/front-lit-sign.jpg";
import lightboxSign from "@/assets/products/lightbox-sign.jpg";
import metalFinishSign from "@/assets/products/metal-finish-sign.jpg";
import materialsFinishesImage from "@/assets/materials-finishes.jpg";
import uvPrintedSign from "@/assets/products/uv-printed-sign.png";
import weddingAcrylicSign from "@/assets/products/wedding-acrylic-sign.jpg";
import weddingSeatingSign from "@/assets/products/wedding-seating-sign.jpg";

const WA_URL = "https://wa.me/14304314377";
const INSTAGRAM = "https://www.instagram.com/custom_logo_signs_/";
const EMAIL = "support@customlogosigns.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom Logo Sign — Premium B2B & Wholesale Custom Signage" },
      {
        name: "description",
        content:
          "Custom acrylic, backlit, 3D, UV printed, metal finish and event signage manufactured for B2B, wholesale and white-label clients. Worldwide shipping. Request a quote.",
      },
      { property: "og:title", content: "Custom Logo Sign — Premium B2B Signage Manufacturer" },
      {
        property: "og:description",
        content:
          "Premium custom signage made to order for businesses, agencies, resellers and event professionals. White-label fulfilment, worldwide shipping.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <Hero />
        <TrustStrip />
        <StatsSection />
        <ProductCatalogueSection />
        <WhyUs />
        <Materials />
        <HowItWorks />
        <B2B />
        <FAQ />
        <QuoteSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-0 lg:px-10 lg:pb-16 lg:pt-2">
      <div className="-mx-6 lg:hidden">
        <div className="relative overflow-hidden">
          <img
            src={heroHeader}
            alt="Premium custom acrylic and illuminated signage display"
            className="aspect-[4/5] w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 pb-6 pt-16 text-center text-white">
            <h1 className="mx-auto max-w-[24ch] font-display text-[2.7rem] leading-[0.95]">
              Custom Signs for Brands, Resellers &amp; Businesses.
            </h1>
          </div>
        </div>

        <div className="px-6 pb-4 pt-5">
          <a
            href="#quote"
            className="quote-cta-animated group inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground transition-all hover:bg-graphite/85 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)]"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="px-6 pt-4">
          <h2 className="text-center font-display text-[2.2rem] text-graphite">
            Why Partner With Us
          </h2>
          <div className="mt-6">
            <MobileHeroFeatures />
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-14 lg:grid lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[var(--card-soft)] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-graphite">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            B2B · Wholesale · White-label
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] text-graphite md:text-[3.6rem] lg:text-[4.2rem]">
            Custom signs made for{" "}
            <span className="gold-gradient-text italic">brands, resellers</span> &amp; businesses.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Premium acrylic, backlit, UV printed, metal finish, and event signage manufactured for
            B2B, wholesale, and white-label clients.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="quote-cta-animated group inline-flex items-center justify-center gap-2 rounded-full bg-graphite px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-graphite/85 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm text-graphite transition-colors hover:bg-gold/10"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-12 lg:hidden">
            <MobileHeroFeatures />
          </div>

          <div className="mt-12 hidden lg:block">
            <DesktopHeroFeatures />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-[8.75px] hidden h-32 w-32 rounded-full border border-gold/30 lg:block" />
          <div className="absolute -bottom-8 -right-6 hidden h-40 w-40 rounded-full border border-gold/20 lg:block" />
          <div className="overflow-hidden rounded-[2rem] border border-gold/20 bg-card shadow-[0_30px_80px_-38px_rgba(0,0,0,0.32)]">
            <img
              src={heroHeader}
              alt="Premium custom acrylic and illuminated signage display"
              className="aspect-[4/5] w-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-0 left-6 right-6 hidden rounded-xl border border-border bg-card/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] backdrop-blur md:flex md:items-center md:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-graphite text-primary-foreground">
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <div className="text-xs leading-tight">
              <div className="font-display text-base text-graphite">Bespoke craftsmanship</div>
              <div className="text-muted-foreground">Made to order · No minimum on samples</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- TRUST -------------------- */
function TrustStrip() {
  const items = [
    { Icon: PenTool, label: "Custom quotations on demand" },
    { Icon: Clock, label: "Production 1-3 Days" },
    { Icon: Package, label: "Bulk order discounts" },
    { Icon: Palette, label: "Design support available" },
    { Icon: Globe2, label: "Worldwide delivery" },
  ];
  return (
    <section className="hidden border-y border-border/70 bg-[var(--card-soft)] lg:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <span className="text-sm text-graphite">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileHeroFeatures() {
  const items = [
    { Icon: Tag, title: "White-label", subtitle: "fulfilment" },
    { Icon: Truck, title: "Shipping Channels", subtitle: "DHL · UPS · FedEx" },
    { Icon: Package, title: "Bulk order", subtitle: "discounts" },
    { Icon: PenTool, title: "Custom quotations", subtitle: "on demand" },
    { Icon: Clock, title: "Production", subtitle: "1-3 Days" },
    { Icon: Palette, title: "Design support", subtitle: "available" },
  ];

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      {items.map(({ Icon, title, subtitle }) => (
        <div key={title} className="flex items-start gap-3">
          <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" strokeWidth={1.6} />
          <div className="leading-tight">
           <div className="text-[0.60rem] text-graphite">{title}</div>
            <div className="mt-1 text-[0.60rem] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DesktopHeroFeatures() {
  const items = [
    { Icon: Tag, title: "White-label", subtitle: "fulfilment" },
    { Icon: Truck, title: "Shipping", subtitle: "Channels DHL · UPS · FedEx" },
    { Icon: Package, title: "Bulk order", subtitle: "discounts" },
    { Icon: PenTool, title: "Custom quotations", subtitle: "on demand" },
    { Icon: Clock, title: "Production", subtitle: "1-3 Days" },
    { Icon: Palette, title: "Design support", subtitle: "available" },
  ];

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-x-10 gap-y-12">
      {items.map(({ Icon, title, subtitle }) => (
        <div key={title} className="flex items-start gap-4">
          <Icon className="mt-0.5 h-7 w-7 shrink-0 text-gold" strokeWidth={1.3} />
          <div className="text-left leading-[1.15]">
            <div className="text-[0.8rem] text-graphite">{title}</div>
            <div className="mt-1 text-[0.8rem] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------- PRODUCT CATALOGUE -------------------- */
type CatalogueSubProduct = {
  title: string;
  description: string;
  tags: string[];
};

type CatalogueCategory = {
  title: string;
  intro: string;
  products: CatalogueSubProduct[];
};

const catalogueCategories: CatalogueCategory[] = [
  {
    title: "Wedding & Event Signs",
    intro:
      "Custom event signage for planners, venues, decorators, weddings, and branded celebrations.",
    products: [
      {
        title: "Welcome Signs",
        description:
          "Statement entrance signs for weddings, events, venues, and branded occasions.",
        tags: ["Events", "Acrylic", "Custom Size"],
      },
      {
        title: "Table Numbers",
        description: "Premium table number signage for weddings, banquets, and event setups.",
        tags: ["Tabletop", "Event Decor", "Custom Finish"],
      },
      {
        title: "Seating Arrangements",
        description: "Custom seating chart displays for organized, elegant guest experiences.",
        tags: ["Seating Chart", "Large Format", "Planner Friendly"],
      },
      {
        title: "Acrylic Event Signs",
        description: "Clear, frosted, or printed acrylic signs for events and special occasions.",
        tags: ["Acrylic", "UV Printed", "Event Display"],
      },
      {
        title: "Custom Name Signs",
        description: "Personalized name signs for couples, brands, venues, and celebrations.",
        tags: ["Names", "Script Style", "Made to Order"],
      },
    ],
  },
  {
    title: "Acrylic Business Signs",
    intro:
      "Premium acrylic signage for offices, salons, clinics, studios, shops, and reception walls.",
    products: [
      {
        title: "UV Printed Acrylic Signs",
        description:
          "Full-color printed acrylic signs with sharp detail and a clean professional finish.",
        tags: ["UV Printed", "Logo Signs", "Full Color"],
      },
      {
        title: "Business Wall Signs",
        description:
          "Wall-mounted logo signs for offices, reception areas, retail stores, and studios.",
        tags: ["Wall Mounted", "Reception", "Branding"],
      },
      {
        title: "Frosted Acrylic Signs",
        description: "Soft matte acrylic signage for premium interiors and subtle brand displays.",
        tags: ["Frosted", "Interior", "Premium"],
      },
      {
        title: "Clear Acrylic Signs",
        description: "Transparent acrylic logo signs with a modern, clean, and polished look.",
        tags: ["Clear Acrylic", "Modern", "Standoff"],
      },
      {
        title: "Standoff Acrylic Signs",
        description: "Acrylic panels mounted with metal standoffs for a floating wall sign effect.",
        tags: ["Standoffs", "Wall Sign", "Office"],
      },
    ],
  },
  {
    title: "Metal Finish Signs",
    intro:
      "Premium metal-look finishes for luxury branding, professional interiors, and commercial spaces.",
    products: [
      {
        title: "2D Metal Signs",
        description:
          "Flat metal-style signs for clean, durable, and professional brand presentation.",
        tags: ["2D", "Metal Finish", "Logo"],
      },
      {
        title: "Brushed Gold Signs",
        description:
          "Warm brushed gold signage for premium shops, salons, offices, and hospitality brands.",
        tags: ["Gold", "Luxury", "Brushed"],
      },
      {
        title: "Brushed Silver Signs",
        description:
          "Cool silver-finish signage for corporate, clinic, and modern interior branding.",
        tags: ["Silver", "Corporate", "Brushed"],
      },
      {
        title: "Black Metal Finish Signs",
        description:
          "Bold black metal-finish signs for modern, minimal, and high-contrast branding.",
        tags: ["Black Finish", "Modern", "Premium"],
      },
      {
        title: "Metal Acrylic Combo Signs",
        description: "Acrylic and metal-finish combinations for layered, premium sign designs.",
        tags: ["Acrylic", "Metal Combo", "Layered"],
      },
    ],
  },
  {
    title: "Channel Letters",
    intro:
      "Dimensional channel letters for storefronts, retail branding, offices, and commercial signage.",
    products: [
      {
        title: "Backlit Channel Letters",
        description:
          "Halo-lit letters with a premium glow behind each character for storefront impact.",
        tags: ["Backlit", "Halo Glow", "Storefront"],
      },
      {
        title: "Front Lit Channel Letters",
        description:
          "Illuminated front-face channel letters for bright, visible commercial signage.",
        tags: ["Front Lit", "LED", "Exterior"],
      },
      {
        title: "Front & Backlit Channel Letters",
        description: "Dual-lit channel letters with front illumination and rear halo lighting.",
        tags: ["Dual Lit", "LED", "Premium"],
      },
      {
        title: "Fully Lit Channel Letters",
        description:
          "Fully illuminated letters designed for strong nighttime visibility and brand presence.",
        tags: ["Fully Lit", "Storefront", "High Visibility"],
      },
    ],
  },
  {
    title: "Lightbox Signs",
    intro:
      "Illuminated lightbox signage for storefronts, indoor brand walls, displays, and commercial use.",
    products: [
      {
        title: "Indoor Lightbox Signs",
        description:
          "Interior illuminated signage for reception walls, studios, displays, and brand spaces.",
        tags: ["Indoor", "LED", "Display"],
      },
      {
        title: "Outdoor Lightbox Signs",
        description:
          "Exterior lightbox signs built for storefronts, visibility, and commercial branding.",
        tags: ["Outdoor", "Storefront", "Illuminated"],
      },
      {
        title: "LED Lightbox Signs",
        description:
          "Energy-efficient LED lightbox signage with clean illumination and brand clarity.",
        tags: ["LED", "Bright", "Custom"],
      },
      {
        title: "Slim Lightbox Signs",
        description:
          "Thin-profile lightbox signs for modern interiors and sleek commercial displays.",
        tags: ["Slim", "Modern", "Low Profile"],
      },
      {
        title: "Logo Lightbox Signs",
        description:
          "Custom logo lightboxes designed around brand artwork, shapes, and visual identity.",
        tags: ["Logo", "Custom Shape", "Branding"],
      },
    ],
  },
  {
    title: "3D Letters",
    intro:
      "Dimensional letters for walls, receptions, storefronts, events, and branded environments.",
    products: [
      {
        title: "Acrylic 3D Letters",
        description: "Raised acrylic letters for clean, modern, and dimensional brand displays.",
        tags: ["Acrylic", "Raised", "Wall Letters"],
      },
      {
        title: "Metal 3D Letters",
        description:
          "Dimensional metal-finish letters for premium business and storefront signage.",
        tags: ["Metal", "Dimensional", "Premium"],
      },
      {
        title: "PVC / Foam 3D Letters",
        description:
          "Lightweight dimensional letters for events, interiors, displays, and temporary branding.",
        tags: ["PVC", "Foam", "Lightweight"],
      },
      {
        title: "Painted 3D Letters",
        description:
          "Custom painted dimensional letters matched to brand colors and interior concepts.",
        tags: ["Painted", "Custom Color", "3D"],
      },
    ],
  },
];

const catalogueImages = [
  weddingAcrylicSign,
  weddingSeatingSign,
  acrylicLogoSign,
  businessWallSign,
  uvPrintedSign,
  metalFinishSign,
  backlitSign,
  frontLitSign,
  lightboxSign,
  threeDAcrylicSign,
  bulkOrdersSign,
].filter(Boolean);

function getCatalogueImage(index: number) {
  if (catalogueImages.length === 0) {
    return "";
  }

  return catalogueImages[index % catalogueImages.length];
}

function ProductCatalogueSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = catalogueCategories[activeCategoryIndex];

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="bg-background px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold lg:mb-4 lg:text-xs lg:tracking-[0.28em]">
            Product Catalogue
          </div>

          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl lg:text-5xl">
            Custom Signage We Manufacture
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground lg:mt-5 lg:text-base lg:leading-7">
            Select a category to explore custom signage options for B2B, wholesale, white-label,
            event, and business projects.
          </p>
        </div>

        <div className="mt-7 -mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:mt-10 lg:px-0">
          <div className="flex min-w-max gap-2 lg:min-w-0 lg:flex-wrap lg:justify-center lg:gap-3">
            {catalogueCategories.map((category, index) => {
              const isActive = index === activeCategoryIndex;

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={(event) => {
                    setActiveCategoryIndex(index);
                    event.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition lg:px-5 lg:py-3 lg:text-sm ${
                    isActive
                      ? "border-gold/50 bg-gold/10 text-graphite"
                      : "border-border bg-card text-muted-foreground hover:border-gold/35 hover:text-graphite"
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 mb-4 flex items-end justify-between gap-4 lg:hidden">
          <div className="min-w-0">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
              Selected Category
            </div>

            <h3 className="mt-2 font-display text-2xl leading-tight text-graphite">
              {activeCategory.title}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {activeCategory.products.length} products
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToQuote}
            className="shrink-0 rounded-full border border-gold/40 bg-card px-4 py-2 text-xs font-semibold text-graphite"
          >
            Request Quote
          </button>
        </div>

        <div className="lg:mt-10 lg:rounded-[2rem] lg:border lg:border-border lg:bg-card lg:p-8">
          <div className="hidden lg:mb-8 lg:flex lg:flex-row lg:items-end lg:justify-between lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                Selected Category
              </div>

              <h3 className="mt-3 font-display text-4xl leading-tight text-graphite">
                {activeCategory.title}
              </h3>

              <p className="mt-3 max-w-2xl text-base leading-6 text-muted-foreground">
                {activeCategory.intro}
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToQuote}
              className="mt-0 inline-flex w-auto items-center justify-center rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Request a Quote
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {activeCategory.products.map((product, index) => {
              const imageSrc = getCatalogueImage(index + activeCategoryIndex * 7);

              return (
                <article
                  key={product.title}
                  className="group overflow-hidden rounded-2xl border border-border bg-card lg:rounded-3xl lg:bg-background"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--card-soft)]">
                    <img
                      src={imageSrc}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 lg:p-5">
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold lg:text-[0.68rem] lg:tracking-[0.22em]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h4 className="mt-2 font-display text-xl leading-tight text-graphite lg:mt-3 lg:text-2xl">
                      {product.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground lg:mt-3">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 lg:mt-4">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-[0.7rem] text-muted-foreground lg:bg-card lg:px-3 lg:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={scrollToQuote}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-graphite transition hover:text-gold lg:mt-5"
                    >
                      Request Quote
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- STATS -------------------- */
function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const stats = [
    {
      value: "500+",
      endValue: 500,
      label: "Businesses Served",
    },
    {
      value: "10,000+",
      endValue: 10000,
      label: "Custom Signs Produced",
    },
    {
      value: "60+",
      endValue: 60,
      label: "Countries Shipped",
    },
    {
      value: "50+",
      endValue: 50,
      label: "B2B Business Partners",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasCounted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasCounted(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasCounted]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="border-y border-border/70 bg-[var(--card-soft)]"
    >
      <div className="mx-auto flex max-w-6xl gap-0.5 overflow-x-auto px-3 py-5 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-px lg:px-10 lg:py-7">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-[9rem] flex-1 px-2 py-4 text-center lg:min-w-0 lg:px-4 lg:py-5 lg:border-r lg:border-border/60 last:lg:border-r-0"
          >
            <div className="font-display text-4xl leading-none text-graphite sm:text-5xl">
              <CountUpValue end={stat.endValue} suffix="+" start={hasCounted} />
            </div>
            <div className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUpValue({
  end,
  suffix = "",
  start,
}: {
  end: number;
  suffix?: string;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;
    const duration = 1400;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [end, start]);

  return `${value.toLocaleString()}${suffix}`;
}

/* -------------------- WHY US -------------------- */
function WhyUs() {
  const items = [
    { Icon: ShieldCheck, label: "White-label fulfilment available" },
    { Icon: Globe2, label: "Worldwide shipping" },
    { Icon: Truck, label: "DHL · UPS · FedEx delivery" },
    { Icon: Package, label: "Bulk order discounts" },
    { Icon: PenTool, label: "Design support available" },
    { Icon: Palette, label: "Custom colours and finishes" },
    { Icon: Factory, label: "Manufacturing facility support" },
    { Icon: Clock, label: "Fast production" },
  ];
  return (
    <section className="hidden px-6 py-24 lg:block lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-[0.22em] text-gold">
              Why partner with us
            </span>
            <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">
              Why businesses work with Custom Logo Sign
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We support businesses, agencies, resellers, and event professionals with custom
              signage manufacturing, flexible finishes, and reliable fulfilment. Whether you need
              one premium piece or repeated bulk orders, we help you deliver high-quality signage to
              your clients.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(({ Icon, label }) => (
              <div
                key={label}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_16px_40px_-24px_rgba(176,141,87,0.4)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-[var(--card-soft)] text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="mt-5 font-display text-lg text-graphite">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- MATERIALS -------------------- */
const MATERIAL_GROUPS = [
  {
    title: "Acrylic",
    items: [
      "Thickness 3mm – 25mm",
      "Clear · frosted · white · black · ivory",
      "Custom colour-tinted acrylic",
    ],
  },
  {
    title: "Mounting & Spacers",
    items: [
      "Gold, silver, black, white spacers",
      "Flush-mount or stand-off depth",
      "Discreet hardware finishing",
    ],
  },
  {
    title: "Print & Detail",
    items: ["UV print artwork", "3D raised lettering", "Layered logo construction"],
  },
  { title: "Lighting", items: ["Backlit · halo", "Front lit", "Lightbox illumination"] },
  {
    title: "Finishes",
    items: [
      "Brushed gold · silver · rose gold",
      "Matte black · ivory",
      "Custom brand colour matching",
    ],
  },
];

function Materials() {
  const [openMaterialIndex, setOpenMaterialIndex] = useState(0);

  return (
    <section
      id="materials"
      className="bg-graphite px-6 py-12 text-primary-foreground lg:px-10 lg:py-24"
    >
      <div className="lg:hidden">
        <div className="mx-auto max-w-xl">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Materials &amp; Finishes
          </div>

          <h2 className="mt-3 font-display text-3xl leading-tight text-primary-foreground">
            Crafted from considered materials.
          </h2>

          <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
            Choose the material, lighting and finish — or let our team recommend the right
            combination for your brand and venue.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {MATERIAL_GROUPS.map((group, index) => {
            const isOpen = openMaterialIndex === index;

            return (
              <div
                key={group.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => setOpenMaterialIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                      <Layers3 className="h-4 w-4" strokeWidth={1.7} />
                    </span>

                    <span className="font-display text-lg text-primary-foreground">
                      {group.title}
                    </span>
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gold transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.7}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-4 pb-4 pt-3">
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-primary-foreground/75"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-graphite transition hover:opacity-90"
        >
          Request material options
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gold lg:text-xs lg:tracking-[0.22em]">
                Materials, finishes &amp; custom options
              </span>
              <h2 className="mt-3 font-display text-3xl lg:mt-4 lg:text-5xl">
                Crafted from <span className="gold-gradient-text italic">considered</span>{" "}
                materials.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/70 lg:mt-6 lg:text-base lg:leading-relaxed">
                Every sign is built to order. Choose your acrylic, lighting, finish and mounting —
                or let our team recommend the right combination for your brand and venue.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:gap-5">
                {MATERIAL_GROUPS.map((g) => (
                  <div
                    key={g.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm lg:rounded-xl lg:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="h-4 w-4 text-gold" />
                      <h3 className="font-display text-xl text-primary-foreground">{g.title}</h3>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-primary-foreground/75 lg:mt-3 lg:space-y-1.5 lg:leading-normal">
                      {g.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a
                href="#quote"
                className="quote-cta-animated mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm text-graphite transition-colors hover:bg-[var(--gold-hover)] lg:mt-10"
              >
                Request material options with your quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="lg:pl-6">
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gold/30 bg-[var(--card-soft)] p-2">
                <img
                  src={materialsFinishesImage}
                  alt="Materials and finishes chart"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
const STEPS = [
  {
    n: "01",
    title: "Share your requirements",
    desc: "Send your logo, size, quantity, deadline, and preferred finish.",
  },
  {
    n: "02",
    title: "Receive quote & mockup",
    desc: "Our team provides a custom quotation and digital mockup for approval.",
  },
  {
    n: "03",
    title: "Approve & start production",
    desc: "Once approved, your sign moves into production with selected materials and finishes.",
  },
  {
    n: "04",
    title: "Ship worldwide",
    desc: "We ship to your business, client, or final customer using DHL, UPS, or FedEx.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="lg:hidden">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
            How It Works
          </div>

          <h2 className="mt-3 font-display text-3xl leading-tight text-graphite">
            From idea to delivery.
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A straightforward process for custom, wholesale, and white-label signage.
          </p>

          <div className="mt-8 space-y-0">
            {STEPS.map((step, index) => {
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.n} className="relative flex gap-4">
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm text-gold">
                      {step.n}
                    </div>

                    {!isLast && <div className="min-h-16 w-px flex-1 bg-border" />}
                  </div>

                  <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-7"}`}>
                    <h3 className="pt-1 font-display text-xl leading-tight text-graphite">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="hidden lg:block">
          <SectionHeader
            eyebrow="Process"
            title="Simple 4-step order process"
            subtitle="From the first message to delivery — clear, considered, and on-schedule."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-px lg:overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:bg-border">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-card p-4 lg:rounded-none lg:border-0 lg:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl text-gold lg:text-4xl">{s.n}</span>
                  <div className="h-px flex-1 bg-gold/30" />
                </div>
                <h3 className="mt-3 font-display text-xl text-graphite lg:mt-5">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground lg:mt-3 lg:leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- B2B -------------------- */
function B2B() {
  const points = [
    "No public pricing required",
    "Quote-based custom orders",
    "Bulk order support",
    "Client-ready finishing",
    "Worldwide fulfilment",
    "White-label support available",
  ];
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gold/30 bg-[var(--card-soft)]">
        <div className="grid gap-10 p-10 lg:grid-cols-[1.1fr_1fr] lg:p-16">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-gold">
              For resellers &amp; agencies
            </span>
            <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">
              Built for resellers, agencies &amp; bulk buyers.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Custom Logo Sign supports B2B and white-label signage orders for businesses that need
              reliable manufacturing, flexible customization, and global fulfilment. We can help
              with custom logo signs, client projects, event signage, retail displays, and repeated
              bulk orders.
            </p>
            <a
              href="#quote"
              className="quote-cta-animated mt-8 inline-flex items-center gap-2 rounded-full bg-graphite px-7 py-3.5 text-sm text-primary-foreground transition-colors hover:bg-graphite/85"
            >
              Start a B2B Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="grid gap-3 self-center sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-graphite">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------- QUOTE -------------------- */
function QuoteSection() {
  return (
    <section id="quote" className="px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Request a Quote"
          title="Request a custom sign quote"
          subtitle="Tell us what you need — sizes, finishes, quantities, deadline — and our team will reply with a custom quotation and mockup."
        />
        <div className="mt-12">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
function Contact() {
  return (
    <section id="contact" className="bg-[var(--card-soft)] px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-gold">Contact</span>
          <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">
            Let's build your next sign.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Reach our team directly by email or WhatsApp. We typically respond within a few business
            hours.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm text-primary-foreground transition-colors hover:bg-graphite/85"
            >
              <Mail className="h-4 w-4" /> Email Us
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm text-graphite transition-colors hover:bg-gold/10"
            >
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-graphite transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" /> View Instagram
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]">
          <div className="space-y-6">
            <ContactRow Icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactRow
              icon={<WhatsAppIcon className="h-5 w-5" />}
              label="WhatsApp"
              value="+1 430 431 4377"
              href={WA_URL}
            />
            <ContactRow
              Icon={Instagram}
              label="Instagram"
              value="@custom_logo_signs_"
              href={INSTAGRAM}
            />
            <ContactRow Icon={MapPin} label="Location" value="Austin, Texas 78731" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  icon,
  label,
  value,
  href,
}: {
  Icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  icon?: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-[var(--card-soft)] text-gold">
        {icon ?? (Icon ? <Icon className="h-4 w-4" strokeWidth={1.5} /> : null)}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <div className="font-display text-lg text-graphite">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block transition-opacity hover:opacity-80"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium custom acrylic and business signage for B2B, wholesale, and white-label
              clients.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-graphite transition-colors hover:border-gold hover:text-gold"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-graphite transition-colors hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-graphite transition-colors hover:border-gold hover:text-gold"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Products", "#products"],
                ["Stats", "#stats"],
                ["Materials", "#materials"],
                ["How It Works", "#how"],
                ["Request Quote", "#quote"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-foreground/75 transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold">Get in touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-foreground/75">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-gold" />
                <a href={`mailto:${EMAIL}`} className="hover:text-gold">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <WhatsAppIcon className="mt-0.5 h-5 w-5" />
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  +1 430 431 4377
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="mt-0.5 h-4 w-4 text-gold" />
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  @custom_logo_signs_
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                Austin, Texas 78731
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Custom Logo Sign. All rights reserved.</p>
          <p>Premium signage, made to order.</p>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-graphite text-primary-foreground shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </footer>
  );
}

/* -------------------- SHARED -------------------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs uppercase tracking-[0.22em] text-gold">{eyebrow}</span>
      <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
