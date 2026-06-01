import { LinkArrowOut } from "./Button";
import { H3, Paragraph } from "./Texts";
import WavePath from "./wave-path";

/**
 * CTA component that encourages users to connect.
 */
export default function CTA() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <WavePath className="my-10" />
      <div className="flex flex-col justify-center">
        <H3 label="Let's Connect" />
        <Paragraph
          text="Feel free to reach out if you have any questions or just want to chat. I'm always open to new opportunities and collaborations."
          className="text-neutral-400 mt-4"
        />
        <div className="flex gap-4 mt-6">
          <LinkArrowOut title="Email Me" url="mailto:pdowlatyari@gmail.com" />
          <LinkArrowOut
            title="Book a Meeting"
            url="https://calendly.com/payamdowlatyari/30min"
          />
        </div>
      </div>
    </div>
  );
}
