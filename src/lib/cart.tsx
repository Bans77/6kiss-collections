import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  SHIPPING_CENTS,
  TAX_RATE,
  getProduct,
} from "@/lib/products";

export type CartLine = {
  productId: string;
  size: string;
  quantity: number;
};

const STORAGE_KEY = "nocturnal-cart-v1";
const MAX_QUANTITY = 10;

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, size: string, quantity?: number) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isValidLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.productId === "string" &&
    typeof line.size === "string" &&
    typeof line.quantity === "number" &&
    line.quantity > 0 &&
    Boolean(getProduct(line.productId))
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Read persisted cart after hydration so SSR and the first client render match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) setLines(parsed.filter(isValidLine));
    } catch {
      // ignore unreadable storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage failures (private mode, quota)
    }
  }, [lines]);

  const addItem = useCallback((productId: string, size: string, quantity = 1) => {
    if (!getProduct(productId)) return;
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId && line.size === size);
      if (existing) {
        return current.map((line) =>
          line === existing
            ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + quantity) }
            : line,
        );
      }
      return [...current, { productId, size, quantity: Math.min(MAX_QUANTITY, Math.max(1, quantity)) }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => !(line.productId === productId && line.size === size))
        : current.map((line) =>
            line.productId === productId && line.size === size
              ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) }
              : line,
          ),
    );
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setLines((current) =>
      current.filter((line) => !(line.productId === productId && line.size === size)),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotalCents = lines.reduce((total, line) => {
      const product = getProduct(line.productId);
      return product ? total + product.priceCents * line.quantity : total;
    }, 0);
    const shippingCents =
      subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_CENTS;
    const taxCents = Math.round(subtotalCents * TAX_RATE);

    return {
      lines,
      count,
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents: subtotalCents + shippingCents + taxCents,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [lines, isOpen, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
