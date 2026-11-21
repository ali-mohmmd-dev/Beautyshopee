import { reviewDate } from "../review-date";
export function ReviewDate({ value }: { value?: string | undefined }) {
  const date = reviewDate(value);
  return date ? (
    <time dateTime={date.day} className="mt-1 block text-xs text-muted-foreground">
      {date.label}
    </time>
  ) : null;
}
