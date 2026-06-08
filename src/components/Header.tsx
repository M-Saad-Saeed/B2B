import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [
  { label: "Products", href: "#products" },
  { label: "Materials", href: "#materials" },
  { label: "How It Works", href: "#how" },
  { label: "Request Quote", href: "#quote" },
];

const WA_URL = "https://wa.me/14304314377";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" aria-label="Custom Logo Sign home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-gold hover:text-gold"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a
            href="#quote"
            className="quote-cta-animated inline-flex items-center justify-center rounded-full bg-graphite px-5 py-2.5 text-sm text-primary-foreground transition-all hover:bg-graphite/85 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
          >
            Request a Quote
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm text-foreground/85 transition-colors hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="quote-cta-animated inline-flex items-center justify-center rounded-full bg-graphite px-4 py-2.5 text-sm text-primary-foreground"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
