import { SendMail } from "./SendMail";

export default function ContactPage() {
  return (
    <section>
      <div className="relative">
        <div className="flex flex-col justify-center items-center m-auto">
          <h1>Contact</h1>
          <p>Get in touch with me</p>
          <SendMail />
        </div>
      </div>
    </section>
  );
}
