import nocturnalTee from "@/assets/nocturnal-tee-cutout.png";
import nocturnalHoodie from "@/assets/nocturnal-hoodie-cutout.png";
import nocturnalTeeFront from "@/assets/nocturnal-tee-front-cutout.png";
import nocturnalHoodieFront from "@/assets/nocturnal-hoodie-front-cutout.png";

export type Product = {
  id: string;
  name: string;
  label: string;
  note: string;
  priceCents: number;
  image: string;
  backImage: string;
  fit?: "contain";
};

export const products: Product[] = [
  {
    id: "tee",
    name: "6Kiss Short Sleeve Tee",
    label: "6KISS SHORT SLEEVE TEE",
    note: "STONE WASH",
    priceCents: 3499,
    image: nocturnalTeeFront,
    backImage: nocturnalTee,
    fit: "contain",
  },
  {
    id: "hoodie",
    name: "6Kiss Hoodie",
    label: "6KISS HOODIE",
    note: "STONE WASH",
    priceCents: 4499,
    image: nocturnalHoodieFront,
    backImage: nocturnalHoodie,
    fit: "contain",
  },
];

export const sizes = ["S", "M", "L", "XL", "2XL", "3XL"] as const;

export const SHIPPING_CENTS = 699;
export const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
export const TAX_RATE = 0.0875;

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
