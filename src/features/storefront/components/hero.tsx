"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import heroBanner from "@/assets/hero-banner-4k.webp";
import mobileHeroBanner from "@/assets/hero-banner-mobile.webp";
import { useCms, useSectionContent } from "../cms-context";

export function Hero() {
  const viewport = useRef<HTMLElement>(null);
  const artwork = useRef<HTMLPictureElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const section = viewport.current;
      const image = artwork.current;
      if (!section || !image) return;
      if (!desktop.matches || reduced.matches) {
        image.style.removeProperty("transform");
        return;
      }
      const bounds = section.getBoundingClientRect();
      // The extra image height covers the full bounded travel, including restored scroll positions.
      const offset = Math.max(-32, Math.min(32, -bounds.top * 0.12));
      image.style.transform = "translate3d(0, " + offset + "px, 0)";
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  const content = useSectionContent("hero");
  const home = useCms().find((record) => record.kind === "pages" && record.data["path"] === "/");
  const banner = home?.data["heroBanner"];
  const alt =
    banner?.desktopImage?.alt ||
    banner?.mobileImage?.alt ||
    content.text(
      "banner-alt",
      "Tropical Charm Beauty Duo — 20% off selected products at Beauty Shoppee Tirur.",
    );
  const common = {
    alt,
    sizes: "100vw",
    quality: 90,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const { props: desktop } = getImageProps({
    ...common,
    src: banner?.desktopImage?.url || content.image("banner", heroBanner),
    width: heroBanner.width,
    height: heroBanner.height,
  });
  const { props: mobile } = getImageProps({
    ...common,
    src: banner?.mobileImage?.url || mobileHeroBanner,
    width: mobileHeroBanner.width,
    height: mobileHeroBanner.height,
  });
  return (
    <section ref={viewport} aria-label="Beauty Shoppee Tirur" className="hero-viewport w-full">
      <h1 className="sr-only">Beauty Shoppee Tirur — Tropical Charm beauty offers.</h1>
      <picture ref={artwork} className="hero-artwork">
        <source
          media="(min-width: 768px)"
          srcSet={desktop.srcSet}
          sizes={desktop.sizes}
          width={heroBanner.width}
          height={heroBanner.height}
        />
        <img {...mobile} className="hero-image" />
      </picture>
    </section>
  );
}
