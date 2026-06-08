import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const WA_URL = "https://wa.me/14304314377";

const PRODUCT_TYPES = [
  "Acrylic Logo Sign",
  "Backlit Sign",
  "3D Acrylic Sign",
  "UV Printed Sign",
  "Wedding Acrylic Sign",
  "Business Wall Sign",
  "Metal Finish Sign",
  "Lightbox Sign",
  "Backlit & Front Lit Sign",
  "White-label / Bulk Order",
  "Other Custom Sign",
];

const LIGHTING = ["No lighting", "Backlit", "Front lit", "Lightbox", "Not sure"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;
const MAX_TOTAL_UPLOAD_SIZE = 50 * 1024 * 1024;
const QUOTE_UPLOAD_FOLDER = "quote-inquiries";
const ACCEPTED_FILE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".svg", ".ai", ".eps"];
const ACCEPTED_FILE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "image/svg+xml",
  "application/postscript",
  "application/illustrator",
  "application/eps",
  "application/x-illustrator",
  "application/x-eps",
]);

const schema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(120),
  business_name: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  whatsapp_number: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  product_type: z.string().max(80).optional().or(z.literal("")),
  size_required: z.string().trim().max(120).optional().or(z.literal("")),
  quantity: z.string().trim().max(40).optional().or(z.literal("")),
  lighting_option: z.string().max(40).optional().or(z.literal("")),
  material_finish: z.string().trim().max(200).optional().or(z.literal("")),
  deadline: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries()) as Record<string, string>;

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    const fileValidationError = validateFiles(files);
    if (fileValidationError) {
      setError(fileValidationError);
      return;
    }

    setSubmitting(true);
    try {
      let file_url: string | null = null;
      let file_urls: string[] = [];
      if (files.length > 0) {
        const uploadedPaths: string[] = [];

        for (const file of files) {
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const path = `${QUOTE_UPLOAD_FOLDER}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
          const { error: upErr } = await supabase.storage
            .from("quote-uploads")
            .upload(path, file);
          if (upErr) throw upErr;
          uploadedPaths.push(path);
        }

        file_urls = uploadedPaths;
        file_url = uploadedPaths[0] ?? null;
      }

      const { error: insErr } = await supabase.from("quote_inquiries").insert({
        ...parsed.data,
        business_name: parsed.data.business_name || null,
        whatsapp_number: parsed.data.whatsapp_number || null,
        country: parsed.data.country || null,
        product_type: parsed.data.product_type || null,
        size_required: parsed.data.size_required || null,
        quantity: parsed.data.quantity || null,
        lighting_option: parsed.data.lighting_option || null,
        material_finish: parsed.data.material_finish || null,
        deadline: parsed.data.deadline || null,
        notes: parsed.data.notes || null,
        file_url,
        file_urls,
      });
      if (insErr) throw insErr;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-10 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-[var(--card-soft)]">
          <CheckCircle2 className="h-7 w-7 text-gold" strokeWidth={1.25} />
        </div>
        <h3 className="mt-6 font-display text-3xl text-graphite">Thank you</h3>
        <p className="mt-3 text-muted-foreground">
          Your quote request has been received. Our team will contact you shortly.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-graphite px-6 py-3 text-sm text-primary-foreground transition-colors hover:bg-graphite/85"
        >
          <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="quote-orbit rounded-2xl border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name *" name="full_name" required />
        <Field label="Business name" name="business_name" />
        <Field label="Email *" name="email" type="email" required />
        <Field label="WhatsApp number" name="whatsapp_number" placeholder="+1 ..." />
        <Field label="Country" name="country" />
        <Select label="Product type" name="product_type" defaultValue={defaultProduct} options={PRODUCT_TYPES} />
        <Field label="Size required" name="size_required" placeholder='e.g. 24" x 8"' />
        <Field label="Quantity" name="quantity" placeholder="e.g. 50" />
        <Select label="Lighting option" name="lighting_option" options={LIGHTING} />
        <Field label="Material / finish preference" name="material_finish" placeholder="e.g. brushed gold acrylic" />
        <Field label="Deadline" name="deadline" placeholder="e.g. in 3 weeks" />
        <FileField files={files} setFiles={setFiles} setError={setError} />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Notes / message
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          placeholder="Tell us about your project, colours, finishes, mounting, brand details..."
        />
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitting}
          className="quote-button-glow quote-cta-animated inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-graphite/85 hover:shadow-[0_18px_35px_-18px_rgba(176,141,87,0.55)] disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Submitting..." : "Request a Quote"}
        </button>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3.5 text-sm text-graphite transition-colors hover:bg-gold/10"
        >
          <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
        </a>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        We respond to most inquiries within 12 business hours.
      </p>
    </form>
  );
}

function validateFiles(files: File[]) {
  if (files.length > MAX_FILES) {
    return "You can upload up to 5 files per quote request.";
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_UPLOAD_SIZE) {
    return "Your total upload size cannot exceed 50 MB.";
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} is larger than 10 MB. Please upload a smaller file.`;
    }

    const extension = getFileExtension(file.name);
    const isAcceptedExtension = ACCEPTED_FILE_EXTENSIONS.includes(extension);
    const isAcceptedType = file.type ? ACCEPTED_FILE_TYPES.has(file.type) : false;

    if (!isAcceptedExtension && !isAcceptedType) {
      return `${file.name} is not supported. Accepted formats: JPG, JPEG, PNG, WEBP, PDF, SVG, AI, EPS.`;
    }
  }

  return null;
}

function getFileExtension(fileName: string) {
  const index = fileName.lastIndexOf(".");
  return index >= 0 ? fileName.slice(index).toLowerCase() : "";
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      >
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileField({
  files,
  setFiles,
  setError,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
  setError: (error: string | null) => void;
}) {
  const fileNames = files.length > 0 ? files.map((file) => file.name).join(", ") : null;

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Upload logo / design
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gold/40 bg-[var(--card-soft)] px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-graphite">
        <Upload className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="truncate">
          {fileNames ?? "Choose up to 5 files"}
        </span>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps"
          className="hidden"
          onChange={(e) => {
            const nextFiles = Array.from(e.target.files ?? []);
            const validationError = validateFiles(nextFiles);

            if (validationError) {
              setFiles([]);
              setError(validationError);
              e.currentTarget.value = "";
              return;
            }

            setError(null);
            setFiles(nextFiles);
          }}
        />
      </label>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Upload your logo, reference image, or design file. Max 10 MB per file. Up to 5 files.
        Accepted formats: JPG, JPEG, PNG, WEBP, PDF, SVG, AI, EPS.
      </p>
    </div>
  );
}
