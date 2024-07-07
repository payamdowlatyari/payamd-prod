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
        className="m-1"
        focusBorderColor="white"
        placeholder="Your name"
        name="from_name"
        variant="filled"
        type="text"
      />
      <Input
        className="m-1"
        focusBorderColor="white"
        placeholder="Your email"
        name="user_email"
        variant="filled"
        type="email"
      />
      <Textarea
        className="m-1"
        placeholder="Type your message here..."
        focusBorderColor="white"
        variant="filled"
        name="message"
      />
      <Input
        className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-apple bg-gradient-to-r from-apple via-ultra-light-gray to-apple bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-black hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-ultra-light-gray focus:ring-offset-2 focus:ring-offset-ultra-light-gray duration-500 m-1"
        type="submit"
        variant="outlined"
        value="Send Message"
        style={{ cursor: "pointer" }}
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
