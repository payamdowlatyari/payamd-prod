import type { ContactPayload } from "~/lib/contact/schema";

type ProviderConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
  toEmail: string;
};

function getProviderConfig(): ProviderConfig | null {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!serviceId || !templateId || !publicKey || !privateKey || !toEmail) {
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey,
    toEmail,
  };
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const config = getProviderConfig();

  if (!config) {
    throw new Error("Contact provider is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          accessToken: config.privateKey,
          template_params: {
            from_name: payload.name,
            user_email: payload.email,
            message: payload.message,
            to_email: config.toEmail,
          },
        }),
        signal: controller.signal,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Contact provider failed with status ${response.status}.`
      );
    }
  } finally {
    clearTimeout(timeout);
  }
}
