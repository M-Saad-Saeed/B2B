import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Package,
  Globe2,
  Sparkles,
  Layers,
  Palette,
  Lightbulb,
  Factory,
  Clock,
  PenTool,
  Mail,
  Instagram,
  MapPin,
  Check,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Placeholder } from "@/components/Placeholder";
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

type ProductCardImage = {
  src: string;
  alt: string;
};

type ProductCard = {
  title: string;
  placeholder: string;
  desc: string;
  image?: string;
  imageAlt?: string;
  carouselImages?: ProductCardImage[];
};

const WA_URL = "https://wa.me/14304314377";
const INSTAGRAM = "https://www.instagram.com/custom_logo_signs_/";
const EMAIL = "support@customlogosigns.com";

const WEDDING_CARD_IMAGES: ProductCardImage[] = [
  {
    src: weddingAcrylicSign,
    alt: "Wedding acrylic welcome sign",
  },
  {
    src: weddingSeatingSign,
    alt: "Wedding seating arrangement acrylic sign",
  },
];

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
        <Products />
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
    <section className="relative overflow-hidden px-6 pb-12 pt-2 lg:px-10 lg:pb-16 lg:pt-2">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
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

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {[
              ["White-label", "fulfilment"],
              ["Worldwide", "shipping"],
              ["Shipping Channels", "DHL · UPS · FedEx"],
              ["Bulk order", "support"],
            ].map(([a, b]) => (
              <div key={a} className="flex items-start gap-2">
                <Check className="mt-1 h-3.5 w-3.5 text-gold" strokeWidth={2} />
                <div className="text-xs leading-tight text-muted-foreground">
                  <div className="text-graphite">{a}</div>
                  <div>{b}</div>
                </div>
              </div>
            ))}
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
          <div className="absolute -bottom-6 left-6 right-6 hidden rounded-xl border border-border bg-card/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] backdrop-blur md:flex md:items-center md:gap-4">
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
    <section className="border-y border-border/70 bg-[var(--card-soft)]">
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

/* -------------------- PRODUCTS -------------------- */
const PRODUCTS: ProductCard[] = [
  {
    title: "Acrylic Logo Signs",
    placeholder: "Acrylic Logo Sign Image",
    desc: "Custom acrylic signs for offices, salons, cafés, studios, retail stores, and brand displays.",
    image: acrylicLogoSign,
    imageAlt: "Acrylic logo sign",
  },
  {
    title: "Backlit Signs",
    placeholder: "Backlit Sign Image",
    desc: "Premium illuminated signs with warm lighting, clean edges, and strong brand visibility.",
    image: backlitSign,
    imageAlt: "Backlit sign",
  },
  {
    title: "3D Acrylic Signs",
    placeholder: "3D Acrylic Sign Image",
    desc: "Dimensional acrylic signage with raised lettering, layered details, and professional finishing.",
    image: threeDAcrylicSign,
    imageAlt: "3D acrylic sign",
  },
  {
    title: "UV Printed Signs",
    placeholder: "UV Printed Sign Image",
    desc: "High-quality printed signs with sharp colour, durable finishing, and custom artwork support.",
    image: uvPrintedSign,
  },
  {
    title: "Wedding Acrylic Signs",
    placeholder: "Wedding Acrylic Sign Image",
    desc: "Welcome signs, seating arrangement signs, table numbers, and elegant event signage.",
    carouselImages: WEDDING_CARD_IMAGES,
  },
  {
    title: "Business Wall Signs",
    placeholder: "Business Wall Sign Image",
    desc: "Custom wall-mounted signs for offices, reception areas, boutiques, and commercial interiors.",
    image: businessWallSign,
    imageAlt: "Business wall sign",
  },
  {
    title: "Metal Finish Signs",
    placeholder: "Metal Finish Sign Image",
    desc: "Premium gold, silver, black, and brushed metal-look finishes for luxury branding.",
    image: metalFinishSign,
    imageAlt: "Metal finish sign",
  },
  {
    title: "Lightbox Signs",
    placeholder: "Lightbox Sign Image",
    desc: "Bright illuminated lightbox signage for retail, hospitality, and business displays.",
    image: lightboxSign,
    imageAlt: "Lightbox sign",
  },
  {
    title: "Front Lit Signs",
    placeholder: "Backlit / Front Lit Sign Image",
    desc: "Custom illuminated signage with front-lit or halo/backlit effects for maximum impact.",
    image: frontLitSign,
    imageAlt: "Front lit sign",
  },
  {
    title: "White-label / Bulk Orders",
    placeholder: "White-label / Bulk Order Image",
    desc: "Signage manufacturing and fulfilment support for agencies, resellers, planners, and business suppliers.",
    image: bulkOrdersSign,
    imageAlt: "White-label bulk order signage",
  },
];

