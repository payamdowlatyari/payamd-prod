import type { ContactPayload } from "~/lib/contact/schema";

type ProviderConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
};

function getProviderConfig(): ProviderConfig | null {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey,
  };
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const config = getProviderConfig();

  if (!config) {
    throw new Error("Contact provider is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  const form = new FormData();
  form.append("service_id", config.serviceId);
  form.append("template_id", config.templateId);
  form.append("user_id", config.publicKey);
  form.append("accessToken", config.privateKey);
  form.append("template_params[from_name]", payload.name);
  form.append("template_params[user_email]", payload.email);
  form.append("template_params[message]", payload.message);

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: form,
        signal: controller.signal,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to send contact email. Status: ${response.status}`
      );
    }
  } finally {
    clearTimeout(timeout);
  }
}
