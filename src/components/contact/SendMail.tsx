import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { useRef, useState } from "react";

/**
 * Sends an email using emailjs.com service.
 * @param e Event object
 * @returns void
 * @throws EmailJSResponseStatus
 */
export default function SendMail() {
  const form = useRef<HTMLFormElement>(null);

  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

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

    const {
      NEXT_PUBLIC_SERVICE_ID,
      NEXT_PUBLIC_TEMPLATE_ID,
      NEXT_PUBLIC_API_KEY,
    } = process.env;

    if (
      !NEXT_PUBLIC_SERVICE_ID ||
      !NEXT_PUBLIC_TEMPLATE_ID ||
      !NEXT_PUBLIC_API_KEY
    ) {
      setSuccess(false);
      setMessage("❌ Internal server error, please try again later");
      return;
    }

    try {
      await emailjs.send(
        NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID,
        {},
        { publicKey: NEXT_PUBLIC_API_KEY }
      );
      setSuccess(true);
      setMessage("✅ Your message has been sent!");
    } catch (error) {
      if (error instanceof EmailJSResponseStatus) {
        setSuccess(false);
        setMessage(`❌ ${error.text}, message failed! Email pdyari@gmail.com`);
        return;
      }

      setSuccess(false);
      setMessage("❌ Failed to send message, please try again later");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="m-auto-[10px] w-[500px] max-w-[95vw]"
    >
      {" "}
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>
        <input
          className="block h-12 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
          placeholder="Your name"
          name="from_name"
          type="text"
        />
      </div>
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>
        <input
          className="block h-12 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
          placeholder="Your email"
          name="user_email"
          type="email"
        />
      </div>
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>

        <textarea
          className="block h-32 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
          placeholder="Type your message here..."
          rows={5}
          name="message"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-md border border-neutral-800 hover:border-neutral-200 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 hover:text-neutral-50 hover:shadow-lg duration-500"
      >
        Send Message
      </button>
      <div className="flex justify-center p-2">
        {message &&
          (success ? (
            <span className="text-green-500">{message}</span>
          ) : (
            <span className="text-red-500">{message}</span>
          ))}
      </div>
    </form>
  );
}
