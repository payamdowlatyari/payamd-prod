import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { useRef, useState } from "react";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Sends an email using emailjs.com service.
 * @param e Event object
 * @returns void
 * @throws EmailJSResponseStatus
 */
export default function SendMessage() {
  const form: any = useRef();

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return (
      <p className="text-sm leading-6 text-muted-foreground">
        Please email me directly at{" "}
        <a
          href="mailto:pdowlatyari@gmail.com"
          className="text-foreground underline underline-offset-4"
        >
          pdowlatyari@gmail.com
        </a>
        .
      </p>
    );
  }

  /**
   * Handles sending an email through emailjs.com service.
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event
   * @returns {Promise<void>}
   * @throws {EmailJSResponseStatus}
   */
  const sendEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!form.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSuccess(false);
      setMessage("Failed to send message, please try again later");
      return;
    }

    try {
      setLoading(true);
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.current.from_name.value,
          user_email: form.current.user_email.value,
          message: form.current.message.value,
        },
        { publicKey: PUBLIC_KEY }
      );
      setSuccess(true);
      setLoading(false);
      setMessage("Your message has been sent!");
    } catch (error) {
      if (error instanceof EmailJSResponseStatus) {
        setSuccess(false);
        setMessage(
          "Your message could not be sent. Please email pdowlatyari@gmail.com."
        );
        setLoading(false);
        return;
      }
      setSuccess(false);
      setLoading(false);
      setMessage("Failed to send message, please try again later");
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="w-full">
      <label htmlFor="contact-name" className="relative my-4 block">
        <span className="mb-2 block text-xs text-muted-foreground">Name</span>
        <input
          id="contact-name"
          autoComplete="name"
          required
          className="block h-12 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Your name"
          name="from_name"
          type="text"
        />
      </label>
      <label htmlFor="contact-email" className="relative my-4 block">
        <span className="mb-2 block text-xs text-muted-foreground">Email</span>
        <input
          id="contact-email"
          autoComplete="email"
          required
          className="block h-12 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Your email"
          name="user_email"
          type="email"
        />
      </label>
      <label htmlFor="contact-message" className="relative my-4 block">
        <span className="mb-2 block text-xs text-muted-foreground">
          Message
        </span>
        <textarea
          id="contact-message"
          required
          className="block h-32 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Type your message here..."
          rows={5}
          name="message"
        />
      </label>
      <button
        disabled={loading}
        type="submit"
        className="button-primary w-full"
      >
        {loading ? "Sending…" : "Send message"}
      </button>
      <div role="status" aria-live="polite" className="pt-3 text-sm">
        {message &&
          (success ? (
            <span className="text-primary">{message}</span>
          ) : (
            <span className="text-destructive">{message}</span>
          ))}
      </div>
    </form>
  );
}
