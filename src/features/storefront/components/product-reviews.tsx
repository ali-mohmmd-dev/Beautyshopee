import { Star } from "lucide-react";
import type { ProductReview } from "../catalog";

const RATINGS = [5, 4, 3, 2, 1] as const;

export function ProductReviews({ reviews }: { reviews: readonly ProductReview[] }) {
  if (!reviews.length) {
    return <p className="mt-3 text-sm text-muted-foreground">No reviews for this product yet.</p>;
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-6">
      <div className="border bg-card p-4 hairline sm:p-6">
        <div className="flex items-center gap-2 font-display text-4xl font-medium">
          <span className="sr-only">Average rating out of 5</span>
          {average.toFixed(1)}
          <Star aria-hidden="true" className="size-6 fill-current" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </p>
        <ul aria-label="Ratings breakdown" className="mt-4 space-y-3 border-t pt-4 hairline">
          {RATINGS.map((rating) => {
            const count = reviews.filter((review) => review.rating === rating).length;

            return (
              <li
                key={rating}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs"
              >
                <span className="inline-flex items-center gap-1 font-medium">
                  {rating}
                  <Star aria-hidden="true" className="size-3 fill-current" />
                  <span className="sr-only">{rating === 1 ? " star" : " stars"}</span>
                </span>
                <span aria-hidden="true" className="h-2 bg-accent">
                  <span
                    className="block h-full bg-primary"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </span>
                <span className="min-w-14 text-right tabular-nums text-muted-foreground">
                  {count} {count === 1 ? "review" : "reviews"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <ul aria-label="Customer reviews" className="grid gap-3">
        {reviews.map(({ id, author, rating, text, sample }) => {
          const initials = author
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0])
            .join("");

          return (
            <li key={id} className="border bg-card p-4 hairline sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center bg-accent text-xs font-semibold uppercase text-accent-foreground"
                  >
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="break-words text-sm font-medium">{author}</p>
                    {sample && <span className="text-xs text-muted-foreground">Sample review</span>}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span aria-hidden="true" className="flex gap-0.5">
                    {RATINGS.map((star) => (
                      <Star
                        key={star}
                        className={
                          star <= rating ? "size-3 fill-current" : "size-3 text-muted-foreground"
                        }
                      />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs font-medium">
                    {rating}/5 <span className="sr-only">stars</span>
                  </span>
                </div>
              </div>
              <p className="mt-3 break-words text-sm text-muted-foreground">{text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
