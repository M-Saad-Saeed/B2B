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
    <section id="faq" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.22em] text-gold">FAQ</span>
          <h2 className="mt-4 font-display text-4xl text-graphite md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Answers to common questions about custom signage, wholesale orders, white-label
            fulfilment, and worldwide shipping.
          </p>
          <div className="gold-divider mx-auto mt-8 w-24" />
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-12 space-y-3"
        >
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="overflow-hidden rounded-xl border border-border bg-[var(--card-soft)] px-5 transition-colors hover:border-gold/40 data-[state=open]:border-gold/50 data-[state=open]:bg-card"
            >
              <AccordionTrigger className="py-5 font-display text-lg text-graphite hover:no-underline md:text-xl">
                <span className="flex items-start gap-4 text-left">
                  <span className="mt-1 font-display text-xs text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-10 pr-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-card p-8 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] md:p-10">
          <h3 className="font-display text-2xl text-graphite md:text-3xl">
            Still have questions?
          </h3>
          <p className="mt-3 text-muted-foreground">
            Send us your requirements and we’ll guide you.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
