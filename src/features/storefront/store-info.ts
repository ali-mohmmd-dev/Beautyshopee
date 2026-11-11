export const STORE = {
  name: "Beauty Shoppee",
  city: "Tirur",
  address: "1st Floor, New Bus Stand Building, Tirur, Kerala 676101",
  phone: "092496 55388",
  phoneHref: "tel:+919249655388",
  directions: "https://www.google.com/maps/search/?api=1&query=Beauty+Shoppee+Tirur+New+Bus+Stand",
  hours: "9:30 am – 9:00 pm (Sun 9:30 am – 8:00 pm)",
  rating: 4.5,
  reviewCount: 153,
};

export type Review = {
  name: string;
  meta: string;
  stars: number;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Karthika Vv",
    meta: "2 months ago · Google review",
    stars: 5,
    text: "Absolutely loved my experience here! The service was excellent, the staff were so friendly and welcoming, and everything was done with great care and attention to detail.",
  },
  {
    name: "Anna J",
    meta: "2 months ago · Google review",
    stars: 5,
    text: "Was a beginner in makeup but the staff here never made me feel like one. Especially Monisha chechi was the best! I 100% recommend for beginners — there's nothing here you cannot get.",
  },
  {
    name: "Store summary",
    meta: "153 Google reviews · 4.5 average",
    stars: 4,
    text: "Customers highlight the wide variety of beauty products and best-selling brands with testers available, affordable prices, great discounts, and excellent service from a friendly staff.",
  },
];
