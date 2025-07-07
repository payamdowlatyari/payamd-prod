"use client";

import SendMail from "~/components/contact/SendMail";
import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import { beams } from "~/components/motion/GridBeam";
import { BeamPath, PulseBeams } from "~/components/motion/PulseBeams";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import WorldMap from "~/components/motion/WorldMap";
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
          <WorldMap
            dots={[
              {
                start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
                end: { lat: 40.7128, lng: -74.006, label: "New York" },
              },
              {
                start: { lat: 40.7128, lng: -74.006, label: "New York" },
                end: { lat: 51.5074, lng: -0.1278, label: "London" },
              },
              {
                start: { lat: 51.5074, lng: -0.1278, label: "London" },
                end: { lat: 48.2082, lng: 16.3738, label: "Vienna" },
              },
              {
                start: { lat: 48.2082, lng: 16.3738, label: "Vienna" },
                end: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
              },
              {
                start: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
                end: { lat: 35.6895, lng: 139.6917, label: "Tehran" },
              },
            ]}
          />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
