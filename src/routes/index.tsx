import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Instagram, Music2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import albumCoverAsset from "@/assets/nocturnal-nights-cover.png.asset.json";
import headerPhotoAsset from "@/assets/nocturnal-header.png.asset.json";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, products, sizes } from "@/lib/products";

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


function Star({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0 14.1 9.9 24 12l-9.9 2.1L12 24l-2.1-9.9L0 12l9.9-2.1L12 0Z" />
    </svg>
  );
}

function Index() {
  const [featured, setFeatured] = useState(0);
  const [featuredView, setFeaturedView] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState("M");
  const cart = useCart();
  const hero = products[featured] ?? products[0]!;
  const heroImage = featuredView === "front" ? hero.image : hero.backImage;
  const alternateImage = featuredView === "front" ? hero.backImage : hero.image;
  const alternateView = featuredView === "front" ? "back" : "front";
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
          <button
            type="button"
            onClick={cart.openCart}
            aria-label={`Open shopping bag with ${cart.count} items`}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors hover:text-glow"
          >
            <ShoppingBag className="size-4" /> <span>Bag ({cart.count})</span>
          </button>
        </nav>
      </header>

      <main>
        <section id="top" className="relative h-[calc(100svh-7rem)] min-h-[620px] max-h-[860px] overflow-hidden border-b border-line">
          <img
            src={headerPhotoAsset.url}
            alt="Nocturnal artist seated beneath trees at night"
            width={768}
            height={1024}
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/35" />

          <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 pb-16 pt-10 md:px-8 md:pb-20">
            <div className="flex max-w-4xl flex-col items-start gap-7 md:flex-row md:items-center md:gap-10">
              <div className="shrink-0 border border-foreground/25 bg-ink/50 p-2 shadow-2xl backdrop-blur-sm">
                <img
                  src={albumCoverAsset.url}
                  alt="Nocturnal Nights album cover"
                  width={768}
                  height={768}
                  className="size-48 object-cover sm:size-56 md:size-72"
                />
              </div>
              <div className="max-w-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">New album</p>
                <h1 className="mt-3 font-display text-5xl leading-[0.9] sm:text-6xl md:text-7xl">Nocturnal Nights</h1>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground/80">
                  Out now on all major platforms
                </p>
                <Button asChild className="mt-7">
                  <a
                    href="https://open.spotify.com/album/0w5s31aVtbFyhnUwAWpown?si=S1e5R4rVSamQko_iLCI1Mg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Music2 className="mr-3 size-4" /> Listen on Spotify
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Button asChild variant="outline" className="absolute bottom-5 right-5 bg-ink/65 backdrop-blur-sm md:bottom-8 md:right-8">
            <a href="https://www.instagram.com/gurboee/" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-3 size-4" /> Instagram
            </a>
          </Button>
        </section>

        <section id="merch" className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-[calc(100%-2rem)] -translate-x-1/2 border border-line/50 md:block" />
          <div className="neon-outline relative grid border border-line bg-panel md:grid-cols-2">
            <div className="group relative min-h-[520px] overflow-hidden border-b border-line md:min-h-[720px] md:border-b-0 md:border-r">
              <img
                key={heroImage}
                src={heroImage}
                alt={`${hero.name} ${featuredView} view`}
                width={1024}
                height={1024}
                className="absolute inset-0 size-full object-contain p-6 md:p-10 drop-shadow-[0_24px_60px_oklch(0.7_0.075_10/0.12)] transition-transform duration-[1800ms] group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
              <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  SERIES 01<span className="h-px w-12 bg-muted-foreground/50" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFeaturedView(alternateView)}
                  aria-label={`Show ${hero.name} ${alternateView} view`}
                  title={`Show ${alternateView} view`}
                  className="mt-4 size-20 overflow-hidden border-line bg-ink/80 p-1 backdrop-blur-sm hover:bg-panel md:size-24"
                >
                  <img
                    src={alternateImage}
                    alt=""
                    width={160}
                    height={160}
                    className="size-full object-contain"
                  />
                </Button>
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
                  <span className="font-display text-2xl">{formatPrice(hero.priceCents)}</span>
                  <div className="flex gap-2" aria-label="Select a size">
                    {sizes.map((size) => (
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

              <Button
                className="mt-7 w-full"
                onClick={() => {
                  cart.addItem(hero.id, selectedSize);
                  toast.success(`${hero.name} — size ${selectedSize} added to your bag`);
                  cart.openCart();
                }}
              >
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
                Made in small runs. Stone Washed, worn, and finished by hand so no two pieces settle exactly the same.
              </p>
            </div>

            <div className="grid border-l border-t border-line">
              {shelf.map(({ product }, cardNumber) => (
                <a
                  key={product.name}
                  href="#top"
                  onClick={() => {
                    setFeatured(products.indexOf(product));
                    setFeaturedView("front");
                  }}
                  className="group cursor-pointer border-b border-r border-line bg-panel/40 p-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <img src={product.image} alt={product.name} width={1024} height={1024} loading="lazy" className={"size-full " + (product.fit === "contain" ? "scale-[1.02] object-contain p-4 grayscale transition duration-700 group-hover:scale-[1.05] group-hover:grayscale-0" : "object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0")} />
                    <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.2em] text-foreground/70">0{cardNumber + 2}</span>
                    <span className="absolute bottom-4 right-4 text-[9px] font-bold uppercase tracking-[0.2em] text-glow opacity-0 transition duration-500 group-hover:opacity-100">View</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 px-1 py-5">
                    <div>
                      <h3 className="font-display text-xl">{product.name}</h3>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{product.note}</p>
                    </div>
                    <span className="font-display text-lg text-glow">{formatPrice(product.priceCents)}</span>
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
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=6kisscollective@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-glow"
            >
              Support
            </a>

            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}