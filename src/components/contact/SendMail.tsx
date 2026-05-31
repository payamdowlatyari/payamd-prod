"use client";

import { type FormEvent, useState } from "react";

export default function SendMail() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const sendEmail = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("from_name") ?? ""),
      email: String(formData.get("user_email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(
          data.message ?? "Failed to send message, please try again later"
        );
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Your message has been sent.");
      form.reset();
    } catch (error) {
      console.error("Contact form submit failed", { error });
      setStatus("error");
      setMessage("Failed to send message, please try again later");
    }
  };

  const inputClassName =
    "block h-12 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50";

  const textAreaClassName =
    "block h-32 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50";

  return (
    <form
      onSubmit={sendEmail}
      className="m-auto-[10px] w-[500px] max-w-[95vw] mb-10"
    >
      {" "}
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>
        <input
          className={inputClassName}
          placeholder="Your name"
          name="from_name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
        />
      </div>
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>
        <input
          className={inputClassName}
          placeholder="Your email"
          name="user_email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
        />
      </div>
      <div className="relative my-2">
        <div className="absolute top-0 flex w-full justify-center">
          <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
        </div>

        <textarea
          className={textAreaClassName}
          placeholder="Type your message here..."
          rows={5}
          name="message"
          required
          minLength={10}
          maxLength={4000}
        />
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 w-full items-center justify-center rounded-md border border-neutral-800 hover:border-neutral-200 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 hover:text-neutral-50 hover:shadow-lg duration-500"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      <div className="flex justify-center p-2">
        {message &&
          (status === "success" ? (
            <span className="text-green-500">{message}</span>
          ) : (
            <span className="text-red-500">{message}</span>
          ))}
      </div>
    </form>
  );
}
