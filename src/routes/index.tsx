import { createFileRoute } from "@tanstack/react-router";

import heroHoodie from "@/assets/hero-hoodie.jpg";
import vectorJacket from "@/assets/vector-jacket.jpg";
import coreTee from "@/assets/core-tee.jpg";
import summitBeanie from "@/assets/beanie.jpg";
import carryPack from "@/assets/backpack.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VANTBLK — Engineered Black Merch" },
      {
        name: "description",
        content:
          "Gear that moves with you. Engineered essentials in engineered black — cut for motion, built to outlast the season.",
      },
      { property: "og:title", content: "VANTBLK — Engineered Black Merch" },
      {
        property: "og:description",
        content:
          "Gear that moves with you. Engineered essentials in engineered black — cut for motion, built to outlast the season.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  {
    name: "Vector Jacket",
    tag: "New",
    tagAccent: true,
    desc: "Water-repellent shell",
    price: "$164",
    image: vectorJacket,
    width: 1024,
    height: 1024,
  },
  {
    name: "Core Tee",
    tag: "Best seller",
    tagAccent: false,
    desc: "Brushed recycled cotton",
    price: "$48",
    image: coreTee,
    width: 1024,
    height: 1024,
  },
  {
    name: "Summit Beanie",
    tag: "New",
    tagAccent: true,
    desc: "Ribbed merino blend",
    price: "$36",
    image: summitBeanie,
    width: 1024,
    height: 1024,
  },
  {
    name: "Carry Pack 22L",
    tag: "Low stock",
    tagAccent: false,
    desc: "Weatherproof 22L",
    price: "$98",
    image: carryPack,
    width: 1024,
    height: 1024,
  },
];

const marqueeItems = [
  "Free 48h shipping",
  "Lifetime repairs",
  "Recycled fabrics",
  "Ships worldwide",
  "Members early access",
];

const stats = [
  { value: "100%", label: "Recycled materials", accent: "text-glow" },
  { value: "Lifetime", label: "Free repairs", accent: "text-violet" },
  { value: "48h", label: "Global delivery", accent: "" },
  { value: "0", label: "Plastic packaging", accent: "" },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-body text-foreground">
      {/* ambient diagonal glass + gradient light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -left-40 -top-40 size-[720px] rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 size-[640px] rounded-full bg-glow/15 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-[120vh] w-[380px] animate-drift bg-gradient-to-b from-glow/10 via-violet/10 to-transparent" />
        <div className="absolute -bottom-40 right-1/4 h-[120vh] w-[300px] animate-drift-slow bg-gradient-to-t from-violet/15 to-transparent" />
      </div>

      {/* Nav */}
      <header className="relative z-20 mx-auto max-w-7xl px-6 pt-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-foreground font-display text-lg font-bold text-ink">
              V
            </span>
            <span className="font-display text-lg font-bold tracking-tight">VANTBLK</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#drop" className="transition-colors hover:text-foreground">
              New Drop
            </a>
            <a href="#products" className="transition-colors hover:text-foreground">
              Apparel
            </a>
            <a href="#standard" className="transition-colors hover:text-foreground">
              Accessories
            </a>
            <span className="text-foreground">Lookbook</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#products"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <span className="size-1.5 rounded-full bg-glow" /> Cart (0)
            </a>
            <a
              href="#products"
              className="rounded-full bg-glow px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-foreground"
            >
              Sign in
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-glow">
              <span className="size-1.5 animate-pulse rounded-full bg-glow" /> Drop 07 · Live now
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Gear that
              <br />
              <span className="bg-gradient-to-r from-glow to-violet bg-clip-text text-transparent">
                moves with you.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Engineered essentials in engineered black. Cut for motion, built to outlast the
              season, priced for the everyday.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="rounded-full bg-foreground px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-glow"
              >
                Shop the drop
              </a>
              <a
                href="#standard"
                className="rounded-full border border-line px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-glow"
              >
                Watch film
              </a>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              <div>
                <div className="font-display text-2xl font-bold">12k+</div>
                <div className="text-muted-foreground">members</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">38</div>
                <div className="text-muted-foreground">styles</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">4.9</div>
                <div className="text-muted-foreground">avg rating</div>
              </div>
            </div>
          </div>

          {/* Hero glass card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-glow/30 to-violet/30 blur-2xl" />
              <div className="glass-card relative p-3">
                <img
                  src={heroHoodie}
                  alt="Aero Hoodie 07 — matte black technical hoodie"
                  width={1024}
                  height={1280}
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
                <div className="flex items-center justify-between px-2 py-3">
                  <div>
                    <div className="font-display font-semibold">Aero Hoodie · 07</div>
                    <div className="text-xs text-muted-foreground">Sizes S–XXL</div>
                  </div>
                  <div className="font-display text-lg font-bold">$128</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee band */}
      <div className="marquee-band relative z-10 overflow-hidden py-4">
        <div className="flex gap-12 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-12" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={item} className="flex gap-12">
                  <span>{item}</span>
                  <span className="text-glow">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section id="products" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              This week's drop
            </h2>
            <p className="mt-2 text-muted-foreground">Four pieces, cut tight to the season.</p>
          </div>
          <a href="#products" className="text-sm text-glow hover:underline">
            View all →
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.name}
              href="#products"
              className="group rounded-2xl border border-line bg-panel/50 p-3 transition-colors hover:border-glow/40"
            >
              <img
                src={product.image}
                alt={product.name}
                width={product.width}
                height={product.height}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="px-1 pb-1 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold">{product.name}</span>
                  <span className={product.tagAccent ? "text-xs text-glow" : "text-xs text-muted-foreground"}>
                    {product.tag}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{product.desc}</div>
                <div className="mt-2 font-display font-bold">{product.price}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Feature band */}
      <section id="standard" className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <div className="glass-card relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-glow/20 blur-[100px]" />
          <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-glow">
                The VANTBLK standard
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Built once. Worn for years.
              </h3>
              <p className="mt-4 max-w-sm text-muted-foreground">
                Every piece is stress-tested, made from recycled technical fabrics, and backed by a
                lifetime repair promise. No seasons, no waste.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-ink/40 p-5">
                  <div
                    className={`font-display text-3xl font-bold ${stat.accent || "text-foreground"}`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-foreground font-display font-bold text-ink">
              V
            </span>
            <span className="font-display font-bold">VANTBLK</span>
            <span className="text-sm text-muted-foreground">© 2026 · Gear for the everyday</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#products" className="transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href="#standard" className="transition-colors hover:text-foreground">
              Support
            </a>
            <a href="#drop" className="transition-colors hover:text-foreground">
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
