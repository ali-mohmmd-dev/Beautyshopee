"use client";
import Link from "next/link";
import { useSectionContent } from "../cms-context";
export function FooterContent() {
  const content = useSectionContent("footer-content");
  const settings = content.settings;
  return (
    <section
      aria-labelledby="footer-shopping-title"
      className="col-span-full space-y-3 text-xs leading-relaxed text-foreground/75"
    >
      <nav aria-label="Popular searches">
        <h2 className="text-xs font-semibold uppercase text-foreground">
          {content.text("text-0", "Popular searches")}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-x-3">
          {(settings?.["popularLinks"] ?? []).map(
            (link: { href: string; label: string }, index: number) => (
              <li key={index}>
                <Link href={link.href} className="inline-flex min-h-8 items-center hover:underline">
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      {(settings?.["footerBlocks"] ?? []).map(
        (block: { heading: string; text: string }, index: number) => (
          <div className="space-y-2" key={index}>
            <h2
              id={index === 0 ? "footer-shopping-title" : undefined}
              className="text-xs font-semibold uppercase text-foreground"
            >
              {block.heading}
            </h2>
            <p className="whitespace-pre-line">{block.text}</p>
          </div>
        ),
      )}
    </section>
  );
}
