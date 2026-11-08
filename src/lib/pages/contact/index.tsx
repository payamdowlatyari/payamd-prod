"use client";

import SendMessage from "~/components/contact/SendMessage";
import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import CTA from "~/components/ui/CTA";
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
    <main className="overflow-hidden">
      <Menu />
      <section className="section-shell relative z-10 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
          <div className="mb-8 grid gap-5 text-center">
            <H1 label={title} />
            <Paragraph
              text={description}
              className="mx-auto max-w-[50ch] text-center"
            />
          </div>
          <SendMessage />
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto my-20 py-10 px-4">
        <CTA conversation />
      </div>

      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
