"use client";

import SendMail from "~/components/contact/SendMail";
import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { H1, Paragraph } from "~/components/ui/Texts";
import { contactDetails } from "~/data";

/**
 * A component that displays a contact page.
 *
 * @returns {JSX.Element}
 */
export default function Contact(): JSX.Element {
  const { title, description } = contactDetails;
  return (
    <main>
      <Menu />
      <section className="w-fit m-auto z-10">
        <div className="flex flex-col justify-center items-center m-auto mt-20 py-10">
          <div className="grid gap-2 m-auto">
            <H1 label={title} />
            <Paragraph
              text={description}
              className="mb-4 mx-auto text-center max-w-sm"
            />
          </div>
          <SendMail />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
