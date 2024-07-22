// import { Input } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export const SendMail = () => {
  const form: any = useRef();

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();

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
          className="block h-12 w-full rounded-md border border-gray-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
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
          className="block h-12 w-full rounded-md border border-gray-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
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
          className="block h-32 w-full rounded-md border border-gray-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
          placeholder="Type your message here..."
          rows={5}
          name="message"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 w-full animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 hover:text-white duration-500"
      >
        Send Message
      </button>
      {/* <input
        className="transition-background animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors duration-500 cursor-pointer"
        // className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white duration-500 cursor-pointer"
        type="submit"
        // variant="unstyled"
        value="Send Message"
      /> */}
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
