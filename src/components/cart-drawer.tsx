import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { useEffect } from "react";

import { QuantityStepper } from "@/components/quantity-stepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD_CENTS, formatPrice, getProduct } from "@/lib/products";

export function CartDrawer() {
  const cart = useCart();

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cart.closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cart]);

  if (!cart.isOpen) return null;

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD_CENTS - cart.subtotalCents;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        aria-label="Close bag"
        onClick={cart.closeCart}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="relative flex h-full w-full max-w-md flex-col border-l border-line bg-background"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Your bag ({cart.count})
          </p>
          <button
            type="button"
            onClick={cart.closeCart}
            aria-label="Close bag"
            className="text-muted-foreground transition-colors hover:text-glow"
          >
            <X className="size-4" />
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-3xl">Your bag is empty</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Nothing picked yet
            </p>
            <Button variant="outline" onClick={cart.closeCart}>
              Keep looking
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {cart.lines.map((line) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                return (
                  <div
                    key={`${line.productId}-${line.size}`}
                    className="flex gap-4 border-b border-line py-5"
                  >
                    <div className="size-24 shrink-0 border border-line bg-panel">
                      <img
                        src={product.image}
                        alt={`${product.name} front view`}
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

            <div className="border-t border-line px-6 py-6">
              <dl className="space-y-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
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
                  <dt>Tax</dt>
                  <dd className="text-foreground">{formatPrice(cart.taxCents)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-2xl">{formatPrice(cart.totalCents)}</span>
              </div>
              {remainingForFreeShipping > 0 ? (
                <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-primary">
                  {formatPrice(remainingForFreeShipping)} away from free shipping
                </p>
              ) : null}
              <Button asChild className="mt-5 w-full">
                <Link to="/checkout" onClick={cart.closeCart}>
                  Checkout <ArrowRight className="ml-3 size-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
