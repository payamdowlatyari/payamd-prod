import { RiArrowRightUpLine } from "react-icons/ri";

import BlurFade from "~/components/motion/BlurFade";

import { LinkArrowOut } from "./Button";

/** One shared reveal keeps the invitation and its actions together. */
export default function CTA({
  conversation = false,
}: {
  conversation?: boolean;
}) {
  return (
    <BlurFade inView duration={0.6} className="w-full">
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md space-y-3">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {conversation ? "Prefer a conversation?" : "Let’s build something."}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {conversation
              ? "Book a meeting to talk through your project or opportunity."
              : "Have a project or opportunity to discuss? I’d love to hear about it."}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4">
          <a
            href={
              conversation
                ? "https://calendly.com/pdowlatyari"
                : "mailto:pdowlatyari@gmail.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary gap-2"
          >
            {conversation ? "Book a meeting" : "Email me"}
            <RiArrowRightUpLine aria-hidden="true" className="h-5 w-5" />
          </a>
          {!conversation && (
            <LinkArrowOut
              title="Book a meeting"
              url="https://calendly.com/pdowlatyari"
            />
          )}
        </div>
      </div>
    </BlurFade>
  );
}
