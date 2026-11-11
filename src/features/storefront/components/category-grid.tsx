import Image from "next/image";
import { CATEGORIES } from "../catalog";

export function CategoryGrid() {
  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl overflow-x-clip px-4 py-10 sm:px-6 sm:py-20 lg:py-28"
    >
      <h2 className="font-display text-3xl font-medium sm:text-5xl">Shop by category</h2>

      <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:mt-12 sm:gap-4 sm:scroll-pl-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:scroll-pl-0 lg:px-0">
        {CATEGORIES.map((category) => (
          <a
            key={category.num}
            href="#featured"
            className="group relative w-[calc((100%-1.5rem)/2.2)] shrink-0 snap-start overflow-hidden sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
          >
            <Image
              src={category.image}
              alt={`${category.num} ${category.name}`}
              sizes="(min-width: 1280px) 240px, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 45vw"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-background sm:bottom-5 sm:left-5">
              <p className="text-[10px] text-background/80">{category.num}</p>
              <p className="mt-1 font-display text-2xl sm:text-3xl">{category.name}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
