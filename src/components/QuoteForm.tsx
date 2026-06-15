import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Upload, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { sendQuoteNotification, validateQuoteSubmission } from "@/lib/api/quote.functions";

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
const MAX_TOTAL_UPLOAD_SIZE = 20 * 1024 * 1024;
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
  "application/vnd.adobe.illustrator",
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
  const submittingRef = useRef(false);

  const removeFile = (indexToRemove: number) => {
    setFiles((currentFiles) => currentFiles.filter((_, index) => index !== indexToRemove));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    setError(null);
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());

    // Basic honeypot spam layer only; real abuse protection belongs server-side.
    if (typeof raw.company_website === "string" && raw.company_website.trim()) {
      setError("We could not submit your request. Please try again.");
      return;
    }

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

    submittingRef.current = true;
    setSubmitting(true);
    try {
      await validateQuoteSubmission({
        data: {
          ...parsed.data,
          company_website: typeof raw.company_website === "string" ? raw.company_website : "",
        },
      });
      await persistQuoteInquiry(parsed.data, files);

      try {
        await sendQuoteNotification({ data: parsed.data });
      } catch (notificationError) {
        if (import.meta.env.DEV) {
          console.error(
            "Quote inquiry was saved, but notification delivery failed",
            notificationError,
          );
        }
      }

      setSuccess(true);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Quote submission failed:", err);
      }
      setError("We could not submit your request. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/[0.05] p-6 text-center lg:p-10">
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
      className="quote-orbit rounded-2xl border border-border bg-card p-4 sm:p-5 lg:rounded-[2rem] lg:p-10 lg:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="space-y-6 lg:space-y-8">
        <FormGroup number="01" title="Contact Details">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <Field label="Full name *" name="full_name" required />
            <Field label="Business name" name="business_name" />
            <Field label="Email *" name="email" type="email" required />
            <Field label="WhatsApp number" name="whatsapp_number" placeholder="+1 ..." />
            <Field label="Country" name="country" />
          </div>
        </FormGroup>

        <FormGroup number="02" title="Project Details">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <Select
              label="Product type"
              name="product_type"
              defaultValue={defaultProduct}
              options={PRODUCT_TYPES}
            />
            <Field label="Size required" name="size_required" placeholder='e.g. 24" x 8"' />
            <Field label="Quantity" name="quantity" placeholder="e.g. 50" />
            <Select label="Lighting option" name="lighting_option" options={LIGHTING} />
            <Field
              label="Material / finish preference"
              name="material_finish"
              placeholder="e.g. brushed gold acrylic"
            />
            <Field label="Deadline" name="deadline" placeholder="e.g. in 3 weeks" />
          </div>
        </FormGroup>

        <FormGroup number="03" title="Files & References">
          <FileField
            files={files}
            setFiles={setFiles}
            setError={setError}
            removeFile={removeFile}
          />
        </FormGroup>

        <FormGroup number="04" title="Additional Notes">
          <div className="space-y-1.5">
            <label className="mb-2 block text-sm font-medium text-graphite">Notes / message</label>
            <textarea
              name="notes"
              rows={4}
              className="min-h-32 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-base leading-6 text-graphite outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
              placeholder="Tell us about your project, colours, finishes, mounting, brand details..."
            />
          </div>
        </FormGroup>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-6 text-destructive">
          {error}
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitting}
          className="quote-button-glow quote-cta-animated inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Sending your request..." : "Submit Quote Request"}
          {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
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
      <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
        We usually respond within one business day. Your files are used only to prepare your
        quotation.
      </p>
    </form>
  );
}

function FormGroup({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-gold">
          {number}
        </span>

        <h3 className="font-display text-lg text-graphite">{title}</h3>
      </div>

      {children}
    </section>
  );
}

function validateFiles(files: File[]) {
  if (files.length > MAX_FILES) {
    return "You can upload up to 5 files per quote request.";
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_UPLOAD_SIZE) {
    return "Your total upload size cannot exceed 20 MB.";
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

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

async function persistQuoteInquiry(data: z.infer<typeof schema>, files: File[]) {
  const uploadedPaths: string[] = [];

  try {
    if (files.length > 0) {
      for (const file of files) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${QUOTE_UPLOAD_FOLDER}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
        const { error: upErr } = await supabase.storage.from("quote-uploads").upload(path, file, {
          contentType: file.type || undefined,
          upsert: false,
        });
        if (upErr) {
          if (import.meta.env.DEV) {
            console.error("Quote upload failed:", upErr);
          }
          throw upErr;
        }
        uploadedPaths.push(path);
      }
    }

    const { error: insErr } = await supabase.from("quote_inquiries").insert({
      ...data,
      business_name: data.business_name || null,
      whatsapp_number: data.whatsapp_number || null,
      country: data.country || null,
      product_type: data.product_type || null,
      size_required: data.size_required || null,
      quantity: data.quantity || null,
      lighting_option: data.lighting_option || null,
      material_finish: data.material_finish || null,
      deadline: data.deadline || null,
      notes: data.notes || null,
      status: "New",
      source: "Website Landing Page",
      file_url: uploadedPaths[0] ?? null,
      file_urls: uploadedPaths,
    });
    if (insErr) {
      if (import.meta.env.DEV) {
        console.error("Quote database insertion failed:", insErr);
      }
      throw insErr;
    }
  } catch (err) {
    if (uploadedPaths.length > 0) {
      const { error: cleanupError } = await supabase.storage
        .from("quote-uploads")
        .remove(uploadedPaths);
      if (cleanupError) {
        console.error("Failed to clean up quote upload rollback files", cleanupError);
      }
    }
    throw err;
  }
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
    <div className="space-y-1.5">
      <label className="mb-2 block text-sm font-medium text-graphite">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-graphite outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/10 lg:h-12"
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
    <div className="space-y-1.5">
      <label className="mb-2 block text-sm font-medium text-graphite">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-graphite outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/10 lg:h-12"
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
  removeFile,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
  setError: (error: string | null) => void;
  removeFile: (indexToRemove: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gold/35 bg-gold/[0.04] p-4 lg:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
          <Upload className="h-4 w-4" strokeWidth={1.8} />
        </span>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-graphite">Upload logo or reference files</div>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Upload your logo, reference image, or design file. Max 10 MB per file. Up to 5 files.
            Accepted formats: JPG, PNG, WEBP, PDF, SVG, AI, EPS.
          </p>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-graphite transition-colors hover:border-gold/60">
        <Upload className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span>Choose up to 5 files</span>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps"
          className="hidden"
          onChange={(e) => {
            const selectedFiles = Array.from(e.currentTarget.files ?? []);
            const combinedFiles = dedupeFiles([...files, ...selectedFiles]);
            const validationError = validateFiles(combinedFiles);

            if (validationError) {
              setError(validationError);
              e.currentTarget.value = "";
              return;
            }

            setError(null);
            setFiles(combinedFiles);
            e.currentTarget.value = "";
          }}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-graphite">{file.name}</p>

                <p className="mt-0.5 text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
                aria-label={`Remove ${file.name}`}
                title={`Remove ${file.name}`}
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function dedupeFiles(files: File[]) {
  const seen = new Set<string>();

  return files.filter((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
