"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile non chargé"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface Props {
  siteKey: string;
  onToken: (token: string) => void;
  ref?: Ref<TurnstileHandle>;
}

/** Widget Cloudflare Turnstile (rendu explicite, thème clair, italien). */
export function Turnstile({ siteKey, onToken, ref }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Toujours appeler la dernière version du callback sans re-rendre le widget
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      onTokenRef.current("");
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          theme: "light",
          language: "it",
          size: "flexible",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey]);

  return <div ref={container} className="min-h-[65px]" />;
}
