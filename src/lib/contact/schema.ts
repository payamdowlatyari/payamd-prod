export type ContactRequestInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 4000,
};

const normalize = (value: string): string => value.trim();

export function validateContactInput(
  input: ContactRequestInput
): ValidationResult {
  const name = normalize(input.name);
  const email = normalize(input.email).toLowerCase();
  const message = normalize(input.message);

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) {
    return { ok: false, error: "Name length is invalid." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Email address is invalid." };
  }

  if (
    message.length < LIMITS.messageMin ||
    message.length > LIMITS.messageMax
  ) {
    return { ok: false, error: "Message length is invalid." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      message,
    },
  };
}

export function isHoneypotTriggered(input: ContactRequestInput): boolean {
  return Boolean(input.company && input.company.trim().length > 0);
}
