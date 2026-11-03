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
      <p className="text-center">
        EmailJS service is not configured, please configure the service first.
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
        setMessage(`${error.text}, message failed! Email pdyari@gmail.com`);
        return;
      }
      setSuccess(false);
      setLoading(false);
      setMessage("Failed to send message, please try again later");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="m-auto-[10px] w-[500px] max-w-[95vw]"
    >
      {" "}
      <div className="relative my-4">
        <input
          className="block h-12 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Your name"
          name="from_name"
          type="text"
        />
      </div>
      <div className="relative my-4">
        <input
          className="block h-12 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Your email"
          name="user_email"
          type="email"
        />
      </div>
      <div className="relative my-4">
        <textarea
          className="block h-32 w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          placeholder="Type your message here..."
          rows={5}
          name="message"
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="button-primary w-full"
      >
        Send Message
      </button>
      <div className="flex justify-center p-2">
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
