import type { StaticImageData } from "next/image";

import blushImg from "@/assets/product-blush.jpg";
import eyesImg from "@/assets/cat-eyes.jpg";
import faceImg from "@/assets/cat-face.jpg";
import lipsImg from "@/assets/cat-lips.jpg";
import lookImg from "@/assets/cat-looks.jpg";
import bundleImg from "@/assets/bundle.jpg";
import mustImg from "@/assets/product-must.jpg";
import nailsImg from "@/assets/cat-nails.jpg";
import trioImg from "@/assets/product-trio.jpg";
import lipOilImg from "@/assets/product-lip.jpg";

export type ProductReview = {
  id: string;
  author: string;
  sample?: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

type ProductCategory = "face" | "eyes" | "lips" | "sets";

export type Product = {
  id: string;
  name: string;
  tag: "NEW" | "BESTSELLER" | null;
  code: string;
  brand?: string;
  sampleBrand?: boolean;
  categories: readonly ProductCategory[];
  reviews?: readonly ProductReview[];
  description: string;
  price: number;
  image: StaticImageData;
  bundle?: {
    compareAt: number;
    items: { name: string; shade: string; price: number; image: StaticImageData }[];
  };
};

export const PRODUCTS: Product[] = [
  {
    id: "blush-collection",
    brand: "Petal & Tint",
    sampleBrand: true,
    reviews: [
      {
        id: "sample-blush-collection-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "The colour builds gradually, so it was easy to go from a soft flush to a stronger look.",
      },
      {
        id: "sample-blush-collection-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "I preferred applying it with a fluffy brush for a softer finish.",
      },
    ],
    name: "Blush Collection",
    tag: "BESTSELLER",
    code: "BLS-01 · Cheeks",
    categories: ["face"],
    description:
      "Explore a collection of blush compacts for a soft wash of colour or a bolder flush.",
    price: 1299,
    image: blushImg,
  },
  {
    id: "everyday-trio",
    brand: "Studio Daylight",
    sampleBrand: true,
    reviews: [
      {
        id: "sample-everyday-trio-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "The three pieces made it easy to put together a simple look for work.",
      },
    ],
    name: "Everyday Trio",
    tag: "NEW",
    code: "TRY-02 · Daily",
    categories: ["sets"],
    description: "A trio of makeup favourites for an everyday look and easy touch-ups.",
    price: 849,
    image: trioImg,
  },
  {
    id: "silk-lip-oil",
    brand: "Petal & Tint",
    sampleBrand: true,
    reviews: [
      {
        id: "sample-silk-lip-oil-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "The peach tint is subtle and looks good layered over lip colour.",
      },
      {
        id: "sample-silk-lip-oil-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "I liked the shine and reapplied after lunch.",
      },
    ],
    name: "Silk Lip Oil",
    tag: null,
    code: "LIP-03 · Lips",
    categories: ["lips"],
    description:
      "A peach-toned lip oil for a glossy finish, worn on its own or layered over lip colour.",
    price: 649,
    image: lipOilImg,
  },
  {
    id: "must-haves",
    brand: "Studio Daylight",
    sampleBrand: true,
    reviews: [
      {
        id: "sample-must-haves-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 4,
        text: "A handy set of basics for a quick face and eye routine.",
      },
    ],
    name: "The Must-Haves",
    tag: "BESTSELLER",
    code: "MSN-04 · Face",
    categories: ["face", "eyes"],
    description: "A collection of face and eye essentials to build your everyday makeup routine.",
    price: 999,
    image: mustImg,
  },
];

export const BUNDLE = {
  id: "essentials-kit",
  brand: "Studio Daylight",
  sampleBrand: true,
  reviews: [
    {
      id: "sample-essentials-kit-1",
      author: "Example reviewer 1",
      sample: true,
      rating: 5,
      text: "I liked having the cheek, lip, and eye products together in one kit.",
    },
    {
      id: "sample-essentials-kit-2",
      author: "Example reviewer 2",
      sample: true,
      rating: 4,
      text: "The blush and lip oil were the pieces I reached for most often.",
    },
  ],
  name: "The Essentials Kit",
  tag: null,
  code: "Makeup set",
  categories: ["sets", "face", "eyes", "lips"],
  description:
    "Four everyday favourites in one kit, with colour for lips and cheeks and mascara to finish the look.",
  price: 2499,
  image: bundleImg,
  bundle: {
    compareAt: 3150,
    items: [
      { name: "Velvet Matte Lipstick", shade: "Terracotta 04", price: 699, image: trioImg },
      { name: "Blush Compact Duo", shade: "Rose Mist", price: 849, image: blushImg },
      { name: "Silk Lip Oil", shade: "Peach Nectar", price: 649, image: lipOilImg },
      { name: "Everyday Mascara", shade: "Intense Black", price: 499, image: mustImg },
    ],
  },
} satisfies Product;

export const CATALOG: Product[] = [...PRODUCTS, BUNDLE];

export function getProduct(id: string) {
  return CATALOG.find((product) => product.id === id);
}

export function searchProducts(products: Product[], query: string) {
  const term = query.trim().toLowerCase();
  return term
    ? products.filter(({ name, code, description }) =>
        `${name} ${code} ${description}`.toLowerCase().includes(term),
      )
    : products;
}

export const CATEGORIES = [
  { num: "01", name: "Face", image: faceImg },
  { num: "02", name: "Eyes", image: eyesImg },
  { num: "03", name: "Lips", image: lipsImg },
  { num: "04", name: "Nails", image: nailsImg },
  { num: "05", name: "Looks", image: lookImg },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
