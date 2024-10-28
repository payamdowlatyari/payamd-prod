import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export const SendMail = () => {
  const form: any = useRef();

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!form.current) return;

    setTimeout(() => {
      emailjs
        .sendForm("service_vwpswjd", "template_ysr7uax", form.current, {
          publicKey: "70grQE4k9fKjEvoPu",
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setSuccess(true);
              setMessage(`Your message has been sent!`);
            }
          },
          (error) => {
            setSuccess(false);
            setMessage(`${error.text}, message failed! Email pdyari@gmail.com`);
          }
        );
    }, 2000);
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
        className="inline-flex h-12 w-full animate-background-shine items-center justify-center rounded-md border border-neutral-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 hover:text-neutral-50 hover:shadow-lg duration-500"
      >
        Send Message
      </button>
      <div className="flex justify-center p-2">
        {message &&
          (success ? (
            <span className="text-green">{message}</span>
          ) : (
            <span className="text-red">{message}</span>
          ))}
      </div>
    </form>
  );
};
