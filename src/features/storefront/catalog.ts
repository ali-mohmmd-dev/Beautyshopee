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
  sampleProduct?: boolean;
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
      {
        id: "sample-blush-collection-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 5,
        text: "A light layer gave me enough colour for daytime.",
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
      {
        id: "sample-everyday-trio-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "The set was easy to carry in my makeup bag.",
      },
      {
        id: "sample-everyday-trio-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 5,
        text: "I used all three pieces for a quick morning routine.",
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
      {
        id: "sample-silk-lip-oil-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 4,
        text: "I liked wearing it on its own when I wanted a little shine.",
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
      {
        id: "sample-must-haves-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 5,
        text: "The face and eye basics were easy to use together.",
      },
      {
        id: "sample-must-haves-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 4,
        text: "It was a useful starting point for my everyday makeup.",
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
    {
      id: "sample-essentials-kit-3",
      author: "Example reviewer 3",
      sample: true,
      rating: 4,
      text: "The shades were easy to pair for a simple daytime look.",
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

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "rose-cloud-blush",
    name: "Rose Cloud Blush",
    brand: "Petal & Tint",
    sampleBrand: true,
    sampleProduct: true,
    tag: null,
    code: "RCB-05 · Cheeks",
    categories: ["face"],
    description: "A rose-toned blush for adding a soft wash of colour to the cheeks.",
    price: 749,
    reviews: [
      {
        id: "sample-rose-cloud-blush-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "The rose shade worked nicely with my everyday makeup.",
      },
      {
        id: "sample-rose-cloud-blush-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "I got a softer finish when I applied it in light layers.",
      },
      {
        id: "sample-rose-cloud-blush-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 5,
        text: "I liked pairing it with a neutral lip.",
      },
    ],
    image: faceImg,
  },
  {
    id: "berry-glaze-lip-tint",
    name: "Berry Glaze Lip Tint",
    brand: "Petal & Tint",
    sampleBrand: true,
    sampleProduct: true,
    tag: null,
    code: "BGT-06 · Lips",
    categories: ["lips"],
    description: "A berry-toned lip tint for a sheer wash of colour.",
    price: 599,
    reviews: [
      {
        id: "sample-berry-glaze-lip-tint-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "One swipe gave me the sheer berry look I wanted.",
      },
      {
        id: "sample-berry-glaze-lip-tint-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "The colour was easy to build up in the centre of my lips.",
      },
      {
        id: "sample-berry-glaze-lip-tint-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 4,
        text: "I liked it with a little balm underneath.",
      },
    ],
    image: lipsImg,
  },
  {
    id: "soft-definition-mascara",
    name: "Soft Definition Mascara",
    brand: "Studio Daylight",
    sampleBrand: true,
    sampleProduct: true,
    tag: null,
    code: "SDM-07 · Eyes",
    categories: ["eyes"],
    description: "A black mascara for an understated everyday lash look.",
    price: 699,
    reviews: [
      {
        id: "sample-soft-definition-mascara-1",
        author: "Example reviewer 1",
        sample: true,
        rating: 5,
        text: "One coat gave me enough definition for daytime.",
      },
      {
        id: "sample-soft-definition-mascara-2",
        author: "Example reviewer 2",
        sample: true,
        rating: 4,
        text: "I preferred the look after combing through my lashes.",
      },
      {
        id: "sample-soft-definition-mascara-3",
        author: "Example reviewer 3",
        sample: true,
        rating: 5,
        text: "It paired well with a simple neutral eyeshadow.",
      },
    ],
    image: eyesImg,
  },
];

export const CATALOG: Product[] = [...PRODUCTS, BUNDLE, ...SAMPLE_PRODUCTS];

export function getProduct(id: string) {
  return CATALOG.find((product) => product.id === id);
}

export function searchProducts(products: Product[], query: string) {
  const term = query.trim().toLowerCase();
  return term
    ? products.filter(({ name, code, description, categories, tag, brand }) =>
        `${name} ${code} ${description} ${categories.join(" ")} ${tag ?? ""} ${brand ?? ""}`
          .toLowerCase()
          .includes(term),
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
