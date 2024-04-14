import { SendMail } from "./SendMail";

export default function ContactPage() {
  return (
    <section>
      <div className="contact-form-wrapper">
        <div>
          <h1>Contact</h1>
          <p>Get in touch with me</p>
          <SendMail />
        </div>
      </div>
    </section>
  );
}
