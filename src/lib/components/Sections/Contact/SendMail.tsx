import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input, Textarea } from "@chakra-ui/react";

export const SendMail = () => {
  const form: any = useRef();

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    emailjs.sendForm("service_vwpswjd", "template_ysr7uax", form.current, {
      publicKey: "70grQE4k9fKjEvoPu",
    });
    //   .then(
    //     () => {
    //       console.log("SUCCESS!");
    //     },
    //     (error) => {
    //       console.log("FAILED...", error.text);
    //     }
    //   );
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
    </form>
  );
};
