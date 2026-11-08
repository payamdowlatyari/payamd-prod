"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Projects", url: "/projects" },
  { title: "Contact", url: "/contact" },
];

export function Nav({
  onNavigate,
}: {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Main navigation">
      <ol className="space-y-3 sm:space-y-4">
        {links.map(({ title, url }, index) => {
          const active =
            url === "/" ? pathname === url : pathname?.startsWith(url);
          return (
            <motion.li
              key={url}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: reduceMotion ? 0 : index * 0.06,
              }}
            >
              <Link
                href={url}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className="group inline-flex items-baseline gap-5 rounded-sm py-1 sm:gap-8"
              >
                <span className="text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[1.1] tracking-[-0.045em] decoration-1 underline-offset-8 transition-colors group-hover:text-muted-foreground ${active ? "underline" : ""}`}
                >
                  {title}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

function MenuPanel({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog?.close();
    };
  }, []);

  return (
    <motion.dialog
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
      ref={dialogRef}
      id="explore-menu"
      aria-label="Explore the site"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 bg-background p-0 text-foreground backdrop:bg-transparent"
    >
      <div className="flex min-h-dvh flex-col px-6 sm:px-10 lg:px-16">
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border/60">
          <Link href="/" onClick={onNavigate} aria-label="Home">
            <Image
              src="/pd-logo1-removebg-preview.png"
              alt="Payam Dowlatyari"
              width={48}
              height={48}
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 items-center gap-4 rounded-sm px-2 text-sm"
          >
            Close{" "}
            <span aria-hidden="true" className="text-xl font-light">
              ×
            </span>
          </button>
        </div>
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
          <Nav onNavigate={onNavigate} />
          <div
            aria-hidden="true"
            className="hidden items-center justify-center md:flex"
          >
            <Image
              src="/pd-logo1-removebg-preview.png"
              alt=""
              width={240}
              height={240}
              className="h-auto w-48 opacity-20 lg:w-60"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-border/60 py-6 text-xs text-muted-foreground">
          <span>Software, photography &amp; other interests.</span>
          <span>Based in California</span>
        </div>
      </div>
    </motion.dialog>
  );
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const destination = useRef<string | null>(null);

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    destination.current = event.currentTarget.getAttribute("href");
    setIsOpen(false);
  };

  const finishExit = () => {
    const href = destination.current;
    destination.current = null;
    if (href) router.push(href);
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "explore-menu" : undefined}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-4 z-[1002] flex min-h-11 items-center gap-4 rounded-sm bg-background/80 px-3 text-sm backdrop-blur-sm sm:right-10 lg:right-16"
      >
        Explore{" "}
        <span aria-hidden="true" className="text-xl font-light">
          +
        </span>
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence onExitComplete={finishExit}>
            {isOpen && (
              <MenuPanel
                key="explore"
                onClose={() => setIsOpen(false)}
                onNavigate={navigate}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
