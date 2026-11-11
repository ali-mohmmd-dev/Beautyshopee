import Image from "next/image";
import { FooterContent } from "./footer-content";
import Link from "next/link";
import bundleImg from "@/assets/bundle.jpg";
import catEyesImg from "@/assets/cat-eyes.jpg";
import catLipsImg from "@/assets/cat-lips.jpg";
import nailsImg from "@/assets/cat-nails.jpg";
import mustImg from "@/assets/product-must.jpg";
import blushImg from "@/assets/product-blush.jpg";
import trioImg from "@/assets/product-trio.jpg";
import lipOilImg from "@/assets/product-lip.jpg";
import { STORE } from "../store-info";
import { NewsletterForm } from "./newsletter-form";

const STRIP = [
  { src: blushImg, alt: "Blush compacts" },
  { src: catEyesImg, alt: "Eye look" },
  { src: lipOilImg, alt: "Lip oils" },
  { src: nailsImg, alt: "Nail shades" },
  { src: trioImg, alt: "Everyday trio" },
  { src: catLipsImg, alt: "Lip shade" },
  { src: mustImg, alt: "Mascara and foundation" },
  { src: bundleImg, alt: "Essentials kit" },
];

const LINKS = [
  { label: "Products", href: "/products" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Store hours", href: "/contact#visit" },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="grid grid-cols-4 sm:grid-cols-8">
        {STRIP.map((thumb) => (
          <Image
            key={thumb.alt}
            src={thumb.src}
            alt={thumb.alt}
            sizes="(min-width: 640px) 12.5vw, 25vw"
            className="aspect-square w-full object-cover"
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-7 px-4 py-8 sm:gap-x-12 sm:px-6 sm:py-16 md:grid-cols-4 lg:py-20">
        <div className="max-md:col-span-2">
          <h3 className="text-[11px] font-semibold">Beauty letter</h3>
          <p className="mt-4 text-sm font-light leading-[1.4] text-muted-foreground">
            New arrivals, offers and restocks — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>

        <div>
          <h3 className="text-[11px] font-semibold">Store & contact</h3>
          <address className="mt-4 text-sm font-light not-italic leading-[1.4] text-muted-foreground">
            {STORE.address}
          </address>
          <a href={STORE.phoneHref} className="mt-3 block text-sm hover:text-muted-foreground">
            {STORE.phone}
          </a>
          <p className="mt-1 text-sm font-light text-muted-foreground">{STORE.hours}</p>
          <a
            href={STORE.directions}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[11px] underline underline-offset-4"
          >
            Get directions
          </a>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold">Explore</h3>
          <ul className="mt-2 text-sm sm:mt-4 sm:space-y-3 font-light text-muted-foreground">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center hover:text-foreground hover:underline sm:min-h-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-md:col-span-2">
          <Link href="/" className="inline-block align-top">
            <Image
              src="/beauty-shoppee-logo.png"
              alt="Beauty Shoppee"
              width={1036}
              height={1014}
              sizes="112px"
              className="h-auto w-28"
            />
          </Link>
          <p className="mt-4 text-sm font-light leading-[1.4] text-muted-foreground">
            Tirur&apos;s trusted cosmetics destination — 100% authentic products, billed with GST.
          </p>
          <p className="mt-4 text-[10px] text-muted-foreground">
            Rated {STORE.rating} ★ · {STORE.reviewCount} reviews
          </p>
        </div>
        <FooterContent />
        <p className="col-span-full text-center text-[11px] text-muted-foreground">
          © 2026 Beauty Shoppee {STORE.city} · Kerala 676101
        </p>
      </div>
    </footer>
  );
}
