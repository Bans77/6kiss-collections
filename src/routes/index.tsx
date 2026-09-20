import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";

import nocturnalTee from "@/assets/nocturnal-tee-cutout.png";
import coreTee from "@/assets/nocturnal-hoodie-cutout.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOCTURNAL — Nocturnal Nights" },
      {
        name: "description",
        content: "Nocturnal essentials in mineral-washed black. Limited heavyweight apparel by NOCTURNAL.",
      },
      { property: "og:title", content: "NOCTURNAL — Nocturnal Nights" },
      {
        property: "og:description",
        content: "Nocturnal essentials in mineral-washed black. Limited heavyweight apparel by NOCTURNAL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products: { name: string; label: string; note: string; price: string; image: string; fit?: "contain" }[] = [
  { name: "6Kiss Short Sleeve Tee", label: "6KISS SHORT SLEEVE TEE", note: "STONE WASH", price: "$34.99", image: nocturnalTee },
  { name: "6Kiss Hoodie", label: "6KISS HOODIE", note: "STONE WASH", price: "$44.99", image: coreTee, fit: "contain" },
];

function Star({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0 14.1 9.9 24 12l-9.9 2.1L12 24l-2.1-9.9L0 12l9.9-2.1L12 0Z" />
    </svg>
  );
}

function Index() {
  const [featured, setFeatured] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartCount, setCartCount] = useState(0);
  const hero = products[featured];
  const shelf = products.map((product, index) => ({ product, index })).filter(({ index }) => index !== featured);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-body text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-50" />

      <header className="relative z-20 border-b border-line">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="font-display text-2xl font-semibold uppercase tracking-[0.2em]">
            6KISS
          </a>
          <div className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#collection" className="transition-colors hover:text-glow">Collection</a>
          </div>
          <a href="#collection" aria-label={`Shopping bag with ${cartCount} items`} className="flex items-center gap-2 text-xs uppercase tracking-[0.15em]">
            <ShoppingBag className="size-4" /> <span>Bag ({cartCount})</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-[calc(100%-2rem)] -translate-x-1/2 border border-line/50 md:block" />
          <div className="relative grid border border-line bg-panel md:grid-cols-2">
            <div className="group relative min-h-[520px] overflow-hidden border-b border-line md:min-h-[720px] md:border-b-0 md:border-r">
              <img
                key={hero.image}
                src={hero.image}
                alt={hero.name}
                width={1024}
                height={1024}
                className={"absolute inset-0 size-full drop-shadow-[0_24px_60px_oklch(0.7_0.075_10/0.12)] transition-transform duration-[1800ms] group-hover:scale-[1.025] " + (hero.fit === "contain" ? "object-contain p-6 md:p-10" : "object-contain p-6 md:p-10")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
              <div className="absolute left-6 top-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground md:left-8 md:top-8">
                SERIES 01<span className="h-px w-12 bg-muted-foreground/50" />
              </div>
              <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:bottom-8 md:left-8">
                {hero.label}
              </div>
            </div>

            <div className="relative flex min-h-[620px] flex-col justify-center overflow-hidden p-7 md:min-h-[720px] md:p-14 lg:p-16">
              <Star className="mb-10 size-10 text-foreground" />
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-glow">NOCTURNAL / DROP</p>
              <h1 className="max-w-lg font-display text-6xl font-medium leading-[0.82] md:text-7xl lg:text-8xl">
                Nocturnal<br /> <span className="text-primary">Collection</span>
              </h1>
              <p className="mt-7 max-w-sm font-display text-xl italic leading-relaxed text-muted-foreground">
                When the city sleeps, we come alive. A heavyweight silhouette made for the ones who know.
              </p>

              <div className="mt-10 border-y border-line py-6">
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <span className="font-display text-2xl">{hero.price}</span>
                  <div className="flex gap-2" aria-label="Select a size">
                    {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                      <Button
                        key={size}
                        size="icon"
                        variant={selectedSize === size ? "primary" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="mt-7 w-full" onClick={() => setCartCount((count) => count + 1)}>
                Add size {selectedSize} to bag <ArrowRight className="ml-3 size-4" />
              </Button>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-2"><Star className="size-2 text-primary" /> 250GSM COTTON</span>
                <span className="flex items-center gap-2"><Star className="size-2 text-glow" /> Distressed finish</span>
              </div>
              <Star className="pointer-events-none absolute -bottom-10 -right-10 size-36 text-foreground/5" />
            </div>
          </div>
          <div className="pointer-events-none overflow-hidden whitespace-nowrap pt-8 font-display text-6xl uppercase text-foreground/5 md:text-9xl">
            Nocturnal / Nocturnal / Nocturnal
          </div>
        </section>

        <section id="collection" className="border-y border-line bg-background py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 grid items-end gap-6 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-glow">AFTER DARK</p>
                <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">6Kiss - Nocturnal Collection</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:justify-self-end">
                Built in small runs. Stone Washed, worn, and finished by hand so no two pieces settle exactly the same.
              </p>
            </div>

            <div className="grid border-l border-t border-line">
              {shelf.map(({ product, index }) => (
                <a
                  key={product.name}
                  href="#top"
                  onClick={() => setFeatured(index)}
                  className="group cursor-pointer border-b border-r border-line bg-panel/40 p-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <img src={product.image} alt={product.name} width={1024} height={1024} loading="lazy" className={"size-full " + (product.fit === "contain" ? "scale-[1.02] object-contain p-4 grayscale transition duration-700 group-hover:scale-[1.05] group-hover:grayscale-0" : "object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0")} />
                    <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.2em] text-foreground/70">0{index + 2}</span>
                    <span className="absolute bottom-4 right-4 text-[9px] font-bold uppercase tracking-[0.2em] text-glow opacity-0 transition duration-500 group-hover:opacity-100">View</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 px-1 py-5">
                    <div>
                      <h3 className="font-display text-xl">{product.name}</h3>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{product.note}</p>
                    </div>
                    <span className="font-display text-lg text-glow">{product.price}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer id="archive" className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <div className="font-display text-4xl uppercase tracking-[0.12em]">NOCTURNAL</div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">When the city sleeps.</p>
          </div>
          <div className="flex gap-7 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <a href="#top" className="hover:text-glow">Instagram</a>
            <a href="#archive" className="hover:text-glow">Support</a>

            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}