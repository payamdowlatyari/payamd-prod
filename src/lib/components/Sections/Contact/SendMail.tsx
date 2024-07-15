import { Input, Textarea } from "@chakra-ui/react";
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
      <Input
        className="my-2 px-2 h-12 block w-full rounded-md border border-gray-800 bg-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
        focusBorderColor="white"
        placeholder="Your name"
        name="from_name"
        variant="unstyled"
        type="text"
      />
      <Input
        className="my-2 px-2 h-12 block w-full rounded-md border border-gray-800 bg-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
        focusBorderColor="white"
        placeholder="Your email"
        name="user_email"
        variant="unstyled"
        type="email"
      />
      <Textarea
        className="my-2 px-2 block w-full rounded-md border border-gray-800 bg-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
        placeholder="Type your message here..."
        focusBorderColor="white"
        variant="unstyled"
        name="message"
      />

      <Input
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white duration-500 cursor-pointer"
        type="submit"
        variant="unstyled"
        value="Send Message"
      />
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
