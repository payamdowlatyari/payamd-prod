"use client";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import SendMail from "~/components/Message/SendMail";
import { beams } from "~/components/motion/GridBeam";
import { PulseBeams } from "~/components/motion/PulseBeams";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { H1, Paragraph } from "~/components/Texts/Texts";
import { contactDetails } from "~/data";

/**
 * Contact component
 * @returns {JSX.Element}
 */
export default function Contact(): JSX.Element {
  return (
    <main>
      <Menu />
      <section className="w-fit m-auto z-10">
        <div className="flex flex-col justify-center items-center m-auto">
          <div className="grid gap-2 m-auto">
            <PulseBeams
              beams={beams as any}
              gradientColors={{
                start: "#18CCFC",
                middle: "#6344F5",
                end: "#AE48FF",
              }}
            >
              <H1 label={contactDetails.title} />
            </PulseBeams>
            <Paragraph
              text={contactDetails.description}
              className="mb-4 mx-auto text-center max-w-sm"
            />
          </div>
          <SendMail />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar showPercentage />
    </main>
  );
}
