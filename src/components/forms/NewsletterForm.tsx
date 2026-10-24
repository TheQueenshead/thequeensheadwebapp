"use client";

import { useState, type FormEvent } from "react";
import Turnstile, { turnstileSiteKey } from "./Turnstile";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (turnstileSiteKey && !captcha) {
      setStatus("error");
      setError("The security check is still running — please try again in a moment. If this keeps happening, give us a call.");
      return;
    }
    setStatus("sending");
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name") ?? undefined,
          website: data.get("website") ?? "",
          captcha: captcha || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
      setCaptchaKey((k) => k + 1);
    }
  }

  if (status === "done") {
    return (
      <p role="status" className={compact ? "text-sm text-gold" : "font-medium text-wine"}>
        You&rsquo;re on the list — see you soon.
      </p>
    );
  }

  const id = compact ? "nl-footer" : "nl-main";

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-2" : "space-y-3"}>
      <div className={compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"}>
        {!compact && (
          <div className="flex-1">
            <label htmlFor={`${id}-name`} className="sr-only">
              First name
            </label>
            <input id={`${id}-name`} name="name" type="text" placeholder="First name" className="field" autoComplete="given-name" />
          </div>
        )}
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            placeholder="Your email address"
            autoComplete="email"
            className={compact ? "field !bg-white/10 !border-white/25 !text-white placeholder:text-white/50 text-sm" : "field"}
          />
        </div>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={compact ? "btn btn-gold btn-sm shrink-0" : "btn btn-primary shrink-0"}
        >
          {status === "sending" ? "…" : compact ? "Join" : "Sign me up"}
        </button>
      </div>
      <Turnstile onToken={setCaptcha} resetKey={captchaKey} action="newsletter" />
      {error && (
        <p role="alert" className="text-xs font-medium text-wine">
          {error}
        </p>
      )}
      {!compact && (
        <p className="text-xs text-muted">
          Occasional news, seasonal menus and events. Unsubscribe any time.
        </p>
      )}
    </form>
  );
}
