import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { QuantityStepper } from "@/components/quantity-stepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — NOCTURNAL" },
      {
        name: "description",
        content: "Review your bag and place your NOCTURNAL order. Stone-washed 6Kiss pieces, made in small runs.",
      },
      { property: "og:title", content: "Checkout — NOCTURNAL" },
      {
        property: "og:description",
        content: "Review your bag and place your NOCTURNAL order. Stone-washed 6Kiss pieces, made in small runs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const customerSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email").max(255),
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((value) => value === "" || /^[\d\s()+-]{7,}$/.test(value), "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your street address").max(200),
  apartment: z.string().trim().max(100),
  city: z.string().trim().min(2, "Enter your city").max(100),
  state: z.string().trim().min(2, "Enter your state or region").max(100),
  postalCode: z.string().trim().min(3, "Enter your postal code").max(20),
  country: z.string().trim().min(2, "Enter your country").max(100),
  notes: z.string().trim().max(500),
});

type CustomerForm = z.infer<typeof customerSchema>;
type FieldName = keyof CustomerForm;

const emptyForm: CustomerForm = {
  email: "",
  fullName: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  notes: "",
};

const fieldClass =
  "h-12 w-full border border-line bg-panel px-4 font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-glow focus:outline-none";

function Field({
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  optional,
  autoComplete,
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string | undefined;
  onChange: (name: FieldName, value: string) => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
        {optional ? <span className="ml-2 normal-case tracking-normal">(optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        className={fieldClass}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-[10px] uppercase tracking-[0.15em] text-primary">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string | undefined>>>({});
  const [placedOrder, setPlacedOrder] = useState<{ id: string; email: string; total: number } | null>(
    null,
  );

  const update = (name: FieldName, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = customerSchema.safeParse(form);
    if (!result.success) {
      const nextErrors: Partial<Record<FieldName, string | undefined>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    if (cart.lines.length === 0) return;

    const orderId = `NOC-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setPlacedOrder({ id: orderId, email: result.data.email, total: cart.totalCents });
    cart.clearCart();
  };

  if (placedOrder) {
    return (
      <div className="relative min-h-screen bg-ink font-body text-foreground">
        <div className="grain pointer-events-none fixed inset-0 z-50" />
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-20 text-center md:px-8">
          <span className="flex size-14 items-center justify-center border border-glow text-glow">
            <Check className="size-6" />
          </span>
          <h1 className="mt-8 font-display text-5xl leading-none md:text-6xl">
            Order <span className="text-primary">confirmed</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Thanks — your order {placedOrder.id} is in. A confirmation is on its way to{" "}
            {placedOrder.email}. Pieces ship within 3–5 days.
          </p>
          <p className="mt-6 font-display text-3xl">{formatPrice(placedOrder.total)}</p>
          <Button asChild className="mt-10">
            <Link to="/">Back to the collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-ink font-body text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-50" />

      <header className="relative z-20 border-b border-line">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="font-display text-2xl font-semibold uppercase tracking-[0.2em]">
            6KISS
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-glow"
          >
            <ArrowLeft className="size-3.5" /> Continue shopping
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-glow">SECURE CHECKOUT</p>
        <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">
          Check<span className="text-primary">out</span>
        </h1>

        {cart.lines.length === 0 ? (
          <div className="mt-12 border border-line bg-panel p-10 text-center">
            <p className="font-display text-3xl">Your bag is empty</p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Add a piece before checking out
            </p>
            <Button className="mt-8" onClick={() => navigate({ to: "/" })}>
              Browse the collection
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <form onSubmit={handleSubmit} noValidate className="order-2 lg:order-1">
              <h2 className="font-display text-3xl">Customer information</h2>
              <div className="mt-7 grid gap-5">
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={form.email}
                  error={errors.email}
                  onChange={update}
                />
                <Field
                  name="fullName"
                  label="Full name"
                  autoComplete="name"
                  placeholder="First and last name"
                  value={form.fullName}
                  error={errors.fullName}
                  onChange={update}
                />
                <Field
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  optional
                  placeholder="For delivery updates"
                  value={form.phone}
                  error={errors.phone}
                  onChange={update}
                />
              </div>

              <h2 className="mt-12 font-display text-3xl">Shipping address</h2>
              <div className="mt-7 grid gap-5">
                <Field
                  name="address"
                  label="Street address"
                  autoComplete="address-line1"
                  value={form.address}
                  error={errors.address}
                  onChange={update}
                />
                <Field
                  name="apartment"
                  label="Apartment, suite"
                  autoComplete="address-line2"
                  optional
                  value={form.apartment}
                  error={errors.apartment}
                  onChange={update}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    name="city"
                    label="City"
                    autoComplete="address-level2"
                    value={form.city}
                    error={errors.city}
                    onChange={update}
                  />
                  <Field
                    name="state"
                    label="State / region"
                    autoComplete="address-level1"
                    value={form.state}
                    error={errors.state}
                    onChange={update}
                  />
                  <Field
                    name="postalCode"
                    label="Postal code"
                    autoComplete="postal-code"
                    value={form.postalCode}
                    error={errors.postalCode}
                    onChange={update}
                  />
                  <Field
                    name="country"
                    label="Country"
                    autoComplete="country-name"
                    value={form.country}
                    error={errors.country}
                    onChange={update}
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Order notes <span className="ml-2 normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    maxLength={500}
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    className="w-full border border-line bg-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-glow focus:outline-none"
                    placeholder="Delivery instructions, anything else"
                  />
                  {errors.notes ? (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-primary">
                      {errors.notes}
                    </p>
                  ) : null}
                </div>
              </div>

              <Button type="submit" className="mt-10 w-full">
                Place order — {formatPrice(cart.totalCents)}
              </Button>
              <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                No card is charged — card payments can be switched on later.
              </p>
            </form>

            <aside className="order-1 h-fit border border-line bg-panel p-6 lg:order-2 lg:sticky lg:top-10 md:p-8">
              <h2 className="font-display text-2xl">Order summary</h2>
              <div className="mt-6 space-y-5">
                {cart.lines.map((line) => {
                  const product = getProduct(line.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={`${line.productId}-${line.size}`}
                      className="flex gap-4 border-b border-line pb-5"
                    >
                      <div className="size-20 shrink-0 border border-line bg-ink">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-contain p-1.5"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-lg leading-tight">{product.name}</h3>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                              Size {line.size}
                            </p>
                          </div>
                          <span className="font-display text-base text-glow">
                            {formatPrice(product.priceCents * line.quantity)}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <QuantityStepper
                            quantity={line.quantity}
                            label={`${product.name} size ${line.size}`}
                            onChange={(quantity) =>
                              cart.setQuantity(line.productId, line.size, quantity)
                            }
                          />
                          <button
                            type="button"
                            onClick={() => cart.removeItem(line.productId, line.size)}
                            className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <dl className="mt-6 space-y-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-foreground">{formatPrice(cart.subtotalCents)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-foreground">
                    {cart.shippingCents === 0 ? "Free" : formatPrice(cart.shippingCents)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Estimated tax</dt>
                  <dd className="text-foreground">{formatPrice(cart.taxCents)}</dd>
                </div>
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-3xl">{formatPrice(cart.totalCents)}</span>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
