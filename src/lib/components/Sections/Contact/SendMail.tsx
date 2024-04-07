import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Input, Textarea } from "@chakra-ui/react";

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
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      <Input
        focusBorderColor="white"
        placeholder="Your name"
        name="from_name"
        variant="flushed"
        type="text"
      />
      <Input
        focusBorderColor="white"
        placeholder="Your email"
        name="user_email"
        variant="flushed"
        type="email"
      />
      <Textarea
        placeholder="Type your message here..."
        focusBorderColor="white"
        variant="flushed"
        name="message"
      />
      <Input type="submit" variant="filled" value="Send" />
      <div className="message-confirm">
        {message &&
          (success ? (
            <span className="message-success">{message}</span>
          ) : (
            <span className="message-fail">{message}</span>
          ))}
      </div>
    </form>
  );
};
