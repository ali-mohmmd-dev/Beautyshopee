import type { CmsRecord } from "./cms-context";
export const defaultConcernSection = {
  enabled: true,
  heading: "Shop by concern",
  text: "Find the right care for your everyday needs.",
  concernIds: [] as string[],
};
export function concernSectionSettings(records: CmsRecord[]) {
  const settings = records.find((record) => record.kind === "settings" && record.slug === "site");
  return {
    ...defaultConcernSection,
    ...settings?.data["concernSection"],
  } as typeof defaultConcernSection;
}
export function concernProducts(records: CmsRecord[], id: string) {
  return records.filter(
    (record) => record.kind === "products" && record.data["concernIds"]?.includes(id),
  );
}
export function homeConcerns(records: CmsRecord[]) {
  const config = concernSectionSettings(records);
  if (!config.enabled) return [];
  const available = records.filter(
    (record) =>
      record.kind === "concerns" &&
      record.data["enabled"] !== false &&
      concernProducts(records, record.id).length > 0,
  );
  return config.concernIds.length
    ? config.concernIds.flatMap((id) => {
        const record = available.find((item) => item.id === id);
        return record ? [record] : [];
      })
    : available;
}
