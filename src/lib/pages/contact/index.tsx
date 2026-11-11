"use client";

import { motion, useReducedMotion } from "motion/react";

import SendMessage from "~/components/contact/SendMessage";
import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { contactDetails, portfolio } from "~/data";

const interests = [
  {
    title: "Interfaces & experiences",
    text: "Thoughtful websites, applications, and user experiences.",
  },
  {
    title: "AI & data applications",
    text: "Useful search, automation, and data-driven products.",
  },
  {
    title: "Architecture & cloud",
    text: "Reliable systems built to grow with the product.",
  },
];

export default function Contact(): JSX.Element {
  const reduceMotion = useReducedMotion();
  const email =
    portfolio.contacts
      .flatMap((group) => group.links)
      .find((link) => link.url.startsWith("mailto:"))?.url ??
    "mailto:pdowlatyari@gmail.com";

  return (
    <main>
      <Menu />
      <div className="section-shell pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <p className="heading-label mb-7">{contactDetails.title}</p>
          <h1 className="page-title max-w-5xl">Let’s connect.</h1>
          <p className="body-copy mt-7 max-w-[46ch]">
            {contactDetails.description}
          </p>
        </motion.div>

        <div className="mt-14 grid items-start gap-14 border-t border-border pt-10 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24 lg:pt-14">
          <div>
            <h2 className="heading-label mb-7">Ways we can collaborate</h2>
            <ol className="divide-y divide-border/60">
              {interests.map((interest, index) => (
                <li key={interest.title} className="flex gap-5 py-5 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="pt-1 text-xs tabular-nums text-muted-foreground"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="item-title">{interest.title}</h3>
                    <p className="mt-2 max-w-[36ch] text-sm leading-6 text-muted-foreground">
                      {interest.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 border-t border-border pt-7">
              <p className="mb-3 text-xs text-muted-foreground">
                Prefer email?
              </p>
              <a
                href={email}
                className="break-all text-base underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {email.replace("mailto:", "")}
              </a>
              <p className="mt-6 text-sm text-muted-foreground">
                Or{" "}
                <a
                  href="https://calendly.com/pdowlatyari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                >
                  book a conversation
                </a>
                .
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="card-title">Tell me what you have in mind.</h2>
            <p className="mb-7 mt-3 text-sm leading-6 text-muted-foreground">
              Share a little about your project or opportunity.
            </p>
            <SendMessage />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
