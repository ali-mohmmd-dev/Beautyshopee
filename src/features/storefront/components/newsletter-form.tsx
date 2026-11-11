"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  if (subscribed) {
    return <p className="mt-5 text-sm">You&apos;re on the list. Welcome.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex border-b hairline">
      <input
        type="email"
        required
        placeholder="Email address"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent py-2 text-base placeholder:text-muted-foreground/70 sm:text-sm"
      />
      <button
        type="submit"
        className="shrink-0 text-sm hover:text-muted-foreground max-sm:touch-target sm:text-[11px]"
      >
        Join
      </button>
    </form>
  );
}
