"use client";

import { useState } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type Status = "idle" | "loading" | "success" | "duplicate" | "invalid" | "error";

export default function SignupForm({ formId }: { formId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) throw new Error("reCAPTCHA site key not configured");

      // Obtain reCAPTCHA v3 token (runs silently in background)
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: "email_signup" })
            .then(resolve)
            .catch(reject);
        });
      });

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), recaptchaToken }),
      });

      if (res.status === 201) {
        setStatus("success");
        return;
      }

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" || status === "duplicate") {
    return (
      <div className="rounded-xl bg-app-primary/10 border border-app-primary/20 px-6 py-4">
        <p className="text-app-primary font-medium">
          {status === "success"
            ? "You're on the list! We'll let you know when nudge launches."
            : "You're already on the list — we'll be in touch!"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`${formId}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "invalid" || status === "error") setStatus("idle");
          }}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 rounded-lg border border-app-text/20 bg-white px-4 py-3 text-app-text placeholder:text-app-muted focus:outline-none focus:ring-2 focus:ring-app-primary/40 disabled:opacity-60 transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-app-primary px-6 py-3 font-medium text-white hover:bg-app-primary-dark focus:outline-none focus:ring-2 focus:ring-app-primary/40 disabled:opacity-60 transition cursor-pointer whitespace-nowrap"
        >
          {status === "loading" ? "Signing up…" : "Get Early Access"}
        </button>
      </div>
      {status === "invalid" && (
        <p className="mt-2 text-sm text-red-600">
          Please enter a valid email address.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
