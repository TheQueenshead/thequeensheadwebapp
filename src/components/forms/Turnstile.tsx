"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile — a privacy-friendly captcha that usually passes
 * invisibly and only shows a checkbox if the visitor looks suspicious.
 * Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 * Server-side check: verifyCaptcha in src/lib/guard.ts.
 */
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Props = {
  /** Receives a fresh token, or "" when it expires or fails */
  onToken: (token: string) => void;
  /** Change this to get a new token (tokens are single-use) */
  resetKey?: number;
  /** Which form this is — checked on the server ("enquiry" | "newsletter") */
  action: string;
};

export default function Turnstile({ onToken, resetKey = 0, action }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !turnstileSiteKey || !el.current || !api) return;
    const id = api.render(el.current, {
      sitekey: turnstileSiteKey,
      action,
      appearance: "interaction-only",
      callback: (t: string) => onTokenRef.current(t),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
    });
    return () => {
      onTokenRef.current("");
      api.remove(id);
    };
  }, [ready, resetKey, action]);

  if (!turnstileSiteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={el} />
    </>
  );
}
