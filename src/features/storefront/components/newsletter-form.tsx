"use client";

import { useSectionContent } from "../cms-context";
import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const content = useSectionContent("newsletter-form");

  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  if (subscribed) {
    return (
      <p className="mt-5 text-sm">{content.text("text-0", "You&apos;re on the list. Welcome.")}</p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex border-b hairline">
      <input
        type="email"
        required
        placeholder={content.text("placeholder-1", "Email address")}
        aria-label={content.text("aria-label-2", "Email address")}
        className="min-w-0 flex-1 bg-transparent py-2 text-base placeholder:text-muted-foreground/70 sm:text-sm"
      />
      <button
        type="submit"
        className="shrink-0 text-sm hover:text-muted-foreground max-sm:touch-target sm:text-[11px]"
      >
        {content.text("text-3", "Join")}
      </button>
    </form>
  );
}
