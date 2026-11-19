"use client";

import { useCms } from "../cms-context";
import { useSectionContent } from "../cms-context";
import { REVIEWS, STORE } from "../store-info";

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  const content = useSectionContent("reviews");

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

const MARQUEE_HALF = [...REVIEWS, ...REVIEWS];

function ReviewCard({
  review,
  hidden = false,
}: {
  review: (typeof REVIEWS)[number];
  hidden?: boolean;
}) {
  const content = useSectionContent("reviews");

  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[78vw] max-w-[340px] shrink-0 flex-col border hairline bg-card p-5 sm:w-[360px] sm:max-w-none sm:p-8 lg:w-[400px]"
    >
      <Stars count={review.stars} />
      <blockquote className="mt-3 flex-1 text-sm font-light leading-[1.4] text-foreground/80 sm:mt-5">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-4 sm:mt-6">
        <p className="text-sm font-medium">{review.name}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{review.meta}</p>
        <span className="mt-3 inline-block border px-2.5 py-0.5 text-[9px] font-medium hairline text-muted-foreground">
          {content.text("text-0", "Verified buyer")}
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const records = useCms();
  const liveReviews = records
    .filter((record) => record.kind === "reviews" && !record.data["productId"])
    .map((record) => ({
      name: record.data["author"] as string,
      stars: record.data["rating"] as number,
      text: record.data["text"] as string,
      meta: record.data["sample"] ? "Sample review" : "Customer review",
    }));
  const marquee = records.length ? [...liveReviews, ...liveReviews] : MARQUEE_HALF;
  const content = useSectionContent("reviews");

  return (
    <section id="reviews" className="overflow-x-clip bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-8">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-5xl">
              {content.text("text-1", "Loved in")}
              {STORE.city}
            </h2>
          </div>
          <div className="flex items-end gap-4">
            <p className="font-display text-4xl leading-none sm:text-6xl">{STORE.rating}</p>
            <div className="pb-1">
              <Stars count={4} />
              <p className="mt-1 text-xs text-muted-foreground">
                {STORE.reviewCount}
                {content.text("text-2", "customer reviews")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-visible motion-reduce:overflow-x-auto sm:mt-12">
          <div className="flex w-max animate-marquee">
            <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
              {marquee.map((review, index) => (
                <ReviewCard
                  key={`a-${index}-${review.name}`}
                  review={review}
                  hidden={index >= REVIEWS.length}
                />
              ))}
            </div>
            <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden="true">
              {marquee.map((review, index) => (
                <ReviewCard key={`b-${index}-${review.name}`} review={review} hidden />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
