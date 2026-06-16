import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const quoteNotificationSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  business_name: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  whatsapp_number: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  product_type: z.string().max(80).optional().or(z.literal("")),
  size_required: z.string().trim().max(120).optional().or(z.literal("")),
  installation_environment: z.enum(["Indoor", "Outdoor"]),
  quantity: z.string().trim().max(40).optional().or(z.literal("")),
  lighting_option: z.string().max(40).optional().or(z.literal("")),
  material_finish: z.string().trim().max(200).optional().or(z.literal("")),
  deadline: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

const quoteSubmissionSchema = quoteNotificationSchema.extend({
  company_website: z.string().max(200).optional().or(z.literal("")),
});

export const validateQuoteSubmission = createServerFn({ method: "POST" })
  .inputValidator(quoteSubmissionSchema)
  .handler(async ({ data }) => {
    if (data.company_website?.trim()) {
      throw new Error("Quote submission rejected");
    }

    return { ok: true };
  });

export const sendQuoteNotification = createServerFn({ method: "POST" })
  .inputValidator(quoteNotificationSchema)
  .handler(async ({ data }) => {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Quote notification is not configured; skipping Web3Forms delivery");
      }
      return { ok: false, skipped: true };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New quote request from ${data.full_name}`,
        from_name: "Custom Logo Sign Website",
        name: data.full_name,
        email: data.email,
        replyto: data.email,
        message: formatEmailMessage(data),
        business_name: data.business_name || undefined,
        whatsapp_number: data.whatsapp_number || undefined,
        country: data.country || undefined,
        product_type: data.product_type || undefined,
        size_required: data.size_required || undefined,
        installation_environment: data.installation_environment,
        quantity: data.quantity || undefined,
        lighting_option: data.lighting_option || undefined,
        material_finish: data.material_finish || undefined,
        deadline: data.deadline || undefined,
        notes: data.notes || undefined,
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !result.success) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Web3Forms notification request failed", {
          status: response.status,
          success: result.success === true,
        });
      }
      throw new Error("Quote notification failed");
    }

    return { ok: true, skipped: false };
  });

function formatEmailMessage(data: z.infer<typeof quoteNotificationSchema>) {
  return [
    `Full name: ${data.full_name}`,
    `Business name: ${data.business_name || "-"}`,
    `Email: ${data.email}`,
    `WhatsApp number: ${data.whatsapp_number || "-"}`,
    `Country: ${data.country || "-"}`,
    `Product type: ${data.product_type || "-"}`,
    `Size required: ${data.size_required || "-"}`,
    `Sign placement: ${data.installation_environment}`,
    `Quantity: ${data.quantity || "-"}`,
    `Lighting option: ${data.lighting_option || "-"}`,
    `Material / finish: ${data.material_finish || "-"}`,
    `Deadline: ${data.deadline || "-"}`,
    `Notes: ${data.notes || "-"}`,
  ].join("\n");
}
