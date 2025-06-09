"use client";

import SendMail from "~/components/contact/SendMail";
import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import { beams } from "~/components/motion/GridBeam";
import { BeamPath, PulseBeams } from "~/components/motion/PulseBeams";
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
        <div className="flex flex-col justify-center items-center m-auto">
          <div className="grid gap-2 m-auto">
            <PulseBeams
              beams={beams as BeamPath[]}
              gradientColors={{
                start: "#4450CC",
                middle: "#c9d2f4",
                end: "#596cd8",
              }}
            >
              <H1 label={title} />
            </PulseBeams>
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
