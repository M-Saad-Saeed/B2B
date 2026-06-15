import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const WA_URL = "https://wa.me/14304314377";

const FAQS = [
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes. We support B2B, reseller, agency, and bulk signage orders. Pricing is quote-based and depends on size, material, finish, lighting, quantity, and design requirements.",
  },
  {
    q: "Do you offer white-label fulfilment?",
    a: "Yes. We can support white-label signage fulfilment for agencies, resellers, event planners, and business suppliers who want custom signage delivered to their clients.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We offer worldwide shipping and can ship orders through DHL, UPS, or FedEx depending on the destination and service requirements.",
  },
  {
    q: "Can I upload my logo or design file?",
    a: "Yes. You can upload your logo, artwork, or design file through the quote form. Our team will review it and guide you on the best material, size, and finish options.",
  },
  {
    q: "Do you provide a mockup before production?",
    a: "Yes. For custom orders, we can provide a digital mockup or design confirmation before production begins.",
  },
  {
    q: "What types of signs do you make?",
    a: "We make acrylic logo signs, backlit signs, 3D acrylic signs, UV printed signs, wedding acrylic signs, business wall signs, metal finish signs, lightbox signs, and backlit/front-lit signage.",
  },
  {
    q: "Do you support bulk orders?",
    a: "Yes. We support bulk signage orders for businesses, agencies, resellers, and event professionals. Bulk discounts may be available depending on quantity and specifications.",
  },
  {
    q: "How long does production and shipping take?",
    a: "Production time depends on the sign type and order size. Shipping time depends on the destination and selected courier. For urgent orders, customers can share their deadline in the quote form.",
  },
  {
    q: "Is this website for online purchasing?",
    a: "No. This is a quote-based custom signage website. There is no checkout, no cart, and no online payment. Customers should request a quote or contact us on WhatsApp.",
  },
  {
    q: "Can you help me choose the right sign type?",
    a: "Yes. If you are unsure about material, size, lighting, or finish, submit your requirements through the quote form or contact us on WhatsApp and our team will guide you.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gold lg:text-xs lg:tracking-[0.22em]">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl text-graphite lg:mt-4 lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground lg:mt-5 lg:text-base lg:leading-relaxed">
            Answers to common questions about custom signage, wholesale orders, white-label
            fulfilment, and worldwide shipping.
          </p>
          <div className="gold-divider mx-auto mt-5 w-24 lg:mt-8" />
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-8 space-y-3 lg:mt-12"
        >
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-[var(--card-soft)] px-4 transition-colors hover:border-gold/40 data-[state=open]:border-gold/50 data-[state=open]:bg-card lg:rounded-xl lg:px-5"
            >
              <AccordionTrigger className="py-4 font-display text-base text-graphite hover:no-underline lg:py-5 lg:text-xl">
                <span className="flex items-start gap-3 text-left lg:gap-4">
                  <span className="mt-1 font-display text-xs text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-8 pr-1 text-sm leading-6 text-muted-foreground lg:pb-5 lg:pl-10 lg:pr-2 lg:text-base lg:leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-gold/30 bg-card p-5 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] lg:mt-14 lg:p-10">
          <h3 className="font-display text-2xl text-graphite lg:text-3xl">Still have questions?</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground lg:mt-3 lg:text-base lg:leading-normal">
            Send us your requirements and we’ll guide you.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-7">
            <a
              href="#quote"
              className="quote-cta-animated inline-flex items-center justify-center gap-2 rounded-full bg-graphite px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-graphite/85"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
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
        </div>
      </div>
    </section>
  );
}
