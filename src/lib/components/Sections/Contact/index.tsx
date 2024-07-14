import { SendMail } from "./SendMail";

export default function ContactPage() {
  return (
    <section className="relative z-[1]">
      <div className="flex flex-col justify-center items-center m-auto">
        <h1>Contact</h1>
        <p>Get in touch with me</p>
        <SendMail />
      </div>
    </section>
  );
}
