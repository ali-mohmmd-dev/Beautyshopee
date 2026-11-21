export function reviewDate(value?: string) {
  const day = value?.slice(0, 10);
  if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const date = new Date(day + "T00:00:00Z");
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== day) return null;
  return {
    day,
    timestamp: date.getTime(),
    label: new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date),
  };
}
export function reviewNewestFirst(a: { date?: string }, b: { date?: string }) {
  return (
    (reviewDate(b.date)?.timestamp ?? -Infinity) - (reviewDate(a.date)?.timestamp ?? -Infinity) || 0
  );
}
