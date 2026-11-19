import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCms, cmsMetadata } from "@/lib/cms";
import { DescriptionText } from "@/features/storefront/components/description-text";
type Props = { params: Promise<{ slug: string[] }> };
async function find(params: Props["params"]) {
  const path = "/" + (await params).slug.join("/");
  const record = (await getCms()).find(
    (record) => record.kind === "pages" && record.data["path"] === path,
  );
  if (!record) notFound();
  return record;
}
export async function generateMetadata({ params }: Props) {
  const page = await find(params);
  return cmsMetadata(page.slug, { title: page.data["name"] });
}
export default async function ContentPage({ params }: Props) {
  const page = await find(params);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium sm:text-6xl">{page.data["name"]}</h1>
      {page.data["blocks"]
        .filter((block: any) => block.enabled)
        .map((block: any) => (
          <section key={block.key} className="mt-10">
            <h2 className="font-display text-2xl font-medium">{block.heading}</h2>
            <DescriptionText text={block.text} />
            {block.image.url && (
              <figure className="mt-5">
                <Image
                  src={block.image.url}
                  alt={block.image.decorative ? "" : block.image.alt}
                  width={1200}
                  height={800}
                  className="max-h-[32rem] w-full object-contain"
                />
                {block.image.caption && (
                  <figcaption className="mt-2 text-sm">{block.image.caption}</figcaption>
                )}
                {block.image.imageText && (
                  <p className="mt-2 text-sm text-muted-foreground">{block.image.imageText}</p>
                )}
              </figure>
            )}
            {block.link.href && (
              <Link className="mt-4 inline-block underline" href={block.link.href}>
                {block.link.label}
              </Link>
            )}
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {block.items.map((item: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <DescriptionText text={item.text} />
                  {item.image.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.decorative ? "" : item.image.alt}
                      width={600}
                      height={400}
                      className="mt-3 w-full object-cover"
                    />
                  )}
                  {item.link.href && (
                    <Link className="mt-3 inline-block underline" href={item.link.href}>
                      {item.link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
