"use client";

import { useEffect, useRef } from "react";
import { REVIEWS, STORE } from "../store-info";

const SCROLL_SPEED_PX_PER_SEC = 36;
const SLIDES = [
  ...REVIEWS.map((review) => ({ review, isDuplicate: false })),
  ...REVIEWS.map((review) => ({ review, isDuplicate: true })),
];

function getLoopWidth(el: HTMLElement) {
  const first = el.children[0] as HTMLElement | undefined;
  const secondSetFirst = el.children[REVIEWS.length] as HTMLElement | undefined;
  return first && secondSetFirst ? secondSetFirst.offsetLeft - first.offsetLeft : 0;
}

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <p aria-label={`${count} out of ${total} stars`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < count ? "" : "text-muted-foreground/40"}>
          ★
        </span>
      ))}
    </p>
  );
}

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let lastTime = 0;

    const step = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
      lastTime = now;

      if (!pausedRef.current) {
        const loopWidth = getLoopWidth(el);
        if (loopWidth > 0) {
          offsetRef.current += SCROLL_SPEED_PX_PER_SEC * dt;
          if (offsetRef.current >= loopWidth) {
            offsetRef.current -= loopWidth;
          }
          el.scrollLeft = offsetRef.current;
        }
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const setPaused = (paused: boolean) => {
    pausedRef.current = paused;
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const loopWidth = getLoopWidth(el);
    if (loopWidth > 0 && el.scrollLeft >= loopWidth) {
      el.scrollLeft -= loopWidth;
    }
    offsetRef.current = el.scrollLeft;
  };

  return (
    <section id="reviews" className="border-y hairline bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-8">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-5xl">Loved in {STORE.city}</h2>
          </div>
          <div className="flex items-end gap-4">
            <p className="font-display text-4xl leading-none sm:text-6xl">{STORE.rating}</p>
            <div className="pb-1">
              <Stars count={4} />
              <p className="mt-1 text-xs text-muted-foreground">
                {STORE.reviewCount} customer reviews
              </p>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
          aria-label="Customer reviews"
          className="mt-6 flex gap-px overflow-x-auto border hairline bg-border [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12"
        >
          {SLIDES.map(({ review, isDuplicate }) => (
            <figure
              key={`${review.name}-${isDuplicate ? "dup" : "orig"}`}
              aria-hidden={isDuplicate || undefined}
              className="flex w-[82%] shrink-0 flex-col bg-card p-4 sm:w-[54%] sm:p-8 md:w-[calc((100%-2px)/3)]"
            >
              <Stars count={review.stars} />
              <blockquote className="mt-3 flex-1 text-sm font-light leading-[1.4] text-foreground/80 sm:mt-5">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-4 sm:mt-6">
                <p className="text-sm font-medium">{review.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{review.meta}</p>
                <span className="mt-3 inline-block border px-2.5 py-0.5 text-[9px] font-medium hairline text-muted-foreground">
                  Verified buyer
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