function Products() {
  return (
    <section id="products" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Product Catalogue"
          title="Custom signage solutions for every business"
          subtitle="From logo signs to event displays, every piece is made to order with custom sizes, finishes, colours, and lighting options."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCardReveal key={p.title} index={i}>
              <div className="p-5">
                {p.carouselImages ? (
                  <WeddingImageCarousel images={p.carouselImages} />
                ) : p.image ? (
                  <div className="aspect-[5/4] overflow-hidden rounded-xl border border-gold/30 bg-[var(--card-soft)] p-2">
                    <img
                      src={p.image}
                      alt={p.imageAlt ?? p.title}
                      className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <Placeholder label={p.placeholder} aspect="aspect-[5/4]" />
                )}
              </div>
              <div className="flex flex-1 flex-col px-6 pb-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs text-gold">0{(i + 1) % 10}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-3 font-display text-2xl text-graphite">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <a
                  href="#quote"
                  className="quote-cta-inline mt-6 inline-flex items-center gap-2 text-sm text-graphite transition-colors group-hover:text-gold"
                >
                  Request Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </ProductCardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardReveal({ children, index }: { children: ReactNode; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [isVisible]);

  const isMobileViewport =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const delay = (index % (isMobileViewport ? 1 : 3)) * 80;

  return (
    <article
      ref={cardRef}
      className={`product-card-reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_60px_-30px_rgba(176,141,87,0.35)] ${
        isVisible ? "is-visible" : ""
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </article>
  );
}

function WeddingImageCarousel({ images }: { images: ProductCardImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [images.length, isPaused]);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className="group/carousel relative aspect-[5/4] overflow-hidden rounded-xl border border-gold/30 bg-[var(--card-soft)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Show previous wedding acrylic sign image"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Show next wedding acrylic sign image"
            onClick={showNext}
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image.alt}
                type="button"
                aria-label={`Show wedding acrylic sign image ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => goTo(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-white/95" : "bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

/* -------------------- STATS -------------------- */
const STATS = [
  {
    value: "500+",
    endValue: 500,
    label: "Businesses Served",
    text: "Supporting brands, agencies, retailers, cafes, studios, and event businesses.",
  },
  {
    value: "10,000+",
    endValue: 10000,
    label: "Custom Signs Produced",
    text: "Made-to-order acrylic, backlit, UV printed, metal finish, and event signage.",
  },
  {
    value: "60+",
    endValue: 60,
    label: "Countries Shipped",
    text: "Worldwide delivery support through DHL, UPS, FedEx, and trusted shipping partners.",
  },
  {
    value: "B2B",
    label: "White-label & Bulk Orders",
    text: "Fulfilment support for resellers, agencies, planners, and business suppliers.",
  },
];

function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasCounted, setHasCounted] = useState(false);

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
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasCounted]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--card-soft)] px-6 py-20 lg:px-10"
    >
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.22em] text-gold">Trusted Worldwide</span>

          <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">
            Built for businesses, agencies, and event brands
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            From single branded displays to bulk white-label fulfilment, Custom Logo Sign supports
            custom signage projects with design support, fast production, and worldwide delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <article
              key={stat.label}
              className="group animate-[statsFadeUp_0.8s_ease-out_both] rounded-2xl border border-border bg-card/90 p-7 text-center shadow-[0_18px_45px_-32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_26px_70px_-35px_rgba(176,141,87,0.55)]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="mx-auto mb-5 h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 group-hover:w-20" />

              <div className="font-display text-5xl leading-none text-graphite md:text-6xl">
                {"endValue" in stat ? (
                  <CountUpValue end={stat.endValue} suffix="+" start={hasCounted} />
                ) : (
                  stat.value
                )}
              </div>

              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {stat.label}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stat.text}</p>
            </article>
          ))}
        </div>
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
    <section className="px-6 py-24 lg:px-10">
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
  return (
    <section id="materials" className="bg-graphite px-6 py-24 text-primary-foreground lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-gold">
              Materials, finishes &amp; custom options
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Crafted from <span className="gold-gradient-text italic">considered</span> materials.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-primary-foreground/70">
              Every sign is built to order. Choose your acrylic, lighting, finish and mounting — or
              let our team recommend the right combination for your brand and venue.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {MATERIAL_GROUPS.map((g) => (
                <div
                  key={g.title}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-gold" />
                    <h3 className="font-display text-xl text-primary-foreground">{g.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-primary-foreground/75">
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
              className="quote-cta-animated mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm text-graphite transition-colors hover:bg-[var(--gold-hover)]"
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
    <section id="how" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Process"
          title="Simple 4-step order process"
          subtitle="From the first message to delivery — clear, considered, and on-schedule."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-card p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-gold">{s.n}</span>
                <div className="h-px flex-1 bg-gold/30" />
              </div>
              <h3 className="mt-5 font-display text-xl text-graphite">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
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
    <section id="quote" className="px-6 py-24 lg:px-10">
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
