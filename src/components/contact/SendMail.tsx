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
      className="w-[500px] max-w-[98vw] m-auto"
    >
      <div className="relative my-2">
        <input
          className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
          placeholder="Your name"
          name="from_name"
          type="text"
        />
      </div>
      <div className="relative my-2">
        <input
          className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
          placeholder="Your email"
          name="user_email"
          type="email"
        />
      </div>
      <div className="relative my-2">
        <textarea
          className="border-1 block h-32 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
          placeholder="Type your message here..."
          rows={5}
          name="message"
        />
      </div>
      <button
        type="submit"
        className="transition-background inline-flex h-12 w-full items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-indigo-200 to-indigo-300 bg-[length:200%_200%] bg-[0%_0%] px-6 font-bold text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Send Message
      </button>
      <div className="flex justify-center my-2">
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
